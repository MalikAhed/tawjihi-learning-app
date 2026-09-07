import { animateView } from "../view-motion.js";
import { escapeHtml } from "../../lib/dom.js";
import { lessonReferenceLabel } from "./shared.js";

export function renderLessonLoading(container, day) {
  animateView(container);
  const reference = lessonReferenceLabel(day);
  const arabic = /[\u0600-\u06ff]/.test(reference);
  container.innerHTML = `
    <section class="lesson-hero lesson-hero--coming-soon lesson-loading" role="status" aria-live="polite">
      <p class="lesson-label">${escapeHtml(reference)}</p>
      <h1 class="lesson-heading">${arabic ? "جارٍ تحميل الدرس…" : "Loading today’s quest…"}</h1>
      <p class="lesson-intro">${arabic ? "جارٍ تجهيز مسار الدرس." : "Preparing the lesson path."}</p>
    </section>`;
  return arabic
    ? `${reference}: جارٍ التحميل`
    : `${reference}: Loading · Full-Stack Quest`;
}

export function renderLessonError(container, day, onRetry) {
  const controller = new AbortController();
  animateView(container);
  const reference = lessonReferenceLabel(day);
  const arabic = /[\u0600-\u06ff]/.test(reference);
  container.innerHTML = `
    <section class="lesson-hero lesson-hero--coming-soon lesson-error" role="alert">
      <p class="lesson-label">${escapeHtml(reference)} · ${arabic ? "الدرس غير متاح" : "QUEST UNAVAILABLE"}</p>
      <h1 class="lesson-heading">${arabic ? "تعذّر تحميل هذا الدرس" : "This lesson could not be loaded"}</h1>
      <p class="lesson-intro">${arabic ? "تقدّمك محفوظ. تحقّق من الاتصال وحاول مرة أخرى." : "Your progress is safe. Check your connection and try again."}</p>
      <button class="lesson-retry" type="button" data-retry-lesson>${arabic ? "حاول مرة أخرى" : "TRY AGAIN"}</button>
    </section>`;
  container
    .querySelector("[data-retry-lesson]")
    .addEventListener("click", onRetry, { signal: controller.signal });
  return {
    title: arabic
      ? `${reference}: الدرس غير متاح`
      : `${reference}: Lesson Unavailable · Full-Stack Quest`,
    destroy: () => controller.abort(),
  };
}

export function renderComingSoon(container, day) {
  const reference = lessonReferenceLabel(day);
  container.innerHTML = `
    <section class="lesson-hero lesson-hero--coming-soon">
      <p class="lesson-label">${escapeHtml(reference)} · IN PROGRESS</p>
      <h1 class="lesson-heading">Something exciting is coming soon</h1>
      <p class="lesson-intro">This lesson is being prepared. Check back soon.</p>
    </section>`;
}
