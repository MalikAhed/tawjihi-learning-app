import { defineMarkdownLesson } from "../../markdown/lesson-model.js";
import { getSubjectRoadmapLesson } from "../subject-roadmaps.js";
import { defineLesson } from "../../domain/lesson.js";

function lessonKey(subjectId, lessonId) {
  return `${subjectId}:${lessonId}`;
}

export const subjectLessonRegistry = new Map([
  [lessonKey("ict", "course-introduction"), () => import("./ict/course-introduction.js")],
  [lessonKey("ict", "database-management"), () => import("./ict/database-management.js")],
]);

export function createSubjectLessonLoader({ registry = subjectLessonRegistry } = {}) {
  const lessonCache = new Map();

  return async function loadRegisteredSubjectLesson(subjectId, lessonId) {
    const key = lessonKey(subjectId, lessonId);
    if (lessonCache.has(key)) return lessonCache.get(key);

    const load = registry.get(key);
    if (!load) return null;

    const pendingLesson = Promise.resolve()
      .then(() => load())
      .then(({ default:lesson }) => defineLesson(lesson));
    lessonCache.set(key, pendingLesson);

    try {
      const lesson = await pendingLesson;
      lessonCache.set(key, lesson);
      return lesson;
    } catch (error) {
      lessonCache.delete(key);
      throw error;
    }
  };
}

export const loadSubjectLesson = createSubjectLessonLoader();

// Boundaries refer to existing published step IDs; splitting never renames learner records.
export async function loadSubjectLessonPart(subjectId, lessonId, partId) {
  const parts = getSubjectRoadmapLesson(subjectId, lessonId)?.parts || [];
  const index = parts.findIndex((part) => part.id === partId);
  const part = parts[index];
  if (!part?.startStepId) return null;
  const lesson = await loadSubjectLesson(subjectId, lessonId);
  if (!lesson?.authoringSource) return null;
  const source = lesson.authoringSource;
  const start = source.indexOf(`<!-- step-id: ${part.startStepId} -->`);
  const next = parts[index + 1];
  const end = next ? source.indexOf(`<!-- step-id: ${next.startStepId} -->`) : source.length;
  if (start < 0 || end <= start) throw new Error("Invalid subject lesson part boundaries");
  return defineMarkdownLesson({
    ...lesson, title:part.label, summary:`${lesson.title} · ${part.label}`, reward:0,
  }, source.slice(start, end).replace(/<!-- lesson-step -->\s*$/, "").trim());
}
