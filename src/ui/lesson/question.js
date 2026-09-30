import { escapeHtml } from "../../lib/dom.js";
import { launchCelebration } from "../celebration.js";
import { getLessonUiCopy } from "../lesson-ui-copy.js";
import { renderQuestionLayout } from "./question-layout.js";
import { mountQuestionRating, renderQuestionRatingControls } from "../question-rating.js";
import { highlightEnglishText } from "./english-text.js";
import { mountSummaryScans } from "./summary-scans.js";

const CHECK_ACTION = Object.freeze({ CHECK:"check", RETRY:"retry", CONTINUE:"continue" });

function triggerPinata(signal) {
  launchCelebration({ className:"ui-lab-pinata", signal });
}

function setCheckAction(button, label, state, text, disabled = button.disabled) {
  button.dataset.actionState = state;
  button.disabled = disabled;
  label.textContent = text;
}

function compactResult(copy, correct) {
  const path = correct ? "m10.5 20.8 6.2 6.2 13-14" : "m12.5 12.5 15 15m0-15-15 15";
  const modifier = correct ? "correct" : "wrong";
  const label = correct ? copy.excellent : copy.wrongAnswer;
  return `<span class="level-result-icon level-result-icon--${modifier}"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="${path}"/></svg></span><span class="level-result-copy"><strong>${escapeHtml(label)}</strong></span>`;
}

/** Mount the published multiple-choice card inside the lesson journey. */
export function renderQuestion(container, { definition, onBack, onContinue, onAnswer, locale = "en" } = {}) {
  if (definition?.type !== "mcq" || !definition.content) throw new TypeError("A published multiple-choice question is required.");
  const controller = new AbortController();
  const { signal } = controller;
  const copy = getLessonUiCopy(locale);
  const config = definition.content;
  container.classList.add("ui-lab-template-open", "ui-lab-mcq-open");
  container.innerHTML = renderQuestionLayout({ ...definition, content:config }, { locale });
  if (locale === "ar") highlightEnglishText(container.querySelector(".ui-lab-mcq"));
  mountSummaryScans(container.querySelector(".ui-lab-mcq"), { titleId:definition.id || "mcq", locale, signal, exam:true });
  const closeTemplate = () => onContinue?.();
  container.querySelector("[data-template-back]").addEventListener("click", () => onBack?.(), { signal });
  let contentOverflowObserver;
  const surface = container.querySelector(".level-layout-task");
  const scrollButton = container.querySelector("[data-content-scroll]");
  if (scrollButton) {
    const updateOverflow = () => surface.classList.toggle("has-more-content",
      surface.scrollHeight > surface.clientHeight + 2 && surface.scrollTop + surface.clientHeight < surface.scrollHeight - 2);
    scrollButton.addEventListener("click", () => surface.scrollBy({ top:Math.max(140, surface.clientHeight * .58), behavior:"smooth" }), { signal });
    surface.addEventListener("scroll", updateOverflow, { signal, passive:true });
    contentOverflowObserver = new ResizeObserver(updateOverflow);
    contentOverflowObserver.observe(surface);
    [...surface.children].forEach(child => contentOverflowObserver.observe(child));
    window.requestAnimationFrame(() => { if (!signal.aborted) updateOverflow(); });
  }
  const destroy = () => {
    controller.abort();
    contentOverflowObserver?.disconnect();
    document.querySelector(".ui-lab-pinata")?.remove();
    container.classList.remove("ui-lab-template-open", "ui-lab-mcq-open");
  };

  const answers = [...container.querySelectorAll("[data-ui-lab-answer]")];
  const checkButton = container.querySelector("[data-ui-lab-check]");
  const feedback = container.querySelector("[data-ui-lab-feedback]");
  const footer = feedback.closest(".level-layout-actions");
  const checkLabel = checkButton.querySelector("[data-ui-lab-check-label]");
  let selectedAnswer = null;
  const checkText = locale === "ar" ? "تحقّق" : "CHECK";
  setCheckAction(checkButton, checkLabel, CHECK_ACTION.CHECK, checkText, true);

  mountQuestionRating(footer, signal);

  answers.forEach((answer) => answer.addEventListener("click", () => {
    if (checkButton.dataset.actionState === CHECK_ACTION.CONTINUE) return;
    selectedAnswer = answer;
    answers.forEach((option) => {
      option.classList.toggle("is-selected", option === answer);
      option.classList.remove("is-correct", "is-wrong");
      option.setAttribute("aria-pressed", String(option === answer));
    });
    feedback.className = "level-feedback";
    feedback.textContent = "";
    footer.querySelector(".level-question-rating-panel")?.remove();
    delete footer.dataset.selectedQuestionRating;
    setCheckAction(checkButton, checkLabel, CHECK_ACTION.CHECK, checkText, false);
  }, { signal }));

  checkButton.addEventListener("click", () => {
    if (checkButton.dataset.actionState === CHECK_ACTION.CONTINUE) { closeTemplate(); return; }
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer.dataset.correct === "true";
    onAnswer?.({ correct:isCorrect });
    answers.forEach((answer) => {
      answer.setAttribute("aria-disabled", "true");
      answer.classList.toggle("is-correct", answer.dataset.correct === "true");
      answer.classList.toggle("is-wrong", answer === selectedAnswer && !isCorrect);
    });
    feedback.className = `level-feedback ${isCorrect ? "is-correct" : "is-wrong"}`;
    feedback.innerHTML = compactResult(copy, isCorrect);
    feedback.insertAdjacentHTML("afterend", renderQuestionRatingControls(locale));
    setCheckAction(checkButton, checkLabel, CHECK_ACTION.CONTINUE, copy.continue);
    if (isCorrect) triggerPinata(signal);
  }, { signal });

  return destroy;
}
