export function lessonReferenceLabel(reference) {
  return Number.isInteger(reference)
    ? `Day ${reference}`
    : String(reference || "Lesson");
}

export function lessonLocale(lesson) {
  return /[\u0600-\u06ff]/.test(
    `${lesson?.title || ""} ${lesson?.summary || ""}`,
  )
    ? "ar"
    : "en";
}
