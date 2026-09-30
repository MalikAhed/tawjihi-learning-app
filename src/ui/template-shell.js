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
  primaryLabel, primaryAttributes = {}, primaryLabelAttributes = {}, primaryTrailingContent = "",
  } = options;
  const copy = getLessonUiCopy(locale);
  const resolvedBackLabel = backLabel ?? copy.back;
  const resolvedPrimaryLabel = primaryLabel ?? copy.continue;
  return `<nav class="${escapeHtml(className)}" dir="${locale === "ar" ? "rtl" : "ltr"}" aria-label="${escapeHtml(copy.lessonNavigation)}">
    <p class="${escapeHtml(feedbackClass)}"${renderAttributes(feedbackAttributes)}>${escapeHtml(feedback)}</p>
    <div class="level-layout-action-group">
      <button class="level-action" type="button" data-template-back${renderAttributes(backAttributes)}>${escapeHtml(resolvedBackLabel)}</button>
      <button class="level-action level-action--primary level-action--check" type="button" data-template-primary${renderAttributes(primaryAttributes)}><span data-template-action-label${renderAttributes(primaryLabelAttributes)}>${escapeHtml(resolvedPrimaryLabel)}</span>${primaryTrailingContent}</button>
    </div>
  </nav>`;
}

export function mountTemplateEnterShortcut(container, { signal } = {}) {
  container.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.key !== "Enter" || event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest("button, input, textarea, select, a, summary, [contenteditable]")) return;
    const primary = [...container.querySelectorAll("[data-template-primary]:not(:disabled):not([hidden])")]
      .find((button) => !button.closest("[hidden]"));
    if (!primary) return;
    event.preventDefault();
    primary.click();
  }, { signal });
}

/** Keep lesson reading zoom separate from the footer controls. */
export function mountTemplateContentZoom(container, { signal } = {}) {
  let zoom = 1;
  container.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.isComposing || event.altKey || !(event.ctrlKey || event.metaKey)) return;
    const increase = ["+", "="].includes(event.key) || event.code === "NumpadAdd";
    const decrease = event.key === "-" || event.code === "NumpadSubtract";
    const reset = event.key === "0" || ["Digit0", "Numpad0"].includes(event.code);
    if (!increase && !decrease && !reset) return;
    event.preventDefault();
    zoom = reset ? 1 : Math.max(.5, Math.min(4, zoom + (increase ? .25 : -.25)));
    container.style.setProperty("--lesson-content-zoom", String(zoom));
  }, { signal });
  signal?.addEventListener("abort", () => container.style.removeProperty("--lesson-content-zoom"), { once:true });
}

export function renderTemplateShell({ content, footer, showScrollIndicator = true, titleId = "ui-lab-content-title", locale = "en" }) {
  const copy = getLessonUiCopy(locale);
  return `<div class="level-layout-preview" lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">
    <div class="level-layout-content">
      <section class="level-layout-task" aria-labelledby="${escapeHtml(titleId)}">${content}</section>
      ${showScrollIndicator ? `<button class="ui-lab-content-scroll" type="button" data-content-scroll aria-label="${escapeHtml(copy.showMoreContent)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.5 9.5 5.5 5 5.5-5"/></svg></button>` : ""}
    </div>
    ${footer}
  </div>`;
}
