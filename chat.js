// Valentino, Anoushka's grey tabby, answers questions about Anoushka's work.
// Scripted for now: `answer()` matches keywords against TOPICS. To switch to a real model later,
// make `answer()` call a server endpoint and keep the same return shape ({ html, chips }).
(() => {
  const R = document.body.dataset.root || "";
  const link = (href, text) => {
    const ext = href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${href.startsWith("http") ? href : R + href}"${ext}>${text}</a>`;
  };
  const CAL = "https://calendly.com/noushka-umich/30min";
  const LINKEDIN = "https://www.linkedin.com/in/anoushkaghosh/";
  const RESUME = "https://drive.google.com/file/d/1x3pUb8lTMzYpkzIJ6nRIZ6F23U4mlWyp/view";

  const START = ["What does Anoushka do?", "Which project should I see first?", "Is she open to work?", "How do I get in touch?"];

  // Checked in order; the first topic with a matching keyword answers.
  const TOPICS = [
    {
      keys: ["deploy chat", "chatbot", "chat product"],
      html: "That one's still under wraps. It ships soon, so check back.",
      chips: ["Which project should I see first?"],
    },
    {
      keys: ["mensio", "data explorer", "analytics", "dashboard"],
      html: `Mensio is sponsorship and ad intelligence for brands, teams and networks. Customers didn't trust themselves to pull data, so they emailed analysts instead. She redesigned the Data Explorer so they can build it themselves. ${link("projects/mensio.html", "Read the case study")}.`,
      chips: ["What about the design system?", "Is she open to work?"],
    },
    {
      keys: ["design system", "hive", "rebrand", "landing", "component", "token"],
      html: `When Hive rebranded as Deploy in October 2026, Anoushka rebuilt the design system for the new brand. She then used it to design the new landing pages, working with frontend engineers through handoff. ${link("projects/deploy-design-system.html", "Read the case study")}.`,
      chips: ["What about Mensio?", "How do I get in touch?"],
    },
    {
      keys: ["project", "case stud", "see first", "start", "best work", "portfolio"],
      html: `Start with ${link("projects/mensio.html", "Mensio")}. It shows her research, product design and acting as PM on one project. Then see the ${link("projects/deploy-design-system.html", "Deploy Design System")} for systems and visual design.`,
      chips: ["What about Mensio?", "What about the design system?"],
    },
    {
      keys: ["open to", "hire", "hiring", "job", "role", "available", "opportunit", "looking"],
      html: `Yes, she's open to new opportunities. ${link(CAL, "Book a chat")} or reach out to her on ${link(LINKEDIN, "LinkedIn")}.`,
      chips: ["Where has she worked?", "Which project should I see first?"],
    },
    {
      keys: ["contact", "reach", "email", "touch", "talk", "call", "meet", "linkedin", "calendly"],
      html: `${link(CAL, "Book a 30-minute chat")} or message her on ${link(LINKEDIN, "LinkedIn")}.`,
      chips: ["Is she open to work?"],
    },
    {
      keys: ["experience", "worked", "work before", "where", "companies", "career", "work history", "previous", "background", "resume", "cv", "intern", "michigan", "entrupy", "inext"],
      html: `Anoushka is a UX/UI designer at Deploy, after interning there in 2025, when it was still Hive. Before that, she was a product designer at The Michigan Daily, an authentication specialist at Entrupy, a graphic designer at inext and designed social media for Pawsncare. ${link(RESUME, "See her resume")}.`,
      chips: ["What does Anoushka do?", "How do I get in touch?"],
    },
    {
      keys: ["skill", "tool", "figma", "good at", "strength", "speciali", "focus", "care about", "accessib"],
      html: "Anoushka designs in Figma and covers user research, product design, design systems and visual design, plus design QA with engineers. She cares most about accessibility and inclusive design, and likes untangling complex dashboards and workflows.",
      chips: ["Which project should I see first?"],
    },
    {
      keys: ["what does", "what do", "who is", "who's", "tell me about anoushka", "designer", "job title", "title"],
      html: "Anoushka is a UX/UI designer at Deploy in San Francisco, where she works on the design system, landing pages and product. She focuses on thoughtful, scalable products from 0–1 and beyond.",
      chips: ["Which project should I see first?", "Where has she worked?"],
    },
  ];

  const OFF_TOPIC = {
    html: "I only talk shop. Ask me about Anoushka's work, projects or how to get in touch.",
    chips: START,
  };

  async function answer(q) {
    const s = ` ${q.toLowerCase()} `;
    const hit = TOPICS.find((t) => t.keys.some((k) => (k.length < 4 ? new RegExp(`\\b${k}\\b`).test(s) : s.includes(k))));
    return hit || OFF_TOPIC;
  }

  // Valentino (grey tabby) and Ollie (orange and white) sit on a branch in the corner.
  // Colours come from Anoushka's photos in media/reference.
  const PINK = "#F2A7A0";
  const VAL = { x: 103, body: "#8E8983", dark: "#625D58", chest: "#C4BDB4", muzzle: "#DDD6CC", paw: "#B3ACA4", eye: "#E3A73E" };
  const OLLIE = { x: 151, body: "#E6A15C", dark: "#CF8743", chest: "#FBF6EE", muzzle: "#FBF6EE", paw: "#FBF6EE", eye: "#D6D27C" };

  // Big, low-set eyes with two sparkles each read as cute.
  const pupils = (c, derp) => derp
    // Ollie: smaller pupils pointing in slightly different directions. Zero brain cells.
    ? `<ellipse cx="-6.2" cy="52.4" rx="2.1" ry="2.9" fill="#22252A"/><ellipse cx="7.6" cy="51.2" rx="2.1" ry="2.9" fill="#22252A"/>
       <circle cx="-5.3" cy="51" r="1" fill="#fff"/><circle cx="8.5" cy="49.8" r="1" fill="#fff"/>`
    : `<ellipse cx="-7" cy="52" rx="3" ry="3.9" fill="#22252A"/><ellipse cx="7" cy="52" rx="3" ry="3.9" fill="#22252A"/>
       <circle cx="-5.7" cy="50.2" r="1.3" fill="#fff"/><circle cx="8.3" cy="50.2" r="1.3" fill="#fff"/>
       <circle cx="-8.2" cy="53.8" r=".6" fill="#fff"/><circle cx="5.8" cy="53.8" r=".6" fill="#fff"/>`;

  const face = (c, ollie) => `
        <path d="M-16.5 46c-2.2-7-1.4-14.6 1.6-18.6 1-1.3 2.6-1.4 3.8-.6 3 2 6 4.8 8.2 7.8zM16.5 46c2.2-7 1.4-14.6-1.6-18.6-1-1.3-2.6-1.4-3.8-.6-3 2-6 4.8-8.2 7.8z" fill="${c.body}"/>
        <path d="M-13.4 40.4c-.5-3.6 0-7 1.2-9 1.8 1.2 3.8 3 5.2 4.8zM13.4 40.4c.5-3.6 0-7-1.2-9-1.8 1.2-3.8 3-5.2 4.8z" fill="${PINK}"/>
        <ellipse cx="0" cy="50.5" rx="18.5" ry="15.2" fill="${c.body}"/>
        ${ollie
          ? `<path d="M-13 59c-1-7 4.4-11 9.6-11.6L-1.2 37h2.4l1.2 10.4C7.6 48 14 52 13 59c-3.8 6.4-22.2 6.4-26 0z" fill="${c.muzzle}"/>`
          : `<ellipse cx="0" cy="59" rx="8.8" ry="5.6" fill="${c.muzzle}"/>
             <path d="M-4.4 37.4l1.2 3.6M0 36.6v4M4.4 37.4l-1.2 3.6M-18 50.6l4 .8M-17.6 54.4l4-.2M18 50.6l-4 .8M17.6 54.4l-4-.2" stroke="${c.dark}" stroke-width="1.5" stroke-linecap="round"/>`}
        <g class="vc-eyes">
          <ellipse cx="-7" cy="51.6" rx="4.6" ry="5.2" fill="${c.eye}"/><ellipse cx="7" cy="51.6" rx="4.6" ry="5.2" fill="${c.eye}"/>
          <g class="vc-pupils">${pupils(c, ollie)}</g>
        </g>
        <ellipse cx="-12.6" cy="58.4" rx="3.4" ry="2" fill="${PINK}" opacity=".7"/><ellipse cx="12.6" cy="58.4" rx="3.4" ry="2" fill="${PINK}" opacity=".7"/>
        <path d="M-1.2 57.2c0-.5.5-.8 1.2-.8s1.2.3 1.2.8-.6 1.1-1.2 1.1-1.2-.6-1.2-1.1z" fill="${PINK}"/>
        ${ollie ? `<path d="M-1 59.6h2v1.4a1 1 0 0 1-2 0z" fill="#E98585"/>` : ""}
        <path d="M0 58.3v.5c-.5 1-1.7 1.2-2.4.5M0 58.8c.5 1 1.7 1.2 2.4.5" fill="none" stroke="#3F4349" stroke-width=".75" stroke-linecap="round"/>`;

  const sitCat = (c, ollie) => `
    <g class="vc-cat" data-cat="${ollie ? "ollie" : "valentino"}" transform="translate(${c.x} 0)">
      <g class="vc-bob">
        <g class="vc-tail">
          <path d="M12 99c7 6 8.5 18 3.5 28-2 4-6.5 4.2-6.5.6" fill="none" stroke="${c.body}" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M12 99c7 6 8.5 18 3.5 28-2 4-6.5 4.2-6.5.6" fill="none" stroke="${ollie ? "#F2BE85" : c.dark}" stroke-width="5.5" stroke-dasharray="3 5.5"/>
        </g>
        <path d="M-19 102c-3-15 4-31 19-33 15 2 22 18 19 33z" fill="${c.body}"/>
        <ellipse cx="0" cy="66" rx="12" ry="7" fill="${c.body}"/>
        ${ollie ? "" : `<path d="M-16.8 81c3.8.4 6 2.4 6.8 4.8M-18 89.6c3.8.4 6 2.4 6.8 4.8M16.8 81c-3.8.4-6 2.4-6.8 4.8M18 89.6c-3.8.4-6 2.4-6.8 4.8" fill="none" stroke="${c.dark}" stroke-width="1.8" stroke-linecap="round"/>`}
        <path d="M-8.6 102c-1.8-12-.6-30 8.6-36 9.2 6 10.4 24 8.6 36z" fill="${c.chest}"/>
        <ellipse cx="-5.6" cy="101.6" rx="4.6" ry="3" fill="${c.paw}"/><ellipse cx="5.6" cy="101.6" rx="4.4" ry="2.9" fill="${c.paw}"/>
        <g class="vc-head"><g transform="translate(0 66) scale(1.1) translate(0 -66)">${face(c, ollie)}</g></g>
        <path d="M-12 57.4l-10.5-1.6M-12 59.6l-9.6 2.6M12 57.4l10.5-1.6M12 59.6l9.6 2.6" stroke="${ollie ? "#B7A28C" : c.dark}" stroke-width=".6" stroke-linecap="round"/>
      </g>
    </g>`;

  const leaf = (x, y, r, s = 1, fill = "#8BAE6A") =>
    `<path class="vc-leaf" d="M0 0c4-5 12-5 15 0-3 5-11 5-15 0z" fill="${fill}" transform="translate(${x} ${y}) rotate(${r}) scale(${s})"/>`;

  const SCENE = `
    <svg class="vc-scene" viewBox="0 0 260 140" aria-hidden="true">
      <path d="M48 99c-7-11-16-18-27-20" fill="none" stroke="#7E604A" stroke-width="3" stroke-linecap="round"/>
      <path d="M260 97c-50 1-100 6-150 6-32 0-62-3-88-10-4-1-6 3-2 5 26 11 58 16 92 16 50 0 100-3 148-3z" fill="#8B6A4E"/>
      <path d="M236 106c-18 1-34 1-48 1M150 108c-14 0-26 0-36-1M80 104c-10-1-20-3-28-5" fill="none" stroke="#6F5440" stroke-width="1.2" stroke-linecap="round"/>
      ${leaf(14, 78, -150, 1.1)}${leaf(22, 80, 160, .9, "#76995A")}${leaf(30, 86, -120, .8)}
      ${leaf(228, 96, -70, 1, "#76995A")}${leaf(242, 97, -40, 1.1)}${leaf(250, 108, 30, .9, "#76995A")}
      ${sitCat(OLLIE, true)}
      ${sitCat(VAL, false)}
    </svg>`;

  // The chat header uses Valentino's face.
  const FACE = `<svg viewBox="-21 25 42 42" aria-hidden="true">${face(VAL, false)}</svg>`;

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="vc-tree">
      ${SCENE}
      <button type="button" class="vc-hit vc-hit-ollie" aria-label="Ollie, Anoushka's other cat"></button>
      <button type="button" class="vc-hit vc-launch" aria-label="Chat with Valentino, Anoushka's cat" aria-expanded="false" aria-controls="vc-panel"></button>
      <button type="button" class="vc-say vc-say-val" hidden>Hi, I'm Valentino! Ask me about Anoushka's work.</button>
      <p class="vc-say vc-say-ollie" aria-live="polite" hidden></p>
    </div>
    <section class="vc-panel" id="vc-panel" role="dialog" aria-label="Chat with Valentino" hidden>
      <header class="vc-head">
        <span class="vc-avatar">${FACE}</span>
        <div><p class="vc-name">Valentino</p><p class="vc-sub">Anoushka's cat · talks shop only</p></div>
        <button type="button" class="vc-close" aria-label="Close chat">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </header>
      <div class="vc-log" role="log" aria-live="polite"></div>
      <form class="vc-form">
        <input class="vc-input" type="text" placeholder="Ask Valentino about Anoushka's work…" aria-label="Your question" maxlength="200" autocomplete="off">
        <button type="submit" class="vc-send" aria-label="Send" disabled>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </form>
    </section>`
  );

  // On phones Valentino's face in the bottom bar opens the chat instead of the branch.
  const slot = document.querySelector(".dock-cat-slot");
  if (slot) slot.outerHTML = `<button type="button" class="dock-cat" aria-label="Chat with Valentino, Anoushka's cat" aria-expanded="false" aria-controls="vc-panel">${FACE}</button>`;
  const dockCat = document.querySelector(".dock-cat");
  const launch = document.querySelector(".vc-launch");
  const panel = document.querySelector(".vc-panel");
  const log = panel.querySelector(".vc-log");
  const form = panel.querySelector(".vc-form");
  const input = panel.querySelector(".vc-input");
  const send = panel.querySelector(".vc-send");
  let started = false;
  let busy = false;

  const scroll = () => (log.scrollTop = log.scrollHeight);

  function bubble(who, content) {
    const el = document.createElement("div");
    el.className = `vc-msg vc-${who}`;
    if (who === "bot") el.innerHTML = content;
    else el.textContent = content;
    log.append(el);
    scroll();
    return el;
  }

  function chips(list) {
    log.querySelectorAll(".vc-chips").forEach((c) => c.remove());
    if (!list?.length) return;
    const wrap = document.createElement("div");
    wrap.className = "vc-chips";
    list.forEach((q) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "vc-chip";
      b.textContent = q;
      b.addEventListener("click", () => ask(q));
      wrap.append(b);
    });
    log.append(wrap);
    scroll();
  }

  async function ask(q) {
    q = q.trim();
    if (!q || busy) return;
    busy = true;
    chips([]);
    bubble("user", q);
    input.value = "";
    send.disabled = true;
    const typing = bubble("bot", '<span class="vc-dots"><i></i><i></i><i></i></span>');
    const [reply] = await Promise.all([answer(q), new Promise((r) => setTimeout(r, 650))]);
    typing.innerHTML = reply.html;
    chips(reply.chips);
    busy = false;
  }

  function open() {
    hideHello();
    panel.hidden = false;
    launch.setAttribute("aria-expanded", "true");
    dockCat?.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      bubble("bot", "Hi, I'm Valentino, Anoushka's cat. Ask me about her work, experience or how to get in touch.");
      chips(START);
    }
    input.focus();
  }

  function close() {
    panel.hidden = true;
    launch.setAttribute("aria-expanded", "false");
    dockCat?.setAttribute("aria-expanded", "false");
    (dockCat?.offsetParent ? dockCat : launch).focus();
    hide(sayVal, val, 0);
  }

  // Valentino's pupils follow the pointer. Ollie's don't; he's looking at nothing.
  const scene = document.querySelector(".vc-scene");
  const val = scene.querySelector('[data-cat="valentino"]');
  const ollie = scene.querySelector('[data-cat="ollie"]');
  const valPupils = val.querySelector(".vc-pupils");
  addEventListener("pointermove", (e) => {
    const r = val.querySelector(".vc-head").getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.6);
    const d = Math.hypot(dx, dy) || 1;
    valPupils.style.transform = `translate(${(dx / d) * 1.3}px, ${(dy / d) * 0.9}px)`;
  }, { passive: true });

  // Hover a cat to hear from it.
  const sayVal = document.querySelector(".vc-say-val");
  const sayOllie = document.querySelector(".vc-say-ollie");
  const OLLIE_LINES = [
    "I'm here for the views.",
    "Is that a bird?",
    "I don't know anything. I'm just orange.",
    "Valentino does the talking. I do the sitting.",
    "I forgot why I climbed up here.",
    "Have you tried turning it off and on again?",
  ];
  let line = 0;
  const timers = new WeakMap();
  const show = (el, cat) => {
    // One cat talks at a time.
    document.querySelectorAll(".vc-say").forEach((o) => { if (o !== el) o.hidden = true; });
    scene.querySelectorAll(".vc-cat").forEach((o) => o.classList.toggle("is-hover", o === cat));
    clearTimeout(timers.get(el)); el.hidden = false;
  };
  const hide = (el, cat, wait = 250) => timers.set(el, setTimeout(() => { el.hidden = true; cat.classList.remove("is-hover"); }, wait));

  const ollieHit = document.querySelector(".vc-hit-ollie");
  const ollieSay = () => { sayOllie.textContent = OLLIE_LINES[line++ % OLLIE_LINES.length]; show(sayOllie, ollie); };
  ollieHit.addEventListener("pointerenter", ollieSay);
  ollieHit.addEventListener("focus", ollieSay);
  ollieHit.addEventListener("click", ollieSay);
  ollieHit.addEventListener("pointerleave", () => hide(sayOllie, ollie));
  ollieHit.addEventListener("blur", () => hide(sayOllie, ollie, 0));

  const valSay = () => { if (panel.hidden) show(sayVal, val); };
  [launch, sayVal].forEach((el) => {
    el.addEventListener("pointerenter", valSay);
    el.addEventListener("pointerleave", () => hide(sayVal, val));
  });
  launch.addEventListener("focus", valSay);
  launch.addEventListener("blur", () => hide(sayVal, val, 0));
  sayVal.addEventListener("click", open);

  // Valentino says hello once per visit, a few seconds after load.
  const hideHello = () => { hide(sayVal, val, 0); try { sessionStorage.setItem("vc-hello", "1"); } catch {} };
  let seen = false;
  try { seen = sessionStorage.getItem("vc-hello") === "1"; } catch {}
  if (!seen) setTimeout(() => { if (!panel.hidden) return; valSay(); hide(sayVal, val, 6000); try { sessionStorage.setItem("vc-hello", "1"); } catch {} }, 2500);

  launch.addEventListener("click", () => (panel.hidden ? open() : close()));
  dockCat?.addEventListener("click", () => (panel.hidden ? open() : close()));
  panel.querySelector(".vc-close").addEventListener("click", close);
  panel.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  input.addEventListener("input", () => (send.disabled = !input.value.trim()));
  form.addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); });
})();
