import assert from "node:assert/strict";
import test from "node:test";
import { getPrototypeScenario } from "../src/data/prototype-fixtures.js";
import { renderDashboardSideRailMarkup, renderGuestDashboardMarkup, renderLearnerDashboardMarkup } from "../src/ui/learner-dashboard.js";

test("guests and banned accounts do not receive a personal dashboard", () => {
  assert.equal(renderLearnerDashboardMarkup(getPrototypeScenario("visitor-supported").snapshot, "Guest"), "");
  assert.equal(renderLearnerDashboardMarkup(getPrototypeScenario("student-banned").snapshot, "Blocked"), "");
});

test("an active guest trial receives a locked analytics invitation", () => {
  const markup = renderGuestDashboardMarkup({ completedFirstLesson:true });
  assert.match(markup, /التحليلات والتقدّم/);
  assert.match(markup, /إنشاء حساب/);
  assert.match(markup, /تسجيل الدخول/);
  assert.match(markup, /أكملت الدرس التجريبي/);
  assert.match(markup, /data-guest-flow="register"/);
});

test("the dashboard prioritizes level XP, streak, and subject progress", () => {
  const markup = renderLearnerDashboardMarkup(getPrototypeScenario("student-paid").snapshot, "ليان");
  assert.match(markup, /مرحبًا، <bdi>ليان<\/bdi>/);
  assert.doesNotMatch(markup, /dashboard-resume|متابعة التعلّم|تكنولوجيا المعلومات|تقدّم المادة/);
  assert.match(markup, /dashboard-stat--level[^]*?<img src="assets\/icons\/dashboard-levels-animated\.svg"/);
  assert.match(markup, /class="level-value ui-number">Lv\. 04<img class="level-up-arrow" src="assets\/icons\/level-up-arrow\.svg" alt="" aria-hidden="true"/);
  assert.match(markup, /620 \/ 800 XP/);
  assert.match(markup, /السلسلة اليومية/);
  assert.match(markup, /dashboard-stat--streak[^]*?<img src="assets\/icons\/streak-fire-burning\.svg"/);
  assert.match(markup, /المواد الدراسية/);
  assert.match(markup, /<bdi class="ui-number">7%<\/bdi> مكتمل/);
  assert.doesNotMatch(markup, /الرتبة|الأسئلة المحلولة|إجمالي الدروس|dashboard-metric/);
});

test("a new learner does not receive the removed resume block", () => {
  const markup = renderLearnerDashboardMarkup(getPrototypeScenario("student-free-new").snapshot, "طالب جديد");
  assert.doesNotMatch(markup, /ابدأ الدرس 1|تقدّم المادة|dashboard-resume/);
  assert.match(markup, /dashboard-stat--level/);
});

test("learner names are escaped before entering dashboard markup", () => {
  const markup = renderLearnerDashboardMarkup(getPrototypeScenario("student-free-new").snapshot, '<img src=x onerror="alert(1)">');
  assert.doesNotMatch(markup, /<img src=x onerror=/);
  assert.match(markup, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
});

test("upcoming features disclose availability before an informational action", () => {
  const markup = renderDashboardSideRailMarkup(getPrototypeScenario("student-paid").snapshot);
  assert.match(markup, /المهام اليومية/);
  assert.match(markup, /الاشتراك غير متاح حاليًا/);
  assert.ok(markup.indexOf("قيد الإعداد") < markup.indexOf("data-premium-details"));
  assert.match(markup, /assets\/mascot\/rocky-working\.svg/);
  assert.match(markup, /assets\/mascot\/rocky-working-reduced\.svg/);
  assert.doesNotMatch(markup, /عرض الكل|role="progressbar"|دروس بلا حدود/);
});

test("new learner statistics display zero XP and streak without visual placeholders", () => {
  const markup = renderLearnerDashboardMarkup(getPrototypeScenario("student-free-new").snapshot, "طالب");
  assert.match(markup, /0 \/ 200 XP/);
  assert.match(markup, /<strong class="ui-number">0 أيام<\/strong>/);
});

test("a one-day dashboard streak uses a numeric count", () => {
  const scenario = getPrototypeScenario("student-free-new").snapshot;
  const markup = renderLearnerDashboardMarkup({ ...scenario, learning:{ ...scenario.learning, dailyStreak:1 } }, "طالب");
  assert.match(markup, /<strong class="ui-number">1 يوم<\/strong>/);
  assert.doesNotMatch(markup, /يوم واحد/);
});

test("Home uses the same completed part, answers and rewards as the lesson store", async () => {
  const { createLearnerSession } = await import("../src/services/learner-session.js");
  const { createSubjectProgressStore } = await import("../src/services/subject-progress-store.js");
  const progressStore = createSubjectProgressStore();
  const session = createLearnerSession({ progressStore });
  await session.createAccount({ username:"home-test" });
  const ownerId = session.getLearnerProgressOwner();
  await progressStore.ready(ownerId);
  assert.equal(session.getLearnerHomeSnapshot().learning.totalXp, 0);
  const key = { ownerId, subjectId:"ict", lessonId:"database-management", partId:"access-basics" };
  await progressStore.recordAnswer({ ...key, stepId:"check", correct:true });
  await progressStore.record({ ...key, stepIds:["check"], completedStepIds:["check"], isComplete:true });
  const learning = session.getLearnerHomeSnapshot().learning;
  assert.equal(learning.totalXp, 10);
  assert.equal(learning.requiredLessonsCompleted, 1);
  assert.equal(learning.questionsSolved, 1);
  assert.equal(learning.progress, progressStore.getOutcome({ ...key, totalParts:29 }).progress);
  await session.createAccount({ username:"different" });
  assert.equal(session.getLearnerHomeSnapshot().learning.totalXp, 0);
});
