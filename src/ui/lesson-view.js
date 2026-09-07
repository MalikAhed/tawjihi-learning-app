// @ts-check
import { lessonReferenceLabel } from "./lesson/shared.js";
import { renderComingSoon } from "./lesson/status.js";
import { renderInteractiveLesson } from "./lesson/classic.js";
import { renderMarkdownAuthoredLesson } from "./lesson/source-editor.js";
import { compileLessonMarkdown } from "../markdown/lesson-model.js";
import { renderAuthoredInteractiveLesson } from "./lesson/authored.js";
export { renderLessonLoading, renderLessonError } from "./lesson/status.js";

/** @typedef {{completedStepIds:string[], isComplete:boolean}} LessonProgressUpdate */
/** @typedef {{completedStepIds:string[], completedAt?:string|null}} LessonProgress */
/** @typedef {ReturnType<typeof import('../domain/subject-progress.js').summarizeParts> & {xpGain:number, progressGain:number, streakGain:number, preview:boolean}} CompletionOutcome */
/** @typedef {{mode?:'learner'|'developer'|'preview', isLessonPart?:boolean, allowTestPass?:boolean, progress?:LessonProgress,
 * onProgress?:(value:LessonProgressUpdate)=>void|Promise<void|import("../services/subject-progress-store.js").SaveResult>, onAnswer?:(value:{stepId:string,correct:boolean})=>void|Promise<void|import("../services/subject-progress-store.js").SaveResult>,
 * reviewStepId?:string|null, onReviewComplete?:()=>void, getCompletionOutcome?:(preview?:boolean)=>CompletionOutcome, onExitLesson?:()=>void}} LessonOptions */
/** @param {HTMLElement} container @param {string|number} day @param {{title:string,authoringSource?:string}|null} lesson @param {LessonOptions} [options]
 * @returns {{title:string, destroy:import('../app/view-lifecycle.js').Cleanup}} */
export function renderLesson(container, day, lesson, options = {}) {
  const mode = options.mode || "learner";
  if (!["learner", "developer", "preview"].includes(mode)) {
    throw new TypeError(`Unsupported lesson renderer mode: ${mode}`);
  }
  const runtimeOptions = mode === "learner" ? { ...options, mode } : {
    ...options, mode, onProgress:undefined, onAnswer:undefined, onReviewComplete:undefined,
  };
  const reference = lessonReferenceLabel(day);
  if (!lesson) {
    renderComingSoon(container, day);
    return {
      title: `${reference}: Coming Soon · Full-Stack Quest`,
      destroy: () => {},
    };
  }
  const destroy = lesson.authoringSource
    ? mode === "developer"
      ? renderMarkdownAuthoredLesson(container, day, lesson, runtimeOptions)
      : renderAuthoredInteractiveLesson(container, day, lesson,
          compileLessonMarkdown(lesson.authoringSource).parsed.steps, runtimeOptions)
    : renderInteractiveLesson(container, day, lesson, runtimeOptions);
  return { title: `${reference}: ${lesson.title} · Full-Stack Quest`, destroy };
}
