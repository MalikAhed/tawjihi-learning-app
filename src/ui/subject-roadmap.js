import { escapeHtml } from "../lib/dom.js";
import { getUnitPartProgress } from "../data/subject-progress-store.js";

const lock = '<svg class="roadmap-lock" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 14v-4a6 6 0 0 1 12 0v4" fill="none" stroke="currentColor" stroke-width="4"/><rect x="6" y="13" width="20" height="16" rx="4" fill="currentColor" stroke="none"/></svg>';

const check = '<svg class="roadmap-complete-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4.5 4.5L19 7"/></svg>';

function lessonGroup(unit, lesson, { isLessonLocked, getPartProgress, isPartLocked }) {
  const locked = Boolean(isLessonLocked?.(unit, lesson));
  const parts = lesson.parts || [];
  const completed = parts.filter((part) => part.startStepId && getPartProgress?.(lesson, part)?.completed).length;
  const available = parts.some((part) => part.startStepId);
  const stops = parts.map((part, index) => {
    const available = Boolean(part.startStepId);
    const progress = available ? getPartProgress?.(lesson, part) : null;
    const state = progress?.completed ? "completed" : progress?.completedStepIds?.length ? "in-progress" : "not-started";
    const pathLocked = Boolean(isPartLocked?.(lesson, part));
    const status = !available ? "قيد الإعداد" : state === "completed" ? "مكتمل" : state === "in-progress" ? "تابع التعلّم" : "";
    const positions = [200, 328, 200, 72];
    const from = positions[index % 4];
    const to = positions[(index + 1) % 4];
    const connector = index < parts.length - 1 ? `<svg class="roadmap-connector" viewBox="0 0 400 28" preserveAspectRatio="none" aria-hidden="true"><path pathLength="100" d="M ${from} 6 C ${from} 14 ${to} 14 ${to} 22"/></svg>` : "";
    const number = part.number ?? index + 1;
    return `<li class="roadmap-stop" data-part-state="${state}"><div class="roadmap-node"><button class="roadmap-part" type="button" data-roadmap-unit="${escapeHtml(unit.id)}" data-roadmap-lesson="${escapeHtml(lesson.id)}" data-roadmap-part="${escapeHtml(part.id)}" data-unit-label="${escapeHtml(lesson.label)}" data-lesson-label="${escapeHtml(part.label)}" data-part-pages="${escapeHtml(part.pages)}" data-part-state="${state}" data-part-available="${available}" data-path-locked="${pathLocked}"${locked ? ' data-account-locked="true"' : ""} aria-controls="roadmap-part-brief" aria-expanded="false" aria-label="${escapeHtml(part.label)}${status ? `، ${status}` : ""}${locked ? "، يتطلب حسابًا" : ""}"><span class="roadmap-part-number" aria-hidden="true">${state === "completed" ? check : pathLocked || locked || !available ? lock : escapeHtml(String(number))}</span></button><span class="roadmap-part-copy"><strong>${escapeHtml(part.label)}</strong></span>${status || locked ? `<span class="roadmap-part-status">${locked ? '<span aria-hidden="true">🔒</span> ' : ""}${status}</span>` : ""}</div>${connector}</li>`;
  }).join("");
  return `<section class="roadmap-lesson-group"><header class="roadmap-lesson-divider"><div class="roadmap-lesson-heading"><h3>${escapeHtml(lesson.label)}${lesson.recommended ? '<span class="roadmap-recommended">موصى به</span>' : ""}</h3><span>${parts.length} أجزاء${available ? ` · ${completed} مكتمل` : " · قيد الإعداد"}</span></div></header><ol class="roadmap-parts" aria-label="أجزاء ${escapeHtml(lesson.label)}">${stops}</ol></section>`;
}

function reviewCard(unit, { getPartReview, isLessonLocked }) {
  const items = unit.lessons.flatMap((lesson) => (lesson.parts || []).flatMap((part) => {
    const active = getPartReview?.(lesson, part)?.filter((item) => item.active) || [];
    if (!active.length) return [];
    return [{ lesson, part, active, locked:Boolean(isLessonLocked?.(unit, lesson)) }];
  })).sort((a, b) => Math.max(...b.active.map((item) => item.misses)) - Math.max(...a.active.map((item) => item.misses)));
  return `<aside class="roadmap-review-card" aria-label="أجزاء بحاجة للمراجعة"><div class="roadmap-review-heading"><span class="roadmap-review-icon" aria-hidden="true"><img src="assets/icons/dashboard-review-alert.svg" alt="" width="56" height="56" /></span><div><h3>بحاجة للمراجعة <span data-review-count>${items.length}</span></h3>${items.length ? "<p>أجزاء احتجت فيها إلى أكثر من محاولة. راجعها على مهلك.</p>" : ""}</div></div>${items.length ? `<div class="roadmap-review-items">${items.map(({ lesson, part, active, locked }) => `<button type="button" class="roadmap-review-item" data-review-part="${escapeHtml(part.id)}" data-review-lesson="${escapeHtml(lesson.id)}" data-review-step="${escapeHtml(active[0].stepId)}"${!part.startStepId ? " disabled" : ""}><span><strong>${escapeHtml(part.label)}</strong><small>${escapeHtml(lesson.label)} · تعثّر متكرر في أسئلة الجزء</small></span><b>${locked ? "يتطلب حسابًا" : !part.startStepId ? "غير متاح حاليًا" : "راجع الآن"}</b></button>`).join("")}</div>` : ""}</aside>`;
}

function unitCard(unit, options) {
  const { completed, total, percent } = getUnitPartProgress(unit, options.getPartProgress);
  const answered = unit.lessons.reduce((sum, lesson) => sum + (lesson.parts || []).reduce((count, part) => count + (options.getPartReview?.(lesson, part)?.length || 0), 0), 0);
  const lessons = unit.lessons.map((lesson) => lessonGroup(unit, lesson, options)).join("");
  // Keep the textbook's unit numbering, including gaps, instead of deriving it from array order.
  const separator = unit.label.indexOf(":");
  const unitLabel = separator > 0 ? unit.label.slice(0, separator).trim() : "مسار التعلّم";
  const title = separator > 0 ? unit.label.slice(separator + 1).trim() : unit.label;
  const icon = unit.lessons.some((lesson) => lesson.id === "database-management")
    ? "assets/icons/microsoft-access.svg" : "assets/icons/dashboard-lessons.svg";
  return `<section class="roadmap-unit" data-unit="${escapeHtml(unit.id)}"><header class="roadmap-unit-header"><div class="roadmap-unit-overview"><span class="roadmap-unit-icon" aria-hidden="true"><img src="${icon}" alt="" width="64" height="64" /></span><div class="roadmap-unit-title"><span>${escapeHtml(unitLabel)}</span><h2>${escapeHtml(title)}</h2></div></div><div class="roadmap-unit-panels"><div class="roadmap-unit-progress"><div class="roadmap-unit-progress-label"><span>تقدّمك في الوحدة</span></div><div class="roadmap-unit-progress-bar"><strong data-unit-percent><bdi>${percent}%</bdi></strong><progress value="${completed}" max="${total || 1}" aria-label="إنجاز أجزاء ${escapeHtml(unit.label)}" aria-valuetext="${completed} من ${total} جزء مكتمل"></progress></div></div><div class="roadmap-unit-completed"><img src="assets/icons/dashboard-solved-check.svg" alt="" width="56" height="56" /><div><strong>${answered}</strong><span data-unit-progress-count>أسئلة محلولة</span></div></div>${reviewCard(unit, options)}</div></header><div class="roadmap-lessons">${lessons}</div></section>`;
}

export function renderSubjectRoadmapMarkup(roadmap, options = {}) {
  const parts = roadmap.units.flatMap(unit => unit.lessons.flatMap(lesson => (lesson.parts || []).map(part => ({ lesson, part }))));
  const next = parts.find(({ lesson, part }) => !lesson.optional && (!part.startStepId || !options.getPartProgress?.(lesson, part)?.completed));
  options = { ...options, isPartLocked:(lesson, part) => !lesson.optional && !options.getPartProgress?.(lesson, part)?.completed && part !== next?.part };
  return `<section class="subject-roadmap" data-subject="${escapeHtml(roadmap.subjectId)}" aria-label="وحدات المادة"><div class="roadmap-unit-grid">${roadmap.units.map((unit) => unitCard(unit, options)).join("")}</div><aside id="roadmap-part-brief" class="roadmap-lesson-bubble" data-roadmap-bubble aria-live="polite" hidden><button class="roadmap-bubble-close" type="button" data-bubble-close aria-label="إغلاق تفاصيل الجزء">×</button><p data-bubble-unit></p><h4 data-bubble-lesson></h4><p class="roadmap-book-tag" data-bubble-summary><svg class="roadmap-book-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill="#D98B00" d="M5 12c7-3 13-2 19 2 6-4 12-5 19-2v26c0 2-2 3-4 2-5-2-10-1-15 2-5-3-10-4-15-2-2 1-4 0-4-2Z"/><path fill="#FFBE18" d="M4 9c7-3 14-2 20 2 6-4 13-5 20-2v26c0 2-2 3-4 2-6-2-11-1-16 2-5-3-10-4-16-2-2 1-4 0-4-2Z"/><path fill="#FFF8DC" d="M8 8c6-1 11 0 16 3v23c-5-3-10-4-16-3Z"/><path fill="#FFF" d="M40 8c-6-1-11 0-16 3v23c5-3 10-4 16-3Z"/><path d="M24 12v21" stroke="#F3D581" stroke-width="2.5"/><path d="m12 16 7 2m-7 5 7 2m10-7 7-2m-7 9 7-2" stroke="#EBC969" stroke-width="3"/><path fill="#1CB0F6" d="M32 7h5v12l-2.5-2-2.5 2Z"/></svg><span data-bubble-summary-text></span></p><div class="roadmap-account-gate" data-roadmap-account-gate hidden><strong>أنشئ حسابًا لمتابعة بقية الدروس</strong><span>سنحفظ تقدّمك ونفتح لك جميع الميزات المتاحة.</span></div><div class="roadmap-bubble-actions"><button class="roadmap-bubble-start" type="button" data-bubble-start>ابدأ الجزء</button><button class="roadmap-bubble-sign-in" type="button" data-bubble-sign-in hidden>لدي حساب بالفعل</button></div></aside></section>`;
}

export function mountSubjectRoadmap({ container, roadmap, onStartLesson, isLessonLocked, onRequireAccount, getPartProgress, getPartReview }) {
  if (!container || !roadmap) throw new TypeError("subject roadmap dependencies are required");
  const controller = new AbortController();
  container.innerHTML = renderSubjectRoadmapMarkup(roadmap, { isLessonLocked, getPartProgress, getPartReview });
  container.querySelectorAll("[data-review-part]").forEach((button) => button.addEventListener("click", () => {
    const unit = roadmap.units.find((unit) => unit.id === button.closest("[data-unit]").dataset.unit);
    const lesson = unit?.lessons.find((lesson) => lesson.id === button.dataset.reviewLesson);
    const part = lesson?.parts.find((part) => part.id === button.dataset.reviewPart);
    if (!part?.startStepId) return;
    if (isLessonLocked?.(unit, lesson)) { onRequireAccount?.("register"); return; }
    onStartLesson?.({ subjectId:roadmap.subjectId, unitId:unit.id, lessonId:lesson.id, lessonLabel:part.label, partId:part.id, reviewStepId:button.dataset.reviewStep, opener:button });
  }, { signal:controller.signal }));
  const bubble = container.querySelector("[data-roadmap-bubble]");
  let activeButton = null;
  const closeBubble = ({ restoreFocus = true } = {}) => {
    bubble.hidden = true;
    activeButton?.setAttribute("aria-expanded", "false");
    if (restoreFocus) activeButton?.focus({ preventScroll:true });
  };
  container.querySelectorAll("[data-roadmap-part]").forEach((button) => button.addEventListener("click", () => {
    const wasOpen = activeButton === button && !bubble.hidden;
    closeBubble({ restoreFocus:false });
    if (wasOpen) return;
    activeButton = button;
    button.setAttribute("aria-expanded", "true");
    const locked = button.dataset.accountLocked === "true";
    const unavailable = button.dataset.partAvailable === "false";
    const pathLocked = button.dataset.pathLocked === "true";
    bubble.querySelector("[data-bubble-unit]").textContent = button.dataset.unitLabel;
    bubble.querySelector("[data-bubble-lesson]").textContent = button.dataset.lessonLabel;
    const summary = bubble.querySelector("[data-bubble-summary]");
    summary.classList.toggle("roadmap-book-tag", !unavailable);
    summary.querySelector("svg").style.display = unavailable ? "none" : "";
    const summaryText = summary.querySelector("[data-bubble-summary-text]");
    summaryText.replaceChildren();
    if (pathLocked && !unavailable) summaryText.textContent = "أكمل الجزء السابق لفتح هذا الجزء.";
    else if (unavailable) summaryText.textContent = "نعمل على إعداد هذا الجزء. يمكنك العودة إلى الأجزاء المتاحة.";
    else {
      const pages = document.createElement("bdi");
      pages.dir = "ltr";
      pages.textContent = button.dataset.partPages;
      summaryText.append("صفحات الكتاب: ", pages);
    }
    bubble.querySelector("[data-roadmap-account-gate]").hidden = !locked;
    bubble.querySelector("[data-bubble-sign-in]").hidden = !locked;
    const start = bubble.querySelector("[data-bubble-start]");
    start.disabled = !locked && (unavailable || pathLocked);
    start.textContent = locked ? "إنشاء حساب" : pathLocked && !unavailable ? "أكمل الجزء السابق" : unavailable ? "هذا الجزء قيد الإعداد" : button.dataset.partState === "completed" ? "راجع الجزء" : button.dataset.partState === "in-progress" ? "تابع الجزء" : "ابدأ الجزء";
    button.closest(".roadmap-stop").append(bubble);
    bubble.style.removeProperty("top");
    bubble.hidden = false;
    if (window.matchMedia("(pointer:fine)").matches) bubble.querySelector((unavailable || pathLocked) && !locked ? "[data-bubble-close]" : "[data-bubble-start]").focus({ preventScroll:true });
    requestAnimationFrame(() => {
      if (bubble.hidden) return;
      if (window.matchMedia("(max-width:1199px)").matches) {
        const stop = button.closest(".roadmap-stop").getBoundingClientRect();
        const node = button.closest(".roadmap-node").getBoundingClientRect();
        const height = bubble.getBoundingClientRect().height;
        const bottomLimit = window.innerHeight - 20;
        const below = node.bottom + 12;
        const above = node.top - height - 12;
        const top = below + height <= bottomLimit ? below : above >= 80 ? above : Math.max(80, bottomLimit - height);
        bubble.style.top = `${top - stop.top}px`;
      } else {
        bubble.scrollIntoView({ block:"nearest", behavior:window.matchMedia("(prefers-reduced-motion:reduce)").matches ? "instant" : "smooth" });
      }
    });
  }, { signal:controller.signal }));
  container.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !bubble.hidden) { event.preventDefault(); closeBubble(); }
  }, { signal:controller.signal });
  bubble.querySelector("[data-bubble-close]").addEventListener("click", () => closeBubble(), { signal:controller.signal });
  bubble.querySelector("[data-bubble-start]").addEventListener("click", () => {
    if (activeButton.dataset.accountLocked === "true") { onRequireAccount?.("register"); return; }
    if (activeButton.dataset.partAvailable !== "true" || activeButton.dataset.pathLocked === "true") return;
    const selection = Object.freeze({
      subjectId:roadmap.subjectId, unitId:activeButton.dataset.roadmapUnit,
      lessonId:activeButton.dataset.roadmapLesson, lessonLabel:activeButton.dataset.lessonLabel,
      partId:activeButton.dataset.roadmapPart, opener:activeButton,
    });
    closeBubble({ restoreFocus:false });
    onStartLesson?.(selection);
  }, { signal:controller.signal });
  bubble.querySelector("[data-bubble-sign-in]").addEventListener("click", () => onRequireAccount?.("sign-in"), { signal:controller.signal });
  return Object.freeze({ destroy() { controller.abort(); } });
}
