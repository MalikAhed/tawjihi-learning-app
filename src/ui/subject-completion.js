import { prefersReducedMotion } from "../lib/dom.js";
import { preloadImages } from "./media-ready.js";
import { formatArabicCount, formatXp, isProgressLabelCovered } from "./learner-format.js";

let celebrationPlayback = 0;

export function preloadCompletionMedia() {
  const still = prefersReducedMotion();
  preloadImages(
    still
      ? ["assets/mascot/rocky-standing-still-reduced.svg", "assets/icons/streak-fire-burning-reduced.svg"]
      : [
          `assets/mascot/rocky-happy-jump.svg?play=${celebrationPlayback + 1}`,
          `assets/mascot/rocky-happy-jump.svg?play=${celebrationPlayback + 2}`,
          "assets/mascot/rocky-standing-still.svg",
          "assets/icons/streak-fire-burning.svg",
        ],
  );
}

function celebrationMascotSource() {
  return prefersReducedMotion()
    ? "assets/mascot/rocky-standing-still-reduced.svg"
    : `assets/mascot/rocky-happy-jump.svg?play=${++celebrationPlayback}`;
}

export function renderSubjectCompletion(title, outcome) {
  const { xpGain = 0, progress = 0, preview = false, accuracy = null, elapsedSeconds = null } = outcome;
  const duration = Number.isFinite(elapsedSeconds) ? `${Math.floor(elapsedSeconds / 60)}:${String(Math.floor(elapsedSeconds % 60)).padStart(2, "0")}` : "—";
  const mascotSource = celebrationMascotSource();
  const count = (value, from = 0, delay = 600) =>
    `<span data-gain-count="${value}" data-gain-from="${from}" data-gain-delay="${delay}">${value}</span>`;
  const stat = (kind, label, icon, value) =>
    `<div class="subject-gain subject-gain--${kind}"><span>${label}</span><strong>${icon}${value}</strong></div>`;
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--result" dir="rtl">
    <div class="subject-completion-hero">
      <div class="subject-completion-scene"><img class="subject-completion-rocky" src="${mascotSource}" alt="روكي سعيد بإنجازك"></div>
      <h1 id="authored-lesson-complete-title">أكملت الدرس!</h1>
    </div>
    <div class="subject-gains">
      ${!preview ? stat("xp", "مجموع XP", '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18.3 2 6.7 17.4h8L13.7 30l11.6-16h-8L18.3 2Z"/></svg>', `<bdi class="ui-number" dir="ltr">${count(xpGain)}</bdi>`) : ""}
      ${!preview ? stat("accuracy", "التقييم", '<svg viewBox="0 0 32 32" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.8"><circle cx="14" cy="18" r="11"/><circle cx="14" cy="18" r="6"/><path d="m14 18 14-14m-7 0h7v7"/></g></svg>', `<bdi class="ui-number" dir="ltr">${Number.isFinite(accuracy) ? `${count(accuracy)}%` : "—"}</bdi>`) : ""}
      ${!preview ? stat("quick", "الوقت", '<svg viewBox="0 0 32 32" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><circle cx="16" cy="17" r="12"/><path d="M16 9v8l3 2M13 2h6"/></g></svg>', `<bdi class="ui-number" dir="ltr">${duration}</bdi>`) : ""}
    </div>
    ${!preview ? `<span class="visually-hidden">تقدّم المادة ${progress}%</span>` : ""}
    ${preview ? '<p class="subject-completion-preview">معاينة فقط — لم يُحفظ تقدّم أو تُمنح نقاط خبرة.</p>' : ""}
  </div>`;
}

function streakDays({ streak = 0, activeToday = false, date = new Date() }) {
  const today = new Date(date);
  const labels = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
  return Array.from({ length:7 }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - 6 + index);
    const ago = 6 - index;
    const complete = activeToday ? ago < streak : ago > 0 && ago <= streak;
    const label = labels[day.getDay()];
    const check = '<svg viewBox="0 0 24 24" fill="none"><path d="m6 12 4 4 8-8" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return `<li class="${complete ? "is-complete" : ""}${ago === 0 ? " is-today" : ""}" aria-label="${label}، ${complete ? "مكتمل" : "لم يُسجّل إنجاز"}"${ago === 0 ? ' aria-current="date"' : ""}><span aria-hidden="true">${label}</span><i aria-hidden="true">${complete ? check : ""}</i></li>`;
  }).join("");
}

export function renderSubjectStreak(outcome = {}) {
  const streak = Math.max(0, Number(outcome.streak) || 0);
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--streak" dir="rtl">
    ${outcome.preview || outcome.activeToday ? `<p class="completion-streak-message">${outcome.preview ? "معاينة فقط — لم يُحفظ تقدّم." : "خطوة جميلة اليوم! نلتقي غدًا لنكمل السلسلة."}</p>` : ""}
    <div class="completion-streak-scene"><picture><source media="(prefers-reduced-motion: reduce)" srcset="assets/icons/streak-fire-burning-reduced.svg"><img class="completion-streak-fire" src="assets/icons/streak-fire-burning${prefersReducedMotion() ? "-reduced" : ""}.svg" alt="" aria-hidden="true"></picture></div>
    <h1 id="authored-lesson-complete-title" class="completion-streak-count"><strong class="ui-number">${outcome.preview ? "—" : streak}</strong><span>سلسلة التعلّم</span></h1>
    <p class="completion-streak-caption">${outcome.preview ? "أيام إنجازك تظهر هنا" : formatArabicCount(streak, "day") + " من التعلّم المتواصل"}</p>
    ${outcome.preview ? "" : `<ol class="completion-week" aria-label="آخر سبعة أيام من سلسلة التعلّم">${streakDays(outcome)}</ol>`}
  </div>`;
}

const questIcons = Object.freeze({
  lessons:'<svg viewBox="0 0 56 56" fill="none" aria-hidden="true"><path d="M2 13c9-2 18 0 26 5 8-5 17-7 26-5v37c-9-2-18 0-26 5-8-5-17-7-26-5V13Z" fill="currentColor" opacity=".28"/><path d="M2 10c9-2 18 0 26 5 8-5 17-7 26-5v37c-9-2-18 0-26 5-8-5-17-7-26-5V10Z" fill="currentColor"/><path d="M5 8c8-1 16 1 23 6v34c-7-4-15-6-23-5V8Zm46 0c-8-1-16 1-23 6v34c7-4 15-6 23-5V8Z" fill="#fff3d6"/><rect x="9" y="18" width="14" height="12" rx="2.5" fill="#e8c89f"/><circle cx="13" cy="22" r="1.7" fill="currentColor" opacity=".62"/><path d="m11 27 3-3 3 2 2-2 2 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".62"/><path d="M35 19h11M35 26h10M35 33h8" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".5"/><path d="M28 14v34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".55"/></svg>',
  perfect:'<img src="assets/icons/dashboard-challenges.svg" alt="" aria-hidden="true">',
  questions:'<svg viewBox="0 0 56 56" fill="none" aria-hidden="true"><path d="M8 14c0-6 5-10 11-10h19c7 0 12 5 12 12v19c0 7-5 12-12 12H27l-9 7v-7c-6 0-10-5-10-11V14Z" fill="currentColor" opacity=".28"/><path d="M6 11C6 5 11 1 17 1h20c7 0 13 5 13 12v18c0 7-6 12-13 12H26l-9 7v-7C11 43 6 38 6 32V11Z" fill="currentColor"/><path d="M20 17c1-5 5-8 10-8 6 0 10 4 10 9 0 4-2 6-6 8-3 2-4 3-4 7" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="30" cy="38" r="3.5" fill="#fff"/><path d="M13 12c4-5 10-6 15-6" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".4"/></svg>',
});

function questRow(kind, label, value, max) {
  const safe = Math.min(max, Math.max(0, value));
  return `<li class="completion-quest completion-quest--${kind}"><strong>${label}</strong><div class="completion-quest-progress" data-label-covered="${isProgressLabelCovered(safe, max)}"><progress data-gain-bar data-gain-from="0" data-gain-delay="300" max="${max}" value="${safe}" aria-label="${label}"></progress><bdi class="ui-number" dir="ltr">${safe} / ${max}</bdi><span class="completion-quest-icon">${questIcons[kind]}</span></div></li>`;
}

export function renderSubjectQuests(outcome = {}) {
  const { preview = false, perfect = false, bestAnswerRun = 0, completed = 0 } = outcome;
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--quests" dir="rtl">
    <h1 id="authored-lesson-complete-title">كل خطوة تقرّبك!</h1>
    ${preview ? '<p class="completion-quests-intro">معاينة فقط — لم يُحفظ تقدّم أو تُمنح مكافآت.</p>' : ""}
    ${preview ? "" : `<ul class="completion-quests">
      ${questRow("lessons", "أكمل 5 دروس", completed, 5)}
      ${questRow("perfect", "أكمل 3 دروس بتقييم مثالي", outcome.perfectLessons ?? (perfect ? 1 : 0), 3)}
      ${questRow("questions", "أجب عن 5 أسئلة صحيحة متتالية", bestAnswerRun, 5)}
    </ul>`}
  </div>`;
}

export function renderSubjectAnalytics(outcome) {
  const { xpGain = 0, totalXp = 0, streak = 0, progress = 0, progressGain = 0, completed = 0, totalParts = 0, preview = false } = outcome;
  const count = (value, from = 0, delay = 400) =>
    `<span data-gain-count="${value}" data-gain-from="${from}" data-gain-delay="${delay}">${value}</span>`;
  const row = (kind, icon, title, detail) =>
    `<div class="subject-analytics-row subject-analytics-row--${kind}"><img src="assets/icons/${icon}.svg" alt=""><div class="subject-analytics-copy"><h2>${title}</h2>${detail}</div></div>`;
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--analytics" dir="rtl">
    <h1 id="authored-lesson-complete-title">كل خطوة تصنع فرقًا</h1>
    <p class="subject-analytics-intro">${preview ? "معاينة فقط — لم يُحفظ تقدّم أو تُمنح نقاط خبرة." : "إليك تقدّمك بعد هذا الجزء"}</p>
    ${preview ? "" : `<div class="subject-analytics-list">
      ${row("xp", "dashboard-levels", "نقاط الخبرة", `<strong><bdi dir="ltr">+${count(xpGain)} XP</bdi></strong><p>الإجمالي: <bdi dir="ltr">${formatXp(totalXp)}</bdi></p>`)}
      ${row("streak", `streak-fire-burning${prefersReducedMotion() ? "-reduced" : ""}`, "سلسلة التعلّم", `<strong>${formatArabicCount(streak, "day")}</strong>`)}
      ${row("progress", "dashboard-curriculum", "تقدّم المادة", `<div class="subject-analytics-meter"><progress data-gain-bar data-gain-from="${Math.max(0, progress - progressGain)}" data-gain-delay="800" max="100" value="${progress}" aria-label="تقدّم المادة"></progress><bdi dir="ltr">${count(progress, Math.max(0, progress - progressGain), 800)}%</bdi></div><p>${formatArabicCount(completed, "part")} من أصل ${formatArabicCount(totalParts, "part")}</p>`)}
    </div>`}
    <div class="subject-analytics-mascot"><picture><source media="(prefers-reduced-motion: reduce)" srcset="assets/mascot/rocky-standing-still-reduced.svg"><img class="subject-completion-rocky" src="${celebrationMascotSource()}" alt="روكي يحتفل بتقدّمك"></picture></div>
  </div>`;
}

// All values are visual interpolation of an already computed outcome; no rewards are written here.
export function animateSubjectCompletion(container) {
  const root = container.querySelector(".subject-completion");
  if (!root) return () => {};
  if (prefersReducedMotion()) {
    root.dataset.animationState = "complete";
    return () => {};
  }
  const rocky = root.querySelector(".subject-completion-rocky");
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let idleTimer;
  let disposed = false;
  // The Studio happy-jump clip settles at 3300 ms, then the existing idle loops.
  const startIdleTimer = () => {
    clearTimeout(idleTimer);
    if (motionPreference.matches || disposed) return;
    idleTimer = setTimeout(() => {
      if (!disposed && !motionPreference.matches && root.isConnected && rocky)
        rocky.src = "assets/mascot/rocky-standing-still.svg";
    }, 3300);
  };
  const stopMascotMotion = () => {
    if (!motionPreference.matches) return;
    clearTimeout(idleTimer);
    rocky?.removeEventListener("load", startIdleTimer);
    if (rocky) rocky.src = "assets/mascot/rocky-standing-still-reduced.svg";
  };
  if (rocky?.complete && rocky.naturalWidth) startIdleTimer();
  else rocky?.addEventListener("load", startIdleTimer, { once: true });
  motionPreference.addEventListener("change", stopMascotMotion);
  const counters = [...root.querySelectorAll("[data-gain-count]")].map(
    (element) => ({
      element,
      from: Number(element.dataset.gainFrom),
      to: Number(element.dataset.gainCount),
      delay: Number(element.dataset.gainDelay),
    }),
  );
  counters.forEach(({ element, from }) => {
    element.textContent = String(from);
  });
  const bars = [...root.querySelectorAll("[data-gain-bar]")].map((element) => ({
    element,
    from: Number(element.dataset.gainFrom || 0),
    to: element.value,
    delay: Number(element.dataset.gainDelay || 0),
  }));
  bars.forEach(({ element, from }) => {
    element.value = from;
  });
  root.dataset.animationState = "running";
  let frame;
  const started = performance.now();
  const tick = (now) => {
    const elapsed = motionPreference.matches ? 5000 : now - started;
    const ease = (delay) =>
      1 - Math.pow(1 - Math.min(1, Math.max(0, (elapsed - delay) / 1600)), 2);
    counters.forEach(({ element, from, to, delay }) => {
      element.textContent = String(
        Math.round(from + (to - from) * ease(delay)),
      );
    });
    bars.forEach(({ element, from, to, delay }) => {
      element.value = from + (to - from) * ease(delay);
      const labelContainer = element.closest(".completion-quest-progress");
      if (labelContainer) labelContainer.dataset.labelCovered = String(isProgressLabelCovered(element.value, element.max));
    });
    if (elapsed < 4200) frame = requestAnimationFrame(tick);
    else {
      root.dataset.animationState = "complete";
    }
  };
  frame = requestAnimationFrame(tick);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    clearTimeout(idleTimer);
    rocky?.removeEventListener("load", startIdleTimer);
    motionPreference.removeEventListener("change", stopMascotMotion);
  };
}
