export const CODE_PREVIEW_FRAME_PATH = "/__codex_code_preview";
export const PREVIEW_CONTROL_SOURCE = "full-stack-quest-code-lab-control";
export const PREVIEW_MESSAGE_SOURCE = "full-stack-quest-code-lab";

export function createCodePreviewPayload({ html, css, js, previewStyles = "", runId }) {
  if (!Number.isSafeInteger(runId) || runId < 1) throw new TypeError("Code preview run ids must be positive integers.");
  return Object.freeze({
    source:PREVIEW_CONTROL_SOURCE,
    runId,
    html:String(html ?? ""),
    css:String(css ?? ""),
    js:String(js ?? ""),
    previewStyles:String(previewStyles ?? ""),
  });
}
