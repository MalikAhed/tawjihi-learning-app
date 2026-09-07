import { animateView } from "../view-motion.js";
import { escapeHtml } from "../../lib/dom.js";
import { XP_PER_LESSON } from "../../domain/progression.js";
import { highlightCode } from "../../lib/syntax-highlight.js";
import { renderLessonInline } from "../../markdown/renderer.js";
import {
  mountLessonMarkdown,
  mountLessonVideos,
  renderLessonContent,
} from "../lesson-content.js";
import { renderShipReadyContent } from "../ship-ready-level.js";
import {
  mountTemplateEnterShortcut,
  renderTemplateFooter,
  renderTemplateShell,
} from "../template-shell.js";
import { lessonReferenceLabel } from "./shared.js";
import { mountRockyDialogues, playRockyDialogue } from "./rocky-dialogue.js";
const LESSON_ACTION = Object.freeze({
  CHECK: "check",
  RETRY: "retry",
  CONTINUE: "continue",
});

function renderQuestion(step, titleId) {
  return renderShipReadyContent(
    "mcq",
    {
      kicker: step.tag || "CHECK",
      title: step.title,
      prompt: step.question.prompt,
      answers: step.question.choices.map((choice) => ({
        id: choice.id,
        text: choice.label,
        correct: choice.id === step.question.correctChoiceId,
      })),
    },
    { titleId, answerAttribute: "data-answer" },
  );
}

function renderStep(step, index) {
  const isQuestion = step.type === "question";
  const titleId = `lesson-step-title-${escapeHtml(step.id)}`;
  const content = isQuestion
    ? renderQuestion(step, titleId)
    : `<div class="level-lesson-copy ready-lesson-copy"><header class="ready-lesson-heading"><p class="level-layout-kicker">${escapeHtml(step.tag || "LEARN")}</p><h1 id="${titleId}">${escapeHtml(step.title)}</h1></header>${renderLessonContent(step)}${step.tip ? `<aside class="lesson-tip"><strong>FIELD NOTE</strong><span>${renderLessonInline(step.tip)}</span></aside>` : ""}${step.code ? `<div class="lesson-code"><div><span>${escapeHtml(step.filename || `example.${step.language === "css" ? "css" : "js"}`)}</span><b>${escapeHtml(step.language || "CODE")}</b></div><pre><code class="language-${escapeHtml(step.language || "javascript")}">${escapeHtml(step.code)}</code></pre></div>` : ""}</div>`;
  const footer = renderTemplateFooter({
    feedback: "",
    feedbackClass: isQuestion
      ? "level-feedback lesson-question-feedback"
      : "level-feedback",
    feedbackAttributes: isQuestion
      ? { "data-question-feedback": true, "aria-live": "polite" }
      : {},
    backAttributes: { "data-flow-back": true, disabled: index === 0 },
    primaryLabel: isQuestion ? "CHECK ANSWER" : "CONTINUE",
    primaryAttributes: { "data-flow-next": true, disabled: isQuestion },
  });
  return `<section class="ready-lesson-stage" data-lesson-step="${escapeHtml(step.id)}" ${index === 0 ? "" : "hidden"} tabindex="-1" aria-labelledby="${titleId}">${renderTemplateShell({ content, footer, titleId })}</section>`;
}

/** @param {import("../lesson-view.js").LessonOptions} [options] @returns {import("../../app/view-lifecycle.js").Cleanup} */
export function renderInteractiveLesson(
  container,
  day,
  lesson,
  options = {},
) {
  const { progress, onProgress, mode = "learner" } = options;
  const controller = new AbortController();
  const { signal } = controller;
  const reference = lessonReferenceLabel(day);
  const preview = mode !== "learner";
  const steps = lesson.steps;
  const checkpointStart = steps.findIndex(
    (step) => step.question?.phase === "checkpoint",
  );
  const checkpointSteps = steps.filter(
    (step) => step.question?.phase === "checkpoint",
  );
  const savedStepIds = new Set(
    (progress?.completedStepIds || []).filter((id) =>
      steps.some((step) => step.id === id),
    ),
  );
  let isFinished =
    Boolean(progress?.completedAt) &&
    steps.every((step) => savedStepIds.has(step.id));
  let resultVisible = isFinished;
  let currentIndex = isFinished
    ? steps.length
    : Math.max(
        0,
        steps.findIndex(
          (step) =>
            !savedStepIds.has(step.id) && step.question?.phase !== "checkpoint",
        ),
      );
  if (!isFinished && currentIndex < 0)
    currentIndex = checkpointStart >= 0 ? checkpointStart : steps.length - 1;
  const checkpointAnswers = new Map();
  const questionUiState = new Map();
  const shell = container.closest(".lesson-shell") || container;
  const backButton = shell.querySelector(".lesson-back");
  const topProgress = shell.querySelector(".lesson-top-title");
  const lessonStatus = shell.querySelector(".lesson-status");
  const hasAppChrome = Boolean(backButton && topProgress && lessonStatus);
  const previousChrome = {
    backMarkup: backButton?.innerHTML,
    backLabel: backButton?.getAttribute("aria-label"),
    statusHidden: lessonStatus?.hidden,
    progressRole: topProgress?.getAttribute("role"),
    progressLabel: topProgress?.getAttribute("aria-label"),
  };
  if (hasAppChrome) {
    document.body.classList.add(
      "ui-lab-open",
      "ui-lab-template-open",
      "ready-lesson-open",
    );
    shell.classList.add("lesson-shell--ui-lab", "lesson-shell--ready-lesson");
    container.classList.add("lesson-card--ui-lab", "lesson-card--ready-lesson");
    backButton.textContent = "×";
    backButton.setAttribute("aria-label", "Close lesson");
    lessonStatus.hidden = true;
    topProgress.setAttribute("role", "progressbar");
    topProgress.setAttribute("aria-label", `${lesson.title} progress`);
    topProgress.setAttribute("aria-valuemin", "0");
    topProgress.setAttribute("aria-valuemax", String(steps.length));
  }

  container.innerHTML = `
    <article class="lesson-flow ready-lesson-flow">
      <div class="lesson-stage-list ready-lesson-stage-list">${steps.map(renderStep).join("")}</div>
      <section class="ready-lesson-stage lesson-result" data-lesson-result ${isFinished ? "" : "hidden"} tabindex="-1" aria-labelledby="lesson-result-title">
        ${renderTemplateShell({
          titleId: "lesson-result-title",
          content: `<div class="level-lesson-copy ready-lesson-result"><p class="level-layout-kicker" data-result-kicker>${preview ? "LESSON PREVIEW" : isFinished ? "LESSON PASSED" : "FINAL CHECKPOINT"}</p><h1 id="lesson-result-title" data-result-title>${isFinished ? `You passed ${escapeHtml(reference)}` : "Your result"}</h1><p data-result-message>${isFinished ? "Your saved result shows that you passed this checkpoint." : ""}</p><div class="lesson-result-score"><strong data-result-score>${isFinished ? "PASS" : ""}</strong><span data-result-detail>${preview ? "Preview only. No progress or rewards are saved." : isFinished ? `Checkpoint complete · ${XP_PER_LESSON} XP earned` : ""}</span></div></div>`,
          footer: renderTemplateFooter({
            backLabel: "REVIEW LESSON",
            backAttributes: { "data-review-lesson": true },
            primaryLabel: "RETRY FINAL",
            primaryAttributes: {
              "data-retry-checkpoint": true,
              hidden: isFinished,
            },
          }),
          showScrollIndicator: false,
        })}
      </section>
    </article>`;

  mountTemplateEnterShortcut(container, { signal });

  if (container.querySelector('.lesson-code pre code[class*="language-"]'))
    highlightCode(container, signal);
  mountLessonVideos(container, signal);
  mountLessonMarkdown(container, signal);
  mountRockyDialogues(container, signal);

  const stageElements = [...container.querySelectorAll("[data-lesson-step]")];
  const result = container.querySelector("[data-lesson-result]");

  const announceProgress = (complete = false) =>
    onProgress?.({ completedStepIds: [...savedStepIds], isComplete: complete });
  const setAction = (button, state, label) => {
    button.dataset.actionState = state;
    button.querySelector("[data-template-action-label]").textContent = label;
  };
  const resetFeedback = (
    feedback,
    text = "",
  ) => {
    feedback.className = "level-feedback lesson-question-feedback";
    feedback.textContent = text;
  };
  const focusCurrent = () =>
    window.requestAnimationFrame(() =>
      (resultVisible ? result : stageElements[currentIndex])?.focus({
        preventScroll: true,
      }),
    );
  const showCurrent = ({ focus = true } = {}) => {
    animateView(container);
    stageElements.forEach((stage, index) => {
      stage.hidden = resultVisible || index !== currentIndex;
    });
    result.hidden = !resultVisible;
    playRockyDialogue(
      container,
      resultVisible ? null : stageElements[currentIndex],
      signal,
    );
    const value = resultVisible ? steps.length : currentIndex + 1;
    if (hasAppChrome) {
      topProgress.setAttribute("aria-valuenow", String(value));
      shell.style.setProperty(
        "--lesson-progress",
        `${(value / steps.length) * 100}%`,
      );
      document.body.classList.toggle(
        "ui-lab-mcq-open",
        !resultVisible && steps[currentIndex]?.type === "question",
      );
    }
    if (focus) focusCurrent();
  };

  const showResult = () => {
    if (checkpointSteps.length === 0) {
      isFinished = true;
      resultVisible = true;
      result.querySelector("[data-result-kicker]").textContent =
        preview ? "LESSON PREVIEW" : "LESSON COMPLETE";
      result.querySelector("[data-result-title]").textContent =
        `You completed ${reference}`;
      result.querySelector("[data-result-message]").textContent =
        "You completed every lesson step.";
      result.querySelector("[data-result-score]").textContent = "DONE";
      result.querySelector("[data-result-detail]").textContent =
        preview ? "Preview only. No progress or rewards are saved." : `Lesson complete · +${XP_PER_LESSON} XP`;
      result.querySelector("[data-retry-checkpoint]").hidden = true;
      steps.forEach((step) => savedStepIds.add(step.id));
      announceProgress(true);
      showCurrent();
      return;
    }
    const correct = checkpointSteps.filter(
      (step) =>
        checkpointAnswers.get(step.id) === step.question.correctChoiceId,
    ).length;
    const criticalSteps = checkpointSteps.filter(
      (step) => step.question.critical,
    );
    const criticalPassed = criticalSteps.every(
      (step) =>
        checkpointAnswers.get(step.id) === step.question.correctChoiceId,
    );
    const percent = Math.round((correct / checkpointSteps.length) * 100);
    const passed = percent >= lesson.passingScore && criticalPassed;
    isFinished = passed;
    resultVisible = true;
    result.querySelector("[data-result-kicker]").textContent = preview ? "LESSON PREVIEW" : passed
      ? "LESSON PASSED"
      : "NOT PASSED YET";
    result.querySelector("[data-result-title]").textContent = passed
      ? `You passed ${reference}`
      : "Review the missed ideas";
    result.querySelector("[data-result-message]").textContent = passed
      ? `You reached ${lesson.passingScore}%${criticalSteps.length ? ` and answered ${criticalSteps.length === 1 ? "the critical question" : `all ${criticalSteps.length} critical questions`} correctly` : ""}.`
      : criticalPassed
        ? `You need ${lesson.passingScore}% to pass. Retry the final with a fresh attempt.`
        : `${criticalSteps.length === 1 ? "The critical question is" : "One or more critical questions are"} unresolved. Review the lesson, then retry.`;
    result.querySelector("[data-result-score]").textContent = `${percent}%`;
    result.querySelector("[data-result-detail]").textContent =
      preview ? "Preview only. No progress or rewards are saved." : `${correct} of ${checkpointSteps.length} correct${passed ? ` · +${XP_PER_LESSON} XP` : ""}`;
    result.querySelector("[data-retry-checkpoint]").hidden = passed;
    if (passed) {
      steps.forEach((step) => savedStepIds.add(step.id));
      announceProgress(true);
    } else announceProgress(false);
    showCurrent();
  };

  stageElements.forEach((stage, index) => {
    const step = steps[index];
    const nextButton = stage.querySelector("[data-flow-next]");
    stage.querySelector("[data-flow-back]").addEventListener(
      "click",
      () => {
        if (index === 0) return;
        currentIndex = index - 1;
        showCurrent();
      },
      { signal },
    );

    if (step.type !== "question") {
      nextButton.addEventListener(
        "click",
        () => {
          savedStepIds.add(step.id);
          announceProgress(false);
          if (index === steps.length - 1) showResult();
          else {
            currentIndex = index + 1;
            showCurrent();
          }
        },
        { signal },
      );
      return;
    }

    const answers = [...stage.querySelectorAll("[data-answer]")];
    const feedback = stage.querySelector("[data-question-feedback]");
    const state = { selectedId: null, checked: false };
    questionUiState.set(step.id, state);
    setAction(nextButton, LESSON_ACTION.CHECK, "CHECK ANSWER");
    answers.forEach((answer) =>
      answer.addEventListener(
        "click",
        () => {
          if (state.checked && step.question.phase === "checkpoint") return;
          state.selectedId = answer.dataset.answer;
          state.checked = false;
          answers.forEach((option) => {
            option.classList.toggle("is-selected", option === answer);
            option.classList.remove("is-correct", "is-wrong");
            option.setAttribute("aria-pressed", String(option === answer));
          });
          resetFeedback(feedback);
          nextButton.disabled = false;
          setAction(nextButton, LESSON_ACTION.CHECK, "CHECK ANSWER");
        },
        { signal },
      ),
    );

    nextButton.addEventListener(
      "click",
      () => {
        if (nextButton.dataset.actionState === LESSON_ACTION.RETRY) {
          state.selectedId = null;
          state.checked = false;
          answers.forEach((answer) => {
            answer.classList.remove("is-selected", "is-correct", "is-wrong");
            answer.setAttribute("aria-pressed", "false");
          });
          resetFeedback(feedback);
          nextButton.disabled = true;
          setAction(nextButton, LESSON_ACTION.CHECK, "CHECK ANSWER");
          return;
        }
        if (!state.selectedId) return;
        if (!state.checked) {
          state.checked = true;
          const correct = state.selectedId === step.question.correctChoiceId;
          const selectedButton = answers.find(
            (answer) => answer.dataset.answer === state.selectedId,
          );
          selectedButton.classList.add(correct ? "is-correct" : "is-wrong");
          feedback.classList.add(
            correct ? "is-correct" : "is-wrong",
            correct ? "is-success" : "is-error",
          );
          feedback.innerHTML = correct
            ? '<span class="level-result-icon level-result-icon--correct"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="m10.5 20.8 6.2 6.2 13-14"/></svg></span><span class="level-result-copy"><strong>Excellent!</strong></span>'
            : '<span class="level-result-icon level-result-icon--wrong"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="m12.5 12.5 15 15m0-15-15 15"/></svg></span><span class="level-result-copy"><strong>Wrong answer</strong></span>';
          if (step.question.phase === "practice") {
            setAction(
              nextButton,
              correct ? LESSON_ACTION.CONTINUE : LESSON_ACTION.RETRY,
              correct ? "CONTINUE" : "TRY AGAIN",
            );
            if (!correct) state.checked = false;
            if (correct) savedStepIds.add(step.id);
          } else {
            checkpointAnswers.set(step.id, state.selectedId);
            answers.forEach((answer) => {
              answer.disabled = true;
            });
            setAction(
              nextButton,
              LESSON_ACTION.CONTINUE,
              index === steps.length - 1 ? "SEE RESULT" : "NEXT QUESTION",
            );
          }
          return;
        }
        if (step.question.phase === "practice") announceProgress(false);
        if (index === steps.length - 1) showResult();
        else {
          currentIndex = index + 1;
          showCurrent();
        }
      },
      { signal },
    );
  });

  result.querySelector("[data-review-lesson]").addEventListener(
    "click",
    () => {
      if (!isFinished) result.querySelector("[data-retry-checkpoint]").click();
      resultVisible = false;
      currentIndex = 0;
      showCurrent();
    },
    { signal },
  );
  result.querySelector("[data-retry-checkpoint]").addEventListener(
    "click",
    () => {
      checkpointAnswers.clear();
      checkpointSteps.forEach((step) => {
        const state = questionUiState.get(step.id);
        state.selectedId = null;
        state.checked = false;
        const stage = container.querySelector(
          `[data-lesson-step="${step.id}"]`,
        );
        stage.querySelectorAll("[data-answer]").forEach((answer) => {
          answer.disabled = false;
          answer.classList.remove("is-selected", "is-correct", "is-wrong");
          answer.setAttribute("aria-pressed", "false");
        });
        resetFeedback(stage.querySelector("[data-question-feedback]"));
        stage.querySelector("[data-flow-next]").disabled = true;
        setAction(
          stage.querySelector("[data-flow-next]"),
          LESSON_ACTION.CHECK,
          "CHECK ANSWER",
        );
      });
      isFinished = false;
      resultVisible = false;
      currentIndex = checkpointStart;
      showCurrent();
    },
    { signal },
  );

  showCurrent({ focus: false });
  return () => {
    controller.abort();
    if (!hasAppChrome) return;
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
