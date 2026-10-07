import { MATHEMATICS_LESSONS } from "./mathematics/math-course.js";
import { CHEMISTRY_LESSONS } from "./chemistry/chemistry-course.js";
import { BIOLOGY_LESSONS } from "./biology/biology-course.js";
import { ISLAMIC_LESSONS, createIslamicLesson } from "./islamic-education/islamic-bank.js";
import { getSubjectRoadmapLesson } from "../subject-roadmaps.js";

function lessonKey(subjectId, lessonId) {
  return `${subjectId}:${lessonId}`;
}

export const subjectLessonRegistry = new Map([
  [lessonKey("physics", "latex-test"), () => import("./physics/latex-test.js")],
  [lessonKey("physics", "momentum-impulse"), () => import("./physics/momentum-impulse.js")],
  [lessonKey("physics", "collisions"), () => import("./physics/collisions.js")],
  [lessonKey("physics", "electric-current-resistance"), () => import("./physics/electric-current-resistance.js")],
  [lessonKey("physics", "dc-circuits"), () => import("./physics/dc-circuits.js")],
  [lessonKey("physics", "magnetic-field"), () => import("./physics/magnetic-field.js")],
  [lessonKey("physics", "magnetic-force"), () => import("./physics/magnetic-force.js")],
  [lessonKey("physics", "electromagnetic-induction"), () => import("./physics/electromagnetic-induction.js")],
  [lessonKey("chemistry", "electronic-structure"), () => import("./chemistry/electronic-structure.js")],
  [lessonKey("chemistry", "periodic-bonding"), () => import("./chemistry/periodic-bonding.js")],
  [lessonKey("chemistry", "acids-bases"), () => import("./chemistry/acids-bases.js")],
  [lessonKey("chemistry", "thermodynamics-kinetics"), () => import("./chemistry/thermodynamics-kinetics.js")],
  [lessonKey("chemistry", "organic-compounds"), () => import("./chemistry/organic-compounds.js")],
  [lessonKey("chemistry", "galvanic-cells"), () => import("./chemistry/galvanic-cells.js")],
  [lessonKey("biology", "energy-flow"), () => import("./biology/energy-flow.js")],
  [lessonKey("biology", "gene-to-protein"), () => import("./biology/gene-to-protein.js")],
  [lessonKey("biology", "inheritance"), () => import("./biology/inheritance.js")],
  [lessonKey("biology", "human-systems"), () => import("./biology/human-systems.js")],
  [lessonKey("biology", "microbes"), () => import("./biology/microbes.js")],
  [lessonKey("biology", "past-papers-800"), () => import("./biology/past-papers-800.js")],
  [lessonKey("biology", "tasnif-written"), () => import("./biology/tasnif-written.js")],
  [lessonKey("biology", "gene-protein"), () => import("./biology/gene-protein.js")],
  [lessonKey("biology", "mendelian"), () => import("./biology/mendelian.js")],
  [lessonKey("biology", "non-mendelian"), () => import("./biology/non-mendelian.js")],
  [lessonKey("biology", "microorganisms"), () => import("./biology/microorganisms.js")],
  [lessonKey("islamic-education", "islamic-quran"), () => import("./islamic-education/quran.js")],
  [lessonKey("islamic-education", "islamic-aqidah"), () => import("./islamic-education/aqidah.js")],
  [lessonKey("islamic-education", "islamic-hadith"), () => import("./islamic-education/hadith.js")],
  [lessonKey("islamic-education", "islamic-sirah"), () => import("./islamic-education/sirah.js")],
  [lessonKey("islamic-education", "islamic-fiqh"), () => import("./islamic-education/fiqh.js")],
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

// The Gaza pack has one published lesson per book lesson. Keep the older
// five unit routes above for saved links, while registering the book-ordered
// lessons as the active catalog.
for (const lesson of ISLAMIC_LESSONS) {
  subjectLessonRegistry.set(lessonKey("islamic-education", lesson.id), () => ({
    default:createIslamicLesson(lesson.id),
  }));
}

// Retain the original registrations for saved records and older lesson links.
for (const lesson of MATHEMATICS_LESSONS.filter(lesson => lesson.subjectId === "mathematics-2")) {
  subjectLessonRegistry.set(lessonKey("mathematics-2", lesson.id), subjectLessonRegistry.get(lessonKey("mathematics", lesson.id)));
}

for (const lesson of BIOLOGY_LESSONS) {
  subjectLessonRegistry.set(lessonKey("biology", lesson.id), subjectLessonRegistry.get(lessonKey("biology", lesson.id)));
}

function roadmapLesson(subjectId, lessonId) {
  return getSubjectRoadmapLesson(subjectId, lessonId)
    || (subjectId === "mathematics" ? getSubjectRoadmapLesson("mathematics-2", lessonId) : null);
}

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
          return prepareIctExamLesson(lesson, roadmapLesson(subjectId, lessonId)?.parts);
        }
        if (registry === subjectLessonRegistry && (subjectId === "mathematics" || subjectId === "mathematics-2")) {
          const parts = roadmapLesson(subjectId, lessonId)?.parts;
          if (parts?.some(part => part.questionIds)) {
            const { defineMarkdownLesson } = await import("../../markdown/lesson-model.js");
            const questionIds = parts.flatMap(part => part.questionIds || []);
            const blocks = new Map([...lesson.authoringSource.matchAll(/^:::(?:mcq|exam-question)\s*\n[\s\S]*?^:::\s*$/gm)]
              .map(match => [match[0].match(/^id:[ \t]*(\S+)/m)?.[1], match[0]]));
            // The catalog owns book order and duplicate visibility; source IDs stay intact.
            const source = questionIds.map(id => {
              const block = blocks.get(id);
              if (!block) throw new Error(`Missing mathematics question: ${id}`);
              return block;
            }).join("\n\n");
            return defineMarkdownLesson(lesson, source);
          }
        }
        if (registry === subjectLessonRegistry && subjectId === "chemistry") {
          const { loadChemistryLesson: loadBankLesson } = await import("./chemistry/chemistry-bank.js");
          return loadBankLesson(lessonId);
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

// Keep the catalog import explicit so build-time checks see every chemistry lesson.
for (const lesson of CHEMISTRY_LESSONS) {
  if (!subjectLessonRegistry.has(lessonKey("chemistry", lesson.id))) {
    throw new Error(`Missing chemistry lesson registration: ${lesson.id}`);
  }
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
  const parts = roadmapLesson(subjectId, lessonId)?.parts || [];
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
