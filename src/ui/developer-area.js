import { escapeHtml } from "../lib/dom.js";
import { animateView } from "./view-motion.js";

export function renderDeveloperLab(panel, { onOpenLab }) {
  panel.innerHTML = `<section class="developer-panel developer-lab-entry" dir="rtl"><div class="developer-section-title"><span>مختبر الواجهات</span><h2>لوحة فارغة لفكرتك القادمة</h2><p>جرّب الرسومات والمكوّنات باستخدام HTML وCSS وJavaScript. شارك ملاحظاتك وحسّن الفكرة، ثم اطلب إضافتها إلى القوالب الجاهزة عندما تعجبك.</p></div><button type="button" class="system-action system-action--primary" data-open-lab>افتح لوحة التجربة ↖</button></section>`;
  panel.querySelector("[data-open-lab]").addEventListener("click", (event) => onOpenLab(event.currentTarget));
}

export function renderDeveloperStudio(panel) {
  const studioUrl = new URL(window.location.href);
  studioUrl.port = "4177";
  studioUrl.pathname = "/";
  studioUrl.search = "";
  studioUrl.hash = "";
  panel.innerHTML = `<section class="developer-panel developer-studio" dir="rtl"><img src="assets/mascot/rocky-standing-still-reduced.svg" alt="" /><div><span>استوديو الحركة</span><h2>امنح شخصياتك الحياة</h2><p>افتح الاستوديو لتعديل روكي ومعاينة حركته وتجهيزها للتطبيق.</p><a class="developer-primary" href="${escapeHtml(studioUrl.href)}" target="_blank" rel="noopener">افتح استوديو الحركة ↖</a><p class="developer-hint">إذا كان الاستوديو متوقفًا، شغّل <code dir="rtl">npm run dev</code> داخل <code>mascot-studio</code>. يعمل على المنفذ 4177.</p></div></section>`;
}

export function renderDeveloperData(panel) {
  panel.innerHTML = `<section class="developer-panel" dir="rtl"><div class="developer-section-title"><span>بيانات التطوير</span><h2>بداية جديدة للاختبار</h2><p>امسح تقدّم الدروس والنقاط والمراجعات وبيانات التجربة في هذا المتصفح، أو أعد ضبط قاعدة الحسابات المحلية أيضًا. تُحفظ أفكار المختبر وملفات التصميم والحركة.</p></div><div class="developer-reset-actions"><button type="button" data-reset="browser">مسح بيانات التعلّم في المتصفح</button><button type="button" data-reset="database">مسح قاعدة البيانات المحلية</button></div><p role="status" data-reset-status></p><dialog class="developer-confirm" dir="rtl"><form method="dialog"><h2>تأكيد مسح البيانات</h2><p data-reset-description></p><div><button value="cancel" autofocus>إلغاء</button><button value="confirm" class="developer-danger">مسح البيانات</button></div></form></dialog></section>`;
  const dialog = panel.querySelector("dialog");
  const status = panel.querySelector("[data-reset-status]");
  let pending = null;
  let opener = null;
  panel.querySelectorAll("[data-reset]").forEach((button) => button.addEventListener("click", () => {
    pending = button.dataset.reset;
    opener = button;
    dialog.querySelector("[data-reset-description]").textContent = pending === "database"
      ? "سيحذف هذا جميع الحسابات والجلسات المحلية وبيانات التعلّم في المتصفح. لا يمكن التراجع عن ذلك."
      : "سيحذف هذا التقدّم والنقاط والمراجعات وبيانات التجربة من المتصفح. تبقى الحسابات محفوظة.";
    dialog.returnValue = "cancel";
    dialog.showModal();
    animateView(dialog);
  }));
  dialog.addEventListener("close", async () => {
    opener?.focus();
    if (dialog.returnValue !== "confirm") return;
    const buttons = [...panel.querySelectorAll("[data-reset]")];
    buttons.forEach((button) => { button.disabled = true; });
    status.textContent = "جارٍ مسح البيانات…";
    try {
      if (pending === "database") {
        const response = await fetch("/api/developer/reset", { method:"POST", headers:{ "X-Developer-Reset":"confirm" } });
        if (!response.ok) throw new Error("Database reset unavailable");
      }
      for (const storage of [localStorage, sessionStorage]) {
        Object.keys(storage).filter((key) => /^(tawjihi:|full-stack-quest:)/.test(key)).forEach((key) => storage.removeItem(key));
      }
      window.location.assign("?page=more");
    } catch {
      status.textContent = "تعذّر مسح البيانات. تتطلب إعادة ضبط القاعدة تشغيل خادم التطوير محليًا.";
      buttons.forEach((button) => { button.disabled = false; });
    }
  });
}
