import { renderReviewSummary, renderUnitReviewPanel, mountUnitReviewTabs } from "./subject-review.js";
import { escapeHtml } from "../lib/dom.js";
import { getUnitPartProgress } from "../domain/subject-progress.js";
import { getSubjectPartAccess } from "../domain/subject-access.js";
import { getShellViewportBounds } from "./app-shell.js";
import { formatArabicCount, isProgressLabelCovered } from "./learner-format.js";

const lock = '<svg class="roadmap-lock" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 14v-4a6 6 0 0 1 12 0v4" fill="none" stroke="currentColor" stroke-width="4"/><rect x="6" y="13" width="20" height="16" rx="4" fill="currentColor" stroke="none"/></svg>';

const check = '<svg class="roadmap-complete-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4.5 4.5L19 7"/></svg>';

function lessonGroup(unit, lesson, { getPartProgress, getAccess }) {
  const parts = lesson.parts || [];
  const completed = parts.filter((part) => part.startStepId && getPartProgress?.(lesson, part)?.completed).length;
  const available = parts.some((part) => part.startStepId);
  const stops = parts.map((part, index) => {
    const available = Boolean(part.startStepId);
    const progress = available ? getPartProgress?.(lesson, part) : null;
    const state = progress?.completed ? "completed" : progress?.completedStepIds?.length ? "in-progress" : "not-started";
    const access = getAccess(lesson, part);
    const pathLocked = access.state === "previous-required";
    const locked = access.state === "account-required";
    const status = { unpublished:"قيد الإعداد", "account-required":"يتطلب حسابًا", "previous-required":"أكمل الجزء السابق", completed:"مكتمل", "in-progress":"تابع التعلّم", available:"متاح للبدء" }[access.state];
    const positions = [200, 328, 200, 72];
    const from = positions[index % 4];
    const to = positions[(index + 1) % 4];
    const connector = index < parts.length - 1 ? `<svg class="roadmap-connector" viewBox="0 0 400 28" preserveAspectRatio="none" aria-hidden="true"><path pathLength="100" d="M ${from} 6 C ${from} 14 ${to} 14 ${to} 22"/></svg>` : "";
    const number = part.number ?? index + 1;
    return `<li class="roadmap-stop" data-part-state="${state}"><div class="roadmap-node"><button class="roadmap-part" type="button" data-roadmap-unit="${escapeHtml(unit.id)}" data-roadmap-lesson="${escapeHtml(lesson.id)}" data-roadmap-part="${escapeHtml(part.id)}" data-unit-label="${escapeHtml(lesson.label)}" data-lesson-label="${escapeHtml(part.label)}" data-part-pages="${escapeHtml(part.pages)}" data-part-state="${state}" data-part-available="${available}" data-path-locked="${pathLocked}" data-access-state="${access.state}"${locked ? ' data-account-locked="true"' : ""} aria-controls="roadmap-part-brief" aria-expanded="false" aria-label="${escapeHtml(part.label)}${status ? `، ${status}` : ""}"><span class="roadmap-part-number" aria-hidden="true">${state === "completed" ? check : pathLocked || locked || !available ? lock : escapeHtml(String(number))}</span></button><span class="roadmap-part-copy"><strong>${escapeHtml(part.label)}</strong></span>${status || locked ? `<span class="roadmap-part-status">${locked ? '<span aria-hidden="true">🔒</span> ' : ""}${status}</span>` : ""}</div>${connector}</li>`;
  }).join("");
  return `<section class="roadmap-lesson-group"><header class="roadmap-lesson-divider"><div class="roadmap-lesson-heading"><h3>${escapeHtml(lesson.label)}${lesson.recommended ? '<span class="roadmap-recommended">موصى به</span>' : ""}</h3><span>${formatArabicCount(parts.length, "part")}${available ? ` · ${completed} مكتمل` : " · قيد الإعداد"}</span></div></header><ol class="roadmap-parts" aria-label="أجزاء ${escapeHtml(lesson.label)}">${stops}</ol></section>`;
}


function unitCard(unit, options) {
  const { completed, total, percent } = getUnitPartProgress(unit, options.getPartProgress);
  const answered = unit.lessons.reduce((sum, lesson) => sum + (lesson.parts || []).reduce((count, part) => count + (options.getPartReview?.(lesson, part)?.filter(item => item.solved).length || 0), 0), 0);
  const lessons = unit.lessons.map((lesson) => lessonGroup(unit, lesson, options)).join("");
  // Keep the textbook's unit numbering, including gaps, instead of deriving it from array order.
  const separator = unit.label.indexOf(":");
  const unitLabel = separator > 0 ? unit.label.slice(0, separator).trim() : "مسار التعلّم";
  const title = separator > 0 ? unit.label.slice(separator + 1).trim() : unit.label;
  const icon = unit.lessons.some((lesson) => lesson.id === "database-management")
    ? "assets/icons/microsoft-access.svg" : "assets/icons/dashboard-lessons.svg";
  return `<section class="roadmap-unit" data-unit="${escapeHtml(unit.id)}"><header class="roadmap-unit-header"><div class="roadmap-unit-overview"><span class="roadmap-unit-icon" aria-hidden="true"><img src="${icon}" alt="" width="64" height="64" /></span><div class="roadmap-unit-title"><span>${escapeHtml(unitLabel)}</span><h2>${escapeHtml(title)}</h2></div></div><div class="roadmap-unit-panels"><div class="roadmap-unit-progress"><div class="roadmap-unit-progress-label"><span>تقدّمك في الوحدة</span></div><div class="roadmap-unit-progress-bar" data-label-covered="${isProgressLabelCovered(completed, total)}"><strong data-unit-percent><bdi class="ui-number">${percent}%</bdi></strong><progress value="${completed}" max="${total || 1}" aria-label="إنجاز أجزاء ${escapeHtml(unit.label)}" aria-valuetext="${completed} من ${total} جزء مكتمل"></progress></div></div><div class="roadmap-unit-completed"><img src="assets/icons/dashboard-solved-check.svg" alt="" width="56" height="56" /><div><strong class="ui-number">${answered}</strong><span data-unit-progress-count>أسئلة محلولة</span></div></div>${renderReviewSummary(unit, options)}</div></header><div class="roadmap-unit-tabs" role="tablist" aria-label="عرض الوحدة"><button type="button" id="lessons-tab-${escapeHtml(unit.id)}" role="tab" data-unit-tab="lessons" aria-selected="true" aria-controls="lessons-${escapeHtml(unit.id)}">الدروس</button><button type="button" id="review-tab-${escapeHtml(unit.id)}" role="tab" data-unit-tab="review" aria-selected="false" tabindex="-1" aria-controls="review-${escapeHtml(unit.id)}">المراجعة</button></div><div id="lessons-${escapeHtml(unit.id)}" class="roadmap-lessons" role="tabpanel" aria-labelledby="lessons-tab-${escapeHtml(unit.id)}">${lessons}</div>${renderUnitReviewPanel(unit, options)}</section>`;
}

export function renderSubjectRoadmapMarkup(roadmap, options = {}) {
  options = { ...options, getAccess:(lesson, part) => getSubjectPartAccess(roadmap, { lessonId:lesson.id, partId:part.id, getPartProgress:options.getPartProgress, accountRequired:options.isLessonLocked?.(roadmap.units.find(unit => unit.lessons.includes(lesson)), lesson) }) };
  return `<section class="subject-roadmap" data-subject="${escapeHtml(roadmap.subjectId)}" aria-label="وحدات المادة"><div class="roadmap-unit-grid">${roadmap.units.map((unit) => unitCard(unit, options)).join("")}</div><aside id="roadmap-part-brief" class="roadmap-lesson-bubble" data-roadmap-bubble role="region" aria-labelledby="roadmap-bubble-title" hidden><button class="roadmap-bubble-close" type="button" data-bubble-close aria-label="إغلاق تفاصيل الجزء">×</button><div class="roadmap-bubble-copy"><p data-bubble-unit></p><h4 id="roadmap-bubble-title" data-bubble-lesson></h4><p class="roadmap-book-tag" data-bubble-summary><svg class="roadmap-book-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill="#D98B00" d="M5 12c7-3 13-2 19 2 6-4 12-5 19-2v26c0 2-2 3-4 2-5-2-10-1-15 2-5-3-10-4-15-2-2 1-4 0-4-2Z"/><path fill="#FFBE18" d="M4 9c7-3 14-2 20 2 6-4 13-5 20-2v26c0 2-2 3-4 2-6-2-11-1-16 2-5-3-10-4-16-2-2 1-4 0-4-2Z"/><path fill="#FFF8DC" d="M8 8c6-1 11 0 16 3v23c-5-3-10-4-16-3Z"/><path fill="#FFF" d="M40 8c-6-1-11 0-16 3v23c5-3 10-4 16-3Z"/><path d="M24 12v21" stroke="#F3D581" stroke-width="2.5"/><path d="m12 16 7 2m-7 5 7 2m10-7 7-2m-7 9 7-2" stroke="#EBC969" stroke-width="3"/><path fill="#1CB0F6" d="M32 7h5v12l-2.5-2-2.5 2Z"/></svg><span data-bubble-summary-text></span></p><div class="roadmap-account-gate" data-roadmap-account-gate hidden><strong>أنشئ حسابًا لمتابعة بقية الدروس</strong><span>سنحفظ تقدّمك لتتابع الدروس المنشورة المتاحة لحسابك.</span></div></div><div class="roadmap-bubble-actions"><button class="system-action system-action--primary system-action--compact roadmap-bubble-start" type="button" data-bubble-start>ابدأ الجزء</button><button class="system-action system-action--secondary system-action--compact roadmap-bubble-sign-in" type="button" data-bubble-sign-in hidden>لدي حساب بالفعل</button></div></aside></section>`;
}

/** Place a measured popup inside the shell's viewport-coordinate bounds. */
export function getRoadmapBubblePosition(anchor, size, bounds) {
  const gap = 12;
  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(value, maximum));
  const leftSide = anchor.left - gap - size.width;
  const rightSide = anchor.right + gap;
  const hasSide = leftSide >= bounds.left || rightSide + size.width <= bounds.right;
  const left = hasSide
    ? leftSide >= bounds.left ? leftSide : rightSide
    : clamp((anchor.left + anchor.right - size.width) / 2, bounds.left, bounds.right - size.width);
  const below = anchor.bottom + gap;
  const above = anchor.top - gap - size.height;
  const top = hasSide ? clamp(anchor.top, bounds.top, bounds.bottom - size.height)
    : below + size.height <= bounds.bottom ? below
    : above >= bounds.top ? above
    : clamp(below, bounds.top, bounds.bottom - size.height);
  return { left, top };
}

export function mountSubjectRoadmap({ container, roadmap, onStartLesson, isLessonLocked, onRequireAccount, getPartProgress, getPartReview, initialReviewUnit, onReviewTabChange }) {
  if (!container || !roadmap) throw new TypeError("subject roadmap dependencies are required");
  const controller = new AbortController();
  const { signal } = controller;
  container.innerHTML = renderSubjectRoadmapMarkup(roadmap, { isLessonLocked, getPartProgress, getPartReview });
  const openReview = mountUnitReviewTabs(container, { signal, onChange:onReviewTabChange });
  if (initialReviewUnit) openReview(initialReviewUnit);
  const accessFor = (lessonId, partId) => {
    const unit = roadmap.units.find(unit => unit.lessons.some(lesson => lesson.id === lessonId));
    const lesson = unit?.lessons.find(lesson => lesson.id === lessonId);
    return getSubjectPartAccess(roadmap, { lessonId, partId, getPartProgress, accountRequired:lesson && isLessonLocked?.(unit, lesson) });
  };
  container.querySelectorAll("[data-review-part]").forEach((button) => button.addEventListener("click", () => {
    const access = accessFor(button.dataset.reviewLesson, button.dataset.reviewPart);
    if (!access || access.state === "unpublished") return;
    if (access.state === "account-required") { onRequireAccount?.("register"); return; }
    if (access.state === "previous-required") { openPart({ lessonId:access.lesson.id, partId:access.part.id }); return; }
    onStartLesson?.({ subjectId:roadmap.subjectId, unitId:access.unit.id, lessonId:access.lesson.id, lessonLabel:access.part.label, partId:access.part.id, reviewStepId:button.dataset.reviewStep, opener:button });
  }, { signal }));
  const bubble = container.querySelector("[data-roadmap-bubble]");
  const start = bubble.querySelector("[data-bubble-start]");
  const close = bubble.querySelector("[data-bubble-close]");
  const copy = bubble.querySelector(".roadmap-bubble-copy");
  let activeButton = null;
  let activeAccess = null;
  let placementFrame = 0;
  const closeBubble = ({ restoreFocus = true } = {}) => {
    cancelAnimationFrame(placementFrame);
    placementFrame = 0;
    bubble.hidden = true;
    activeButton?.setAttribute("aria-expanded", "false");
    if (restoreFocus) activeButton?.focus({ preventScroll:true });
  };
  const positionBubble = () => {
    placementFrame = 0;
    if (signal.aborted || bubble.hidden || !activeButton?.isConnected) return;
    const bounds = getShellViewportBounds();
    const anchor = activeButton.getBoundingClientRect();
    if (anchor.bottom < bounds.top || anchor.top > bounds.bottom || bounds.bottom <= bounds.top) {
      closeBubble({ restoreFocus:false });
      return;
    }
    bubble.style.width = `${Math.min(320, bounds.right - bounds.left)}px`;
    bubble.style.maxHeight = `${bounds.bottom - bounds.top}px`;
    const size = bubble.getBoundingClientRect();
    const position = getRoadmapBubblePosition(anchor, size, bounds);
    const parent = bubble.offsetParent.getBoundingClientRect();
    bubble.style.left = `${position.left - parent.left}px`;
    bubble.style.top = `${position.top - parent.top}px`;
  };
  const schedulePlacement = () => {
    if (!bubble.hidden && !placementFrame) placementFrame = requestAnimationFrame(positionBubble);
  };
  const buttons = [...container.querySelectorAll("[data-roadmap-part]")];
  const openPart = ({ lessonId, partId }) => {
    const button = buttons.find(button => button.dataset.roadmapLesson === lessonId && button.dataset.roadmapPart === partId);
    if (!button) return false;
    const lessonTab = button.closest("[data-unit]").querySelector('[data-unit-tab="lessons"]');
    lessonTab.click();
    closeBubble({ restoreFocus:false });
    button.scrollIntoView({ block:"center", behavior:"instant" });
    button.click();
    return true;
  };
  buttons.forEach((button) => button.addEventListener("click", (event) => {
    const wasOpen = activeButton === button && !bubble.hidden;
    closeBubble({ restoreFocus:false });
    if (wasOpen) return;
    activeButton = button;
    activeAccess = accessFor(button.dataset.roadmapLesson, button.dataset.roadmapPart);
    button.setAttribute("aria-expanded", "true");
    const state = activeAccess.state;
    const locked = state === "account-required";
    const unavailable = state === "unpublished";
    const pathLocked = state === "previous-required";
    bubble.querySelector("[data-bubble-unit]").textContent = button.dataset.unitLabel;
    bubble.querySelector("[data-bubble-lesson]").textContent = button.dataset.lessonLabel;
    const summary = bubble.querySelector("[data-bubble-summary]");
    summary.classList.toggle("roadmap-book-tag", !unavailable && !pathLocked);
    summary.querySelector("svg").style.display = unavailable || pathLocked ? "none" : "";
    const summaryText = summary.querySelector("[data-bubble-summary-text]");
    summaryText.replaceChildren();
    if (pathLocked) summaryText.textContent = `أكمل «${activeAccess.previous.part.label}» أولًا لفتح هذا الجزء.`;
    else if (unavailable) summaryText.textContent = "هذا الجزء قيد الإعداد. إنشاء حساب لا يفتح الأجزاء غير المنشورة.";
    else {
      const pages = document.createElement("bdi");
      pages.dir = "ltr";
      pages.textContent = button.dataset.partPages;
      summaryText.append("صفحات الكتاب: ", pages);
    }
    bubble.querySelector("[data-roadmap-account-gate]").hidden = !locked;
    bubble.querySelector("[data-bubble-sign-in]").hidden = !locked;
    start.disabled = unavailable || (pathLocked && !activeAccess.previous.part.startStepId);
    start.textContent = locked ? "إنشاء حساب" : pathLocked ? "انتقل إلى الجزء السابق" : unavailable ? "هذا الجزء قيد الإعداد" : state === "completed" ? "راجع الجزء" : state === "in-progress" ? "تابع الجزء" : "ابدأ الجزء";
    button.closest(".roadmap-stop").append(bubble);
    bubble.hidden = false;
    copy.scrollTop = 0;
    positionBubble();
    if (event.detail === 0 || window.matchMedia("(pointer:fine)").matches) (start.disabled ? close : start).focus({ preventScroll:true });
    schedulePlacement();
  }, { signal }));
  container.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !bubble.hidden) { event.preventDefault(); closeBubble(); }
  }, { signal });
  close.addEventListener("click", () => closeBubble(), { signal });
  start.addEventListener("click", () => {
    if (activeAccess.state === "account-required") { onRequireAccount?.("register"); return; }
    if (activeAccess.state === "previous-required") {
      openPart({ lessonId:activeAccess.previous.lesson.id, partId:activeAccess.previous.part.id });
      return;
    }
    if (activeAccess.state === "unpublished") return;
    const selection = Object.freeze({
      subjectId:roadmap.subjectId, unitId:activeAccess.unit.id,
      lessonId:activeAccess.lesson.id, lessonLabel:activeAccess.part.label,
      partId:activeAccess.part.id, opener:activeButton,
    });
    closeBubble({ restoreFocus:false });
    onStartLesson?.(selection);
  }, { signal });
  bubble.querySelector("[data-bubble-sign-in]").addEventListener("click", () => onRequireAccount?.("sign-in"), { signal });
  window.addEventListener("resize", schedulePlacement, { signal });
  window.addEventListener("orientationchange", schedulePlacement, { signal });
  window.visualViewport?.addEventListener("resize", schedulePlacement, { signal });
  window.visualViewport?.addEventListener("scroll", schedulePlacement, { signal });
  document.addEventListener("scroll", (event) => { if (!bubble.contains(event.target)) schedulePlacement(); }, { capture:true, signal });
  container.addEventListener("animationend", schedulePlacement, { signal });
  const resizeObserver = new ResizeObserver(schedulePlacement);
  resizeObserver.observe(bubble);
  return Object.freeze({ openPart, destroy() { controller.abort(); cancelAnimationFrame(placementFrame); resizeObserver.disconnect(); closeBubble({ restoreFocus:false }); } });
}
