// Fun page: the tiles in the same paper layout as the project cards: a small caps
// row with the kind of project and the year over a rule, the title as a serif headline, the line under it
// muted. Logos and hover stickers stay. Type comes from styles.css.
const ready = () => new Promise((done) => {
  const look = () => (document.querySelector(".fun-tile") ? done() : requestAnimationFrame(look));
  look();
});
await ready();
document.head.insertAdjacentHTML("beforeend", `<style>
  .fun-page .fun-tile { gap: 0; color: var(--ink-100); }
  .fun-page .fun-tile .nc-top { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 9px; border-bottom: 1px solid color-mix(in srgb, var(--foreground) 14%, transparent); font: 500 11px/1 var(--font-sans); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-55); }
  .fun-page .fun-tile .nc-top b { font-weight: 500; color: var(--ink-80); }
  .fun-page .fun-tile .stage-title { margin-top: 12px; font-family: var(--font-serif); font-weight: 400; font-size: 21px; line-height: 1.15; letter-spacing: -0.02em; }
  .fun-page .fun-tile .stage-tag { margin-top: 4px; font-size: 13px; line-height: 1.45; color: var(--ink-55); opacity: 1; }
  .fun-page .fun-tile .stage-top { gap: 0; }
  .fun-page .fun-tile .fun-logo { margin: auto; }
  .fun-page .fun-tile .stage-bottom { display: none; }
  .fun-page .fun-tile .fun-label { display: none; }
</style>`);
for (const t of document.querySelectorAll(".fun-tile")) {
  const top = t.querySelector(".stage-top"), group = t.querySelector(".fun-label")?.textContent || "", year = t.querySelector(".stage-bottom span:last-child")?.textContent || "";
  top.insertAdjacentHTML("afterbegin", `<div class="nc-top"><b>${group}</b><span>${year}</span></div>`);
}

/* ---------- cloth: each tile is a sheet of cloth over its place in the grid ---------- */
// The tiles are printed once to cloth-preview/fun/tile-*.png (from this page with ?capture). Each sheet is drawn
// exactly over its tile and ripples as the page scrolls or the pointer passes; the tile itself stays, see-through,
// as the link and to hold the hover stickers.
if (!new URLSearchParams(location.search).has("capture") && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const THREE = await import("three");
  const { Cloth } = await import("./clothSim.js");
  const tiles = [...document.querySelectorAll(".fun-tile")];
  document.head.insertAdjacentHTML("beforeend", `<style>
    #fun-cloth { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
    .shell { position: relative; z-index: 2; }
    .fun-page .fun-tile.cloth > :not(.fun-stk) { visibility: hidden; }
    /* the tile's own face, edge and shadow would show as a still card behind the moving cloth */
    .fun-page .fun-tile.cloth::after { display: none; }
    /* (no hover stickers on the cloth tiles) */
    .fun-page .fun-tile.cloth .fun-stk { display: none; }
  </style>`);
  document.body.insertAdjacentHTML("afterbegin", '<canvas id="fun-cloth" aria-hidden="true"></canvas>');
  const canvas = document.getElementById("fun-cloth");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene(), PERSP = 1100, camera = new THREE.PerspectiveCamera(45, 1, 10, 8000);
  camera.position.z = PERSP;
  let W = 0, H = 0;
  const resize = () => {
    W = innerWidth; H = innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.fov = 2 * Math.atan(H / 2 / PERSP) * 180 / Math.PI;
    camera.updateProjectionMatrix();
  };
  resize();
  addEventListener("resize", resize);
  // lit as the project cards: the print exactly at rest, a soft shade in the ripples, a little sheen at glancing angles
  const material = (map) => new THREE.ShaderMaterial({
    uniforms: { uMap: { value: map }, uSize: { value: new THREE.Vector2(1, 1) }, uLight: { value: new THREE.Vector3(-.35, .5, .8).normalize() } },
    vertexShader: `varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
      void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.); vView = -mv.xyz; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform sampler2D uMap; uniform vec2 uSize; uniform vec3 uLight; varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
      void main() {
        vec2 p = (vUv - .5) * uSize, q = abs(p) - (uSize * .5 - 18.);
        float d = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - 18.;
        float edge = 1. - smoothstep(-1., .5, d);
        if (edge <= 0.) discard;
        vec4 c = texture2D(uMap, vUv);
        vec3 n = normalize(vNormal); if (!gl_FrontFacing) n = -n;
        float facing = clamp((dot(n, uLight) + .45) / 1.45, 0., 1.), lying = (uLight.z + .45) / 1.45;
        float light = .86 + .14 * facing / max(lying, .01), glance = pow(1. - max(dot(n, normalize(vView)), 0.), 3.);
        gl_FragColor = vec4(c.rgb * light + glance * .16, edge);
        #include <colorspace_fragment>
      }`,
    side: THREE.DoubleSide, transparent: true, depthTest: false, depthWrite: false,
  });
  const loader = new THREE.TextureLoader();
  // a soft shadow under each sheet that moves with it
  const shade = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d"), r = g.createRadialGradient(64, 64, 10, 64, 64, 64);
    r.addColorStop(0, "rgba(255,255,255,.5)"); r.addColorStop(.6, "rgba(255,255,255,.18)"); r.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const PHONE = matchMedia("(max-width: 639px)").matches;
  const sheets = tiles.map((el, i) => {
    const r = el.getBoundingClientRect(), w = r.width, h = r.height;
    const nx = 13, ny = Math.max(9, Math.round(13 * h / w));
    const cloth = new Cloth(w, h, nx, ny);
    cloth.place(-w / 2, -h / 2, 0);
    // one column on a phone: every tile is the same wide card there, so it takes the print made at that size
    const map = loader.load(new URL(`fun/tile-${i}${PHONE ? "-phone" : ""}.png`, import.meta.url).href);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    const geo = new THREE.PlaneGeometry(w, h, nx - 1, ny - 1);
    const mesh = new THREE.Mesh(geo, material(map));
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shade, transparent: true, depthTest: false, depthWrite: false, opacity: .55 }));
    shadow.renderOrder = 0; mesh.renderOrder = 1;
    scene.add(shadow, mesh);
    el.classList.add("cloth");
    return { el, w, h, nx, ny, cloth, geo, mesh, shadow, last: null, bx: undefined, by: undefined };
  });
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(-9, -9);
  addEventListener("pointermove", (e) => mouse.set(e.clientX / W * 2 - 1, -(e.clientY / H) * 2 + 1));
  document.addEventListener("pointerleave", () => mouse.set(-9, -9));
  const V = new THREE.Vector3();
  let clock = performance.now();
  // (shadow colour: a soft violet on the light page; black on the lamp's dark page, where any colour would glow)
  const dark = () => document.documentElement.classList.contains("lamp-on");
  const frame = (now) => {
    const dt = Math.min((now - clock) / 1000, 1 / 30);
    clock = now;
    ray.setFromCamera(mouse, camera);
    const top = ray.intersectObjects(sheets.map((s) => s.mesh))[0];
    for (const s of sheets) {
      const r = s.el.getBoundingClientRect(), x = r.left + r.width / 2 - W / 2, y = H / 2 - (r.top + r.height / 2);
      const sx = r.width / s.w, sy = r.height / s.h;
      s.mesh.position.set(x, y, 0);
      s.mesh.scale.set(sx, sy, (sx + sy) / 2);
      s.mesh.material.uniforms.uSize.value.set(r.width, r.height);
      s.shadow.material.color.set(dark() ? "#000" : "#28205a");
      s.shadow.material.opacity = dark() ? .8 : .55;
      s.shadow.position.set(x, y - r.height * .08, -1);
      s.shadow.scale.set(r.width * 1.05, r.height * 1.02, 1);
      if (!s.last) s.last = new THREE.Vector3(x, y, 0);
      V.set(x, y, 0).sub(s.last);
      s.last.set(x, y, 0);
      let brush = null;
      if (top?.object === s.mesh) {
        const l = s.mesh.worldToLocal(top.point.clone()), bx = l.x + s.w / 2, by = l.y + s.h / 2;
        brush = { x: bx, y: by, vx: s.bx === undefined ? 0 : (bx - s.bx) / dt, vy: s.by === undefined ? 0 : (by - s.by) / dt, reach: .35 * Math.min(s.w, s.h) };
        s.bx = bx; s.by = by;
        s.cloth.wake();
      } else s.bx = s.by = undefined;
      s.cloth.step(dt, s.cloth.x + V.x / sx * .65, s.cloth.y + V.y / sy * .65, s.cloth.z, now / 1000, brush);
      const pos = s.geo.attributes.position, nor = s.geo.attributes.normal, cp = s.cloth.pos, cn = s.cloth.normal;
      const px = s.cloth.x + s.w / 2, py = s.cloth.y + s.h / 2, pz = s.cloth.z;
      for (let row = 0; row < s.ny; row++) for (let col = 0; col < s.nx; col++) {
        const t = row * s.nx + col, k = (s.ny - 1 - row) * s.nx + col;
        pos.setXYZ(t, cp[k * 3] - px, cp[k * 3 + 1] - py, cp[k * 3 + 2] - pz);
        nor.setXYZ(t, cn[k * 3], cn[k * 3 + 1], cn[k * 3 + 2]);
      }
      pos.needsUpdate = nor.needsUpdate = true;
      s.geo.computeBoundingSphere();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
