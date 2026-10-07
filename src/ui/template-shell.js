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

/** Reveal remaining reading content without moving it until the learner asks. */
export function mountTemplateScrollIndicator(container, { signal } = {}) {
  const surface = container.querySelector(".level-layout-task");
  const button = container.querySelector("[data-content-scroll]");
  if (!surface || !button) return;
  let frame = 0;
  const update = () => {
    if (signal?.aborted) return;
    const zoom = Number(getComputedStyle(surface).zoom) || 1;
    const overflow = surface.scrollHeight > surface.parentElement.clientHeight / zoom + 2;
    surface.dataset.scrollable = String(overflow);
    const moreBelow = overflow && surface.scrollHeight - surface.clientHeight - surface.scrollTop > 2;
    surface.tabIndex = overflow ? 0 : -1;
    if (!moreBelow && button === document.activeElement) surface.focus({ preventScroll:true });
    button.hidden = !moreBelow;
  };
  const scheduleUpdate = () => {
    if (frame || signal?.aborted) return;
    frame = window.requestAnimationFrame(() => { frame = 0; update(); });
  };
  button.addEventListener("click", () => surface.scrollBy({
    top:Math.max(120, surface.clientHeight * .75),
    behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  }), { signal });
  surface.addEventListener("scroll", scheduleUpdate, { signal, passive:true });
  const observer = new ResizeObserver(scheduleUpdate);
  observer.observe(surface);
  [...surface.children].forEach(child => observer.observe(child));
  scheduleUpdate();
  signal?.addEventListener("abort", () => {
    observer.disconnect();
    window.cancelAnimationFrame(frame);
  }, { once:true });
}

export function renderTemplateShell({ content, footer, showScrollIndicator = true, titleId = "ui-lab-content-title", locale = "en" }) {
  const copy = getLessonUiCopy(locale);
  const scrollId = `${titleId}-scroll`;
  return `<div class="level-layout-preview" lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">
    <div class="level-layout-content">
      <section class="level-layout-task" id="${escapeHtml(scrollId)}" aria-labelledby="${escapeHtml(titleId)}">${content}</section>
      ${showScrollIndicator ? `<button class="lesson-scroll-cue" type="button" data-content-scroll hidden aria-controls="${escapeHtml(scrollId)}" aria-label="${escapeHtml(`${copy.moreBelow}: ${copy.showMoreContent}`)}"><span>${escapeHtml(copy.moreBelow)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6"/></svg></button>` : ""}
    </div>
    ${footer}
  </div>`;
}
