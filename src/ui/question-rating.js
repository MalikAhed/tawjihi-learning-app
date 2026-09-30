let ratingGroupSequence = 0;

export function renderQuestionRatingControls(locale) {
  const ratings = locale === "ar"
    ? [["easy", "سهل", "M8 14c2 3 6 3 8 0"], ["medium", "متوسط", "M8 15h8"], ["hard", "صعب", "M8 16c2-3 6-3 8 0"]]
    : [["easy", "Easy", "M8 14c2 3 6 3 8 0"], ["medium", "Medium", "M8 15h8"], ["hard", "Hard", "M8 16c2-3 6-3 8 0"]];
  const prompt = locale === "ar" ? "كيف كان السؤال؟" : "How was the question?";
  const name = `lesson-question-rating-${++ratingGroupSequence}`;
  return `<div class="level-question-rating-panel"><p id="${name}-prompt" class="level-question-rating-prompt">${prompt}</p><div class="level-question-ratings" role="radiogroup" aria-labelledby="${name}-prompt"><span class="level-question-rating-highlight" aria-hidden="true"></span>${ratings.map(([value, text, mouth]) => `<label><input type="radio" name="${name}" value="${value}" data-question-rating="${value}"><span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01"/><path d="${mouth}"/></svg><span>${text}</span></span></label>`).join("")}</div></div>`;
}

export function mountQuestionRating(footer, signal) {
  footer.addEventListener("change", (event) => {
    const rating = event.target;
    if (!(rating instanceof HTMLInputElement) || !rating.matches("[data-question-rating]") || !footer.contains(rating)) return;
    rating.closest(".level-question-ratings").dataset.selectedRating = rating.value;
    footer.dataset.selectedQuestionRating = rating.value;
  }, { signal });
}
