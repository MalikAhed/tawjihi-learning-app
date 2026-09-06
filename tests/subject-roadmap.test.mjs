import assert from "node:assert/strict";
import test from "node:test";
import { getSubjectRoadmap, getSubjectRoadmapLesson } from "../src/data/subject-roadmaps.js";
import { renderSubjectRoadmapMarkup } from "../src/ui/subject-roadmap.js";

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
          "الدرس 0: مقدمة المسار",
          "الدرس الأول: إدارة قواعد البيانات",
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
        label:"الوحدة الرابعة: شبكات الاتصال",
        lessons:["الدرس الأول: طبقات نموذج OSI"],
      },
    ],
  );
  assert.equal(roadmap.units.flatMap(({ lessons }) => lessons).length, 6);
  assert.equal((markup.match(/class="roadmap-unit"/g) || []).length, 3);
  assert.equal((markup.match(/class="roadmap-lesson-divider"/g) || []).length, 6);
  assert.equal((markup.match(/class="roadmap-stop"/g) || []).length, 29);
  assert.match(markup, /قواعد البيانات/);
  assert.match(markup, /تطبيقات الهاتف الذكي/);
  assert.match(markup, /شبكات الاتصال/);
  assert.match(markup, /لغة SQL/);
  assert.match(markup, /نموذج OSI/);
  assert.match(markup, /data-roadmap-bubble/);
  assert.match(markup, /data-bubble-start/);
  assert.doesNotMatch(markup, /roadmap-whole-entry|الدرس كاملًا|ابدأ التعلّم|data-bubble-xp|<details|<summary/);
  assert.equal((markup.match(/class="roadmap-node"/g) || []).length, 29);
  assert.equal((markup.match(/class="roadmap-connector"/g) || []).length, 23);
  assert.doesNotMatch(markup, /roadmap-lesson-preview|هذه شاشة درس تجريبية|العودة إلى الخريطة/);
  assert.doesNotMatch(markup, /خريطة المادة|تكنولوجيا المعلومات|3 وحدات|محتوى تجريبي/);
  assert.equal((markup.match(/<progress value="0"/g) || []).length, 3);
});

test("subjects without a roadmap remain in their existing status view", () => {
  assert.equal(getSubjectRoadmap("mathematics"), null);
  assert.equal(getSubjectRoadmap("unknown"), null);
  assert.equal(getSubjectRoadmapLesson("ict", "database-management")?.label, "الدرس الأول: إدارة قواعد البيانات");
  assert.equal(getSubjectRoadmapLesson("ict", "unknown"), null);
});

test("the guest roadmap leaves only the first trial lesson open", () => {
  const markup = renderSubjectRoadmapMarkup(getSubjectRoadmap("ict"), {
    isLessonLocked:(_unit, lesson) => !["course-introduction", "database-management"].includes(lesson.id),
  });
  assert.equal((markup.match(/data-account-locked="true"/g) || []).length, 22);
  assert.doesNotMatch(markup.match(/<button[^>]*data-roadmap-lesson="course-introduction"[^>]*>/)?.[0] || "", /data-account-locked/);
  assert.doesNotMatch(markup.match(/<button[^>]*data-roadmap-lesson="database-management"[^>]*>/)?.[0] || "", /data-account-locked/);
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


test("official lessons contain named, individually selectable parts with honest availability", () => {
  const roadmap = getSubjectRoadmap("ict");
  const lessons = roadmap.units.flatMap(({ lessons }) => lessons);
  const markup = renderSubjectRoadmapMarkup(roadmap);
  assert.equal(lessons.flatMap(({ parts }) => parts).length, 29);
  assert.equal((markup.match(/class="roadmap-lesson-divider"/g) || []).length, 6);
  assert.equal((markup.match(/data-roadmap-part=/g) || []).length, 29);
  assert.equal((markup.match(/data-part-available="true"/g) || []).length, 7);
  assert.equal((markup.match(/data-part-available="false"/g) || []).length, 22);
  for (const lesson of lessons) {
    assert.equal(new Set(lesson.parts.map(({ id }) => id)).size, lesson.parts.length);
    assert.ok(lesson.parts.every(({ label, pages }) => label && pages));
  }
});


test("unit cards count completed parts once and keep access separate from progress", () => {
  const markup = renderSubjectRoadmapMarkup(getSubjectRoadmap("ict"), {
    getPartProgress:(_lesson, part) => ({ completed:part.id === "getting-started", completedStepIds:[] }),
    isLessonLocked:() => true,
  });
  assert.match(markup, /<progress value="1" max="14"/);
  assert.match(markup, /1 من 14 جزء مكتمل/);
  assert.match(markup, /<bdi>7%<\/bdi>/);
  assert.equal((markup.match(/<progress value="0"/g) || []).length, 2);
  assert.match(markup, /data-part-state="completed"/);
  assert.match(markup, /data-account-locked="true"/);
});

test("the next part unlocks after completion and answered questions are counted independently", () => {
  const roadmap = getSubjectRoadmap("ict");
  const initial = renderSubjectRoadmapMarkup(roadmap);
  const initialButtons = [...initial.matchAll(/<button class="roadmap-part"[^>]*>/g)].map(match => match[0]);
  assert.equal(initialButtons.filter(button => button.includes('data-path-locked="false"')).length, 2);
  assert.match(initial, /roadmap-recommended">موصى به/);
  assert.match(initial, /data-roadmap-part="getting-started"[^>]*>[\s\S]*?roadmap-part-number" aria-hidden="true">0</);
  assert.match(initial, /data-roadmap-part="access-basics"[^>]*>[\s\S]*?roadmap-part-number" aria-hidden="true">1</);
  const updated = renderSubjectRoadmapMarkup(roadmap, {
    getPartProgress:(_lesson, part) => ({ completed:part.id === "getting-started" }),
    getPartReview:(_lesson, part) => part.id === "access-basics" ? [{ stepId:"a" }, { stepId:"b" }] : [],
  });
  const buttons = [...updated.matchAll(/<button class="roadmap-part"[^>]*>/g)].map(match => match[0]);
  assert.ok(buttons[0].includes('data-part-state="completed"'));
  assert.ok(buttons[1].includes('data-path-locked="false"'));
  assert.ok(buttons[2].includes('data-path-locked="true"'));
  assert.match(updated, /<strong>2<\/strong><span data-unit-progress-count>أسئلة محلولة/);
});

test("review cards show honest empty states and deduplicate questions into parts", () => {
  const roadmap = getSubjectRoadmap("ict");
  const empty = renderSubjectRoadmapMarkup(roadmap);
  assert.equal((empty.match(/data-review-count>0/g) || []).length, 3);
  assert.ok(!empty.includes("data-review-part="));
  const active = renderSubjectRoadmapMarkup(roadmap, { getPartReview:(_lesson, part) => part.id === "access-basics" ? [{ stepId:"question-1", misses:2, active:true }, { stepId:"question-2", misses:3, active:true }] : [] });
  assert.equal((active.match(/data-review-part=/g) || []).length, 1);
  assert.ok(active.includes('data-review-count>1'));
  assert.ok(active.includes('data-review-step="question-1"'));
});
