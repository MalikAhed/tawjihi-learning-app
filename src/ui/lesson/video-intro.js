import { escapeHtml } from "../../lib/dom.js";

export function renderVideoIntro(step, { titleId, locale = "en" } = {}) {
  const placeholderLabel = locale === "ar" ? "مكان فيديو الدرس" : "Lesson video placeholder";
  return `<article class="level-lesson-copy ready-lesson-copy lesson-video-intro">
    <h1 id="${escapeHtml(titleId)}">${escapeHtml(step.title)}</h1>
    <div class="lesson-video-placeholder" role="img" aria-label="${escapeHtml(placeholderLabel)}"></div>
  </article>`;
}
