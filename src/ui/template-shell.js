import { escapeHtml } from "../lib/dom.js";
import { getLessonUiCopy } from "./lesson-ui-copy.js";

const ATTRIBUTE_NAME = /^[A-Za-z_:][A-Za-z0-9:._-]*$/;

function renderAttributes(attributes = {}) {
  return Object.entries(attributes).map(([name, value]) => {
    if (!ATTRIBUTE_NAME.test(name)) throw new TypeError(`Invalid HTML attribute name: ${name}`);
    if (value === false || value == null) return "";
    if (value === true) return ` ${name}`;
    return ` ${name}="${escapeHtml(value)}"`;
  }).join("");
}

export function renderTemplateFooter(options = {}) {
  const {
  locale = "en",
  className = "level-layout-actions",
  backLabel, backAttributes = {},
  feedback = "", feedbackClass = "level-feedback", feedbackAttributes = {},
  primaryLabel, primaryAttributes = {}, primaryLabelAttributes = {}, primaryTrailingContent = "", showShortcut = true,
  } = options;
  const copy = getLessonUiCopy(locale);
  const resolvedBackLabel = backLabel ?? copy.back;
  const resolvedPrimaryLabel = primaryLabel ?? copy.continue;
  return `<nav class="${escapeHtml(className)}" aria-label="${escapeHtml(copy.lessonNavigation)}">
    <p class="${escapeHtml(feedbackClass)}"${renderAttributes(feedbackAttributes)}>${escapeHtml(feedback)}</p>
    <div class="level-layout-action-group">
      <button class="level-action" type="button" data-template-back${renderAttributes(backAttributes)}>${escapeHtml(resolvedBackLabel)}</button>
      <button class="level-action level-action--primary level-action--check" type="button" data-template-primary${renderAttributes(primaryAttributes)}><span data-template-action-label${renderAttributes(primaryLabelAttributes)}>${escapeHtml(resolvedPrimaryLabel)}</span>${primaryTrailingContent}${showShortcut ? `<kbd aria-label="${escapeHtml(copy.enterKey)}"><b>↵</b><span>${escapeHtml(copy.enterShortcut)}</span></kbd>` : ""}</button>
    </div>
  </nav>`;
}

export function mountTemplateEnterShortcut(container, { signal } = {}) {
  container.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.key !== "Enter" || event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest("button, input, textarea, select, a, [contenteditable]")) return;
    const primary = [...container.querySelectorAll("[data-template-primary]:not(:disabled):not([hidden])")]
      .find((button) => !button.closest("[hidden]"));
    if (!primary) return;
    event.preventDefault();
    primary.click();
  }, { signal });
}

export function renderTemplateShell({ content, footer, showScrollIndicator = true, titleId = "ui-lab-content-title", locale = "en" }) {
  const copy = getLessonUiCopy(locale);
  return `<div class="level-layout-preview">
    <div class="level-layout-content">
      <section class="level-layout-task" aria-labelledby="${escapeHtml(titleId)}">${content}</section>
      ${showScrollIndicator ? `<button class="ui-lab-content-scroll" type="button" data-content-scroll aria-label="${escapeHtml(copy.showMoreContent)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.5 9.5 5.5 5 5.5-5"/></svg></button>` : ""}
    </div>
    ${footer}
  </div>`;
}
