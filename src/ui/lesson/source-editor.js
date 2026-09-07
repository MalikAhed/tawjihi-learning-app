import { escapeHtml } from "../../lib/dom.js";
import { compileLessonMarkdown } from "../../markdown/lesson-model.js";
import { getLessonUiCopy } from "../lesson-ui-copy.js";
import {
  renderTemplateFooter,
  renderTemplateShell,
} from "../template-shell.js";
import { lessonLocale } from "./shared.js";
import { renderAuthoredInteractiveLesson } from "./authored.js";

/** @param {import("../lesson-view.js").LessonOptions} [options] @returns {import("../../app/view-lifecycle.js").Cleanup} */
export function renderMarkdownAuthoredLesson(container, day, lesson, options = {}) {
  const controller = new AbortController();
  const { signal } = controller;
  const locale = lessonLocale(lesson);
  const copy = getLessonUiCopy(locale);
  const shell = container.closest(".lesson-shell") || container;
  const top = shell.querySelector(".lesson-top");
  const backButton = shell.querySelector(".lesson-back");
  const topProgress = shell.querySelector(".lesson-top-title");
  const lessonStatus = shell.querySelector(".lesson-status");
  const originalChrome = {
    backMarkup: backButton?.innerHTML,
    backLabel: backButton?.getAttribute("aria-label"),
    statusHidden: lessonStatus?.hidden,
    progressRole: topProgress?.getAttribute("role"),
    progressLabel: topProgress?.getAttribute("aria-label"),
  };
  const toggle = document.createElement("button");
  toggle.className = "lesson-markdown-toggle";
  toggle.type = "button";
  toggle.textContent = locale === "ar" ? "مصدر الدرس" : "MARKDOWN";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "lesson-markdown-source");
  top?.insertBefore(toggle, lessonStatus || null);

  const sourcePanel = document.createElement("section");
  sourcePanel.className = "lesson-markdown-source";
  sourcePanel.id = "lesson-markdown-source";
  sourcePanel.hidden = true;
  sourcePanel.setAttribute("aria-labelledby", "lesson-markdown-source-title");
  sourcePanel.innerHTML = `<header><div><span>${locale === "ar" ? "مصدر الدرس المباشر" : "LIVE LESSON SOURCE"}</span><h2 id="lesson-markdown-source-title">${escapeHtml(lesson.title)} ${locale === "ar" ? "— المصدر" : "Markdown"}</h2></div><button type="button" data-close-lesson-markdown aria-label="${locale === "ar" ? "إغلاق مصدر الدرس" : "Close Markdown source"}">×</button></header><p>${locale === "ar" ? "يُبنى محتوى هذا الدرس من هذا المصدر. يؤدي حذف المحتوى إلى إخفاء خطواته، ويمكن إعادة تحميل الصفحة لاستعادته." : "Everything rendered in this lesson comes from this source. Delete content and the rendered steps disappear immediately; reload the page to restore it."}</p><textarea data-lesson-markdown-input aria-label="${escapeHtml(lesson.title)} ${locale === "ar" ? "مصدر الدرس" : "Markdown source"}" spellcheck="false"></textarea><footer><span data-lesson-markdown-count></span><strong data-lesson-markdown-state role="status" aria-live="polite"></strong></footer>`;
  shell.append(sourcePanel);
  const input = sourcePanel.querySelector("[data-lesson-markdown-input]");
  const count = sourcePanel.querySelector("[data-lesson-markdown-count]");
  const state = sourcePanel.querySelector("[data-lesson-markdown-state]");
  input.value = lesson.authoringSource;
  let destroyFlow = () => {};
  let renderTimer = 0;
  let edited = false;

  const restoreChrome = () => {
    document.body.classList.remove(
      "ui-lab-open",
      "ui-lab-template-open",
      "ui-lab-mcq-open",
      "ready-lesson-open",
    );
    shell.classList.remove(
      "lesson-shell--ui-lab",
      "lesson-shell--ready-lesson",
    );
    shell.style.removeProperty("--lesson-progress");
    container.classList.remove(
      "lesson-card--ui-lab",
      "lesson-card--ready-lesson",
    );
    if (backButton) {
      backButton.innerHTML = originalChrome.backMarkup;
      if (originalChrome.backLabel === null)
        backButton.removeAttribute("aria-label");
      else backButton.setAttribute("aria-label", originalChrome.backLabel);
    }
    if (lessonStatus) lessonStatus.hidden = originalChrome.statusHidden;
    if (topProgress) {
      ["aria-valuemin", "aria-valuemax", "aria-valuenow"].forEach((name) =>
        topProgress.removeAttribute(name),
      );
      if (originalChrome.progressRole === null)
        topProgress.removeAttribute("role");
      else topProgress.setAttribute("role", originalChrome.progressRole);
      if (originalChrome.progressLabel === null)
        topProgress.removeAttribute("aria-label");
      else topProgress.setAttribute("aria-label", originalChrome.progressLabel);
    }
  };

  const renderEmptySource = (issues) => {
    document.body.classList.add(
      "ui-lab-open",
      "ui-lab-template-open",
      "ready-lesson-open",
    );
    shell.classList.add("lesson-shell--ui-lab", "lesson-shell--ready-lesson");
    container.classList.add("lesson-card--ui-lab", "lesson-card--ready-lesson");
    backButton.textContent = "×";
    backButton.setAttribute("aria-label", copy.closeLesson);
    lessonStatus.hidden = true;
    topProgress.setAttribute("role", "progressbar");
    topProgress.setAttribute(
      "aria-label",
      locale === "ar"
        ? `تقدّم درس ${lesson.title}`
        : `${lesson.title} progress`,
    );
    topProgress.setAttribute("aria-valuemin", "0");
    topProgress.setAttribute("aria-valuemax", "0");
    topProgress.setAttribute("aria-valuenow", "0");
    shell.style.setProperty("--lesson-progress", "0%");
    container.innerHTML = `<article class="lesson-flow ready-lesson-flow lesson-markdown-empty-flow">${renderTemplateShell(
      {
        titleId: "lesson-markdown-empty-title",
        content: `<div class="level-lesson-copy ready-lesson-copy lesson-markdown-empty"><p class="level-layout-kicker">${locale === "ar" ? "محتوى الدرس" : "MARKDOWN LESSON"}</p><h1 id="lesson-markdown-empty-title">${locale === "ar" ? "لا يحتوي هذا الدرس على محتوى" : "This lesson has no authored content"}</h1><p>${locale === "ar" ? "واجهة الدرس موجودة، لكن لا توجد خطوات لعرضها." : "Its locked shell is still here, but there are no Markdown steps to render."}</p>${issues.length ? `<small>${escapeHtml(issues[0])}</small>` : ""}</div>`,
        footer: renderTemplateFooter({
          locale,
          backAttributes: { disabled: true },
          primaryLabel: locale === "ar" ? "لا يوجد محتوى" : "NO CONTENT",
          primaryAttributes: { disabled: true },
        }),
        showScrollIndicator: false,
        locale,
      },
    )}</article>`;
  };

  const renderSource = () => {
    window.clearTimeout(renderTimer);
    destroyFlow();
    destroyFlow = () => {};
    restoreChrome();
    const source = input.value;
    const compiled = compileLessonMarkdown(source);
    count.textContent =
      locale === "ar"
        ? `${source.length.toLocaleString("ar")} حرفًا`
        : `${source.length.toLocaleString()} CHARACTERS`;
    state.textContent =
      locale === "ar"
        ? `${compiled.steps.length.toLocaleString("ar")} خطوة${compiled.issues.length ? ` · ${compiled.issues.length.toLocaleString("ar")} مشكلة` : ""}`
        : `${compiled.steps.length} ${compiled.steps.length === 1 ? "STEP" : "STEPS"}${compiled.issues.length ? ` · ${compiled.issues.length} ISSUES` : ""}`;
    if (compiled.steps.length === 0) {
      renderEmptySource(compiled.issues);
      return;
    }
    const runtimeOptions = edited
      ? {
          ...options,
          progress: { completedStepIds: [], completedAt: null },
          onProgress: () => {},
        }
      : options;
    destroyFlow = renderAuthoredInteractiveLesson(
      container,
      day,
      lesson,
      compiled.parsed.steps,
      { ...runtimeOptions, mode: "developer" },
    );
  };

  const setPanelOpen = (open) => {
    sourcePanel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("lesson-markdown-source-open", open);
    if (open) input.focus({ preventScroll: true });
    else toggle.focus({ preventScroll: true });
  };
  toggle.addEventListener("click", () => setPanelOpen(sourcePanel.hidden), {
    signal,
  });
  sourcePanel
    .querySelector("[data-close-lesson-markdown]")
    .addEventListener("click", () => setPanelOpen(false), { signal });
  input.addEventListener(
    "input",
    () => {
      edited = true;
      window.clearTimeout(renderTimer);
      renderTimer = window.setTimeout(renderSource, 120);
    },
    { signal },
  );
  sourcePanel.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setPanelOpen(false);
    },
    { signal },
  );
  renderSource();

  return () => {
    window.clearTimeout(renderTimer);
    destroyFlow();
    controller.abort();
    restoreChrome();
    document.body.classList.remove("lesson-markdown-source-open");
    toggle.remove();
    sourcePanel.remove();
  };
}
