const LATIN_RUN = /[A-Za-z](?:[A-Za-z0-9_+#./-]*[A-Za-z0-9_+#])?(?:[ \t]+[A-Za-z](?:[A-Za-z0-9_+#./-]*[A-Za-z0-9_+#])?)*/g;

/** Give English terms in Arabic questions a consistent reading direction and emphasis. */
export function highlightEnglishText(root) {
  if (!root) return;
  const doc = root.ownerDocument;
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (/[A-Za-z]/.test(node.textContent) && !node.parentElement?.closest("code, pre, kbd, samp, a, svg, .lesson-english-term")) nodes.push(node);
  }
  for (const node of nodes) {
    const text = node.textContent;
    const matches = [...text.matchAll(LATIN_RUN)];
    if (!matches.length) continue;
    const fragment = doc.createDocumentFragment();
    let offset = 0;
    for (const match of matches) {
      if (match.index > offset) fragment.append(doc.createTextNode(text.slice(offset, match.index)));
      const term = doc.createElement("bdi");
      term.className = "lesson-english-term";
      term.lang = "en";
      term.textContent = match[0];
      fragment.append(term);
      offset = match.index + match[0].length;
    }
    if (offset < text.length) fragment.append(doc.createTextNode(text.slice(offset)));
    node.replaceWith(fragment);
  }
}
