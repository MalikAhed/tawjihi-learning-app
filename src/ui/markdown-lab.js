import { trapTabKey } from "./dialog.js";
import { animateView } from "./view-motion.js";
import { applyWeekTheme } from "../app/week-theme.js";
import { COURSE_WEEKS } from "../data/course.js";
import { escapeHtml } from "../lib/dom.js";
import { parseLessonMarkdown } from "../markdown/lesson-authoring.js";
import { mountMarkdownFeatures, renderMarkdownDocument } from "../markdown/renderer.js";
import { renderTemplateFooter, renderTemplateShell } from "./template-shell.js";
import { loadDesignSystem } from "./design-system-loader.js";
import { renderUiLab } from "./ui-lab/index.js";

const STORAGE_KEY = "full-stack-quest:markdown-lab-draft-v3";
const WEEK_OPTIONS = COURSE_WEEKS.map((week, index) => {
  const number = index + 1;
  const label = week.cardLabel.replace(/^Start Week \d+:\s*/, "");
  return `<option value="${number}">الأسبوع ${number}</option>`;
}).join("");

export const SAMPLE_LESSON_MARKDOWN = [
  "# طلبات HTTP",
  "",
  "عندما يطلب المتصفح صفحة، يرسل **طلب HTTP** إلى الخادم. يتضمن طلب [[term: HTTP | البروتوكول الذي تستخدمه المتصفحات والخوادم لتبادل الطلبات والاستجابات.]] طريقة الطلب والمسار.",
  "",
  ":::tip استخدم القالب المشترك",
  "يكتب المؤلف المحتوى، ويتولّى التطبيق عرض التقدّم والتنقل والتباعد ورسائل النتيجة.",
  ":::",
  "",
  "| جزء الطلب | مثال |",
  "| --- | --- |",
  "| الطريقة | `GET` |",
  "| المسار | `/api/users/42` |",
  "",
  "```javascript title=load-user.js highlight=2",
  "const response = await fetch(\"/api/users/42\");",
  "const user = await response.json();",
  "```",
  "",
  "https://www.youtube.com/watch?v=AlkDbnbv7dk",
  "",
  ":::mcq",
  "title: استجابات HTTP",
  "question: ما رمز الحالة الذي يعني أن المورد غير موجود؟",
  "",
  "- [ ] ok | `200 OK`",
  "- [ ] unauthorized | `401 Unauthorized`",
  "- [x] not-found | `404 Not Found`",
  "- [ ] server-error | `500 Internal Server Error`",
  "",
  "explanation: يعني الرمز `404 Not Found` أن المورد المطلوب غير موجود.",
  "hint: ابحث عن رمز الخطأ المستخدم عند غياب المورد المطلوب.",
  ":::",
  "",
  ":::response",
  "title: اشرح بأسلوبك",
  "question: اشرح الفرق بين طلب HTTP واستجابته، ثم أعط مثالًا واحدًا.",
  "rubric:",
  "- ما يرسله العميل",
  "- ما يعيده الخادم",
  "- مثال واقعي واحد",
  "field-label: إجابتك",
  "placeholder: الطلب هو ما يرسله العميل إلى الخادم…",
  "max-length: 420",
  "guide: ابدأ بما يرسله العميل، ثم وضّح ما يعيده الخادم، وأضف مثالًا واقعيًا واحدًا.",
  ":::",
  "",
  "## من النقرة إلى الصفحة",
  "",
  "يمكن جمع الشرح والخطوات التفاعلية في مستند واحد.",
  "",
  ":::sequence",
  "title: رتّب مراحل الطلب",
  "question: ماذا يحدث بعد النقر على رابط؟",
  "mascot: تتبّع الطلب خطوة بخطوة.",
  "",
  "- [3] response | يرسل الخادم استجابة",
  "- [1] click | ينقر المستخدم على رابط",
  "- [4] render | يعرض المتصفح الصفحة",
  "- [2] request | يرسل المتصفح طلبًا",
  "",
  "explanation: تبدأ الرحلة بنقرة، ثم طلب، ثم استجابة، ثم عرض الصفحة.",
  "hint: ابدأ بإجراء المستخدم وانتهِ بعرض المتصفح للصفحة.",
  ":::",
  "",
  ":::fill-blanks",
  "title: أكمل طلب جلب البيانات",
  "question: اختر القيمة المناسبة لكل فراغ في الشيفرة.",
  "code:",
  "```javascript",
  "const response = await fetch([[endpoint]], { method: [[method]] });",
  "```",
  "answers:",
  "- endpoint | \"/api/users\"",
  "- method | \"GET\"",
  "options:",
  "- `\"POST\"`",
  "- `\"/api/users\"`",
  "- `\"GET\"`",
  "- `\"/api/posts\"`",
  "explanation: يرسل المتصفح طلب `GET` إلى `/api/users`.",
  "hint: المسار هو الوسيط الأول، وتُحدّد طريقة الطلب داخل كائن الخيارات.",
  ":::",
  "",
  ":::code-question",
  "title: أنشئ بطاقة مستكشف",
  "instructions:",
  "عدّل ملفات البداية. تتغيّر المعاينة أثناء الكتابة، ويتحقّق التطبيق من النتيجة.",
  "requirements:",
  "- ضع اسم المستكشف داخل عنصر `<h1>`.",
  "- غيّر الاسم إلى `Mira the Explorer` مع الحفاظ على حالة الأحرف.",
  "- أضف خلفية للبطاقة باستخدام `background` أو `background-color`.",
  "html:",
  "```html",
  "<article class=\"explorer-card\">",
  "  <h1>Mira</h1>",
  "  <p>Level 4 · CSS Ranger</p>",
  "</article>",
  "```",
  "css:",
  "```css",
  ".explorer-card {",
  "  padding: 24px;",
  "  border-radius: 16px;",
  "}",
  "```",
  "js:",
  "```javascript",
  "console.log(\"Explorer card ready\");",
  "```",
  "checks:",
  "- html-selector | h1",
  "- file-contains | html | Mira the Explorer | case-sensitive",
  "- css-property | background, background-color",
  ":::",
].join("\n");

function readSavedDraft() {
  try { return sessionStorage.getItem(STORAGE_KEY); } catch { return null; }
}

function saveDraft(markdown) {
  try { sessionStorage.setItem(STORAGE_KEY, markdown); } catch { /* Storage is optional. */ }
}

export function renderMarkdownLab(container) {
  const controller = new AbortController();
  const { signal } = controller;
  const backButton = document.querySelector(".lesson-back");
  const lessonStatus = document.querySelector(".lesson-status");
  const previousBackMarkup = backButton?.innerHTML;
  const previousBackLabel = backButton?.getAttribute("aria-label");
  const previousStatusHtml = lessonStatus?.innerHTML;
  const previousStatusHidden = lessonStatus?.hidden;

  document.body.classList.add("ui-lab-open", "ui-lab-markdown-open");
  backButton.textContent = "×";
  backButton.setAttribute("aria-label", "إغلاق محرّر المحتوى");
  lessonStatus.hidden = true;
  container.innerHTML = `
    <section class="markdown-lab" aria-label="مساحة كتابة الدرس">
      <div class="markdown-settings-layer" data-markdown-settings-layer hidden>
        <section class="markdown-settings-panel" id="markdown-settings-panel" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="markdown-settings-title">
          <header><div><p>كتابة المحتوى · قوالب الدروس</p><h1 id="markdown-settings-title">اكتب المحتوى، ودع القالب ينظّم الواجهة.</h1><span>اكتب المحتوى بصيغة Markdown وأضف الأسئلة. يتولّى التطبيق تنظيم القالب والتنقل والتفاعلات.</span></div><button type="button" data-markdown-settings-close aria-label="إغلاق الإعدادات">×</button></header>
          <div class="markdown-lab-actions">
            <label class="markdown-theme-picker"><span>لون المعاينة</span><select data-markdown-week aria-label="لون معاينة الدرس">${WEEK_OPTIONS}</select></label>
            <button type="button" data-markdown-sample>تحميل المثال الكامل</button><button type="button" data-markdown-clear>مسح</button>
          </div>
          <div class="markdown-settings-features" aria-label="مكوّنات كتابة الدروس"><span>MARKDOWN</span><span>تنبيهات</span><span>مصطلحات</span><span>صور</span><span>YOUTUBE</span><span>اختيار من متعدد</span><span>صح أو خطأ</span><span>إجابة كتابية</span><span>ترتيب</span><span>فراغات</span><span>اكتشاف الخطأ</span><span>محرّر الشيفرة</span><span>معاينة آمنة</span></div>
        </section>
      </div>
      <div class="markdown-lab-tabs" role="tablist" aria-label="عرض مساحة الكتابة">
        <button id="markdown-editor-tab" type="button" role="tab" aria-selected="true" aria-controls="markdown-editor-pane" data-markdown-pane="editor">الكتابة</button>
        <button id="markdown-preview-tab" type="button" role="tab" aria-selected="false" aria-controls="markdown-preview-pane" data-markdown-pane="preview" tabindex="-1">المعاينة</button>
      </div>
      <div class="markdown-lab-workspace" data-active-pane="editor">
        <section class="markdown-lab-pane markdown-lab-editor" id="markdown-editor-pane" role="tabpanel" aria-labelledby="markdown-editor-tab markdown-editor-label">
          <header><strong id="markdown-editor-label">محتوى الدرس</strong><div class="markdown-editor-meta"><span data-markdown-count>٠ حرف</span><button type="button" data-markdown-settings aria-controls="markdown-settings-panel" aria-expanded="false">الإعدادات</button></div></header>
          <textarea data-markdown-input aria-label="مصدر محتوى الدرس" spellcheck="true" placeholder="# عنوان الدرس\n\nاكتب المحتوى، ثم أضف :::mcq وغيرها من أنواع الأسئلة."></textarea>
        </section>
        <section class="markdown-lab-pane markdown-lab-preview" id="markdown-preview-pane" role="tabpanel" aria-labelledby="markdown-preview-tab markdown-preview-label">
          <header><strong id="markdown-preview-label">النتيجة</strong><div class="markdown-preview-modes" role="group" aria-label="شكل المعاينة"><button type="button" class="is-active" data-preview-mode="lesson">الدرس</button><button type="button" data-preview-mode="document">المستند</button><button type="button" data-full-preview aria-pressed="false">صفحة كاملة</button></div><span class="markdown-render-status" data-render-status role="status" aria-live="polite"><i></i>جاهز</span></header>
          <div class="markdown-preview-scroll"><div data-markdown-output></div></div>
        </section>
      </div>
    </section>`;

  const input = container.querySelector("[data-markdown-input]");
  const output = container.querySelector("[data-markdown-output]");
  const count = container.querySelector("[data-markdown-count]");
  const status = container.querySelector("[data-render-status]");
  const workspace = container.querySelector(".markdown-lab-workspace");
  const previewScroll = container.querySelector(".markdown-preview-scroll");
  const paneButtons = [...container.querySelectorAll("[data-markdown-pane]")];
  const modeButtons = [...container.querySelectorAll("[data-preview-mode]")];
  const weekSelect = container.querySelector("[data-markdown-week]");
  let previewMode = "lesson";
  let fullPreview = false;
  let activeStep = 0;
  let renderFrame = 0;
  let destroyStep = () => {};

  const setSettingsOpen = (open) => {
    const layer = container.querySelector("[data-markdown-settings-layer]");
    const toggle = container.querySelector("[data-markdown-settings]");
    layer.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      animateView(layer.querySelector("[role=dialog]"));
      container.querySelector("[data-markdown-settings-close]").focus();
    }
    else toggle.focus({ preventScroll:true });
  };

  const syncFullscreenButtons = () => {
    const toolbarButton = container.querySelector("[data-full-preview]");
    toolbarButton.setAttribute("aria-pressed", String(fullPreview));
    toolbarButton.textContent = fullPreview ? "EXIT FULL PAGE" : "FULL PAGE";
    container.querySelectorAll("[data-rendered-fullscreen]").forEach((button) => {
      button.textContent = fullPreview ? "×" : "⛶";
      button.setAttribute("aria-label", fullPreview ? "إغلاق المعاينة الكاملة" : "فتح المعاينة الكاملة");
      button.setAttribute("aria-pressed", String(fullPreview));
    });
  };

  const setFullPreview = (active) => {
    const wasFullPreview = fullPreview;
    fullPreview = Boolean(active && previewMode === "lesson");
    document.body.classList.toggle("markdown-full-preview-open", fullPreview);
    syncFullscreenButtons();
    if (fullPreview) setActivePane("preview");
    else if (wasFullPreview) setActivePane("editor");
  };

  const setActivePane = (pane, { focus = false } = {}) => {
    workspace.dataset.activePane = pane;
    paneButtons.forEach((button) => {
      const selected = button.dataset.markdownPane === pane;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    });
  };

  const renderLessonStep = (parsed) => {
    activeStep = Math.min(activeStep, parsed.steps.length);
    const complete = activeStep === parsed.steps.length;
    const step = parsed.steps[activeStep];
    const issueMarkup = parsed.issues.length ? `<details class="markdown-authoring-issues"><summary>${parsed.issues.length} authoring ${parsed.issues.length === 1 ? "issue" : "issues"}</summary><ul>${parsed.issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}</ul></details>` : "";
    const progressValue = complete ? parsed.steps.length : activeStep + 1;
    const progressPercent = (progressValue / parsed.steps.length) * 100;
    output.className = "markdown-lesson-preview";
    output.innerHTML = `${issueMarkup}<div class="markdown-rendered-shell"><header class="markdown-rendered-top"><div class="markdown-rendered-progress" role="progressbar" aria-label="تقدّم معاينة الدرس" aria-valuemin="0" aria-valuemax="${parsed.steps.length}" aria-valuenow="${progressValue}"><i style="--rendered-progress:${progressPercent}%"></i></div><button type="button" data-rendered-fullscreen aria-pressed="${fullPreview}" aria-label="${fullPreview ? "إغلاق" : "فتح"} معاينة الدرس بصفحة كاملة">${fullPreview ? "×" : "⛶"}</button></header><div data-authored-step></div></div>`;
    output.querySelector("[data-rendered-fullscreen]").addEventListener("click", () => setFullPreview(!fullPreview), { signal });
    const host = output.querySelector("[data-authored-step]");
    const goBack = () => { if (activeStep > 0) { activeStep -= 1; render(); } };
    const goNext = () => { if (activeStep < parsed.steps.length) { activeStep += 1; render(); } };
    if (complete) {
      host.innerHTML = renderTemplateShell({
        titleId:"authored-preview-complete",
        showScrollIndicator:false,
        content:'<div class="level-lesson-copy ready-lesson-result"><p class="level-layout-kicker">اكتملت المعاينة</p><h1 id="authored-preview-complete">اكتملت جميع خطوات الدرس</h1><p>عُد إلى المصدر لمتابعة الكتابة، أو أعد تشغيل المعاينة.</p></div>',
        footer:renderTemplateFooter({ locale:"ar", backAttributes:{ disabled:false }, primaryLabel:"إعادة المعاينة" }),
      });
      host.querySelector("[data-template-back]").addEventListener("click", goBack, { signal });
      host.querySelector("[data-template-primary]").addEventListener("click", () => { activeStep = 0; render(); }, { signal });
      return;
    }
    if (step.type === "code-question") {
      let disposed = false;
      let destroyCodeQuestion = () => {};
      host.classList.add("lesson-card--design-system", "lesson-card--ui-lab");
      host.innerHTML = '<div class="markdown-empty"><strong>جارٍ تحميل محرّر الشيفرة…</strong></div>';
      destroyStep = () => {
        disposed = true;
        destroyCodeQuestion();
        host.classList.remove("lesson-card--design-system", "lesson-card--ui-lab");
      };
      void loadDesignSystem().then(({ renderDesignSystem }) => {
        if (disposed) return;
        destroyCodeQuestion = renderDesignSystem(host, {
          practiceOnly:true,
          practice:{ ...step.content, locale:"ar" },
          locale:"ar",
          embedded:true,
          onBack:goBack,
          onContinue:goNext,
        });
        host.querySelector("[data-template-back]").disabled = activeStep === 0;
      }).catch((error) => {
        if (disposed) return;
        console.error("The authored code question could not be rendered.", error);
        host.innerHTML = '<div class="markdown-empty markdown-empty--error" role="alert"><strong>تعذّر تحميل محرّر الشيفرة</strong><p>حدّث الصفحة وحاول مرة أخرى.</p></div>';
      });
      return;
    }
    if (step.type !== "markdown") {
      destroyStep = renderUiLab(host, { definition:step, locale:"ar", embedded:true, onBack:goBack, onContinue:goNext });
      host.querySelector("[data-template-back]").disabled = activeStep === 0;
      return;
    }
    const titleId = `authored-markdown-title-${activeStep}`;
    host.innerHTML = renderTemplateShell({
      titleId,
      content:`<article class="level-lesson-copy ready-lesson-copy markdown-authored-content"><p class="level-layout-kicker">درس · شرح</p><h1 class="visually-hidden" id="${titleId}">${escapeHtml(step.title)}</h1><div class="markdown-rendered">${renderMarkdownDocument(step.source)}</div></article>`,
      footer:renderTemplateFooter({ locale:"ar", backAttributes:{ disabled:activeStep === 0 }, primaryLabel:"متابعة" }),
    });
    mountMarkdownFeatures(host, { signal, scrollSurface:previewScroll });
    host.querySelector("[data-template-back]").addEventListener("click", goBack, { signal });
    host.querySelector("[data-template-primary]").addEventListener("click", goNext, { signal });
  };

  const render = () => {
    renderFrame = 0;
    destroyStep();
    destroyStep = () => {};
    const source = input.value;
    count.textContent = `${source.length.toLocaleString()} حرف`;
    saveDraft(source);
    if (!source.trim()) {
      output.className = "";
      output.innerHTML = `<div class="markdown-empty"><strong>مساحة معاينة الدرس جاهزة</strong><p>اكتب المحتوى أو حمّل المثال الكامل.</p></div>`;
      status.innerHTML = "<i></i>بانتظار المحتوى";
      return;
    }
    try {
      const parsed = parseLessonMarkdown(source);
      if (previewMode === "document") {
        output.className = "markdown-rendered";
        output.innerHTML = renderMarkdownDocument(parsed.documentSource);
        mountMarkdownFeatures(output, { signal, scrollSurface:previewScroll });
      } else renderLessonStep(parsed);
      status.innerHTML = `<i></i>${parsed.steps.length} خطوة${parsed.issues.length ? ` · ${parsed.issues.length} ملاحظات` : ""}`;
    } catch (error) {
      console.error("Lesson Markdown could not be rendered.", error);
      output.className = "";
      output.innerHTML = `<div class="markdown-empty markdown-empty--error" role="alert"><strong>تعذّر عرض هذا الدرس</strong><p>راجع صيغة المحتوى وحاول مرة أخرى.</p></div>`;
      status.innerHTML = "<i></i>خطأ";
    }
  };
  const scheduleRender = () => { window.cancelAnimationFrame(renderFrame); renderFrame = window.requestAnimationFrame(render); };

  input.value = readSavedDraft() ?? SAMPLE_LESSON_MARKDOWN;
  weekSelect.value = document.documentElement.dataset.questWeek || "1";
  input.addEventListener("input", () => { activeStep = 0; scheduleRender(); }, { signal });
  container.querySelector("[data-markdown-sample]").addEventListener("click", () => { input.value = SAMPLE_LESSON_MARKDOWN; activeStep = 0; setSettingsOpen(false); scheduleRender(); input.focus(); }, { signal });
  container.querySelector("[data-markdown-clear]").addEventListener("click", () => { input.value = ""; activeStep = 0; setSettingsOpen(false); scheduleRender(); input.focus(); }, { signal });
  container.querySelector("[data-markdown-settings]").addEventListener("click", () => setSettingsOpen(true), { signal });
  container.querySelector("[data-markdown-settings-close]").addEventListener("click", () => setSettingsOpen(false), { signal });
  container.querySelector("[data-markdown-settings-layer]").addEventListener("click", (event) => { if (event.target === event.currentTarget) setSettingsOpen(false); }, { signal });
  container.addEventListener("keydown", (event) => {
    if (!container.querySelector("[data-markdown-settings-layer]").hidden && trapTabKey(event, container.querySelector("#markdown-settings-panel"))) return;
    if (event.key === "Escape" && !container.querySelector("[data-markdown-settings-layer]").hidden) { event.preventDefault(); setSettingsOpen(false); }
    else if (event.key === "Escape" && fullPreview) { event.preventDefault(); setFullPreview(false); }
  }, { signal });
  modeButtons.forEach((button) => button.addEventListener("click", () => {
    previewMode = button.dataset.previewMode;
    if (previewMode !== "lesson") setFullPreview(false);
    container.querySelector("[data-full-preview]").hidden = previewMode !== "lesson";
    modeButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
    render();
  }, { signal }));
  container.querySelector("[data-full-preview]").addEventListener("click", () => setFullPreview(!fullPreview), { signal });
  paneButtons.forEach((button) => button.addEventListener("click", () => setActivePane(button.dataset.markdownPane), { signal }));
  container.querySelector(".markdown-lab-tabs").addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const currentIndex = paneButtons.indexOf(event.target.closest("[data-markdown-pane]"));
    if (currentIndex < 0) return;
    event.preventDefault();
    let nextIndex = event.key === "Home" ? 0 : paneButtons.length - 1;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + paneButtons.length) % paneButtons.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % paneButtons.length;
    setActivePane(paneButtons[nextIndex].dataset.markdownPane, { focus:true });
  }, { signal });
  weekSelect.addEventListener("change", () => applyWeekTheme(Number(weekSelect.value)), { signal });
  render();

  return () => {
    window.cancelAnimationFrame(renderFrame);
    destroyStep();
    controller.abort();
    document.body.classList.remove("markdown-full-preview-open", "ui-lab-markdown-open", "ui-lab-open");
    backButton.innerHTML = previousBackMarkup;
    if (previousBackLabel === null) backButton.removeAttribute("aria-label"); else backButton.setAttribute("aria-label", previousBackLabel);
    lessonStatus.innerHTML = previousStatusHtml;
    lessonStatus.hidden = previousStatusHidden;
  };
}
