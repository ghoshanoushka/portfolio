// Preview: the home carousel (Bend, Bulge, Stack, Flat, Drum) with each project
// card as a sheet of cloth. Cloth simulation from Visual DEPT (clothSim.js).
// The cards are screenshots of the live cards, so this is a look-and-feel
// preview, not the real landing.
import * as THREE from "three";
import { Cloth } from "./clothSim.js";

// Files are found next to this script, so it runs from this preview page or from the landing copy (index-cloth.html)
const HERE = (path) => new URL(path, import.meta.url).href;
const PROJECTS = [
  { title: "Mensio", href: HERE("../projects/mensio.html"), c: ["#24407A", "#6FA6EC"] },
  { title: "Deploy Design System", href: HERE("../projects/deploy-design-system.html"), c: ["#4B3699", "#A493E3"] },
  { title: "Claim Denials", href: HERE("../projects/denials.html"), c: ["#0F5C59", "#4FC1A6"] },
  { title: "AutoML Evaluations", href: HERE("../projects/automl.html"), c: ["#2B3242", "#8A93AB"] },
];
const N = PROJECTS.length * 2;          // repeated, like the live carousel, so wrapping happens off screen
const SIM = { w: 540, h: 460, nx: 15, ny: 13 };
// What's printed on the cloth, from ?look=: paper (news/paper.html, the default), magazine
// (news/magazine.html), vintage (news/news.html), cards (screenshots of the live cards), or mix:
// magazine, paper and original cards taking turns
const asked = new URLSearchParams(location.search).get("look");
const LOOK = ["magazine", "paper", "vintage", "cards", "mix"].includes(asked) ? asked : "paper";
const lookOf = (i) => (LOOK === "mix" ? ["magazine", "paper", "cards"][i % 3] : LOOK);
const RADIUS = { magazine: 14, paper: 22, vintage: 3, cards: 22 };   // card corner, in card px
// phones get the paper card printed at its size there (same shape, larger type), so the words stay readable
const PHONE = matchMedia("(max-width: 640px)").matches;
const WIDE = (look) => (look === "paper" && PHONE ? "phone" : "wide");
const face = (look, k, tall) => HERE(look === "cards" ? `cards/${tall ? "bulge" : "bend"}-${k}.png` : `cards/${look === "vintage" ? "news" : look}-${tall ? "tall" : WIDE(look)}-${k}.png`);
const TALL = new Set(["bulge", "drum"]);

const canvas = document.getElementById("stage");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
// the live stage uses CSS perspective: 1100px
const PERSP = 1100;
const camera = new THREE.PerspectiveCamera(45, 1, 10, 8000);
camera.position.set(0, 0, PERSP);
let W = 0, H = 0;
function resize() {
  W = innerWidth; H = innerHeight;
  renderer.setSize(W, H, false);
  camera.aspect = W / H;
  camera.fov = 2 * Math.atan(H / 2 / PERSP) * 180 / Math.PI;
  camera.updateProjectionMatrix();
}
resize();
addEventListener("resize", resize);

const loader = new THREE.TextureLoader();
const tex = (src) => {
  const t = loader.load(src);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};

// Lit like the Visual DEPT sheets: exactly the artwork at rest, a soft shade in
// the ripples and a little sheen at glancing angles. The two card shapes cross-fade
// when the layout switches, and the corners are rounded like the live cards.
const material = (a, b, radius) => new THREE.ShaderMaterial({
  uniforms: {
    uVideo: { value: null }, uVideoOn: { value: 0 }, uWash: { value: 1 }, uRectA: { value: new THREE.Vector4(2, 2, 2, 2) }, uRectB: { value: new THREE.Vector4(2, 2, 2, 2) },
    uRadius: { value: radius }, uA: { value: a }, uB: { value: b }, uMix: { value: 0 }, uSize: { value: new THREE.Vector2(540, 460) },
    uOpacity: { value: 1 }, uBright: { value: 1 }, uLight: { value: new THREE.Vector3(-.35, .5, .8).normalize() },
  },
  vertexShader: `
    varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vView = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    uniform sampler2D uA, uB, uVideo; uniform float uMix, uOpacity, uBright, uRadius, uVideoOn, uWash; uniform vec4 uRectA, uRectB; uniform vec2 uSize; uniform vec3 uLight;
    varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
    void main() {
      vec2 p = (vUv - .5) * uSize, q = abs(p) - (uSize * .5 - uRadius);
      float d = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - uRadius;
      float edge = 1. - smoothstep(-1., .5, d);
      if (edge <= 0.) discard;
      vec4 c = mix(texture2D(uA, vUv), texture2D(uB, vUv), uMix);
      // the hero's recording in the photo box, cropped like the page's object-fit: cover, top centre
      vec4 r = mix(uRectA, uRectB, uMix);
      // (inside the photo frame's rounded corners, 10 card px like news/paper.html)
      vec2 fp = (vUv - (r.xy + r.zw) * .5) * uSize, fq = abs(fp) - ((r.zw - r.xy) * uSize * .5 - 10.);
      float inFrame = length(max(fq, 0.)) + min(max(fq.x, fq.y), 0.) - 10.;
      if (uVideoOn > 0. && inFrame < 0.) {
        vec2 l = (vUv - r.xy) / (r.zw - r.xy);
        float ra = (r.z - r.x) * uSize.x / ((r.w - r.y) * uSize.y), va = 16. / 9.;
        vec2 v = ra > va ? vec2(l.x, 1. - (1. - l.y) * va / ra) : vec2(.5 + (l.x - .5) * ra / va, l.y);
        vec3 vid = texture2D(uVideo, v).rgb;
        vid = mix(vid / 12.92, pow((vid + .055) / 1.055, vec3(2.4)), step(.04045, vid));   // sRGB to linear, as the stills
        c.rgb = mix(c.rgb, vid, uVideoOn);
      }
      // out of focus: washed out, the colour lifted as if brightened twice (linear read as sRGB)
      vec3 lifted = mix(c.rgb * 12.92, 1.055 * pow(c.rgb, vec3(1. / 2.4)) - .055, step(.0031308, c.rgb));
      c.rgb = mix(c.rgb, lifted, uWash);
      vec3 n = normalize(vNormal); if (!gl_FrontFacing) n = -n;
      float wrap = .45;
      float facing = clamp((dot(n, uLight) + wrap) / (1. + wrap), 0., 1.);
      float lying = (uLight.z + wrap) / (1. + wrap);
      float light = .86 + .14 * facing / max(lying, .01);
      float glance = pow(1. - max(dot(n, normalize(vView)), 0.), 3.);
      gl_FragColor = vec4(c.rgb * light * uBright + glance * .16, edge * uOpacity);
      #include <colorspace_fragment>
    }`,
  side: THREE.DoubleSide, transparent: true, depthTest: false, depthWrite: false,
});

// soft coloured shadow under each card, and the colour haze behind the side cards
function blob(inner, outer) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d"), r = g.createRadialGradient(128, 128, inner, 128, 128, outer);
  r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(.5, "rgba(255,255,255,.4)"); r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r; g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}
const shadowTex = blob(20, 128), glowTex = blob(0, 128);

// Each project's hero animation, recorded (video/*.mp4). Only the card in the middle plays its
// recording, from the start, in the paper's photo box; the others show the opening frame, which
// is printed on the page itself (cards/paper-layout.json says where that box is, per project and shape).
const SLUGS = ["mensio", "deploy", "denials", "automl"];
const box = await fetch(HERE("cards/paper-layout.json")).then((r) => r.json()).catch(() => null);
const videos = SLUGS.map((slug) => {
  const v = Object.assign(document.createElement("video"), { src: HERE(`video/${slug}.mp4`), muted: true, loop: true, playsInline: true, preload: "auto" });
  // (left as raw sRGB and decoded in the shader: tagging a video texture sRGB brightened it twice,
  // a washed-out film over the middle card that the printed stills didn't have)
  const t = new THREE.VideoTexture(v);
  return { v, t };
});
let playing = -1;
let videoOff = false;   // ?still: never play, for comparing (and window.__still(true) at runtime)
window.__still = (v) => { videoOff = v; };
window.__mode = () => [mode, from, blend];
window.__setMode = (m) => setMode(m);
window.__videos = videos;
const play = (k) => {
  if (k === playing) return;
  if (playing === "grid") playing = -2;   // (back from the grid: start the middle one over)
  videos.forEach(({ v }, j) => { if (j !== k) v.pause(); });
  playing = k;
  if (k < 0) return;
  videos[k].v.currentTime = 0;
  videos[k].v.play().catch(() => {});
};

// grid cards at least a third on screen
const onScreen = () => {
  const on = new Set(), vh = innerHeight;
  document.querySelectorAll(".projects .stage-card").forEach((el, i) => {
    if (i >= PROJECTS.length) return;
    const r = el.getBoundingClientRect(), inView = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    if (r.height > 0 && inView > r.height / 3) on.add(i);
  });
  return on;
};

const cards = [];
for (let i = 0; i < N; i++) {
  const p = PROJECTS[i % PROJECTS.length], k = i % PROJECTS.length, look = lookOf(i), papery = look === "paper" || look === "vintage";
  const cloth = new Cloth(SIM.w, SIM.h, SIM.nx, SIM.ny);
  cloth.place(-SIM.w / 2, -SIM.h / 2, 0);
  const geo = new THREE.PlaneGeometry(SIM.w, SIM.h, SIM.nx - 1, SIM.ny - 1);
  const mesh = new THREE.Mesh(geo, material(tex(face(look, k, false)), tex(face(look, k, true)), RADIUS[look]));
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shadowTex, color: papery ? "#3a3226" : p.c[0], transparent: true, depthTest: false, depthWrite: false }));
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: glowTex, color: papery ? new THREE.Color("#c9b98f") : new THREE.Color(p.c[0]).lerp(new THREE.Color(p.c[1]), .5), transparent: true, depthTest: false, depthWrite: false }));
  scene.add(glow, shadow, mesh);
  if (look === "paper" && box) {
    const u = mesh.material.uniforms;
    u.uVideo.value = videos[k].t;
    u.uRectA.value.fromArray((box[WIDE(look)] ?? box.wide)[k]);
    u.uRectB.value.fromArray(box.tall[k]);
  }
  cards.push({ shade: shadow.material.color.clone(), i, k, look, p, cloth, geo, mesh, shadow, glow, last: null, lastD: null, bx: undefined, by: undefined, vOn: 0 });
}

/* ---------- the five layouts, as in home-cards.css ---------- */

// card size per layout (CSS --w and --ar)
function size(mode) {
  if (TALL.has(mode)) { const w = Math.min(420, .27 * W, (H - 280) * .9); return [w, w * 600 / 540]; }
  const w = Math.min(540, .8 * W, (H - 260) * 1.17);
  return [w, w * 460 / 540];
}
// where a card sits d places from the middle (whole d); in between, the values blend
function slot(mode, d, w) {
  const s = Math.sign(d), a = Math.abs(d), o = { tx: 0, ty: 0, rr: 0, ry: 0, rot: 0, sc: 1, op: 1, br: 1, glow: 0 };
  if (mode === "bend") {
    if (a === 1) Object.assign(o, { tx: s * (W / 2 - w * .18), ry: -s * 64, sc: 1.12, br: 1.05, glow: .3 });
    if (a >= 2) Object.assign(o, { tx: s * 1.1 * W, ry: -s * 80, op: 0 });
  } else if (mode === "flat") {
    if (a === 1) Object.assign(o, { tx: s * (w + 40), sc: .86, op: .5, glow: .55 });
    if (a >= 2) Object.assign(o, { tx: s * (2 * w + 80), sc: .8, op: 0 });
  } else if (mode === "stack") {
    if (d === 1) Object.assign(o, { ty: .09, sc: .92, br: .9, glow: .22 });
    if (d === 2) Object.assign(o, { ty: .17, sc: .84, br: .8, op: .6 });
    if (d >= 3) Object.assign(o, { ty: .17, sc: .84, br: .8, op: 0 });
    if (d === -1) Object.assign(o, { ty: -1.15, rot: -3, sc: 1.02, op: 0 });
    if (d <= -2) Object.assign(o, { ty: -1.3, op: 0 });
  } else if (mode === "bulge") {
    Object.assign(o, { rr: (w + 14) / .3129, ry: d * 18, br: d ? .92 : 1, op: a > 2 ? 0 : 1, glow: a === 2 ? .55 : 0 });
  } else if (mode === "drum") {
    Object.assign(o, { rr: (w + 14) / .765, ry: d * 45, br: d ? .85 : 1, op: a > 1 ? 0 : 1, glow: a === 1 ? .28 : 0 });
  }
  return o;
}
const KEYS = ["tx", "ty", "rr", "ry", "rot", "sc", "op", "br", "glow"];
function pose(mode, d) {
  const [w, h] = size(mode), f = Math.floor(d), t = d - f, A = slot(mode, f, w), B = slot(mode, f + 1, w), o = { w, h };
  for (const k of KEYS) o[k] = A[k] + (B[k] - A[k]) * t;
  return o;
}

/* ---------- Ribbon: Visual DEPT's own motion, numbers as in its ClothCanvas.jsx ---------- */

// the cards run on a diagonal from bottom left to top right, growing and turning as
// they go; scrolling throws them with momentum and they glide to a stop
const RIB = { fov: 48, base: 260 };
const rib = { offset: 50, target: 50, momentum: 0, dragging: false, lag: 0 };
const ribDims = () => {
  // (flatter and bigger than Visual DEPT's: a gentler slope, less tilt, wider cards spaced further apart)
  const mobile = W < 768, dx = mobile ? 52 : 27, min = mobile ? -52 : -36;
  return { mobile, dx, min, total: N * dx, cardW: mobile ? Math.max(220, Math.min(W * .6, 300)) : Math.max(320, Math.min(W * .3, 470)) };
};
const wrapRange = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min; };
function ribbonPose(i) {
  const { mobile, dx, min, total, cardW } = ribDims(), deg = THREE.MathUtils.degToRad;
  const xVw = wrapRange(min, min + total, i * dx + rib.offset), t = (xVw - min) / total;
  const lean = THREE.MathUtils.clamp(rib.lag * .12, -1.5, 1.5);
  const yVh = mobile ? 52 - (t - .5) * 6 : 68 - t * 24;
  const scale = (.9 + t * .18) * cardW / RIB.base;
  const rx = mobile ? deg(4 + Math.sin(t * Math.PI) * 1) : deg(6 + Math.sin(t * Math.PI) * 1.5);
  const ry = mobile ? deg(2 - t * 4) + deg(lean * .2) : deg(3 - t * 6) + deg(lean * .25);
  const rz = mobile ? deg(-2 - t * 1.5) - deg(lean * .2) : deg(-2.5 - t * 2) - deg(lean * .25);
  const w = RIB.base * scale, h = w * 460 / 540;
  return {
    x: xVw / 100 * W - W / 2, y: H / 2 - yVh / 100 * H, z: -50 + t * 100,
    q: new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), w, h, op: mobile && Math.abs(xVw - 50) >= 72 ? 0 : 1, br: 1, glow: 0, tall: 0, xVw,
  };
}
// the card nearest the middle of the screen
const ribCentre = () => {
  const { dx, min, total } = ribDims();
  let best = 0, far = Infinity;
  for (let i = 0; i < N; i++) { const d = Math.abs(wrapRange(min, min + total, i * dx + rib.offset) - 50); if (d < far) { far = d; best = i; } }
  return best;
};

/* ---------- the carousel layouts as a place in the scene ---------- */

// the middle of the card stage: on the landing copy, the real stage under the header; here, the window
let stageX = 0, stageY = 0;
function measureStage() {
  const r = document.querySelector(".projects .stage")?.getBoundingClientRect();
  if (r && r.height) { stageX = r.left + r.width / 2 - W / 2; stageY = H / 2 - (r.top + r.height * .46); }
  else { stageX = 0; stageY = H * .04; }
}
measureStage();

function carouselPose(m, d) {
  const P = pose(m, d), ry = THREE.MathUtils.degToRad(P.ry);
  return {
    x: stageX + P.tx + P.rr * Math.sin(ry), y: stageY - P.ty * P.h, z: P.rr * Math.cos(ry) - P.rr,
    q: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, -THREE.MathUtils.degToRad(P.rot), "YXZ")),
    w: P.w * P.sc, h: P.h * P.sc, cw: P.w, ch: P.h, op: P.op, br: P.br, glow: P.glow, tall: TALL.has(m) ? 1 : 0,
  };
}
// grid (landing copy only): each sheet over its grid card, flat, in page pixels
const flat = new THREE.Quaternion();
function gridPose(c) {
  const el = document.querySelectorAll(".projects .stage-card")[c.i], r = el?.getBoundingClientRect();
  if (!r || !r.width || c.i >= PROJECTS.length) return { x: 0, y: 0, z: -400, q: flat, w: 300, h: 255, op: 0, br: 1, glow: 0, tall: 0 };
  return { x: r.left + r.width / 2 - W / 2, y: H / 2 - (r.top + r.height / 2), z: 0, q: flat, w: r.width, h: r.height, op: 1, br: 1, glow: 0, tall: 0 };
}
const place = (m, c) => (m === "ribbon" ? ribbonPose(c.i) : m === "grid" ? gridPose(c) : carouselPose(m, c.d));
const camFor = (m) => (m === "ribbon" ? { fov: RIB.fov, z: H / (2 * Math.tan(THREE.MathUtils.degToRad(RIB.fov / 2))) } : { fov: 2 * Math.atan(H / 2 / PERSP) * 180 / Math.PI, z: PERSP });

/* ---------- motion: one continuous spring for the carousel, a blend between layouts ---------- */

let cur = 0, vel = 0, target = 0;
let mode = "bend", from = "bend", blend = 1;
const go = (to) => { target = to; };
const setMode = (m) => {
  if (m === mode) return;
  // hand the place in the list across, so the same project stays in front
  if (m === "ribbon") {
    const { dx } = ribDims(), k = Math.round(cur);
    rib.offset = rib.target = 50 - k * dx; rib.momentum = 0;
  } else if (mode === "ribbon") {
    cur = target = ribCentre(); vel = 0;
  }
  from = mode; mode = m; blend = 0;
  document.querySelectorAll("button[data-mode]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === m));
};
document.querySelectorAll("button[data-mode]").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));

// wheel and trackpad: in the carousel one card per gesture, as on the live page;
// on the ribbon a push of momentum, as in Visual DEPT
let acc = 0, used = false, lastT = 0, lastMag = 0, movedT = 0;
addEventListener("wheel", (e) => {
  if (mode === "grid") return;
  e.preventDefault();
  if (mode === "ribbon") {
    let dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 28; else if (e.deltaMode === 2) dy *= 450;
    rib.momentum += Math.sign(dy) * Math.min(Math.abs(dy), 160) * .026 * .88;
    return;
  }
  const now = performance.now(), delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX, mag = Math.abs(delta);
  const fresh = now - lastT > 220 || (now - movedT > 350 && mag > 24 && mag > lastMag * 1.8);
  if (fresh) { used = false; acc = 0; }
  lastT = now; lastMag = mag;
  if (used) return;
  acc += delta;
  if (Math.abs(acc) > 30) { go(target + Math.sign(acc)); used = true; movedT = now; }
}, { passive: false });
addEventListener("keydown", (e) => {
  const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
  if (!step || mode === "grid") return;
  if (mode === "ribbon") rib.target -= step * ribDims().dx;
  else go(target + step);
});

// pointer: brushes the sheet under it; on the ribbon a drag along the diagonal throws
// the cards (a fling keeps going); a click without a drag opens or brings in a card
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(-9, -9);
const along = (x, y) => x * .97 + y * -.24;   // drag along the (gentler) diagonal
let drag = null, travelled = 0;
canvas.addEventListener("pointerdown", (e) => {
  travelled = 0;
  if (mode !== "ribbon" || e.pointerType === "touch") return;
  drag = { along: along(e.clientX, e.clientY), t: performance.now(), v: 0 };
  rib.momentum = 0; rib.dragging = true;
  canvas.setPointerCapture(e.pointerId);
});
addEventListener("pointermove", (e) => {
  mouse.set(e.clientX / W * 2 - 1, -(e.clientY / H) * 2 + 1);
  travelled += Math.abs(e.movementX) + Math.abs(e.movementY);
  if (!drag) return;
  const now = performance.now(), dt = Math.max(1, now - drag.t), a = along(e.clientX, e.clientY), delta = (drag.along - a) * 1.5;
  drag.along = a; drag.t = now;
  rib.target += delta * .08;
  drag.v = delta / dt * 16;
});
addEventListener("pointerup", () => {
  if (!drag) return;
  if (performance.now() - drag.t < 130 && Math.abs(drag.v) > .3) rib.momentum += drag.v * .18;
  drag = null; rib.dragging = false;
});
canvas.addEventListener("pointerleave", () => { if (!drag) mouse.set(-9, -9); });
let touch = null;
canvas.addEventListener("touchstart", (e) => {
  const p = e.touches[0];
  touch = { x: p.clientX, y: p.clientY, x0: p.clientX, t: performance.now(), v: 0 };
  if (mode === "ribbon") { rib.momentum = 0; rib.dragging = true; }
}, { passive: true });
canvas.addEventListener("touchmove", (e) => {
  if (!touch || mode !== "ribbon") return;
  e.preventDefault();
  const p = e.touches[0], now = performance.now(), dt = Math.max(1, now - touch.t);
  const delta = (touch.y - p.clientY) * 1.8 + (touch.x - p.clientX) * 1.4;
  touch.x = p.clientX; touch.y = p.clientY; touch.t = now;
  rib.target += delta * .18;
  touch.v = delta / dt * 18;
}, { passive: false });
canvas.addEventListener("touchend", (e) => {
  if (!touch) return;
  if (mode === "ribbon") {
    if (performance.now() - touch.t < 140 && Math.abs(touch.v) > .2) rib.momentum += touch.v * .24;
    rib.dragging = false;
  } else {
    const dx = e.changedTouches[0].clientX - touch.x0;
    if (Math.abs(dx) > 40) go(target + (dx < 0 ? 1 : -1));
  }
  touch = null;
});
let hovered = null;
canvas.addEventListener("click", () => {
  if (!hovered || travelled > 6) return;
  if (mode === "ribbon") { location.href = hovered.p.href; return; }
  const d = hovered.d;
  if (Math.abs(d) < .5) location.href = hovered.p.href;
  else go(target + Math.sign(d));
});

const ease = (t) => t * t * (3 - 2 * t);
const V = new THREE.Vector3(), QI = new THREE.Quaternion();
let clock = performance.now();

function frame(now) {
  const dt = Math.min((now - clock) / 1000, 1 / 30);
  clock = now;
  // carousel: a critically damped spring, so a scroll mid-way retargets smoothly
  const K = 46, C = 2 * Math.sqrt(K);
  vel += (K * (target - cur) - C * vel) * dt;
  cur += vel * dt;
  // ribbon: Visual DEPT's momentum, friction and easing, per frame as there
  if (Math.abs(rib.momentum) > .001) { rib.target += rib.momentum; rib.momentum *= .925; } else rib.momentum = 0;
  rib.lag = rib.target - rib.offset;
  rib.offset += rib.lag * (rib.dragging ? .16 : .075);
  if (blend < 1) blend = Math.min(1, blend + dt / .8);
  const b = ease(blend);
  const ca = camFor(from), cb = camFor(mode);
  camera.fov = ca.fov + (cb.fov - ca.fov) * b;
  camera.position.z = ca.z + (cb.z - ca.z) * b;
  camera.updateProjectionMatrix();

  ray.setFromCamera(mouse, camera);
  const hits = ray.intersectObjects(cards.filter((c) => c.mesh.visible).map((c) => c.mesh));
  hits.sort((x, y) => y.object.renderOrder - x.object.renderOrder);
  const top = hits[0];
  hovered = top ? cards.find((c) => c.mesh === top.object) : null;
  canvas.style.cursor = drag ? "grabbing" : hovered ? "pointer" : mode === "ribbon" ? "grab" : "default";

  // (re-measured while the carousel shows: the grid lays the page out differently)
  if (mode !== "grid") measureStage();
  // the card in the middle plays its recording
  const middle = mode === "ribbon" ? ribCentre() : ((Math.round(cur) % N) + N) % N;
  // on the grid, the cards on screen play (on a phone that's one or two, not all four at once)
  const seen = mode === "grid" ? onScreen() : null;
  if (mode === "grid") {
    videos.forEach(({ v }, k) => {
      if (seen.has(k) && !videoOff) { if (v.paused) v.play().catch(() => {}); } else if (!v.paused) v.pause();
    });
    playing = "grid";
  } else play(cards[middle].look === "paper" ? cards[middle].k : -1);
  const lit = (c) => (mode === "grid" ? c.i < PROJECTS.length && seen.has(c.k) : c.i === middle);

  for (const c of cards) {
    // d: places from the middle of the carousel, wrapped into -N/2..N/2 (the wrap is out of sight)
    c.d = ((((c.i - cur) % N) + N + N / 2) % N) - N / 2;
    const A = place(from, c), B = place(mode, c), mix = (k) => A[k] + (B[k] - A[k]) * b;
    const x = mix("x"), y = mix("y"), z = mix("z"), Q = A.q.clone().slerp(B.q, b);
    const w = mix("w"), h = mix("h"), op = mix("op"), sx = w / SIM.w, sy = h / SIM.h;
    c.mesh.position.set(x, y, z);
    c.mesh.quaternion.copy(Q);
    c.mesh.scale.set(sx, sy, (sx + sy) / 2);
    const u = c.mesh.material.uniforms;
    u.uMix.value = mix("tall");
    u.uSize.value.set(A.cw ?? A.w, A.ch ?? A.h).lerp(new THREE.Vector2(B.cw ?? B.w, B.ch ?? B.h), b);
    u.uOpacity.value = op; u.uBright.value = mix("br");
    c.vOn += ((lit(c) && c.look === "paper" && !videoOff ? 1 : 0) - c.vOn) * Math.min(1, dt * 6);
    u.uVideoOn.value = c.vOn;
    // every card but the one in the middle is washed out; it clears as a card arrives
    c.focus = (c.focus ?? 0) + ((lit(c) ? 1 : 0) - (c.focus ?? 0)) * Math.min(1, dt * 5);
    u.uWash.value = 1 - c.focus;
    c.mesh.visible = op > .01;

    // drive the cloth by how the card moved, felt in its own frame
    const key = mode === "ribbon" ? B.xVw : c.d;
    const jumped = c.lastKey != null && Math.abs(key - c.lastKey) > (mode === "ribbon" ? 60 : 2);
    c.lastKey = key;
    if (!c.last || jumped) {
      c.cloth.place(-SIM.w / 2, -SIM.h / 2, 0);
      c.last = new THREE.Vector3(x, y, z);
    } else {
      V.set(x, y, z).sub(c.last).applyQuaternion(QI.copy(Q).invert());
      c.last.set(x, y, z);
      const feel = .65;
      let brush = null;
      if (hovered === c && top && !drag) {
        const l = c.mesh.worldToLocal(top.point.clone()), bx = l.x + SIM.w / 2, by = l.y + SIM.h / 2;
        brush = { x: bx, y: by, vx: c.bx === undefined ? 0 : (bx - c.bx) / dt, vy: c.by === undefined ? 0 : (by - c.by) / dt, reach: .35 * SIM.w };
        c.bx = bx; c.by = by;
        c.cloth.wake();
      } else c.bx = c.by = undefined;
      c.cloth.step(dt, c.cloth.x + V.x / sx * feel, c.cloth.y + V.y / sy * feel, c.cloth.z + V.z * feel, now / 1000, brush);
    }
    const pos = c.geo.attributes.position, nor = c.geo.attributes.normal, cp = c.cloth.pos, cn = c.cloth.normal;
    const px = c.cloth.x + SIM.w / 2, py = c.cloth.y + SIM.h / 2, pz = c.cloth.z;
    for (let r = 0; r < SIM.ny; r++) for (let col = 0; col < SIM.nx; col++) {
      const t = r * SIM.nx + col, s = (SIM.ny - 1 - r) * SIM.nx + col;
      pos.setXYZ(t, cp[s * 3] - px, cp[s * 3 + 1] - py, cp[s * 3 + 2] - pz);
      nor.setXYZ(t, cn[s * 3], cn[s * 3 + 1], cn[s * 3 + 2]);
    }
    pos.needsUpdate = nor.needsUpdate = true;
    c.geo.computeBoundingSphere();

    // shadow just under the card, haze spread wide behind the side cards
    c.shadow.position.set(x, y - h * .1, z - 1);
    c.shadow.quaternion.copy(Q);
    c.shadow.scale.set(w * 1.05, h * 1.05, 1);
    // (black on the lamp's dark page, where the tinted shadow would glow like a pale card)
    const dk = document.documentElement.classList.contains("lamp-on");
    c.shadow.material.color.set(dk ? "#000" : c.shade);
    c.shadow.material.opacity = (dk ? .7 : .45) * op;
    c.shadow.visible = c.mesh.visible;
    const glow = mix("glow");
    c.glow.position.set(x, y, z - 2);
    c.glow.quaternion.copy(Q);
    c.glow.scale.set(w * 2.6, h * 1.2, 1);
    c.glow.material.opacity = glow * op;
    c.glow.visible = glow * op > .01;
  }
  // back to front: nearer the viewer later, and in the carousel the middle card above its neighbours
  const rank = (c) => c.mesh.position.z - (mode === "ribbon" ? 0 : Math.abs(c.d) * 40 * b) - (from === "ribbon" ? 0 : Math.abs(c.d) * 40 * (1 - b));
  [...cards].sort((p, q) => rank(p) - rank(q)).forEach((c, k) => { c.glow.renderOrder = k * 3; c.shadow.renderOrder = k * 3 + 1; c.mesh.renderOrder = k * 3 + 2; });

  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
