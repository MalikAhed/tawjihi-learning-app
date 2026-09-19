import { renderTemplateFooter, renderTemplateShell } from "../template-shell.js";
import { revealWhenReady } from "../media-ready.js";
import { animateView } from "../view-motion.js";

export function renderMistakeReviewIntro(container, { locale, onContinue }) {
  const controller = new AbortController();
  const { signal } = controller;
  const arabic = locale === "ar";
  container.innerHTML = `<article class="lesson-flow ready-lesson-flow"><section class="ready-lesson-stage" data-live-authored-step data-mistake-review-intro tabindex="-1">${renderTemplateShell({
    locale,
    titleId: "mistake-review-title",
    showScrollIndicator: false,
    content: `<div class="lesson-review-whoosh"><div class="lesson-review-bubble"><h1 id="mistake-review-title">${arabic ? "لنراجع أخطاءنا معًا!" : "Let’s review our mistakes!"}</h1><p>${arabic ? "جولة قصيرة لتثبيت ما تعلّمته." : "A quick round to strengthen what you’ve learned."}</p></div><img src="assets/mascot/rocky-standing-still-reduced.svg" alt="" width="320" height="304"></div>`,
    footer: renderTemplateFooter({ locale, backAttributes: { hidden: true }, primaryLabel: arabic ? "ابدأ المراجعة" : "Start review" }),
  })}</section></article>`;
  animateView(container);
  let animation;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  motion.addEventListener("change", () => { if (motion.matches) animation?.cancel(); }, { signal });
  const stopReadiness = revealWhenReady(container, { signal, onReady() {
    if (!motion.matches) {
      animation = container.querySelector(".lesson-review-whoosh").animate([
        { transform: "translateY(65vh)", opacity: 0, offset: 0, easing: "cubic-bezier(.08,.82,.2,1)" },
        { transform: "translateY(-12px)", opacity: 1, offset: .72, easing: "ease-in-out" },
        { transform: "translateY(3px)", opacity: 1, offset: .9, easing: "ease-out" },
        { transform: "translateY(0)", opacity: 1 },
      ], { duration: 540 });
    }
    container.querySelector("[data-live-authored-step]").focus({ preventScroll: true });
  } });
  container.querySelector("[data-template-primary]").addEventListener("click", onContinue, { signal, once: true });
  return () => { controller.abort(); stopReadiness(); animation?.cancel(); };
}
