import { escapeHtml } from "../lib/dom.js";

const icons = Object.freeze({
  level:'<img src="assets/icons/dashboard-levels.svg" alt="" aria-hidden="true" />',
  streak:'<img src="assets/icons/dashboard-streak.svg" alt="" aria-hidden="true" />',
});

function progressBar(label, value, maximum, content, kind) {
  const percentage = maximum > 0 ? Math.min(100, Math.round((value / maximum) * 100)) : 0;
  return `<div class="dashboard-progress dashboard-progress--${kind}" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${maximum}" aria-valuenow="${value}"><span class="dashboard-progress__fill" style="--dashboard-progress:${percentage}%"></span><bdi>${content}</bdi></div>`;
}

function quest(label, value, maximum, tone, icon) {
  const current = Math.min(value, maximum);
  const percentage = Math.round((current / maximum) * 100);
  return `<article class="dashboard-quest dashboard-quest--${tone}"><span class="dashboard-quest__goal-icon" aria-hidden="true"><img src="${icon}" alt="" /></span><div class="dashboard-quest__copy"><strong>${label}</strong><div class="dashboard-quest__bar" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${maximum}" aria-valuenow="${current}"><span style="--quest-progress:${percentage}%"></span><bdi>${current} / ${maximum}</bdi></div></div><span class="dashboard-quest__reward" aria-hidden="true"><img src="assets/icons/dashboard-quests.svg" alt="" /></span></article>`;
}

export function renderDashboardSideRailMarkup(snapshot) {
  if (!snapshot || snapshot.actor !== "student" || snapshot.account.type === "banned") return "";
  const { learning } = snapshot;
  return `<div class="dashboard-side-rail__content"><section class="dashboard-quests" aria-labelledby="dashboard-quests-title"><header><h2 id="dashboard-quests-title">المهام اليومية</h2><span>عرض الكل</span></header>${quest("أكمل 3 دروس", learning.requiredLessonsCompleted, 3, "yellow", "assets/icons/dashboard-levels.svg")}${quest("حل 20 سؤالًا", learning.questionsSolved, 20, "blue", "assets/icons/dashboard-quest-time.svg")}${quest("سلسلة 7 أيام", learning.dailyStreak, 7, "green", "assets/icons/dashboard-challenges.svg")}</section></div>`;
}

export function renderLearnerDashboardMarkup(snapshot, displayName) {
  if (!snapshot || snapshot.actor !== "student" || snapshot.account.type === "banned") return "";
  const { learning } = snapshot;
  const learnerName = escapeHtml(displayName || snapshot.account.displayName || "طالب");
  const curriculumPercentage = learning.curriculumLessonsTotal > 0
    ? Math.min(100, Math.round((learning.requiredLessonsCompleted / learning.curriculumLessonsTotal) * 100))
    : 0;
  const levelBar = progressBar("تقدم المستوى", learning.xp, learning.levelXpGoal, `${learning.xp} / ${learning.levelXpGoal} XP`, "level");
  return `<section class="learner-dashboard" data-learner-dashboard aria-labelledby="learner-dashboard-title"><header class="learner-dashboard__header"><div class="learner-dashboard__identity"><h2 id="learner-dashboard-title">مرحبًا، <bdi>${learnerName}</bdi></h2><p>واصل تعلّمك من حيث توقفت.</p></div></header><div class="dashboard-stats" aria-label="ملخص التقدم"><article class="dashboard-stat dashboard-stat--level"><span class="dashboard-stat__icon">${icons.level}</span><div class="dashboard-stat__content"><div class="dashboard-stat__heading"><span>المستوى الحالي</span><strong><bdi>${learning.level}</bdi></strong></div><p><bdi>${learning.xp} / ${learning.levelXpGoal} XP</bdi></p>${levelBar}</div></article><article class="dashboard-stat dashboard-stat--streak"><span class="dashboard-stat__icon">${icons.streak}</span><div class="dashboard-stat__content"><div class="dashboard-stat__heading"><span>السلسلة اليومية</span><strong><bdi>${learning.dailyStreak}</bdi> أيام</strong></div><p>حافظ على تقدّمك اليوم.</p></div></article></div><div class="dashboard-materials-heading"><div><h3>المواد الدراسية</h3><p>اختر مادة للبدء أو المتابعة.</p></div><span><bdi>${curriculumPercentage}%</bdi> مكتمل</span></div></section>`;
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
    ring.hidden = !personalized || locked;
    ring.style.setProperty("--subject-progress", progress);
    ring.querySelector("bdi").textContent = `${progress}%`;
    ring.classList.toggle("is-empty", progress === 0);
    const nextLesson = card.dataset.subject === "ict" && snapshot ? snapshot.learning.requiredLessonsCompleted + 1 : 1;
    action.textContent = locked ? "مقفلة" : personalized ? (progress > 0 ? `استكمال الدرس ${nextLesson}` : `ابدأ الدرس ${nextLesson}`) : "قيد التقدم";
    card.classList.toggle("subject-card--personalized", personalized);
    card.setAttribute("aria-label", locked
      ? `${card.querySelector("h2").textContent}، مقفلة`
      : personalized
      ? `${card.querySelector("h2").textContent}، ${progress}% مكتمل، ${action.textContent}`
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
  sideRail.setAttribute("aria-label", "المهام اليومية");
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
