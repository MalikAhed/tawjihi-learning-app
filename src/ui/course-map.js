import { COURSE_SUBJECTS } from "../data/course.js";
import { getSubjectRoadmap } from "../data/subject-roadmaps.js";
import { escapeHtml } from "../lib/dom.js";
import { isProgressLabelCovered } from "./learner-format.js";

const LOCK_ICON = '<span class="subject-card__lock" aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span>';

function roadmapLessonTotal(subjectId) {
  return getSubjectRoadmap(subjectId)?.units.reduce((total, unit) => total + unit.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.parts.length, 0), 0) || 0;
}

function subjectCardMarkup(subject, view) {
  const locked = view.unpublished;
  const disabledMarkup = locked ? ' aria-disabled="true" disabled' : "";
  return `<button class="subject-card${locked ? " subject-card--locked" : ""}" type="button" data-subject="${escapeHtml(subject.id)}" data-status="${view.state}" aria-label="${escapeHtml(view.label)}"${disabledMarkup}><span class="subject-card__hero"><span class="subject-card__title"><h2>${escapeHtml(subject.name)}</h2></span></span><span class="subject-card__details"><span class="subject-card__progress-track" data-subject-progress data-label-covered="${isProgressLabelCovered(view.progress, 100)}"${locked ? " hidden" : ""}><span aria-hidden="true"></span><bdi class="subject-card__progress-count ui-number" data-subject-count>${view.completedLessons} / ${view.totalLessons}</bdi></span></span>${locked ? LOCK_ICON : ""}</button>`;
}

/** One presentation contract owns the initial card and later learner updates. */
export function getSubjectCardPresentation(subject, snapshot) {
  const learning = snapshot?.learning;
  const unpublished = subject.status === "unpublished";
  const progress = unpublished ? 0 : Math.max(0, Math.min(100, Number(learning?.progress) || 0));
  const started = Boolean(learning?.hasStarted || progress || learning?.requiredLessonsCompleted || learning?.questionsSolved);
  const completed = progress >= 100 || (learning?.publishedPartsTotal > 0 && learning.requiredLessonsCompleted >= learning.publishedPartsTotal);
  const state = unpublished ? "unpublished" : completed ? "completed" : started ? "in-progress" : "available";
  const action = { unpublished:"قيد الإعداد", completed:"راجع خريطة الدروس", "in-progress":"تابع من خريطة الدروس", available:"ابدأ من خريطة الدروس" }[state];
  return {
    state, action, progress, unpublished,
    completedLessons:unpublished ? 0 : Math.max(0, Number(learning?.requiredLessonsCompleted) || 0),
    totalLessons:unpublished ? 0 : Math.max(0, Number(learning?.curriculumLessonsTotal) || Number(learning?.publishedPartsTotal) || roadmapLessonTotal(subject.id)),
    solved:learning?.questionsSolved ?? 0,
    review:learning?.mustReviewCount ?? 0,
    label:`${subject.name}، ${action}${learning && !unpublished ? `، ${progress}% مكتمل` : ""}`,
  };
}

export function renderCourseMapMarkup() {
  const subjects = COURSE_SUBJECTS.map((subject) => subjectCardMarkup(subject, getSubjectCardPresentation(subject))).join("");
  return `<section class="subject-map" aria-label="المواد الدراسية">${subjects}</section>`;
}

export function updateSubjectCards(container, snapshot) {
  container.querySelectorAll(".subject-card").forEach((card) => {
    const subject = COURSE_SUBJECTS.find(({ id }) => id === card.dataset.subject);
    if (!subject) return;
    const view = getSubjectCardPresentation(subject, snapshot);
    const progress = card.querySelector("[data-subject-progress]");
    if (progress) {
      progress.style.setProperty("--subject-progress", view.progress);
      progress.dataset.labelCovered = String(isProgressLabelCovered(view.progress, 100));
    }
    const count = card.querySelector("[data-subject-count]");
    if (count) count.textContent = `${view.completedLessons} / ${view.totalLessons}`;
    const action = card.querySelector("[data-subject-action]");
    if (action) action.textContent = view.action;
    const solved = card.querySelector("[data-subject-solved]");
    const review = card.querySelector("[data-subject-review]");
    if (solved) solved.textContent = String(view.solved);
    if (review) review.textContent = String(view.review);
    card.dataset.status = view.state;
    card.setAttribute("aria-label", view.label);
  });
}

export function renderCourseMap(container) {
  container.innerHTML = renderCourseMapMarkup();
}
