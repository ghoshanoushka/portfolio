// The landing (index.html) with the cloth cards in place of the DOM cards.
// Everything else is the live page: name, nav, lamp, Tino, the bottom switch. The cloth listens to the
// switch's own layout and view buttons, and a Ribbon button joins them.
const ready = () => new Promise((done) => {
  const look = () => (document.querySelector(".projects .stage-modes") ? done() : requestAnimationFrame(look));
  look();
});
await ready();

const projects = document.querySelector(".projects");
projects.querySelector(".stage-modes").insertAdjacentHTML("beforeend", '<button type="button" data-mode="ribbon" aria-pressed="false" title="Visual DEPT\'s own motion">Ribbon</button>');
document.head.insertAdjacentHTML("beforeend", `<style>
  /* the cloth draws the carousel; the DOM cards stay for the grid */
  #stage { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 1; touch-action: none; }
  .projects:not(.is-grid) .stage { visibility: hidden; }
  /* the page's own layers sit over the cloth and stay clickable; empty space lets the pointer through */
  .shell { position: relative; z-index: 2; pointer-events: none; }
  .shell :is(a, button, input, textarea, select, label, [role="button"], .stage-tabs, .home-made) { pointer-events: auto; }
  .projects.is-grid, .projects.is-grid * { pointer-events: auto; }
</style>`);
document.body.insertAdjacentHTML("afterbegin", '<canvas id="stage" aria-label="Projects"></canvas>');

// On the grid the cloth draws the cards too: each sheet sits over its grid card (which stays, see-through,
// as the link) and ripples as the page scrolls or the pointer passes. The cards take the paper's shape.
document.head.insertAdjacentHTML("beforeend", `<style>
  .projects.is-grid .stage-card[data-pos] { aspect-ratio: 540 / 460; opacity: 0 !important; }
</style>`);
for (const el of projects.querySelectorAll(".stage-card")) el.replaceChildren();   // (no hidden live iframes running)


await import("./preview.js");
// carousel or grid, from the page's own switch
let before = "bend";
const sync = () => {
  const [now] = window.__mode();
  if (projects.classList.contains("is-grid")) { if (now !== "grid") { before = now; window.__setMode("grid"); } }
  else if (now === "grid") window.__setMode(before);
};
new MutationObserver(sync).observe(projects, { attributes: true, attributeFilter: ["class"] });
sync();
