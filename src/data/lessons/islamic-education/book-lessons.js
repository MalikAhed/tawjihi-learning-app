// Gaza Grade 12 pack (2024), contents: https://moe.edu.ps/m/4064, PDF page 3.
// sourceLesson keeps the national numbering used by the imported question books.
export const ISLAMIC_BOOK_LESSONS = Object.freeze([
  { id:"islamic-quran-method", unit:1, unitKey:"quran", sourceLesson:1, label:"الدرس الأول: منهج التعامل مع القرآن الكريم، والسنة النبوية الشريفة", pages:"3–8", bookPages:[3, 8] },
  { id:"islamic-quran-education", unit:1, unitKey:"quran", sourceLesson:3, label:"الدرس الثاني: منهج القرآن الكريم في التربية — سورة البقرة (151–157)", pages:"9–13", bookPages:[9, 13] },
  { id:"islamic-sharia", unit:1, unitKey:"quran", sourceLesson:4, label:"الدرس الثالث: التحاكم لشرع الله تعالى — سورة المائدة (48–50)", pages:"14–17", bookPages:[14, 17] },
  { id:"islamic-ummah", unit:1, unitKey:"quran", sourceLesson:5, label:"الدرس الرابع: الاعتصام بالله تعالى — سورة آل عمران (100–105)", pages:"18–22", bookPages:[18, 22] },
  { id:"islamic-sunnatullah", unit:1, unitKey:"quran", sourceLesson:7, label:"الدرس الخامس: سنن الله تعالى في المجتمعات", pages:"23–27", bookPages:[23, 27] },
  { id:"islamic-ibrahim-1-12", unit:1, unitKey:"quran", sourceLesson:8, label:"الدرس السادس: سورة إبراهيم (1–12)", pages:"28–31", bookPages:[28, 31] },
  { id:"islamic-ibrahim-13-34", unit:1, unitKey:"quran", sourceLesson:9, label:"الدرس السابع: سورة إبراهيم (13–34)", pages:"32–36", bookPages:[32, 36] },
  { id:"islamic-ibrahim-35-52", unit:1, unitKey:"quran", sourceLesson:10, label:"الدرس الثامن: سورة إبراهيم (35–52)", pages:"37–40", bookPages:[37, 40] },
  { id:"islamic-faith-society", unit:2, unitKey:"aqidah", sourceLesson:12, label:"الدرس التاسع: أثر الإيمان في المجتمع البشري", pages:"42–45", bookPages:[42, 45] },
  { id:"islamic-shirk", unit:2, unitKey:"aqidah", sourceLesson:13, label:"الدرس العاشر: الشرك بالله تعالى ظاهر وخفي", pages:"46–50", bookPages:[46, 50] },
  { id:"islamic-ongoing-deeds", unit:3, unitKey:"hadith", sourceLesson:16, label:"الدرس الحادي عشر: الأعمال التي لا ينقطع ثوابها", pages:"51–54", bookPages:[51, 54] },
  { id:"islamic-bidah", unit:3, unitKey:"hadith", sourceLesson:17, label:"الدرس الثاني عشر: موقف الإسلام من البدع", pages:"55–58", bookPages:[55, 58] },
  { id:"islamic-salahuddin", unit:4, unitKey:"sirah", sourceLesson:20, label:"الدرس الثالث عشر: القائد الفاتح صلاح الدين الأيوبي رحمه الله", pages:"60–63", bookPages:[60, 63] },
  { id:"islamic-izz", unit:4, unitKey:"sirah", sourceLesson:21, label:"الدرس الرابع عشر: من أعلام المسلمين: العز بن عبد السلام", pages:"64–67", bookPages:[64, 67] },
  { id:"islamic-daawa", unit:5, unitKey:"fiqh", sourceLesson:22, label:"الدرس الخامس عشر: فقه الدعوة والجهاد", pages:"68–73", bookPages:[68, 73] },
  { id:"islamic-oaths", unit:5, unitKey:"fiqh", sourceLesson:23, label:"الدرس السادس عشر: الأيمان والنذور", pages:"74–77", bookPages:[74, 77] },
  { id:"islamic-riba", unit:5, unitKey:"fiqh", sourceLesson:24, label:"الدرس السابع عشر: الربا", pages:"78–81", bookPages:[78, 81] },
  { id:"islamic-family-planning", unit:5, unitKey:"fiqh", sourceLesson:26, label:"الدرس الثامن عشر: قضايا معاصرة (2): تنظيم النسل وتحديده", pages:"82–86", bookPages:[82, 86] },
].map(lesson => Object.freeze({
  ...lesson,
  // The PDF includes two front-matter pages before the printed page numbers.
  bookPdfPages:lesson.bookPages.map(page => page + 2),
})));

export const ISLAMIC_UNITS = Object.freeze({
  quran: { id:"quran", unit:1, title:"الوحدة الأولى: القرآن الكريم", summary:"دروس القرآن الكريم الثمانية في الرزمة التعليمية لغزة." },
  aqidah: { id:"aqidah", unit:2, title:"الوحدة الثانية: العقيدة الإسلامية", summary:"دروسا العقيدة الإسلامية في الرزمة التعليمية لغزة." },
  hadith: { id:"hadith", unit:3, title:"الوحدة الثالثة: الحديث الشريف", summary:"دروسا الحديث الشريف في الرزمة التعليمية لغزة." },
  sirah: { id:"sirah", unit:4, title:"الوحدة الرابعة: السير والتراجم", summary:"دروسا السير والتراجم في الرزمة التعليمية لغزة." },
  fiqh: { id:"fiqh", unit:5, title:"الوحدة الخامسة: الفقه الإسلامي", summary:"دروس الفقه الإسلامي الأربعة في الرزمة التعليمية لغزة." },
});
