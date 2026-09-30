import { escapeHtml } from "../../lib/dom.js";
import { renderMarkdownDocument } from "../../markdown/renderer.js";

export function renderRockyDialogue(step, { titleId, locale = "en" }) {
  return `<article class="level-lesson-copy ready-lesson-copy markdown-authored-content rocky-dialogue-presentation">
    <h1 class="visually-hidden" id="${escapeHtml(titleId)}">${escapeHtml(step.title)}</h1>
    <div class="rocky-dialogue" data-rocky-dialogue><div class="rocky-dialogue-content">${renderMarkdownDocument(step.dialogue.source, { locale })}</div></div>
    <figure class="rocky-dialogue-illustration">${renderMarkdownDocument(step.dialogue.image, { locale })}</figure>
  </article>`;
}

export function mountRockyDialogues(container, signal) {
  container.querySelectorAll('[data-lesson-presentation="rocky-dialogue"] [data-rocky-dialogue]').forEach((bubble) => {
    const content = bubble.querySelector(".rocky-dialogue-content");
    if (!content || signal.aborted) return;
    const dialogue = content.textContent.trim();
    const measuredText = document.createElement("span");
    const visibleText = document.createElement("span");
    const accessibleText = document.createElement("span");
    bubble.dataset.rockyDialogue = dialogue;
    accessibleText.className = "visually-hidden";
    accessibleText.textContent = dialogue;
    measuredText.className = "rocky-dialogue-measure";
    measuredText.textContent = dialogue;
    measuredText.setAttribute("aria-hidden", "true");
    visibleText.className = "rocky-dialogue-text";
    visibleText.setAttribute("aria-hidden", "true");
    // Both copies share one grid cell and font metrics; the full copy reserves the final height.
    bubble.replaceChildren(accessibleText, measuredText, visibleText);
  });
}

export function playRockyDialogue(container, stage, signal) {
  container.querySelectorAll("[data-rocky-dialogue]").forEach((bubble) => {
    bubble
      .querySelector(".rocky-dialogue-text")
      ?.classList.remove("is-revealing");
  });
  const bubble = stage?.querySelector("[data-rocky-dialogue]");
  if (!bubble || signal.aborted) return;
  const text = bubble.querySelector(".rocky-dialogue-text");
  const dialogue = bubble.dataset.rockyDialogue;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finish = () => {
    if (!preference.matches || signal.aborted) return;
    text.classList.remove("is-revealing");
    text.textContent = dialogue;
  };
  preference.addEventListener("change", finish, { signal });
  if (preference.matches) {
    text.textContent = dialogue;
    return;
  }
  text.replaceChildren(
    ...dialogue
      .split(/\s+/u)
      .filter(Boolean)
      .map((word, index) => {
        const span = document.createElement("span");
        span.className = "rocky-dialogue-word";
        span.style.setProperty("--word-delay", `${index * 200}ms`);
        span.textContent = word + " ";
        return span;
      }),
  );
  text.classList.add("is-revealing");
}
