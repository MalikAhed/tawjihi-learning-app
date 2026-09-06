import { prefersReducedMotion } from "../lib/dom.js";

let celebrationPlayback = 0;

function celebrationMascotSource() {
  return prefersReducedMotion()
    ? "/assets/mascot/rocky-standing-still-reduced.svg"
    : `/assets/mascot/rocky-happy-jump.svg?play=${Date.now()}-${++celebrationPlayback}`;
}

export function renderSubjectCompletion(title, outcome) {
  const { xpGain = 0, progress = 0, preview = false } = outcome;
  const mascotSource = celebrationMascotSource();
  const count = (value, from = 0, delay = 600) => `<span data-gain-count="${value}" data-gain-from="${from}" data-gain-delay="${delay}">${value}</span>`;
  const stat = (kind, label, icon, value) => `<div class="subject-gain subject-gain--${kind}"><span>${label}</span><strong>${icon}${value}</strong></div>`;
  return `<div class="level-lesson-copy ready-lesson-result subject-completion" dir="rtl">
    <h1 class="visually-hidden" id="authored-lesson-complete-title">نتيجة الدرس</h1>
    <div class="subject-completion-hero">
      <div class="subject-completion-scene"><img class="subject-completion-rocky" src="${mascotSource}" alt="روكي سعيد بإنجازك"></div>
    </div>
    <div class="subject-gains">
      ${stat("xp", "مجموع XP", '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18.3 2 6.7 17.4h8L13.7 30l11.6-16h-8L18.3 2Z"/></svg>', `<bdi>${count(xpGain)}</bdi>`)}
      ${stat("accuracy", "ممتاز", '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6"/><path d="m16 16 10-10m-4 0h4v4"/></svg>', '<bdi>100%</bdi>')}
      ${stat("quick", "سريع", '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="17" r="11"/><path d="M16 11v7l4 2M12 3h8"/></svg>', '<bdi>3:21</bdi>')}
    </div>
    <span class="visually-hidden">تقدّم المادة ${progress}%</span>
    ${!xpGain && !preview ? '<p class="subject-completion-repeat">مراجعة مفيدة! مكافأة هذا الجزء محسوبة من قبل.</p>' : ""}
  </div>`;
}

function streakDays(streak) {
  const completed = Math.min(7, Math.max(0, Number(streak) || 0));
  return Array.from({ length:7 }, (_, index) => `<li class="${index < completed ? "is-complete" : ""}"><span>${index + 1}</span><i aria-hidden="true">${index < completed ? "✓" : ""}</i></li>`).join("");
}

export function renderSubjectStreak(outcome) {
  const streak = Math.max(1, Number(outcome.streak) || 0);
  const fireSource = prefersReducedMotion() ? "/assets/icons/streak-fire-burning-reduced.svg" : "/assets/icons/streak-fire-burning.svg";
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--streak" dir="rtl">
    <div class="completion-streak-scene"><img class="completion-streak-fire" src="${fireSource}" alt="" aria-hidden="true"></div>
    <div class="completion-streak-count"><strong>${streak}</strong><span>${streak === 1 ? "يوم متواصل" : "أيام متواصلة"}</span></div>
    <ol class="completion-week" aria-label="أيام سلسلة التعلّم">${streakDays(streak)}</ol>
  </div>`;
}

function questChest(tone) {
  return `<svg class="completion-quest-icon completion-quest-icon--${tone}" viewBox="0 0 64 54" aria-hidden="true"><path d="M8 17h48v30H8z"/><path d="M4 15h56v14H4z"/><path d="M13 7h38l5 10H8z"/><circle cx="32" cy="28" r="8"/><path d="M29 28h6v12h-6z"/></svg>`;
}

function questRow(label, value, max, tone) {
  const percentage = Math.min(100, Math.max(0, value / max * 100));
  return `<li><strong>${label}</strong><div class="completion-quest-progress"><span style="--quest-progress:${percentage}%"></span><bdi>${value} / ${max}</bdi></div>${questChest(tone)}</li>`;
}

export function renderSubjectQuests({ chestOpen = false } = {}) {
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--quests${chestOpen ? " is-chest-open" : ""}" dir="rtl">
    <h1 id="authored-lesson-complete-title">+1 نقطة مهام!</h1>
    <ul class="completion-quests">
      ${questRow("أكمل درسك التالي", 1, 1, "bronze")}
      ${questRow("أكمل درسًا مثاليًا", 1, 1, "blue")}
      ${questRow("أجب 5 مرات متتالية", 1, 2, "gold")}
    </ul>
    <div class="completion-monthly"><div><strong>مهام سبتمبر</strong><bdi>6 / 20</bdi></div><span aria-hidden="true">${chestOpen ? "✨" : "🏆"}</span></div>
  </div>`;
}

export function renderSubjectAnalytics(outcome) {
  const { xpGain = 0, totalXp = 0, streak = 0, streakGain = 0, progress = 0, progressGain = 0, completed = 0, totalParts = 0 } = outcome;
  const count = (value, from = 0, delay = 600) => `<span data-gain-count="${value}" data-gain-from="${from}" data-gain-delay="${delay}">${value}</span>`;
  const xpMax = Math.max(100, Math.ceil(totalXp / 100) * 100);
  const xpFrom = Math.max(0, totalXp - xpGain);
  const progressFrom = Math.max(0, progress - progressGain);
  const row = (kind, icon, title, value, barLabel, from, to, max, delay) => `<div class="subject-analytics-row subject-analytics-row--${kind}"><img src="/assets/icons/${icon}.svg" alt=""><div class="subject-analytics-copy"><div class="subject-analytics-heading"><h2>${title}</h2><strong>${value}</strong></div><div class="subject-analytics-meter"><progress data-gain-bar data-gain-from="${from}" data-gain-delay="${delay}" max="${max}" value="${to}" aria-label="${title}"></progress><bdi>${barLabel}</bdi></div></div></div>`;
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--analytics" dir="rtl">
    <h1 id="authored-lesson-complete-title">كل خطوة تصنع فرقًا</h1>
    <p class="subject-analytics-intro">إليك تقدّمك بعد هذا الجزء</p>
    <div class="subject-analytics-list">
      ${row("xp", "dashboard-levels", "نقاط الخبرة", `<bdi>+${count(xpGain,0,400)} XP</bdi>`, `${count(totalXp,xpFrom,400)} / ${xpMax}`, xpFrom,totalXp,xpMax,400)}
      ${row("streak", `streak-fire-burning${prefersReducedMotion() ? "-reduced" : ""}`, "سلسلة التعلّم", `${count(streak,Math.max(0,streak-streakGain),2450)} <small>يوم</small>`, `${count(100,streakGain ? 0 : 100,850)}%`, streakGain ? 0 : 1,1,1,850)}
      ${row("progress", "dashboard-curriculum", "تقدّم المادة", "", `${count(progress,progressFrom,1250)}%`, progressFrom,progress,100,1250)}
    </div>
    <div class="subject-analytics-mascot"><picture><source media="(prefers-reduced-motion: reduce)" srcset="/assets/mascot/rocky-standing-still-reduced.svg"><img class="subject-completion-rocky" src="${celebrationMascotSource()}" alt="روكي يحتفل بتقدّمك"></picture></div>
  </div>`;
}

// All values are visual interpolation of an already computed outcome; no rewards are written here.
export function animateSubjectCompletion(container) {
  const root = container.querySelector(".subject-completion");
  if (!root) return () => {};
  if (prefersReducedMotion()) { root.dataset.animationState = "complete"; return () => {}; }
  const rocky = root.querySelector(".subject-completion-rocky");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let idleTimer;
  let disposed = false;
  // The Studio happy-jump clip settles at 3300 ms, then the existing idle loops.
  const startIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!disposed && root.isConnected && rocky) rocky.src = "/assets/mascot/rocky-standing-still.svg";
    }, 3300);
  };
  const stopMascotMotion = () => {
    if (!motionPreference.matches) return;
    clearTimeout(idleTimer);
    rocky?.removeEventListener("load", startIdleTimer);
    if (rocky) rocky.src = "/assets/mascot/rocky-standing-still-reduced.svg";
  };
  if (rocky?.complete && rocky.naturalWidth) startIdleTimer();
  else rocky?.addEventListener("load", startIdleTimer, { once:true });
  motionPreference.addEventListener("change", stopMascotMotion);
  const counters = [...root.querySelectorAll("[data-gain-count]")].map((element) => ({ element,
    from:Number(element.dataset.gainFrom), to:Number(element.dataset.gainCount), delay:Number(element.dataset.gainDelay) }));
  counters.forEach(({ element, from }) => { element.textContent = String(from); });
  const bars = [...root.querySelectorAll("[data-gain-bar]")].map(element => ({ element, from:Number(element.dataset.gainFrom || 0), to:element.value, delay:Number(element.dataset.gainDelay || 0) }));
  bars.forEach(({element,from}) => { element.value=from; });
  root.dataset.animationState = "running";
  let frame;
  const started = performance.now();
  const tick = (now) => {
    const elapsed = motionPreference.matches ? 5000 : now - started;
    const ease = (delay) => 1 - Math.pow(1 - Math.min(1, Math.max(0, (elapsed - delay) / 1600)), 2);
    counters.forEach(({ element, from, to, delay }) => { element.textContent = String(Math.round(from + (to - from) * ease(delay))); });
    bars.forEach(({element,from,to,delay}) => { element.value=from+(to-from)*ease(delay); });
    if (elapsed < 4200) frame = requestAnimationFrame(tick);
    else { root.dataset.animationState = "complete"; }
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
