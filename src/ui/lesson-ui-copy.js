const ENGLISH_COPY = Object.freeze({
  back:"BACK", continue:"CONTINUE", answerChoices:"Answer choices",
  lessonNavigation:"Lesson navigation", moreBelow:"More below", showMoreContent:"Show more content", closeLesson:"Close lesson",
  excellent:"Excellent!", wrongAnswer:"Wrong answer",
  glossaryLabel:"TECH TERM", scrollableTable:"Scrollable table", videoPlayer:"YouTube video player",
});

const ARABIC_COPY = Object.freeze({
  back:"السابق", continue:"متابعة", answerChoices:"خيارات الإجابة",
  lessonNavigation:"التنقل داخل الدرس", moreBelow:"المزيد بالأسفل", showMoreContent:"عرض المزيد من المحتوى", closeLesson:"إغلاق الدرس",
  excellent:"ممتاز!", wrongAnswer:"إجابة خاطئة",
  glossaryLabel:"مصطلح تقني", scrollableTable:"جدول قابل للتمرير", videoPlayer:"مشغّل فيديو يوتيوب",
});

export function getLessonUiCopy(locale = "en") {
  return locale === "ar" ? ARABIC_COPY : ENGLISH_COPY;
}

export function lessonChoiceMarker(index, locale = "en") {
  if (locale !== "ar") return String.fromCharCode(65 + index);
  return ["أ", "ب", "ج", "د", "هـ", "و", "ز", "ح"][index] || String(index + 1);
}
