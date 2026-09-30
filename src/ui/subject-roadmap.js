import { renderUnitReviewPanel, mountUnitReview } from "./subject-review.js";
import { animateView } from "./view-motion.js";
import { escapeHtml } from "../lib/dom.js";
import { getLessonQuestionProgress } from "../domain/subject-question-progress.js";
import { getSubjectPartAccess } from "../domain/subject-access.js";
import { getShellViewportBounds } from "./app-shell.js";
import { readablePageReferences } from "../lib/page-labels.js";

const lock = '<svg class="roadmap-lock" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 14v-4a6 6 0 0 1 12 0v4" fill="none" stroke="currentColor" stroke-width="4"/><rect x="6" y="13" width="20" height="16" rx="4" fill="currentColor" stroke="none"/></svg>';

const check = '<svg class="roadmap-complete-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4.5 4.5L19 7"/></svg>';

const levelButtonArt = `<svg class="roadmap-level-art" viewBox="20 29 296 268" aria-hidden="true" focusable="false">
  <g class="roadmap-level-base"><path transform="translate(0 27.3710)" d="M 168 29.2587 C 250.8215 29.2587 316 83.1877 316 149.4067 C 316 215.0566 251.1982 269.3403 168 269.3403 C 84.8018 269.3403 20 215.0566 20 149.4067 C 20 83.1877 85.1785 29.2587 168 29.2587 Z"/></g>
  <g class="roadmap-level-cap">
    <path class="roadmap-level-face" d="M 168 29.2587 C 250.8215 29.2587 316 83.1877 316 149.4067 C 316 215.0566 251.1982 269.3403 168 269.3403 C 84.8018 269.3403 20 215.0566 20 149.4067 C 20 83.1877 85.1785 29.2587 168 29.2587 Z"/>
    <path class="roadmap-level-shine" d="M 130.107 127.056 C 112.678 145.177 95.261 163.311 77.819 181.421 C 75.810 183.506 73.808 185.597 71.807 187.690 C 68.676 190.964 65.625 195.216 60.489 193.851 C 58.990 193.453 57.620 192.648 56.586 191.487 C 54.502 189.145 53.437 185.822 52.115 183.021 C 48.821 176.043 46.109 169.033 44.916 161.369 C 43.886 154.750 43.808 147.990 44.573 141.338 C 49.735 96.441 90.985 67.344 132.135 57.720 C 145.709 54.545 162.126 52.636 176.052 53.372 C 179.056 53.531 186.243 54.034 188.389 56.159 C 190.528 57.349 190.129 59.357 190.273 60.992 C 190.528 63.906 188.660 65.712 186.873 67.740 C 183.351 71.737 179.681 75.600 175.977 79.428 C 160.651 95.270 145.387 111.169 130.107 127.056 Z"/>
    <path class="roadmap-level-shine" d="M 226.086 166.620 C 208.237 185.147 190.151 203.429 172.032 221.691 C 166.861 226.902 161.605 232.029 156.438 237.243 C 154.095 239.607 151.501 243.305 148.409 244.621 C 145.706 245.770 140.134 245.310 137.145 245.064 C 127.410 244.263 112.610 238.228 103.835 233.737 C 99.831 231.688 93.892 228.526 92.020 224.226 C 88.947 217.168 95.665 212.080 99.999 207.756 C 111.539 196.242 123.014 184.653 134.491 173.075 C 157.773 149.589 180.988 126.037 204.235 102.517 C 210.536 96.142 216.823 89.752 223.074 83.328 C 226.365 79.946 229.748 75.634 234.376 74.076 C 239.313 72.415 243.611 75.931 247.314 78.701 C 249.893 80.632 252.610 82.372 255.156 84.349 C 260.626 88.596 266.597 94.302 271.045 99.609 C 273.544 102.590 277.467 107.902 276.411 112.020 C 275.260 116.510 265.671 125.403 262.120 129.112 C 250.128 141.634 238.115 154.135 226.086 166.620 Z"/>
  </g>
</svg>`;

function lessonGroup(unit, lesson, { getPartProgress, getPartQuestionIds, getAccess, currentPart, questionsOnly, lessonNumbers }) {
  const questions = getLessonQuestionProgress(lesson, getPartProgress, getPartQuestionIds);
  const parts = questionsOnly ? [questions.nextPart].filter(Boolean) : lesson.parts || [];
  const stops = parts.map((part, index) => {
    const available = Boolean(part.startStepId);
    const progress = available ? getPartProgress?.(lesson, part) : null;
    const state = questionsOnly ? (questions.completed ? "completed" : questions.solved ? "in-progress" : "not-started") : progress?.completed ? "completed" : progress?.completedStepIds?.length ? "in-progress" : "not-started";
    const access = getAccess(lesson, part);
    if (questionsOnly && ["available", "in-progress", "completed"].includes(access.state)) {
      access.state = questions.completed ? "completed" : questions.solved ? "in-progress" : "available";
    }
    const current = part === currentPart && ["available", "in-progress"].includes(access.state);
    const pathLocked = access.state === "previous-required";
    const locked = access.state === "account-required";
    const status = { unpublished:"قيد الإعداد", "account-required":"يتطلب حسابًا", "previous-required":"أكمل الجزء السابق", completed:"مكتمل", "in-progress":"تابع التعلّم", available:"متاح للبدء" }[access.state];
    const positions = [200, 328, 200, 72];
    const from = positions[index % 4];
    const to = positions[(index + 1) % 4];
    const connector = index < parts.length - 1 ? `<svg class="roadmap-connector" viewBox="0 0 400 28" preserveAspectRatio="none" aria-hidden="true"><path pathLength="100" d="M ${from} 6 C ${from} 14 ${to} 14 ${to} 22"/></svg>` : "";
    const number = questionsOnly ? lessonNumbers.get(lesson.id) : part.number ?? index + 1;
    const label = questionsOnly ? lesson.label : part.label;
    const pages = questionsOnly ? lesson.pages : part.pages;
    const count = `${questions.solved} من ${questions.total} سؤالًا`;
    const outline = "M73 7 A66 52 0 0 1 139 59 V71 A66 52 0 0 1 7 71 V59 A66 52 0 0 1 73 7 Z";
    const shineOutline = "M73 4.5 A68.5 54.5 0 0 1 141.5 59 V71 A68.5 54.5 0 0 1 4.5 71 V59 A68.5 54.5 0 0 1 73 4.5 Z";
    const shinePercent = questions.completed ? 100 : Math.max(0, questions.percent - 3);
    const ring = questionsOnly ? `<svg class="roadmap-question-ring" viewBox="0 0 146 130" preserveAspectRatio="none" role="progressbar" aria-label="تقدّم ${escapeHtml(lesson.label)}" aria-valuemin="0" aria-valuemax="${questions.total}" aria-valuenow="${questions.solved}" aria-valuetext="${count}"><path class="roadmap-question-track" d="${outline}"/><path class="roadmap-question-fill" opacity="${questions.solved ? 1 : 0}" d="${outline}" pathLength="100" stroke-dasharray="${questions.percent} 100"/><path class="roadmap-question-shine" opacity="${shinePercent ? 1 : 0}" d="${shineOutline}" pathLength="100" stroke-dasharray="${shinePercent} 100" stroke-dashoffset="${questions.completed ? 0 : -1.5}"/></svg>` : "";
    return `<li class="roadmap-stop" data-part-state="${state}"><div class="roadmap-node">${current ? `<span class="roadmap-start-hint" aria-hidden="true">${state === "in-progress" ? "تابع" : "ابدأ"}</span>` : ""}<div class="roadmap-part-wrap"><button class="roadmap-part" type="button" data-roadmap-unit="${escapeHtml(unit.id)}" data-roadmap-lesson="${escapeHtml(lesson.id)}" data-roadmap-part="${escapeHtml(part.id)}" data-unit-label="${escapeHtml(lesson.label)}" data-lesson-label="${escapeHtml(label)}" data-part-pages="${escapeHtml(pages)}" data-part-state="${state}" data-part-available="${available}" data-path-locked="${pathLocked}" data-access-state="${access.state}"${locked ? ' data-account-locked="true"' : ""} ${current ? 'aria-current="step" ' : ""}aria-controls="roadmap-part-brief" aria-expanded="false" aria-label="${escapeHtml(label)}${questionsOnly ? `، ${count}` : ""}${status ? `، ${status}` : ""}">${questionsOnly ? levelButtonArt : ""}<span class="roadmap-part-number" aria-hidden="true">${questionsOnly ? escapeHtml(String(number)) : state === "completed" ? check : pathLocked || locked || !available ? lock : escapeHtml(String(number))}</span></button>${ring}</div><span class="roadmap-part-copy"><strong>${escapeHtml(label)}</strong>${questionsOnly ? `<small>${count}</small>` : ""}</span></div>${connector}</li>`;
  }).join("");
  return `<section class="roadmap-lesson-group"${questionsOnly ? ` data-level-number="${lessonNumbers.get(lesson.id)}"` : ""}><header class="roadmap-lesson-divider"><div class="roadmap-lesson-heading"><h3>${escapeHtml(lesson.label)}${lesson.recommended ? '<span class="roadmap-recommended">موصى به</span>' : ""}</h3></div></header><ol class="roadmap-parts${questionsOnly ? " roadmap-parts--questions" : ""}" aria-label="${escapeHtml(lesson.label)}">${stops}</ol></section>`;
}


function unitCard(unit, options) {
  const lessons = unit.lessons.map((lesson) => lessonGroup(unit, lesson, options)).join("");
  // Keep the textbook's unit numbering, including gaps, instead of deriving it from array order.
  const separator = unit.label.indexOf(":");
  const unitLabel = separator > 0 ? unit.label.slice(0, separator).trim() : "مسار التعلّم";
  const title = separator > 0 ? unit.label.slice(separator + 1).trim() : unit.label;
  return `<section class="roadmap-unit" data-unit="${escapeHtml(unit.id)}"><header class="roadmap-unit-header"><div class="roadmap-unit-title"><span>${escapeHtml(unitLabel)}</span><h2>${escapeHtml(title)}</h2></div><button type="button" class="roadmap-guide-button" data-unit-guide aria-haspopup="dialog" aria-controls="guide-${escapeHtml(unit.id)}" aria-label="دليل ${escapeHtml(unitLabel)}"><svg class="roadmap-guide-icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M8 3h12a1 1 0 0 1 1 1v17H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M2 6h6M2 11h6M2 16h6M12 7h5M12 12h5M12 17h5"/></svg><span>دليل الوحدة</span></button></header><dialog class="roadmap-guide" id="guide-${escapeHtml(unit.id)}" aria-labelledby="guide-title-${escapeHtml(unit.id)}"><form method="dialog"><button type="submit" class="roadmap-guide-close" aria-label="إغلاق دليل الوحدة">×</button></form><h2 id="guide-title-${escapeHtml(unit.id)}">${escapeHtml(unit.label)}</h2>${unit.lessons.map(lesson => `<section><h3>${escapeHtml(lesson.label)}</h3><p>${escapeHtml(lesson.summary || "")}</p></section>`).join("")}<button type="button" class="roadmap-guide-review" data-unit-review>مراجعة أخطاء الوحدة</button></dialog><div id="lessons-${escapeHtml(unit.id)}" class="roadmap-lessons" role="region" aria-label="دروس ${escapeHtml(unitLabel)}">${lessons}</div>${renderUnitReviewPanel(unit, options)}</section>`;
}

export function renderSubjectRoadmapMarkup(roadmap, options = {}) {
  roadmap = { ...roadmap, units:roadmap.units.map(unit => ({ ...unit, lessons:unit.lessons.filter(lesson => !lesson.hidden) })) };
  options = { ...options, getAccess:(lesson, part) => getSubjectPartAccess(roadmap, { lessonId:lesson.id, partId:part.id, getPartProgress:options.getPartProgress, accountRequired:options.isLessonLocked?.(roadmap.units.find(unit => unit.lessons.includes(lesson)), lesson) }) };
  options.questionsOnly = roadmap.questionsOnly || roadmap.subjectId === "ict" && roadmap.units.some(unit => unit.lessons.some(lesson => lesson.id === "database-management"));
  const visibleLessons = roadmap.units.flatMap(unit => unit.lessons);
  options.lessonNumbers = new Map(visibleLessons.map((lesson, index) => [lesson.id, index + 1]));
  options.currentPart = options.questionsOnly
    ? visibleLessons.map(lesson => getLessonQuestionProgress(lesson, options.getPartProgress, options.getPartQuestionIds)).find(progress => !progress.completed)?.nextPart
    : roadmap.units.flatMap(unit => unit.lessons.flatMap(lesson => (lesson.parts || []).map(part => ({ lesson, part })))).find(({ lesson, part }) => ["available", "in-progress"].includes(options.getAccess(lesson, part).state))?.part;
  return `<section class="subject-roadmap" data-subject="${escapeHtml(roadmap.subjectId)}" data-questions-only="${Boolean(options.questionsOnly)}" aria-label="وحدات المادة"><div class="roadmap-unit-grid">${roadmap.units.map((unit) => unitCard(unit, options)).join("")}</div><aside id="roadmap-part-brief" class="roadmap-lesson-bubble${options.questionsOnly ? " roadmap-lesson-bubble--questions" : ""}" data-roadmap-bubble role="region" aria-labelledby="roadmap-bubble-title" hidden><button class="roadmap-bubble-close" type="button" data-bubble-close aria-label="إغلاق تفاصيل الدرس">×</button><div class="roadmap-bubble-copy">${options.questionsOnly ? "" : "<p data-bubble-unit></p>"}<h4 id="roadmap-bubble-title" data-bubble-lesson></h4><p class="roadmap-book-tag" data-bubble-summary><svg class="roadmap-book-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill="#D98B00" d="M5 12c7-3 13-2 19 2 6-4 12-5 19-2v26c0 2-2 3-4 2-5-2-10-1-15 2-5-3-10-4-15-2-2 1-4 0-4-2Z"/><path fill="#FFBE18" d="M4 9c7-3 14-2 20 2 6-4 13-5 20-2v26c0 2-2 3-4 2-6-2-11-1-16 2-5-3-10-4-16-2-2 1-4 0-4-2Z"/><path fill="#FFF8DC" d="M8 8c6-1 11 0 16 3v23c-5-3-10-4-16-3Z"/><path fill="#FFF" d="M40 8c-6-1-11 0-16 3v23c5-3 10-4 16-3Z"/><path d="M24 12v21" stroke="#F3D581" stroke-width="2.5"/><path d="m12 16 7 2m-7 5 7 2m10-7 7-2m-7 9 7-2" stroke="#EBC969" stroke-width="3"/><path fill="#1CB0F6" d="M32 7h5v12l-2.5-2-2.5 2Z"/></svg><span data-bubble-summary-text></span></p><div class="roadmap-account-gate" data-roadmap-account-gate hidden><strong>أنشئ حسابًا لمتابعة بقية الدروس</strong><span>سنحفظ تقدّمك لتتابع الدروس المنشورة المتاحة لحسابك.</span></div></div><div class="roadmap-bubble-actions"><button class="system-action system-action--primary system-action--compact roadmap-bubble-start" type="button" data-bubble-start>ابدأ الأسئلة</button><button class="system-action system-action--secondary system-action--compact roadmap-bubble-sign-in" type="button" data-bubble-sign-in hidden>لدي حساب بالفعل</button></div></aside></section>`;
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

export function mountSubjectRoadmap({ container, roadmap, onStartLesson, isLessonLocked, onRequireAccount, getPartProgress, getPartQuestionIds, getPartReview, initialReviewUnit, onReviewTabChange }) {
  if (!container || !roadmap) throw new TypeError("subject roadmap dependencies are required");
  const controller = new AbortController();
  const { signal } = controller;
  container.innerHTML = renderSubjectRoadmapMarkup(roadmap, { isLessonLocked, getPartProgress, getPartQuestionIds, getPartReview });
  container.querySelectorAll("[data-unit-guide]").forEach(button => {
    const guide = container.querySelector(`#${button.getAttribute("aria-controls")}`);
    button.addEventListener("click", () => { guide.showModal(); animateView(guide); }, { signal });
    signal.addEventListener("abort", () => guide.close(), { once:true });
  });
  const openReview = mountUnitReview(container, { signal, onChange:onReviewTabChange });
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
    bubble.style.width = `${Math.min(322, bounds.right - bounds.left)}px`;
    bubble.style.maxHeight = `${bounds.bottom - bounds.top}px`;
    const size = bubble.getBoundingClientRect();
    const position = getPartQuestionIds
      ? (() => {
          const left = Math.max(bounds.left, Math.min(bounds.right - size.width,
            (anchor.left + anchor.right - size.width) / 2));
          const below = anchor.bottom + 12;
          const above = anchor.top - size.height - 12;
          const isAbove = below + size.height > bounds.bottom && above >= bounds.top;
          bubble.classList.toggle("roadmap-lesson-bubble--above", isAbove);
          bubble.style.setProperty("--bubble-pointer-left", `${Math.max(22, Math.min(size.width - 22,
            (anchor.left + anchor.right) / 2 - left))}px`);
          return { left, top:isAbove ? above : Math.max(bounds.top, Math.min(below, bounds.bottom - size.height)) };
        })()
      : getRoadmapBubblePosition(anchor, size, bounds);
    const parent = bubble.offsetParent.getBoundingClientRect();
    bubble.style.left = `${position.left - parent.left}px`;
    bubble.style.top = `${position.top - parent.top}px`;
  };
  const schedulePlacement = () => {
    if (!bubble.hidden && !placementFrame) placementFrame = requestAnimationFrame(positionBubble);
  };
  const buttons = [...container.querySelectorAll("[data-roadmap-part]")];
  const openPart = ({ lessonId, partId }) => {
    const button = buttons.find(button => button.dataset.roadmapLesson === lessonId && (button.dataset.roadmapPart === partId || getPartQuestionIds));
    if (!button) return false;
    button.closest("[data-unit]").querySelector("[data-review-back]").click();
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
    if (getPartQuestionIds && ["available", "in-progress", "completed"].includes(activeAccess.state)) {
      const progress = getLessonQuestionProgress(activeAccess.lesson, getPartProgress, getPartQuestionIds);
      activeAccess.state = progress.completed ? "completed" : progress.solved ? "in-progress" : "available";
    }
    const state = activeAccess.state;
    const locked = state === "account-required";
    const unavailable = state === "unpublished";
    const pathLocked = state === "previous-required";
    const unitLabel = bubble.querySelector("[data-bubble-unit]");
    if (unitLabel) unitLabel.textContent = button.dataset.unitLabel;
    bubble.querySelector("[data-bubble-lesson]").textContent = button.dataset.lessonLabel;
    const summary = bubble.querySelector("[data-bubble-summary]");
    summary.classList.toggle("roadmap-book-tag", !unavailable && !pathLocked);
    summary.querySelector("svg").style.display = unavailable || pathLocked ? "none" : "";
    const summaryText = summary.querySelector("[data-bubble-summary-text]");
    summaryText.replaceChildren();
    if (pathLocked) summaryText.textContent = `أكمل «${activeAccess.previous.part.label}» أولًا لفتح هذا الجزء.`;
    else if (unavailable) summaryText.textContent = "هذا الجزء قيد الإعداد. إنشاء حساب لا يفتح الأجزاء غير المنشورة.";
    else {
      const pages = button.dataset.partPages;
      summaryText.textContent = /\d/.test(pages)
        ? `الكتاب المدرسي: ${readablePageReferences(`ص ${pages}`)}` : pages;
    }
    bubble.querySelector("[data-roadmap-account-gate]").hidden = !locked;
    bubble.querySelector("[data-bubble-sign-in]").hidden = !locked;
    start.disabled = unavailable || (pathLocked && !activeAccess.previous.part.startStepId);
    start.textContent = locked ? "إنشاء حساب" : pathLocked ? "انتقل إلى الجزء السابق" : unavailable ? "هذا الجزء قيد الإعداد" : state === "completed" ? "راجع الأسئلة" : state === "in-progress" ? "تابع الأسئلة" : "ابدأ الأسئلة";
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
      lessonId:activeAccess.lesson.id, lessonLabel:activeAccess.lesson.label,
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
