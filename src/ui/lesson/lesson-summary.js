import { enhanceAccessDesignSummary } from "./access-design-summary.js";
import { renderAccessSummary, renderAccessPropertyIcon, renderTableStructure } from "./access-summary.js";

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

/** Turn a summary Markdown document into a sequence of focused learning cards. */
export function enhanceLessonSummary(container, { titleId = "lesson-summary", stepId } = {}) {
  const summary = container.querySelector(".markdown-rendered");
  if (!summary || summary.classList.contains("lesson-summary-content")) return;

  if (stepId === "row-column-check") {
    enhanceAccessDesignSummary(summary, titleId);
    return;
  }

  if (stepId === "dbms-responsibilities") {
    summary.classList.add("lesson-summary-content", "access-summary");
    const heading = summary.querySelector("h1");
    const authoredContent = [...summary.children];
    summary.innerHTML = renderAccessSummary();
    summary.querySelectorAll("[data-summary-facts]").forEach((section, index) => {
      const start = authoredContent.findIndex(node => node.tagName === "H2" && node.textContent.trim() === section.dataset.summaryFacts);
      if (start < 0) { section.remove(); return; }
      const sectionHeading = section.closest(".access-memorization")
        ? window.document.createElement("h3") : authoredContent[start];
      sectionHeading.textContent = authoredContent[start].textContent;
      sectionHeading.id = `${titleId}-facts-${index + 1}`;
      section.setAttribute("aria-labelledby", sectionHeading.id);
      section.append(sectionHeading);
      for (let cursor = start + 1; cursor < authoredContent.length; cursor += 1) {
        const node = authoredContent[cursor];
        if (node.tagName === "H2" || node.classList.contains("markdown-callout")) break;
        section.append(node);
      }
      if (section.classList.contains("access-summary-facts--programs")) {
        const examples = section.querySelectorAll(":scope > ul > li")[1];
        const label = examples?.querySelector("strong");
        if (label) {
          const names = examples.textContent.slice(label.textContent.length).split("،");
          examples.replaceChildren(label);
          const list = window.document.createElement("span");
          list.className = "access-software-names";
          names.forEach(name => {
            const badge = window.document.createElement("bdi");
            badge.dir = "ltr";
            badge.textContent = name.trim().replace(/\.$/, "");
            list.append(badge);
          });
          examples.append(list);
        }
      }
      section.querySelectorAll(":scope > ul > li, :scope > ol > li").forEach((item, itemIndex) => {
        const label = item.querySelector(":scope > strong");
        if (!label) return;
        const header = window.document.createElement("div");
        header.className = "access-fact-title";
        item.prepend(header);
        header.append(label);
        if (section.classList.contains("access-summary-facts--properties")) {
          header.insertAdjacentHTML("beforeend", renderAccessPropertyIcon(itemIndex));
        }
      });
      if (section.classList.contains("access-summary-facts--details")) {
        const tableFact = section.querySelector(":scope > ul > li");
        if (tableFact) {
          const title = tableFact.querySelector(".access-fact-title");
          tableFact.replaceChildren(...(title ? [title] : []));
          tableFact.insertAdjacentHTML("beforeend", renderTableStructure());
        }
      }
      // Color is reserved for exact names and values; other emphasis stays plain bold.
      const recallTerms = new Set(["SQL", "SQL Server", "MySQL", "Microsoft Office", "2 GB"]);
      section.querySelectorAll("strong").forEach(term => {
        if (recallTerms.has(term.textContent.trim().replace(/:$/, ""))) {
          term.classList.add("access-recall-term");
        }
      });
    });
    if (heading) {
      heading.textContent = "برنامج Access وبيئته";
      summary.querySelector(".access-summary-heading").prepend(heading);
    }
    return;
  }

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
      if (kind === "memory") {
        const icon = window.document.createElement("img");
        icon.src = "assets/icons/brain-svgrepo-com.svg";
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
