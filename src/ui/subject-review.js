import { escapeHtml } from "../lib/dom.js";
import { animateView } from "./view-motion.js";

export function collectUnitReviews(unit, getPartReview) {
  return unit.lessons.flatMap(lesson => (lesson.parts || []).flatMap(part => {
    const questions = getPartReview?.(lesson, part) || [];
    const active = questions.filter(item => item.active).sort((a,b) => b.misses - a.misses);
    return active.length ? [{ lesson, part, active }] : [];
  })).sort((a,b) => b.active[0].misses - a.active[0].misses);
}

export function renderUnitReviewPanel(unit, options) {
  const items = collectUnitReviews(unit, options.getPartReview);
  const questions = items.reduce((sum,item) => sum + item.active.length,0);
  const misses = items.reduce((sum,item) => sum + item.active.reduce((n,q) => n + q.misses,0),0);
  return `<section id="review-${escapeHtml(unit.id)}" class="roadmap-review-panel" role="region" aria-label="مراجعة ${escapeHtml(unit.label)}" tabindex="0" hidden>
    <button type="button" class="roadmap-review-back" data-review-back>العودة إلى الدروس</button><header class="roadmap-review-intro"><div><h3>مراجعة على قدر حاجتك</h3><p>ابدأ بالجزء الذي يحتاج انتباهك أكثر. افتح السؤال لتراجع الشرح وتتدرّب عليه.</p></div></header>
    <dl class="roadmap-review-stats"><div><dt>أجزاء للمراجعة</dt><dd>${items.length}</dd></div><div><dt>أسئلة تحتاج تدريبًا</dt><dd>${questions}</dd></div><div><dt>إجابات غير صحيحة مسجّلة</dt><dd>${misses}</dd></div></dl>
    ${items.length ? `<p class="roadmap-review-note">الأكثر أخطاءً أولًا · تنخفض قائمة المراجعة عندما تجيب بشكل صحيح أثناء المراجعة.</p><div class="roadmap-review-items">${items.map(({ lesson, part, active }) => {
      const locked = options.isLessonLocked?.(unit,lesson);
      return `<article class="roadmap-review-entry"><div><small>${escapeHtml(lesson.label)}</small><h4>${escapeHtml(part.label)}</h4><p>${active.length} سؤال بحاجة للتدريب · ${active.reduce((n,q)=>n+q.misses,0)} إجابة غير صحيحة مسجّلة</p></div><button type="button" class="roadmap-review-item" data-review-part="${escapeHtml(part.id)}" data-review-lesson="${escapeHtml(lesson.id)}" data-review-step="${escapeHtml(active[0].stepId)}"${!part.startStepId ? " disabled" : ""}><b>${!part.startStepId ? "غير متاح حاليًا" : locked ? "يتطلب حسابًا" : "راجع الآن"}</b></button></article>`;
    }).join("")}</div>` : '<div class="roadmap-review-empty"><h4>لا توجد أسئلة تحتاج مراجعة الآن</h4><p>تابع الدروس. ستجد هنا الأسئلة التي تحتاج إلى تدريب إضافي عندما تظهر.</p></div>'}
  </section>`;
}

export function mountUnitReview(container, { signal, onChange } = {}) {
  const show = (unit, review, focus = false) => {
    const lessons = unit.querySelector('.roadmap-lessons');
    const panel = unit.querySelector('.roadmap-review-panel');
    lessons.hidden = review;
    panel.hidden = !review;
    unit.querySelector('.roadmap-guide')?.close();
    animateView(review ? panel : lessons);
    if (focus) (review ? panel : unit.querySelector('[data-unit-guide]')).focus();
    onChange?.(review ? unit.dataset.unit : null);
  };
  container.querySelectorAll('[data-unit-review],[data-review-back]').forEach(button => {
    button.addEventListener('click', () => show(button.closest('[data-unit]'),button.hasAttribute('data-unit-review'),true), { signal });
  });
  return unitId => {
    const unit = [...container.querySelectorAll('[data-unit]')].find(unit => unit.dataset.unit === unitId);
    if (unit) show(unit,true);
  };
}
