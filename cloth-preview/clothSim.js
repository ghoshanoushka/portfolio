const CROWN = 1.5;
const SEATING = 10;
const SEAT = 0.1;
const STEPS = 6;
const FINE = [STEPS, 4, 3];
const BUDGET = 0.4;
const SPARE = 0.3;
const OVER = 45;
const GAUGED = 3;
const SHEAR = 5e-7;
const BEND = 25e-6;
const STARCH = 42;
const HOLD = 8;
const REACHED = 110;
const BEYOND = 0.12;
const UNFOLD = 1.5;
const LEAN = 0.25;
const DRAG = 11;
const DAMP = 0.8;
const EDDY = 0.09;
const GALE = 1400;
const FASTEST = 5e3;
const CARRY = 2200;
const JOLT = 16e3;
const BRUSH = 22;
const PRESS = 0.6;
const REST = 0.25;
const PROOF = 12;
const PATIENCE = 100;
const SLOW = 1;
const LULL = 24;
const QUIET = 4;
const COASTING = 400;
const NEAREST = 0.9;
const FURTHEST = 2.2;
const REACH = 130;
const COAST = 0.22;
const KNOT = 3;
const CLEAR = 32e3;
const BACK = 1e4;
const DEEP = 10;
const DRILL = { beats: 16, nx: 7, ny: 9, small: 8, full: 32 };
const TRIAL = { sheets: 8, warm: 16, beats: 48 };
let fine = STEPS;
let spare = true;
let unit = 0;
let work = 0;
let sheets = 0;
let over = 0;
class Cloth {
  nx;
  ny;
  count;
  x = 0;
  y = 0;
  z = 0;
  w;
  h;
  pos;
  normal;
  prev;
  vel;
  inv;
  home;
  tether;
  pinX;
  pinY;
  ownX;
  ownY;
  crown = CROWN;
  seating = 0;
  feltX = 0;
  feltY = 0;
  feltZ = 0;
  lag = null;
  trailing = null;
  gust;
  over;
  a;
  b;
  rest;
  soft;
  awake = false;
  calm = 0;
  idle = 0;
  lull = 0;
  pressing = 0;
  stir = 0;
  from;
  drift;
  span = 0;
  into = 0;
  was;
  constructor(w, h, nx, ny) {
    this.w = w;
    this.h = h;
    this.nx = nx;
    this.ny = ny;
    this.count = nx * ny;
    this.pos = new Float32Array(this.count * 3);
    this.prev = new Float32Array(this.count * 3);
    this.vel = new Float32Array(this.count * 3);
    this.was = new Float32Array(this.count * 3);
    this.normal = new Float32Array(this.count * 3);
    this.inv = new Float32Array(this.count);
    this.home = new Float32Array(this.count * 2);
    this.tether = new Float32Array(this.count);
    this.gust = new Float32Array(this.count);
    this.over = new Float32Array(this.count);
    this.from = new Float32Array(this.count * 3);
    this.drift = new Float32Array(this.count * 3);
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const k = j * nx + i;
        this.home[k * 2] = i / (nx - 1) * w;
        this.home[k * 2 + 1] = j / (ny - 1) * h;
      }
    }
    const links = [];
    const dx = w / (nx - 1);
    const dy = h / (ny - 1);
    const link = (i0, j0, i1, j1, soft) => {
      if (i1 < 0 || i1 >= nx || j1 >= ny) return;
      links.push({ a: j0 * nx + i0, b: j1 * nx + i1, rest: Math.hypot((i1 - i0) * dx, (j1 - j0) * dy), soft });
    };
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        link(i, j, i + 1, j, 0);
        link(i, j, i, j + 1, 0);
        link(i, j, i + 1, j + 1, SHEAR);
        link(i, j, i - 1, j + 1, SHEAR);
        link(i, j, i + 2, j, BEND);
        link(i, j, i, j + 2, BEND);
      }
    }
    this.a = Uint16Array.from(links, (l) => l.a);
    this.b = Uint16Array.from(links, (l) => l.b);
    this.rest = Float32Array.from(links, (l) => l.rest);
    this.soft = Float32Array.from(links, (l) => l.soft);
    this.pinX = this.ownX = w / 2;
    this.pinY = this.ownY = h / 2;
    this.pinned();
    this.place(0, 0, 0);
  }
  pinned() {
    const { nx, ny, count, home, inv, tether, vel } = this;
    const dx = this.w / (nx - 1);
    const dy = this.h / (ny - 1);
    const ring = new Float32Array(count);
    for (let k = 0; k < count; k++) {
      const tx = home[k * 2] - this.pinX;
      const ty = home[k * 2 + 1] - this.pinY;
      ring[k] = Math.hypot(tx / dx, ty / dy);
      tether[k] = tx * tx + ty * ty;
      const held = ring[k] <= this.crown ? 0 : 1;
      if (held !== inv[k]) vel[k * 3] = vel[k * 3 + 1] = vel[k * 3 + 2] = 0;
      inv[k] = held;
    }
    const { a, b, rest, soft } = this;
    const order = Array.from(a, (_, c) => c).sort((p, q) => Math.min(ring[a[p]], ring[b[p]]) - Math.min(ring[a[q]], ring[b[q]]));
    this.a = Uint16Array.from(order, (c) => a[c]);
    this.b = Uint16Array.from(order, (c) => b[c]);
    this.rest = Float32Array.from(order, (c) => rest[c]);
    this.soft = Float32Array.from(order, (c) => soft[c]);
  }
  nail(u, v) {
    this.ownX = u;
    this.ownY = v;
    return this.hold();
  }
  hold(u = this.ownX, v = this.ownY, crown = CROWN) {
    if (crown === this.crown && Math.abs(u - this.pinX) < this.w / (this.nx - 1) / 2 && Math.abs(v - this.pinY) < this.h / (this.ny - 1) / 2) return false;
    this.pinX = u;
    this.pinY = v;
    this.crown = crown;
    this.pinned();
    if (this.awake) this.seating = SEATING;
    return true;
  }
  get loose() {
    return this.crown < 0;
  }
  get nailed() {
    return this.pinX === this.ownX && this.pinY === this.ownY;
  }
  get heldX() {
    return this.pinX - this.w / 2;
  }
  get heldY() {
    return this.pinY - this.h / 2;
  }
  trail(rooms, faces) {
    const { count, home } = this;
    const steps = rooms.length - 1;
    if (steps < 1) return;
    const lag = this.lag = this.trailing ??= new Float32Array(count * 3);
    const far = Math.hypot(this.w, this.h);
    const midX = this.w / 2;
    const midY = this.h / 2;
    const now = rooms[0];
    const f = faces[0];
    for (let i = 0; i < count; i++) {
      const lx = home[i * 2] - midX;
      const ly = home[i * 2 + 1] - midY;
      const at = Math.min(steps, Math.hypot(home[i * 2] - this.pinX, home[i * 2 + 1] - this.pinY) / far * steps);
      const b = Math.min(steps - 1, Math.floor(at));
      const t = at - b;
      const r0 = rooms[b];
      const m0 = faces[b];
      const r1 = rooms[b + 1];
      const m1 = faces[b + 1];
      const px = (r0[0] + m0[0] * lx + m0[1] * ly) * (1 - t) + (r1[0] + m1[0] * lx + m1[1] * ly) * t - now[0];
      const py = (r0[1] + m0[3] * lx + m0[4] * ly) * (1 - t) + (r1[1] + m1[3] * lx + m1[4] * ly) * t - now[1];
      const pz = (r0[2] + m0[6] * lx + m0[7] * ly) * (1 - t) + (r1[2] + m1[6] * lx + m1[7] * ly) * t - now[2];
      const tx = home[i * 2] - this.pinX;
      const ty = home[i * 2 + 1] - this.pinY;
      let dx = f[0] * px + f[3] * py + f[6] * pz - lx + tx;
      let dy = f[1] * px + f[4] * py + f[7] * pz - ly + ty;
      let dz = f[2] * px + f[5] * py + f[8] * pz;
      const reach = Math.hypot(tx, ty);
      const asked = Math.hypot(dx, dy, dz);
      if (asked > reach && asked > 0) {
        dx *= reach / asked;
        dy *= reach / asked;
        dz *= reach / asked;
      }
      lag[i * 3] = dx - tx;
      lag[i * 3 + 1] = dy - ty;
      lag[i * 3 + 2] = dz;
    }
  }
  place(x, y, z) {
    const { count, pos, normal, home } = this;
    this.x = x;
    this.y = y;
    this.z = z;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = x + home[i * 2];
      pos[i * 3 + 1] = y + home[i * 2 + 1];
      pos[i * 3 + 2] = z;
      normal[i * 3] = 0;
      normal[i * 3 + 1] = 0;
      normal[i * 3 + 2] = 1;
    }
    this.prev.set(pos);
    this.vel.fill(0);
    this.feltX = this.feltY = this.feltZ = 0;
    this.awake = false;
    this.calm = 0;
    this.idle = 0;
    this.lull = 0;
    this.pressing = 0;
  }
  bunch(seed) {
    const { count, pos, home } = this;
    const midX = this.w / 2;
    const midY = this.h / 2;
    const roll = Math.sin(seed * 78.233 + 1.7) * 43758.5453;
    const lean = (roll - Math.floor(roll) - 0.5) * 0.9;
    const ax = Math.cos(lean);
    const ay = Math.sin(lean);
    const reach = Math.abs(ax) * midX + Math.abs(ay) * midY;
    const radius = reach / 2.3;
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      const hx = home[i * 2] - midX;
      const hy = home[i * 2 + 1] - midY;
      const across = hx * ax + hy * ay;
      const along = -hx * ay + hy * ax;
      const turn = across / radius;
      const round = Math.sin(turn) * radius;
      pos[k] = this.x + midX + round * ax - along * ay;
      pos[k + 1] = this.y + midY + round * ay + along * ax;
      pos[k + 2] = this.z - (1 - Math.cos(turn)) * radius;
    }
    this.prev.set(pos);
    this.vel.fill(0);
    this.normals();
    this.awake = false;
    this.calm = 0;
    this.idle = 0;
    this.lull = 0;
    this.pressing = 0;
  }
  wake() {
    this.awake = true;
    this.calm = 0;
    this.idle = 0;
    this.lull = 0;
    this.pressing = 0;
  }
  step(dt, x, y, z, time, brush = null, column = null) {
    const moved = Math.abs(x - this.x) + Math.abs(y - this.y) + Math.abs(z - this.z);
    const lag = this.lag;
    const still = moved < 0.01 && !brush && !column && !lag;
    if (!this.awake && still) return false;
    this.awake = true;
    this.idle = still ? this.idle + 1 : 0;
    this.lull = moved < SLOW && this.stir < QUIET && !brush && !column && !lag ? this.lull + 1 : 0;
    if (this.calm > PROOF && still) return this.settle(1);
    if (this.lull > LULL && (this.pressing || this.knotted()) || this.idle > PATIENCE && still) {
      this.carry(x - this.x, y - this.y, z - this.z);
      if (!this.pressing++) this.press();
      return this.iron(Math.min(dt, 1 / 30));
    }
    this.pressing = 0;
    const { count, pos, prev, vel, inv, normal, home, tether, gust, over: over2, a, b, rest, soft } = this;
    const seating = this.seating > 0;
    if (seating) this.seating--;
    const frame = Math.min(dt, 1 / 30);
    const steps = Math.max(2, Math.min(spare ? fine * 2 : fine, Math.round(frame * 60 * fine)));
    work += steps;
    sheets++;
    const h = frame / steps;
    const hh = h * h;
    let fromX = this.x;
    let fromY = this.y;
    let fromZ = this.z;
    let wx = (x - fromX) / frame;
    let wy = (y - fromY) / frame;
    let wz = (z - fromZ) / frame;
    const fast = Math.sqrt(wx * wx + wy * wy + wz * wz);
    if (fast > CARRY) {
      wx *= CARRY / fast;
      wy *= CARRY / fast;
      wz *= CARRY / fast;
    }
    const jx = wx - this.feltX;
    const jy = wy - this.feltY;
    const jz = wz - this.feltZ;
    const jolt = Math.sqrt(jx * jx + jy * jy + jz * jz);
    const most = JOLT * frame;
    if (jolt > most) {
      wx = this.feltX + jx * most / jolt;
      wy = this.feltY + jy * most / jolt;
      wz = this.feltZ + jz * most / jolt;
    }
    this.feltX = wx;
    this.feltY = wy;
    this.feltZ = wz;
    const cx = x - fromX - wx * frame;
    const cy = y - fromY - wy * frame;
    const cz = z - fromZ - wz * frame;
    if (cx || cy || cz) {
      for (let i = 0; i < count; i++) {
        pos[i * 3] = pos[i * 3] + cx;
        pos[i * 3 + 1] = pos[i * 3 + 1] + cy;
        pos[i * 3 + 2] = pos[i * 3 + 2] + cz;
      }
      fromX += cx;
      fromY += cy;
      fromZ += cz;
    }
    this.was.set(pos);
    const px = (x - fromX) / frame;
    const py = (y - fromY) / frame;
    const pz = (z - fromZ) / frame;
    const eddy = Math.min(Math.sqrt(px * px + py * py + pz * pz), GALE) * EDDY;
    const brushSpeed = brush ? Math.sqrt(brush.vx * brush.vx + brush.vy * brush.vy) : 0;
    this.normals();
    this.folds();
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      gust[i] = eddy * (Math.sin(pos[k] * 0.011 + time * 2.3) + Math.sin(pos[k + 1] * 0.016 - time * 1.7 + pos[k] * 4e-3));
    }
    const midX = this.w / 2;
    const midY = this.h / 2;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const ox = fromX + (x - fromX) * t;
      const oy = fromY + (y - fromY) * t;
      const oz = fromZ + (z - fromZ) * t;
      for (let i = 0; i < count; i++) {
        const k = i * 3;
        prev[k] = pos[k];
        prev[k + 1] = pos[k + 1];
        prev[k + 2] = pos[k + 2];
        let hx = ox + home[i * 2];
        let hy = oy + home[i * 2 + 1];
        let hz = oz;
        if (!inv[i]) {
          const seat = seating ? SEAT : 1;
          pos[k] = pos[k] + (hx - pos[k]) * seat;
          pos[k + 1] = pos[k + 1] + (hy - pos[k + 1]) * seat;
          pos[k + 2] = pos[k + 2] + (oz - pos[k + 2]) * seat;
          continue;
        }
        if (lag) {
          hx += lag[k];
          hy += lag[k + 1];
          hz += lag[k + 2];
        }
        let vx = vel[k];
        let vy = vel[k + 1];
        let vz = vel[k + 2];
        const rz = vz - gust[i];
        const nX = normal[k];
        const nY = normal[k + 1];
        const nZ = normal[k + 2];
        const into = vx * nX + vy * nY + rz * nZ;
        const farX = pos[k] - hx;
        const farY = pos[k + 1] - hy;
        const farZ = pos[k + 2] - hz;
        const off = Math.sqrt(farX * farX + farY * farY + farZ * farZ);
        const pull = STARCH * (off > REACHED ? (REACHED + (off - REACHED) * BEYOND) / off : 1);
        vx += (-pull * farX - HOLD * (vx - px) - DRAG * into * nX - DAMP * vx) * h;
        vy += (-pull * farY - HOLD * (vy - py) - DRAG * into * nY - DAMP * vy) * h;
        vz += (-pull * farZ - HOLD * (vz - pz) - DRAG * into * nZ - DAMP * vz) * h;
        const folded = over2[i];
        if (folded) {
          const ax = pos[k] - hx;
          const ay = pos[k + 1] - hy;
          const side = pos[k + 2] - hz < -LEAN ? -1 : 1;
          vz += pull * UNFOLD * Math.sqrt(ax * ax + ay * ay) * folded * side * h;
        }
        if (brush) {
          const bx = home[i * 2] - brush.x;
          const by = home[i * 2 + 1] - brush.y;
          const under = Math.exp(-(bx * bx + by * by) / (brush.reach * brush.reach));
          if (under > 0.01) {
            const hold = BRUSH * under * h;
            vx += (brush.vx - (vx - px)) * hold;
            vy += (brush.vy - (vy - py)) * hold;
            vz += (-PRESS * brushSpeed - (vz - pz)) * hold;
          }
        }
        if (column) {
          const f = column.face;
          const lx = pos[k] - ox - midX;
          const ly = pos[k + 1] - oy - midY;
          const lz = pos[k + 2] - oz;
          const rz2 = column.pin[2] + f[6] * lx + f[7] * ly + f[8] * lz;
          if (rz2 > column.floor) {
            const near = column.eye / (column.eye - rz2);
            const sx = (column.pin[0] + f[0] * lx + f[1] * ly + f[2] * lz) * near;
            const sy = (column.pin[1] + f[3] * lx + f[4] * ly + f[5] * lz) * near;
            const q = column.sides;
            let depth = Infinity;
            let outX = 0;
            let outY = 0;
            for (let e = 0; e < 16; e += 4) {
              const inside = -((sx - q[e]) * q[e + 2] + (sy - q[e + 1]) * q[e + 3]);
              if (inside < depth) {
                depth = inside;
                outX = q[e + 2];
                outY = q[e + 3];
              }
              if (inside <= 0) break;
            }
            if (depth > 0) {
              const push = column.strength * Math.min(1, depth / DEEP) * h;
              const fx = outX * CLEAR * push;
              const fy = outY * CLEAR * push;
              const fz = -BACK * push;
              vx += f[0] * fx + f[3] * fy + f[6] * fz;
              vy += f[1] * fx + f[4] * fy + f[7] * fz;
              vz += f[2] * fx + f[5] * fy + f[8] * fz;
            }
          }
        }
        pos[k] = pos[k] + vx * h;
        pos[k + 1] = pos[k + 1] + vy * h;
        pos[k + 2] = pos[k + 2] + vz * h;
      }
      for (let c = 0; c < a.length; c++) {
        const i0 = a[c];
        const i1 = b[c];
        const w0 = inv[i0];
        const w1 = inv[i1];
        const w = w0 + w1;
        if (!w) continue;
        const k0 = i0 * 3;
        const k1 = i1 * 3;
        const ex = pos[k1] - pos[k0];
        const ey = pos[k1 + 1] - pos[k0 + 1];
        const ez = pos[k1 + 2] - pos[k0 + 2];
        const len = Math.sqrt(ex * ex + ey * ey + ez * ez);
        if (len < 1e-6) continue;
        const push = (len - rest[c]) / (w + soft[c] / hh) / len;
        pos[k0] = pos[k0] + ex * push * w0;
        pos[k0 + 1] = pos[k0 + 1] + ey * push * w0;
        pos[k0 + 2] = pos[k0 + 2] + ez * push * w0;
        pos[k1] = pos[k1] - ex * push * w1;
        pos[k1 + 1] = pos[k1 + 1] - ey * push * w1;
        pos[k1 + 2] = pos[k1 + 2] - ez * push * w1;
      }
      const mx = ox + this.pinX;
      const my = oy + this.pinY;
      const top = FASTEST * FASTEST;
      for (let i = 0; i < count; i++) {
        if (!inv[i]) continue;
        const k = i * 3;
        const tx = pos[k] - mx;
        const ty = pos[k + 1] - my;
        const tz = pos[k + 2] - oz;
        const out = tx * tx + ty * ty + tz * tz;
        if (out > tether[i]) {
          const all = Math.sqrt(tether[i] / out);
          const back = seating ? 1 - (1 - all) * SEAT : all;
          pos[k] = mx + tx * back;
          pos[k + 1] = my + ty * back;
          pos[k + 2] = oz + tz * back;
        }
        let vx = (pos[k] - prev[k]) / h;
        let vy = (pos[k + 1] - prev[k + 1]) / h;
        let vz = (pos[k + 2] - prev[k + 2]) / h;
        const fast2 = (vx - px) * (vx - px) + (vy - py) * (vy - py) + (vz - pz) * (vz - pz);
        if (fast2 > top) {
          const keep = Math.sqrt(top / fast2);
          vx = px + (vx - px) * keep;
          vy = py + (vy - py) * keep;
          vz = pz + (vz - pz) * keep;
        }
        vel[k] = vx;
        vel[k + 1] = vy;
        vel[k + 2] = vz;
      }
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.normals();
    let drift = 0;
    for (let k = 0; k < count * 3; k++) {
      const d = Math.abs(pos[k] - this.was[k] - (k % 3 === 0 ? x - fromX : k % 3 === 1 ? y - fromY : z - fromZ));
      if (d > drift) drift = d;
    }
    this.stir = drift;
    this.calm = drift < REST && still && this.level() ? this.calm + 1 : 0;
    return true;
  }
  drill(beat, round) {
    const { w, h } = this;
    const other = round >> 1 & 1;
    const dt = beat & 1 ? 1 / 60 : 0.0123;
    const time = (round * DRILL.beats + beat) * dt;
    const turned = [0.94, 0.12, -0.31, -0.1, 0.99, 0.08, 0.32, -0.04, 0.95];
    const flat = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const face = other ? turned : flat;
    const swipe = { x: w * 0.3, y: h * 0.4, vx: 640.5, vy: -310.25, reach: w * 0.3 };
    const tug = { x: w / 2, y: h / 2, vx: 0, vy: 900, reach: 80 };
    const far = 1e4;
    const wall = {
      pin: other ? [12.5, -8.25, 30.5] : [0, 0, 0],
      face,
      eye: 1800.5,
      sides: [far, 0, 1, 0, -far, 0, -1, 0, 0, far, 0, 1, 0, -far, 0, -1],
      floor: -far,
      strength: 0.5
    };
    const { x, y, z } = this;
    switch (beat) {
      case 0:
        this.place(-w / 2, -h / 2, 0);
        this.bunch(round);
        this.wake();
        this.hold(w * 0.2, h * 0.1, 3.5);
        this.trail([[40.5, -20.25, 12.5], [0, 0, 0], [-30.5, 15.25, -8.5]], [turned, flat, face]);
        this.step(dt, this.x + 180.5, this.y - 60.25, this.z + 20.5, time, swipe, wall);
        break;
      case 1:
        this.step(dt, x + 14.5, y - 6.25, z, time, other ? tug : swipe, { ...wall, sides: [-far, 0, 1, 0, far, 0, -1, 0, 0, far, 0, 1, 0, -far, 0, -1] });
        break;
      case 2:
        this.lag = null;
        this.step(dt, x + 5, y, z - 2.5, time, null, { ...wall, floor: far });
        break;
      case 3:
      case 4:
        this.step(dt, x + 3.5, y - 1.25, z, time);
        break;
      case 5:
        this.step(dt, x, y, z, time);
        break;
      case 6:
        this.calm = PROOF + 1;
        this.step(dt, x, y, z, time);
        break;
      case 7:
        this.place(x, y, z);
        this.wake();
        this.calm = PROOF + 1;
        this.step(dt, x, y, z, time);
        break;
      case 8:
        this.step(dt, x, y, z, time);
        break;
      case 9:
        this.bunch(round + 1);
        this.wake();
        this.stir = 0;
        this.lull = LULL + 1;
        this.step(dt, x + 0.3, y, z, time);
        break;
      case 10:
        this.step(dt, x + 0.3, y, z, time);
        break;
      case 11:
        this.into = this.span;
        this.step(dt, x + 0.3, y, z, time);
        break;
      case 12:
        this.bunch(round + 2);
        this.wake();
        this.idle = PATIENCE + 1;
        this.step(dt, x, y, z, time);
        break;
      case 13:
        this.place(x, y, z);
        this.wake();
        this.stir = 0;
        this.lull = LULL + 1;
        this.step(dt, x + 0.3, y, z, time);
        break;
      case 14:
        this.hold();
        this.hold(w / 2, h / 2, -1);
        this.step(dt, x, y + 2.5, z, time, tug);
        break;
      default:
        this.hold();
        this.step(dt, x - 220.5, y + 90.25, z - 20.5, time, this.loose || !this.nailed || this.heldX || this.heldY || this.strain() > 2 ? swipe : null);
    }
  }
  trial(round) {
    if (!round) {
      this.place(-this.w / 2, -this.h / 2, 0);
      this.wake();
      this.hold();
      this.lag = null;
    }
    this.step(1 / 60, this.x + 14.5, this.y - 6.25, this.z, round / 60);
  }
  strain() {
    const { pos, a, b, rest, soft } = this;
    let most = 1;
    for (let c = 0; c < a.length; c++) {
      if (soft[c]) continue;
      const k0 = a[c] * 3;
      const k1 = b[c] * 3;
      const ex = pos[k1] - pos[k0];
      const ey = pos[k1 + 1] - pos[k0 + 1];
      const ez = pos[k1 + 2] - pos[k0 + 2];
      most = Math.max(most, Math.sqrt(ex * ex + ey * ey + ez * ez) / rest[c]);
    }
    return most;
  }
  level() {
    const { count, pos } = this;
    for (let i = 0; i < count; i++) {
      if (Math.abs(pos[i * 3 + 2] - this.z) > 0.5) return false;
    }
    return true;
  }
  knotted() {
    const { count, over: over2 } = this;
    this.folds();
    let folded = 0;
    for (let i = 0; i < count; i++) {
      if (over2[i] > 0.5 && ++folded >= KNOT) return true;
    }
    return false;
  }
  carry(dx, dy, dz) {
    const { count, pos } = this;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = pos[i * 3] + dx;
      pos[i * 3 + 1] = pos[i * 3 + 1] + dy;
      pos[i * 3 + 2] = pos[i * 3 + 2] + dz;
    }
    this.x += dx;
    this.y += dy;
    this.z += dz;
  }
  press() {
    const { count, pos, vel, home, from, drift } = this;
    let far = 0;
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      from[k] = pos[k] - this.x;
      from[k + 1] = pos[k + 1] - this.y;
      from[k + 2] = pos[k + 2] - this.z;
      const speed = Math.hypot(vel[k], vel[k + 1], vel[k + 2]);
      const keep = speed > COASTING ? COASTING / speed : 1;
      drift[k] = vel[k] * keep;
      drift[k + 1] = vel[k + 1] * keep;
      drift[k + 2] = vel[k + 2] * keep;
      far = Math.max(far, Math.hypot(from[k] - home[i * 2], from[k + 1] - home[i * 2 + 1], from[k + 2]));
    }
    this.span = Math.min(FURTHEST, NEAREST + far / REACH);
    this.into = 0;
  }
  iron(dt) {
    const { count, pos, home, from, drift } = this;
    this.into += dt;
    const u = Math.min(1, this.into / this.span);
    const flat = u * u * u * (u * (u * 6 - 15) + 10);
    const coast = COAST * (1 - Math.exp(-this.into / COAST));
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      const ax = from[k] + drift[k] * coast;
      const ay = from[k + 1] + drift[k + 1] * coast;
      const az = from[k + 2] + drift[k + 2] * coast;
      pos[k] = this.x + ax + (home[i * 2] - ax) * flat;
      pos[k + 1] = this.y + ay + (home[i * 2 + 1] - ay) * flat;
      pos[k + 2] = this.z + az - az * flat;
    }
    this.vel.fill(0);
    this.prev.set(pos);
    if (u >= 1) this.place(this.x, this.y, this.z);
    else this.normals();
    return true;
  }
  settle(rate) {
    const { count, pos, home } = this;
    let most = 0;
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      const tx = this.x + home[i * 2];
      const ty = this.y + home[i * 2 + 1];
      pos[k] = pos[k] + (tx - pos[k]) * 0.14 * rate;
      pos[k + 1] = pos[k + 1] + (ty - pos[k + 1]) * 0.14 * rate;
      pos[k + 2] = pos[k + 2] + (this.z - pos[k + 2]) * 0.14 * rate;
      most = Math.max(most, Math.abs(tx - pos[k]), Math.abs(ty - pos[k + 1]), Math.abs(this.z - pos[k + 2]));
    }
    this.vel.fill(0);
    this.prev.set(pos);
    if (most < 0.02) this.place(this.x, this.y, this.z);
    else this.normals();
    return true;
  }
  folds() {
    const { nx, ny, pos, over: over2 } = this;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const k = (j * nx + i) * 3;
        let most = 0;
        for (let q = 0; q < 4; q++) {
          const di = q & 1 ? -1 : 1;
          const dj = q & 2 ? -1 : 1;
          if (i + di < 0 || i + di >= nx || j + dj < 0 || j + dj >= ny) continue;
          const a = (j * nx + i + di) * 3;
          const b = ((j + dj) * nx + i) * 3;
          const ax = pos[a] - pos[k];
          const ay = pos[a + 1] - pos[k + 1];
          const az = pos[a + 2] - pos[k + 2];
          const bx = pos[b] - pos[k];
          const by = pos[b + 1] - pos[k + 1];
          const bz = pos[b + 2] - pos[k + 2];
          const x = ay * bz - az * by;
          const y = az * bx - ax * bz;
          const z = (ax * by - ay * bx) * di * dj;
          const len = Math.sqrt(x * x + y * y + z * z);
          if (len < 1e-6) continue;
          most = Math.max(most, -z / len);
        }
        over2[k / 3] = most;
      }
    }
  }
  normals() {
    const { nx, ny, pos, normal } = this;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const l = (j * nx + Math.max(0, i - 1)) * 3;
        const r = (j * nx + Math.min(nx - 1, i + 1)) * 3;
        const u = (Math.max(0, j - 1) * nx + i) * 3;
        const d = (Math.min(ny - 1, j + 1) * nx + i) * 3;
        const ax = pos[r] - pos[l];
        const ay = pos[r + 1] - pos[l + 1];
        const az = pos[r + 2] - pos[l + 2];
        const bx = pos[d] - pos[u];
        const by = pos[d + 1] - pos[u + 1];
        const bz = pos[d + 2] - pos[u + 2];
        const x = ay * bz - az * by;
        const y = az * bx - ax * bz;
        const z = ax * by - ay * bx;
        const len = Math.sqrt(x * x + y * y + z * z) || 1;
        const k = (j * nx + i) * 3;
        normal[k] = x / len;
        normal[k + 1] = y / len;
        normal[k + 2] = z / len;
      }
    }
  }
}
let troupe = null;
let bench = null;
let drilled = 0;
let tried = 0;
let took = 0;
const rehearse = (ms, nx, ny) => {
  const all = DRILL.beats * (DRILL.small + DRILL.full);
  const tries = TRIAL.warm + TRIAL.beats;
  if (tried >= tries) return true;
  troupe ??= [new Cloth(280, 373, DRILL.nx, DRILL.ny), new Cloth(315.5, 420.75, DRILL.nx, DRILL.ny), new Cloth(280, 373, nx, ny), new Cloth(315.5, 420.75, nx, ny)];
  const until = performance.now() + ms;
  const chosen = fine;
  const spared = spare;
  let at = performance.now();
  while (drilled < all) {
    const round = Math.floor(drilled / DRILL.beats);
    fine = FINE[round % FINE.length];
    spare = !(round & 2);
    troupe[(round & 1) + (round < DRILL.small ? 0 : 2)].drill(drilled++ % DRILL.beats, round);
    at = performance.now();
    if (at >= until) break;
  }
  if (drilled >= all) {
    fine = STEPS;
    spare = true;
    bench ??= Array.from({ length: TRIAL.sheets }, () => new Cloth(315.5, 420.75, nx, ny));
    while (tried < tries && at < until) {
      bench[tried % TRIAL.sheets].trial(Math.floor(tried / TRIAL.sheets));
      const now = performance.now();
      if (tried++ >= TRIAL.warm) took += now - at;
      at = now;
    }
  }
  fine = chosen;
  spare = spared;
  work = sheets = 0;
  if (tried < tries) return false;
  troupe = bench = null;
  unit = took / (TRIAL.beats * STEPS);
  return true;
};
const load = (count, steps) => unit * count * steps * 60 / 1e3;
const fit = (count) => {
  fine = FINE.find((steps) => load(count, steps) <= BUDGET) ?? FINE[FINE.length - 1];
  over = 0;
  return fine;
};
const gauge = (ms) => {
  if (sheets >= GAUGED && work) unit += (ms / work - unit) * 0.1;
  const busy = load(sheets, fine);
  spare = busy <= SPARE;
  over = Math.max(0, over + (busy > BUDGET ? 1 : -1));
  if (over > OVER) {
    fine = FINE[Math.min(FINE.indexOf(fine) + 1, FINE.length - 1)];
    over = 0;
  }
  work = sheets = 0;
  return fine;
};
export {
  Cloth,
  fit,
  gauge,
  rehearse
};
