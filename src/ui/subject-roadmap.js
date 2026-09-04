import { escapeHtml } from "../lib/dom.js";

function lessonButton(unit, lesson, locked = false) {
  return `<div class="roadmap-stop${locked ? " roadmap-stop--account-locked" : ""}"><button class="roadmap-lesson${locked ? " roadmap-lesson--account-locked" : ""}" type="button" data-roadmap-unit="${escapeHtml(unit.id)}" data-roadmap-lesson="${escapeHtml(lesson.id)}" data-unit-label="${escapeHtml(unit.label)}" data-lesson-label="${escapeHtml(lesson.label)}" data-lesson-summary="${escapeHtml(lesson.summary)}" data-lesson-xp="${escapeHtml(lesson.xp)}"${locked ? ' data-account-locked="true"' : ""} aria-label="${escapeHtml(unit.label)}، ${escapeHtml(lesson.label)}${locked ? "، يتطلب حسابًا" : ""}" aria-expanded="false"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 7.5c4.2-.9 7.5.1 10 2.8v15c-2.5-2.7-5.8-3.7-10-2.8zM26 7.5c-4.2-.9-7.5.1-10 2.8v15c2.5-2.7 5.8-3.7 10-2.8z"/></svg>${locked ? '<span class="roadmap-account-lock" aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span>' : ""}</button><small>${escapeHtml(lesson.label)}</small></div>`;
}

function unitCard(unit, isLessonLocked) {
  const lessons = unit.lessons.map((lesson) => lessonButton(unit, lesson, isLessonLocked?.(unit, lesson))).join("");
  return `<section class="roadmap-unit" data-unit="${escapeHtml(unit.id)}"><header><span>${escapeHtml(unit.label)}</span><small>قيد التقدم</small></header><div class="roadmap-lessons" aria-label="دروس ${escapeHtml(unit.label)}">${lessons}</div></section>`;
}

export function renderSubjectRoadmapMarkup(roadmap, { isLessonLocked } = {}) {
  const units = roadmap.units.map((unit) => unitCard(unit, isLessonLocked)).join("");
  return `<section class="subject-roadmap" data-subject="${escapeHtml(roadmap.subjectId)}" aria-label="وحدات المادة"><div class="roadmap-unit-grid">${units}</div><aside class="roadmap-lesson-bubble" data-roadmap-bubble aria-live="polite" hidden><button class="roadmap-bubble-close" type="button" data-bubble-close aria-label="إغلاق تفاصيل الدرس">×</button><p data-bubble-unit></p><h2 data-bubble-lesson></h2><p data-bubble-summary></p><div class="roadmap-bubble-meta" data-bubble-meta><span>شرح + تدريب</span><bdi data-bubble-xp></bdi></div><div class="roadmap-account-gate" data-roadmap-account-gate hidden><strong>أنشئ حسابًا لمتابعة بقية الدروس</strong><span>سنحفظ تقدّمك ونفتح لك جميع الميزات المتاحة.</span></div><button class="roadmap-bubble-start" type="button" data-bubble-start>ابدأ الدرس</button><button class="roadmap-bubble-sign-in" type="button" data-bubble-sign-in hidden>لدي حساب بالفعل</button></aside></section>`;
}

export function mountSubjectRoadmap({ container, roadmap, onStartLesson, isLessonLocked, onRequireAccount }) {
  if (!container || !roadmap) throw new TypeError("subject roadmap dependencies are required");
  const controller = new AbortController();
  container.innerHTML = renderSubjectRoadmapMarkup(roadmap, { isLessonLocked });
  const root = container.querySelector(".subject-roadmap");
  const bubble = container.querySelector("[data-roadmap-bubble]");
  let activeButton = null;

  const closeBubble = ({ restoreFocus = true } = {}) => {
    bubble.hidden = true;
    activeButton?.setAttribute("aria-expanded", "false");
    if (restoreFocus) activeButton?.focus({ preventScroll:true });
  };
  container.querySelectorAll("[data-roadmap-lesson]").forEach((button) => button.addEventListener("click", () => {
    closeBubble({ restoreFocus:false });
    activeButton = button;
    button.setAttribute("aria-expanded", "true");
    bubble.querySelector("[data-bubble-unit]").textContent = button.dataset.unitLabel;
    bubble.querySelector("[data-bubble-lesson]").textContent = button.dataset.lessonLabel;
    bubble.querySelector("[data-bubble-summary]").textContent = button.dataset.lessonSummary;
    bubble.querySelector("[data-bubble-xp]").textContent = `${button.dataset.lessonXp} XP`;
    const locked = button.dataset.accountLocked === "true";
    bubble.querySelector("[data-bubble-summary]").hidden = locked;
    bubble.querySelector("[data-bubble-meta]").hidden = locked;
    bubble.querySelector("[data-roadmap-account-gate]").hidden = !locked;
    bubble.querySelector("[data-bubble-sign-in]").hidden = !locked;
    bubble.querySelector("[data-bubble-start]").textContent = locked ? "إنشاء حساب" : "ابدأ الدرس";
    button.closest(".roadmap-stop").append(bubble);
    bubble.hidden = false;
    bubble.querySelector("[data-bubble-start]").focus({ preventScroll:true });
  }, { signal:controller.signal }));

  bubble.querySelector("[data-bubble-close]").addEventListener("click", () => closeBubble(), { signal:controller.signal });
  bubble.querySelector("[data-bubble-start]").addEventListener("click", () => {
    if (activeButton.dataset.accountLocked === "true") {
      onRequireAccount?.("register");
      return;
    }
    root.dataset.startedUnit = activeButton.dataset.roadmapUnit;
    root.dataset.startedLesson = activeButton.dataset.roadmapLesson;
    const selection = Object.freeze({
      subjectId:roadmap.subjectId,
      unitId:activeButton.dataset.roadmapUnit,
      lessonId:activeButton.dataset.roadmapLesson,
      lessonLabel:activeButton.dataset.lessonLabel,
      opener:activeButton,
    });
    closeBubble({ restoreFocus:false });
    onStartLesson?.(selection);
  }, { signal:controller.signal });
  bubble.querySelector("[data-bubble-sign-in]").addEventListener("click", () => onRequireAccount?.("sign-in"), { signal:controller.signal });

  return Object.freeze({ destroy() { controller.abort(); } });
}
