import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";
import { AL_TASNIF_ITEMS, AL_TASNIF_SOURCE_URL } from "./al-tasnif-bank.js";

export { AL_TASNIF_SOURCE_URL };

const UNIT_DEFINITIONS = Object.freeze([
  { id: "electronic-structure", unit: 1, title: "الوحدة الأولى · البناء الإلكتروني والعدد الكمي", summary: "أسئلة التصنيف عن الطيف الذري، نموذج بور، الأعداد الكمية وقواعد التوزيع الإلكتروني.", outcome: "حل أسئلة البناء الإلكتروني مع كتابة الرموز والصيغ بصيغة واضحة.", pages: "7–19" },
  { id: "periodic-bonding", unit: 2, title: "الوحدة الثانية · الجدول الدوري ورابطة التكافؤ", summary: "أسئلة التصنيف عن الجدول الدوري، الخواص الدورية، العناصر الانتقالية والروابط.", outcome: "ربط التركيب الإلكتروني بالخواص الدورية والتهجين ونوع الرابطة.", pages: "33–50" },
  { id: "acids-bases", unit: 3, title: "الوحدة الثالثة · الحموض والقواعد", summary: "أسئلة التصنيف عن نماذج الحمض والقاعدة، الرقم الهيدروجيني، الاتزان، الأملاح والمعايرة.", outcome: "تمييز النموذج المناسب وحل الحسابات مع مراجعة مفتاح الوحدة.", pages: "62–88" },
  { id: "thermodynamics-kinetics", unit: 4, title: "الوحدة الرابعة · الديناميكا الحرارية وحركية التفاعل", summary: "أسئلة التصنيف عن التلقائية وطاقة جبس الحرة وقوانين سرعة التفاعل وآليته.", outcome: "قراءة العلاقات الحرارية والحركية وحل أسئلة الرتبة والطاقة.", pages: "104–123" },
  { id: "organic-compounds", unit: 5, title: "الوحدة الخامسة · الكيمياء العضوية", summary: "أسئلة التصنيف عن هاليدات الألكيل والكحولات والألدهيدات والكيتونات والحموض الكربوكسيلية.", outcome: "تحديد المجموعة الوظيفية وكتابة نواتج التفاعلات العضوية.", pages: "128–142" },
  { id: "galvanic-cells", unit: 6, title: "الوحدة السادسة · الخلايا والتحليل الكهربائي", summary: "أسئلة التصنيف عن الخلايا الجلفانية، جهود الاختزال، حساب جهد الخلية والتحليل الكهربائي.", outcome: "تحديد المصعد والمهبط وكتابة أنصاف التفاعلات وحساب جهد الخلية.", pages: "149–164" },
]);

const itemsByUnit = new Map(UNIT_DEFINITIONS.map(({ unit }) => [unit, []]));
for (const item of AL_TASNIF_ITEMS) itemsByUnit.get(item.unit)?.push(item);

function renderItem(item) {
  if (item.kind === "mcq") {
    return [
      ":::mcq",
      `id: ${item.id}`,
      `title: ${item.title}`,
      "kicker: اختر الإجابة الصحيحة",
      `reference: ${item.source}`,
      `question: ${item.question}`,
      ...(item.image ? ["example:", item.image] : []),
      ...item.choices.map(({ text, correct }) => `- [${correct ? "x" : " "}] ${text}`),
      `explanation: ${item.explanation}`,
      "hint: حل السؤال أولاً، ثم افتح صفحة إجابات الوحدة لمراجعة المفتاح.",
      ":::",
    ].join("\n");
  }
  return [
    ":::exam-question",
    `id: ${item.id}`,
    `title: ${item.title}`,
    `question: ${item.title}`,
    `reference: ${item.source}`,
    `answer-label: ${item.answerLabel}`,
    "body:",
    item.question,
    ...(item.image ? ["", item.image] : []),
    "",
    "solution:",
    item.solution,
    ":::",
  ].join("\n");
}

export function createChemistryLesson(meta, items) {
  return defineMarkdownLesson({
    status: "published",
    language: "ar",
    mode: "أسئلة وبطاقات",
    level: "الثاني عشر · الفرع العلمي · غزة",
    reward: 10,
    ...meta,
    duration: `${items.length} سؤالًا وبطاقة`,
  }, items.map(renderItem).join("\n\n"));
}

export const CHEMISTRY_BANK = Object.freeze(Object.fromEntries(
  UNIT_DEFINITIONS.map(definition => [definition.id, Object.freeze(itemsByUnit.get(definition.unit))]),
));

export const CHEMISTRY_LESSON_META = Object.freeze(Object.fromEntries(
  UNIT_DEFINITIONS.map(definition => [definition.id, {
    id: definition.id,
    title: definition.title,
    summary: definition.summary,
    outcome: definition.outcome,
    pages: definition.pages,
    unit: definition.unit,
  }]),
));

export const CHEMISTRY_LESSONS = Object.freeze(UNIT_DEFINITIONS.map(definition => {
  const items = CHEMISTRY_BANK[definition.id];
  return Object.freeze({
    ...CHEMISTRY_LESSON_META[definition.id],
    subjectId: "chemistry",
    questionIds: Object.freeze(items.map(item => item.id)),
    questionCount: items.length,
  });
}));

export function loadChemistryLesson(id) {
  const meta = CHEMISTRY_LESSON_META[id];
  const items = CHEMISTRY_BANK[id];
  if (!meta || !items) return null;
  return createChemistryLesson(meta, items);
}
