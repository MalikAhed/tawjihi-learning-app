const ENGLISH_COPY = Object.freeze({
  back:"BACK", continue:"CONTINUE", checkAnswer:"CHECK ANSWER", submitExplanation:"SUBMIT EXPLANATION",
  checkOrder:"CHECK ORDER", tryAgain:"TRY AGAIN", reviseAnswer:"REVISE ANSWER",
  answerChoices:"Answer choices", lessonNavigation:"Lesson navigation", showMoreContent:"Show more content",
  showMoreInstructions:"Show more instructions", enterKey:"Enter key", enterShortcut:"ENTER",
  closeLesson:"Close lesson", reviewing:"Reviewing", aiReviewing:"AI is reviewing",
  understood:"UNDERSTOOD", reviewingAction:"REVIEWING…", aiRating:"AI is rating your explanation.",
  reviewUnavailable:"AI review unavailable", passed:"Passed", needsCorrection:"Needs correction",
  unavailableFeedback:"The lesson server could not evaluate the answer. Try again shortly.",
  responseHelp:"Enter to submit · Shift+Enter for a new line",
  mcqIdle:"Select the best answer, then check your choice.",
  mcqSelected:"Answer selected. Check it when you are ready.",
  correct:"Correct!", notQuite:"Not quite", bugFound:"Bug found!", pathCorrect:"That’s the path!", almostThere:"Almost there",
  sequenceIdle:"Choose each step in the order it happens.", sequenceReady:"Ready to check your program flow.",
  fillIdle:"Choose an option for blank one.", fillReady:"Both blanks are filled. Check your answer.",
  bugIdle:"Select the line that contains the bug.", bugLineSelected:"Line selected. Now choose why it is wrong.",
  bugReasonSelected:"Reason selected. Check your answer.", bugReasonQuestion:"Why is the selected line wrong?",
  orderedSteps:"Ordered program steps", availableSteps:"Available program steps", blankOptions:"Options for the blanks",
  codeLines:"Code lines", bugReasons:"Reasons the selected line is wrong", friendlyMascot:"Friendly lesson mascot",
  defaultMascot:"Take it one step at a time.", defaultSequencePlaceholder:"Choose a step below",
  defaultCodeLabel:"Code with blanks", mcqKicker:"KNOWLEDGE CHECK · CHOOSE ONE", practiceKicker:"PRACTICE",
  returnOption:(value) => `Return ${value} to the options`,
  blankLabel:(index, name) => `Blank ${index + 1}, ${name}`,
  chooseBlank:(index) => `Choose an option for blank ${index + 1}.`,
  chooseMoreSteps:(count) => `Choose ${count} more ${count === 1 ? "step" : "steps"}.`,
  lives:(count) => `${count} ${count === 1 ? "life" : "lives"}`,
});

const ARABIC_COPY = Object.freeze({
  back:"السابق", continue:"متابعة", checkAnswer:"تحقّق من الإجابة", submitExplanation:"إرسال الإجابة",
  checkOrder:"تحقّق من الترتيب", tryAgain:"حاول مرة أخرى", reviseAnswer:"عدّل الإجابة",
  answerChoices:"خيارات الإجابة", lessonNavigation:"التنقل داخل الدرس", showMoreContent:"عرض المزيد من المحتوى",
  showMoreInstructions:"عرض المزيد من التعليمات", enterKey:"مفتاح الإدخال", enterShortcut:"ENTER",
  closeLesson:"إغلاق الدرس", reviewing:"جارٍ التقييم", aiReviewing:"جارٍ تقييم الإجابة",
  understood:"فهمت", reviewingAction:"جارٍ التقييم…", aiRating:"جارٍ تقييم إجابتك.",
  reviewUnavailable:"تعذّر تقييم الإجابة", passed:"اجتزت التقييم", needsCorrection:"تحتاج إلى تعديل",
  unavailableFeedback:"تعذّر على خادم الدرس تقييم الإجابة. حاول مرة أخرى بعد قليل.",
  responseHelp:"اضغط إدخال للإرسال · اضغط العالي مع إدخال لسطر جديد",
  mcqIdle:"اختر أفضل إجابة، ثم تحقّق من اختيارك.",
  mcqSelected:"تم اختيار الإجابة. تحقّق منها عندما تكون جاهزًا.",
  correct:"إجابة صحيحة!", notQuite:"ليست صحيحة", bugFound:"اكتشفت الخطأ!", pathCorrect:"الترتيب صحيح!", almostThere:"اقتربت من الإجابة",
  sequenceIdle:"اختر كل خطوة بحسب ترتيب حدوثها.", sequenceReady:"اكتمل الترتيب. تحقّق من إجابتك.",
  fillIdle:"اختر خيارًا للفراغ الأول.", fillReady:"اكتملت الفراغات. تحقّق من إجابتك.",
  bugIdle:"اختر السطر الذي يحتوي على الخطأ.", bugLineSelected:"تم اختيار السطر. اختر الآن سبب الخطأ.",
  bugReasonSelected:"تم اختيار السبب. تحقّق من إجابتك.", bugReasonQuestion:"لماذا يُعدّ السطر المحدد خطأ؟",
  orderedSteps:"الخطوات المرتبة", availableSteps:"الخطوات المتاحة", blankOptions:"خيارات الفراغات",
  codeLines:"أسطر الشيفرة", bugReasons:"أسباب خطأ السطر المحدد", friendlyMascot:"مرشد الدرس",
  defaultMascot:"تقدّم خطوة واحدة في كل مرة.", defaultSequencePlaceholder:"اختر خطوة من الأسفل",
  defaultCodeLabel:"شيفرة تحتوي على فراغات", mcqKicker:"تحقّق من فهمك · اختر إجابة واحدة", practiceKicker:"تدريب",
  returnOption:(value) => `إعادة ${value} إلى الخيارات`,
  blankLabel:(index, name) => `الفراغ ${index + 1}: ${name}`,
  chooseBlank:(index) => `اختر خيارًا للفراغ ${index + 1}.`,
  chooseMoreSteps:(count) => count === 1 ? "اختر خطوة أخرى." : count === 2 ? "اختر خطوتين أخريين." : `اختر ${count} خطوات أخرى.`,
  lives:(count) => `${count} محاولات متبقية`,
});

export function getLessonUiCopy(locale = "en") {
  return locale === "ar" ? ARABIC_COPY : ENGLISH_COPY;
}

export function lessonChoiceMarker(index, locale = "en") {
  if (locale !== "ar") return String.fromCharCode(65 + index);
  return ["أ", "ب", "ج", "د", "هـ", "و", "ز", "ح"][index] || String(index + 1);
}

export function localizedDefault(value, englishDefault, arabicValue, locale = "en") {
  return locale === "ar" && value === englishDefault ? arabicValue : value;
}
