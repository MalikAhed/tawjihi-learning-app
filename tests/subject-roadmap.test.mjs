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
  assert.equal(roadmap.units.flatMap(({ lessons }) => lessons).length, 5);
  assert.equal((markup.match(/class="roadmap-unit"/g) || []).length, 3);
  assert.equal((markup.match(/class="roadmap-lesson"/g) || []).length, 5);
  assert.equal((markup.match(/class="roadmap-stop"/g) || []).length, 5);
  assert.match(markup, /قواعد البيانات/);
  assert.match(markup, /تطبيقات الهاتف الذكي/);
  assert.match(markup, /شبكات الاتصال/);
  assert.match(markup, /لغة SQL/);
  assert.match(markup, /نموذج OSI/);
  assert.match(markup, /data-roadmap-bubble/);
  assert.match(markup, /data-bubble-start/);
  assert.match(markup, /10 XP|data-bubble-xp/);
  assert.doesNotMatch(markup, /roadmap-lesson-preview|هذه شاشة درس تجريبية|العودة إلى الخريطة/);
  assert.doesNotMatch(markup, /خريطة المادة|تكنولوجيا المعلومات|3 وحدات|محتوى تجريبي/);
  assert.doesNotMatch(markup, /مكتمل|completed|<img/i);
});

test("subjects without a roadmap remain in their existing status view", () => {
  assert.equal(getSubjectRoadmap("mathematics"), null);
  assert.equal(getSubjectRoadmap("unknown"), null);
  assert.equal(getSubjectRoadmapLesson("ict", "database-management")?.label, "الدرس الأول: إدارة قواعد البيانات");
  assert.equal(getSubjectRoadmapLesson("ict", "unknown"), null);
});

test("the guest roadmap leaves only the first trial lesson open", () => {
  const markup = renderSubjectRoadmapMarkup(getSubjectRoadmap("ict"), {
    isLessonLocked:(_unit, lesson) => lesson.id !== "database-management",
  });
  assert.equal((markup.match(/data-account-locked="true"/g) || []).length, 4);
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
          },
        ],
      },
    ],
  });

  assert.doesNotMatch(markup, /<b>Unit|<img|data-subject="ict" onmouseover=/);
  assert.match(markup, /&lt;b&gt;Unit&lt;\/b&gt;/);
  assert.match(markup, /data-subject="ict&quot; onmouseover=&quot;alert\(1\)"/);
  assert.match(markup, /&quot;&gt;&lt;img src=x&gt;/);
});
