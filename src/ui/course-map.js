import { COURSE_SUBJECTS } from "../data/course.js";
import { escapeHtml } from "../lib/dom.js";

const STATUS_LABELS = Object.freeze({ "in-progress":"قيد التقدم", locked:"مقفلة" });

const LOCK_ICON = '<span class="subject-card__lock" aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span>';

export function renderCourseMapMarkup() {
  const subjects = COURSE_SUBJECTS.map((subject) => {
    const status = STATUS_LABELS[subject.status];
    const locked = subject.status === "locked";
    return `<button class="subject-card${locked ? " subject-card--locked" : ""}" type="button" data-subject="${escapeHtml(subject.id)}" data-status="${escapeHtml(subject.status)}" aria-label="${escapeHtml(subject.name)}، ${escapeHtml(status)}"${locked ? " aria-disabled=\"true\" disabled" : ""}>${locked ? LOCK_ICON : ""}<span class="subject-card__progress" data-subject-progress hidden><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="subject-progress-track" cx="60" cy="60" r="48" pathLength="100"/><circle class="subject-progress-value" cx="60" cy="60" r="48" pathLength="100"/><circle class="subject-progress-gloss" cx="60" cy="60" r="53" pathLength="100"/></svg><bdi>0%</bdi></span><span class="subject-card__content"><h2>${escapeHtml(subject.name)}</h2><span class="subject-card__action" data-subject-action>${escapeHtml(status)}</span></span></button>`;
  }).join("");
  return `<section class="subject-map" aria-label="المواد الدراسية">${subjects}</section>`;
}

export function renderCourseMap(container) {
  container.innerHTML = renderCourseMapMarkup();
}
