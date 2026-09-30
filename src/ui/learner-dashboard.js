import { escapeHtml } from "../lib/dom.js";
import { updateSubjectCards } from "./course-map.js";
import { formatArabicCount } from "./learner-format.js";

const icons = Object.freeze({
  streak:'<img src="assets/icons/streak-fire-burning.svg" alt="" aria-hidden="true" />',
});

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

function formatStreak(streak) {
  const count = Math.max(0, Math.floor(Number(streak) || 0));
  return count === 1 ? "1 يوم" : formatArabicCount(count, "day");
}

export function renderLearnerDashboardMarkup(snapshot, displayName) {
  if (!snapshot || snapshot.actor !== "student" || snapshot.account.type === "banned") return "";
  const { learning } = snapshot;
  const streak = learning.dailyStreak;
  const learnerName = escapeHtml(displayName || snapshot.account.displayName || "طالب");
  const curriculumPercentage = learning.currentQuestionsTotal > 0
    ? Math.min(100, Math.round((learning.currentQuestionsSolved / learning.currentQuestionsTotal) * 100))
    : learning.curriculumLessonsTotal > 0
      ? Math.min(100, Math.round((learning.requiredLessonsCompleted / learning.curriculumLessonsTotal) * 100))
      : 0;
  return `<section class="learner-dashboard" data-learner-dashboard aria-labelledby="learner-dashboard-title"><header class="learner-dashboard__header"><span class="learner-dashboard__avatar" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="17" r="8" fill="currentColor"/><path d="M9 41c0-8.3 6.7-15 15-15s15 6.7 15 15" fill="currentColor"/></svg></span><div class="learner-dashboard__identity"><h2 id="learner-dashboard-title">مرحبًا، <bdi>${learnerName}</bdi></h2><p>${learning.hasStarted || learning.progress || learning.requiredLessonsCompleted ? "واصل تعلّمك من خريطة الدروس." : "اختر المادة المتاحة وابدأ خطوتك الأولى."}</p></div></header><div class="dashboard-stats" aria-label="ملخص التقدم"><article class="dashboard-stat dashboard-stat--streak"><span class="dashboard-stat__icon">${icons.streak}</span><div class="dashboard-stat__content"><div class="dashboard-stat__heading"><span>السلسلة اليومية</span><strong class="ui-number">${formatStreak(streak)}</strong></div></div><div class="dashboard-stat__panel">${streakDays(streak)}</div></article></div><div class="dashboard-materials-heading"><div><h3>المواد الدراسية</h3><p>اختر مادة للبدء أو المتابعة.</p></div><span><bdi class="ui-number">${curriculumPercentage}%</bdi> مكتمل</span></div></section>`;
}

export function renderGuestDashboardMarkup({ completedFirstLesson = false } = {}) {
  return `<section class="learner-dashboard guest-dashboard" data-guest-dashboard aria-labelledby="guest-dashboard-title"><header class="learner-dashboard__header"><div class="learner-dashboard__identity"><h2 id="guest-dashboard-title">أهلًا بك في التجربة</h2><p>${completedFirstLesson ? "أكملت الدرس التجريبي. أنشئ حسابًا لحفظ تقدّمك والمتابعة." : "ابدأ بالدرس الأول، وأنشئ حسابًا عندما تريد حفظ تقدّمك."}</p></div></header><article class="guest-analytics-lock"><span class="guest-analytics-lock__icon" aria-hidden="true"><img src="assets/icons/subject-lock.svg" alt="" /></span><div><p>التحليلات والتقدّم</p><h3>أنشئ حسابًا لفتح لوحة تحليلاتك</h3><span>احفظ نتائجك، تابع نقاط القوة، وأكمل بقية الدروس من أي جهاز.</span></div><div class="guest-account-actions"><button class="system-action system-action--primary system-action--compact" type="button" data-guest-flow="register">إنشاء حساب</button><button class="system-action system-action--secondary system-action--compact" type="button" data-guest-flow="sign-in">تسجيل الدخول</button></div></article><div class="dashboard-materials-heading"><div><h3>المواد الدراسية</h3><p>الدرس الأول متاح للتجربة كضيف.</p></div><span>وضع الضيف</span></div></section>`;
}

export function mountLearnerDashboard({ container, service, progressStore, onFlow }) {
  if (!container || !service?.getLearnerHomeSnapshot || !service?.getLearnerDisplayName) throw new TypeError("learner dashboard dependencies are required");
  const root = document.createElement("div");
  root.className = "learner-dashboard-root";
  container.prepend(root);
  const update = () => {
    const snapshot = service.getLearnerHomeSnapshot();
    const guestTrial = service.getGuestTrialState?.();
    const loading = progressStore?.getSaveState(service.getLearnerProgressOwner()) === "loading";
    root.innerHTML = loading ? '<p class="app-loading" role="status">جارٍ تحميل التقدّم…</p>' : guestTrial?.active
      ? renderGuestDashboardMarkup(guestTrial)
      : renderLearnerDashboardMarkup(snapshot, service.getLearnerDisplayName());
    root.hidden = !root.firstElementChild;
    updateSubjectCards(container, snapshot);
  };
  root.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-guest-flow]");
    if (trigger) onFlow?.(trigger.dataset.guestFlow);
  });
  const unsubscribe = service.subscribe(update);
  const unsubscribeProgress = progressStore?.subscribe(update);
  update();
  return Object.freeze({ update, destroy() { unsubscribe(); unsubscribeProgress?.(); root.remove(); } });
}
