// Edit this block to make the site yours.
const SITE = {
  name: "Anoushka Ghosh",
  timezone: "America/Los_Angeles",
  nav: [
    { label: "Work", href: "index.html" },
    { label: "Fun", href: "fun.html" },
    { label: "About", href: "about.html" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anoushkaghosh/" },
    { label: "Behance", href: "https://www.behance.net/Anoushka-Ghosh" },
    { label: "GitHub", href: "https://github.com/ghoshanoushka" },
    { label: "Resume", href: "https://drive.google.com/file/d/1x3pUb8lTMzYpkzIJ6nRIZ6F23U4mlWyp/view" },
    { label: "Let's Chat", href: "https://calendly.com/noushka-umich/30min" },
  ],
  // `media` can be an image, .mp4 or looping .html page (e.g. "media/project.mp4").
  // Without media, a gradient placeholder is drawn from `colors`.
  // `cursor` is the label that follows the mouse: "View project", "Visit site", "Coming soon".
  // `ratio` is the thumbnail aspect ratio (width / height).
  // `tint` and `blurb` are used by the row layout (<div class="projects" data-layout="rows">);
  // `tagline` and `card` (two gradient colours) by the card carousel (data-layout="cards").
  // Fun page tiles in a bento grid. `group` is the small label on the card (Hackathon, Concept); `size` is wide (2 columns) or small. `logo` is the app's own logo, shown in the middle; `stickers` (three) peek in from the tile's edges on hover. Without `href` a tile reads "Coming soon".
  fun: [
    // Lounge is paused; its page and media stay in the repo. To bring it back:
    // { title: "Lounge", tagline: "A calmer TV home screen", year: "2026", href: "projects/tv.html", card: ["#2A2350", "#8F7CD6"], media: "media/fun/tv/tv.html" },
    { title: "ctrl z", tagline: "1st place at Converge '25", year: "2025", group: "Hackathon", size: "tall", href: "projects/ctrlz.html", card: ["#E3DAFB", "#F7F3FF"], logo: "media/fun/ctrlz/logo.png", stickers: ["media/fun/ctrlz/stk-run.webp", "media/fun/ctrlz/stk-picnic.webp", "media/fun/ctrlz/stk-fish.webp"] },
    { title: "Bumpy AI", tagline: "An AI helper for a pregnancy app", year: "2025", group: "Hackathon", href: "projects/bumpy.html", card: ["#F3DFEC", "#E6EDFC"], logo: "media/fun/bumpy/mark-round.png", logoClass: "round", stickers: ["media/fun/bumpy/stk-water.webp", "media/fun/bumpy/stk-yoga.webp", "media/fun/bumpy/stk-couple.webp"], stickerClass: "card" },
    { title: "Coverflow", tagline: "Apple Music on Vision Pro", year: "2025", group: "Concept", size: "tall", href: "projects/coverflow.html", card: ["#F6DEDC", "#EEF0F5"], logo: "media/fun/coverflow/logo.png", logoClass: "wide", stickers: ["media/fun/coverflow/stk-car.webp", "media/fun/coverflow/stk-top.webp", "media/fun/coverflow/stk-track.webp"], stickerClass: "card" },
    { title: "Somnia", tagline: "A sleep app that grows a garden", year: "2025", group: "Concept", href: "projects/somnia.html", card: ["#D6DCF5", "#EEF1FC"], logo: "media/fun/somnia/logo-moon.png", logoClass: "moon", stickers: ["media/fun/somnia/stk-seed.webp", "media/fun/somnia/stk-daisy.webp", "media/fun/somnia/stk-spark.webp"] },
  ],
  projects: [
    { title: "Mensio", sub: "Shipped 2026", href: "projects/mensio.html", cursor: "View project", ratio: 16 / 9, media: "media/mensio/hero.html", colors: ["#2b3a67", "#7aaee9"], tint: "#E9F0FC", tagline: "Data you can pull yourself", card: ["#24407A", "#6FA6EC"], blurb: "Redesigned the Data Explorer so customers build their own charts instead of emailing analysts." },
    { title: "Deploy Design System", sub: "Shipped 2026", href: "projects/deploy-design-system.html", cursor: "View project", ratio: 16 / 9, media: "media/deploy/hero.html", colors: ["#050a1f", "#2f6bff"], tint: "#ECE8FA", tagline: "One system for product and marketing", card: ["#4B3699", "#A493E3"], blurb: "Rebuilt the design system for the Deploy rebrand. One system for the Portal and the marketing site." },
    { title: "Claim Denials", sub: "Capstone 2025", href: "projects/denials.html", cursor: "View project", ratio: 16 / 9, media: "media/denials/hero.html", colors: ["#0f5c59", "#4fc1a6"], tint: "#E6F5F1", tagline: "From denial alert to fix, faster", card: ["#0F5C59", "#4FC1A6"], blurb: "Redesigned a denials platform so revenue cycle teams find and fix high-dollar denials with fewer clicks." },
    { title: "Deploy Chat", sub: "Shipping 2026", cursor: "Coming soon", ratio: 16 / 9, colors: ["#0b1430", "#4a7dff"], tint: "#F8EAF3", tagline: "Coming soon", card: ["#8E3A7E", "#E79BCB"], blurb: "Coming soon." },
  ],

};

// Pages in subfolders (e.g. projects/) set <body data-root="../"> so shared links resolve.
const ROOT = document.body.dataset.root || "";
const currentPage = location.pathname.split("/").pop() || "index.html";
const isProject = document.body.dataset.page === "project";
// Heading font preview: add ?font=<key> to any page to try a sans instead of Libre Baskerville; [family, axes, weight].
const HEAD_FONTS = {
  geist: ["Geist", ":wght@400..700", 500], bricolage: ["Bricolage Grotesque", ":wght@400..700", 500], jakarta: ["Plus Jakarta Sans", ":wght@400..700", 500], manrope: ["Manrope", ":wght@400..700", 500],
};
const headFont = HEAD_FONTS[new URLSearchParams(location.search).get("font")];
if (headFont) {
  const [family, axes, weight] = headFont;
  document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}${axes}&display=swap">`);
  document.documentElement.style.setProperty("--font-head", `"${family}", var(--font-sans)`);
  document.documentElement.style.setProperty("--head-weight", weight);
}
// Preview of the cleaner project page: add ?look to a project URL.
if (isProject && new URLSearchParams(location.search).has("look")) document.body.classList.add("look-new");

function navLinks() {
  return SITE.nav
    .map(({ label, href }) => {
      const active = href === currentPage || (isProject && href === "index.html") ? ' data-active="true"' : "";
      return `<a class="nav-link" href="${ROOT}${href}"${active}>${label}</a>`;
    })
    .join("");
}

// Nav icons (sidebar pill and phone bottom bar): Phosphor, regular weight.
const NAV_ICONS = {
  Work: "M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z",
  Fun: "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z",
  About: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z",
  Mail: "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z",
};
const navIcon = (label) => `<svg class="ph" viewBox="0 0 256 256" aria-hidden="true"><path d="${NAV_ICONS[label] || NAV_ICONS.Work}"/></svg>`;

// Desktop sidebar: a vertical pill that shows icons and opens to labels on hover or focus.
function pillLinks() {
  return SITE.nav
    .map(({ label, href }) => {
      const active = href === currentPage ? ' data-active="true" aria-current="page"' : "";
      return `<a class="nav-link pill-link" href="${ROOT}${href}"${active}>${navIcon(label)}<span>${label}</span></a>`;
    })
    .join("");
}

// Sidebar table of contents built from <section id> and .project-subsection[id] on project pages.
function tocLinks() {
  return [...document.querySelectorAll("main section[id], main .project-subsection[id]")]
    .map((el) => {
      const sub = el.classList.contains("project-subsection") ? " toc-sub" : "";
      return `<a class="nav-link${sub}" href="#${el.id}" data-toc="${el.id}">${el.dataset.toc || el.id}</a>`;
    })
    .join("");
}

// "Built with Claude Code", with a tiny original pixel cat drawn from a character map.
// 1 body, 4 ear and paw pink-lilac, 2 eye, 5 eye shine, 3 blush, 6 nose. The tail is its own group so it can flick.
function madeWith() {
  const BODY = [
    "..1......1..",
    ".141....141.",
    ".1111111111.",
    "111111111111",
    "115211115211",
    "112211112211",
    "131116611131",
    ".1111111111.",
    ".1411111141.",
    "..11....11..",
  ];
  const TAIL = [[12, 7], [13, 6], [13, 5], [12, 4]];
  const fill = { 1: "var(--primary)", 2: "#2B2342", 3: "#F3A6C0", 4: "#D9CCF7", 5: "#fff", 6: "#F3A6C0" };
  const rect = (x, y, c) => `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${fill[c]}"/>`;
  const cells = (pick) => BODY.flatMap((row, y) => [...row].map((c, x) => (pick(c) ? rect(x, y, c) : ""))).join("");
  const svg = `<svg class="pix" viewBox="0 -1 14 11" aria-hidden="true">
    <g class="pix-tail">${TAIL.map(([x, y]) => rect(x, y, 1)).join("")}</g>
    <g class="pix-body">${cells((c) => c !== "." && c !== "2" && c !== "5")}<g class="pix-eyes">${cells((c) => c === "2" || c === "5")}</g></g>
  </svg>`;
  return `<p class="made"><button type="button" class="pix-btn" aria-label="Pet the cat">${svg}</button><span>Built with <a href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer">Claude Code</a></span></p>`;
}

// Click the pixel cat: it hops and sends up a few pixel hearts.
const PIX_HEART = '<svg viewBox="0 0 7 6" aria-hidden="true"><path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z" fill="#E5484D"/></svg>';
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".pix-btn");
  if (!btn) return;
  btn.classList.remove("pet");
  void btn.offsetWidth;
  btn.classList.add("pet");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r = btn.getBoundingClientRect();
  const h = document.createElement("span");
  h.className = "pix-heart";
  h.innerHTML = PIX_HEART;
  h.style.left = `${r.left + r.width / 2}px`;
  h.style.top = `${r.top}px`;
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1600);
});

function renderChrome() {
  document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = SITE.name));

  // One header on every page, homepage included: the name and one line on the left, links on the right.
  const isHome = document.body.classList.contains("home-cards");
  // Project pages light up the section they belong to.
  const section = isHome ? "index.html" : isProject ? (document.body.dataset.parent === "fun" ? "fun.html" : "index.html") : currentPage;
  const resume = SITE.socials.find((x) => x.label === "Resume");
  const links = ["Work", "Fun", "About"].map((l) => SITE.nav.find((n) => n.label === l)).filter(Boolean).map(({ label, href }) =>
    `<a href="${ROOT}${href}"${href === section ? ' aria-current="page"' : ""}>${label}</a>`).join("") +
    (resume ? `<a href="${resume.href}" target="_blank" rel="noopener noreferrer">Resume</a>` : "");
  const head = `<header class="cards-head site-head fade-in">
      <div class="cards-id">
        <div class="cards-name"><a class="cards-logo" href="${ROOT}index.html">anoushka</a><span class="head-clock" title="San Francisco"><svg class="ggb" viewBox="0 0 40 20" aria-hidden="true"><g class="ggb-sky"></g><path class="ggb-hang" d="M4 13.5v-1.6M7 13.5v-3M16 13.5v-4.2M20 13.5v-5M24 13.5v-4.2M33 13.5v-3M36 13.5v-1.6"/><path class="ggb-cable" d="M0 13 Q6 9 11 2 Q20 13.5 29 2 Q34 9 40 13"/><path class="ggb-deck" d="M0 14h40"/><path class="ggb-tower" d="M10 1.5v18M12 1.5v18M28 1.5v18M30 1.5v18M10 4h2M10 7.5h2M10 11h2M28 4h2M28 7.5h2M28 11h2"/></svg><span class="clock"></span></span></div>
        <p class="cards-bio">Product designer at <a href="https://deploy.com" target="_blank" rel="noopener noreferrer">Deploy</a>, making complex tools feel simple.</p>
      </div>
      <nav class="cards-nav" aria-label="Site">${links}</nav>
    </header>`;
  if (isHome) document.querySelector("main.content").insertAdjacentHTML("afterbegin", head);
  else document.querySelector(".shell .page-margin").insertAdjacentHTML("afterbegin", `<div class="grid-12">${head}</div>`);

  // Inner pages: the links stay pinned top right, and a back-to-top button shows once you scroll.
  const pinNav = () => document.body.classList.toggle("scrolled", scrollY > 40);
  addEventListener("scroll", pinNav, { passive: true });
  pinNav();
  if (!isHome) {
    document.body.insertAdjacentHTML("beforeend", `<button type="button" class="to-top" aria-label="Back to top"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15V5M5 10l5-5 5 5"/></svg></button>`);
    // Project pages also get the next project in their list (work or fun), wrapping round.
    if (isProject) {
      const list = (document.body.dataset.parent === "fun" ? SITE.fun : SITE.projects).filter((x) => x.href);
      const here = list.findIndex((x) => x.href.endsWith(currentPage));
      const next = list.length > 1 && here >= 0 ? list[(here + 1) % list.length] : null;
      if (next) document.body.insertAdjacentHTML("beforeend", `<a class="next-project" href="${ROOT}${next.href}" aria-label="Next project: ${next.title}">Next project<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10M10 5l5 5-5 5"/></svg></a>`);
    }
    const top = document.querySelector(".to-top");
    const nextLink = document.querySelector(".next-project");
    top.addEventListener("click", () => scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    const onScroll = () => {
      top.classList.toggle("show", scrollY > 600);
      nextLink?.classList.toggle("show", scrollY > 600);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Project pages keep their section list on the left, with the way back above the title.
  if (isProject) {
    const fun = document.body.dataset.parent === "fun";
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class="sidebar"><div class="page-margin" style="height:100%"><div class="grid-12">
        <aside><nav class="fade-in toc" aria-label="Sections">${tocLinks()}</nav></aside>
      </div></div></div>`
    );
    document.querySelector(".content").insertAdjacentHTML(
      "afterbegin",
      `<div class="breadcrumb fade-in"><a href="${ROOT}${fun ? "fun.html" : "index.html"}">← ${fun ? "Fun" : "Work"}</a><span class="sep">/</span><span>${document.body.dataset.title}</span></div>`
    );
  }

  document.querySelector(".shell .page-margin").insertAdjacentHTML(
    "beforeend",
    `<footer>
      <div class="status">${madeWith()}</div>
    </footer>`
  );

  // Light/dark toggle. The choice is saved; until then the system setting decides.
  const SUN = '<svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>';
  const MOON = '<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  document.body.insertAdjacentHTML("beforeend", `<button type="button" class="theme-toggle">${SUN}${MOON}</button>`);
  const toggle = document.querySelector(".theme-toggle");
  // The theme switch sits at the end of the header nav.
  const headNav = document.querySelector(".cards-nav");
  if (headNav) headNav.appendChild(toggle);
  const isDark = () => (document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
  const label = () => toggle.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  label();
  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    label();
  });

  const clock = document.querySelector(".clock");
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: SITE.timezone, hour: "numeric", minute: "2-digit", second: "2-digit", timeZoneName: "short" });
  // A small sun or moon between the bridge towers, from rough San Francisco sunrise and sunset for each month (local time, in hours)
  const sky = document.querySelector(".ggb-sky");
  const DAYLIGHT = [[7.4, 17.3], [7.0, 17.8], [7.2, 19.2], [6.7, 19.7], [6.1, 20.1], [5.8, 20.5], [6.1, 20.5], [6.5, 20.0], [7.0, 19.2], [7.3, 18.5], [6.8, 17.0], [7.3, 16.9]];
  const local = new Intl.DateTimeFormat("en-US", { timeZone: SITE.timezone, month: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23" });
  // Drawn first, so the left side-span cable crosses in front of it
  const SUN_SVG = '<circle cx="5.5" cy="6.6" r="3"/>';
  const MOON_SVG = '<mask id="ggb-moon"><rect width="40" height="20" fill="#fff"/><circle cx="7.7" cy="5.2" r="3" fill="#000"/></mask><circle cx="5.5" cy="6.6" r="3.4" mask="url(#ggb-moon)"/>';
  let day = null;
  const tick = () => {
    const now = new Date();
    clock.textContent = fmt.format(now);
    const p = Object.fromEntries(local.formatToParts(now).map((x) => [x.type, x.value]));
    const h = Number(p.hour) + Number(p.minute) / 60, [rise, set] = DAYLIGHT[Number(p.month) - 1];
    const isDay = h >= rise && h < set;
    if (isDay !== day) {
      day = isDay;
      sky.setAttribute("class", `ggb-sky ${isDay ? "is-sun" : "is-moon"}`);
      sky.innerHTML = isDay ? SUN_SVG : MOON_SVG;
      sky.closest(".head-clock").title = `San Francisco, ${isDay ? "daytime" : "night"}`;
    }
  };
  tick();
  setInterval(tick, 1000);
}

function projectMedia(p) {
  return p.media
    ? p.media.endsWith(".mp4")
      ? `<video src="${p.media}" autoplay muted loop playsinline></video>`
      : /\.html(\?|$)/.test(p.media)
        ? `<iframe src="${p.media}" title="" tabindex="-1" aria-hidden="true" loading="lazy"></iframe>`
        : `<img src="${p.media}" alt="" loading="lazy">`
    : `<div class="placeholder" style="background:linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})">${p.title}</div>`;
}

function projectCard(p) {
  const media = projectMedia(p);
  const inner = `
    <div class="thumb" style="aspect-ratio:${p.ratio}" role="img" aria-label="Project thumbnail for ${p.title}">
      ${media}<div class="overlay"></div><div class="sheen"></div>
    </div>
    <div class="caption"><p class="title">${p.title}</p><p class="sep">/</p><p class="sub">${p.sub}</p></div>`;

  if (!p.href) return `<div class="project" data-cursor="coming-soon" data-label="${p.cursor}">${inner}</div>`;
  const ext = p.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="project" href="${p.href}"${ext} data-label="${p.cursor}">${inner}</a>`;
}

// Full-width tinted card: text on the left, the thumbnail on the right.
function projectRow(p) {
  const inner = `
    <div class="row-text">
      <p class="row-sub">${p.sub}</p>
      <h2 class="row-title">${p.title}</h2>
      <p class="row-blurb">${p.blurb || ""}</p>
      ${p.href ? `<span class="row-cta">${p.cursor} →</span>` : ""}
    </div>
    <div class="thumb" style="aspect-ratio:${p.ratio}" role="img" aria-label="Project thumbnail for ${p.title}">${projectMedia(p)}</div>`;
  const tint = p.tint ? ` style="--tint:${p.tint}"` : "";
  if (!p.href) return `<div class="project-row" data-cursor="coming-soon"${tint}>${inner}</div>`;
  const ext = p.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="project-row" href="${p.href}"${ext}${tint}>${inner}</a>`;
}

const STAGE_MODES = ["bend", "bulge", "stack", "flat", "drum"];

// Card carousel: one project card in the middle, its neighbours bent away at the screen edges.
// Projects are repeated twice so the card that wraps round always jumps while it is off screen.
function renderCardStage(root) {
  // Only projects you can open go on the home page; "coming soon" entries stay in SITE for later
  const list = SITE.projects.filter((p) => p.href);
  const n = list.length * 2;
  const card = (p, i) => {
    const [status, year] = [p.sub.replace(/\s*\d{4}$/, ""), (p.sub.match(/\d{4}$/) || [""])[0]];
    const tag = p.href ? "a" : "div";
    const attrs = p.href ? ` href="${p.href}"${p.external ? ' target="_blank" rel="noopener noreferrer"' : ""}` : ' data-cursor="coming-soon"';
    return `<${tag} class="stage-card" data-i="${i}"${attrs} style="--c1:${p.card[0]};--c2:${p.card[1]}" aria-label="${p.title}">
      <div class="stage-top"><p class="stage-title">${p.title}</p><p class="stage-tag">${p.tagline || ""}</p></div>
      ${p.media ? `<div class="thumb" style="aspect-ratio:${p.ratio}">${projectMedia(p)}</div>` : '<div class="stage-soon">Coming soon</div>'}
      <div class="stage-bottom"><span>${status}</span><span>${year}</span></div>
    </${tag}>`;
  };
  document.querySelector(".content").insertAdjacentHTML("beforeend", `<div class="home-made">${madeWith()}</div>`);
  root.innerHTML = `<div class="stage">${[...list, ...list].map((p, i) => card(p, i)).join("")}</div>
    <div class="stage-tabs">
      <div class="view-toggle" role="group" aria-label="Layout">
        <button type="button" data-view="carousel" aria-pressed="true" aria-label="Carousel" title="Carousel"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="6" y="4" width="8" height="12" rx="1.5"/><path d="M3 6.5v7M17 6.5v7"/></svg></button>
        <button type="button" data-view="grid" aria-pressed="false" aria-label="Grid, no motion" title="Grid, no motion"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1.2"/><rect x="11" y="3.5" width="5.5" height="5.5" rx="1.2"/><rect x="3.5" y="11" width="5.5" height="5.5" rx="1.2"/><rect x="11" y="11" width="5.5" height="5.5" rx="1.2"/></svg></button>
      </div>
      <span class="stage-sep" aria-hidden="true"></span>
      <div class="stage-modes" role="group" aria-label="How the cards move">${STAGE_MODES.map((m) => `<button type="button" data-mode="${m}" aria-pressed="false">${m[0].toUpperCase() + m.slice(1)}</button>`).join("")}</div>
    </div>`;
  const cards = [...root.querySelectorAll(".stage-card")];
  const modes = [...root.querySelectorAll("[data-mode]")];
  // Every visit opens in Bend; the other layouts are there to play with.
  const setMode = (m) => {
    root.dataset.mode = m;
    modes.forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === m));
  };
  setMode("bend");
  cards.forEach((el, i) => el.classList.toggle("dup", i >= list.length));
  let cur = 0;
  // Carousel or grid, from the header toggle. The grid is the no-motion option. The choice is remembered.
  const isGrid = () => root.classList.contains("is-grid");
  const stage = root.querySelector(".stage");
  const noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EASE = "cubic-bezier(.2, .7, .2, 1)";
  const setView = (view, glide = true) => {
    const toGrid = view === "grid";
    const animate = glide && !noMotion && toGrid !== isGrid() && stage.getAnimations;
    // Note where each visible card is now, switch layouts, then glide every card from there to its new place
    const from = animate ? new Map(cards.filter((el) => getComputedStyle(el).display !== "none" && getComputedStyle(el).opacity > 0.05).map((el) => [el, el.getBoundingClientRect()])) : null;
    root.classList.toggle("is-grid", toGrid);
    document.querySelectorAll("[data-view]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.view === view));
    // A phone forcing the grid shouldn't overwrite the choice someone made on a bigger screen
    if (!matchMedia("(max-width: 640px)").matches) try { localStorage.setItem("homeView", view); } catch {}
    paint();
    if (!animate) return;
    // paint() sets "jump" per card, so switch the cards' own transitions off after it
    cards.forEach((el) => el.classList.add("jump"));
    cards.forEach((el, i) => {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.opacity < 0.05) return;
      const a = from.get(el), b = el.getBoundingClientRect();
      if (!a) return void el.animate([{ opacity: 0 }, { opacity: style.opacity }], { duration: 500, delay: 150 + i * 40, easing: EASE, fill: "backwards" });
      const dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2);
      // The grid has no transforms of its own, so it can scale too; carousel cards only travel
      const frames = toGrid
        ? [{ translate: `${dx}px ${dy}px`, scale: `${a.width / b.width} ${a.height / b.height}` }, { translate: "0 0", scale: "1" }]
        : [{ translate: `${dx}px ${dy}px` }, { translate: "0 0" }];
      el.animate(frames, { duration: 650, easing: EASE });
    });
    // The cards' own position transitions stay off until the glide is done
    setTimeout(() => cards.forEach((el) => el.classList.remove("jump")), 700);
  };
  document.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
  const offset = (i) => ((((i - cur) % n) + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
  const last = new Map();
  const place = (el, d) => {
    el.dataset.d = d;
    el.style.setProperty("--d", d);
    el.dataset.pos = d < -1 ? "far-left" : d > 1 ? "far-right" : ["left", "center", "right"][d + 1];
  };
  const paint = () => {
    cards.forEach((el, i) => {
      const d = offset(i), was = last.get(el) ?? d;
      last.set(el, d);
      // A card moving further than one step is wrapping round: drop it in one step beyond its new place, out of
      // sight, then let it glide and fade in from there (otherwise it would pop into the outermost slot).
      el.classList.remove("jump");
      if (Math.abs(d - was) > 1) { el.classList.add("jump"); place(el, d + Math.sign(d || 1)); void el.offsetWidth; el.classList.remove("jump"); }
      place(el, d);
      const shown = isGrid() ? i < list.length : d === 0;
      el.tabIndex = shown ? 0 : -1;
      el.setAttribute("aria-hidden", shown ? "false" : "true");
    });
  };
  const go = (to) => { cur = ((to % n) + n) % n; paint(); };
  let saved = null;
  try { saved = localStorage.getItem("homeView"); } catch {}
  // People who ask their system for reduced motion start on the still grid too.
  // Phones always get the grid (there's no switch there); people who ask for reduced motion start on it too.
  const phone = matchMedia("(max-width: 640px)");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // The first layout appears in place; only switching layouts glides the cards
  setView(phone.matches ? "grid" : saved || (calm ? "grid" : "carousel"), false);
  phone.addEventListener("change", (e) => { if (e.matches) setView("grid", false); });
  root.addEventListener("click", (e) => {
    const mode = e.target.closest("[data-mode]");
    if (mode) { setMode(mode.dataset.mode); return paint(); }
    const el = e.target.closest(".stage-card");
    if (!el || isGrid() || el.getAttribute("aria-hidden") === "false") return;
    e.preventDefault();
    go(cur + (el.dataset.pos === "left" ? -1 : 1));
  });
  // Wheel and trackpad: one card per gesture. A trackpad swipe keeps sending fading "momentum" events for a second
  // or more after the fingers lift, so a gesture only ends after a short quiet gap, or when a fresh swipe starts
  // (the deltas jump back up instead of fading).
  let acc = 0, used = false, lastT = 0, lastMag = 0, movedT = 0;
  addEventListener("wheel", (e) => {
    if (isGrid() || e.target.closest?.(".vc-panel")) return;
    e.preventDefault();
    const now = performance.now(), delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX, mag = Math.abs(delta);
    const fresh = now - lastT > 220 || (now - movedT > 350 && mag > 24 && mag > lastMag * 1.8);
    if (fresh) { used = false; acc = 0; }
    lastT = now; lastMag = mag;
    if (used) return;
    acc += delta;
    if (Math.abs(acc) > 30) { go(cur + Math.sign(acc)); used = true; movedT = now; }
  }, { passive: false });
  addEventListener("keydown", (e) => {
    if (isGrid() || e.target.closest?.("input, textarea")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") go(cur + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(cur - 1);
  });
  let x0 = null;
  root.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  root.addEventListener("touchend", (e) => {
    if (x0 === null || isGrid()) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}

// Fun page: tiles of different sizes in a bento grid, in the same card style as the homepage.
function renderFun() {
  const root = document.querySelector(".fun-bento");
  if (!root) return;
  root.innerHTML = funTiles(SITE.fun);
}

function funTiles(list) {
  return list.map((p) => {
    const tag = p.href ? "a" : "div";
    const attrs = p.href ? ` href="${p.href}"` : ' data-cursor="coming-soon"';
    return `<${tag} class="fun-tile fun-${p.size || "small"}"${attrs} style="--c1:${p.card[0]};--c2:${p.card[1]}">
      <div class="stage-top">${p.group ? `<span class="fun-label">${p.group}</span>` : ""}<p class="stage-title">${p.title}</p><p class="stage-tag">${p.tagline || ""}</p></div>
      ${p.logo ? `<img class="fun-logo ${p.logoClass || ""}" src="${p.logo}" alt="">` : p.media ? `<div class="thumb" style="aspect-ratio:16 / 9">${projectMedia(p)}</div>` : ""}
      <div class="stage-bottom"><span></span><span>${p.year}</span></div>
      ${(p.stickers || []).map((src, i) => `<img class="fun-stk fun-stk-${i} ${p.stickerClass || ""}" src="${src}" alt="" loading="lazy">`).join("")}
    </${tag}>`;
  }).join("");
}

function renderProjects() {
  const root = document.querySelector(".projects");
  if (!root) return;
  if (root.dataset.layout === "cards") return renderCardStage(root);
  if (root.dataset.layout === "rows") {
    root.innerHTML = SITE.projects.filter((p) => p.href).map(projectRow).join("");
    return;
  }
  // Two independent columns give the staggered masonry look.
  const cols = [[], []];
  SITE.projects.filter((p) => p.href).forEach((p, i) => cols[i % 2].push(projectCard(p)));
  root.innerHTML = cols.map((c) => `<div class="column">${c.join("")}</div>`).join("");
}

// Looping .html media is drawn at 1456px wide, then scaled down to fit, like a screenshot.
// That way thin lines shrink with everything else instead of staying 1px at small sizes.
function initScaledFrames() {
  const BASE = 1456;
  document.querySelectorAll(".thumb iframe, .project-hero iframe, .proto iframe").forEach((frame) => {
    frame.classList.add("scaled-frame");
    const box = frame.parentElement;
    new ResizeObserver(() => {
      const scale = box.clientWidth / BASE;
      frame.style.height = `${box.clientHeight / scale}px`;
      frame.style.transform = `scale(${scale})`;
    }).observe(box);
  });
}

// Tabs above a live prototype frame: each tab tells the frame which view to show.
function initProtoTabs() {
  document.querySelectorAll("[data-proto-tabs]").forEach((tabs) => {
    const frame = tabs.parentElement.querySelector(".proto iframe");
    const cap = tabs.parentElement.querySelector(".proto-cap");
    // A lazy frame may still be loading when a tab is clicked: resend the chosen view once it's ready.
    let want = null;
    frame?.addEventListener("load", () => want && frame.contentWindow.postMessage({ v: want }, "*"));
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("[data-v]");
      if (!b || !frame) return;
      tabs.querySelectorAll("[data-v]").forEach((x) => x.setAttribute("aria-selected", x === b));
      want = b.dataset.v;
      frame.contentWindow.postMessage({ v: want }, "*");
      if (cap) cap.textContent = b.dataset.cap || "";
    });
  });
}

// Pick a quote; the part of the redesign that answers it is spotlit on the screen beside it.
function initSpotlight() {
  document.querySelectorAll("[data-spot]").forEach((root) => {
    const img = root.querySelector(".spot-stage img");
    const box = root.querySelector(".spot-box");
    const note = root.querySelector(".spot-note");
    const btns = [...root.querySelectorAll("[data-box]")];
    const pick = (b) => {
      btns.forEach((x) => x.setAttribute("aria-selected", x === b));
      const [x, y, w, h] = b.dataset.box.split(",").map(Number);
      Object.assign(box.style, { left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` });
      if (!img.src.endsWith(b.dataset.img)) {
        img.classList.add("swap");
        setTimeout(() => { img.src = `${ROOT}${b.dataset.img}`; img.alt = b.dataset.alt || ""; img.classList.remove("swap"); }, 180);
      }
      note.textContent = b.dataset.note;
    };
    btns.forEach((b) => b.addEventListener("click", () => pick(b)));
    pick(btns[0]);
  });
}

// A row of frames that snap into place, with previous/next buttons.
function initStrip() {
  document.querySelectorAll("[data-strip]").forEach((root) => {
    const track = root.querySelector(".strip-track");
    const frames = [...track.children];
    const count = root.querySelector(".strip-count");
    const at = () => Math.round(track.scrollLeft / (frames[1].offsetLeft - frames[0].offsetLeft));
    const paint = () => { const i = at(); count.textContent = `${i + 1} / ${frames.length}`; frames.forEach((f, k) => f.classList.toggle("on", k === i)); };
    const go = (d) => { const i = Math.max(0, Math.min(frames.length - 1, at() + d)); track.scrollTo({ left: frames[i].offsetLeft - frames[0].offsetLeft, behavior: "smooth" }); };
    root.querySelector(".strip-prev").addEventListener("click", () => go(-1));
    root.querySelector(".strip-next").addEventListener("click", () => go(1));
    frames.forEach((f, k) => f.addEventListener("click", () => go(k - at())));
    track.addEventListener("scroll", () => requestAnimationFrame(paint), { passive: true });
    paint();
  });
}

function initCursorLabel() {
  const label = document.createElement("div");
  label.className = "cursor-label";
  document.body.appendChild(label);

  document.addEventListener("mousemove", (e) => {
    label.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 4}px)`;
    const target = e.target.closest("[data-label]");
    label.classList.toggle("visible", !!target);
    if (target) label.textContent = target.dataset.label;
  });
  document.addEventListener("mouseleave", () => label.classList.remove("visible"));
}

// Highlights the TOC entry for the last section whose top has passed 40% of the viewport, and none before the first.
function initScrollSpy() {
  const links = [...document.querySelectorAll("a[data-toc]")];
  if (!links.length) return;
  const targets = links.map((l) => document.getElementById(l.dataset.toc));

  // A clicked entry stays active until the visitor scrolls on their own; short sections otherwise land
  // with the next one already past the line.
  let picked = null;
  links.forEach((l) => l.addEventListener("click", () => { picked = l.dataset.toc; links.forEach((k) => k.toggleAttribute("data-active", k === l)); }));
  ["wheel", "touchstart", "keydown"].forEach((t) => window.addEventListener(t, () => { picked = null; }, { passive: true }));

  const update = () => {
    if (picked) return;
    const line = window.innerHeight * 0.4;
    // Nothing is active above the first section; sections hidden by TL;DR are skipped.
    let current = null;
    for (const t of targets) if (t.getClientRects().length && t.getBoundingClientRect().top <= line) current = t;
    // The last sections may never reach the line, so activate the last one at the page bottom.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = targets[targets.length - 1];
    links.forEach((l) => l.toggleAttribute("data-active", l.dataset.toc === current?.id));
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Before/after sliders: dragging the hidden range input moves the divider.
// The first time one scrolls into view it sweeps to each side to hint that it moves.
function initCompare() {
  const sliders = document.querySelectorAll(".compare");
  const set = (el, v) => el.style.setProperty("--pos", `${v}%`);

  sliders.forEach((el) => {
    const input = el.querySelector("input");
    input.addEventListener("input", () => {
      el.classList.remove("sweeping");
      set(el, input.value);
    });
    // With a live prototype on the After side, drag from the handle instead of the whole image.
    const frame = el.querySelector(".compare-after");
    if (frame) {
      new ResizeObserver(() => {
        const scale = el.clientWidth / 1440;
        frame.style.height = `${el.clientHeight / scale}px`;
        frame.style.transform = `scale(${scale})`;
      }).observe(el);
      const handle = el.querySelector(".compare-handle");
      const move = (e) => {
        const box = el.getBoundingClientRect();
        const v = Math.round(Math.min(100, Math.max(0, ((e.clientX - box.left) / box.width) * 100)));
        input.value = v;
        set(el, v);
      };
      handle.addEventListener("pointerdown", (e) => {
        el.classList.remove("sweeping");
        el.classList.add("dragging");
        handle.setPointerCapture(e.pointerId);
        move(e);
      });
      handle.addEventListener("pointermove", (e) => { if (el.classList.contains("dragging")) move(e); });
      ["pointerup", "pointercancel"].forEach((t) => handle.addEventListener(t, () => el.classList.remove("dragging")));
      // A visitor working in the prototype has taken over; stop the intro sweep.
      frame.addEventListener("load", () => frame.contentDocument?.addEventListener("pointerdown", () => el.classList.remove("sweeping")));
    }
    // Before shows all of Hive, After shows all of Deploy.
    el.querySelectorAll("[data-pos]").forEach((btn) =>
      btn.addEventListener("click", () => {
        el.classList.add("sweeping");
        input.value = btn.dataset.pos;
        set(el, btn.dataset.pos);
      })
    );
  });

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      io.unobserve(target);
      target.classList.add("sweeping");
      const steps = [[300, 80], [1300, 20], [2300, 50]];
      steps.forEach(([delay, v]) => setTimeout(() => {
        if (target.classList.contains("sweeping")) set(target, v);
      }, delay));
      setTimeout(() => target.classList.remove("sweeping"), 3300);
    });
  }, { threshold: 0.6 });
  sliders.forEach((el) => io.observe(el));
}

// Example tabs in the component board: clicking a tab selects it.
function initDemoTabs() {
  document.querySelectorAll(".cb-tabs").forEach((list) => {
    list.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      list.querySelectorAll('[role="tab"]').forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
    });
  });
}

// Dropdown Menu demo: the Outline button opens the menu; choosing an item closes it.
function initDemoMenu() {
  document.querySelectorAll(".cb-dd").forEach((dd) => {
    const trigger = dd.querySelector(".cb-trigger");
    const menu = dd.querySelector(".cb-menu");
    const items = [...menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')];
    const setOpen = (open) => {
      menu.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      if (open) items[0].focus();
    };
    const close = () => { setOpen(false); trigger.focus(); };
    trigger.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", (e) => { if (items.includes(e.target.closest('[role="menuitem"]'))) close(); });
    menu.addEventListener("keydown", (e) => {
      const i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); items[Math.min(i + 1, items.length - 1)].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); items[Math.max(i - 1, 0)].focus(); }
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (i >= 0) close(); }
      if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => { if (!dd.contains(e.target)) setOpen(false); });
  });
}

// Lucide icons used by the complex component boards: <i data-icon="name"></i>.
const ICONS = {
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  "square-dashed": '<path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/>',
  "git-branch-plus": '<path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M15 6a9 9 0 0 0-9 9"/><path d="M18 15v6"/><path d="M21 18h-6"/>',
  "loader-circle": '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  ellipsis: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  "circle-check": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  "circle-alert": '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  "circle-x": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  "triangle-alert": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
};
const icon = (name) =>
  `<i data-icon="${name}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg></i>`;

function initIcons() {
  document.querySelectorAll("i[data-icon]:empty").forEach((el) => {
    const cls = el.className;
    el.outerHTML = icon(el.dataset.icon).replace("<i ", cls ? `<i class="${cls}" ` : "<i ");
  });
}

// Closes a popup when the user clicks outside its anchor or presses Escape.
function dismissable(anchor, isOpen, close) {
  document.addEventListener("click", (e) => { if (isOpen() && !e.composedPath().includes(anchor)) close(); });
  anchor.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen()) { e.stopPropagation(); close(true); } });
}

// Combobox: Basic picks one framework; Multiple adds chips and keeps the list open.
function initCombobox() {
  document.querySelectorAll(".cc-combo").forEach((box) => {
    const multi = box.hasAttribute("data-multiple");
    const field = box.querySelector(".cc-field");
    const chips = field.querySelector(".cc-chips");
    const clear = field.querySelector(".cc-clear");
    const list = box.querySelector(".cc-list");
    const options = [...list.querySelectorAll(".cc-opt")];
    const placeholder = "Select framework...";
    const setOpen = (open) => {
      list.hidden = !open;
      field.setAttribute("aria-expanded", String(open));
      if (open) (options.find((o) => o.getAttribute("aria-selected") === "true") || options[0]).focus();
    };
    const render = () => {
      const picked = options.filter((o) => o.getAttribute("aria-selected") === "true");
      const label = (o) => o.textContent.trim();
      field.classList.toggle("has-value", picked.length > 0);
      if (!multi) chips.innerHTML = `<span class="cc-val">${picked.length ? label(picked[0]) : placeholder}</span>`;
      else {
        chips.innerHTML = picked.length
          ? picked.map((o) => `<span class="cc-chip"><span>${label(o)}</span><button type="button" data-remove="${options.indexOf(o)}" aria-label="Remove ${label(o)}">${icon("x")}</button></span>`).join("")
          : `<span class="cc-val">${placeholder}</span>`;
        clear.hidden = !picked.length;
      }
    };
    const choose = (o) => {
      if (multi) {
        o.setAttribute("aria-selected", String(o.getAttribute("aria-selected") !== "true"));
        render();
        o.focus();
      } else {
        options.forEach((x) => x.setAttribute("aria-selected", String(x === o)));
        render();
        setOpen(false);
        field.focus();
      }
    };
    field.addEventListener("click", (e) => {
      const remove = e.target.closest("[data-remove]");
      if (remove) { options[remove.dataset.remove].setAttribute("aria-selected", "false"); render(); return; }
      if (e.target.closest(".cc-clear")) { options.forEach((o) => o.setAttribute("aria-selected", "false")); render(); field.focus(); return; }
      setOpen(list.hidden);
    });
    field.addEventListener("keydown", (e) => {
      if (e.target !== field) return;
      if (["Enter", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); setOpen(true); }
    });
    list.addEventListener("click", (e) => { const o = e.target.closest(".cc-opt"); if (o) choose(o); });
    list.addEventListener("keydown", (e) => {
      const i = options.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); options[Math.min(i + 1, options.length - 1)].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); options[Math.max(i - 1, 0)].focus(); }
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (i >= 0) choose(options[i]); }
    });
    dismissable(box, () => !list.hidden, (refocus) => { setOpen(false); if (refocus) field.focus(); });
    render();
  });
}

// Date Range Picker: two months side by side; the first click sets the start, the second the end.
function initRangePicker() {
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const short = (d) => `${MONTHS[d.getMonth()].slice(0, 3)} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`;
  const key = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  document.querySelectorAll(".cc-date").forEach((box) => {
    const field = box.querySelector(".cc-field");
    const value = field.querySelector(".cc-val");
    const cal = box.querySelector(".cc-range");
    let start = new Date(2026, 0, 20), end = new Date(2026, 1, 9);
    let view = new Date(2026, 0, 1);

    const month = (y, m, nav) => {
      const first = new Date(y, m, 1);
      const cells = [];
      for (let i = 0; i < 42; i++) cells.push(new Date(y, m, 1 - first.getDay() + i));
      while (cells.length > 35 && cells.slice(-7).every((d) => d.getMonth() !== m)) cells.splice(-7);
      const head = nav < 0
        ? `<button type="button" class="cc-icon-btn" data-step="-1" aria-label="Previous month">${icon("chevron-left")}</button><p>${MONTHS[m]} ${y}</p>`
        : `<p>${MONTHS[m]} ${y}</p><button type="button" class="cc-icon-btn" data-step="1" aria-label="Next month">${icon("chevron-right")}</button>`;
      return `<div class="cc-month"><div class="cc-month-head">${head}</div><div>
        <div class="cc-dow">${["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => `<span>${d}</span>`).join("")}</div>
        <div class="cc-grid">${cells.map((d, i) => {
          if (d.getMonth() !== m) return `<span class="cc-day is-out" aria-hidden="true"><span>${d.getDate()}</span></span>`;
          const t = d.getTime();
          const cls = [];
          const isStart = start && t === start.getTime(), isEnd = end && t === end.getTime();
          if (isStart) cls.push("is-start");
          if (isStart && end && !isEnd) cls.push("has-end");
          if (isEnd && !isStart) cls.push("is-end");
          if (start && end && t > start.getTime() && t < end.getTime()) {
            cls.push("in-range");
            if (i % 7 === 0 || d.getDate() === 1) cls.push("row-start");
            if (i % 7 === 6 || new Date(y, m, d.getDate() + 1).getMonth() !== m) cls.push("row-end");
          }
          return `<button type="button" class="cc-day ${cls.join(" ")}" data-date="${key(d)}" aria-pressed="${isStart || isEnd}" aria-label="${short(d)}"><span>${d.getDate()}</span></button>`;
        }).join("")}</div></div></div>`;
    };
    const render = () => {
      const next = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      cal.innerHTML = month(view.getFullYear(), view.getMonth(), -1) + month(next.getFullYear(), next.getMonth(), 1);
    };
    const showValue = () => (value.textContent = start ? `${short(start)} - ${end ? short(end) : ""}` : "Pick a date range");
    const setOpen = (open) => {
      cal.hidden = !open;
      field.setAttribute("aria-expanded", String(open));
      if (open) { if (start) view = new Date(start.getFullYear(), start.getMonth(), 1); render(); }
    };

    field.addEventListener("click", () => setOpen(cal.hidden));
    cal.addEventListener("click", (e) => {
      const step = e.target.closest("[data-step]");
      const day = e.target.closest("button.cc-day");
      if (step) {
        view = new Date(view.getFullYear(), view.getMonth() + Number(step.dataset.step), 1);
        render();
        cal.querySelector(`[data-step="${step.dataset.step}"]`).focus();
      } else if (day) {
        const [y, m, d] = day.dataset.date.split("-").map(Number);
        const picked = new Date(y, m, d);
        if (!start || end || picked < start) { start = picked; end = null; }
        else end = picked;
        showValue();
        render();
        if (end) { setOpen(false); field.focus(); }
        else cal.querySelector(`[data-date="${key(picked)}"]`).focus();
      }
    });
    dismissable(box, () => !cal.hidden, (refocus) => {
      if (start && !end) { end = start; showValue(); }
      setOpen(false);
      if (refocus) field.focus();
    });
    showValue();
  });
}

// Dialog, Drawer and Popover open inside the overlay stage.
function initOverlays() {
  document.querySelectorAll(".cc-stage").forEach((stage) => {
    const scrim = stage.querySelector(".cc-scrim");
    let current = null, opener = null;
    const close = () => {
      if (!current) return;
      const el = current;
      el.classList.remove("is-open");
      scrim.classList.remove("is-open");
      // Fields start empty each time the dialog or drawer opens.
      el.querySelectorAll("input").forEach((i) => (i.value = ""));
      setTimeout(() => { el.hidden = true; scrim.hidden = true; }, 300);
      current = null;
      opener?.focus();
    };
    stage.querySelectorAll("[data-open]").forEach((btn) =>
      btn.addEventListener("click", () => {
        current = stage.querySelector(`#${btn.dataset.open}`);
        opener = btn;
        current.hidden = false;
        scrim.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => { current.classList.add("is-open"); scrim.classList.add("is-open"); }));
        current.querySelector("input")?.focus({ preventScroll: true });
      })
    );
    stage.addEventListener("click", (e) => { if (e.target.closest("[data-close]") || e.target === scrim) close(); });
    stage.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    const anchor = stage.querySelector(".cc-pop-trigger").parentElement;
    const trigger = anchor.querySelector(".cc-pop-trigger");
    const pop = anchor.querySelector(".cc-popover");
    const setPop = (open) => { pop.hidden = !open; trigger.setAttribute("aria-expanded", String(open)); };
    trigger.addEventListener("click", () => setPop(pop.hidden));
    dismissable(anchor, () => !pop.hidden, (refocus) => { setPop(false); if (refocus) trigger.focus(); });
  });
}

// Toast: each button shows its toast beside it; it leaves after a few seconds or when its action is clicked.
function initToasts() {
  const TOASTS = {
    success: ["circle-check", "Event Created", "Sunday, December 3 at 9:00 AM", "Undo"],
    info: ["info", "Heads up", "This action may take a few minutes to process.", "Learn More"],
    warning: ["triangle-alert", "Almost out of credits", "You're close to your monthly limit. Consider upgrading to avoid interruption.", "Upgrade now"],
    error: ["circle-x", "Something went wrong", "We couldn't complete your request. Please try again.", "Retry"],
  };
  document.querySelectorAll(".cc-toasts").forEach((card) => {
    const region = card.querySelector(".cc-toast-region");
    let timer;
    const dismiss = (t) => { t.classList.add("is-leaving"); setTimeout(() => t.remove(), 200); };
    const show = (btn) => {
        const t0 = region.firstElementChild;
        // Already showing this toast: keep it rather than replay the animation.
        if (t0 && t0.classList.contains(`cc-${btn.dataset.toast}`) && !t0.classList.contains("is-leaving")) return;
        const [ic, title, desc, action] = TOASTS[btn.dataset.toast];
        clearTimeout(timer);
        region.innerHTML = `<div class="cc-toast cc-${btn.dataset.toast}" role="status">${icon(ic)}<div><p class="cc-alert-title">${title}</p><p class="cc-alert-desc">${desc}</p></div><button type="button" class="cc-toast-btn"><span>${action}</span></button></div>`;
        const t = region.firstElementChild;
        t.querySelector("button").addEventListener("click", () => dismiss(t));
        timer = setTimeout(() => dismiss(t), 5000);
    };
    // Hover, focus or click a type to show its toast.
    card.querySelectorAll("[data-toast]").forEach((btn) =>
      ["pointerenter", "focus", "click"].forEach((ev) => btn.addEventListener(ev, () => show(btn)))
    );
  });
}

// Navigation Menu: each trigger opens its own panel under it.
function initNavMenu() {
  document.querySelectorAll(".cc-nav").forEach((nav) => {
    const btns = [...nav.querySelectorAll("[aria-controls]")];
    const pops = btns.map((b) => nav.querySelector(`#${b.getAttribute("aria-controls")}`));
    const open = (i) => btns.forEach((b, j) => {
      pops[j].hidden = j !== i;
      b.setAttribute("aria-expanded", String(j === i));
      if (j === i) pops[j].style.left = `${pops[j].classList.contains("cc-nav-single") ? b.offsetLeft : 0}px`;
    });
    const openIndex = () => pops.findIndex((p) => !p.hidden);
    btns.forEach((b, i) => b.addEventListener("click", () => open(openIndex() === i ? -1 : i)));
    nav.addEventListener("click", (e) => { if (e.target.closest(".cc-nav-pop a")) { e.preventDefault(); open(-1); } });
    dismissable(nav, () => openIndex() >= 0, (refocus) => { const i = openIndex(); open(-1); if (refocus) btns[i].focus(); });
  });
}

// Breadcrumb: clicking a page makes it the current one.
function initBreadcrumbs() {
  document.querySelectorAll(".cc-crumbs").forEach((list) =>
    list.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      list.querySelectorAll("a").forEach((x) => x.toggleAttribute("aria-current", x === a));
      a.setAttribute("aria-current", "page");
    })
  );
}

// Button variant matrix: one component and size at a time. The Default column is live; the other columns pin each state.
function initButtonMatrix() {
  const TYPES = ["Primary", "Outline", "Secondary", "Ghost", "Destructive", "Link"];
  const SIZE = { xs: " cb-xs", sm: " cb-sm", md: "", lg: " cb-lg" };
  const cell = (tag, cls, inner, state) => {
    if (state === "default") return `<${tag} type="button" class="${cls}">${inner}</${tag}>`;
    if (state === "disabled") return `<${tag} type="button" class="${cls}" disabled>${inner}</${tag}>`;
    // Pressed matches Default in Figma, so it gets no extra class.
    const pin = state === "pressed" ? "" : ` is-${state}`;
    return `<span class="bv-static" aria-hidden="true"><${tag} type="button" class="${cls}${pin}" tabindex="-1">${inner}</${tag}></span>`;
  };
  const head = (cols) => `<span></span>${cols.map((c) => `<span class="bv-col">${c}</span>`).join("")}`;
  document.querySelectorAll("[data-bv]").forEach((board) => {
    const buttons = board.querySelector(".bv-buttons");
    const icons = board.querySelector(".bv-icons");
    const render = (size) => {
      const states = ["default", "hover", "focus", "pressed", "disabled"];
      buttons.innerHTML = head(["Default", "Hover", "Focus", "Pressed", "Disabled"]) + TYPES.map((t) =>
        `<span class="cb-tag">${t}</span>` + states.map((st) => cell("button", `cb-btn cb-${t.toLowerCase()}${SIZE[size]}`, t, st)).join("")
      ).join("");
      const istates = ["default", "hover", "focus", "disabled"];
      icons.innerHTML = head(["Default", "Hover", "Focus", "Disabled"]) + TYPES.map((t) =>
        `<span class="cb-tag">${t}</span>` + istates.map((st) => cell("button", `cb-ibtn cb-${t.toLowerCase()}${SIZE[size]}`, icon("square-dashed"), st)).join("")
      ).join("");
    };
    board.querySelector("[data-size-tabs]").addEventListener("click", (e) => {
      const tab = e.target.closest("[data-size]");
      if (tab) render(tab.dataset.size);
    });
    // Button / Icon Button toggle: one matrix at a time.
    board.querySelector("[data-kind-tabs]").addEventListener("click", (e) => {
      const tab = e.target.closest("[data-kind]");
      if (!tab) return;
      const icons = tab.dataset.kind === "icons";
      buttons.hidden = icons;
      board.querySelector(".bv-icons").hidden = !icons;
      board.querySelector(".bv-title").textContent = icons ? "Icon Button" : "Button";
    });
    render("xs");
  });
}

// Vertical sun/moon switch outside the top right of each component board, the semantic colors board and the color palette. Dark uses the Dark mode of the Color Tokens library.
function initModeToggle() {
  const SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
  const MOON = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
  const svg = (paths, cls) => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  document.querySelectorAll(".panel-card.cb, .panel-card.sc, .panel-card.pl").forEach((card) => {
    const panel = card.closest(".panel");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mode-switch";
    btn.setAttribute("role", "switch");
    btn.setAttribute("aria-checked", "false");
    btn.setAttribute("aria-label", "Dark mode");
    btn.innerHTML = `${svg(SUN, "ms-track ms-sun")}${svg(MOON, "ms-track ms-moon")}<span class="ms-thumb">${svg(SUN, "ms-sun")}${svg(MOON, "ms-moon")}</span>`;
    panel.append(btn);
    btn.addEventListener("click", () => {
      const dark = card.dataset.mode !== "dark";
      card.dataset.mode = dark ? "dark" : "light";
      btn.setAttribute("aria-checked", String(dark));
    });
  });
}

// Guided Setup frames: Next, Back, the stepper and the Metrics radio are clickable, and the tabs follow along.
function initGsFlow() {
  const flow = document.querySelector(".gs-flow");
  if (!flow) return;
  const tabs = [...flow.closest(".panel").querySelectorAll('.cx-tabs [role="tab"]')];
  const metrics = flow.querySelector("#gs-metrics");
  const empty = metrics.getAttribute("src");
  const spots = flow.querySelector(".gs-hotspots");
  // [left, top, width, height] in % of the frame
  const STEPPER = [11.7, 21.1, 30.5, 39.8, 49.2].map((top) => [15, top, 13.5, 4.3]);
  const NEXT = [80, 92.2, 5, 4.3], BACK = [75, 92.2, 5.2, 4.3];
  const FETCH = [77.2, 92.2, 7.4, 4.3], FETCH_BACK = [72, 92.2, 4.6, 4.3];
  const RADIO = [30.5, 22.4, 54, 6.5], EDIT = [83.7, 8.4, 6.1, 3.9];
  const result = flow.querySelector(".gs-result"), fetching = flow.querySelector(".gs-fetching");
  // Steps whose modal body runs past the fold get a scrollable copy of the full column over it
  const scroller = flow.querySelector(".gs-scroll");
  const COLUMNS = ["metrics", null, "groupings", "filters", "review"];
  let step = 0, picked = false, done = false, fetched = false;
  const go = (i) => tabs[i].click();
  const spot = ([l, t, w, hgt], label, fn, hint) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", label);
    b.style.cssText = `left:${l}%;top:${t}%;width:${w}%;height:${hgt}%`;
    b.classList.toggle("hint", hint === "always" || (Boolean(hint) && !done));
    b.addEventListener("click", fn);
    spots.append(b);
  };
  const render = () => {
    metrics.src = picked ? metrics.dataset.picked : empty;
    spots.replaceChildren();
    // After a dummy fetch the chart page covers the frames; Edit Chart goes back to Review
    result.hidden = !fetched;
    const col = !fetched && (step > 0 || picked) && COLUMNS[step];
    scroller.hidden = !col;
    if (col) {
      const src = `../media/mensio/gs-col-${col}.svg`;
      if (!scroller.firstChild.src.endsWith(src.slice(2))) { scroller.firstChild.src = src; scroller.scrollTop = 0; }
    }
    if (fetched) return spot(EDIT, "Edit Chart, back to Review", () => go(tabs.length - 1), "always");
    STEPPER.forEach((r, i) => i !== step && spot(r, `Go to ${tabs[i].textContent}`, () => go(i)));
    const last = step === tabs.length - 1;
    if (step === 0 && !picked) spot(RADIO, "Pick TV Sponsorship [Visual]", () => { picked = true; render(); }, true);
    if (step === 0 && !picked) spots.lastChild.classList.add("at-radio");
    else if (last) spot(FETCH, "Save & Fetch", () => {
      spots.replaceChildren();
      fetching.hidden = false;
      setTimeout(() => { fetching.hidden = true; fetched = done = true; render(); }, 900);
    }, true);
    else spot(NEXT, "Next step", () => go(step + 1), true);
    if (step > 0) spot(last ? FETCH_BACK : BACK, "Back", () => go(step - 1));
  };
  tabs.forEach((t, i) => t.addEventListener("click", () => { step = i; fetched = false; render(); }));
  render();
}

// Frustrated session: steps through the recording's key frames while on screen, zooming to what each beat is
// about and ringing what went wrong. Rects are in the 1914 x 860 frame's px.
function initSession() {
  const box = document.querySelector(".figure-media.session");
  if (!box) return;
  const stage = box.querySelector(".session-stage");
  const frames = [...stage.querySelectorAll("img")];
  const mark = box.querySelector(".session-mark");
  const cap = box.querySelector(".session-cap");
  // [caption, ms, zoom [x, y, width], ring around [x0, y0, x1, y1] or null], measured from the frames
  const FETCH = [1636, 90, 1752, 132];
  const BEATS = [
    ["Every requirement is met, but Fetch won't run.", 2400, [1060, 0, 854], FETCH],
    ["The only hint: “Invalid selection combinations.” Nothing says how to fix it.", 3200, [1060, 0, 854], [1540, 142, 1890, 232]],
    ["The user guesses, and opens the groupings again.", 2000, [640, 60, 760], [960, 210, 1098, 232]],
    ["Swaps Network Owners for Brand Owners.", 2000, [0, 60, 760], [131, 210, 268, 232]],
    ["Fetch works now.", 1600, [1060, 0, 854], FETCH],
    ["Loading…", 1300, [384, 0, 1146], null],
    ["Finally, a table.", 2400, [0, 200, 880], null],
    ["Then the page reloads. Nothing was saved, so the whole chart is gone.", 3600, [384, 0, 1146], [405, 288, 996, 569]],
  ];
  const PAD = 6; // on-screen px around each ringed element
  let i = 0, timer = 0, visible = false;
  const show = (k) => {
    const [text, , [x, y, w], ring] = BEATS[k];
    const s = box.clientWidth / w;
    stage.style.transform = `scale(${s}) translate(${-x}px, ${-y}px)`;
    frames.forEach((f, n) => f.classList.toggle("on", n === k));
    cap.textContent = text;
    mark.classList.toggle("on", !!ring);
    if (ring) {
      const [x0, y0, x1, y1] = ring;
      Object.assign(mark.style, { left: `${(x0 - x) * s - PAD}px`, top: `${(y0 - y) * s - PAD}px`, width: `${(x1 - x0) * s + PAD * 2}px`, height: `${(y1 - y0) * s + PAD * 2}px` });
    }
  };
  const tick = () => { show(i); timer = setTimeout(() => { i = (i + 1) % frames.length; if (visible) tick(); }, BEATS[i][1]); };
  box.showBeat = (k) => { clearTimeout(timer); i = k; show(k); };
  new ResizeObserver(() => show(i)).observe(box);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    clearTimeout(timer);
    if (visible) tick();
  }, { threshold: 0.4 }).observe(box);
}

// Palette: switch between the explored and final colours.
function initPaletteTabs() {
  document.querySelectorAll(".cx-tabs").forEach((list) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        select(next);
        next.focus();
      });
    });
  });
}

// Complex component cards grow to the height of whatever is open in them, so each variant gets its own size.
function initFitToOpen() {
  // What can open in each card. Dialog and drawer sit inside the stage, so they size it differently.
  const OPEN = ".cc-list:not([hidden]), .cc-range:not([hidden]), .cc-popover:not([hidden]), .cc-nav-pop:not([hidden]), .cb-menu:not([hidden])";
  document.querySelectorAll(".cc-combo-card, .cc-range-card, .cc-stage, .cc-nav-card, .cc-crumb-card").forEach((card) => {
    const isStage = card.classList.contains("cc-stage");
    const fit = () => {
      const em = parseFloat(getComputedStyle(card).fontSize);
      const top = card.getBoundingClientRect().top;
      let need = 0;
      // Popups hang below their trigger: the card must reach their bottom edge plus padding.
      card.querySelectorAll(OPEN).forEach((el) => {
        need = Math.max(need, el.getBoundingClientRect().top - top + el.offsetHeight + em);
      });
      if (isStage) {
        const dialog = card.querySelector(".cc-dialog:not([hidden])");
        const drawer = card.querySelector(".cc-drawer:not([hidden])");
        // The dialog is centred, so it needs room above and below.
        if (dialog) need = Math.max(need, dialog.offsetHeight + 3 * em);
        // The drawer rises from the bottom, leaving the trigger row visible above it.
        if (drawer) need = Math.max(need, drawer.offsetHeight + 4 * em);
        card.style.height = need ? `${Math.max(need, 7.5 * em)}px` : "";
      } else {
        card.style.minHeight = need ? `${need}px` : "";
      }
    };
    new MutationObserver(fit).observe(card, { subtree: true, childList: true, attributes: true, attributeFilter: ["hidden"] });
  });
}

// Expand buttons for assets whose text renders under 10px. Boards move into a large dialog (and back on close),
// so they keep state such as dark mode or the open tab. Screenshots open as a full-width copy of the image on show.
// Add selectors here to give more assets the button: boards move into the dialog, shots open as an image copy.
const EXPAND_BOARDS = [".gs-panel", ".figure-media.mail-board", ".figure-media.session"];
const EXPAND_SHOTS = [];
function initExpand() {
  const start = document.getElementById("foundations");
  const end = document.getElementById("components");
  const foundations = start && end ? [...document.querySelectorAll(".panel-card")].filter(
    (c) => start.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING && end.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_PRECEDING
  ) : [];
  const boards = [...new Set([...foundations, ...EXPAND_BOARDS.flatMap((sel) => [...document.querySelectorAll(sel)])])];
  const shots = EXPAND_SHOTS.flatMap((sel) => [...document.querySelectorAll(sel)]);
  if (!boards.length && !shots.length && !document.querySelector(".mess")) return;
  const EXPAND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>';
  const dialog = document.createElement("dialog");
  dialog.className = "expand-dialog";
  dialog.innerHTML = `<button type="button" class="expand-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.x}</svg></button><div class="expand-slot"></div>`;
  document.body.append(dialog);
  const slot = dialog.querySelector(".expand-slot");
  let placeholder = null;
  let opener = null;
  // Put the open board back where it came from, or drop the image copy. Safe to call twice.
  const restore = () => {
    const card = slot.firstElementChild;
    if (card && placeholder) placeholder.replaceWith(card);
    else card?.remove();
    placeholder = null;
  };
  const labelOf = (el) => (el.closest(".foundation-row")?.querySelector(".numbered li p") || el.querySelector(".mess-tabs [aria-selected=true]") || el.closest(".panel")?.querySelector(".panel-label") || el.closest("figure")?.querySelector("figcaption, p"))?.textContent.trim() || "image";
  const addButton = (el, open, name = labelOf(el)) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "expand-btn";
    btn.setAttribute("aria-label", `Expand ${name}`);
    btn.innerHTML = EXPAND;
    el.classList.add("expandable");
    el.append(btn);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (dialog.open) dialog.close();
      restore();
      opener = btn;
      open();
      dialog.setAttribute("aria-label", labelOf(el));
      dialog.showModal();
    });
  };

  boards.forEach((card) => addButton(card, () => {
    placeholder = document.createElement("div");
    placeholder.style.height = `${card.offsetHeight}px`;
    // Fit the whole board on screen: as wide as possible without being taller than the window.
    const ratio = card.offsetWidth / card.offsetHeight;
    dialog.style.width = `${Math.min(1280, innerWidth - 48, (innerHeight - 64) * ratio)}px`;
    card.replaceWith(placeholder);
    slot.append(card);
  }));
  // Before/after pivots open side by side, uncropped, with the panel's tabs to switch pivots in the dialog too.
  document.querySelectorAll(".mess").forEach((panel) => addButton(panel, () => {
    const pageTabs = [...panel.querySelectorAll(".mess-tabs [role=tab]")];
    const view = document.createElement("div");
    view.className = "expand-pair";
    const tabs = panel.querySelector(".mess-tabs").cloneNode(true);
    const body = document.createElement("div");
    body.className = "expand-pair-body";
    view.append(tabs, body);
    const show = (i) => {
      // Keep the page in step, so closing lands on the same pivot
      pageTabs[i].click();
      tabs.querySelectorAll("[role=tab]").forEach((t, k) => t.setAttribute("aria-selected", String(k === i)));
      const pair = panel.querySelector(".mess-pair:not([hidden])");
      body.replaceChildren();
      pair.querySelectorAll("figure").forEach((fig) => {
        const src = fig.querySelector("img");
        const col = document.createElement("figure");
        col.innerHTML = `<p>${fig.querySelector("p").textContent}</p>`;
        const img = new Image();
        img.src = src.currentSrc || src.src;
        img.alt = src.alt;
        col.append(img);
        body.append(col);
      });
      const cap = pair.querySelector("figcaption");
      if (cap) body.insertAdjacentHTML("beforeend", `<p class="expand-pair-cap">${cap.innerHTML}</p>`);
      dialog.scrollTop = 0;
    };
    tabs.querySelectorAll("[role=tab]").forEach((t, i) => t.addEventListener("click", () => show(i)));
    show(Math.max(0, pageTabs.findIndex((t) => t.getAttribute("aria-selected") === "true")));
    dialog.style.width = `${Math.min(1440, innerWidth - 48)}px`;
    slot.append(view);
  }, "both screens"));
  // Screenshots open at full dialog width; tall ones scroll inside the dialog.
  shots.forEach((el) => addButton(el, () => {
    const src = [...el.querySelectorAll("img")].find((i) => !i.hidden);
    const img = new Image();
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    img.className = "expand-img";
    dialog.style.width = `${Math.min(1280, innerWidth - 48, src.naturalWidth || 1280)}px`;
    slot.append(img);
  }));

  dialog.addEventListener("close", () => {
    // The close event is async; skip it if another asset has opened since.
    if (dialog.open) return;
    restore();
    opener?.focus();
  });
  dialog.querySelector(".expand-close").addEventListener("click", () => dialog.close());
  // Clicking the backdrop closes it.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
}

// Variables panel: an overview of every collection, a browsable table, and a tour that plays like a video.
function initVariablesPanel() {
  const board = document.querySelector("[data-vars]");
  if (!board || !window.DEPLOY_VARIABLES) return;
  // Same order as the collections list in Figma.
  const ORDER = ["Color Tokens", "Primitives", "Style Tokens", "Typography Variables", "Elevation Tokens"];
  const data = [...window.DEPLOY_VARIABLES].sort((a, b) => ORDER.indexOf(a.name) - ORDER.indexOf(b.name));
  const byName = new Map();
  data.forEach((c) => c.vars.forEach((v) => byName.has(v.n) || byName.set(v.n, { c, v })));
  const esc = (t) => String(t).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
  const css = (hex) => {
    const [h, a] = String(hex).split("@");
    if (!a) return h;
    const n = parseInt(h.slice(1), 16);
    return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  };
  const isColor = (val) => typeof val === "string" && val.startsWith("#");
  const chip = (label, resolved, alias) =>
    `<span class="vp-chip${alias ? " is-alias" : ""}">${isColor(resolved) ? `<i class="vp-sw" style="--c:${css(resolved)}"></i>` : ""}<span class="${isColor(resolved) ? "" : "vp-num"}">${esc(label)}</span></span>`;
  const group = (name) => (name.includes("/") ? name.split("/")[0] : null);

  const stats = board.querySelector(".vp-stats");
  const cols = board.querySelector(".vp-cols");
  const groups = board.querySelector(".vp-groups");
  const title = board.querySelector(".vp-title");
  const search = board.querySelector(".vp-search");
  const table = board.querySelector(".vp-table");
  const detail = board.querySelector(".vp-detail");
  let col = data[0];
  let grp = null;
  let active = null;

  const total = data.reduce((n, c) => n + c.vars.length, 0);
  const renderStats = () => {
    stats.innerHTML = `<div class="vp-stat is-total"><b>${total}</b><span>variables</span><small>${data.length} collections</small></div>` +
      data.map((c) => `<button type="button" class="vp-stat" aria-pressed="${c === col}" data-col="${esc(c.name)}"><b>${c.vars.length}</b><span>${esc(c.name)}</span><small>${c.modes.length > 1 ? c.modes.map(esc).join(" · ") : "1 mode"}</small></button>`).join("");
  };
  const renderCols = () => {
    renderStats();
    cols.innerHTML = data.map((c) => `<button type="button" class="vp-item" role="tab" aria-selected="${c === col}" data-col="${esc(c.name)}"><span>${esc(c.name)}</span><span>${c.vars.length}</span></button>`).join("");
    const counts = new Map();
    col.vars.forEach((v) => { const g = group(v.n); if (g) counts.set(g, (counts.get(g) || 0) + 1); });
    groups.innerHTML = [[null, "All", col.vars.length], ...[...counts].map(([g, n]) => [g, g, n])]
      .map(([g, label, n]) => `<button type="button" class="vp-item" aria-selected="${g === grp}" data-grp="${g === null ? "" : esc(g)}"><span>${esc(label)}</span><span>${n}</span></button>`).join("");
  };
  const renderTable = () => {
    const q = search.value.trim().toLowerCase();
    const rows = col.vars.filter((v) => (grp === null || group(v.n) === grp) && (!q || v.n.toLowerCase().includes(q) || (v.d || "").toLowerCase().includes(q)));
    title.textContent = grp ? `${col.name} / ${grp}` : col.name;
    const template = `minmax(9em, 1.3fr) repeat(${col.modes.length}, minmax(6em, 1fr))`;
    const head = `<div class="vp-row vp-head" role="row" style="grid-template-columns:${template}"><span role="columnheader">Name</span>${col.modes.map((m) => `<span role="columnheader">${esc(m)}</span>`).join("")}</div>`;
    const body = rows.map((v) => {
      const shown = grp ? v.n.slice(grp.length + 1) : v.n;
      const cut = shown.lastIndexOf("/");
      const name = cut < 0 ? `<b>${esc(shown)}</b>` : `<b><i>${esc(shown.slice(0, cut + 1))}</i>${esc(shown.slice(cut + 1))}</b>`;
      const vals = v.v.map(([alias, res]) => `<span class="vp-val" role="cell">${alias ? chip(alias, res, true) : chip(res, res, false)}</span>`).join("");
      return `<div class="vp-row${v === active ? " is-active" : ""}" role="row" tabindex="0" data-var="${esc(v.n)}" style="grid-template-columns:${template}"><span class="vp-name" role="cell">${name}${v.d ? `<small>${esc(v.d)}</small>` : ""}</span>${vals}</div>`;
    }).join("");
    table.innerHTML = head + (body || `<p class="vp-empty">No variables match “${esc(q)}”.</p>`);
  };
  // Follows an alias through each collection until it reaches a raw value.
  const chain = (v, modeName, i) => {
    const steps = [chip(v.n, v.v[i][1], true)];
    let [alias, res] = v.v[i];
    let guard = 0;
    while (alias && guard++ < 8) {
      const next = byName.get(alias.split(" · ")[0]);
      steps.push(chip(alias, res, true));
      if (!next) break;
      const j = Math.max(0, next.c.modes.indexOf(modeName));
      [alias, res] = next.v.v[j];
    }
    steps.push(chip(res, res, false));
    return steps.join("<span>→</span>");
  };
  const closeDetail = () => { detail.hidden = true; active = null; };
  const showDetail = (v) => {
    active = v;
    detail.hidden = false;
    detail.innerHTML = `
      <div class="vp-detail-top"><p>${esc(v.n)}</p><button type="button" aria-label="Close details">${icon("x")}</button></div>
      <dl class="vp-meta"><dt>Collection</dt><dd>${esc(col.name)}</dd><dt>Type</dt><dd>${v.t === "C" ? "Color" : "Number"}</dd>${v.d ? `<dt>Usage</dt><dd>${esc(v.d)}</dd>` : ""}</dl>
      ${col.modes.map((m, i) => `<div class="vp-mode"><p>${esc(m)}</p><div class="vp-chain">${chain(v, m, i)}</div></div>`).join("")}`;
    detail.querySelector("button").addEventListener("click", () => { closeDetail(); renderTable(); });
    renderTable();
  };
  const selectCol = (c, g = null) => {
    col = c;
    grp = g;
    search.value = "";
    closeDetail();
    renderCols();
    renderTable();
    table.scrollTop = 0;
  };

  board.addEventListener("click", (e) => {
    const c = e.target.closest("[data-col]");
    const g = e.target.closest("[data-grp]");
    const row = e.target.closest("[data-var]");
    if (c) selectCol(data.find((x) => x.name === c.dataset.col));
    else if (g) { grp = g.dataset.grp || null; closeDetail(); renderCols(); renderTable(); table.scrollTop = 0; }
    else if (row) showDetail(col.vars.find((v) => v.n === row.dataset.var));
  });
  table.addEventListener("keydown", (e) => {
    const row = e.target.closest("[data-var]");
    if (row && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); showDetail(col.vars.find((v) => v.n === row.dataset.var)); }
  });
  search.addEventListener("input", renderTable);
  board.addEventListener("keydown", (e) => { if (e.key === "Escape" && !detail.hidden) { closeDetail(); renderTable(); } });

  // Tour: walks through each collection like a screen recording. Any click or key press inside the board stops it.
  const playBtn = board.querySelector(".vp-play");
  const bar = board.querySelector(".vp-progress i");
  const pick = (name) => col.vars.find((v) => v.n === name);
  const STEPS = [
    { col: "Color Tokens", scroll: 2600, detail: "bg/destructive" },
    { col: "Primitives", scroll: 4200 },
    { col: "Style Tokens", scroll: 1800, detail: "border radius/lg" },
    { col: "Typography Variables", scroll: 1400, detail: "font-size/headline/h1" },
    { col: "Elevation Tokens", scroll: 5200 },
  ];
  const PAUSE = 900, DETAIL = 2800;
  const duration = STEPS.reduce((t, s) => t + PAUSE + s.scroll + (s.detail ? DETAIL : 0), 0);
  let playing = false, userPaused = false, visible = false, run = 0, elapsed = 0;
  const setButton = () => {
    playBtn.innerHTML = playing
      ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>Pause tour`
      : `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>Play tour`;
    playBtn.setAttribute("aria-pressed", String(playing));
  };
  // Waits ms of tour time, calling tick(fraction) each frame; resolves false if the tour stopped.
  const wait = (ms, id, tick) => new Promise((resolve) => {
    const start = performance.now();
    const base = elapsed;
    const frame = (now) => {
      if (id !== run) return resolve(false);
      const f = Math.min(1, (now - start) / ms);
      elapsed = base + f * ms;
      bar.style.width = `${(elapsed / duration) * 100}%`;
      tick?.(f);
      f < 1 ? requestAnimationFrame(frame) : resolve(true);
    };
    requestAnimationFrame(frame);
  });
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
  const tour = async () => {
    const id = ++run;
    while (id === run) {
      elapsed = 0;
      for (const step of STEPS) {
        selectCol(data.find((c) => c.name === step.col));
        if (!(await wait(PAUSE, id))) return;
        const max = () => table.scrollHeight - table.clientHeight;
        if (!(await wait(step.scroll, id, (f) => (table.scrollTop = ease(f) * max())))) return;
        if (step.detail) {
          showDetail(pick(step.detail));
          // Scroll only the table, never the page.
          const row = table.querySelector(".vp-row.is-active");
          if (row) table.scrollTop = row.offsetTop - table.clientHeight / 2;
          if (!(await wait(DETAIL, id))) return;
          closeDetail();
          renderTable();
        }
      }
    }
  };
  const play = () => { if (playing) return; playing = true; setButton(); selectCol(data[0]); tour(); };
  const stop = () => { playing = false; run++; setButton(); };
  playBtn.addEventListener("click", (e) => { e.stopPropagation(); playing ? (userPaused = true, stop()) : (userPaused = false, play()); });
  ["pointerdown", "keydown"].forEach((type) =>
    board.addEventListener(type, (e) => { if (playing && !playBtn.contains(e.target)) { userPaused = true; stop(); } })
  );

  renderCols();
  renderTable();
  setButton();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !userPaused) play();
      else if (!visible && playing) stop();
    }, { threshold: 0.35 }).observe(board);
  }
}

// When the mouse leaves a complex component card, close anything open in it so the card can collapse.
function initCollapseOnLeave() {
  document.querySelectorAll(".cc-combo-card, .cc-range-card, .cc-stage, .cc-toasts, .cc-nav-card, .cc-crumb-card").forEach((card) =>
    card.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "mouse") return;
      // Popups close on an outside click.
      document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      const scrim = card.querySelector(".cc-scrim:not([hidden])");
      if (scrim) scrim.click();
      card.querySelectorAll(".cc-toast").forEach((t) => t.remove());
      if (card.contains(document.activeElement)) document.activeElement.blur();
    })
  );
}

renderChrome();
renderProjects();
renderFun();

// First-visit (or reload) intro: the name's letters grow to fill the screen, then the panel fades away.
function initIntro() {
  const root = document.querySelector(".intro");
  const html = document.documentElement;
  if (!root) return;
  if (!("intro" in html.dataset)) { root.remove(); return; }
  try { localStorage.setItem("intro", "1"); } catch {}
  const word = root.querySelector(".intro-word");
  const letters = [...word.textContent].map((c) => {
    const el = document.createElement("span");
    el.textContent = c;
    return el;
  });
  word.replaceChildren(...letters);
  word.classList.add("split");
  // ?intro=fade swaps the grow for a plain fade; any ?intro forces it to play.
  const fade = html.dataset.intro === "fade";
  let ended = false;
  const finish = () => {
    if (ended) return;
    ended = true;
    root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" })
      .finished.then(() => { delete html.dataset.intro; root.remove(); });
  };
  root.addEventListener("click", finish);
  addEventListener("keydown", finish, { once: true });
  setTimeout(finish, 2500);
  const play = () => {
    if (fade) {
      const runs = letters.map((el, i) => el.animate(
        [{ opacity: 0, transform: "translateY(12%)" }, { opacity: 1, transform: "none" }],
        { duration: 500, delay: i * 30, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" }).finished);
      Promise.all(runs).then(() => setTimeout(finish, 350));
      return;
    }
    const vw = innerWidth, vh = innerHeight, cols = Math.ceil(letters.length / 2);
    const runs = letters.map((el, i) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - vw / 2, cy = r.top + r.height / 2 - vh / 2;
      const tilt = (i % 2 ? 1 : -1) * (1 + (i % 3));
      const col = i % cols, row = i < cols ? -1 : 1;
      const tx = (col + 0.5) * (vw / cols) - vw / 2 - cx, ty = row * vh * 0.27 - cy;
      const k = Math.max((vw / cols) * 1.1 / r.width, (vh * 0.55) / r.height);
      return el.animate([
        { offset: 0, opacity: 0, transform: "translateY(20%)", easing: "cubic-bezier(.2,.7,.3,1)" },
        { offset: 0.3, opacity: 1, transform: "none" },
        { offset: 0.45, opacity: 1, transform: "none", easing: "cubic-bezier(.65,0,.35,1)" },
        { offset: 1, opacity: 1, transform: `translate(${tx}px, ${ty}px) rotate(${tilt}deg) scale(${k})` },
      ], { duration: 1100, delay: i * 25, fill: "forwards" }).finished;
    });
    Promise.all(runs).then(finish);
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(play, play);
}
initIntro();

// Home cards tilt a little toward the pointer, with a soft light where it is
function initCardTilt() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".projects .project").forEach((card) => {
    const thumb = card.querySelector(".thumb");
    card.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = thumb.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      thumb.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
      thumb.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
      thumb.style.setProperty("--mx", `${x * 100}%`);
      thumb.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => ["--rx", "--ry"].forEach((v) => thumb.style.removeProperty(v)));
  });
}
initCardTilt();
// Mensio request flow: draws each person's rail and the route through the numbered stops.
function initRequestFlow() {
  const LANE_Y = [56, 150, 244];
  const START = 96;
  const ns = "http://www.w3.org/2000/svg";

  document.querySelectorAll(".rq").forEach((card) => {
    const map = card.querySelector(".rq-map");
    const svg = map.querySelector(".rq-svg");
    const detail = card.querySelector(".rq-detail");
    const loopLabel = map.querySelector(".rq-loop-label");
    const hint = "Hover a step to see what happened.";
    // Stops spread evenly across the rail in each view
    const gap = (n) => (map.clientWidth - START - 56) / (n - 1);
    const place = (stops) => stops.map((b, i) => ({ b, x: START + i * gap(stops.length), y: LANE_Y[+b.dataset.lane] }));

    const draw = (animate) => {
      const view = card.dataset.view;
      const group = map.querySelector(`.rq-stops[data-for="${view}"]`);
      const pts = place([...group.querySelectorAll(".rq-stop")]);
      map.querySelectorAll(".rq-lane").forEach((l) => (l.style.top = `${LANE_Y[+l.dataset.lane]}px`));
      pts.forEach(({ b, x, y }) => {
        b.style.left = `${x}px`; b.style.top = `${y}px`; b.style.width = `${gap(pts.length) - 6}px`;
        // Client labels sit above the rail in the before view, clear of the route
        b.classList.toggle("up", view === "before" && b.dataset.lane === "0");
      });

      // The route runs the full length of the rails, from the rail's start to its end
      const railStart = START - 16, railEnd = map.clientWidth - 24;
      let d = `M${railStart} ${pts[0].y} L${pts[0].x} ${pts[0].y}`;
      pts.slice(1).forEach((p, i) => {
        const a = pts[i];
        if (a.y === p.y) d += ` L${p.x} ${p.y}`;
        else { const m = (a.x + p.x) / 2; d += ` C${m} ${a.y} ${m} ${p.y} ${p.x} ${p.y}`; }
      });
      const last = pts[pts.length - 1];
      d += ` L${railEnd} ${last.y}`;
      const rails = LANE_Y.map((y) => `<line class="rq-rail" x1="${railStart}" y1="${y}" x2="${railEnd}" y2="${y}"${view === "after" && y !== LANE_Y[0] ? ' style="opacity:.45"' : ""}/>`).join("");
      let loop = "";
      if (view === "before") {
        // Revise loops back to the pull
        const a = pts[7], b = pts[3], top = a.y - 64;
        loop = `<path class="rq-route loop" d="M${a.x} ${a.y - 14} C${a.x} ${top} ${b.x} ${top} ${b.x} ${b.y - 14}"/>`;
        loopLabel.style.left = `${(a.x + b.x) / 2}px`;
        loopLabel.style.top = `${a.y - 50}px`;
      }
      svg.innerHTML = rails + loop + `<path class="rq-route" d="${d}"/>`;

      const route = svg.querySelector(".rq-route:not(.loop)");
      map.querySelectorAll(".rq-stops").forEach((g) => g.classList.toggle("in", g === group && !animate));
      if (animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const len = route.getTotalLength();
        route.style.strokeDasharray = len;
        route.style.strokeDashoffset = len;
        route.getBoundingClientRect();
        route.classList.add("draw");
        route.style.strokeDashoffset = 0;
        group.querySelectorAll(".rq-stop").forEach((b, i) => (b.style.transitionDelay = `${(i / pts.length) * 0.8}s`));
        requestAnimationFrame(() => group.classList.add("in"));
      } else {
        group.querySelectorAll(".rq-stop").forEach((b) => (b.style.transitionDelay = "0s"));
        group.classList.add("in");
      }
    };

    const select = (stop) => {
      card.querySelectorAll(".rq-stop.on").forEach((b) => b.classList.remove("on"));
      if (!stop) { detail.textContent = hint; return; }
      stop.classList.add("on");
      detail.innerHTML = `<b>${stop.querySelector("span").innerHTML}</b>${stop.dataset.d}`;
    };

    card.querySelectorAll("[data-rq]").forEach((tab) => tab.addEventListener("click", () => {
      if (card.dataset.view === tab.dataset.rq) return;
      card.dataset.view = tab.dataset.rq;
      card.querySelectorAll("[data-rq]").forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      select(null);
      drawn = true;
      draw(true);
    }));
    card.querySelectorAll(".rq-stop").forEach((b) => ["mouseenter", "focus", "click"].forEach((t) => b.addEventListener(t, () => select(b))));
    map.addEventListener("mouseleave", () => select(null));
    let drawn = false;
    new ResizeObserver(() => drawn && draw(false)).observe(map);
    select(null);

    // Draw the route in the first time the diagram scrolls into view
    // A low threshold: on phones the map is wider than the screen and scrolls sideways, so it never shows 40% of itself
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); drawn = true; draw(true); } }, { threshold: 0.15 });
    io.observe(map);
  });
}

// Mensio pivots: one pair of discarded and shipped designs at a time.
function initPivots() {
  document.querySelectorAll(".mess").forEach((panel) => {
    const tabs = [...panel.querySelectorAll("[data-pivot][role=tab]")];
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      panel.querySelectorAll(".mess-pair").forEach((p) => (p.hidden = p.dataset.pivot !== tab.dataset.pivot));
    }));
  });
}

// Annotated screenshots: a marker or its list item zooms the image to frame its part of the screen.
// A marker's data-f="x0,y0,x1,y1" (percent) is the part to frame; without it the zoom centres on the marker's spot.
function initAnnotations() {
  const ZOOM = 2.2, ZOOM_FRAMED = 2.8, PAD = 6;   // framed parts are measured tightly, so they can zoom further
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  document.querySelectorAll(".annot").forEach((fig) => {
    const stage = fig.querySelector(".annot-stage");
    const hots = [...fig.querySelectorAll(".hot")];
    const items = [...fig.querySelectorAll(".annot-list li")];
    const pct = (h, v) => parseFloat(h.style.getPropertyValue(v));
    const show = (i) => {
      const on = i != null;
      fig.classList.toggle("on", on);
      hots.forEach((h, k) => h.classList.toggle("on", k === i));
      items.forEach((li, k) => li.classList.toggle("on", k === i));
      fig.querySelectorAll(".annot-state").forEach((el) => el.classList.toggle("on", +el.dataset.i === i));
      hots.forEach((h) => { h.style.removeProperty("left"); h.style.removeProperty("top"); });
      let z = 1, tx = 0, ty = 0;
      if (on) {
        const h = hots[i], ox = pct(h, "--x"), oy = pct(h, "--y");
        const [x0, y0, x1, y1] = h.dataset.f ? h.dataset.f.split(",").map(Number) : [ox - 14, oy - 12, ox + 14, oy + 12];
        z = Math.min(h.dataset.f ? ZOOM_FRAMED : ZOOM, (100 - PAD * 2) / Math.max(x1 - x0, 1), (100 - PAD * 2) / Math.max(y1 - y0, 1));
        // Centre the part, but never pull an edge of the screenshot into the frame
        tx = clamp(50 - ((x0 + x1) / 2) * z, 100 - 100 * z, 0);
        ty = clamp(50 - ((y0 + y1) / 2) * z, 100 - 100 * z, 0);
        // Everything outside the part is dimmed
        [["--bx", x0], ["--by", y0], ["--bw", x1 - x0], ["--bh", y1 - y0]].forEach(([k, v]) => stage.style.setProperty(k, `${v}%`));
        // Framed parts get the marker beside the frame, so it never covers what's framed: above it if there's room
        // in view, else below, left or right. Either way it stays inside the picture.
        const fits = ([x, y]) => x * z + tx >= 5 && x * z + tx <= 95 && y * z + ty >= 7 && y * z + ty <= 93;
        const g = 7 / z, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
        const spots = [[cx, y0 - g], [cx, y1 + g], [x0 - g, cy], [x1 + g, cy]];
        const [mx, my] = h.dataset.f ? spots.find(fits) || spots[0] : [pct(h, "--mx"), pct(h, "--my")];
        h.style.left = `${(clamp(mx * z + tx, 5, 95) - tx) / z}%`;
        h.style.top = `${(clamp(my * z + ty, 7, 93) - ty) / z}%`;
      }
      stage.style.setProperty("--z", z);
      stage.style.setProperty("--tx", `${tx}%`);
      stage.style.setProperty("--ty", `${ty}%`);
    };
    [...hots, ...items].forEach((el) => {
      const i = +el.dataset.i;
      el.addEventListener("mouseenter", () => show(i));
      el.addEventListener("focus", () => show(i));
      el.addEventListener("click", () => show(fig.classList.contains("on") && el.classList.contains("on") ? null : i));
    });
    fig.addEventListener("mouseleave", () => show(null));
  });
}

// Mensio affinity board: notes scatter as raw interview notes, then stack under each finding.
function initAffinity() {
  document.querySelectorAll(".af").forEach((card) => {
    const board = card.querySelector(".af-board");
    const notes = [...board.querySelectorAll(".af-note")];
    const heads = [...board.querySelectorAll(".af-head")];
    // PEEK shows the first two lines of each stacked note; hovering one brings it to the front
    const GAP = 16, PEEK = 45;
    // Fixed scatter so the raw view looks the same on every visit
    const rand = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
    board.classList.add("ready");

    const layout = () => {
      const W = board.clientWidth;
      // One column on phones, so each note is wide enough to read its first lines
      const cols = W >= 640 ? 4 : W >= 420 ? 2 : 1;
      const colW = (W - GAP * (cols - 1)) / cols;
      [...notes, ...heads].forEach((el) => (el.style.width = `${colW}px`));

      // Grouped: each finding's header, then its notes stacked below it, later notes on top
      const grouped = [];
      let rowTop = 0, rowH = 0;
      heads.forEach((h, g) => {
        const col = g % cols;
        if (col === 0 && g) { rowTop += rowH + 28; rowH = 0; }
        const x = col * (colW + GAP);
        h.style.transform = `translate(${x}px, ${rowTop}px)`;
        // Stacks in a row start level, under the row's tallest header
        const rowHeads = heads.slice(g - col, g - col + cols);
        let y = rowTop + Math.max(...rowHeads.map((r) => r.offsetHeight)) + 12, bottom = y;
        notes.filter((n) => +n.dataset.g === g).forEach((n, i) => {
          grouped.push({ n, x: x + (i % 2 ? 4 : -2), y, r: i % 2 ? 1.4 : -1.2, z: i + 1 });
          bottom = y + n.offsetHeight;
          y += PEEK;
        });
        rowH = Math.max(rowH, bottom - rowTop);
      });
      const height = rowTop + rowH + 8;

      if (card.dataset.view === "raw") {
        notes.forEach((n, i) => {
          const x = rand(i, 1) * (W - colW), y = rand(i, 2) * Math.max(0, height - n.offsetHeight);
          n.style.transform = `translate(${x}px, ${y}px) rotate(${(rand(i, 3) - 0.5) * 10}deg)`;
          n.style.zIndex = i + 1;
        });
      } else {
        grouped.forEach(({ n, x, y, r, z }) => {
          n.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
          n.style.zIndex = z;
        });
      }
      board.style.height = `${height}px`;
    };

    const setView = (view) => {
      card.dataset.view = view;
      card.querySelectorAll("[data-af]").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.af === view)));
      notes.forEach((n, i) => (n.style.transitionDelay = `${i * 0.03}s`));
      layout();
    };
    card.querySelectorAll("[data-af]").forEach((t) => t.addEventListener("click", () => setView(t.dataset.af)));

    // Start scattered, then sort into the findings the first time the board is in view
    card.dataset.view = "raw";
    card.querySelectorAll("[data-af]").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.af === "raw")));
    layout();
    new ResizeObserver(layout).observe(board);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setView("grouped"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setTimeout(() => setView("grouped"), 400);
    }, { rootMargin: "0px 0px -30% 0px" });
    io.observe(board);
  });
}

// Left-to-right tracker. Reference mode shows the real Domino's Tracker; Mensio mode steps
// through the stakeholders' stages, with skeleton options standing in for each stage's choices.
// QA board: the spec doc's design QA and product requests as a board, grouped by priority or by step.
function initQaBoard() {
  // [title, step, type, reporter, priority]; design QA items were not given a priority in the doc
  const ISSUES = [
    ["Header shows the chart name", "Modal", "change", "design", ""],
    ["Pills stay pinned on scroll", "Modal", "change", "design", ""],
    ["Each step opens scrolled to the top", "Modal", "bug", "design", ""],
    ["Next is Primary, Cancel Secondary, Back Tertiary", "Modal", "change", "design", ""],
    ["“Other Options” chevron points up, not right", "Metrics", "change", "design", ""],
    ["Tooltips missing across metric groupings", "Metrics", "bug", "design", ""],
    ["Re-opening a chart drops the metric grouping", "Metrics", "bug", "design", ""],
    ["“Other Options” collapsed by default", "Groupings", "change", "design", ""],
    ["Pills name their slot, e.g. “Brands (Bars)”", "Groupings", "change", "design", ""],
    ["Calendar sits right below the date fields", "Date range", "change", "design", ""],
    ["Seasons starts with empty Start and End dates", "Date range", "change", "design", ""],
    ["Trash icon only on added date ranges", "Date range", "change", "design", ""],
    ["Next stays disabled after picking a date range", "Date range", "bug", "design", ""],
    ["Add a filter pill only once a value is picked", "Filters", "bug", "design", ""],
    ["Nested filters appear after their parent is picked", "Filters", "change", "design", ""],
    ["Pill stays as “None Selected” after clearing Select All", "Filters", "bug", "design", ""],
    ["Empty sections still show, as “None selected”", "Review", "change", "design", ""],
    ["Edit buttons use the Secondary style", "Review", "change", "design", ""],
    ["Don't pre-select a chart style", "Modal", "change", "product", "P0"],
    ["Save & Fetch doesn't save", "Review", "bug", "product", "P0"],
    ["“of of” typo under “How would you like to create this chart?”", "Modal", "bug", "product", "P0"],
    ["Auto-scroll after a metric grouping goes too far", "Metrics", "bug", "product", "P0"],
    ["Metric pills follow the recommended order", "Metrics", "change", "product", "P0"],
    ["Multiple date ranges allow one data grouping, as bars", "Groupings", "change", "product", "P0"],
    ["Scatterplot shows the Table's grouping copy", "Groupings", "bug", "product", "P0"],
    ["Footer doesn't span the modal", "Modal", "bug", "product", "P1"],
    ["Reorder the Seasons list", "Date range", "change", "product", "P1"],
    ["Teams tooltip: both teams are counted", "Groupings", "change", "product", "P1"],
    ["Show “(6 options)”", "Modal", "change", "product", "P2"],
    ["Explain an empty Other Options", "Metrics", "change", "product", "P2"],
    ["Keep the chosen league selected in the Seasons dropdown", "Date range", "bug", "product", "P2"],
    ["Clicking a pill opens its step", "Modal", "change", "product", "P2"],
    ["Clearing a filter pill leaves its dropdown value", "Filters", "bug", "product", "P3"],
    ["Picking a value doesn't select its filter; ask customers after release", "Filters", "change", "product", "P4"],
  ];
  // Four columns, two cards each; the rest are counted, not shown
  const COLS = [["Design QA", (p) => !p], ["P0", (p) => p === "P0"], ["P1", (p) => p === "P1"], ["P2–P4", (p) => /P[234]/.test(p)]];
  const SHOW = 2;
  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  document.querySelectorAll(".qa").forEach((card) => {
    card.querySelector(".qa-board").innerHTML = COLS.map(([name, test]) => {
      const items = ISSUES.filter((it) => test(it[4]));
      const more = items.length - SHOW;
      return `<section class="qa-col"><h4>${name} <span>${items.length}</span></h4><ul>${items.slice(0, SHOW).map(([t, step, type]) =>
        `<li class="qa-card"><p>${esc(t)}</p><span class="qa-tag${type === "bug" ? " qa-bug" : ""}">${type === "bug" ? "Bug · " : ""}${step}</span></li>`).join("")}</ul>${more > 0 ? `<p class="qa-more">+${more} more</p>` : ""}</section>`;
    }).join("");
  });
}

// Chart examples: one tab per chart type
function initChartTabs() {
  document.querySelectorAll(".chart-tabs").forEach((panel) => {
    const tabs = [...panel.querySelectorAll("[role=tab][data-chart]")];
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      panel.querySelectorAll("img[data-chart]").forEach((img) => (img.hidden = img.dataset.chart !== tab.dataset.chart));
    }));
  });
}

// TL;DR toggle: a short version keeps the marked sections and drops the blocks inside them marked to hide.
function initTldr() {
  const tabs = [...document.querySelectorAll(".tldr-toggle [data-tldr-mode]")];
  if (!tabs.length) return;
  document.body.append(document.querySelector(".tldr-toggle"));
  const toggle = document.querySelector(".tldr-toggle");
  const bubble = toggle.querySelector(".tldr-say");
  let timer;
  const say = (ms = 2600) => {
    const short = document.body.classList.contains("tldr");
    bubble.textContent = short ? "You're reading the short version. Want the details? Try Full story." : "Short on time? TL;DR has the highlights.";
    bubble.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(() => (bubble.hidden = true), ms);
  };
  const sayOnLoad = () => setTimeout(() => say(5000), 900);
  toggle.addEventListener("pointerenter", () => say(60000));
  toggle.addEventListener("pointerleave", () => { clearTimeout(timer); timer = setTimeout(() => (bubble.hidden = true), 250); });
  const set = (mode, scroll) => {
    document.body.classList.toggle("tldr", mode === "short");
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tldrMode === mode)));
    // Hide contents links whose section is gone in this mode
    document.querySelectorAll("a[data-toc]").forEach((a) => {
      const target = document.getElementById(a.dataset.toc);
      a.hidden = !!target && !target.getClientRects().length;
    });
    try { localStorage.setItem("story-mode", mode); } catch (e) {}
    if (scroll) document.querySelector(".project-sections").scrollIntoView({ block: "start", behavior: "smooth" });
  };
  tabs.forEach((t) => t.addEventListener("click", () => { set(t.dataset.tldrMode, true); say(); }));
  // The short version is the default; a speech bubble, like Valentino's, points to the other one.
  let saved = "short";
  try { saved = localStorage.getItem("story-mode") || "short"; } catch (e) {}
  set(saved, false);
  sayOnLoad();
}

// Guided Setup's steps light up in order, then start over.
function initSteps() {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".ms-steps").forEach((list) => {
    const items = [...list.children];
    let step = still ? items.length - 1 : 0, timer = 0;
    const render = () => items.forEach((li, i) => { li.classList.toggle("done", i < step); li.classList.toggle("now", i === step); });
    const play = () => {
      clearTimeout(timer);
      timer = setTimeout(() => { step = (step + 1) % items.length; render(); play(); }, step === items.length - 1 ? 1800 : 1100);
    };
    render();
    if (still) return;
    new IntersectionObserver(([e]) => (e.isIntersecting ? play() : clearTimeout(timer)), { threshold: 0.4 }).observe(list);
  });
}

// Stakeholders' tracker: Mensio's stages play through on their own; a stage can also be picked directly.
function initTracker() {
  const STAGES = [
    ["Data type", "Pick one, and the next stages only show what fits it.", 6],
    ["Metrics", "Only the metrics for that data type.", 7],
    ["Data groupings", "Only the groupings for that data type.", 6],
    ["Filters", "Only the filters for that data type.", 7],
    ["Dates", "A date range, or a sports season.", 1],
  ];
  const WIDTHS = [32, 24, 40, 28, 36, 22, 30];
  const HOLD = 1100, LAST = 1800;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".pt").forEach((card) => {
    const stages = [...card.querySelectorAll(".pt-bar li")];
    const label = card.querySelector(".pt-open-label");
    const opts = card.querySelector(".pt-opts");
    let step = 0, timer = 0, visible = false;

    const render = () => {
      stages.forEach((li, i) => { li.classList.toggle("done", i < step); li.classList.toggle("now", i === step); });
      const [name, note, n] = STAGES[step];
      label.innerHTML = `<b>${name}.</b> ${note}`;
      opts.innerHTML = Array.from({ length: n }, (_, i) =>
        `<span class="pt-skel${step === 0 && i === 1 ? " on" : ""}" style="width:${WIDTHS[(i + step * 2) % WIDTHS.length]}px; animation-delay:${i * 40}ms"></span>`).join("");
      schedule();
    };
    // Advance after the current stage's hold, looping back to the start after Dates
    const schedule = () => {
      clearTimeout(timer);
      if (still || !visible || card.dataset.mode !== "mensio") return;
      timer = setTimeout(() => { step = (step + 1) % STAGES.length; render(); }, step === STAGES.length - 1 ? LAST : HOLD);
    };

    const setMode = (mode) => {
      card.dataset.mode = mode;
      card.querySelectorAll("[data-pt]").forEach((t) => t.setAttribute("aria-selected", String(t.dataset.pt === mode)));
      if (mode === "mensio") { step = 0; render(); } else clearTimeout(timer);
    };
    card.querySelectorAll("[data-pt]").forEach((t) => t.addEventListener("click", () => setMode(t.dataset.pt)));
    stages.forEach((li, i) => {
      li.tabIndex = 0;
      const go = () => { step = i; render(); };
      li.addEventListener("click", go);
      li.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; schedule(); }, { threshold: 0.4 }).observe(card);
    render();
  });
}

initScaledFrames();

// Safari sends the wheel to whatever embedded page is under the pointer, even a thumbnail that ignores the mouse,
// so the homepage carousel and the page scroll stop there. Hand any wheel the embed didn't use back to the page:
// re-sent from the frame element (so the carousel hears it), and scrolled here if nothing on the page took it.
// Embeds inside embeds (the Claim Denials app) pass it up one level at a time.
function initWheelPassThrough() {
  const safari = /^((?!chrome|chromium|crios|fxios|edg|android).)*safari/i.test(navigator.userAgent);
  if (!safari) return;
  const scrollsInside = (el, dy) => {
    for (; el && el.nodeType === 1; el = el.parentElement) {
      const cs = el.ownerDocument.defaultView.getComputedStyle(el);
      if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight && (dy < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight)) return true;
    }
    return false;
  };
  const hook = (frame) => {
    try {
      const w = frame.contentWindow;
      if (!w || w.__wheelHooked) return;
      w.__wheelHooked = true;
      w.addEventListener("wheel", (e) => {
        if (e.defaultPrevented || scrollsInside(e.target, e.deltaY)) return;
        const r = frame.getBoundingClientRect();
        const up = new WheelEvent("wheel", { deltaX: e.deltaX, deltaY: e.deltaY, deltaMode: e.deltaMode, clientX: r.left + e.clientX, clientY: r.top + e.clientY, bubbles: true, cancelable: true });
        const unused = frame.dispatchEvent(up);
        if (unused && frame.ownerDocument === document) window.scrollBy(e.deltaX, e.deltaY);
      }, { passive: true });
      const scan = () => w.document.querySelectorAll("iframe").forEach((f) => { hook(f); f.addEventListener("load", () => hook(f)); });
      scan(); w.addEventListener("load", scan);
    } catch {}   // a frame from another site can't be reached; leave it be
  };
  document.querySelectorAll("iframe").forEach((frame) => { hook(frame); frame.addEventListener("load", () => hook(frame)); });
}
initWheelPassThrough();

// Live prototypes can open large over the page, so the UI is big enough to use. The overlay loads its own copy of
// the prototype on the view that's showing (the autoplaying cases clip opens as the plain, clickable table).
// Esc, Close or a click on the backdrop shuts it.
function initProtoExpand() {
  const ICON_OPEN = '<svg viewBox="0 0 12 12"><path d="M7 1h4v4M5 11H1V7M11 1 7 5M1 11l4-4"/></svg>';
  const ICON_CLOSE = '<svg viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8"/></svg>';
  document.querySelectorAll(".proto").forEach((box) => {
    const frame = box.querySelector("iframe");
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "proto-expand";
    btn.innerHTML = `${ICON_OPEN}Expand`; btn.setAttribute("aria-label", "Open the prototype larger");
    box.append(btn);
    btn.addEventListener("click", () => {
      const url = new URL(frame.src, location.href);
      if (url.searchParams.get("v") === "cases-demo") url.searchParams.set("v", "cases");
      const tab = box.parentElement.querySelector('[data-proto-tabs] [aria-selected="true"]');
      if (tab) url.searchParams.set("v", tab.dataset.v);
      url.searchParams.set("scroll", "1");
      const ratio = box.clientWidth / box.clientHeight;
      // Only some of the recreation is wired up; say what is, so nobody clicks a dead button
      const WORKS = {
        dashboard: "Works here: hover the weekly bars for each day's counts.",
        cases: "Works here: search, Show closed, Filters, Columns, and sorting from any column header. Tabs and rows don't open anything.",
        case: "Works here: hover a comment to see the month it explains.",
        start: "Works here: fill in each step, then Next and Back.",
      };
      // ← / → step through the four screens in the same open prototype (the app switches view on a message)
      const STEPS = [["dashboard", "Spot"], ["cases", "Find"], ["case", "Understand"], ["start", "Fix"]];
      let at = Math.max(0, STEPS.findIndex(([v]) => v === url.searchParams.get("v")));
      const hint = document.createElement("p");
      hint.className = "proto-hint";
      const ARROW = (d) => `<svg viewBox="0 0 16 16"><path d="${d}"/></svg>`;
      const prev = document.createElement("button"), next = document.createElement("button");
      prev.type = next.type = "button"; prev.className = next.className = "proto-step";
      prev.innerHTML = ARROW("M10 3 5 8l5 5"); next.innerHTML = ARROW("M6 3l5 5-5 5");
      const label = () => {
        const [v, name] = STEPS[at];
        hint.textContent = `${at + 1} of ${STEPS.length} · ${name}. ${WORKS[v]}`;
        prev.setAttribute("aria-label", `Previous screen: ${STEPS[(at + STEPS.length - 1) % STEPS.length][1]}`);
        next.setAttribute("aria-label", `Next screen: ${STEPS[(at + 1) % STEPS.length][1]}`);
      };
      const go = (d) => { at = (at + d + STEPS.length) % STEPS.length; inner.contentWindow.postMessage({ v: STEPS[at][0] }, "*"); label(); };
      prev.addEventListener("click", () => go(-1)); next.addEventListener("click", () => go(1));
      const backdrop = document.createElement("div");
      backdrop.className = "proto-backdrop";
      const big = document.createElement("div");
      big.className = "proto is-open"; big.style.aspectRatio = getComputedStyle(box).aspectRatio;
      big.setAttribute("role", "dialog"); big.setAttribute("aria-modal", "true"); big.setAttribute("aria-label", frame.title);
      big.innerHTML = `<iframe class="scaled-frame" src="${url}" title="${frame.title}"></iframe>`;
      const inner = big.querySelector("iframe"), shut = document.createElement("button");
      shut.type = "button"; shut.className = "proto-expand proto-close"; shut.innerHTML = `${ICON_CLOSE}Close`;
      const fit = () => {
        big.style.width = `${Math.min(innerWidth - 160, innerHeight * .86 * ratio)}px`;   // room either side for the arrows
        const scale = big.clientWidth / 1456;
        inner.style.height = `${big.clientHeight / scale}px`; inner.style.transform = `scale(${scale})`;
        // Close sits just above the frame's top-right corner, clear of the app's own header
        const r = big.getBoundingClientRect(); shut.style.left = `${r.right - shut.offsetWidth}px`; shut.style.top = `${r.top - 40}px`;
        hint.style.left = `${r.left}px`; hint.style.top = `${r.top - 34}px`; hint.style.maxWidth = `${r.width - shut.offsetWidth - 24}px`;
        const mid = r.top + r.height / 2 - 22;
        prev.style.left = `${r.left - 56}px`; next.style.left = `${r.right + 12}px`; prev.style.top = next.style.top = `${mid}px`;
      };
      const onKey = (e) => { if (e.key === "Escape") close(); if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); };
      const close = () => { backdrop.remove(); big.remove(); shut.remove(); hint.remove(); prev.remove(); next.remove(); document.documentElement.style.overflow = ""; removeEventListener("keydown", onKey); removeEventListener("resize", fit); btn.focus(); };
      shut.addEventListener("click", close); backdrop.addEventListener("click", close);
      addEventListener("keydown", onKey); addEventListener("resize", fit);
      label(); document.body.append(backdrop, big, shut, hint, prev, next); fit(); shut.focus();
      document.documentElement.style.overflow = "hidden";   // the page behind stays put while the prototype scrolls
    });
  });
}
initProtoExpand();
initProtoTabs();
initSpotlight();
initStrip();
initCursorLabel();
initScrollSpy();
initCompare();
initRequestFlow();
initPivots();
initAffinity();
initTracker();
initSteps();
initQaBoard();
initChartTabs();
initTldr();
initAnnotations();
initDemoTabs();
initIcons();
initDemoMenu();
initCombobox();
initRangePicker();
initOverlays();
initToasts();
initNavMenu();
initBreadcrumbs();
initButtonMatrix();
initModeToggle();
initPaletteTabs();
initGsFlow();
initSession();
initExpand();
initVariablesPanel();
initCollapseOnLeave();
initFitToOpen();
