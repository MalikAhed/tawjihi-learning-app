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
  assert.match(markup, /dashboard-stat--level[^]*?<img src="assets\/icons\/dashboard-levels\.svg"/);
  assert.match(markup, /620 \/ 800 XP/);
  assert.match(markup, /السلسلة اليومية/);
  assert.match(markup, /dashboard-stat--streak[^]*?<img src="assets\/icons\/dashboard-streak\.svg"/);
  assert.match(markup, /المواد الدراسية/);
  assert.match(markup, /<bdi>7%<\/bdi> مكتمل/);
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

test("the dashboard side rail renders the daily quest card", () => {
  const markup = renderDashboardSideRailMarkup(getPrototypeScenario("student-paid").snapshot);
  assert.match(markup, /المهام اليومية/);
  assert.match(markup, /عرض الكل/);
  assert.match(markup, /أكمل 3 دروس/);
  assert.match(markup, /حل 20 سؤالًا/);
  assert.match(markup, /سلسلة 7 أيام/);
  assert.match(markup, /assets\/icons\/dashboard-quest-time\.svg/);
  assert.equal((markup.match(/role="progressbar"/g) || []).length, 3);
  assert.equal((markup.match(/dashboard-quest dashboard-quest--/g) || []).length, 3);
});
