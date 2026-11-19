// Page motion for the Coverflow case study, with string-tune (Fiddle.Digital, MIT): the title's words rise in,
// the prototype settles into place as it scrolls up, and the bullets ease in. Scrolling stays native. Nothing moves for people who ask for reduced motion.
(() => {
  if (!window.StringTune || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const { StringTune: ST, StringSplit, StringProgress } = window.StringTune;
  const st = ST.getInstance();
  st.scrollDesktopMode = "default"; st.scrollMobileMode = "default";
  st.use(StringSplit); st.use(StringProgress);
  document.documentElement.classList.add("st-on");
  st.start(60);
  // Progress only updates on scroll, so nudge it once the page has laid out, in case the browser restored a scroll position
  const nudge = () => dispatchEvent(new Event("scroll"));
  requestAnimationFrame(nudge); addEventListener("load", () => setTimeout(nudge, 50));
})();
