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
  projects: [
    { title: "Mensio", sub: "Shipped 2026", href: "projects/mensio.html", cursor: "View project", ratio: 16 / 9, colors: ["#2b3a67", "#7aaee9"] },
    { title: "Deploy Design System", sub: "Shipped 2026", href: "projects/deploy-design-system.html", cursor: "View project", ratio: 16 / 9, media: "media/deploy/hero.html", colors: ["#050a1f", "#2f6bff"] },
    { title: "Project One", sub: "Concept 2025", href: "projects/project-one.html", cursor: "View project", ratio: 16 / 9, colors: ["#e98d34", "#d0a8d8"] },
    { title: "Deploy Chat", sub: "Shipping 2026", cursor: "Coming soon", ratio: 16 / 9, colors: ["#0b1430", "#4a7dff"] },
  ],
};

// Pages in subfolders (e.g. projects/) set <body data-root="../"> so shared links resolve.
const ROOT = document.body.dataset.root || "";
const currentPage = location.pathname.split("/").pop() || "index.html";
const isProject = document.body.dataset.page === "project";

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

function renderChrome() {
  document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = SITE.name));

  const top = isProject
    ? `<div class="breadcrumb fade-in"><a href="${ROOT}index.html">← Work</a><span class="sep">/</span><span>${document.body.dataset.title}</span></div>`
    : `<a class="logo fade-in" href="${ROOT}index.html">${SITE.name}</a>`;

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="sidebar"><div class="page-margin" style="height:100%"><div class="grid-12">
      <aside>
        ${top}
        <nav class="fade-in${isProject ? " toc" : " side-pill"}" aria-label="${isProject ? "Sections" : "Site"}">${isProject ? tocLinks() : pillLinks()}</nav>
      </aside>
    </div></div></div>`
  );

  document.querySelector(".content").insertAdjacentHTML(
    "afterbegin",
    `<nav class="mobile-nav fade-in">${navLinks()}</nav>`
  );

  // Phones get a bottom bar instead of the top nav; chat.js puts Valentino in the last slot.
  const social = (label) => SITE.socials.find((x) => x.label === label);
  const dockLink = (href, label, svg, ext) =>
    `<a class="dock-link" href="${href}" aria-label="${label}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${svg}</a>`;
  const chat = social("Let's Chat"), linkedin = social("LinkedIn");
  document.body.insertAdjacentHTML(
    "beforeend",
    `<nav class="dock" aria-label="Site">
      ${SITE.nav.map(({ label, href }) => {
        const active = href === currentPage || (isProject && href === "index.html") ? ' aria-current="page"' : "";
        return dockLink(`${ROOT}${href}`, label, navIcon(label)).replace("<a ", `<a${active} `);
      }).join("")}
      <span class="dock-sep"></span>
      ${chat ? dockLink(chat.href, "Book a chat", navIcon("Mail"), true) : ""}
      ${linkedin ? dockLink(linkedin.href, "LinkedIn", '<span class="dock-in" aria-hidden="true">in</span>', true) : ""}
      <span class="dock-sep"></span>
      <span class="dock-cat-slot"></span>
    </nav>`
  );

  document.querySelector(".shell .page-margin").insertAdjacentHTML(
    "beforeend",
    `<footer>
      <div class="status"><div class="dot"></div><p class="clock" aria-live="polite"></p></div>
      <div class="links">${SITE.socials
        .map(({ label, href }) => {
          const ext = href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
          return `<a href="${href}"${ext}>${label}</a>`;
        })
        .join("")}</div>
    </footer>`
  );

  // Light/dark toggle. The choice is saved; until then the system setting decides.
  const SUN = '<svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>';
  const MOON = '<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  document.body.insertAdjacentHTML("beforeend", `<button type="button" class="theme-toggle">${SUN}${MOON}</button>`);
  const toggle = document.querySelector(".theme-toggle");
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
  const tick = () => (clock.textContent = fmt.format(new Date()));
  tick();
  setInterval(tick, 1000);
}

function projectCard(p) {
  const media = p.media
    ? p.media.endsWith(".mp4")
      ? `<video src="${p.media}" autoplay muted loop playsinline></video>`
      : p.media.endsWith(".html")
        ? `<iframe src="${p.media}" title="" tabindex="-1" aria-hidden="true" loading="lazy"></iframe>`
        : `<img src="${p.media}" alt="" loading="lazy">`
    : `<div class="placeholder" style="background:linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})">${p.title}</div>`;

  const inner = `
    <div class="thumb" style="aspect-ratio:${p.ratio}" role="img" aria-label="Project thumbnail for ${p.title}">
      ${media}<div class="overlay"></div>
    </div>
    <div class="caption"><p class="title">${p.title}</p><p class="sep">/</p><p class="sub">${p.sub}</p></div>`;

  if (!p.href) return `<div class="project" data-cursor="coming-soon" data-label="${p.cursor}">${inner}</div>`;
  const ext = p.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="project" href="${p.href}"${ext} data-label="${p.cursor}">${inner}</a>`;
}

function renderProjects() {
  const root = document.querySelector(".projects");
  if (!root) return;
  // Two independent columns give the staggered masonry look.
  const cols = [[], []];
  SITE.projects.forEach((p, i) => cols[i % 2].push(projectCard(p)));
  root.innerHTML = cols.map((c) => `<div class="column">${c.join("")}</div>`).join("");
}

// Looping .html media is drawn at 1456px wide, then scaled down to fit, like a screenshot.
// That way thin lines shrink with everything else instead of staying 1px at small sizes.
function initScaledFrames() {
  const BASE = 1456;
  document.querySelectorAll(".thumb iframe, .project-hero iframe").forEach((frame) => {
    frame.classList.add("scaled-frame");
    const box = frame.parentElement;
    new ResizeObserver(() => {
      const scale = box.clientWidth / BASE;
      frame.style.height = `${box.clientHeight / scale}px`;
      frame.style.transform = `scale(${scale})`;
    }).observe(box);
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

// Highlights the TOC entry for the last section whose top has passed 40% of the viewport.
function initScrollSpy() {
  const links = [...document.querySelectorAll("a[data-toc]")];
  if (!links.length) return;
  const targets = links.map((l) => document.getElementById(l.dataset.toc));

  const update = () => {
    const line = window.innerHeight * 0.4;
    let current = targets[0];
    for (const t of targets) if (t.getBoundingClientRect().top <= line) current = t;
    // The last sections may never reach the line, so activate the last one at the page bottom.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = targets[targets.length - 1];
    links.forEach((l) => l.toggleAttribute("data-active", l.dataset.toc === current.id));
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

// Foundations boards: an expand button opens the board in a large dialog so its small text is readable.
// The board itself moves into the dialog (and back on close), so it keeps any state such as dark mode.
function initExpandBoards() {
  const start = document.getElementById("foundations");
  const end = document.getElementById("components");
  if (!start || !end) return;
  const cards = [...document.querySelectorAll(".panel-card")].filter(
    (c) => start.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING && end.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_PRECEDING
  );
  if (!cards.length) return;
  const EXPAND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>';
  const dialog = document.createElement("dialog");
  dialog.className = "expand-dialog";
  dialog.innerHTML = `<button type="button" class="expand-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.x}</svg></button><div class="expand-slot"></div>`;
  document.body.append(dialog);
  const slot = dialog.querySelector(".expand-slot");
  let placeholder = null;
  let opener = null;
  // Put the open board back where it came from. Safe to call twice.
  const restore = () => {
    const card = slot.querySelector(".panel-card");
    if (card && placeholder) placeholder.replaceWith(card);
    placeholder = null;
  };

  cards.forEach((card) => {
    const label = card.closest(".foundation-row")?.querySelector(".numbered li p")?.textContent.trim() || "board";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "expand-btn";
    btn.setAttribute("aria-label", `Expand ${label}`);
    btn.innerHTML = EXPAND;
    card.append(btn);
    btn.addEventListener("click", () => {
      if (dialog.open) dialog.close();
      restore();
      opener = btn;
      placeholder = document.createElement("div");
      placeholder.style.height = `${card.offsetHeight}px`;
      // Fit the whole board on screen: as wide as possible without being taller than the window.
      const ratio = card.offsetWidth / card.offsetHeight;
      dialog.style.width = `${Math.min(1280, innerWidth - 48, (innerHeight - 64) * ratio)}px`;
      card.replaceWith(placeholder);
      slot.append(card);
      dialog.setAttribute("aria-label", label);
      dialog.showModal();
    });
  });

  dialog.addEventListener("close", () => {
    // The close event is async; skip it if another board has opened since.
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
initScaledFrames();
initCursorLabel();
initScrollSpy();
initCompare();
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
initExpandBoards();
initVariablesPanel();
initCollapseOnLeave();
initFitToOpen();
