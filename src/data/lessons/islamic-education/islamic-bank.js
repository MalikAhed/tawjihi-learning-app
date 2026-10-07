import { ISLAMIC_BOOK_LESSONS as BOOK_LESSONS, ISLAMIC_UNITS } from "./book-lessons.js";
import { ISLAMIC_2022_MCQS } from "./islamic-2022-bank.js";
import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

const SOURCE_BOOK = "https://moe.edu.ps/m/4064";
const SOURCE_QUESTIONS = "islamic-education-mcq-2022-no-webp-pages.zip";

function mcq(item) {
  const choices = item.choices
    .map((choice, index) => `- [${index === item.answer ? "x" : " "}] ${choice[0]} | ${choice[1]}`)
    .join("\n");
  return `:::mcq
id: ${item.id}
title: ${item.title}
kicker: ${item.kicker}
reference: ${item.reference}
question: ${item.question}
${choices}
explanation: ${item.explanation}
hint: ${item.hint}
:::`;
}

const BOOK_LESSON_BY_SOURCE = new Map(BOOK_LESSONS.map(lesson => [lesson.sourceLesson, lesson]));

// The supplied 2022 question ZIP contains additional lessons from a different
// edition. Its records were filtered before export to the lesson numbers in the
// canonical 2024 Gaza book, then checked again here so an out-of-scope record
// cannot silently appear in the active catalog.
const ACTIVE_QUESTIONS = Object.freeze(ISLAMIC_2022_MCQS.filter(question => BOOK_LESSON_BY_SOURCE.has(question.sourceLesson)));
const QUESTIONS_BY_LESSON = new Map(BOOK_LESSONS.map(lesson => [lesson.id, []]));
for (const question of ACTIVE_QUESTIONS) QUESTIONS_BY_LESSON.get(BOOK_LESSON_BY_SOURCE.get(question.sourceLesson).id).push(question);

export const ISLAMIC_LESSON_BANK = Object.freeze(Object.fromEntries(BOOK_LESSONS.map(lesson => {
  const questions = Object.freeze(QUESTIONS_BY_LESSON.get(lesson.id));
  return [lesson.id, Object.freeze({
    ...lesson,
    title:lesson.label,
    summary:questions.length
      ? `أسئلة اختيار من متعدد من مصدر الأسئلة والكتاب الرسمي المطابقة لموضوع الدرس، الصفحات ${lesson.pages}.`
      : `هذا الدرس موجود في الرزمة التعليمية الرسمية، الصفحات ${lesson.pages}، ولا يحتوي مصدر الأسئلة المرفق على أسئلة مطابقة له.`,
    questions,
  })];
})));

export const ISLAMIC_UNIT_BANK = Object.freeze(Object.fromEntries(Object.entries(ISLAMIC_UNITS).map(([unitKey, meta]) => [
  unitKey,
  Object.freeze({
    ...meta,
    questions:Object.freeze(BOOK_LESSONS.filter(lesson => lesson.unitKey === unitKey).flatMap(lesson => ISLAMIC_LESSON_BANK[lesson.id].questions)),
  }),
])));

// Keep the former five aggregate lesson identities resolvable for saved URLs
// and progress records while the visible catalog follows the book's lessons.
export const ISLAMIC_LEGACY_LESSONS = Object.freeze(Object.values(ISLAMIC_UNIT_BANK).map(unit => Object.freeze({
  id:`islamic-${unit.id}`,
  label:unit.title,
  pages:unit.id === "quran" ? "3–40" : unit.id === "aqidah" ? "42–50" : unit.id === "hadith" ? "51–58" : unit.id === "sirah" ? "60–67" : "68–86",
  hidden:true,
  optional:true,
  parts:[Object.freeze({
    id:`islamic-${unit.id}-practice`,
    label:unit.title,
    pages:unit.id,
    startStepId:unit.questions[0]?.id,
    questionIds:unit.questions.map(question => question.id),
  })],
})));

export const ISLAMIC_LESSONS = Object.freeze(BOOK_LESSONS.map(lesson => {
  const questions = ISLAMIC_LESSON_BANK[lesson.id].questions;
  return Object.freeze({
    ...lesson,
    questionIds:questions.map(question => question.id),
    parts:[Object.freeze({
      id:`${lesson.id}-practice`,
      label:lesson.label,
      pages:lesson.pages,
      startStepId:questions[0]?.id,
      questionIds:questions.map(question => question.id),
    })],
  });
}));

function emptyLessonSource(lesson) {
  return `<!-- step-id: ${lesson.id}-empty -->
# ${lesson.label}

لا توجد أسئلة مطابقة لهذا الدرس في ملف الأسئلة المرفق؛ أُبقي الدرس ظاهراً لأنّه جزء من الرزمة التعليمية الرسمية.`;
}

export function createIslamicLesson(lessonId) {
  const lesson = ISLAMIC_LESSON_BANK[lessonId] || ISLAMIC_UNIT_BANK[lessonId];
  if (!lesson) throw new Error(`Unknown Islamic lesson: ${lessonId}`);
  const source = lesson.questions.length
    ? lesson.questions.map(mcq).join("\n\n")
    : emptyLessonSource(lesson);
  return defineMarkdownLesson({
    status:"published",
    language:"ar",
    subjectId:"islamic-education",
    id:lesson.id.startsWith("islamic-") ? lesson.id : `islamic-${lesson.id}`,
    title:lesson.title,
    summary:lesson.summary,
    outcome:"إتقان أسئلة الدرس المطابقة للرزمة التعليمية الرسمية.",
    mode:"تدريب وزاري",
    mission:"حل السؤال ثم مراجعة تفسير الإجابة من المصدر.",
    duration:"مراجعة مركزة",
    level:"توجيهي",
    reward:10,
    passingScore:80,
  }, source);
}

export { SOURCE_BOOK, SOURCE_QUESTIONS };
