import { getSubjectRoadmapLesson } from "../subject-roadmaps.js";

function lessonKey(subjectId, lessonId) {
  return `${subjectId}:${lessonId}`;
}

export const subjectLessonRegistry = new Map([
  [lessonKey("mathematics", "average-change"), () => import("./mathematics/average-change.js")],
  [lessonKey("mathematics", "differentiation-rules"), () => import("./mathematics/differentiation-rules.js")],
  [lessonKey("mathematics", "trigonometric-derivatives"), () => import("./mathematics/trigonometric-derivatives.js")],
  [lessonKey("mathematics", "lhopital-exponential-logarithmic"), () => import("./mathematics/lhopital-exponential-logarithmic.js")],
  [lessonKey("mathematics", "geometric-physical-applications"), () => import("./mathematics/geometric-physical-applications.js")],
  [lessonKey("mathematics", "chain-rule"), () => import("./mathematics/chain-rule.js")],
  [lessonKey("mathematics", "implicit-differentiation"), () => import("./mathematics/implicit-differentiation.js")],
  [lessonKey("mathematics", "increasing-decreasing"), () => import("./mathematics/increasing-decreasing.js")],
  [lessonKey("mathematics", "extreme-values"), () => import("./mathematics/extreme-values.js")],
  [lessonKey("mathematics", "concavity-inflection"), () => import("./mathematics/concavity-inflection.js")],
  [lessonKey("mathematics", "extrema-applications"), () => import("./mathematics/extrema-applications.js")],
  [lessonKey("mathematics", "matrices"), () => import("./mathematics/matrices.js")],
  [lessonKey("mathematics", "matrix-operations"), () => import("./mathematics/matrix-operations.js")],
  [lessonKey("mathematics", "determinants"), () => import("./mathematics/determinants.js")],
  [lessonKey("mathematics", "matrix-inverse"), () => import("./mathematics/matrix-inverse.js")],
  [lessonKey("mathematics", "linear-systems"), () => import("./mathematics/linear-systems.js")],
  [lessonKey("mathematics", "indefinite-integral"), () => import("./mathematics/indefinite-integral.js")],
  [lessonKey("mathematics", "indefinite-integral-rules"), () => import("./mathematics/indefinite-integral-rules.js")],
  [lessonKey("mathematics", "indefinite-integral-applications"), () => import("./mathematics/indefinite-integral-applications.js")],
  [lessonKey("mathematics", "integration-methods"), () => import("./mathematics/integration-methods.js")],
  [lessonKey("mathematics", "riemann-sums"), () => import("./mathematics/riemann-sums.js")],
  [lessonKey("mathematics", "definite-integral"), () => import("./mathematics/definite-integral.js")],
  [lessonKey("mathematics", "fundamental-theorem"), () => import("./mathematics/fundamental-theorem.js")],
  [lessonKey("mathematics", "definite-integral-properties"), () => import("./mathematics/definite-integral-properties.js")],
  [lessonKey("mathematics", "integral-area"), () => import("./mathematics/integral-area.js")],
  [lessonKey("ict", "course-introduction"), () => import("./ict/course-introduction.js")],
  [lessonKey("ict", "database-management"), () => import("./ict/database-management.js")],
  [lessonKey("ict", "sql-queries"), () => import("./ict/sql-queries.js")],
  [lessonKey("ict", "smartphone-operating-systems"), () => import("./ict/smartphone-operating-systems.js")],
  [lessonKey("ict", "my-mobile-app"), () => import("./ict/my-mobile-app.js")],
  [lessonKey("ict", "osi-model-layers"), () => import("./ict/osi-model-layers.js")],
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
      .then(async ({ default:lesson }) => {
        if (registry === subjectLessonRegistry && subjectId === "ict") {
          const { prepareIctExamLesson } = await import("./ict/exam-lessons.js");
          return prepareIctExamLesson(lesson, getSubjectRoadmapLesson(subjectId, lessonId)?.parts);
        }
        if (registry === subjectLessonRegistry && subjectId === "mathematics") {
          const parts = getSubjectRoadmapLesson(subjectId, lessonId)?.parts;
          if (parts?.some(part => part.questionIds)) {
            const { defineMarkdownLesson } = await import("../../markdown/lesson-model.js");
            const included = new Set(parts.flatMap(part => part.questionIds || []));
            const source = lesson.authoringSource.replace(/^:::(?:mcq|exam-question)\s*\n[\s\S]*?^:::\s*$/gm,
              block => included.has(block.match(/^id:[ \t]*(\S+)/m)?.[1]) ? block : "");
            return defineMarkdownLesson(lesson, source);
          }
        }
        const { defineLesson } = await import("../../domain/lesson.js");
        return defineLesson(lesson);
      });
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
function stepBoundary(source, id) {
  const explanation = source.indexOf(`<!-- step-id: ${id} -->`);
  if (explanation >= 0) return explanation;
  for (const match of source.matchAll(/^:::(?:mcq|exam-question)\s*\n([\s\S]*?)^:::\s*$/gm)) {
    if (new RegExp(`^id:[ \\t]*${id}[ \\t]*$`, "m").test(match[1])) return match.index;
  }
  return -1;
}

export async function loadSubjectLessonPart(subjectId, lessonId, partId) {
  const parts = getSubjectRoadmapLesson(subjectId, lessonId)?.parts || [];
  const index = parts.findIndex((part) => part.id === partId);
  const part = parts[index];
  if (!part?.startStepId) return null;
  const lesson = await loadSubjectLesson(subjectId, lessonId);
  if (!lesson?.authoringSource) return null;
  if (subjectId === "ict" && lessonId !== "course-introduction") {
    const { prepareIctExamLesson } = await import("./ict/exam-lessons.js");
    return prepareIctExamLesson({ ...lesson, title:part.label, reward:0 }, [part]);
  }
  const source = lesson.authoringSource;
  const start = stepBoundary(source, part.startStepId);
  const next = parts[index + 1];
  const end = next ? stepBoundary(source, next.startStepId) : source.length;
  if (start < 0 || end <= start) throw new Error("Invalid subject lesson part boundaries");
  const { defineMarkdownLesson } = await import("../../markdown/lesson-model.js");
  return defineMarkdownLesson({
    ...lesson, title:part.label, summary:`${lesson.title} · ${part.label}`, reward:0,
  }, source.slice(start, end).replace(/<!-- lesson-step -->\s*$/, "").trim());
}
