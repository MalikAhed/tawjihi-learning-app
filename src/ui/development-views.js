import { applyWeekThemeFromSearch } from "../app/week-theme.js";
import { getShipReadyTemplate } from "../data/ship-ready.js";
import { prefersReducedMotion } from "../lib/dom.js";
import { loadDesignSystem } from "./design-system-loader.js";
import { renderMarkdownLab } from "./markdown-lab.js";
import { renderUiLab } from "./ui-lab/index.js";

export function setDevelopmentViewMode(elements, view = null) {
  const isDesignSystem = view === "design-system" || view === "practice-lab";
  const isUiLab = view === "ui-lab" || view === "practice-lab";
  const isSubject = view === "subject";
  elements.lessonShell.classList.toggle("lesson-shell--design-system", isDesignSystem);
  elements.lessonCard.classList.toggle("lesson-card--design-system", isDesignSystem);
  elements.lessonShell.classList.toggle("lesson-shell--ui-lab", isUiLab);
  elements.lessonCard.classList.toggle("lesson-card--ui-lab", isUiLab);
  elements.lessonShell.classList.toggle("lesson-shell--subject", isSubject);
  if (!isSubject) delete elements.lessonShell.dataset.subject;
  elements.lessonStatus.hidden = isUiLab;
}

/** Owns development-only reference screens so the product bootstrap stays focused on routing. */
export function createDevelopmentViewController({
  elements,
  appTitle,
  designSystemEnabled,
  beginRequest,
  isCurrentRequest,
  prepareView,
  setActiveCleanup,
  showContentView,
  writeRoute,
}) {
  async function openDesignSystem(opener = null, { historyMode = "push" } = {}) {
    if (!designSystemEnabled) return;
    const request = beginRequest();
    prepareView(opener);
    setDevelopmentViewMode(elements, "design-system");
    elements.lessonTitle.textContent = "DESIGN SYSTEM";
    elements.lessonStatus.textContent = "LOADING";
    elements.lessonContent.setAttribute("aria-busy", "true");
    elements.lessonContent.innerHTML = `<p role="status" aria-live="polite">Loading the previous Design System…</p>`;
    document.title = `Loading Design System · ${appTitle}`;
    showContentView();
    writeRoute({ view:"design-system" }, historyMode);
    window.scrollTo({ top:0, behavior:prefersReducedMotion() ? "auto" : "smooth" });
    try {
      const { renderDesignSystem } = await loadDesignSystem();
      if (!isCurrentRequest(request)) return;
      elements.lessonContent.setAttribute("aria-busy", "false");
      elements.lessonStatus.textContent = "REFERENCE";
      setActiveCleanup(renderDesignSystem(elements.lessonContent));
      document.title = `Design System · ${appTitle}`;
      if (opener) elements.lessonContent.focus({ preventScroll:true });
    } catch (error) {
      if (!isCurrentRequest(request)) return;
      console.error("The Design System could not be loaded.", error);
      elements.lessonContent.setAttribute("aria-busy", "false");
      elements.lessonStatus.textContent = "UNAVAILABLE";
      elements.lessonContent.innerHTML = `<section class="lesson-error" role="alert"><h1 class="lesson-heading">The Design System could not load</h1><p>Return to the path and try opening it again.</p></section>`;
      elements.lessonContent.focus({ preventScroll:true });
    }
  }

  async function openTemplate(opener = null, { historyMode = "push", view = "ui-lab" } = {}) {
    const definition = getShipReadyTemplate(view);
    if (!definition) return;
    applyWeekThemeFromSearch();
    const request = beginRequest();
    prepareView(opener);
    setDevelopmentViewMode(elements, definition.renderer === "code" ? "practice-lab" : "ui-lab");
    elements.lessonTitle.textContent = definition.chromeTitle;
    showContentView();
    writeRoute({ view }, historyMode);
    document.title = `Ship Ready · ${appTitle}`;
    if (definition.renderer === "code") {
      elements.lessonContent.setAttribute("aria-busy", "true");
      elements.lessonContent.innerHTML = `<p role="status" aria-live="polite">Loading Code Editor template…</p>`;
      try {
        const { renderDesignSystem } = await loadDesignSystem();
        if (!isCurrentRequest(request)) return;
        const previousBackText = elements.lessonBackButton.textContent;
        const previousBackLabel = elements.lessonBackButton.getAttribute("aria-label");
        elements.lessonBackButton.textContent = "×";
        elements.lessonBackButton.setAttribute("aria-label", "Close lesson");
        elements.lessonContent.setAttribute("aria-busy", "false");
        document.body.classList.add("ui-lab-open", "ui-lab-template-open");
        const destroyPracticeLab = renderDesignSystem(elements.lessonContent, { practiceOnly:true, practice:definition.content });
        setActiveCleanup(() => {
          destroyPracticeLab();
          document.body.classList.remove("ui-lab-template-open", "ui-lab-open");
          elements.lessonBackButton.textContent = previousBackText;
          if (previousBackLabel === null) elements.lessonBackButton.removeAttribute("aria-label");
          else elements.lessonBackButton.setAttribute("aria-label", previousBackLabel);
        });
      } catch (error) {
        if (!isCurrentRequest(request)) return;
        console.error("The Code Editor template could not be loaded.", error);
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonContent.innerHTML = `<section class="lesson-error" role="alert"><h1 class="lesson-heading">The Code Editor template could not load</h1><p>Return to Ship Ready and try opening it again.</p></section>`;
      }
    } else {
      elements.lessonContent.removeAttribute("aria-busy");
      setActiveCleanup(definition.renderer === "markdown" ? renderMarkdownLab(elements.lessonContent)
        : renderUiLab(elements.lessonContent, { definition }));
    }
    window.scrollTo({ top:0, behavior:"auto" });
    if (opener) elements.lessonContent.focus({ preventScroll:true });
  }

  return Object.freeze({ openDesignSystem, openTemplate });
}
