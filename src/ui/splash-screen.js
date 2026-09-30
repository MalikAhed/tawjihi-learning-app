import { animateView } from "./view-motion.js";

export function createSplashScreen() {
  const surface = document.querySelector("#app-splash");
  const bar = surface.querySelector('[role="progressbar"]');
  const percentage = surface.querySelector(".app-splash__percentage");
  const recovery = surface.querySelector(".app-splash__recovery");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const locked = new Map();
  const lock = () => {
    for (const child of document.body.children) {
      if (child === surface || ["SCRIPT", "TEMPLATE"].includes(child.tagName) || locked.has(child)) continue;
      locked.set(child, child.inert);
      child.inert = true;
    }
  };
  const observer = new MutationObserver(lock);
  observer.observe(document.body, { childList:true });
  lock();
  let leaving;
  const stopMotion = () => {
    if (motion.matches) leaving?.cancel();
  };
  motion.addEventListener("change", stopMotion);
  return {
    revealBrand() { surface.dataset.brandReady = "true"; },
    progress(value) {
      const next = Math.round(value);
      bar.setAttribute("aria-valuenow", String(next));
      bar.style.setProperty("--splash-progress", `${next}%`);
      percentage.textContent = `${next}%`;
    },
    error(retry) {
      recovery.hidden = false;
      recovery.querySelector("button").onclick = () => {
        recovery.hidden = true;
        retry();
      };
      recovery.querySelector("button").focus();
    },
    async finish() {
      this.progress(100);
      surface.querySelector('[role="status"]').textContent = "كل شيء جاهز";
      // On a warm connection, finish the actual brand entrance before its exit.
      // Reduced-motion changes cancel these CSS animations and settle the wait.
      await Promise.all(surface.getAnimations({ subtree:true })
        .filter((animation) => animation.animationName === "splash-arrive")
        .map((animation) => animation.finished.catch(() => {})));
      delete document.body.dataset.startup;
      const destinationFor = () => document.querySelector("#visitor-flow-root:not([hidden])") || document.querySelector(".lesson-view.is-visible, .coming-soon.is-visible") || document.querySelector(".course-units");
      animateView(destinationFor());
      if (!motion.matches) {
        // The brief completion beat lets the fill catch up, then the mark
        // recedes as one composition. No minimum splash dwell time.
        leaving = surface.animate([
          { opacity:1, transform:"scale(1)", offset:0 },
          { opacity:1, transform:"scale(1)", offset:.35 },
          { opacity:0, transform:"scale(1.025)", offset:1 },
        ], { duration:520, easing:"cubic-bezier(.4,0,.2,1)", fill:"forwards" });
        await leaving.finished.catch(() => {});
      }
      observer.disconnect();
      motion.removeEventListener("change", stopMotion);
      for (const [element, inert] of locked) element.inert = inert;
      surface.remove();
      // Let the browser apply the inert/style changes before handing off focus,
      // including the immediate (reduced-motion) completion path.
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const destination = destinationFor();
      const heading = destination?.querySelector("h1:not([hidden]), [tabindex='-1']");
      if (heading && !heading.closest("[hidden]")) {
        if (!heading.hasAttribute("tabindex")) heading.tabIndex = -1;
        heading.focus({ preventScroll:true });
      }
    },
  };
}
