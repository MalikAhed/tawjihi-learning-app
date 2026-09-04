(() => {
  const controlSource = document.body.dataset.controlSource;
  const messageSource = document.body.dataset.messageSource;
  const previewRoot = document.querySelector("[data-preview-root]");
  const previewStyle = document.querySelector("[data-preview-style]");
  let activeRunId = 0;

  const formatValue = (value) => {
    if (typeof value === "string") return value;
    if (typeof value === "undefined") return "undefined";
    if (typeof value === "function") return value.toString();
    if (value instanceof Error) return value.stack || value.message;
    try {
      const seen = new WeakSet();
      return JSON.stringify(value, (_key, item) => {
        if (typeof item === "object" && item !== null) {
          if (seen.has(item)) return "[Circular]";
          seen.add(item);
        }
        return item;
      }, 2);
    } catch {
      return String(value);
    }
  };
  const send = (type, detail = {}) => {
    parent.postMessage({ source:messageSource, runId:activeRunId, type, ...detail }, "*");
  };

  for (const level of ["log", "info", "warn", "error"]) {
    const original = console[level].bind(console);
    console[level] = (...args) => {
      send("console", { level, args:args.map(formatValue) });
      original(...args);
    };
  }
  console.clear = () => send("clear");
  addEventListener("error", (event) => send("console", { level:"error", args:[event.error?.stack || event.message] }));
  addEventListener("unhandledrejection", (event) => send("console", { level:"error", args:[formatValue(event.reason)] }));
  addEventListener("message", (event) => {
    const payload = event.data;
    if (event.source !== parent || payload?.source !== controlSource || !Number.isSafeInteger(payload.runId)) return;
    activeRunId = payload.runId;
    previewStyle.textContent = `${payload.previewStyles}\n${payload.css}`;
    previewRoot.innerHTML = payload.html;
    try {
      // This frame is sandboxed without same-origin access. Dynamic execution is
      // intentionally confined here so the application document needs no unsafe-eval.
      Function(`"use strict";\n${payload.js}\n//# sourceURL=learner-preview.js`)();
    } catch (error) {
      send("console", { level:"error", args:[formatValue(error)] });
    }
  });
  parent.postMessage({ source:messageSource, type:"ready" }, "*");
})();
