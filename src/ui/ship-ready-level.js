import { escapeHtml } from "../lib/dom.js";
import { renderLessonInline } from "../markdown/renderer.js";
import { getLessonUiCopy, lessonChoiceMarker, localizedDefault } from "./lesson-ui-copy.js";
import { renderTemplateFooter, renderTemplateShell } from "./template-shell.js";

const THINKING_ROCKY = `<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/mascot/rocky-thinking-reduced.svg" />
  <img src="assets/mascot/rocky-thinking.svg" alt="" />
</picture>`;

function sequenceBankSteps(config) {
  const steps = [...config.steps];
  const alreadySolved = steps.length > 1 && steps.every((step, index) => step.id === config.expected[index]);
  return alreadySolved ? [...steps.slice(1), steps[0]] : steps;
}

function renderMascotHeader(config, className, locale, copy) {
  const kicker = localizedDefault(config.kicker, "PRACTICE", copy.practiceKicker, locale);
  const mascot = localizedDefault(config.mascot, "Take it one step at a time.", copy.defaultMascot, locale);
  return `<header class="${className}-head"><div><p class="level-layout-kicker">${escapeHtml(kicker)}</p><h1 id="ui-lab-content-title">${escapeHtml(config.title)}</h1><p>${escapeHtml(config.prompt)}</p></div><div class="${className}-mascot"><div class="${className}-bubble">${escapeHtml(mascot)}</div><img src="assets/mascot/rocky-standing-still-reduced.svg" alt="${escapeHtml(copy.friendlyMascot)}" /></div></header>`;
}

export function renderShipReadyContent(type, config, { titleId = "ui-lab-content-title", answerAttribute = "data-ui-lab-answer", locale = "en" } = {}) {
  const copy = getLessonUiCopy(locale);
  if (type === "mcq") {
    const kicker = localizedDefault(config.kicker, "KNOWLEDGE CHECK · CHOOSE ONE", copy.mcqKicker, locale);
    return `<div class="level-lesson-copy ui-lab-mcq lesson-question"><p class="level-layout-kicker">${escapeHtml(kicker)}</p><h1 id="${escapeHtml(titleId)}">${escapeHtml(config.title)}</h1><p>${escapeHtml(config.prompt)}</p><div class="level-answer-list lesson-answer-list" role="group" aria-label="${escapeHtml(copy.answerChoices)}">${config.answers.map((answer, index) => {
      const answerText = locale === "ar" && answer.id === "true" && answer.text === "True" ? "صح" : locale === "ar" && answer.id === "false" && answer.text === "False" ? "خطأ" : answer.text;
      return `<button class="lesson-answer" type="button" ${answerAttribute}="${escapeHtml(answer.id)}" data-correct="${answer.correct === true}" aria-pressed="false"><span>${lessonChoiceMarker(index, locale)}</span><b>${renderLessonInline(answerText)}</b></button>`;
    }).join("")}</div></div>`;
  }
  if (type === "response") return `<div class="level-lesson-copy ui-lab-response"><div class="ui-lab-response-layout" data-response-layout><div class="ui-lab-review-mascot" data-review-mascot hidden><div class="ui-lab-thinking-mascot">${THINKING_ROCKY}</div><div class="ui-lab-review-message" data-review-message role="status"><div class="ui-lab-reviewing-label"><strong>${escapeHtml(copy.reviewing)}</strong><span class="ui-lab-review-loading" aria-hidden="true"><i></i><i></i><i></i></span></div></div></div><div class="ui-lab-response-brief"><div class="ui-lab-response-head"><div><p class="level-layout-kicker ui-lab-response-kicker-space" aria-hidden="true"></p><h1 id="ui-lab-content-title">${escapeHtml(config.title)}</h1></div></div><p>${escapeHtml(config.prompt)}</p><strong>${escapeHtml(config.rubricTitle)}</strong><ul>${config.rubric.map((item, index) => `<li><span>${index + 1}</span>${escapeHtml(item)}</li>`).join("")}</ul></div><button class="ui-lab-instruction-scroll" type="button" data-instruction-scroll aria-label="${escapeHtml(copy.showMoreInstructions)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.5 9.5 5.5 5 5.5-5"/></svg></button><div class="ui-lab-response-answer"><label for="ui-lab-response"><span>${escapeHtml(config.fieldLabel)}</span></label><div class="ui-lab-composer"><textarea id="ui-lab-response" maxlength="${config.maxLength}" placeholder="${escapeHtml(config.placeholder)}" aria-describedby="ui-lab-response-help ui-lab-response-feedback"></textarea><div><span id="ui-lab-response-help">${escapeHtml(copy.responseHelp)}</span><b><span data-response-count>0</span>/${config.maxLength}</b></div></div></div></div></div>`;
  if (type === "sequence") {
    const placeholder = localizedDefault(config.placeholder, "Choose a step below", copy.defaultSequencePlaceholder, locale);
    return `<div class="level-lesson-copy ui-lab-sequence">${renderMascotHeader(config, "ui-lab-sequence", locale, copy)}<div class="ui-lab-sequence-board"><ol class="ui-lab-sequence-slots" aria-label="${escapeHtml(copy.orderedSteps)}" data-sequence-slots>${config.expected.map((_, index) => `<li data-sequence-slot="${index}"><span>${index + 1}</span><b>${escapeHtml(placeholder)}</b></li>`).join("")}</ol><div class="ui-lab-sequence-bank" role="group" aria-label="${escapeHtml(copy.availableSteps)}">${sequenceBankSteps(config).map((step, index) => `<button type="button" data-sequence-step="${escapeHtml(step.id)}"><span>${lessonChoiceMarker(index, locale)}</span><b>${escapeHtml(step.text)}</b></button>`).join("")}</div></div></div>`;
  }
  if (type === "fill-blanks") {
    const codeLabel = localizedDefault(config.codeLabel, "Code with blanks", copy.defaultCodeLabel, locale);
    return `<div class="level-lesson-copy ui-lab-fill">${renderMascotHeader(config, "ui-lab-fill", locale, copy)}<div class="ui-lab-fill-code" aria-label="${escapeHtml(codeLabel)}">${config.fragments.map((fragment, index) => `<code>${escapeHtml(fragment)}</code>${index < config.blanks.length ? `<span class="ui-lab-code-blank${index === 0 ? " is-active" : ""}" data-fill-blank="${index}" aria-label="${escapeHtml(copy.blankLabel(index, config.blanks[index]))}"></span>` : ""}`).join("")}</div><div class="ui-lab-fill-options" role="group" aria-label="${escapeHtml(copy.blankOptions)}">${config.options.map((option, index) => `<button type="button" class="${option.includes("/") ? "fill-option-endpoint" : "fill-option-method"}" data-fill-option="${escapeHtml(option)}"><span>${lessonChoiceMarker(index, locale)}</span>${renderLessonInline(`\`${option}\``)}</button>`).join("")}</div></div>`;
  }
  if (type === "spot-bug") return `<div class="level-lesson-copy ui-lab-bug">${renderMascotHeader(config, "ui-lab-bug", locale, copy)}<div class="ui-lab-bug-code" role="group" aria-label="${escapeHtml(copy.codeLines)}">${config.lines.map((line, index) => `<button type="button" data-bug-line="${index + 1}" aria-pressed="false"><span>${index + 1}</span><code>${escapeHtml(line)}</code></button>`).join("")}</div><div class="ui-lab-bug-reasons" data-bug-reasons hidden role="group" aria-label="${escapeHtml(copy.bugReasons)}"><p>${escapeHtml(copy.bugReasonQuestion)}</p><div>${config.reasons.map((reason, index) => `<button type="button" data-bug-reason="${escapeHtml(reason.id)}"><span>${lessonChoiceMarker(index, locale)}</span><b>${renderLessonInline(reason.text)}</b></button>`).join("")}</div></div></div>`;
  return `<div class="ui-lab-content-placeholder"><h1 id="ui-lab-content-title">${escapeHtml(config.title)}</h1></div>`;
}

function footerOptions(type, config, locale) {
  const copy = getLessonUiCopy(locale);
  if (type === "mcq") return { feedback:locale === "ar" ? copy.mcqIdle : config.idleFeedback, feedbackAttributes:{ "data-ui-lab-feedback":true, "aria-live":"polite" }, primaryLabel:copy.checkAnswer, primaryAttributes:{ "data-ui-lab-check":true, disabled:true }, primaryLabelAttributes:{ "data-ui-lab-check-label":true } };
  if (type === "response") return { feedback:"", feedbackClass:"ui-lab-response-feedback", feedbackAttributes:{ id:"ui-lab-response-feedback", "aria-live":"polite" }, primaryLabel:copy.submitExplanation, primaryAttributes:{ "data-response-submit":true }, primaryLabelAttributes:{ "data-response-submit-label":true } };
  if (type === "sequence") return { feedback:copy.sequenceIdle, feedbackAttributes:{ "data-sequence-feedback":true, "aria-live":"polite" }, primaryLabel:copy.checkOrder, primaryAttributes:{ "data-sequence-check":true, disabled:true }, primaryLabelAttributes:{ "data-sequence-check-label":true } };
  if (type === "fill-blanks") return { feedback:copy.fillIdle, feedbackAttributes:{ "data-fill-feedback":true, "aria-live":"polite" }, primaryLabel:copy.checkAnswer, primaryAttributes:{ "data-fill-check":true, disabled:true }, primaryLabelAttributes:{ "data-fill-check-label":true } };
  if (type === "spot-bug") return { feedback:copy.bugIdle, feedbackAttributes:{ "data-bug-feedback":true, "aria-live":"polite" }, primaryLabel:copy.checkAnswer, primaryAttributes:{ "data-bug-check":true, disabled:true }, primaryLabelAttributes:{ "data-bug-check-label":true } };
  return { feedback:"", primaryLabel:copy.continue };
}

export function renderShipReadyLevel(definition, { locale = "en" } = {}) {
  return renderTemplateShell({
    content:renderShipReadyContent(definition.type, definition.content, { locale }),
    footer:renderTemplateFooter({ ...footerOptions(definition.type, definition.content, locale), locale }),
    showScrollIndicator:definition.type !== "response",
    locale,
  });
}
