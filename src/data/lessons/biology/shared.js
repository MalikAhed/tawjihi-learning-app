import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const GAZA_BOOK_URL = "https://elearnps.blob.core.windows.net/public/ElearnPs/edu-pack-gaza/12/12scientific/%D8%A7%D9%84%D8%B9%D9%84%D9%88%D9%85%20%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D8%AA%D9%8A%D8%A9%20%D9%A1%D9%A2%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9%20%D8%BA%D8%B2%D8%A9.pdf";
export const MINISTRY_BANK_URL = "https://xgyehfpvdpwhbpxmybxi.supabase.co/storage/v1/object/public/tawjihi-pdfs/content/palcurr/ef46a7873725f1c7.pdf";
export const BIOLOGY_800_MCQ_URL = "https://xgyehfpvdpwhbpxmybxi.supabase.co/storage/v1/object/public/tawjihi-pdfs/content/palcurr/5620332ddb08089d.pdf";
export const TASNIF_2023_URL = "https://drive.google.com/file/d/1Ih0eyqTk1KLgCnfuagrtBJw3SZ80CeqL/view?usp=drivesdk";
export const EXAMS_URL = "https://www.sh-pal.com/2025/01/2022-2024.html";

const letters = ["أ", "ب", "ج", "د"];

export function mcq({ id, title, page, question, options, answer, explanation, image, source = "الكتاب المدرسي" }) {
  const choices = options.map((option, index) => `- [${index === answer ? "x" : " "}] option-${index + 1} | ${option}`).join("\n");
  const figure = image ? `\nexample:\n![${image.alt}](${image.path})` : "";
  const sourceUrl = source.startsWith("مجموعة 800 سؤال") ? BIOLOGY_800_MCQ_URL : source.startsWith("تصنيف نماذج") ? TASNIF_2023_URL : source === "الكتاب المدرسي" ? GAZA_BOOK_URL : MINISTRY_BANK_URL;
  return `:::mcq
id: ${id}
title: ${title}
kicker: ${source} · ص ${page}
reference: [${source}، PDF ص ${page}](${sourceUrl}#page=${page})
question: ${question}
${choices}
explanation: ${explanation}
hint: اقرأ المطلوب وحدد المفهوم أو العلاقة التي تختبرها المسألة.${figure}
:::`;
}

export function card({ id, title, page, question, body, solution, image, source = "الكتاب المدرسي", answerLabel = "إجابة موثقة من المصدر أو مستنتجة مباشرة من معطياته" }) {
  const figure = image ? `\n\n![${image.alt}](${image.path})` : "";
  const sourceUrl = source.startsWith("مجموعة 800 سؤال") ? BIOLOGY_800_MCQ_URL : source.startsWith("تصنيف نماذج") ? TASNIF_2023_URL : source === "الكتاب المدرسي" ? GAZA_BOOK_URL : MINISTRY_BANK_URL;
  return `:::exam-question
id: ${id}
title: ${title}
question: ${question}
reference: [${source}، PDF ص ${page}](${sourceUrl}#page=${page})
answer-label: ${answerLabel}
body:
${body}${figure}
solution:
${solution}
:::`;
}

export function makeLesson({ id, title, summary, source }) {
  return defineMarkdownLesson({
    id,
    subjectId: "biology",
    title,
    summary,
    language: "ar",
    status: "published",
    mode: "أسئلة وبطاقات",
    outcome: "حل أسئلة الرزمة التعليمية وفهم أسباب الإجابات وتطبيقها على نمط الامتحان.",
    duration: "مراجعة مركزة",
    level: "توجيهي علمي",
    reward: 10,
  }, source);
}

export function joinBlocks(blocks) {
  return blocks.join("\n\n");
}

export const FIGURES = Object.freeze({
  photosystem: { path: "assets/lessons/biology/source-crops/biology-book-p007-photosystem-noncyclic.webp", alt: "الشكل الأصلي للمسار الإلكتروني اللاحلقي في التفاعلات الضوئية" },
  calvin: { path: "assets/lessons/biology/source-crops/biology-book-p009-calvin-cycle.webp", alt: "الشكل الأصلي لمراحل حلقة كالفن" },
  punnett: { path: "assets/lessons/biology/source-crops/biology-book-p025-punnett-square.webp", alt: "مربع بانيت الأصلي لتزاوج نباتي بازيلا" },
  karyotypes: { path: "assets/lessons/biology/source-crops/biology-book-p037-karyotypes.webp", alt: "الطرز الكروموسومية الأصلية لبعض الاختلالات الوراثية" },
  heart: { path: "assets/lessons/biology/source-crops/biology-book-p049-heart-figure.webp", alt: "مقطع القلب الأصلي مع أسماء الحجرات والصمامات والأوعية" },
  immunity: { path: "assets/lessons/biology/source-crops/biology-book-p054-immune-response.webp", alt: "مخطط الأنظمة المناعية الأصلي في الرزمة" },
  bacterium: { path: "assets/lessons/biology/source-crops/biology-book-p062-bacterial-cell.webp", alt: "الشكل الأصلي لتركيب الخلية البكتيرية" },
  hiv: { path: "assets/lessons/biology/source-crops/biology-book-p067-hiv-structure.webp", alt: "الشكل الأصلي لفيروس نقص المناعة المكتسبة وبنيته" },
  heartTest: { path: "assets/lessons/biology/source-crops/biology-book-p070-heart-question.webp", alt: "الشكل الأصلي لسؤال القلب المرقم في اختبار الرزمة" },
});

export { letters };
