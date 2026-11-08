// Somnia: the launch video.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- The video plays once, with sound, on the first scroll. No loop; Replay starts it again ---------- */
  const video = document.querySelector(".cz-video video");
  const sound = document.querySelector(".cz-sound");
  const play = document.querySelector(".cz-play");
  const replay = document.querySelector(".cz-replay");
  const sync = () => {
    replay.hidden = !video.ended;
    play.textContent = video.ended ? "Replay" : video.paused ? "Play" : "Pause";
    play.setAttribute("aria-label", video.ended ? "Replay video" : video.paused ? "Play video" : "Pause video");
    sound.textContent = video.muted ? "Sound on" : "Sound off";
    sound.setAttribute("aria-pressed", String(!video.muted));
  };
  // Browsers can block sound until the visitor has clicked on the site; then it starts muted and Sound on is there
  const start = () => { video.muted = false; video.play().catch(() => { video.muted = true; video.play().catch(() => {}); }); };
  const toggle = () => { if (video.ended) video.currentTime = 0; video.paused ? video.play() : video.pause(); };
  play.addEventListener("click", toggle);
  replay.addEventListener("click", toggle);
  video.addEventListener("click", toggle);
  ["play", "pause", "ended", "seeked", "volumechange"].forEach((e) => video.addEventListener(e, sync));
  sound.addEventListener("click", () => { video.muted = !video.muted; if (!video.muted && video.paused && !video.ended) video.play(); });
  // Seek bar: drag to any point, or use the left and right arrows to jump 5 seconds
  const seek = document.querySelector(".cz-seek input"), time = document.querySelector(".cz-time");
  const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const tick = () => {
    const d = video.duration || 0, p = d ? (video.currentTime / d) * 100 : 0;
    seek.value = p; seek.style.setProperty("--p", `${p}%`);
    time.textContent = `${clock(video.currentTime)} / ${clock(d)}`;
  };
  const jump = (s) => { video.currentTime = Math.max(0, Math.min(video.duration || 0, s)); tick(); };
  seek.addEventListener("input", () => jump((seek.value / 100) * (video.duration || 0)));
  seek.addEventListener("keydown", (e) => { const d = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key]; if (d) { e.preventDefault(); jump(video.currentTime + d); } });
  const follow = () => { tick(); if (!video.paused) requestAnimationFrame(follow); };
  video.addEventListener("play", follow);
  ["loadedmetadata", "seeked", "timeupdate"].forEach((e) => video.addEventListener(e, tick));
  // It starts on the visitor's first scroll (if any of it is on screen), or as soon as most of it is in view
  if (!reduced) {
    let started = false;
    const go = () => { if (started) return; started = true; start(); seen.disconnect(); removeEventListener("scroll", onScroll); };
    const onScroll = () => { const r = video.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) go(); };
    const seen = new IntersectionObserver(([e]) => e.isIntersecting && go(), { threshold: .6 });
    addEventListener("scroll", onScroll, { passive: true });
    seen.observe(video);
  }
  sync(); tick();
})();
