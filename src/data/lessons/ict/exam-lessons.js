import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";
import { ICT_EXAM_QUESTIONS } from "./exam-bank.js";
import { ICT_BOOK_PRACTICE } from "./book-practice.js";
import { ICT_PAST_PAPER_QUESTIONS } from "./past-paper-bank.js";
import { ICT_CLASSIFIED_UNIT1_QUESTIONS } from "./classified-unit1-bank.js";
import { ICT_CLASSIFIED_UNIT2_QUESTIONS } from "./classified-unit2-bank.js";
import { ICT_CLASSIFIED_OSI_QUESTIONS } from "./classified-osi-bank.js";

const QUESTIONS = [
  ...ICT_EXAM_QUESTIONS, ...ICT_BOOK_PRACTICE, ...ICT_PAST_PAPER_QUESTIONS,
  ...ICT_CLASSIFIED_UNIT1_QUESTIONS, ...ICT_CLASSIFIED_UNIT2_QUESTIONS, ...ICT_CLASSIFIED_OSI_QUESTIONS,
];

// Book topic order first; short original MCQs before written applications in each topic.
export function getIctPartQuestions(partId) {
  return QUESTIONS.filter(item => item.partId === partId).sort((a, b) =>
    Number(Boolean(b.choices) && !b.figureNeeded)
    - Number(Boolean(a.choices) && !a.figureNeeded));
}

function sourceLabel(item) {
  const book = item.sourceDocument === "book";
  const number = /^(?:السؤال|نشاط|مثال)/.test(item.originalNumber) ? item.originalNumber : `السؤال ${item.originalNumber}`;
  return `${book ? `الكتاب، ص ${item.printedPage}` : `${item.paperLabel}، PDF ص ${item.sourcePage}`} · ${number}${item.marks ? ` · ${item.marks} علامة` : ""}`;
}

function questionMarkdown(item) {
  const title = sourceLabel(item);
  const book = item.sourceDocument === "book";
  const crop = `assets/lessons/ict/exams/source-crops/${item.id}`;
  const fullSource = item.sourceFile === "ict-classified-2023";
  const sourcePage = page => `assets/lessons/ict/exams/source-pages/classified-p${String(page).padStart(3, "0")}.webp`;
  const reference = (fullSource ? [
    `[السؤال ص ${item.sourcePage}](${sourcePage(item.sourcePage)})`,
    item.answerPage ? `[الإجابة ص ${item.answerPage}](${sourcePage(item.answerPage)})` : "",
  ] : [
    `[السؤال ص ${item.sourcePage}](${crop}-question.webp)`,
    item.answerPage ? `[الإجابة ص ${item.answerPage}](${crop}-${item.answerPage === item.sourcePage ? "question" : "answer"}.webp)` : "",
  ]).filter(Boolean).join(" · ");
  const answerLabel = item.sourceConflict ? "حل مصحح مع توضيح خطأ المصدر"
    : item.answerPage ? "حل مع مراجعة مفتاح المصدر" : "حل تعليمي؛ لا يوجد مفتاح مطبوع لهذا البند";
  const guidance = [item.explanation, item.sourceConflict ? `**تنبيه على إجابة المصدر:** ${item.sourceConflict}` : "",
  ].filter(Boolean).join("\n\n");
  const figure = item.figure ? `![${item.figureAlt || `الشكل الأصلي للسؤال، PDF صفحة ${item.sourcePage}`} ](${item.figure})` : "";
  // Source corrections belong in the explanation, not in a different answer UI.
  // Original figures accompany the same tappable choices as text-only MCQs.
  if (item.choices?.length >= 2 && Number.isInteger(item.correctChoiceIndex)
      && !item.question.includes("\n")) {
    const explanation = [item.answer, item.explanation, item.sourceConflict ? `ملاحظة على المصدر: ${item.sourceConflict}` : ""].filter(Boolean).join(" — ").replace(/\n+/g, " ");
    return `:::mcq\nid: ${item.id}\ntitle: ${title}\nkicker: ${title}\nreference: ${reference}\nquestion: ${item.question}\n${item.choices.map((choice, index) => `- [${index === item.correctChoiceIndex ? "x" : " "}] option-${index + 1} | ${choice}`).join("\n")}\nexplanation: ${explanation}${item.answerPage ? "" : " (حل تعليمي)"}.\nhint: اقرأ السؤال وحدد المطلوب ثم قارن الخيارات الأصلية مرة أخرى.\n${figure ? `example:\n${figure}\n` : ""}:::`;
  }
  const choices = item.choices?.length ? `\n\n${item.choices.map((choice, index) => `${["أ", "ب", "ج", "د"][index] || index + 1}. ${choice}`).join("\n\n")}` : "";
  return `:::exam-question\nid: ${item.id}\ntitle: ${title}\nquestion: ${book ? "تدريب من الكتاب" : "سؤال من ورقة امتحان"}\nreference: ${reference}\nanswer-label: ${answerLabel}\nbody:\n${item.question}${choices}${figure ? `\n\n${figure}` : ""}\nsolution:\n${item.answer}\nguidance:\n${guidance}\n:::`;
}

/** Questions-only student curriculum; historical teaching and IDs remain in source. */
export function prepareIctExamLesson(lesson, parts) {
  if (!parts?.length || !getIctPartQuestions(parts[0].id).length) return lesson;
  const questions = parts.flatMap(part => getIctPartQuestions(part.id));
  return defineMarkdownLesson(lesson, questions.map(questionMarkdown).join("\n\n"));
}
