import {
  CODE_PREVIEW_FRAME_PATH,
  createCodePreviewPayload,
  PREVIEW_MESSAGE_SOURCE,
} from "./code-preview.js";
import { launchCelebration } from "./celebration.js";

function hasCssDeclaration(cssSource, properties) {
  let rules;
  try {
    if (typeof CSSStyleSheet === "function") {
      const stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(cssSource);
      rules = stylesheet.cssRules;
    } else {
      const parserDocument = document.implementation.createHTMLDocument("");
      const style = parserDocument.createElement("style");
      style.textContent = cssSource;
      parserDocument.head.append(style);
      rules = style.sheet?.cssRules;
    }
  } catch {
    return false;
  }
  const rulesHaveProperty = (candidateRules) => [...candidateRules].some((rule) => {
    if (properties.some((property) => rule.style?.getPropertyValue(property))) return true;
    return rule.cssRules ? rulesHaveProperty(rule.cssRules) : false;
  });
  return Boolean(rules) && rulesHaveProperty(rules);
}

function evaluateCodeCheck(check, values) {
  if (check.type === "html-selector") {
    try {
      return Boolean(new DOMParser().parseFromString(values.html, "text/html").querySelector(check.selector));
    } catch {
      return false;
    }
  }
  if (check.type === "css-property") return hasCssDeclaration(values.css, check.properties);
  if (check.type === "file-contains") {
    const source = String(values[check.file] || "");
    const expected = String(check.value || "");
    return check.caseSensitive === false
      ? source.toLocaleLowerCase().includes(expected.toLocaleLowerCase())
      : source.includes(expected);
  }
  return false;
}

async function mountCodeQuest(container, signal, codeQuest, { onContinue = null } = {}) {
  const lab = container.querySelector("[data-code-lab]");
  if (!lab) return () => {};
  const { html:htmlCode = "", css:cssCode = "", js:jsCode = "" } = codeQuest.files || {};
  const values = { html:htmlCode, css:cssCode, js:jsCode };
  const preview = lab.querySelector(".ds-live-preview");
  const consoleOutput = lab.querySelector("[data-console-output]");
  const consoleCount = lab.querySelector("[data-console-count]");
  const outputTabs = [...lab.querySelectorAll("[data-output-tab]")];
  let activeRunId = 0;
  let consoleLineCount = 0;
  const updateConsoleCount = () => {
    consoleCount.textContent = String(consoleLineCount);
    consoleCount.hidden = consoleLineCount === 0;
  };
  const clearConsole = () => {
    consoleLineCount = 0;
    consoleOutput.innerHTML = `<p class="ds-console-empty">Console output will appear here.</p>`;
    updateConsoleCount();
  };
  const appendConsoleLine = (level, args) => {
    consoleOutput.querySelector(".ds-console-empty")?.remove();
    const line = document.createElement("div");
    line.className = `ds-console-line ds-console-line--${["log", "info", "warn", "error"].includes(level) ? level : "log"}`;
    const badge = document.createElement("span");
    badge.textContent = level === "log" ? ">" : level;
    const message = document.createElement("pre");
    message.textContent = args.join(" ");
    line.append(badge, message);
    consoleOutput.append(line);
    consoleLineCount += 1;
    updateConsoleCount();
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  };
  const selectOutput = (name, { focus = false } = {}) => {
    outputTabs.forEach((tab) => {
      const selected = tab.dataset.outputTab === name;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.setAttribute("tabindex", selected ? "0" : "-1");
      if (selected && focus) tab.focus();
    });
    lab.querySelectorAll("[data-output-panel]").forEach((panel) => { panel.hidden = panel.dataset.outputPanel !== name; });
  };
  outputTabs.forEach((tab) => tab.addEventListener("click", () => selectOutput(tab.dataset.outputTab), { signal }));
  lab.querySelector("[data-clear-console]")?.addEventListener("click", clearConsole, { signal });
  lab.querySelector(".ds-output-tabs")?.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = outputTabs.indexOf(event.target.closest("[data-output-tab]"));
    if (currentIndex < 0) return;
    let nextIndex = event.key === "Home" ? 0 : outputTabs.length - 1;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + outputTabs.length) % outputTabs.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % outputTabs.length;
    selectOutput(outputTabs[nextIndex].dataset.outputTab, { focus:true });
  }, { signal });
  window.addEventListener("message", (event) => {
    if (event.source !== preview.contentWindow || event.data?.source !== PREVIEW_MESSAGE_SOURCE) return;
    if (event.data.type === "ready") {
      preview.dataset.previewReady = "true";
      sendPreviewPayload();
      return;
    }
    if (event.data.runId !== activeRunId) return;
    if (event.data.type === "clear") clearConsole();
    if (event.data.type === "console") appendConsoleLine(event.data.level, Array.isArray(event.data.args) ? event.data.args : []);
  }, { signal });
  let previewPayload = null;
  const sendPreviewPayload = () => {
    if (previewPayload) preview.contentWindow?.postMessage(previewPayload, "*");
  };
  preview.addEventListener("load", sendPreviewPayload, { signal });
  const updatePreview = () => {
    activeRunId += 1;
    clearConsole();
    previewPayload = createCodePreviewPayload({
      ...values,
      previewStyles:codeQuest.previewStyles,
      runId:activeRunId,
    });
    delete preview.dataset.previewReady;
    preview.src = `${CODE_PREVIEW_FRAME_PATH}?run=${activeRunId}`;
  };
  updatePreview();
  let previewFrame = 0;
  let passed = false;
  let runButton = null;
  const setRunState = (nextPassed) => {
    passed = nextPassed;
    if (!runButton) return;
    runButton.dataset.codeState = passed ? "passed" : "checking";
    const label = runButton.querySelector("[data-template-action-label], span");
    if (label) label.textContent = passed ? "CONTINUE" : "RUN CHECK";
  };
  const schedulePreview = () => {
    window.cancelAnimationFrame(previewFrame);
    previewFrame = window.requestAnimationFrame(updatePreview);
  };
  let disposeEditor = () => {};
  try {
    const { mountLessonCodeLab } = await import("../../assets/vendor/lesson-code-editor.js");
    if (signal.aborted) return disposeEditor;
    const mountedEditor = mountLessonCodeLab(lab, {
      htmlCode, cssCode, jsCode,
      onChange(type, value) { values[type] = value; setRunState(false); schedulePreview(); },
    });
    disposeEditor = typeof mountedEditor === "function" ? mountedEditor : disposeEditor;
    const tablist = lab.querySelector("[role='tablist']");
    tablist.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const tabs = [...tablist.querySelectorAll("[role='tab']")];
      const currentIndex = tabs.indexOf(event.target.closest("[role='tab']"));
      if (currentIndex < 0) return;
      event.preventDefault();
      let nextIndex = event.key === "Home" ? 0 : tabs.length - 1;
      if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
      tabs[nextIndex].click();
      tabs[nextIndex].focus();
    }, { signal });
  } catch (error) {
    if (signal.aborted) return disposeEditor;
    console.error("The lesson code editor failed to load.", error);
    lab.querySelector(".ds-editor-card").innerHTML = `<p class="ds-editor-error">The editor could not load. Refresh and try again.</p>`;
  }
  if (signal.aborted) return disposeEditor;
  runButton = container.querySelector("[data-run-code]");
  if (!runButton) return disposeEditor;
  runButton.addEventListener("click", () => {
    if (passed) {
      onContinue?.();
      return;
    }
    const results = codeQuest.checks.map((check) => evaluateCodeCheck(check, values));
    container.querySelectorAll(".ds-build-guide input[type='checkbox']").forEach((item, index) => {
      item.checked = Boolean(results[index]);
    });
    if (results.every(Boolean)) {
      setRunState(true);
      launchCelebration({ className:"ds-confetti", replaceExisting:true });
    }
  }, { signal });
  return () => {
    window.cancelAnimationFrame(previewFrame);
    disposeEditor();
  };
}

export function mountCodeQuestWhenVisible(container, signal, codeQuest, registerDispose, options = {}) {
  const startQuest = () => {
    void mountCodeQuest(container, signal, codeQuest, options).then((dispose) => {
      if (signal.aborted) dispose();
      else registerDispose(dispose);
    }).catch((error) => console.error("The code quest could not be initialized.", error));
  };
  if (container.classList.contains("ds-practice-only")) {
    startQuest();
    return;
  }
  const content = container.querySelector("#interactive-content");
  const toggle = container.querySelector("#interactive .ds-section-toggle");
  if (!content || !toggle) return;
  let started = false;
  const startWhenVisible = () => {
    if (started || content.hidden || signal.aborted) return;
    started = true;
    startQuest();
  };
  startWhenVisible();
  toggle.addEventListener("click", startWhenVisible, { signal });
}
