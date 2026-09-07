import { escapeHtml } from "../lib/dom.js";
import { animateView } from "./view-motion.js";

export function collectUnitReviews(unit, getPartReview) {
  return unit.lessons.flatMap(lesson => (lesson.parts || []).flatMap(part => {
    const questions = getPartReview?.(lesson, part) || [];
    const active = questions.filter(item => item.active).sort((a,b) => b.misses - a.misses);
    return active.length ? [{ lesson, part, active }] : [];
  })).sort((a,b) => b.active[0].misses - a.active[0].misses);
}

export function renderReviewSummary(unit, options) {
  const count = collectUnitReviews(unit, options.getPartReview).length;
  return `<aside class="roadmap-review-card" aria-label="أجزاء بحاجة للمراجعة"><div class="roadmap-review-heading"><span class="roadmap-review-icon" aria-hidden="true"><img src="assets/icons/dashboard-review-alert.svg" alt="" width="44" height="44"></span><div><h3>أجزاء للمراجعة <span class="ui-number" data-review-count>${count}</span></h3></div></div></aside>`;
}

export function renderUnitReviewPanel(unit, options) {
  const items = collectUnitReviews(unit, options.getPartReview);
  const questions = items.reduce((sum,item) => sum + item.active.length,0);
  const misses = items.reduce((sum,item) => sum + item.active.reduce((n,q) => n + q.misses,0),0);
  return `<section id="review-${escapeHtml(unit.id)}" class="roadmap-review-panel" role="tabpanel" aria-labelledby="review-tab-${escapeHtml(unit.id)}" tabindex="0" hidden>
    <header class="roadmap-review-intro"><div><h3>مراجعة على قدر حاجتك</h3><p>ابدأ بالجزء الذي يحتاج انتباهك أكثر. افتح السؤال لتراجع الشرح وتتدرّب عليه.</p></div></header>
    <dl class="roadmap-review-stats"><div><dt>أجزاء للمراجعة</dt><dd>${items.length}</dd></div><div><dt>أسئلة تحتاج تدريبًا</dt><dd>${questions}</dd></div><div><dt>إجابات غير صحيحة مسجّلة</dt><dd>${misses}</dd></div></dl>
    ${items.length ? `<p class="roadmap-review-note">الأكثر أخطاءً أولًا · تنخفض قائمة المراجعة عندما تجيب بشكل صحيح أثناء المراجعة.</p><div class="roadmap-review-items">${items.map(({ lesson, part, active }) => {
      const locked = options.isLessonLocked?.(unit,lesson);
      return `<article class="roadmap-review-entry"><div><small>${escapeHtml(lesson.label)}</small><h4>${escapeHtml(part.label)}</h4><p>${active.length} سؤال بحاجة للتدريب · ${active.reduce((n,q)=>n+q.misses,0)} إجابة غير صحيحة مسجّلة</p></div><button type="button" class="roadmap-review-item" data-review-part="${escapeHtml(part.id)}" data-review-lesson="${escapeHtml(lesson.id)}" data-review-step="${escapeHtml(active[0].stepId)}"${!part.startStepId ? " disabled" : ""}><b>${!part.startStepId ? "غير متاح حاليًا" : locked ? "يتطلب حسابًا" : "راجع الآن"}</b></button></article>`;
    }).join("")}</div>` : '<div class="roadmap-review-empty"><h4>لا توجد أسئلة تحتاج مراجعة الآن</h4><p>تابع الدروس. ستجد هنا الأسئلة التي تحتاج إلى تدريب إضافي عندما تظهر.</p></div>'}
  </section>`;
}

export function mountUnitReviewTabs(container, { signal, onChange } = {}) {
  const show = (unit, review, focus = false) => {
    const tabs = [...unit.querySelectorAll('[role="tab"]')];
    tabs.forEach(tab => {
      const selected = (tab.dataset.unitTab === 'review') === review;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !selected;
      if (selected) { animateView(panel); if (focus) tab.focus(); }
    });
    onChange?.(review ? unit.dataset.unit : null);
  };
  container.querySelectorAll('[data-unit-tab]').forEach(tab => {
    tab.addEventListener('click', () => show(tab.closest('[data-unit]'),tab.dataset.unitTab === 'review'), { signal });
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const review = event.key === 'Home' ? false : event.key === 'End' ? true : tab.dataset.unitTab !== 'review';
      show(tab.closest('[data-unit]'),review,true);
    }, { signal });
  });
  return unitId => {
    const unit = [...container.querySelectorAll('[data-unit]')].find(unit => unit.dataset.unit === unitId);
    if (unit) show(unit,true);
  };
}
