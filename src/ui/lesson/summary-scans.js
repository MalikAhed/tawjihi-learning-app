// Original PDF crops stay in authored Markdown; this owner adds in-place reading controls.
export function mountSummaryScans(summary, { titleId, locale = "ar", signal, exam = false } = {}) {
  const images = [...summary.querySelectorAll(exam ? 'p > img' : 'p > img[src^="assets/lessons/ict/summary/"]')];
  if (!images.length) return;
  const doc = summary.ownerDocument;
  const arabic = locale === "ar";
  const section = doc.createElement("section");
  section.className = "lesson-summary-scans";
  const heading = doc.createElement("h2");
  heading.id = `${titleId}-scans`;
  heading.textContent = arabic ? "من صفحات الملخص" : "From the summary";
  section.setAttribute("aria-labelledby", heading.id);
  section.append(heading);

  images.forEach((img, index) => {
    const paragraph = img.parentElement;
    const correction = paragraph.nextElementSibling?.tagName === "BLOCKQUOTE" ? paragraph.nextElementSibling : null;
    const figure = doc.createElement("figure");
    figure.className = `lesson-summary-scan${exam ? " lesson-question-image" : ""}`;
    if (exam) {
      const wrapper = doc.createElement("div");
      wrapper.className = "lesson-summary-scans";
      paragraph.before(wrapper);
      wrapper.append(figure);
    }
    const caption = doc.createElement("figcaption");
    const label = doc.createElement("span");
    label.textContent = img.alt;
    const button = doc.createElement("button");
    button.type = "button";
    button.className = "lesson-summary-scan-toggle";
    button.dataset.summaryScanZoom = "";
    button.setAttribute("aria-expanded", "false");
    const fitLabel = arabic ? "تكبير الصورة" : "Enlarge image";
    const zoomLabel = arabic ? "تصغير الصورة" : "Fit image";
    const setButtonLabel = expanded => {
      const text = expanded ? zoomLabel : fitLabel;
      button.setAttribute("aria-label", text);
      button.title = text;
      if (exam) {
        button.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${expanded
          ? '<path d="M4 9h5V4m11 5h-5V4M4 15h5v5m11-5h-5v5"/>'
          : '<path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"/>'}</svg>`;
      } else button.textContent = text;
    };
    setButtonLabel(false);
    caption.append(label, button);
    const viewport = doc.createElement("div");
    viewport.className = "lesson-summary-scan-viewport";
    viewport.id = `${titleId}-scan-${index + 1}`;
    viewport.setAttribute("role", "region");
    viewport.setAttribute("aria-label", img.alt);
    button.setAttribute("aria-controls", viewport.id);
    const help = doc.createElement("p");
    help.className = "lesson-summary-scan-help";
    help.id = `${viewport.id}-help`;
    help.hidden = true;
    help.textContent = arabic
      ? "اسحب داخل الصورة لقراءة بقية المحتوى، أو استخدم مفاتيح الأسهم."
      : "Scroll inside the image to read the remaining content, or use the arrow keys.";
    img.draggable = false;
    viewport.append(img);
    if (!paragraph.textContent.trim() && !paragraph.children.length) paragraph.remove();
    if (exam) figure.append(button, viewport);
    else figure.append(caption, help, viewport);
    if (correction) {
      correction.classList.add("lesson-summary-scan-note");
      figure.append(correction);
    }
    if (!exam) section.append(figure);
    if (exam) {
      const dialog = doc.createElement("dialog");
      dialog.className = "lesson-question-image-viewer";
      dialog.id = `${viewport.id}-viewer`;
      dialog.setAttribute("aria-label", img.alt || fitLabel);
      button.setAttribute("aria-controls", dialog.id);
      button.setAttribute("aria-haspopup", "dialog");
      const close = doc.createElement("button");
      close.type = "button";
      close.className = "lesson-summary-scan-toggle lesson-question-image-close";
      close.setAttribute("aria-label", arabic ? "إغلاق الصورة" : "Close image");
      close.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>';
      const fullImage = img.cloneNode();
      fullImage.loading = "eager";
      dialog.append(fullImage, close);
      doc.body.append(dialog);
      const reset = () => {
        button.setAttribute("aria-expanded", "false");
        if (!signal?.aborted && button.isConnected) button.focus({ preventScroll:true });
      };
      button.addEventListener("click", () => {
        button.setAttribute("aria-expanded", "true");
        dialog.showModal();
        close.focus({ preventScroll:true });
      }, { signal });
      close.addEventListener("click", () => dialog.close(), { signal });
      dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }, { signal });
      dialog.addEventListener("close", reset, { signal });
      signal?.addEventListener("abort", () => dialog.remove(), { once:true });
      return;
    }
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(expanded));
      setButtonLabel(expanded);
      figure.classList.toggle("is-expanded", expanded);
      help.hidden = !expanded;
      if (expanded) {
        viewport.tabIndex = 0;
        viewport.setAttribute("aria-describedby", help.id);
      } else {
        viewport.removeAttribute("tabindex");
        viewport.removeAttribute("aria-describedby");
      }
      viewport.scrollTop = 0;
      viewport.scrollLeft = 0;
      if (expanded) viewport.focus({ preventScroll: true });
    }, { signal });
  });
  if (!exam) summary.before(section);
}
