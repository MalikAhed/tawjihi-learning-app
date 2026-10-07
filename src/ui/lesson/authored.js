import { animateView } from "../view-motion.js";
import {
  renderSubjectStreak,
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
  mountTemplateContentZoom,
  mountTemplateScrollIndicator,
  renderTemplateFooter,
  renderTemplateShell,
} from "../template-shell.js";
import { renderQuestion } from "./question.js";
import { lessonLocale, lessonReferenceLabel } from "./shared.js";
import { renderRockyDialogue, mountRockyDialogues, playRockyDialogue } from "./rocky-dialogue.js";
import { renderVideoIntro, mountVideoIntro } from "./video-intro.js";
import { mountVideoTour } from "./video-tour.js";
import { enhanceLessonSummary } from "./lesson-summary.js";
import { revealWhenReady, preloadImages } from "../media-ready.js";
import { preloadNextStep } from "./media.js";
import { renderMistakeReviewIntro } from "./mistake-review.js";
import { renderExamQuestion } from "./exam-question.js";

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
    getCompletionOutcome,
    onExitLesson,
    onFinishLesson,
  } = options;
  const controller = new AbortController();
  const { signal } = controller;
  const reference = lessonReferenceLabel(day);
  const locale = lessonLocale(lesson);
  const copy = getLessonUiCopy(locale);
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
  // Keep published IDs and source indexes stable while presenting adjacent teaching
  // steps on one screen, including old resumes saved between the two steps.
  const inlineSummaryAt = (index) => authoredSteps[index]?.presentation === "video-intro"
    && authoredSteps[index + 1]?.presentation === "lesson-summary"
    ? authoredSteps[index + 1] : null;
  const visibleIndex = (index) => inlineSummaryAt(index - 1) ? index - 1 : index;
  const completed = new Set(
    (progress?.completedStepIds || []).filter((id) => stepIds.has(id)),
  );
  let currentIndex = Math.max(
    0,
    authoredSteps.findIndex((step) => !completed.has(step.id)),
  );
  const reviewTargetIndex = reviewStepId ? authoredSteps.findIndex((step) => step.id === reviewStepId) : -1;
  let reviewOpeningIndex = -1;
  if (reviewTargetIndex >= 0) {
    currentIndex = reviewTargetIndex;
    for (let index = reviewTargetIndex - 1; index >= 0; index -= 1) {
      if (authoredSteps[index].type === "markdown") {
        reviewOpeningIndex = visibleIndex(index);
        currentIndex = reviewOpeningIndex;
        break;
      }
    }
  }
  let resultVisible =
    Boolean(progress?.completedAt) &&
    authoredSteps.every((step) => completed.has(step.id));
  const videoTourIndex = reviewStepId ? -1
    : authoredSteps.findIndex(step => step.id === "database-management-mission");
  // Show the guide independently of lesson progress, then restore the saved place.
  const tourResume = videoTourIndex >= 0 ? { index:visibleIndex(currentIndex), resultVisible } : null;
  if (tourResume) {
    currentIndex = videoTourIndex;
    resultVisible = false;
  }
  let destroyStep = () => {};
  let renderedStep = false;
  let videoTourShown = false;
  let activeStarted = document.hidden ? null : performance.now();
  let activeElapsedMs = 0;
  const pauseLessonClock = () => {
    if (activeStarted !== null) activeElapsedMs += performance.now() - activeStarted;
    activeStarted = null;
  };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseLessonClock();
    else if (!resultVisible && activeStarted === null) activeStarted = performance.now();
  }, { signal });
  let answerCount = 0;
  let correctCount = 0;
  let answerRun = 0;
  let bestAnswerRun = 0;
  let sessionElapsed = null;
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
    onProgress?.({ completedStepIds: [...completed], isComplete });
  const focusHost = () =>
    window.requestAnimationFrame(() => {
      if (signal.aborted) return;
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
  const renderResult = async () => {
    container.classList.remove("lesson-card--instant-entry");
    if (sessionElapsed === null && !resultVisible) {
      pauseLessonClock();
      sessionElapsed = Math.floor(activeElapsedMs / 1000);
    }
    resultVisible = true;
    {
      authoredSteps.forEach((step) => completed.add(step.id));
      const saving = announce(true);
      if (saving?.then) {
        destroyStep(); destroyStep=()=>{};
        container.innerHTML='<p class="app-loading" role="status">جارٍ حفظ تقدّمك…</p>';
        await saving;
        if(signal.aborted) return;
      }
    }
    const outcome = { ...getCompletionOutcome?.(), accuracy: answerCount ? Math.round(correctCount / answerCount * 100) : null, perfect:answerCount > 0 && correctCount === answerCount, answerCount, bestAnswerRun, elapsedSeconds: sessionElapsed };
    destroyStep();
    destroyStep = () => {};
    let completionStep = 0;
    const renderCompletionStep = () => {
      destroyStep();
      const subjectContent =
        isLessonPart && outcome
          ? completionStep === 0
            ? renderSubjectCompletion(reference, outcome)
            : renderSubjectStreak(outcome)
          : null;
      const primaryLabel = completionStep === 0 ? "متابعة" : "العودة لخريطة الدروس";
      const content =
        isLessonPart && outcome
          ? subjectContent
          : `<div class="level-lesson-copy ready-lesson-result"><p class="level-layout-kicker">${locale === "ar" ? "اكتمل الدرس" : "LESSON COMPLETE"}</p><h1 id="authored-lesson-complete-title">${locale === "ar" ? `أكملت ${escapeHtml(reference)}` : `You completed ${escapeHtml(reference)}`}</h1><p>${locale === "ar" ? "أنهيت هذا الدرس وخطواته التفاعلية." : "You completed this lesson and its interactive steps."}</p></div>`;
      container.innerHTML = `<article class="lesson-flow ready-lesson-flow"><section class="ready-lesson-stage" data-live-authored-step tabindex="-1" data-completion-step="${completionStep}">${renderTemplateShell(
        {
          titleId: "authored-lesson-complete-title",
          content,
          footer: renderTemplateFooter({
            locale,
            showShortcut: !isLessonPart,
            backLabel: isLessonPart
              ? "رجوع"
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
            currentIndex = 0;
            renderCurrent();
            return;
          }
          if (completionStep > 0) {
            completionStep -= 1;
            renderCompletionStep();
            return;
          }
          resultVisible = false;
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
          if (completionStep < 1) {
            completionStep += 1;
            renderCompletionStep();
            return;
          }
          (onFinishLesson || onExitLesson)?.();
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
    currentIndex = currentIndex === reviewTargetIndex && reviewOpeningIndex >= 0
      ? reviewOpeningIndex : visibleIndex(currentIndex - 1);
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
      onReviewComplete?.();
      return;
    }
    completed.add(authoredSteps[currentIndex].id);
    const inlineSummary = inlineSummaryAt(currentIndex);
    if (inlineSummary) completed.add(inlineSummary.id);
    const nextIndex = currentIndex === reviewOpeningIndex
      ? reviewTargetIndex : currentIndex + (inlineSummary ? 2 : 1);
    if (nextIndex >= authoredSteps.length) {
      finishQuestions();
      return;
    }
    announce(false);
    currentIndex = nextIndex;
    renderCurrent();
  };
  const renderCurrent = () => {
    destroyStep();
    destroyStep = () => {};
    const instantEntry = !renderedStep && isLessonPart;
    renderedStep = true;
    container.classList.toggle("lesson-card--instant-entry", instantEntry);
    currentIndex = visibleIndex(currentIndex);
    const step = authoredSteps[currentIndex];
    const inlineSummary = inlineSummaryAt(currentIndex);
    if (currentIndex >= authoredSteps.length - 2) preloadCompletionMedia();
    container.innerHTML =
      '<article class="lesson-flow ready-lesson-flow"><section class="ready-lesson-stage" data-live-authored-step tabindex="-1"></section></article>';
    const host = container.querySelector("[data-live-authored-step]");
    host.dataset.lessonStep = step.id;
    if (reviewIndex >= 0) host.dataset.mistakeReview = "";
    if (step.presentation) host.dataset.lessonPresentation = step.presentation;
    host.lang = locale;
    host.dir = locale === "ar" ? "rtl" : "ltr";
    if (!instantEntry) animateView(container);
    updateProgress();
    if (step.type === "markdown") {
      const stepController = new AbortController();
      const titleId = `authored-lesson-title-${step.id}`;
      const canExitOpening = currentIndex === 0 && ["video-intro", "rocky-dialogue"].includes(step.presentation);
      host.innerHTML = renderTemplateShell({
        titleId,
        showScrollIndicator: step.presentation !== "video-intro",
        content: step.presentation === "rocky-dialogue"
          ? renderRockyDialogue(step, { titleId, locale })
          : step.presentation === "video-intro"
            ? renderVideoIntro(step, { titleId, locale, summaryStep: inlineSummary })
            : `<article class="level-lesson-copy ready-lesson-copy markdown-authored-content">${step.presentation === "lesson-summary" ? "" : `<p class="level-layout-kicker">${locale === "ar" ? "تعلّم" : "LEARN"}</p>`}<div class="markdown-rendered">${renderMarkdownDocument(step.source, { locale })}</div></article>`,
        footer: renderTemplateFooter({
          locale,
          showShortcut: step.presentation !== "video-intro",
          backLabel: step.presentation === "video-intro" || canExitOpening
            ? (locale === "ar" ? "رجوع" : "BACK")
            : undefined,
          backAttributes: {
            disabled: currentIndex === 0 && !canExitOpening,
            hidden: currentIndex === 0 && !canExitOpening,
          },
          primaryLabel: step.presentation === "video-intro"
            ? inlineSummary
              ? (locale === "ar" ? "ابدأ الأسئلة" : "START QUESTIONS")
              : copy.continue
            : authoredSteps[currentIndex + 1]?.type !== "markdown"
              ? (locale === "ar" ? "ابدأ الأسئلة" : "START QUESTIONS")
              : copy.continue,
        }),
        locale,
      });
      const renderedHeading = step.presentation !== "video-intro" && host.querySelector(".markdown-authored-content h1");
      if (renderedHeading) renderedHeading.id = titleId;
      else if (step.presentation !== "video-intro")
        host
          .querySelector(".markdown-authored-content")
          ?.insertAdjacentHTML(
            "afterbegin",
            `<h1 class="visually-hidden" id="${escapeHtml(titleId)}">${escapeHtml(step.title)}</h1>`,
          );
      if (step.presentation === "lesson-summary") {
        enhanceLessonSummary(host, { titleId, locale, signal: stepController.signal });
      }
      if (inlineSummary) {
        const summaryHost = host.querySelector("[data-inline-summary-step]");
        enhanceLessonSummary(summaryHost, { titleId: `${titleId}-summary`, locale, signal: stepController.signal });
      }
      if (step.presentation === "video-intro") {
        mountVideoIntro(host, { signal: stepController.signal, locale });
      }
      mountMarkdownFeatures(host, {
        locale,
        signal: stepController.signal,
        scrollSurface: host.querySelector(".level-layout-task"),
      });
      mountTemplateScrollIndicator(host, { signal:stepController.signal });
      mountRockyDialogues(container, stepController.signal);
      revealWhenReady(host, {
        signal: stepController.signal,
        animate:!instantEntry,
        onReady() {
          playRockyDialogue(container, host, stepController.signal);
          preloadNextStep(authoredSteps[currentIndex + (inlineSummary ? 2 : 1)]);
          preloadImages(["assets/mascot/rocky-standing-still.svg"]);
          focusHost();
          if (currentIndex === videoTourIndex && !videoTourShown) {
            videoTourShown = true;
            void Promise.allSettled(host.getAnimations().map(animation => animation.finished)).then(() => {
              if (stepController.signal.aborted) return;
              const shouldResume = tourResume.index !== videoTourIndex || tourResume.resultVisible;
              mountVideoTour(host, {
                signal:stepController.signal, locale,
                finishLabel:shouldResume ? (locale === "ar" ? "متابعة الدرس" : "Resume lesson") : undefined,
                onFinish() {
                  if (!shouldResume) return;
                  currentIndex = tourResume.index;
                  resultVisible = tourResume.resultVisible;
                  if (resultVisible) void renderResult();
                  else renderCurrent();
                },
              });
            });
          }
        },
      });
      host
        .querySelector("[data-template-back]")
        .addEventListener("click", canExitOpening ? exitFromOpening : goBack, { signal: stepController.signal });
      host
        .querySelector("[data-template-primary]")
        .addEventListener("click", goNext, { signal: stepController.signal });
      destroyStep = () => stepController.abort();
      return;
    }
    if (step.type === "exam-question") {
      const examController = new AbortController();
      const destroyExam = renderExamQuestion(host, step, { locale, onBack:goBack, onContinue:goNext });
      const back = host.querySelector("[data-template-back]");
      back.disabled = currentIndex === 0;
      back.hidden = currentIndex === 0;
      const stopReadiness = revealWhenReady(host, { signal:examController.signal, animate:!instantEntry, onReady:focusHost });
      destroyStep = () => { examController.abort(); stopReadiness(); destroyExam(); };
      return;
    }
    const questionController = new AbortController();
    const destroyQuestion = renderQuestion(host, {
      definition: step,
      onBack: goBack,
      onContinue: goNext,
      onAnswer: (result) => {
        if (reviewIndex < 0 && !result.correct) mistakes.add(step.id);
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
    revealWhenReady(host.querySelector(".level-layout-task"), { signal:questionController.signal, animate:!instantEntry });
    destroyStep = () => { questionController.abort(); destroyQuestion(); };
    const stepBackButton = host.querySelector("[data-template-back]");
    stepBackButton.disabled = currentIndex === 0 || reviewIndex >= 0;
    stepBackButton.hidden = currentIndex === 0 || reviewIndex >= 0;
    focusHost();
  };

  mountTemplateEnterShortcut(container, { signal });
  mountTemplateContentZoom(container, { signal });
  if (resultVisible) renderResult();
  else renderCurrent();
  return () => {
    shell.classList.remove("lesson-shell--completion");
    shell.classList.remove("lesson-shell--pre-quiz");
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
      "lesson-card--instant-entry",
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
