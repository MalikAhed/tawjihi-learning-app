import { escapeHtml, prefersReducedMotion } from "../../lib/dom.js";
import { renderMarkdownDocument, renderMarkdownInline, mountMarkdownFeatures } from "../../markdown/renderer.js";
import { renderTemplateShell, renderTemplateFooter } from "../template-shell.js";
import { mountQuestionRating, renderQuestionRatingControls } from "../question-rating.js";
import { highlightEnglishText } from "./english-text.js";
import { mountSummaryScans } from "./summary-scans.js";
import { renderQuestionSourceTag } from "./shared.js";

function layoutWrittenPrompt(source) {
  let text = source.trim();
  if (/(?:^|\s)1[.)]\s+/.test(text) && /(?:^|\s)2[.)]\s+/.test(text)) {
    text = text.replace(/:\s+(?=1[.)]\s+)/, ":\n\n");
    text = text.replace(/([^\n])\n(?=1[.)]\s+)/, "$1\n\n");
    for (let number = 2; number <= 20; number += 1) {
      text = text.replace(new RegExp(`[ \\t]+(?=${number}[.)][ \\t]+)`, "g"), "\n");
    }
  }
  const firstLine = text.indexOf("\n");
  return firstLine < 0 ? [text, ""] : [text.slice(0, firstLine), text.slice(firstLine).trim()];
}

/** Source questions use ungraded, two-sided cards; only Continue records review. */
export function renderExamQuestion(container, step, { locale = "ar", onBack, onContinue } = {}) {
  const controller = new AbortController();
  const { signal } = controller;
  const { content } = step;
  const titleId = `exam-title-${step.id}`;
  const solutionId = `exam-solution-${step.id}`;
  const ar = locale === "ar";
  const [question, body] = layoutWrittenPrompt(content.body);
  container.dataset.lessonPresentation = "flashcard";
  container.innerHTML = renderTemplateShell({
    titleId, locale, showScrollIndicator:false,
    content:`<article class="level-lesson-copy lesson-exam-question" data-exam-card aria-label="${ar ? "بطاقة مراجعة" : "Review flashcard"}">
      <div class="lesson-flashcard-rotor">
        <section class="lesson-flashcard-face" data-exam-front aria-hidden="false">
          <div class="lesson-flashcard-scroll" tabindex="0" role="region" aria-label="${ar ? "السؤال" : "Question"}" aria-keyshortcuts="Enter Space" aria-description="${ar ? "اضغط Enter أو مسافة لقلب البطاقة" : "Press Enter or Space to flip the card"}">
            <div class="lesson-flashcard-copy">
              ${renderQuestionSourceTag(content)}
              <h1 id="${escapeHtml(titleId)}">${renderMarkdownInline(question, { locale })}</h1>
              ${body ? `<div class="markdown-rendered lesson-exam-body">${renderMarkdownDocument(body, { locale })}</div>` : ""}
            </div>
          </div>
        </section>
        <section id="${escapeHtml(solutionId)}" class="lesson-flashcard-face lesson-flashcard-back" data-exam-solution hidden inert aria-hidden="true">
          <div class="lesson-flashcard-scroll" tabindex="0" role="region" aria-label="${ar ? "الإجابة" : "Answer"}" aria-keyshortcuts="Enter Space" aria-description="${ar ? "اضغط Enter أو مسافة لقلب البطاقة" : "Press Enter or Space to flip the card"}">
            <div class="lesson-flashcard-copy">
              <div class="markdown-rendered">${renderMarkdownDocument(content.solution, { locale })}</div>
            </div>
          </div>
        </section>
      </div>
    </article>`,
    footer:renderTemplateFooter({ locale, primaryLabel:ar ? "متابعة" : "CONTINUE", primaryAttributes:{ disabled:true } }),
  });
  const card = container.querySelector("[data-exam-card]");
  if (ar) {
    highlightEnglishText(card.querySelector("[data-exam-front] .lesson-flashcard-copy"));
    highlightEnglishText(card.querySelector("[data-exam-solution] .lesson-flashcard-copy"));
  }
  const rotor = card.querySelector(".lesson-flashcard-rotor");
  const front = card.querySelector("[data-exam-front]");
  const solution = card.querySelector("[data-exam-solution]");
  const next = container.querySelector("[data-template-primary]");
  const footer = next.closest(".level-layout-actions");
  footer.classList.add("lesson-exam-actions");
  const back = footer.querySelector("[data-template-back]");
  back.insertAdjacentHTML("afterend", renderQuestionRatingControls(locale));
  const rating = footer.querySelector(".level-question-rating-panel");
  rating.hidden = true;
  mountQuestionRating(footer, signal);
  let flipped = false;
  let animation = null;
  let pointerStart = null;
  let dragged = false;

  card.querySelectorAll(".lesson-flashcard-scroll").forEach((scroll, index) => {
    mountSummaryScans(scroll, { titleId:`${titleId}-face-${index}`, locale, signal, exam:true });
    mountMarkdownFeatures(scroll, { locale, signal, scrollSurface:scroll });
  });
  const hideInactiveFace = () => {
    front.hidden = flipped;
    solution.hidden = !flipped;
  };
  const flip = showAnswer => {
    if (showAnswer === flipped || signal.aborted) return;
    const from = getComputedStyle(rotor).transform;
    animation?.cancel();
    animation = null;
    front.hidden = false;
    solution.hidden = false;
    flipped = showAnswer;
    rating.hidden = !flipped;
    rotor.classList.toggle("is-flipped", flipped);
    front.inert = flipped;
    solution.inert = !flipped;
    front.setAttribute("aria-hidden", String(flipped));
    solution.setAttribute("aria-hidden", String(!flipped));
    if (flipped) next.disabled = false;
    const visibleFace = flipped ? solution : front;
    visibleFace.querySelector(".lesson-flashcard-scroll").focus({ preventScroll:true });
    if (prefersReducedMotion() || !rotor.animate) {
      hideInactiveFace();
      return;
    }
    const turn = rotor.animate([
      { transform:from }, { transform:flipped ? "rotateY(180deg)" : "rotateY(0deg)" },
    ], { duration:420, easing:"cubic-bezier(.2,.7,.2,1)" });
    animation = turn;
    void turn.finished.then(() => {
      if (signal.aborted || animation !== turn) return;
      animation = null;
      hideInactiveFace();
    }).catch(() => {});
  };
  card.addEventListener("keydown", event => {
    if (event.defaultPrevented || event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!["Enter", " "].includes(event.key) || !event.target.matches(".lesson-flashcard-scroll")) return;
    event.preventDefault();
    flip(!flipped);
  }, { signal });
  card.addEventListener("pointerdown", event => {
    pointerStart = { x:event.clientX, y:event.clientY };
    dragged = false;
  }, { signal, passive:true });
  card.addEventListener("pointermove", event => {
    if (pointerStart && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 8) dragged = true;
  }, { signal, passive:true });
  card.addEventListener("pointercancel", () => { dragged = true; pointerStart = null; }, { signal });
  card.addEventListener("click", event => {
    pointerStart = null;
    if (dragged || window.getSelection()?.toString() || event.target.closest("button,a,summary,input,textarea,select,pre,.lesson-summary-scan.is-expanded")) return;
    const scroll = event.target.closest(".lesson-flashcard-scroll");
    if (scroll) {
      const bounds = scroll.getBoundingClientRect();
      const left = bounds.left + scroll.clientLeft;
      if (event.clientX < left || event.clientX > left + scroll.clientWidth || event.clientY > bounds.top + scroll.clientTop + scroll.clientHeight) return;
    }
    flip(!flipped);
  }, { signal });
  next.addEventListener("click", () => { if (!next.disabled) onContinue?.(); }, { signal });
  container.querySelector("[data-template-back]").addEventListener("click", () => onBack?.(), { signal });
  return () => {
    controller.abort();
    animation?.cancel();
    delete container.dataset.lessonPresentation;
  };
}
