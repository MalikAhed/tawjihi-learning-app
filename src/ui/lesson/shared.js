import { escapeHtml } from "../../lib/dom.js";

export function renderQuestionSourceTag(content) {
  const source = /^(?:ال)?(كتاب|كامل)[\s\S]*?ص\s*([0-9٠-٩]+)/.exec(content.title || "");
  if (!source) return "";
  return `<span class="lesson-question-source" dir="rtl">${escapeHtml(source[1])} ص <bdi>${escapeHtml(source[2])}</bdi></span>`;
}

export function lessonReferenceLabel(reference) {
  return Number.isInteger(reference)
    ? `Day ${reference}`
    : String(reference || "Lesson");
}

export function lessonLocale(lesson) {
  return /[\u0600-\u06ff]/.test(
    `${lesson?.title || ""} ${lesson?.summary || ""}`,
  )
    ? "ar"
    : "en";
}
