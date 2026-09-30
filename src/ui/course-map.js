import { COURSE_SUBJECTS } from "../data/course.js";
import { getSubjectRoadmap } from "../data/subject-roadmaps.js";
import { getIctPartQuestionIds } from "../data/lessons/ict/question-index.js";
import { escapeHtml } from "../lib/dom.js";
import { isProgressLabelCovered } from "./learner-format.js";

const LOCK_ICON = '<span class="subject-card__lock" aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span>';
const ICT_QUESTION_TOTAL = getSubjectRoadmap("ict")?.units.flatMap(unit => unit.lessons)
  .filter(lesson => !lesson.hidden && !lesson.optional)
  .reduce((total, lesson) => total + lesson.parts.reduce((count, part) => count + getIctPartQuestionIds(part.id).length, 0), 0) || 0;

function roadmapQuestionTotal(subjectId) {
  if (subjectId === "ict") return ICT_QUESTION_TOTAL;
  return getSubjectRoadmap(subjectId)?.units.flatMap(unit => unit.lessons)
    .filter(lesson => !lesson.hidden && !lesson.optional)
    .reduce((total, lesson) => total + lesson.parts.reduce((count, part) => count + (part.questionIds?.length || 0), 0), 0) || 0;
}

function roadmapLessonTotal(subjectId) {
  return getSubjectRoadmap(subjectId)?.units.reduce((total, unit) => total + unit.lessons.filter(lesson => !lesson.hidden && !lesson.optional).length, 0) || 0;
}

function subjectCardMarkup(subject, view) {
  const locked = view.unpublished;
  const disabledMarkup = locked ? ' aria-disabled="true" disabled' : "";
  return `<button class="subject-card${locked ? " subject-card--locked" : ""}" type="button" data-subject="${escapeHtml(subject.id)}" data-status="${view.state}" aria-label="${escapeHtml(view.label)}"${disabledMarkup}><span class="subject-card__hero"><span class="subject-card__title"><h2>${escapeHtml(subject.name)}</h2></span></span><span class="subject-card__details"><span class="subject-card__progress-track" data-subject-progress data-label-covered="${isProgressLabelCovered(view.progress, 100)}"><span aria-hidden="true"></span><bdi class="subject-card__progress-count ui-number" data-subject-count>${view.completedCount} / ${view.totalCount}</bdi></span></span>${locked ? LOCK_ICON : ""}</button>`;
}

/** One presentation contract owns the initial card and later learner updates. */
export function getSubjectCardPresentation(subject, snapshot) {
  const questionsOnly = subject.id === "ict" || getSubjectRoadmap(subject.id)?.questionsOnly;
  const learning = snapshot?.learning?.subjects?.[subject.id]
    || (subject.id === "ict" || !questionsOnly ? snapshot?.learning : undefined);
  const unpublished = subject.status === "unpublished";
  const questionTotal = questionsOnly ? Math.max(0,
    (subject.id === "mathematics" && roadmapQuestionTotal(subject.id)) ||
    Number(learning?.currentQuestionsTotal) || roadmapQuestionTotal(subject.id)) : 0;
  const questionSolved = Math.min(questionTotal, Math.max(0, Number(learning?.currentQuestionsSolved) || 0));
  const hasCurrentQuestions = questionsOnly && Number(learning?.currentQuestionsTotal) > 0;
  const progress = unpublished ? 0 : hasCurrentQuestions
    ? Math.round(questionSolved / questionTotal * 100)
    : Math.max(0, Math.min(100, Number(learning?.progress) || 0));
  const started = Boolean(learning?.hasStarted || progress || learning?.requiredLessonsCompleted || learning?.questionsSolved);
  const completed = hasCurrentQuestions ? questionSolved === questionTotal
    : progress >= 100 || (learning?.publishedPartsTotal > 0 && learning.requiredLessonsCompleted >= learning.publishedPartsTotal);
  const state = unpublished ? "unpublished" : completed ? "completed" : started ? "in-progress" : "available";
  const action = { unpublished:"قيد الإعداد", completed:"راجع خريطة الدروس", "in-progress":"تابع من خريطة الدروس", available:"ابدأ من خريطة الدروس" }[state];
  const completedLessons = unpublished ? 0 : Math.max(0, Number(learning?.requiredLessonsCompleted) || 0);
  const totalLessons = unpublished ? 0 : Math.max(0, Number(learning?.curriculumLessonsTotal) || Number(learning?.publishedPartsTotal) || roadmapLessonTotal(subject.id));
  return {
    state, action, progress, unpublished,
    completedLessons, totalLessons,
    completedCount:questionsOnly && !unpublished ? questionSolved : completedLessons,
    totalCount:questionsOnly && !unpublished ? questionTotal : totalLessons,
    label:`${subject.name}، ${action}${questionsOnly && !unpublished ? `، ${questionSolved} من ${questionTotal} سؤالًا` : ""}${learning && !unpublished ? `، ${progress}% مكتمل` : ""}`,
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
    if (count) count.textContent = `${view.completedCount} / ${view.totalCount}`;
    card.dataset.status = view.state;
    card.setAttribute("aria-label", view.label);
  });
}

export function renderCourseMap(container) {
  container.innerHTML = renderCourseMapMarkup();
}
