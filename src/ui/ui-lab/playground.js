import { CODE_PREVIEW_FRAME_PATH, createCodePreviewPayload, PREVIEW_MESSAGE_SOURCE } from "../code-preview.js";
import { board } from "./board.js";
import { animateView } from "../view-motion.js";

let draft = null;
export function renderPlayground(container, { onClose }) {
  const controller = new AbortController();
  const { signal } = controller;
  const files = draft || { ...board };
  document.body.classList.add("playground-open");
  container.innerHTML = `<section class="playground" dir="rtl" aria-label="مختبر الواجهات"><iframe title="تجربة الواجهة الحالية" sandbox="allow-scripts" class="playground-board"></iframe><div class="playground-tools"><button type="button" class="system-action system-action--quiet" data-lab-close aria-label="إغلاق مختبر الواجهات">×</button><button type="button" class="system-action system-action--quiet" data-lab-edit aria-expanded="false" aria-controls="lab-editor">الشيفرة</button></div><section class="playground-editor" id="lab-editor" aria-label="تعديل التجربة الحالية" hidden><header><div><h1>مختبر الواجهات</h1><p>فكرة واحدة. جرّب، شارك ملاحظاتك، ثم حسّنها.</p></div><button type="button" class="system-action system-action--quiet" data-lab-hide aria-label="إغلاق محرّر الشيفرة">×</button></header><div class="playground-files">${["html", "css", "js"].map((language) => `<label>${language.toUpperCase()}<textarea data-language="${language}" spellcheck="false" aria-label="${language.toUpperCase()} source"></textarea></label>`).join("")}</div><p data-lab-status role="status"></p><footer><span>تبقى التجارب هنا حتى تطلب إضافتها إلى القوالب الجاهزة.</span><button type="button" class="system-action system-action--secondary" data-lab-clear>مسح اللوحة</button><button type="button" class="system-action system-action--primary" data-lab-run>معاينة</button></footer></section></section>`;
  const frame = container.querySelector("iframe");
  const editor = container.querySelector("#lab-editor");
  const toggle = container.querySelector("[data-lab-edit]");
  const inputs = [...container.querySelectorAll("textarea")];
  inputs.forEach((input) => { input.value = files[input.dataset.language]; });
  let runId = 0;
  let payload;
  frame.addEventListener("load", () => {
    frame.contentWindow?.postMessage(payload, "*");
  }, { signal });
  window.addEventListener("message", event => {
    if (event.source !== frame.contentWindow || event.data?.source !== PREVIEW_MESSAGE_SOURCE) return;
    if (event.data.type === "ready") frame.dataset.previewReady = "true";
    if (event.data.type === "console" && event.data.level === "error" && event.data.runId === runId) {
      container.querySelector("[data-lab-status]").textContent = (event.data.args || []).join(" ");
      showEditor(true);
    }
  }, { signal });
  const render = () => {
    inputs.forEach((input) => { files[input.dataset.language] = input.value; });
    draft = { ...files };
    container.querySelector("[data-lab-status]").textContent = "";
    // Reuse the app's isolated runner so JS works under the app's CSP.
    payload = createCodePreviewPayload({ ...files, runId:++runId,
      previewStyles:"html,body{min-height:100%;height:auto;overflow:auto}body{display:block;padding:0;margin:0;background:white}main[data-preview-root]{min-height:100vh}",
    });
    delete frame.dataset.previewReady;
    frame.src = `${CODE_PREVIEW_FRAME_PATH}?run=${runId}`;
    animateView(frame);
  };
  const showEditor = (open) => {
    editor.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) { animateView(editor); inputs[0].focus(); }
    else toggle.focus();
  };
  toggle.addEventListener("click", () => showEditor(editor.hidden), { signal });
  container.querySelector("[data-lab-hide]").addEventListener("click", () => showEditor(false), { signal });
  container.querySelector("[data-lab-run]").addEventListener("click", () => { render(); showEditor(false); }, { signal });
  container.querySelector("[data-lab-clear]").addEventListener("click", () => { inputs.forEach((input) => { input.value = ""; }); render(); showEditor(false); }, { signal });
  container.querySelector("[data-lab-close]").addEventListener("click", onClose, { signal });
  container.addEventListener("keydown", (event) => { if (event.key === "Escape" && !editor.hidden) { event.preventDefault(); showEditor(false); } }, { signal });
  render();
  container.querySelector("[data-lab-close]").focus({ preventScroll:true });
  return () => { inputs.forEach((input) => { files[input.dataset.language] = input.value; }); draft = { ...files }; controller.abort(); document.body.classList.remove("playground-open"); };
}
