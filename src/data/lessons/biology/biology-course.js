import { BIOLOGY_LESSON_BANK } from "./biology-bank.js";
import { PAST_PAPERS_800_IDS } from "./past-papers-800.js";
import { TASNIF_WRITTEN_IDS } from "./tasnif-written.js";

const sourceIds = id => Object.freeze(BIOLOGY_LESSON_BANK[id].map(item => item.id));

// This catalog is the stable navigation layer. The question bank owns the
// source-derived IDs so the roadmap and rendered lesson cannot drift apart.
export const BIOLOGY_LESSONS = Object.freeze([
  Object.freeze({
    id:"energy-flow",
    label:"تدفق الطاقة: البناء الضوئي والتنفس الخلوي",
    unit:1,
    pages:"4–13",
    bookPdfPages:[4, 13],
    questionIds:sourceIds("energy-flow"),
  }),
  Object.freeze({
    id:"gene-to-protein",
    label:"من الجين إلى البروتين",
    unit:1,
    pages:"14–23",
    bookPdfPages:[14, 23],
    questionIds:sourceIds("gene-to-protein"),
  }),
  Object.freeze({
    id:"inheritance",
    label:"الوراثة المندلية وغير المندلية",
    unit:2,
    pages:"24–41",
    bookPdfPages:[24, 41],
    questionIds:sourceIds("inheritance"),
  }),
  Object.freeze({
    id:"human-systems",
    label:"أجهزة جسم الإنسان",
    unit:3,
    pages:"42–57",
    bookPdfPages:[42, 57],
    questionIds:sourceIds("human-systems"),
  }),
  Object.freeze({
    id:"microbes",
    label:"البكتيريا والفيروسات",
    unit:4,
    pages:"58–70",
    bookPdfPages:[58, 70],
    questionIds:sourceIds("microbes"),
  }),
  Object.freeze({
    id:"past-papers-800",
    label:"أسئلة وزارية وتصنيفية: مجموعة 800 سؤال",
    unit:5,
    pages:"PDF ص 2–53",
    bookPdfPages:[2, 53],
    questionIds:PAST_PAPERS_800_IDS,
  }),
  Object.freeze({
    id:"tasnif-written",
    label:"الأسئلة المقالية المصنفة: بطاقات الحل",
    unit:5,
    pages:"تصنيف 2023، ص 5–85",
    bookPdfPages:[5, 85],
    questionIds:TASNIF_WRITTEN_IDS,
  }),
]);
