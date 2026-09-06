import { renderCurrentDesignSystem } from "./current-design-system.js";
import { SHIP_READY_TEMPLATES } from "../data/ship-ready.js";
import { prefersReducedMotion } from "../lib/dom.js";
import { mountMarkdownFeatures, renderMarkdownDocument } from "../markdown/renderer.js";
import { mountCodeQuestWhenVisible } from "./design-system-code-quest.js";
import { renderTemplateFooter } from "./template-shell.js";

// The current gallery has its own renderer; this module owns only the code practice view.
const HTML_LOGO_SVG = `<svg class="ds-language-logo" viewBox="0 0 512 512" aria-hidden="true"><path fill="#E34F26" d="M71 460 30 0h451l-41 460-185 52"/><path fill="#EF652A" d="m256 472 149-41 35-394H256"/><path fill="#EBEBEB" d="M256 208h-75l-5-58h80V94H114l1 15 14 156h127zm0 147h-1l-63-17-4-45h-56l7 89 116 32h1z"/><path fill="#FFF" d="M255 208v57h70l-7 73-63 17v59l116-32 1-10 13-149 2-15h-16zm0-114v56h137l1-12 3-29 1-15z"/></svg>`;
const CSS_LOGO_SVG = `<svg class="ds-language-logo" viewBox="0 0 512 512" aria-hidden="true"><path fill="#264DE4" d="M71.357 460.819 30.272 0h451.456l-41.129 460.746L255.724 512z"/><path fill="#2965F1" d="m405.388 431.408 35.148-393.73H256v435.146z"/><path fill="#EBEBEB" d="m124.46 208.59 5.065 56.517H256V208.59zM119.419 150.715H256V94.197H114.281zM256 355.372l-.248.066-62.944-16.996-4.023-45.076h-56.736l7.919 88.741 115.772 32.14.26-.073z"/><path fill="#FFF" d="M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z"/></svg>`;
const JS_LOGO_SVG = `<svg class="ds-language-logo" viewBox="0 0 512 512" aria-hidden="true"><rect width="512" height="512" rx="38" fill="#f7df1e"/><path fill="#191919" d="M275 397c10 17 22 29 43 29 18 0 29-9 29-22 0-16-12-21-32-30l-11-5c-32-14-54-31-54-68 0-34 26-60 66-60 29 0 49 10 64 36l-35 23c-8-14-17-20-29-20-13 0-22 8-22 20 0 14 9 20 29 29l11 5c38 16 59 33 59 70 0 40-31 62-74 62-42 0-68-20-81-48zm-157 4c7 13 14 24 29 24 14 0 23-6 23-29V243h44v154c0 46-27 67-66 67-35 0-56-18-66-40z"/></svg>`;
const CAST_ICON_PATHS = '<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M2 12a9 9 0 0 1 8 8"/><path d="M2 16a5 5 0 0 1 4 4"/><line x1="2" x2="2.01" y1="20" y2="20"/>';
function renderCastIcon(className) {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${CAST_ICON_PATHS}</svg>`;
}

export function renderDesignSystem(container, { practiceOnly = false, practice = null, embedded = false, onBack = null, onContinue = null, locale = "en" } = {}) {
  if (!practiceOnly) return renderCurrentDesignSystem(container);
  const controller = new AbortController();
  const { signal } = controller;
  const disposers = [];
  const codeQuest = practice || SHIP_READY_TEMPLATES.find(({ renderer }) => renderer === "code").content;
  const codeQuestFooter = renderTemplateFooter({ locale, className:"ds-quest-footer level-layout-actions", primaryLabel:locale === "ar" ? "تحقّق من الشيفرة" : "RUN CHECK", primaryAttributes:{ "data-run-code":true }, primaryTrailingContent:'<span class="ds-run-play" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M7.5 5.8v12.4c0 1.1 1.2 1.8 2.2 1.2l9.1-6.2c.8-.5.8-1.8 0-2.3L9.7 4.7c-1-.7-2.2 0-2.2 1.1Z" /></svg></span>', showShortcut:false });
  container.innerHTML = `
    <section class="ds-section ds-ready-content-area" id="interactive">

      <article class="ds-panel ds-interactive-panel ds-build-panel">
        <div class="ds-build-content" data-build-content>
          <aside class="ds-build-guide" aria-label="Quest instructions">
            <article class="markdown-rendered">${renderMarkdownDocument(codeQuest.instructions)}</article>
            <button class="ds-guide-scroll" type="button" data-guide-scroll aria-label="Show more instructions"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6.5 9.5 5.5 5 5.5-5"/></svg></button>
          </aside>
          <div class="ds-build-resizer" data-build-resizer role="separator" tabindex="0" aria-label="Resize instructions and workspace" aria-orientation="vertical" aria-valuemin="300" aria-valuemax="1000" aria-valuenow="500"></div>
          <div class="ds-code-lab" data-code-lab>
            <section class="ds-editor-card" aria-label="Code editor">
              <header class="ds-editor-header"><div class="ds-editor-tabs" role="tablist" aria-label="Code files"><button class="is-active" id="code-tab-html" type="button" role="tab" data-editor-tab="html" aria-controls="code-panel-html" aria-label="Edit index.html" title="index.html" aria-selected="true">${HTML_LOGO_SVG}<span class="ds-editor-tab-label">index.html</span></button><button id="code-tab-css" type="button" role="tab" data-editor-tab="css" aria-controls="code-panel-css" aria-label="Edit styles.css" title="styles.css" aria-selected="false" tabindex="-1">${CSS_LOGO_SVG}<span class="ds-editor-tab-label">styles.css</span></button><button id="code-tab-js" type="button" role="tab" data-editor-tab="js" aria-controls="code-panel-js" aria-label="Edit script.js" title="script.js" aria-selected="false" tabindex="-1">${JS_LOGO_SVG}<span class="ds-editor-tab-label">script.js</span></button></div></header>
              <div class="ds-editor-host" id="code-panel-html" data-editor-host="html" role="tabpanel" aria-labelledby="code-tab-html"></div><div class="ds-editor-host" id="code-panel-css" data-editor-host="css" role="tabpanel" aria-labelledby="code-tab-css" hidden></div><div class="ds-editor-host" id="code-panel-js" data-editor-host="js" role="tabpanel" aria-labelledby="code-tab-js" hidden></div>
            </section>
            <div class="ds-lab-resizer" data-lab-resizer role="separator" tabindex="0" aria-label="Resize editor and preview" aria-orientation="vertical" aria-valuemin="280" aria-valuemax="1000" aria-valuenow="560"></div>
            <section class="ds-preview-card" aria-label="Code output"><header class="ds-preview-bar"><div class="ds-output-tabs" role="tablist" aria-label="Code output"><button class="is-active" id="output-tab-preview" type="button" role="tab" data-output-tab="preview" aria-controls="output-panel-preview" aria-selected="true">PREVIEW</button><button id="output-tab-console" type="button" role="tab" data-output-tab="console" aria-controls="output-panel-console" aria-selected="false" tabindex="-1">CONSOLE <span data-console-count hidden>0</span></button></div><b>${renderCastIcon("ds-preview-live-icon")} LIVE</b></header><div class="ds-output-panel" id="output-panel-preview" data-output-panel="preview" role="tabpanel" aria-labelledby="output-tab-preview"><iframe class="ds-live-preview" title="Live code preview" sandbox="allow-scripts"></iframe></div><div class="ds-output-panel ds-console" id="output-panel-console" data-output-panel="console" role="tabpanel" aria-labelledby="output-tab-console" hidden><div class="ds-console-toolbar"><span>JavaScript output</span><button type="button" data-clear-console>CLEAR</button></div><div class="ds-console-output" data-console-output role="log" aria-live="polite"><p class="ds-console-empty">Console output will appear here.</p></div></div></section>
          </div>
        </div>
        ${codeQuestFooter}
      </article>

    </section>
  `;

  container.classList.add("ds-practice-only");
  container.querySelector("[data-template-back]").addEventListener("click", () => {
    if (embedded && typeof onBack === "function") onBack();
    else document.querySelector(".lesson-back")?.click();
  }, { signal });

  if (locale === "ar") {
    container.querySelector('[data-output-tab="preview"]').textContent = "المعاينة";
    container.querySelector('[data-output-tab="console"]').firstChild.textContent = "السجل ";
    container.querySelector('.ds-preview-bar>b').lastChild.textContent = " مباشر";
    const clear = container.querySelector('[data-clear-console]');
    if (clear) clear.textContent = "مسح السجل";
    container.querySelector(".ds-console-toolbar>span").textContent = "نتيجة JavaScript";
  }


  mountMarkdownFeatures(container, { signal, scrollSurface:container.querySelector(".ds-build-guide") });
  mountBuildSplitter(container, signal);
  mountBuildGuideOverflow(container, signal);
  mountCodeLabSplitter(container, signal);
  mountCodeQuestWhenVisible(container, signal, codeQuest, (dispose) => disposers.push(dispose), { onContinue });

  return () => {
    controller.abort();
    disposers.splice(0).forEach((dispose) => dispose());
    container.classList.remove("ds-practice-only");
  };
}
function mountBuildGuideOverflow(container, signal) {
  const guide = container.querySelector(".ds-build-guide");
  const button = container.querySelector("[data-guide-scroll]");
  if (!guide || !button) return;
  const update = () => {
    const hasOverflow = guide.scrollHeight > guide.clientHeight + 2;
    const hasMore = hasOverflow && guide.scrollTop + guide.clientHeight < guide.scrollHeight - 2;
    guide.classList.toggle("has-more-content", hasMore);
  };
  button.addEventListener("click", () => {
    guide.scrollBy({ top:Math.max(140, guide.clientHeight * .58), behavior:prefersReducedMotion() ? "auto" : "smooth" });
  }, { signal });
  guide.addEventListener("scroll", update, { signal, passive:true });
  if (typeof ResizeObserver === "function") {
    const observer = new ResizeObserver(update);
    observer.observe(guide);
    const content = guide.querySelector(".markdown-rendered");
    if (content) observer.observe(content);
    signal.addEventListener("abort", () => observer.disconnect(), { once:true });
  } else {
    window.addEventListener("resize", update, { passive:true, signal });
  }
  window.requestAnimationFrame(update);
}

function mountBuildSplitter(container, signal) {
  const content = container.querySelector("[data-build-content]");
  const resizer = container.querySelector("[data-build-resizer]");
  if (!content || !resizer) return;
  const getBounds = () => {
    const rect = content.getBoundingClientRect();
    const narrow = window.matchMedia("(max-width: 980px)").matches;
    const min = narrow ? 300 : 360;
    const max = Math.max(min, rect.width - (narrow ? 360 : 520));
    return { min, max };
  };
  const clampWidth = (value) => {
    const { min, max } = getBounds();
    return Math.min(Math.max(value, min), max);
  };
  const updateSeparatorMetadata = () => {
    const current = content.querySelector(".ds-build-guide").getBoundingClientRect().width;
    if (current <= 0) return;
    const { min, max } = getBounds();
    resizer.setAttribute("aria-valuemin", String(Math.round(min)));
    resizer.setAttribute("aria-valuemax", String(Math.round(max)));
    resizer.setAttribute("aria-valuenow", String(Math.round(clampWidth(current))));
  };
  const setGuideWidth = (value) => {
    const width = clampWidth(value);
    content.style.setProperty("--ds-build-guide-width", `${Math.round(width)}px`);
    updateSeparatorMetadata();
  };
  if (typeof ResizeObserver === "function") {
    const observer = new ResizeObserver(updateSeparatorMetadata);
    observer.observe(content);
    signal.addEventListener("abort", () => observer.disconnect(), { once:true });
  } else {
    window.addEventListener("resize", updateSeparatorMetadata, { passive:true, signal });
  }
  updateSeparatorMetadata();
  resizer.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 760px)").matches) return;
    event.preventDefault();
    resizer.setPointerCapture(event.pointerId);
    content.classList.add("is-resizing");
    const move = (moveEvent) => setGuideWidth(moveEvent.clientX - content.getBoundingClientRect().left);
    const stop = () => {
      content.classList.remove("is-resizing");
      resizer.removeEventListener("pointermove", move);
      resizer.removeEventListener("pointerup", stop);
      resizer.removeEventListener("pointercancel", stop);
    };
    resizer.addEventListener("pointermove", move, { signal });
    resizer.addEventListener("pointerup", stop, { once:true, signal });
    resizer.addEventListener("pointercancel", stop, { once:true, signal });
    move(event);
  }, { signal });
  signal.addEventListener("abort", () => content.classList.remove("is-resizing"), { once:true });
  resizer.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = content.querySelector(".ds-build-guide").getBoundingClientRect().width;
    if (event.key === "Home") setGuideWidth(360);
    else if (event.key === "End") setGuideWidth(content.getBoundingClientRect().width - 520);
    else setGuideWidth(current + (event.key === "ArrowRight" ? 24 : -24));
  }, { signal });
}

function mountCodeLabSplitter(container, signal) {
  const lab = container.querySelector("[data-code-lab]");
  const resizer = container.querySelector("[data-lab-resizer]");
  if (!lab || !resizer) return;
  const getBounds = () => {
    const rect = lab.getBoundingClientRect();
    const min = 280;
    const max = Math.max(min, rect.width - 280);
    return { min, max };
  };
  const clampWidth = (value) => {
    const { min, max } = getBounds();
    return Math.min(Math.max(value, min), max);
  };
  const updateSeparatorMetadata = () => {
    const current = lab.querySelector(".ds-editor-card").getBoundingClientRect().width;
    if (current <= 0) return;
    const { min, max } = getBounds();
    resizer.setAttribute("aria-valuemin", String(Math.round(min)));
    resizer.setAttribute("aria-valuemax", String(Math.round(max)));
    resizer.setAttribute("aria-valuenow", String(Math.round(clampWidth(current))));
  };
  const setEditorWidth = (value) => {
    const width = clampWidth(value);
    lab.style.setProperty("--ds-code-editor-width", `${Math.round(width)}px`);
    updateSeparatorMetadata();
  };
  if (typeof ResizeObserver === "function") {
    const observer = new ResizeObserver(updateSeparatorMetadata);
    observer.observe(lab);
    signal.addEventListener("abort", () => observer.disconnect(), { once:true });
  } else {
    window.addEventListener("resize", updateSeparatorMetadata, { passive:true, signal });
  }
  updateSeparatorMetadata();
  resizer.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 980px)").matches) return;
    event.preventDefault();
    resizer.setPointerCapture(event.pointerId);
    lab.classList.add("is-resizing");
    const move = (moveEvent) => setEditorWidth(moveEvent.clientX - lab.getBoundingClientRect().left);
    const stop = () => {
      lab.classList.remove("is-resizing");
      resizer.removeEventListener("pointermove", move);
      resizer.removeEventListener("pointerup", stop);
      resizer.removeEventListener("pointercancel", stop);
    };
    resizer.addEventListener("pointermove", move, { signal });
    resizer.addEventListener("pointerup", stop, { once:true, signal });
    resizer.addEventListener("pointercancel", stop, { once:true, signal });
    move(event);
  }, { signal });
  signal.addEventListener("abort", () => lab.classList.remove("is-resizing"), { once:true });
  resizer.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = lab.querySelector(".ds-editor-card").getBoundingClientRect().width;
    if (event.key === "Home") setEditorWidth(280);
    else if (event.key === "End") setEditorWidth(lab.getBoundingClientRect().width - 280);
    else setEditorWidth(current + (event.key === "ArrowRight" ? 24 : -24));
  }, { signal });
}
