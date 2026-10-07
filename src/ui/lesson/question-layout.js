import { escapeHtml } from "../../lib/dom.js";
import { renderLessonInline, renderMarkdownDocument } from "../../markdown/renderer.js";
import { getLessonUiCopy, lessonChoiceMarker } from "../lesson-ui-copy.js";
import { renderTemplateFooter, renderTemplateShell } from "../template-shell.js";
import { renderQuestionSourceTag } from "./shared.js";

export function renderQuestionContent(config, { titleId = "ui-lab-content-title", locale = "en" } = {}) {
  const copy = getLessonUiCopy(locale);
  const answerAttribute = "data-ui-lab-answer";
  const example = config.example ? `<div class="lesson-question-example markdown-rendered">${renderMarkdownDocument(config.example, { locale })}</div>` : "";
  const compactOptions = config.prompt.length <= 105 && config.answers.every(answer => answer.text.length <= 48);
  return `<div class="level-lesson-copy ui-lab-mcq lesson-question${example ? " lesson-question--with-example" : ""}${compactOptions ? " lesson-question--compact-options" : ""}">${renderQuestionSourceTag(config)}<h1 id="${escapeHtml(titleId)}">${renderLessonInline(config.prompt)}</h1>${example}<div class="level-answer-list lesson-answer-list" data-answer-count="${config.answers.length}" role="group" aria-label="${escapeHtml(copy.answerChoices)}">${config.answers.map((answer, index) => {
    const answerText = locale === "ar" && answer.id === "true" && answer.text === "True" ? "صح" : locale === "ar" && answer.id === "false" && answer.text === "False" ? "خطأ" : answer.text;
    return `<button class="lesson-answer" type="button" ${answerAttribute}="${escapeHtml(answer.id)}" data-correct="${answer.correct === true}" aria-pressed="false"><span>${lessonChoiceMarker(index, locale)}</span><b>${renderLessonInline(answerText)}</b></button>`;
  }).join("")}</div></div>`;
}

export function renderQuestionLayout(definition, { locale = "en" } = {}) {
  return renderTemplateShell({
    content:renderQuestionContent(definition.content, { locale }),
    footer:renderTemplateFooter({ locale, feedback:"", feedbackAttributes:{ "data-ui-lab-feedback":true, "aria-live":"polite" }, primaryLabel:locale === "ar" ? "تحقّق" : "CHECK", primaryAttributes:{ "data-ui-lab-check":true, disabled:true }, primaryLabelAttributes:{ "data-ui-lab-check-label":true }, showShortcut:false }),
    locale,
  });
}
