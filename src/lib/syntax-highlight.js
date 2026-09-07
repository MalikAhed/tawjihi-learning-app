import hljs from "../../node_modules/@highlightjs/cdn-assets/es/highlight.min.js";

// The Markdown renderer uses the same local highlighter and theme.
export function highlightCode(container, signal) {
  if (signal?.aborted) return;
  container
    .querySelectorAll('.lesson-code pre code[class*="language-"]')
    .forEach((code) => {
      const language = [...code.classList]
        .find((name) => name.startsWith("language-"))
        ?.slice(9);
      if (!hljs.getLanguage(language)) return;
      code.innerHTML = hljs.highlight(code.textContent, { language }).value;
      code.classList.add("hljs");
    });
}
