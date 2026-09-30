import { prefersReducedMotion } from "../lib/dom.js";
import { preloadImages } from "./media-ready.js";
import { formatArabicCount } from "./learner-format.js";

let celebrationPlayback = 0;

export function preloadCompletionMedia() {
  const still = prefersReducedMotion();
  preloadImages(
    still
      ? ["assets/mascot/rocky-standing-still-reduced.svg", "assets/icons/streak-fire-burning-reduced.svg", "assets/icons/dashboard-levels.svg", "assets/icons/dashboard-challenges.svg", "assets/icons/dashboard-quest-time.svg"]
      : [
          `assets/mascot/rocky-happy-jump.svg?play=${celebrationPlayback + 1}`,
          `assets/mascot/rocky-happy-jump.svg?play=${celebrationPlayback + 2}`,
          "assets/mascot/rocky-standing-still.svg",
          "assets/icons/streak-fire-burning.svg",
          "assets/icons/dashboard-levels.svg",
          "assets/icons/dashboard-challenges.svg",
          "assets/icons/dashboard-quest-time.svg",
        ],
  );
}

function celebrationMascotSource() {
  return prefersReducedMotion()
    ? "assets/mascot/rocky-standing-still-reduced.svg"
    : `assets/mascot/rocky-happy-jump.svg?play=${++celebrationPlayback}`;
}

export function renderSubjectCompletion(title, outcome) {
  const { xpGain = 0, progress = 0, totalParts = 0, elapsedSeconds = null } = outcome;
  const displayedXp = outcome.alreadyCompleted ? 10 : xpGain;
  const lessonShare = outcome.lessonShare ?? (totalParts > 0 ? Math.round(100 / totalParts) : null);
  const duration = Number.isFinite(elapsedSeconds) ? `${Math.floor(elapsedSeconds / 60)}:${String(Math.floor(elapsedSeconds % 60)).padStart(2, "0")}` : "—";
  const mascotSource = celebrationMascotSource();
  const count = (value, delay, format = "number", display = value) =>
    `<span data-gain-count="${value}" data-gain-from="0" data-gain-delay="${delay}" data-gain-format="${format}">${display}</span>`;
  const stat = (kind, label, icon, value) =>
    `<div class="subject-gain subject-gain--${kind}"><span>${label}</span><strong>${icon}${value}</strong></div>`;
  return `<div class="level-lesson-copy ready-lesson-result subject-completion subject-completion--result" dir="rtl">
    <div class="subject-completion-hero">
      <div class="subject-completion-scene"><img class="subject-completion-rocky" src="${mascotSource}" alt="روكي سعيد بإنجازك"></div>
      <h1 id="authored-lesson-complete-title">أكملت الدرس!</h1>
    </div>
    <div class="subject-gains">
      ${stat("xp", "مجموع XP", '<img class="subject-gain-icon subject-gain-icon--xp" src="assets/icons/dashboard-levels.svg" alt="" aria-hidden="true">', `<bdi class="ui-number" dir="ltr">${count(displayedXp, 760)}</bdi>`)}
      ${stat("accuracy", "حصة الدرس من المادة", '<img class="subject-gain-icon subject-gain-icon--accuracy" src="assets/icons/dashboard-challenges.svg" alt="" aria-hidden="true">', `<bdi class="ui-number" dir="ltr">${lessonShare === null ? "—" : `${count(lessonShare, 700)}%`}</bdi>`)}
      ${stat("quick", "وقت التعلّم", '<img class="subject-gain-icon subject-gain-icon--quick" src="assets/icons/dashboard-quest-time.svg" alt="" aria-hidden="true">', `<bdi class="ui-number" dir="ltr">${Number.isFinite(elapsedSeconds) ? count(elapsedSeconds, 640, "duration", duration) : duration}</bdi>`)}
    </div>
    <span class="visually-hidden">تقدّم المادة ${progress}%</span>
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
    ${outcome.activeToday ? '<p class="completion-streak-message" data-expanded-component>خطوة جميلة اليوم! نلتقي غدًا لنكمل السلسلة.</p>' : ""}
    <div class="completion-streak-scene"><picture><source media="(prefers-reduced-motion: reduce)" srcset="assets/icons/streak-fire-burning-reduced.svg"><img class="completion-streak-fire" src="assets/icons/streak-fire-burning${prefersReducedMotion() ? "-reduced" : ""}.svg" alt="" aria-hidden="true"></picture></div>
    <h1 id="authored-lesson-complete-title" class="completion-streak-count"><strong class="ui-number">${streak}</strong><span>سلسلة التعلّم</span></h1>
    <p class="completion-streak-caption">${formatArabicCount(streak, "day")} من التعلّم المتواصل</p>
    <ol class="completion-week" aria-label="آخر سبعة أيام من سلسلة التعلّم">${streakDays(outcome)}</ol>
  </div>`;
}

function formatAnimatedGain(value, format) {
  const rounded = Math.max(0, Math.round(value));
  if (format === "duration")
    return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
  return String(rounded);
}

function animateXpParticles(root, onArrival) {
  const counter = root.querySelector(".subject-gain--xp [data-gain-count]");
  const target = root.querySelector(".subject-gain-icon--xp");
  const amount = Math.max(0, Math.floor(Number(counter?.dataset.gainCount) || 0));
  if (!amount || !target) return { animations:[], layer:null };
  const layer = document.createElement("span");
  layer.className = "subject-xp-particles";
  layer.setAttribute("aria-hidden", "true");
  root.append(layer);
  const rootRect = root.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const card = target.closest(".subject-gain");
  const cardRect = card.getBoundingClientRect();
  const panelRect = target.parentElement.getBoundingClientRect();
  const capHeight = parseFloat(getComputedStyle(card).getPropertyValue("--gain-cap-height")) || 32;
  // Anchor the source to the expanded card, even while its top padding is growing.
  const sourceX = cardRect.left - rootRect.left + 4;
  const sourceY = panelRect.top - rootRect.top - capHeight - 3;
  const destinationX = targetRect.left - rootRect.left + targetRect.width / 2 - 16;
  const destinationY = targetRect.top - rootRect.top + targetRect.height / 2 - 16;
  const particleCount = Math.min(amount, 24);
  const stagger = Math.min(65, 650 / Math.max(1, particleCount - 1));
  let arrived = 0;
  const animations = Array.from({ length:particleCount }, (_, index) => {
    const particle = document.createElement("img");
    particle.className = "subject-xp-particle";
    particle.src = "assets/icons/dashboard-levels.svg";
    particle.alt = "";
    particle.decoding = "async";
    layer.append(particle);
    const seed = (multiplier) => {
      const value = Math.sin((index + 1) * multiplier) * 43758.5453;
      return value - Math.floor(value);
    };
    const startX = Math.max(0, Math.min(rootRect.width - 32, sourceX + seed(12.9898) * 116));
    const startY = sourceY - 84 - seed(78.233) * 68;
    const lift = 12 + seed(39.425) * 12;
    const tilt = (seed(9.17) - .5) * 24;
    // A short upward drift flows into an accelerating collection arc.
    const keyframes = Array.from({ length:41 }, (_, step) => {
      const t = step / 40;
      const travel = t * t * (1.6 - .6 * t);
      const remaining = 1 - travel;
      const x = remaining ** 3 * startX + 3 * remaining ** 2 * travel * (startX + 18) + 3 * remaining * travel ** 2 * (destinationX - 12) + travel ** 3 * destinationX;
      const y = remaining ** 3 * startY + 3 * remaining ** 2 * travel * (startY - lift) + 3 * remaining * travel ** 2 * (destinationY - 30) + travel ** 3 * destinationY;
      const appear = Math.min(1, t / .18);
      const collect = Math.max(0, (t - .78) / .22);
      const scale = .45 + .5 * (1 - (1 - appear) ** 3) - .65 * collect ** 2;
      const rotation = tilt * Math.sin(Math.PI * t);
      return { offset:t, opacity:Math.min(1, t / .12, (1 - t) / .06), transform:`translate3d(${x}px,${y}px,0) rotate(${rotation}deg) scale(${scale})` };
    });
    const animation = particle.animate(keyframes, {
      duration:760,
      delay:960 + index * stagger,
      easing:"linear",
      fill:"both",
    });
    animation.addEventListener("finish", () => {
      arrived += 1;
      onArrival(Math.round(amount * arrived / particleCount));
      particle.remove();
      if (!layer.childElementCount) layer.remove();
    }, { once:true });
    return animation;
  });
  return { animations, layer };
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
  let xpParticles = { animations:[], layer:null };
  let counters = [];
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
    counters.forEach(({ element, to, format, pulseAnimation }) => {
      pulseAnimation?.cancel();
      element.textContent = formatAnimatedGain(to, format);
    });
    xpParticles.animations.forEach((animation) => animation.cancel());
    xpParticles.layer?.remove();
  };
  if (rocky?.complete && rocky.naturalWidth) startIdleTimer();
  else rocky?.addEventListener("load", startIdleTimer, { once: true });
  motionPreference.addEventListener("change", stopMascotMotion);
  counters = [...root.querySelectorAll("[data-gain-count]")].map(
    (element) => ({
      element,
      from: Number(element.dataset.gainFrom),
      to: Number(element.dataset.gainCount),
      delay: Number(element.dataset.gainDelay),
      format: element.dataset.gainFormat || "number",
      pulseTarget: element.closest(".subject-gain--xp")?.querySelector(".subject-gain-icon--xp") || null,
      pulseAnimation: null,
    }),
  );
  counters.forEach(({ element, from, format }) => {
    element.style.minWidth = `${element.textContent.length}ch`;
    element.textContent = formatAnimatedGain(from, format);
  });
  const xpCounter = counters.find(({ pulseTarget }) => pulseTarget);
  xpParticles = animateXpParticles(root, (value) => {
    if (disposed || motionPreference.matches || !xpCounter) return;
    xpCounter.element.textContent = formatAnimatedGain(value, xpCounter.format);
    // Every arrival pulses the receiving bolt, continuing from its current size.
    const currentTransform = getComputedStyle(xpCounter.pulseTarget).transform;
    xpCounter.pulseAnimation?.cancel();
    xpCounter.pulseAnimation = xpCounter.pulseTarget.animate([
      { transform:currentTransform === "none" ? "scale(1)" : currentTransform },
      { transform:"scale(1.24)", offset:.22 },
      { transform:"scale(1)" },
    ], { duration:160, easing:"ease-out" });
  });
  root.dataset.animationState = "running";
  let frame;
  const started = performance.now();
  const tick = (now) => {
    const elapsed = motionPreference.matches ? 5000 : now - started;
    const ease = (delay, duration = 750) =>
      1 - Math.pow(1 - Math.min(1, Math.max(0, (elapsed - delay) / duration)), 2);
    counters.forEach((counter) => {
      const { element, from, to, delay, format, pulseTarget } = counter;
      if (pulseTarget && !motionPreference.matches) return;
      const value = Math.round(from + (to - from) * ease(delay, 750));
      element.textContent = formatAnimatedGain(value, format);
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
    counters.forEach(({ pulseAnimation }) => pulseAnimation?.cancel());
    xpParticles.animations.forEach((animation) => animation.cancel());
    xpParticles.layer?.remove();
    rocky?.removeEventListener("load", startIdleTimer);
    motionPreference.removeEventListener("change", stopMascotMotion);
  };
}
