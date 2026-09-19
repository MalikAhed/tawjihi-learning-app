import { animateView } from "../view-motion.js";
import {
  renderSubjectStreak,
  renderSubjectQuests,
  renderSubjectCompletion,
  animateSubjectCompletion,
  preloadCompletionMedia,
} from "../subject-completion.js";
import { escapeHtml } from "../../lib/dom.js";
import {
  mountMarkdownFeatures,
  renderMarkdownDocument,
} from "../../markdown/renderer.js";
import { getLessonUiCopy } from "../lesson-ui-copy.js";
import {
  mountTemplateEnterShortcut,
  renderTemplateFooter,
  renderTemplateShell,
} from "../template-shell.js";
import { loadDesignSystem } from "../design-system-loader.js";
import { renderUiLab } from "../ui-lab/index.js";
import { lessonLocale, lessonReferenceLabel } from "./shared.js";
import { renderRockyDialogue, mountRockyDialogues, playRockyDialogue } from "./rocky-dialogue.js";
import { renderVideoIntro } from "./video-intro.js";
import { enhanceLessonSummary } from "./lesson-summary.js";
import { revealWhenReady, preloadImages } from "../media-ready.js";
import { preloadNextStep } from "./media.js";
import { mountQuestionRocky } from "./question-rocky.js";
import { renderMistakeReviewIntro } from "./mistake-review.js";

/** @param {import("../lesson-view.js").LessonOptions} [options] @returns {import("../../app/view-lifecycle.js").Cleanup} */
export function renderAuthoredInteractiveLesson(
  container,
  day,
  lesson,
  authoredSteps,
  options = {},
) {
  const {
    progress,
    onProgress,
    isLessonPart = false,
    onAnswer,
    reviewStepId,
    onReviewComplete,
    allowTestPass = false,
    getCompletionOutcome,
    onExitLesson,
    mode = "learner",
  } = options;
  const controller = new AbortController();
  const { signal } = controller;
  const reference = lessonReferenceLabel(day);
  const locale = lessonLocale(lesson);
  const copy = getLessonUiCopy(locale);
  const isPreview = mode !== "learner";
  const shell = container.closest(".lesson-shell") || container;
  const backButton = shell.querySelector(".lesson-back");
  const topProgress = shell.querySelector(".lesson-top-title");
  const lessonStatus = shell.querySelector(".lesson-status");
  const previousChrome = {
    backMarkup: backButton?.innerHTML,
    backLabel: backButton?.getAttribute("aria-label"),
    statusHidden: lessonStatus?.hidden,
    progressHidden: topProgress?.hidden,
    progressRole: topProgress?.getAttribute("role"),
    progressLabel: topProgress?.getAttribute("aria-label"),
  };
  const stepIds = new Set(authoredSteps.map((step) => step.id));
  const questionSteps = authoredSteps.filter((step) => step.type !== "markdown");
  const completed = new Set(
    (progress?.completedStepIds || []).filter((id) => stepIds.has(id)),
  );
  let currentIndex = Math.max(
    0,
    authoredSteps.findIndex((step) => !completed.has(step.id)),
  );
  if (reviewStepId) {
    const target = authoredSteps.findIndex((step) => step.id === reviewStepId);
    if (target >= 0) {
      currentIndex = target;
      for (let index = target - 1; index >= 0; index -= 1) {
        if (authoredSteps[index].type === "markdown") {
          currentIndex = index;
          break;
        }
      }
    }
  }
  let resultVisible =
    Boolean(progress?.completedAt) &&
    authoredSteps.every((step) => completed.has(step.id));
  let destroyStep = () => {};
  const sessionStarted = performance.now();
  let answerCount = 0;
  let correctCount = 0;
  let answerRun = 0;
  let bestAnswerRun = 0;
  let sessionElapsed = null;
  let developerSkipped = false;
  const mistakes = new Set((progress?.mistakeStepIds || []).filter((id) => stepIds.has(id)));
  const scoredQuestions = new Set();
  let reviewQueue = [];
  let reviewIndex = -1;

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
    locale === "ar" ? `تقدّم درس ${lesson.title}` : `${lesson.title} progress`,
  );
  topProgress.setAttribute("aria-valuemin", "0");
  topProgress.setAttribute("aria-valuemax", String(questionSteps.length));

  const announce = (isComplete = false) =>
    !isPreview && !developerSkipped && onProgress?.({ completedStepIds: [...completed], isComplete });
  const focusHost = () =>
    window.requestAnimationFrame(() => {
      if (signal.aborted || document.body.classList.contains("lesson-markdown-source-open"))
        return;
      const host = container.querySelector("[data-live-authored-step]");
      if (host?.contains(document.activeElement)) return;
      host?.focus({ preventScroll: true });
    });
  const updateProgress = () => {
    shell.classList.toggle(
      "lesson-shell--completion",
      isLessonPart && resultVisible,
    );
    const currentStep = authoredSteps[currentIndex];
    const questionIndex = questionSteps.indexOf(currentStep);
    const showingQuestion = !resultVisible && questionIndex >= 0;
    shell.classList.toggle("lesson-shell--pre-quiz", !resultVisible && !showingQuestion);
    topProgress.hidden = resultVisible || !showingQuestion;
    const reviewing = reviewIndex >= 0;
    const total = reviewing ? reviewQueue.length : questionSteps.length;
    const value = resultVisible ? total : reviewing ? reviewIndex + 1 : Math.max(0, questionIndex + 1);
    topProgress.setAttribute("aria-valuemax", String(total));
    topProgress.setAttribute("aria-label", reviewing ? (locale === "ar" ? "مراجعة الأخطاء" : "Mistake review") : (locale === "ar" ? `تقدّم درس ${lesson.title}` : `${lesson.title} progress`));
    topProgress.setAttribute("aria-valuenow", String(value));
    shell.style.setProperty(
      "--lesson-progress",
      `${total ? (value / total) * 100 : 0}%`,
    );
    document.body.classList.toggle(
      "ui-lab-mcq-open",
      !resultVisible && authoredSteps[currentIndex]?.type === "mcq",
    );
  };
  const testPass =
    isPreview && allowTestPass && !reviewStepId
      ? document.createElement("button")
      : null;
  if (testPass) {
    testPass.type = "button";
    testPass.className = "lesson-test-pass";
    testPass.textContent = locale === "ar" ? "معاينة النهاية دون حفظ" : "Preview ending without saving";
    testPass.setAttribute(
      "aria-label",
      "معاينة حركة نهاية الدرس دون حفظ إنجاز",
    );
    testPass.dataset.testLessonPass = "";
    container.before(testPass);
    testPass.addEventListener("click", () => renderResult(true), { signal });
  }
  const renderResult = async (preview = false) => {
    if (sessionElapsed === null && !resultVisible) sessionElapsed = Math.floor((performance.now() - sessionStarted) / 1000);
    preview = preview || isPreview || developerSkipped;
    resultVisible = true;
    if (testPass) testPass.hidden = true;
    if (!preview) {
      authoredSteps.forEach((step) => completed.add(step.id));
      const saving = announce(true);
      if (saving?.then) {
        destroyStep(); destroyStep=()=>{};
        container.innerHTML='<p class="app-loading" role="status">جارٍ حفظ تقدّمك…</p>';
        await saving;
        if(signal.aborted) return;
      }
    }
    const outcome = preview
      ? { ...(getCompletionOutcome?.(true) || {}), xpGain: 0, preview: true }
      : { ...getCompletionOutcome?.(false), accuracy: answerCount ? Math.round(correctCount / answerCount * 100) : null, perfect:answerCount > 0 && correctCount === answerCount, answerCount, bestAnswerRun, elapsedSeconds: sessionElapsed };
    destroyStep();
    destroyStep = () => {};
    let completionStep = 0;
    const renderCompletionStep = () => {
      destroyStep();
      const subjectContent =
        isLessonPart && outcome
          ? completionStep === 0
            ? renderSubjectCompletion(reference, outcome)
            : completionStep === 1 ? renderSubjectStreak(outcome) : renderSubjectQuests(outcome)
          : null;
      const primaryLabel = completionStep === 0 ? "متابعة" : completionStep === 1 ? "عرض المهام" : "العودة للمسار";
      const content =
        isLessonPart && outcome
          ? subjectContent
          : `<div class="level-lesson-copy ready-lesson-result"><p class="level-layout-kicker">${preview ? copy.preview : locale === "ar" ? "اكتمل الدرس" : "LESSON COMPLETE"}</p><h1 id="authored-lesson-complete-title">${locale === "ar" ? `أكملت ${escapeHtml(reference)}` : `You completed ${escapeHtml(reference)}`}</h1><p>${preview ? copy.previewUnsaved : locale === "ar" ? "أنهيت هذا الدرس وخطواته التفاعلية." : "You completed this lesson and its interactive steps."}</p></div>`;
      container.innerHTML = `<article class="lesson-flow ready-lesson-flow"><section class="ready-lesson-stage" data-live-authored-step tabindex="-1" data-completion-step="${completionStep}">${renderTemplateShell(
        {
          titleId: "authored-lesson-complete-title",
          content,
          footer: renderTemplateFooter({
            locale,
            showShortcut: !isLessonPart,
            backLabel: isLessonPart
              ? "رجوع"
              : preview
                ? "العودة للدرس"
                : locale === "ar"
                  ? "مراجعة الدرس"
                  : "REVIEW LESSON",
            backAttributes: {
              "data-authored-review": true,
              hidden: false,
            },
            primaryLabel: isLessonPart
              ? primaryLabel
              : locale === "ar"
                ? "إعادة الدرس"
                : "RESTART",
            primaryAttributes: { "data-authored-restart": true },
          }),
          showScrollIndicator: false,
          locale,
        },
      )}</section></article>`;
      const secondary = container.querySelector("[data-authored-review]");
      secondary.addEventListener(
        "click",
        () => {
          if (!isLessonPart) {
            resultVisible = false;
            reviewIndex = -1;
            if (!preview) currentIndex = 0;
            if (testPass) testPass.hidden = false;
            renderCurrent();
            return;
          }
          if (completionStep > 0) {
            completionStep -= 1;
            renderCompletionStep();
            return;
          }
          resultVisible = false;
          if (testPass) testPass.hidden = false;
          renderCurrent();
        },
        { signal },
      );
      container.querySelector("[data-authored-restart]").addEventListener(
        "click",
        () => {
          if (!isLessonPart) {
            completed.clear();
            mistakes.clear();
            scoredQuestions.clear();
            reviewQueue = [];
            reviewIndex = -1;
            resultVisible = false;
            currentIndex = 0;
            announce(false);
            renderCurrent();
            return;
          }
          if (completionStep < 2) {
            completionStep += 1;
            renderCompletionStep();
            return;
          }
          onExitLesson?.();
        },
        { signal },
      );
      let stopAnimation = () => {};
      const stopReadiness = revealWhenReady(container, {
        signal,
        onReady() {
          stopAnimation =
            isLessonPart && outcome
              ? animateSubjectCompletion(container)
              : () => {};
          focusHost();
        },
      });
      destroyStep = () => {
        stopReadiness();
        stopAnimation();
      };
      updateProgress();
    };
    renderCompletionStep();
  };
  const goBack = () => {
    if (reviewIndex >= 0) return;
    if (currentIndex === 0) return;
    currentIndex -= 1;
    renderCurrent();
  };
  const exitFromOpening = () => {
    if (onExitLesson) onExitLesson();
    else backButton?.click();
  };
  const finishQuestions = () => {
    reviewQueue = authoredSteps.filter((step) => step.type === "mcq" && mistakes.has(step.id));
    if (!reviewQueue.length || reviewStepId) { void renderResult(); return; }
    destroyStep();
    topProgress.hidden = true;
    document.body.classList.remove("ui-lab-mcq-open");
    destroyStep = renderMistakeReviewIntro(container, { locale, onContinue() {
      reviewIndex = 0;
      currentIndex = authoredSteps.indexOf(reviewQueue[0]);
      renderCurrent();
    } });
  };
  const goNext = () => {
    if (reviewIndex >= 0) {
      if (reviewIndex + 1 === reviewQueue.length) { void renderResult(); return; }
      reviewIndex += 1;
      currentIndex = authoredSteps.indexOf(reviewQueue[reviewIndex]);
      renderCurrent();
      return;
    }
    if (reviewStepId === authoredSteps[currentIndex].id) {
      if (!isPreview && !developerSkipped) onReviewComplete?.();
      return;
    }
    completed.add(authoredSteps[currentIndex].id);
    if (currentIndex === authoredSteps.length - 1) {
      finishQuestions();
      return;
    }
    announce(false);
    currentIndex += 1;
    renderCurrent();
  };
  const renderCurrent = () => {
    destroyStep();
    destroyStep = () => {};
    const step = authoredSteps[currentIndex];
    if (currentIndex >= authoredSteps.length - 2) preloadCompletionMedia();
    container.innerHTML =
      '<article class="lesson-flow ready-lesson-flow"><section class="ready-lesson-stage" data-live-authored-step tabindex="-1"></section></article>';
    const host = container.querySelector("[data-live-authored-step]");
    host.dataset.lessonStep = step.id;
    if (reviewIndex >= 0) host.dataset.mistakeReview = "";
    if (step.presentation) host.dataset.lessonPresentation = step.presentation;
    host.lang = locale;
    host.dir = locale === "ar" ? "rtl" : "ltr";
    animateView(container);
    updateProgress();
    if (step.type === "markdown") {
      const stepController = new AbortController();
      const titleId = `authored-lesson-title-${step.id}`;
      host.innerHTML = renderTemplateShell({
        titleId,
        showScrollIndicator: step.presentation !== "video-intro",
        content: step.presentation === "rocky-dialogue"
          ? renderRockyDialogue(step, { titleId, locale })
          : step.presentation === "video-intro"
            ? renderVideoIntro(step, { titleId, locale })
            : `<article class="level-lesson-copy ready-lesson-copy markdown-authored-content">${step.presentation === "lesson-summary" ? "" : `<p class="level-layout-kicker">${locale === "ar" ? "تعلّم" : "LEARN"}</p>`}<div class="markdown-rendered">${renderMarkdownDocument(step.source, { locale })}</div></article>`,
        footer: renderTemplateFooter({
          locale,
          showShortcut: step.presentation !== "video-intro",
          backLabel: step.presentation === "video-intro"
            ? (locale === "ar" ? "رجوع" : "BACK")
            : undefined,
          backAttributes: {
            disabled: currentIndex === 0 && step.presentation !== "video-intro",
            hidden: currentIndex === 0 && step.presentation !== "video-intro",
          },
          primaryLabel: step.presentation === "video-intro"
            ? (locale === "ar" ? "متابعة" : "RESUME")
            : authoredSteps[currentIndex + 1]?.type !== "markdown"
              ? (locale === "ar" ? "ابدأ الأسئلة" : "START QUESTIONS")
              : copy.continue,
        }),
        locale,
      });
      const renderedHeading = host.querySelector(".markdown-authored-content h1");
      if (renderedHeading) renderedHeading.id = titleId;
      else
        host
          .querySelector(".markdown-authored-content")
          ?.insertAdjacentHTML(
            "afterbegin",
            `<h1 class="visually-hidden" id="${escapeHtml(titleId)}">${escapeHtml(step.title)}</h1>`,
          );
      if (step.presentation === "lesson-summary") {
        enhanceLessonSummary(host, { titleId, stepId: step.id });
      }
      mountMarkdownFeatures(host, {
        locale,
        signal: stepController.signal,
        scrollSurface: host.querySelector(".level-layout-task"),
      });
      mountRockyDialogues(container, stepController.signal);
      revealWhenReady(host, {
        signal: stepController.signal,
        onReady() {
          playRockyDialogue(container, host, stepController.signal);
          preloadNextStep(authoredSteps[currentIndex + 1]);
          preloadImages(["assets/mascot/rocky-standing-still.svg"]);
          focusHost();
        },
      });
      host
        .querySelector("[data-template-back]")
        .addEventListener("click", currentIndex === 0 && step.presentation === "video-intro" ? exitFromOpening : goBack, { signal: stepController.signal });
      host
        .querySelector("[data-template-primary]")
        .addEventListener("click", goNext, { signal: stepController.signal });
      destroyStep = () => stepController.abort();
      return;
    }
    if (step.type === "code-question") {
      let disposed = false;
      let destroyCode = () => {};
      host.classList.add("lesson-card--design-system", "lesson-card--ui-lab");
      host.innerHTML =
        `<div class="markdown-empty" role="status"><strong>${copy.loadingCodeEditor}</strong></div>`;
      destroyStep = () => {
        disposed = true;
        destroyCode();
      };
      void loadDesignSystem()
        .then(({ renderDesignSystem }) => {
          if (disposed) return;
          animateView(container);
          destroyCode = renderDesignSystem(host, {
            practiceOnly: true,
            practice: step.content,
            embedded: true,
            onBack: goBack,
            onContinue: goNext,
          });
          const stepBackButton = host.querySelector("[data-template-back]");
          stepBackButton.disabled = currentIndex === 0;
          stepBackButton.hidden = currentIndex === 0;
          focusHost();
        })
        .catch((error) => {
          if (disposed) return;
          console.error("The lesson code editor could not load.", error);
          host.innerHTML =
            `<div class="markdown-empty markdown-empty--error" role="alert"><strong>${copy.codeEditorUnavailable}</strong></div>`;
        });
      return;
    }
    const questionController = new AbortController();
    let rocky = { react(_correct) {} };
    const destroyQuestion = renderUiLab(host, {
      definition: step,
      embedded: true,
      onBack: goBack,
      onContinue: goNext,
      onAnswer: (result) => {
        rocky.react(result.correct);
        if (reviewIndex < 0 && !result.correct) mistakes.add(step.id);
        if (isPreview || developerSkipped) return;
        if (reviewIndex < 0 && !scoredQuestions.has(step.id)) {
          scoredQuestions.add(step.id);
          answerCount += 1;
          if (result.correct) correctCount += 1;
          answerRun = result.correct ? answerRun + 1 : 0;
          bestAnswerRun = Math.max(bestAnswerRun, answerRun);
        }
        onAnswer?.({ ...result, stepId: step.id, reviewing: reviewIndex >= 0 });
      },
      locale,
    });
    rocky = mountQuestionRocky(host, {
      signal: questionController.signal,
      locale,
      questionIndex: questionSteps.findIndex((question) => question.id === step.id),
      onSkip() {
        developerSkipped = true;
        if (reviewIndex >= 0) goNext();
        else if (currentIndex === authoredSteps.length - 1) finishQuestions();
        else { currentIndex += 1; renderCurrent(); }
      },
    });
    if (reviewIndex >= 0) {
      const heading = host.querySelector(".ui-lab-mcq > h1");
      if (heading) heading.textContent = locale === "ar" ? "مراجعة الأخطاء" : "Mistake review";
    }
    destroyStep = () => { questionController.abort(); destroyQuestion(); };
    const stepBackButton = host.querySelector("[data-template-back]");
    stepBackButton.disabled = currentIndex === 0 || reviewIndex >= 0;
    stepBackButton.hidden = currentIndex === 0 || reviewIndex >= 0;
    focusHost();
  };

  mountTemplateEnterShortcut(container, { signal });
  if (resultVisible) renderResult();
  else renderCurrent();
  return () => {
    shell.classList.remove("lesson-shell--completion");
    shell.classList.remove("lesson-shell--pre-quiz");
    testPass?.remove();
    destroyStep();
    controller.abort();
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
    backButton.innerHTML = previousChrome.backMarkup;
    if (previousChrome.backLabel === null)
      backButton.removeAttribute("aria-label");
    else backButton.setAttribute("aria-label", previousChrome.backLabel);
    lessonStatus.hidden = previousChrome.statusHidden;
    topProgress.hidden = previousChrome.progressHidden;
    ["aria-valuemin", "aria-valuemax", "aria-valuenow"].forEach((name) =>
      topProgress.removeAttribute(name),
    );
    if (previousChrome.progressRole === null)
      topProgress.removeAttribute("role");
    else topProgress.setAttribute("role", previousChrome.progressRole);
    if (previousChrome.progressLabel === null)
      topProgress.removeAttribute("aria-label");
    else topProgress.setAttribute("aria-label", previousChrome.progressLabel);
  };
}
