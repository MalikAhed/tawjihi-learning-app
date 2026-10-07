import { escapeHtml } from "../../lib/dom.js";
import { lessonReferenceLabel } from "./shared.js";

export function renderLessonError(container, day) {
  const reference = lessonReferenceLabel(day);
  const arabic = /[\u0600-\u06ff]/.test(reference);
  container.innerHTML = `
    <section class="lesson-error" role="alert">
      <p>${arabic ? "تعذّر تحميل محتوى الدرس." : "The lesson content could not be loaded."}</p>
    </section>`;
  return {
    title: arabic ? "تعذّر تحميل محتوى الدرس" : "The lesson content could not be loaded",
    destroy: () => {},
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
