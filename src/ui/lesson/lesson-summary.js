import { mountSummaryScans } from "./summary-scans.js";
import { readablePageReferences } from "../../lib/page-labels.js";

const SECTION_STYLES = [
  { kind:"memory", pattern:/احفظ|تحفظ|حفظه|memor/i },
  { kind:"concept", pattern:/الفكرة|ببساطة|concept|overview/i },
  { kind:"understand", pattern:/افهم|تفهم|understand/i },
];

function sectionStyle(heading) {
  return SECTION_STYLES.find(({ pattern }) => pattern.test(heading)) || {
    kind:"apply",
  };
}

/** Source URLs remain in authored Markdown; learners read their labels in place. */
export function renderLessonReferencesInline(container) {
  container.querySelectorAll('a[href^="assets/books/"]:not([download]), a[href^="https://"], a[href^="http://"]').forEach(link => {
    const reference = container.ownerDocument.createElement("span");
    reference.className = "lesson-reference";
    reference.append(...link.childNodes);
    link.replaceWith(reference);
  });
  const text = container.ownerDocument.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = text.nextNode())) {
    if (!node.parentElement?.closest("pre, code")) node.textContent = readablePageReferences(node.textContent);
  }
}

/** Turn a summary Markdown document into a sequence of focused learning cards. */
export function enhanceLessonSummary(container, { titleId = "lesson-summary", locale = "en", signal } = {}) {
  const summary = container.querySelector(".markdown-rendered");
  if (!summary || summary.classList.contains("lesson-summary-content")) return;

  renderLessonReferencesInline(summary);
  mountSummaryScans(summary, { titleId, locale, signal });

  summary.classList.add("lesson-summary-content");
  let activeSection = null;
  let sectionIndex = 0;

  [...summary.children].forEach((child) => {
    if (child.tagName === "H2") {
      sectionIndex += 1;
      const { kind } = sectionStyle(child.textContent.trim());
      const section = window.document.createElement("section");
      const headingId = `${titleId}-focus-${sectionIndex}`;
      section.className = "lesson-summary-focus";
      section.dataset.summaryKind = kind;
      section.setAttribute("aria-labelledby", headingId);
      child.id = headingId;
      child.before(section);
      if (kind === "memory" || kind === "concept") {
        const icon = window.document.createElement("img");
        icon.src = kind === "memory" ? "assets/icons/brain-svgrepo-com.svg" : "assets/icons/lesson-lightbulb.webp";
        icon.alt = "";
        icon.width = 34;
        icon.height = 34;
        child.prepend(icon);
      }
      section.append(child);
      activeSection = section;
      return;
    }

    if (child.classList.contains("markdown-callout")) {
      child.classList.add("lesson-summary-callout");
      activeSection = null;
      return;
    }

    if (activeSection) activeSection.append(child);
  });

  summary.querySelectorAll("table").forEach(table => {
    const headers = [...table.querySelectorAll("thead th")].map(cell => cell.textContent.trim());
    table.classList.add("lesson-summary-table");
    if (headers.length > 2) table.classList.add("lesson-summary-table--records");
    table.querySelectorAll("tbody tr").forEach(row => {
      [...row.cells].forEach((cell, index) => { cell.dataset.columnLabel = headers[index] || ""; });
    });
  });

  // The authored relationship sentence remains the accessible description.
  // Its nodes become a responsive diagram, using the same labels and multiplicities.
  summary.querySelectorAll(".lesson-summary-focus > p").forEach(paragraph => {
    const text = paragraph.textContent.trim();
    const nodes = text.split(/\s*[←→]\s*/);
    if (nodes.length < 2 || !nodes.every(node => /^.+\s*\((1|متعدد)\)$/.test(node))) return;
    paragraph.classList.add("lesson-relation-map");
    paragraph.setAttribute("role", "img");
    paragraph.setAttribute("aria-label", text);
    paragraph.replaceChildren();
    nodes.forEach((node, index) => {
      const [, label, count] = node.match(/^(.+?)\s*\((1|متعدد)\)$/);
      const card = window.document.createElement("span");
      card.className = "lesson-relation-node";
      card.setAttribute("aria-hidden", "true");
      const name = window.document.createElement("strong");
      name.textContent = label;
      const cardinality = window.document.createElement("small");
      cardinality.textContent = count === "1" ? "واحد" : count;
      card.append(name, cardinality);
      if (index > 0) {
        const link = window.document.createElement("span");
        link.className = "lesson-relation-link";
        link.setAttribute("aria-hidden", "true");
        paragraph.append(link);
      }
      paragraph.append(card);
    });
  });
}
