import { localizeShipReady } from "../data/ship-ready-ar.js";
import { SHIP_READY_TEMPLATES } from "../data/ship-ready.js";
import { escapeHtml } from "../lib/dom.js";
import { renderLessonInline } from "../markdown/renderer.js";

const rocky = '<img class="preview-rocky" src="assets/mascot/rocky-standing-still-reduced.svg" alt="" />';
const TEMPLATE_USAGE = {
  "ship-ready-markdown":"اكتب المحتوى وعاين الدرس أثناء الكتابة.",
  "ship-ready":"اشرح فكرة واحدة قبل الانتقال إلى السؤال.",
  "ship-ready-mcq":"تحقّق من الفهم باختيار إجابة واحدة صحيحة.",
  "ship-ready-response":"اطلب من المتعلّم شرح الفكرة بأسلوبه.",
  "ship-ready-sequence":"تحقّق من ترتيب خطوات عملية أو تسلسل.",
  "ship-ready-fill-blanks":"تدرّب على إكمال القيم الناقصة في الشيفرة.",
  "ship-ready-spot-bug":"حدّد موضع الخطأ واشرح سببه.",
  "ship-ready-code-lab":"جرّب HTML وCSS وJavaScript مع معاينة مباشرة.",
};
function preview(route, content) {
  return `<div class="ship-ready-preview ship-ready-live-preview" aria-hidden="true" data-preview-route="${escapeHtml(route)}"><div class="preview-progress"></div>${content}</div>`;
}
const PREVIEW_RENDERERS = {
  markdown:(_, route) => preview(route, '<strong>محرّر المحتوى</strong><span># عنوان الدرس</span><span class="preview-choice">المحتوى ← معاينة الدرس</span>'),
  content:(_, route) => preview(route, '<strong>مساحة المحتوى</strong><span>فكرة واحدة في كل خطوة.</span><span class="preview-choice">السابق &nbsp; · &nbsp; متابعة</span>'),
  mcq:(_, route) => preview(route, '<strong>استجابات HTTP</strong><span class="preview-choice">A &nbsp; 200 OK</span><span class="preview-choice is-selected">C &nbsp; 201 Created</span>'),
  response:(_, route) => preview(route, '<strong>اشرح الفكرة بأسلوبك</strong><span class="preview-choice">إجابتك…</span>' + rocky),
  sequence:(_, route) => `<div class="ship-ready-preview ship-ready-order-preview" aria-hidden="true" data-preview-route="${escapeHtml(route)}"><div class="ship-ready-order-progress"><i></i></div><strong>رتّب الخطوات</strong><div class="ship-ready-order-slots"><span>1&nbsp;&nbsp; النقر على الرابط</span><span>2&nbsp;&nbsp; إرسال الطلب</span></div><div class="ship-ready-order-bank"><i></i><i></i><i></i></div></div>`,
  "fill-blanks":(_, route) => `<div class="ship-ready-preview ship-ready-fill-preview" aria-hidden="true" data-preview-route="${escapeHtml(route)}"><div class="ship-ready-fill-progress"><i></i></div><strong>أكمل الطلب</strong><div class="ship-ready-fill-code"><span>fetch(</span><i></i><span>, { method:</span><i></i><span>})</span></div><div class="ship-ready-fill-options">${['`"POST"`', '`"/api/users"`', '`"GET"`'].map(renderLessonInline).join("")}</div></div>`,
  "spot-bug":(_, route) => `<div class="ship-ready-preview ship-ready-bug-preview" aria-hidden="true" data-preview-route="${escapeHtml(route)}"><strong>أين الخطأ؟</strong>${[1, 2, 3, 4].map((line) => `<div${line === 3 ? ' class="is-selected"' : ""}><span>${line}</span><i></i></div>`).join("")}</div>`,
  code:(_, route) => `<div class="ship-ready-preview ship-ready-code-preview" aria-hidden="true" data-preview-route="${escapeHtml(route)}"><div class="ship-ready-code-copy"><strong>مهمّتك</strong><span></span><span></span><i></i><i></i></div><div class="ship-ready-code-editor"><header><b></b><b></b></header><span></span><span></span><span></span><span></span></div><div class="ship-ready-code-result"><b></b><span></span><span></span></div></div>`,
};

function renderTemplateCard(template) {
  return `<article class="ship-ready-card">
    ${PREVIEW_RENDERERS[template.preview.type](template.preview, template.route)}
    <div class="ship-ready-card-copy"><div><p>${escapeHtml(template.label)}</p><h3>${escapeHtml(template.title)}</h3></div><p class="ship-ready-use">${TEMPLATE_USAGE[template.route]}</p><button type="button" class="system-action system-action--secondary" data-open-template="${escapeHtml(template.route)}">افتح القالب</button></div>
  </article>`;
}

export function renderShipReadyLibrary(panel, { onOpenTemplate }) {
  panel.innerHTML = `<section class="ship-ready-library" aria-labelledby="ship-ready-title">
    <header class="ship-ready-header"><p>جاهز للاستخدام</p><h2 id="ship-ready-title">قوالب جاهزة</h2><span>قوالب دروس متوافقة مع نظام تصميمنا. افتح القالب لتجربة تفاعلاته.</span></header>
    <div class="ship-ready-grid">${SHIP_READY_TEMPLATES.map(localizeShipReady).map(renderTemplateCard).join("")}</div>
  </section>`;

  panel.querySelectorAll("[data-open-template]").forEach((button) => {
    button.addEventListener("click", () => onOpenTemplate(button, button.dataset.openTemplate));
  });
}
