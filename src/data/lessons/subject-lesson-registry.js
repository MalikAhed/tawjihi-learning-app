import { defineLesson } from "../../domain/lesson.js";

function lessonKey(subjectId, lessonId) {
  return `${subjectId}:${lessonId}`;
}

export const subjectLessonRegistry = new Map([
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
