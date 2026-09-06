import { localizeShipReady } from "../data/ship-ready-ar.js";
import { renderPlayground } from "./ui-lab/playground.js";
import { animateView } from "./view-motion.js";
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
    const previousBackMarkup = elements.lessonBackButton.innerHTML;
    const previousBackLabel = elements.lessonBackButton.getAttribute("aria-label");
    elements.lessonBackButton.textContent = "المزيد →";
    elements.lessonBackButton.setAttribute("aria-label", "العودة إلى المزيد");
    elements.lessonBackButton.classList.add("development-reference-back");
    const restoreBack = () => {
      elements.lessonContent.classList.remove("current-system");
      elements.lessonBackButton.innerHTML = previousBackMarkup;
      elements.lessonBackButton.classList.remove("development-reference-back");
      if (previousBackLabel === null) elements.lessonBackButton.removeAttribute("aria-label");
      else elements.lessonBackButton.setAttribute("aria-label", previousBackLabel);
    };
    setActiveCleanup(restoreBack);
    elements.lessonContent.classList.add("current-system");
    elements.lessonTitle.textContent = "نظام التصميم";
    elements.lessonStatus.textContent = "جارٍ التحميل";
    elements.lessonContent.setAttribute("aria-busy", "true");
    elements.lessonContent.innerHTML = `<div class="app-loading" role="status" aria-live="polite"><p>جارٍ تحميل نظام التصميم…</p></div>`;
    document.title = `Loading Design System · ${appTitle}`;
    showContentView();
    writeRoute({ view:"design-system" }, historyMode);
    window.scrollTo({ top:0, behavior:prefersReducedMotion() ? "auto" : "smooth" });
    try {
      const { renderDesignSystem } = await loadDesignSystem();
      if (!isCurrentRequest(request)) return;
      animateView(elements.lessonContent);
      elements.lessonContent.setAttribute("aria-busy", "false");
      elements.lessonStatus.textContent = "مرجع المكوّنات";
      const disposeReference = renderDesignSystem(elements.lessonContent);
      setActiveCleanup(() => { disposeReference(); restoreBack(); });
      document.title = `Design System · ${appTitle}`;
      if (opener) elements.lessonContent.focus({ preventScroll:true });
    } catch (error) {
      if (!isCurrentRequest(request)) return;
      console.error("The Design System could not be loaded.", error);
      animateView(elements.lessonContent);
      elements.lessonContent.setAttribute("aria-busy", "false");
      elements.lessonStatus.textContent = "غير متاح";
      elements.lessonContent.innerHTML = `<section class="lesson-error" role="alert"><h1 class="lesson-heading">The Design System could not load</h1><p>Return to the path and try opening it again.</p></section>`;
      elements.lessonContent.focus({ preventScroll:true });
    }
  }

  async function openTemplate(opener = null, { historyMode = "push", view = "ui-lab" } = {}) {
    const definition = localizeShipReady(getShipReadyTemplate(view));
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
      const previousBackMarkup = elements.lessonBackButton.innerHTML;
      const previousBackLabel = elements.lessonBackButton.getAttribute("aria-label");
      elements.lessonBackButton.textContent = "×";
      elements.lessonBackButton.setAttribute("aria-label", "Close lesson");
      document.body.classList.add("ui-lab-open", "ui-lab-template-open");
      const restoreShell = () => {
        document.body.classList.remove("ui-lab-template-open", "ui-lab-open");
        elements.lessonBackButton.innerHTML = previousBackMarkup;
        if (previousBackLabel === null) elements.lessonBackButton.removeAttribute("aria-label");
        else elements.lessonBackButton.setAttribute("aria-label", previousBackLabel);
      };
      setActiveCleanup(restoreShell);
      elements.lessonContent.setAttribute("aria-busy", "true");
      elements.lessonContent.innerHTML = `<div class="app-loading" role="status" aria-live="polite"><p>جارٍ تحميل محرّر الشيفرة…</p></div>`;
      try {
        const { renderDesignSystem } = await loadDesignSystem();
        if (!isCurrentRequest(request)) return;
        animateView(elements.lessonContent);
        elements.lessonContent.setAttribute("aria-busy", "false");
        const destroyPracticeLab = renderDesignSystem(elements.lessonContent, { practiceOnly:true, practice:definition.content, locale:"ar" });
        setActiveCleanup(() => {
          destroyPracticeLab();
          restoreShell();
        });
      } catch (error) {
        if (!isCurrentRequest(request)) return;
        console.error("The Code Editor template could not be loaded.", error);
        animateView(elements.lessonContent);
        elements.lessonContent.setAttribute("aria-busy", "false");
        elements.lessonContent.innerHTML = `<section class="lesson-error" role="alert"><h1 class="lesson-heading">The Code Editor template could not load</h1><p>Return to Ship Ready and try opening it again.</p></section>`;
      }
    } else {
      elements.lessonContent.removeAttribute("aria-busy");
      setActiveCleanup(definition.renderer === "markdown" ? renderMarkdownLab(elements.lessonContent)
        : renderUiLab(elements.lessonContent, { definition, locale:"ar" }));
    }
    window.scrollTo({ top:0, behavior:"auto" });
    if (opener) elements.lessonContent.focus({ preventScroll:true });
  }

  function openLab(opener = null, { historyMode = "push" } = {}) {
    beginRequest();
    prepareView(opener);
    setDevelopmentViewMode(elements, "ui-lab");
    elements.lessonContent.removeAttribute("aria-busy");
    showContentView();
    writeRoute({ view:"ui-lab" }, historyMode);
    document.title = `UI Lab · ${appTitle}`;
    setActiveCleanup(renderPlayground(elements.lessonContent, { onClose:() => elements.lessonBackButton.click() }));
  }

  return Object.freeze({ openDesignSystem, openTemplate, openLab });
}
