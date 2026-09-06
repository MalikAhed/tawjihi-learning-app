import { COURSE_SUBJECTS } from "../data/course.js";
import { escapeHtml } from "../lib/dom.js";

const STATUS_LABELS = Object.freeze({ "in-progress":"قيد التقدم", locked:"مقفلة" });



const LOCK_ICON = '<span class="subject-card__lock" aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span>';

export function renderCourseMapMarkup() {
  const subjects = COURSE_SUBJECTS.map((subject) => {
    const status = STATUS_LABELS[subject.status];
    const locked = subject.status === "locked";
    if (subject.id === "ict") {
      return `<button class="subject-card subject-card--ict" type="button" data-subject="ict" data-status="${escapeHtml(subject.status)}" aria-label="${escapeHtml(subject.name)}، متابعة الدروس"><span class="subject-card__decoration" aria-hidden="true"><img src="assets/subjects/ict.svg" alt="" /></span><span class="subject-card__content"><span class="subject-card__identity"><span class="subject-card__eyebrow">المادة المتاحة الآن</span><h2>${escapeHtml(subject.name)}</h2><span class="subject-card__action subject-card__action--ict" data-subject-action>متابعة الدروس <span aria-hidden="true">←</span></span></span><span class="subject-card__study-panel"><span class="subject-card__progress subject-card__progress--line" data-subject-progress><span class="subject-card__progress-heading"><span>تقدّمك في المادة</span></span><span class="subject-card__progress-track"><span></span><bdi>0%</bdi></span></span><span class="subject-card__analytics"><span><img class="subject-card__analytics-icon" src="assets/icons/dashboard-solved-check.svg" alt="" aria-hidden="true" /><span class="subject-card__metric-copy"><strong data-subject-solved>0</strong><span>أسئلة محلولة</span></span></span><span><img class="subject-card__analytics-icon" src="assets/icons/dashboard-review-alert.svg" alt="" aria-hidden="true" /><span class="subject-card__metric-copy"><strong data-subject-review>0</strong><span>تحتاج مراجعة</span></span></span></span></span></span></button>`;
    }

    return `<button class="subject-card${locked ? " subject-card--locked" : ""}" type="button" data-subject="${escapeHtml(subject.id)}" data-status="${escapeHtml(subject.status)}" aria-label="${escapeHtml(subject.name)}، ${escapeHtml(status)}"${locked ? " aria-disabled=\"true\" disabled" : ""}><span class="subject-card__decoration" aria-hidden="true"><img src="assets/subjects/${escapeHtml(subject.id)}.svg" alt="" /></span>${locked ? LOCK_ICON : ""}<span class="subject-card__progress" data-subject-progress hidden><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="subject-progress-track" cx="60" cy="60" r="48" pathLength="100"/><circle class="subject-progress-value" cx="60" cy="60" r="48" pathLength="100"/><circle class="subject-progress-gloss" cx="60" cy="60" r="53" pathLength="100"/></svg><bdi>0%</bdi></span><span class="subject-card__content"><h2>${escapeHtml(subject.name)}</h2><span class="subject-card__action" data-subject-action>${escapeHtml(status)}</span></span></button>`;
  }).join("");
  return `<section class="subject-map" aria-label="المواد الدراسية">${subjects}</section>`;
}

export function renderCourseMap(container) {
  container.innerHTML = renderCourseMapMarkup();
}
