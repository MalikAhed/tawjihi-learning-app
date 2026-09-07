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
  correct:"Correct!", notQuite:"Not quite", excellent:"Excellent!", wrongAnswer:"Wrong answer", bugFound:"Bug found!", pathCorrect:"That’s the path!", almostThere:"Almost there",
  sequenceIdle:"Choose each step in the order it happens.", sequenceReady:"Ready to check your program flow.",
  fillIdle:"Choose an option for blank one.", fillReady:"Both blanks are filled. Check your answer.",
  bugIdle:"Select the line that contains the bug.", bugLineSelected:"Line selected. Now choose why it is wrong.",
  bugReasonSelected:"Reason selected. Check your answer.", bugReasonQuestion:"Why is the selected line wrong?",
  orderedSteps:"Ordered program steps", availableSteps:"Available program steps", blankOptions:"Options for the blanks",
  codeLines:"Code lines", bugReasons:"Reasons the selected line is wrong", friendlyMascot:"Friendly lesson mascot",
  defaultMascot:"Take it one step at a time.", defaultSequencePlaceholder:"Choose a step below",
  defaultCodeLabel:"Code with blanks", mcqKicker:"KNOWLEDGE CHECK · CHOOSE ONE", practiceKicker:"PRACTICE",
  glossaryLabel:"TECH TERM", scrollableTable:"Scrollable table", videoPlayer:"YouTube video player",
  preview:"LESSON PREVIEW", previewUnsaved:"Preview only. No progress or rewards have been saved.",
  loadingCodeEditor:"Loading the code editor…", codeEditorUnavailable:"The code editor could not load",
  codeOverflow:"Scroll horizontally to read the full code. Use the arrow keys when the code area is focused.",
  rubricTitle:"A strong answer includes", responseField:"Your explanation", responsePlaceholder:"Explain the idea in your own words...",
  returnOption:(value) => `Return ${value} to the options`,
  removeOrderedStep:(value) => `Remove ${value} from the order`,
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
  correct:"إجابة صحيحة!", notQuite:"ليست صحيحة", excellent:"ممتاز!", wrongAnswer:"إجابة خاطئة", bugFound:"اكتشفت الخطأ!", pathCorrect:"الترتيب صحيح!", almostThere:"اقتربت من الإجابة",
  sequenceIdle:"اختر كل خطوة بحسب ترتيب حدوثها.", sequenceReady:"اكتمل الترتيب. تحقّق من إجابتك.",
  fillIdle:"اختر خيارًا للفراغ الأول.", fillReady:"اكتملت الفراغات. تحقّق من إجابتك.",
  bugIdle:"اختر السطر الذي يحتوي على الخطأ.", bugLineSelected:"تم اختيار السطر. اختر الآن سبب الخطأ.",
  bugReasonSelected:"تم اختيار السبب. تحقّق من إجابتك.", bugReasonQuestion:"لماذا يُعدّ السطر المحدد خطأ؟",
  orderedSteps:"الخطوات المرتبة", availableSteps:"الخطوات المتاحة", blankOptions:"خيارات الفراغات",
  codeLines:"أسطر الشيفرة", bugReasons:"أسباب خطأ السطر المحدد", friendlyMascot:"مرشد الدرس",
  defaultMascot:"تقدّم خطوة واحدة في كل مرة.", defaultSequencePlaceholder:"اختر خطوة من الأسفل",
  defaultCodeLabel:"شيفرة تحتوي على فراغات", mcqKicker:"تحقّق من فهمك · اختر إجابة واحدة", practiceKicker:"تدريب",
  glossaryLabel:"مصطلح تقني", scrollableTable:"جدول قابل للتمرير", videoPlayer:"مشغّل فيديو يوتيوب",
  preview:"معاينة الدرس", previewUnsaved:"هذه معاينة فقط. لم يُحفظ تقدّم أو تُمنح نقاط خبرة.",
  loadingCodeEditor:"جارٍ تحميل محرّر الشيفرة…", codeEditorUnavailable:"تعذّر تحميل محرّر الشيفرة",
  codeOverflow:"مرّر أفقيًا لقراءة الشيفرة كاملة. يمكنك استخدام مفاتيح الأسهم عند التركيز على مساحة الشيفرة.",
  rubricTitle:"تتضمّن الإجابة الجيدة", responseField:"إجابتك", responsePlaceholder:"اشرح الفكرة بأسلوبك...",
  returnOption:(value) => `إعادة ${value} إلى الخيارات`,
  removeOrderedStep:(value) => `إزالة ${value} من الترتيب`,
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

// The renderer and interaction controller receive the same resolved defaults.
// Explicit authored copy survives selection, removal, retry and reset.
export function resolveLessonContent(type, config, locale = "en") {
  const copy = getLessonUiCopy(locale);
  const resolved = { ...config };
  const defaults = {
    kicker: type === "mcq" ? "mcqKicker" : "practiceKicker",
    mascot: "defaultMascot", codeLabel: "defaultCodeLabel",
    rubricTitle: "rubricTitle", fieldLabel: "responseField",
    placeholder: type === "sequence" ? "defaultSequencePlaceholder" : "responsePlaceholder",
  };
  for (const [field, key] of Object.entries(defaults)) {
    if (resolved[field] === undefined || resolved[field] === ENGLISH_COPY[key]) resolved[field] = copy[key];
  }
  return resolved;
}
