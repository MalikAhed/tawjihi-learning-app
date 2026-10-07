import assert from "node:assert/strict";
import test from "node:test";
import { getSubjectRoadmap, getSubjectRoadmapLesson } from "../src/data/subject-roadmaps.js";
import { getRoadmapBubblePosition, renderSubjectRoadmapMarkup as renderMarkup } from "../src/ui/subject-roadmap.js";

import { getIctPartQuestions } from "../src/data/lessons/ict/exam-lessons.js";
const ids = part => getIctPartQuestions(part.id).map(question => question.id);
const renderSubjectRoadmapMarkup = (roadmap, options = {}) => renderMarkup(roadmap, {
  getPartQuestionIds:(_lesson, part) => ids(part), ...options,
});

const unpublishedFixture = {
  subjectId:"ict",
  units:[{
    id:"unit-fixture", label:"وحدة اختبار", lessons:[
      { id:"ready-lesson", label:"درس منشور", parts:[{ id:"ready-part", label:"جزء منشور", pages:"1", startStepId:"ready-step" }] },
      { id:"draft-lesson", label:"درس قيد الإعداد", parts:[{ id:"draft-part", label:"جزء قيد الإعداد", pages:"2" }] },
    ],
  }],
};

test("Physics follows the three textbook units and retains its hidden display samples", async () => {
  const { loadSubjectLessonPart } = await import("../src/data/lessons/subject-lesson-registry.js");
  const { readRoute } = await import("../src/app/route.js");
  const roadmap = getSubjectRoadmap("physics");
  assert.deepEqual(roadmap.units.map(unit => [unit.label, unit.lessons.filter(lesson => !lesson.hidden).map(lesson => lesson.id)]), [
    ["الوحدة الأولى: الميكانيكا", ["momentum-impulse", "collisions"]],
    ["الوحدة الثانية: الكهرباء المتحركة", ["electric-current-resistance", "dc-circuits"]],
    ["الوحدة الثالثة: الكهرومغناطيسية", ["magnetic-field", "magnetic-force", "electromagnetic-induction"]],
  ]);
  const sample = getSubjectRoadmapLesson("physics", "latex-test");
  assert.equal(sample.hidden, true);
  assert.equal(sample.optional, true);
  const part = sample.parts[0];
  const lesson = await loadSubjectLessonPart("physics", sample.id, part.id);
  assert.deepEqual(lesson.steps.map(step => step.id), part.questionIds);
  assert.equal(lesson.reward, 0);
  assert.equal(readRoute("?subject=physics&lesson=latex-test&part=latex-test-practice").lesson, "momentum-impulse");
  const markup = renderMarkup(roadmap);
  assert.doesNotMatch(markup, /latex-test|بانتظار فهرس|الحركة الدورانية/);
  assert.equal((markup.match(/data-roadmap-lesson=/g) || []).length, 7);
});

test("ICT follows the units and lessons listed in the textbook contents", () => {
  const roadmap = getSubjectRoadmap("ict");
  const markup = renderSubjectRoadmapMarkup(roadmap);
  assert.equal(roadmap.units.length, 3);
  assert.deepEqual(
    roadmap.units.map(({ id, label, lessons }) => ({
      id,
      label,
      lessons:lessons.map(({ label:lessonLabel }) => lessonLabel),
    })),
    [
      {
        id:"unit-1",
        label:"الوحدة الأولى: قواعد البيانات",
        lessons:[
          "مقدمة المادة",
          "الدرس الأول: برنامج إدارة قواعد البيانات",
          "الدرس الثاني: الاستعلامات ولغة SQL",
        ],
      },
      {
        id:"unit-2",
        label:"الوحدة الثانية: تطبيقات الهاتف الذكي",
        lessons:[
          "الدرس الأول: أنظمة تشغيل الهاتف الذكي",
          "الدرس الثاني: تطبيقي الخاص على هاتفي",
        ],
      },
      {
        id:"unit-4",
        label:"الوحدة الثالثة: شبكات الاتصال",
        lessons:["الدرس الأول: طبقات نموذج OSI"],
      },
    ],
  );
  assert.equal(roadmap.units.flatMap(({ lessons }) => lessons).length, 6);
  assert.equal((markup.match(/class="roadmap-unit"/g) || []).length, 3);
  assert.equal((markup.match(/class="roadmap-lesson-divider"/g) || []).length, 5);
  assert.equal((markup.match(/class="roadmap-stop"/g) || []).length, 5);
  assert.doesNotMatch(markup, /course-introduction|getting-started|مقدمة المادة/);
  assert.match(markup, /قواعد البيانات/);
  assert.match(markup, /تطبيقات الهاتف الذكي/);
  assert.match(markup, /شبكات الاتصال/);
  assert.match(markup, /لغة SQL/);
  assert.match(markup, /نموذج OSI/);
  assert.match(markup, /data-roadmap-bubble/);
  assert.doesNotMatch(markup.match(/<aside id="roadmap-part-brief"[^]*?<\/aside>/)?.[0] || "", /data-bubble-unit/);
  assert.match(markup, /data-bubble-start/);
  assert.doesNotMatch(markup, /roadmap-whole-entry|الدرس كاملًا|ابدأ التعلّم|data-bubble-xp|<details|<summary/);
  assert.equal((markup.match(/class="roadmap-node"/g) || []).length, 5);
  assert.equal((markup.match(/class="roadmap-connector"/g) || []).length, 0);
  assert.doesNotMatch(markup, /roadmap-lesson-preview|هذه شاشة درس تجريبية|العودة إلى الخريطة/);
  assert.doesNotMatch(markup, /خريطة المادة|تكنولوجيا المعلومات|3 وحدات|محتوى تجريبي/);
  assert.doesNotMatch(markup, /roadmap-unit-panels|data-unit-percent|data-unit-progress-count/);
  assert.doesNotMatch(markup, /class="roadmap-part-status"| · \d+ مكتمل|class="roadmap-lesson-heading">[\s\S]*?<\/h3><span>/);
  assert.equal((markup.match(/data-unit-guide /g) || []).length, 3);
});

test("biology exposes the reduced-pack roadmap while unknown subjects remain unavailable", () => {
  const biology = getSubjectRoadmap("biology");
  assert.deepEqual(biology.units.map(unit => unit.lessons.map(lesson => lesson.id)), [
    ["energy-flow", "gene-to-protein"],
    ["inheritance"],
    ["human-systems"],
    ["microbes"],
    ["past-papers-800", "tasnif-written"],
  ]);
  assert.equal(getSubjectRoadmap("unknown"), null);
  assert.equal(getSubjectRoadmapLesson("ict", "database-management")?.label, "الدرس الأول: برنامج إدارة قواعد البيانات");
  assert.equal(getSubjectRoadmapLesson("ict", "unknown"), null);
});

test("unpublished guest parts never imply that creating an account publishes them", () => {
  const markup = renderSubjectRoadmapMarkup(unpublishedFixture, { isLessonLocked:() => true });
  assert.equal((markup.match(/data-account-locked="true"/g) || []).length, 0);
  assert.equal((markup.match(/data-access-state="unpublished"/g) || []).length, 1);
  assert.match(markup, /data-roadmap-part="draft-part"[^>]*data-part-available="false"[^>]*data-access-state="unpublished"/);
  assert.doesNotMatch(markup.match(/<button[^>]*data-roadmap-lesson="ready-lesson"[^>]*>/)?.[0] || "", /data-account-locked/);
  assert.match(markup, /أنشئ حسابًا لمتابعة بقية الدروس/);
  assert.match(markup, /data-bubble-sign-in/);
});

test("subject roadmap metadata is escaped before entering markup", () => {
  const markup = renderSubjectRoadmapMarkup({
    subjectId: 'ict" onmouseover="alert(1)',
    units: [
      {
        id: "unit",
        label: "<b>Unit</b>",
        lessons: [
          {
            id: "lesson",
            label: 'Lesson "one"',
            summary: '"><img src=x>',
            xp: 10,
            parts:[{ id:"unsafe", label:'"><img src=x>', pages:"1" }],
          },
        ],
      },
    ],
  });

  assert.doesNotMatch(markup, /<b>Unit|<img src=x>|data-subject="ict" onmouseover=/);
  assert.match(markup, /&lt;b&gt;Unit&lt;\/b&gt;/);
  assert.match(markup, /data-subject="ict&quot; onmouseover=&quot;alert\(1\)"/);
  assert.match(markup, /&quot;&gt;&lt;img src=x&gt;/);
});


test("five lesson circles retain published part identities for old links", () => {
  const roadmap = getSubjectRoadmap("ict");
  const lessons = roadmap.units.flatMap(({ lessons }) => lessons);
  const markup = renderSubjectRoadmapMarkup(roadmap);
  assert.equal(lessons.flatMap(({ parts }) => parts).length, 29);
  assert.equal((markup.match(/class="roadmap-lesson-divider"/g) || []).length, 5);
  assert.equal((markup.match(/data-roadmap-part=/g) || []).length, 5);
  assert.equal((markup.match(/data-part-available="true"/g) || []).length, 5);
  assert.equal((markup.match(/data-part-available="false"/g) || []).length, 0);
  for (const lesson of lessons) {
    assert.equal(new Set(lesson.parts.map(({ id }) => id)).size, lesson.parts.length);
    assert.ok(lesson.parts.every(({ label, pages }) => label && pages));
  }
});


test("unit banners omit statistics and keep access separate from progress", () => {
  const markup = renderSubjectRoadmapMarkup(getSubjectRoadmap("ict"), {
    getPartProgress:(_lesson, part) => ({ completed:part.id === "access-basics", completedStepIds:part.id === "access-basics" ? ids(part) : [] }),
    isLessonLocked:() => true,
  });
  assert.doesNotMatch(markup, /<progress|data-unit-percent|data-unit-progress-count/);
  assert.match(markup, /data-unit-guide aria-haspopup="dialog"/);
  assert.match(markup, /data-part-state="in-progress"/);
  assert.doesNotMatch(markup, /data-account-locked="true"/);
});

test("all published parts are unlocked while completion stays independent", () => {
  const roadmap = getSubjectRoadmap("ict");
  const initial = renderSubjectRoadmapMarkup(roadmap);
  const initialButtons = [...initial.matchAll(/<button class="roadmap-part"[^>]*>/g)].map(match => match[0]);
  assert.equal(initialButtons.filter(button => button.includes('data-access-state="available"')).length, 5);
  assert.doesNotMatch(initial, /roadmap-recommended/);
  assert.doesNotMatch(initial, /data-roadmap-part="getting-started"/);
  assert.match(initial, /data-roadmap-part="access-basics"[^>]*>[\s\S]*?roadmap-part-number" aria-hidden="true">1</);
  const updated = renderSubjectRoadmapMarkup(roadmap, {
    getPartProgress:(_lesson, part) => ({ completed:part.id === "access-basics", completedStepIds:part.id === "access-basics" ? ids(part) : [] }),
    getPartReview:(_lesson, part) => part.id === "access-basics" ? [{ stepId:"a", solved:true }, { stepId:"b", solved:true }, { stepId:"c", solved:false }] : [],
  });
  const buttons = [...updated.matchAll(/<button class="roadmap-part"[^>]*>/g)].map(match => match[0]);
  assert.ok(buttons[0].includes('data-part-state="in-progress"'));
  assert.ok(buttons[1].includes('data-path-locked="false"'));
  assert.ok(buttons[2].includes('data-path-locked="false"'));
  assert.doesNotMatch(updated, /data-unit-progress-count/);
});

test("review cards show honest empty states and deduplicate questions into parts", () => {
  const roadmap = getSubjectRoadmap("ict");
  const empty = renderSubjectRoadmapMarkup(roadmap);
  assert.equal((empty.match(/لا توجد أسئلة تحتاج مراجعة الآن/g) || []).length, 3);
  assert.ok(!empty.includes("data-review-part="));
  const active = renderSubjectRoadmapMarkup(roadmap, { getPartReview:(_lesson, part) => part.id === "access-basics" ? [{ stepId:"question-1", misses:2, active:true }, { stepId:"question-2", misses:3, active:true }] : [] });
  assert.equal((active.match(/data-review-part=/g) || []).length, 1);
  assert.match(active, /2 سؤال بحاجة للتدريب/);
  assert.ok(active.includes('data-review-step="question-2"'));
  assert.match(active, /class="roadmap-review-panel" role="region" aria-label="[^"]+" tabindex="0" hidden/);
  assert.doesNotMatch(active.match(/class="roadmap-unit-panels"[\s\S]*?<\/header>/)?.[0] || "", /data-review-part/);
  const unpublished = renderSubjectRoadmapMarkup(unpublishedFixture, {
    isLessonLocked:() => true,
    getPartReview:(_lesson, part) => part.id === "draft-part" ? [{ stepId:"retained-question", misses:2, active:true }] : [],
  });
  assert.match(unpublished, /data-review-part="draft-part"[^>]* disabled>[\s\S]*?<b>غير متاح حاليًا<\/b>/);
});


test("published parts bypass account requirements", () => {
  const markup = renderSubjectRoadmapMarkup(getSubjectRoadmap("ict"), { isLessonLocked:() => true });
  assert.equal((markup.match(/data-account-locked="true"/g) || []).length, 0);
  assert.equal((markup.match(/data-access-state="unpublished"/g) || []).length, 0);
});

test("popup placement stays inside measured header, navigation, and rail bounds", () => {
  const cases = [
    { anchor:{ left:140, right:244, top:650, bottom:740 }, size:{ width:320, height:240 }, bounds:{ left:12, right:378, top:78, bottom:741 } },
    { anchor:{ left:14, right:118, top:90, bottom:180 }, size:{ width:320, height:240 }, bounds:{ left:12, right:378, top:78, bottom:741 } },
    { anchor:{ left:400, right:510, top:130, bottom:224 }, size:{ width:320, height:188 }, bounds:{ left:12, right:748, top:78, bottom:266 } },
    { anchor:{ left:830, right:940, top:650, bottom:744 }, size:{ width:320, height:320 }, bounds:{ left:12, right:1160, top:12, bottom:888 } },
  ];
  for (const { anchor, size, bounds } of cases) {
    const placed = getRoadmapBubblePosition(anchor, size, bounds);
    assert.ok(placed.left >= bounds.left && placed.left + size.width <= bounds.right);
    assert.ok(placed.top >= bounds.top && placed.top + size.height <= bounds.bottom);
  }
});

test("the start hint begins at the first lesson, advances, and ignores hidden introduction progress", () => {
  const roadmap = getSubjectRoadmap("ict");
  const parts = roadmap.units[0].lessons.find(lesson => lesson.id === "database-management").parts;
  const currentButton = markup => markup.match(/<button class="roadmap-part"[^>]*aria-current="step"[^>]*>/g) || [];
  const initial = renderSubjectRoadmapMarkup(roadmap);
  assert.equal(currentButton(initial).length, 1);
  assert.ok(currentButton(initial)[0].includes('data-roadmap-part="access-basics"'));
  assert.doesNotMatch(initial, /data-unit-tab|role="tablist"/);
  const afterIntro = renderSubjectRoadmapMarkup(roadmap, { getPartProgress:(_lesson, part) => ({ completed:part.id === "getting-started" }) });
  assert.ok(currentButton(afterIntro)[0].includes(`data-roadmap-part="${parts[0].id}"`));
  const continued = renderSubjectRoadmapMarkup(roadmap, {
    getPartProgress:(_lesson, part) => part.id === "getting-started" || part === parts[0] ? { completed:true, completedStepIds:ids(part) } : part === parts[1] ? { completedStepIds:[ids(part)[0]] } : null,
  });
  assert.equal(currentButton(continued).length, 1);
  assert.ok(currentButton(continued)[0].includes(`data-roadmap-part="${parts[1].id}"`));
  assert.match(continued, /class="roadmap-start-hint" aria-hidden="true">تابع/);
  assert.equal(currentButton(renderSubjectRoadmapMarkup(roadmap, { isLessonLocked:() => true })).length, 1);
  assert.equal(currentButton(renderSubjectRoadmapMarkup(roadmap, { getPartProgress:(_lesson, part) => ({ completed:true, completedStepIds:ids(part) }) })).length, 0);
});


test("Math 2 contains integration and matrices while differentiation applications stay in Math 1", async () => {
  const { MATHEMATICS_LESSONS } = await import("../src/data/lessons/mathematics/math-course.js");
  const { loadSubjectLessonPart } = await import("../src/data/lessons/subject-lesson-registry.js");
  const first = getSubjectRoadmap("mathematics");
  const second = getSubjectRoadmap("mathematics-2");
  assert.deepEqual(first.units.map(unit => unit.label), ["الوحدة الأولى: التفاضل", "الوحدة الثانية: تطبيقات التفاضل"]);
  assert.deepEqual(first.units[1].lessons.map(lesson => lesson.id), ["increasing-decreasing", "extreme-values", "concavity-inflection", "extrema-applications"]);
  assert.deepEqual(second.units.map(unit => unit.label), ["الوحدة الأولى: التكامل", "الوحدة الثانية: المصفوفات"]);
  assert.equal(second.units[0].lessons.length, 9);
  assert.equal(second.units[1].lessons.length, 5);
  const all = [first, second].flatMap(roadmap => roadmap.units.flatMap(unit => unit.lessons));
  assert.equal(all.length, MATHEMATICS_LESSONS.length);
  assert.equal(new Set(all.map(lesson => lesson.id)).size, all.length);
  for (const lesson of second.units.flatMap(unit => unit.lessons)) {
    const part = lesson.parts[0];
    const current = await loadSubjectLessonPart("mathematics-2", lesson.id, part.id);
    const legacy = await loadSubjectLessonPart("mathematics", lesson.id, part.id);
    assert.deepEqual(new Set(current.steps.map(step => step.id)), new Set(part.questionIds));
    assert.deepEqual(legacy.steps.map(step => step.id), current.steps.map(step => step.id));
  }
});
