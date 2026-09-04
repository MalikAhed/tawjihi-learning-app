const freeze = (value) => {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
};

const scenario = (id, group, label, description, snapshot) => freeze({
  id,
  group,
  label,
  description,
  snapshot:{
    context:{ curriculum:null, path:null, availability:"unknown", ...snapshot.context },
    account:{ type:"guest", displayName:null, ...snapshot.account },
    access:{ status:"preview", ...snapshot.access },
    learning:{
      activity:"none", completion:"not-started", progress:0, mastery:"no-evidence",
      requiredLessonsCompleted:0, requiredLessonsTotal:9, mustReviewCount:0, xp:0, level:1, levelXpGoal:200,
      rank:null, rankTotal:16, questionsSolved:0, dailyStreak:0, curriculumLessonsTotal:72, ...snapshot.learning,
    },
    content:{ status:"published", ...snapshot.content },
    system:{ status:"ready", ...snapshot.system },
    actor:snapshot.actor,
  },
});

export const DEFAULT_PROTOTYPE_SCENARIO_ID = "visitor-new";

export const PROTOTYPE_DEMO_ACCOUNTS = freeze([
  { type:"free", displayName:"أحمد", identifier:"free", email:"free@example.com", phone:"0591111111", password:"Learn123", homeScenarioId:"student-must-review" },
  { type:"subscribed", displayName:"ليان", identifier:"subscribed", email:"subscribed@example.com", phone:"0592222222", password:"Learn123", homeScenarioId:"student-paid" },
  { type:"banned", displayName:"مستخدم", identifier:"banned", email:"banned@example.com", phone:"0593333333", password:"Learn123", homeScenarioId:"student-banned" },
]);

export const PROTOTYPE_SCENARIOS = freeze([
  scenario("visitor-new", "Visitor", "New visitor", "No saved curriculum selection and no account.", {
    actor:"visitor",
  }),
  scenario("visitor-supported", "Visitor", "Gaza Scientific visitor", "Supported selection with ICT available for preview.", {
    actor:"visitor",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
  }),
  scenario("visitor-unsupported", "Visitor", "Unsupported selection", "Full Palestinian or Literary/Arts selection is in preparation.", {
    actor:"visitor",
    context:{ curriculum:"full-palestinian", path:"literary", availability:"in-preparation" },
  }),
  scenario("guest-form-error", "Guest", "Registration validation", "The four-field account form contains recoverable errors.", {
    actor:"visitor",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
    account:{ type:"guest" },
    system:{ status:"validation-error" },
  }),
  scenario("student-banned", "Student", "Banned account", "The student sees the shared subjects Home with access blocked.", {
    actor:"student",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
    account:{ type:"banned", displayName:"مستخدم" },
  }),
  scenario("student-free-new", "Student", "New free student", "Active account with free Unit 1 and no learning record.", {
    actor:"student",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
    account:{ type:"free", displayName:"طالب جديد" },
    access:{ status:"free" },
  }),
  scenario("student-must-review", "Student", "Student with review", "Learning is in progress with separate mastery evidence and Must Review items.", {
    actor:"student",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
    account:{ type:"free", displayName:"أحمد" },
    access:{ status:"free" },
    learning:{ activity:"review", completion:"in-progress", progress:33, mastery:"needs-review", requiredLessonsCompleted:3, mustReviewCount:3, xp:240, level:2, levelXpGoal:400, rank:9, questionsSolved:31, dailyStreak:3 },
  }),
  scenario("student-paid", "Student", "Paid active student", "Units 1–3 are available and learning history is retained.", {
    actor:"student",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
    account:{ type:"subscribed", displayName:"ليان" },
    access:{ status:"paid-active" },
    learning:{ activity:"lesson", completion:"in-progress", progress:56, mastery:"demonstrated", requiredLessonsCompleted:5, mustReviewCount:2, xp:620, level:4, levelXpGoal:800, rank:12, questionsSolved:48, dailyStreak:5 },
  }),
  scenario("student-expired", "Student", "Paid access expired", "Unit 1 remains available while paid-unit history is retained and locked.", {
    actor:"student",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
    account:{ type:"free", displayName:"ليان" },
    access:{ status:"paid-expired" },
    learning:{ activity:"none", completion:"in-progress", progress:56, mastery:"demonstrated", requiredLessonsCompleted:5, mustReviewCount:2, xp:620, level:4, levelXpGoal:800, rank:12, questionsSolved:48, dailyStreak:0 },
  }),
  scenario("activity-interrupted", "Recovery", "Interrupted activity", "A lesson or assessment can safely resume from retained temporary state.", {
    actor:"student",
    context:{ curriculum:"gaza", path:"scientific", availability:"available" },
    account:{ type:"free", displayName:"سارة" },
    access:{ status:"free" },
    learning:{ activity:"interrupted-quiz", completion:"in-progress", progress:22, mastery:"no-evidence", requiredLessonsCompleted:2, xp:100, level:2, levelXpGoal:400, rank:6, questionsSolved:18, dailyStreak:2 },
    system:{ status:"recovering" },
  }),
  scenario("system-unavailable", "Recovery", "Recoverable system error", "Approved availability or content data cannot be loaded safely.", {
    actor:"visitor",
    system:{ status:"unavailable" },
    content:{ status:"unavailable" },
  }),
  scenario("content-author", "Operations", "Content author", "Draft content can be prepared but not self-approved or published.", {
    actor:"content-author",
    account:{ type:"free" },
    access:{ status:"internal" },
    content:{ status:"draft" },
  }),
  scenario("academic-reviewer", "Operations", "Academic reviewer", "A different qualified reviewer can approve or request changes.", {
    actor:"academic-reviewer",
    account:{ type:"free" },
    access:{ status:"internal" },
    content:{ status:"academic-review" },
  }),
  scenario("content-publisher", "Operations", "Content publisher", "Only an academically approved version can be published.", {
    actor:"content-publisher",
    account:{ type:"free" },
    access:{ status:"internal" },
    content:{ status:"academically-approved" },
  }),
  scenario("access-admin", "Operations", "Access administrator", "Manual payment evidence is awaiting a limited access decision.", {
    actor:"access-administrator",
    account:{ type:"free" },
    access:{ status:"payment-under-review" },
  }),
]);

export function getPrototypeScenario(scenarioId) {
  return PROTOTYPE_SCENARIOS.find(({ id }) => id === scenarioId) || null;
}
