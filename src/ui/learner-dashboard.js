import { renderWorkingRocky } from "./working-rocky.js";
import { animateView } from "./view-motion.js";
import { escapeHtml } from "../lib/dom.js";

const icons = Object.freeze({
  level:'<img src="assets/icons/dashboard-levels-animated.svg" alt="" aria-hidden="true" />',
  streak:'<img src="assets/icons/streak-fire-burning.svg" alt="" aria-hidden="true" />',
});

function progressBar(label, value, maximum, content, kind) {
  const percentage = maximum > 0 ? Math.min(100, Math.round((value / maximum) * 100)) : 0;
  return `<div class="dashboard-progress dashboard-progress--${kind}" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${maximum}" aria-valuenow="${value}"><span class="dashboard-progress__fill" style="--dashboard-progress:${percentage}%"></span><bdi>${content}</bdi></div>`;
}

function streakDays(streak) {
  const completed = Math.max(0, Math.floor(Number(streak) || 0));
  const firstDay = Math.max(1, completed - 5);
  const days = Array.from({ length:7 }, (_, index) => {
    const day = firstDay + index;
    const done = day <= completed;
    return `<li class="dashboard-streak-day${done ? " is-complete" : ""}" aria-label="اليوم ${day}، ${done ? "مكتمل" : "قادم"}"><span class="dashboard-streak-day__marker" aria-hidden="true">${done ? '<svg viewBox="0 0 24 24" fill="none"><path d="m6 12 4 4 8-8" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}</span><span aria-hidden="true">${day}</span></li>`;
  }).join("");
  return `<ol class="dashboard-streak-days" aria-label="أيام السلسلة: البرتقالي مكتمل والرمادي قادم">${days}</ol>`;
}

function quest(label, value, maximum, tone, icon) {
  const current = Math.min(value, maximum);
  const percentage = Math.round((current / maximum) * 100);
  return `<article class="dashboard-quest dashboard-quest--${tone}"><span class="dashboard-quest__goal-icon" aria-hidden="true"><img src="${icon}" alt="" /></span><div class="dashboard-quest__copy"><strong>${label}</strong><div class="dashboard-quest__bar" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${maximum}" aria-valuenow="${current}"><span style="--quest-progress:${percentage}%"></span><bdi>${current} / ${maximum}</bdi></div></div><span class="dashboard-quest__reward" aria-hidden="true"><img src="assets/icons/dashboard-quests.svg" alt="" /></span></article>`;
}

function renderPremiumCard() {
  return `<section class="dashboard-premium" aria-labelledby="dashboard-premium-title">
    <div class="dashboard-premium__hero">
      <div class="dashboard-premium__top"><span class="dashboard-premium__badge" lang="en" dir="ltr">PREMIUM <span aria-hidden="true">✦</span></span><span class="dashboard-premium__edition">ارتقِ بتجربتك</span></div>
      <h2 id="dashboard-premium-title">كلّ طموحك.<br /><span>بلا حدود.</span></h2>
      <p class="dashboard-premium__intro">مساحة أكبر للتعلّم، وخطوة أقرب للتفوّق.</p>
    </div>
    <div class="dashboard-premium__body">
      <ul class="dashboard-premium__benefits">
        <li><span class="dashboard-premium__icon" aria-hidden="true"><img src="assets/icons/premium-lessons.svg" alt="" width="44" height="44" /></span><div><strong>دروس بلا حدود</strong><span>وصول كامل، في الوقت الذي يناسبك</span></div></li>
        <li><span class="dashboard-premium__icon" aria-hidden="true"><img src="assets/icons/premium-practice.svg" alt="" width="44" height="44" /></span><div><strong>تدرّب أكثر. تقدّم أسرع.</strong><span>أسئلة إضافية لتثبيت فهمك</span></div></li>
        <li><span class="dashboard-premium__icon" aria-hidden="true"><img src="assets/icons/premium-explain.svg" alt="" width="44" height="44" /></span><div><strong>افهم كلّ خطوة</strong><span>شروحات مفصّلة ومراجعة مستمرة</span></div></li>
      </ul>
      <button class="system-action system-action--secondary dashboard-premium__action" type="button" data-premium-details aria-expanded="false" aria-controls="dashboard-premium-details">اكتشف بريميوم <span aria-hidden="true">←</span></button>
      <p class="dashboard-premium__details" id="dashboard-premium-details" hidden>نعمل على تجهيز بريميوم. تفاصيل الاشتراك والتفعيل ستتوفر قريبًا.</p>
    </div>
  </section>`;
}

export function renderDashboardSideRailMarkup(snapshot) {
  if (!snapshot || snapshot.actor !== "student" || snapshot.account.type === "banned") return "";
  const { learning } = snapshot;
  return `<div class="dashboard-side-rail__content">${renderPremiumCard()}<section class="dashboard-quests" aria-labelledby="dashboard-quests-title" aria-describedby="dashboard-quests-teaser"><header><h2 id="dashboard-quests-title">المهام اليومية</h2><span>عرض الكل</span></header>${quest("أكمل 3 دروس", learning.requiredLessonsCompleted, 3, "yellow", "assets/icons/dashboard-levels.svg")}${quest("حل 20 سؤالًا", learning.questionsSolved, 20, "blue", "assets/icons/dashboard-quest-time.svg")}${quest("سلسلة 7 أيام", learning.dailyStreak, 7, "green", "assets/icons/dashboard-challenges.svg")}<div class="dashboard-quests-teaser" id="dashboard-quests-teaser"><div>${renderWorkingRocky("dashboard-quests-teaser__mascot")}<span>قريبًا</span><strong>نعمل على هذه الميزة</strong></div></div></section></div>`;
}

export function renderLearnerDashboardMarkup(snapshot, displayName) {
  if (!snapshot || snapshot.actor !== "student" || snapshot.account.type === "banned") return "";
  const { learning } = snapshot;
  // Temporary visual preview requested for dashboard streak and XP.
  const previewStreak = 3;
  const previewXp = learning.xp || Math.round(learning.levelXpGoal * 0.6);
  const learnerName = escapeHtml(displayName || snapshot.account.displayName || "طالب");
  const curriculumPercentage = learning.curriculumLessonsTotal > 0
    ? Math.min(100, Math.round((learning.requiredLessonsCompleted / learning.curriculumLessonsTotal) * 100))
    : 0;
  const levelBar = progressBar("تقدم المستوى", previewXp, learning.levelXpGoal, `${previewXp} / ${learning.levelXpGoal} XP`, "level");
  return `<section class="learner-dashboard" data-learner-dashboard aria-labelledby="learner-dashboard-title"><header class="learner-dashboard__header"><span class="learner-dashboard__avatar" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="17" r="8" fill="currentColor"/><path d="M9 41c0-8.3 6.7-15 15-15s15 6.7 15 15" fill="currentColor"/></svg></span><div class="learner-dashboard__identity"><h2 id="learner-dashboard-title">مرحبًا، <bdi>${learnerName}</bdi></h2><p>واصل تعلّمك من حيث توقفت.</p></div></header><div class="dashboard-stats" aria-label="ملخص التقدم"><article class="dashboard-stat dashboard-stat--level"><span class="dashboard-stat__icon">${icons.level}</span><div class="dashboard-stat__content"><div class="dashboard-stat__heading"><span>المستوى الحالي</span><strong><bdi>Lv. ${learning.level}</bdi></strong></div><p>يرتفع مع تقدّمك اليومي</p></div><div class="dashboard-stat__panel">${levelBar}</div></article><article class="dashboard-stat dashboard-stat--streak"><span class="dashboard-stat__icon">${icons.streak}</span><div class="dashboard-stat__content"><div class="dashboard-stat__heading"><span>السلسلة اليومية</span><strong><bdi>${previewStreak}</bdi> أيام</strong></div><p>حافظ على تقدّمك اليوم.</p></div><div class="dashboard-stat__panel">${streakDays(previewStreak)}</div></article></div><div class="dashboard-materials-heading"><div><h3>المواد الدراسية</h3><p>اختر مادة للبدء أو المتابعة.</p></div><span><bdi>${curriculumPercentage}%</bdi> مكتمل</span></div></section>`;
}

export function renderGuestDashboardMarkup({ completedFirstLesson = false } = {}) {
  return `<section class="learner-dashboard guest-dashboard" data-guest-dashboard aria-labelledby="guest-dashboard-title"><header class="learner-dashboard__header"><div class="learner-dashboard__identity"><h2 id="guest-dashboard-title">أهلًا بك في التجربة</h2><p>${completedFirstLesson ? "أكملت الدرس التجريبي. أنشئ حسابًا لحفظ تقدّمك والمتابعة." : "ابدأ بالدرس الأول، وأنشئ حسابًا عندما تريد حفظ تقدّمك."}</p></div></header><article class="guest-analytics-lock"><span class="guest-analytics-lock__icon" aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span><div><p>التحليلات والتقدّم</p><h3>أنشئ حسابًا لفتح لوحة تحليلاتك</h3><span>احفظ نتائجك، تابع نقاط القوة، وأكمل بقية الدروس من أي جهاز.</span></div><div class="guest-account-actions"><button type="button" data-guest-flow="register">إنشاء حساب</button><button type="button" data-guest-flow="sign-in">تسجيل الدخول</button></div></article><div class="dashboard-materials-heading"><div><h3>المواد الدراسية</h3><p>الدرس الأول متاح للتجربة كضيف.</p></div><span>وضع الضيف</span></div></section>`;
}

function updateSubjectCards(container, snapshot) {
  container.querySelectorAll(".subject-card").forEach((card) => {
    const ring = card.querySelector("[data-subject-progress]");
    const action = card.querySelector("[data-subject-action]");
    const locked = card.dataset.status === "locked";
    const personalized = Boolean(snapshot);
    const progress = personalized && !locked && card.dataset.subject === "ict" ? snapshot.learning.progress : 0;
    ring.hidden = locked || (!personalized && card.dataset.subject !== "ict");
    ring.style.setProperty("--subject-progress", progress);
    ring.querySelector("bdi").textContent = `${progress}%`;
    ring.classList.toggle("is-empty", progress === 0);
    const nextLesson = card.dataset.subject === "ict" && snapshot ? snapshot.learning.requiredLessonsCompleted + 1 : 1;
    if (action) action.textContent = locked ? "مقفلة" : card.dataset.subject === "ict" ? "متابعة الدروس" : personalized ? (progress > 0 ? `استكمال الدرس ${nextLesson}` : `ابدأ الدرس ${nextLesson}`) : "قيد التقدم";
    const solved = card.querySelector("[data-subject-solved]");
    const review = card.querySelector("[data-subject-review]");
    if (solved) solved.textContent = String(snapshot?.learning.questionsSolved ?? 0);
    if (review) review.textContent = String(snapshot?.learning.mustReviewCount ?? 0);
    card.classList.toggle("subject-card--personalized", personalized);
    card.setAttribute("aria-label", locked
      ? `${card.querySelector("h2").textContent}، مقفلة`
      : personalized
      ? `${card.querySelector("h2").textContent}، ${progress}% مكتمل، ${action?.textContent || "عرض الدروس"}`
      : `${card.querySelector("h2").textContent}، قيد التقدم`);
  });
}

export function mountLearnerDashboard({ container, service, onFlow }) {
  if (!container || !service?.getLearnerHomeSnapshot || !service?.getLearnerDisplayName) throw new TypeError("learner dashboard dependencies are required");
  const root = document.createElement("div");
  root.className = "learner-dashboard-root";
  container.prepend(root);
  const sideRail = document.createElement("aside");
  sideRail.className = "dashboard-side-rail";
  sideRail.setAttribute("aria-label", "بريميوم والمهام اليومية");
  sideRail.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-premium-details]");
    if (!trigger) return;
    const details = sideRail.querySelector("#dashboard-premium-details");
    const expanded = trigger.getAttribute("aria-expanded") !== "true";
    trigger.setAttribute("aria-expanded", String(expanded));
    details.hidden = !expanded;
    if (expanded) animateView(details);
  });
  container.closest(".column")?.after(sideRail);
  const update = () => {
    const snapshot = service.getLearnerHomeSnapshot();
    const guestTrial = service.getGuestTrialState?.();
    root.innerHTML = guestTrial?.active
      ? renderGuestDashboardMarkup(guestTrial)
      : renderLearnerDashboardMarkup(snapshot, service.getLearnerDisplayName());
    root.hidden = !root.firstElementChild;
    sideRail.innerHTML = renderDashboardSideRailMarkup(snapshot);
    sideRail.hidden = !sideRail.firstElementChild;
    updateSubjectCards(container, snapshot);
  };
  root.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-guest-flow]");
    if (trigger) onFlow?.(trigger.dataset.guestFlow);
  });
  const unsubscribe = service.subscribe(update);
  update();
  return Object.freeze({ update, destroy() { unsubscribe(); root.remove(); sideRail.remove(); } });
}
