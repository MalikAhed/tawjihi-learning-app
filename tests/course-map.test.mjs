import assert from "node:assert/strict";
import test from "node:test";
import { getSubjectCardPresentation, renderCourseMapMarkup } from "../src/ui/course-map.js";
import { getIctPartQuestions } from "../src/data/lessons/ict/exam-lessons.js";
import { getSubjectRoadmap } from "../src/data/subject-roadmaps.js";

const ictQuestionTotal = getSubjectRoadmap("ict").units.flatMap(unit => unit.lessons)
  .filter(lesson => !lesson.hidden)
  .flatMap(lesson => lesson.parts)
  .reduce((total, part) => total + getIctPartQuestions(part.id).length, 0);

test("the learning map contains no development reference nodes", () => {
  assert.doesNotMatch(renderCourseMapMarkup(), /data-lesson-studio/);
  assert.doesNotMatch(renderCourseMapMarkup(), /data-design-system/);
});

test("the learning map renders every subject with the approved shared card layout", () => {
  const markup = renderCourseMapMarkup();
  const subjects = [...markup.matchAll(/data-subject="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(subjects, ["ict", "mathematics", "mathematics-2", "physics", "biology", "chemistry", "english", "arabic", "islamic-education"]);
  assert.match(markup, /data-subject="mathematics"[^]*?<h2>الرياضيات 1<\/h2>/);
  assert.match(markup, /data-subject="mathematics-2"[^]*?<h2>الرياضيات 2<\/h2>/);
  assert.equal((markup.match(/<button class="subject-card(?: [^"]+)?"/g) || []).length, 9);
  assert.equal((markup.match(/data-status="unpublished"/g) || []).length, 2);
  assert.equal((markup.match(/data-status="available"/g) || []).length, 7);
  assert.equal((markup.match(/ disabled(?=[ >])/g) || []).length, 2);
  assert.equal((markup.match(/assets\/icons\/subject-lock\.svg/g) || []).length, 2);
  assert.equal((markup.match(/subject-card__hero/g) || []).length, 9);
  assert.equal((markup.match(/subject-card__details/g) || []).length, 9);
  assert.equal((markup.match(/data-subject-progress/g) || []).length, 9);
  assert.doesNotMatch(markup, /data-expanded-component| hidden/);
  assert.match(markup, /data-subject="physics"[^]*?data-subject-count>0 \/ 565<\/bdi>/);
  assert.doesNotMatch(markup.match(/<button[^>]*data-subject="physics"[^>]*>/)?.[0] || "", /disabled|subject-card--locked/);
  assert.match(markup, new RegExp(`data-subject="ict"[^]*?data-subject-count>0 / ${ictQuestionTotal}</bdi>`));
  assert.doesNotMatch(markup.match(/<button[^>]*data-subject="ict"[^>]*>/)?.[0] || "", /disabled|subject-card--locked/);
  assert.doesNotMatch(markup, /subject-card__arrow|[‹›]/);
  assert.doesNotMatch(markup, /subject-card:before|data-day|اليوم|مكتمل|unit-card|biome-image/);
});


test("card actions reflect learner progress while publication stays independent", () => {
  const subject = { id:"ict", name:"المادة", status:"available" };
  assert.equal(getSubjectCardPresentation(subject).totalLessons, 5);
  assert.equal(getSubjectCardPresentation(subject).totalCount, ictQuestionTotal);
  const oneQuestion = getSubjectCardPresentation(subject, { learning:{ currentQuestionsSolved:1, currentQuestionsTotal:ictQuestionTotal } });
  assert.equal(oneQuestion.completedCount, 1);
  assert.equal(oneQuestion.progress, Math.round(100 / ictQuestionTotal));
  assert.match(oneQuestion.label, new RegExp(`1 من ${ictQuestionTotal} سؤالًا`));
  assert.equal(getSubjectCardPresentation(subject).action, "ابدأ من خريطة الدروس");
  assert.equal(getSubjectCardPresentation(subject, { learning:{ hasStarted:true, progress:0 } }).action, "تابع من خريطة الدروس");
  assert.equal(getSubjectCardPresentation(subject, { learning:{ progress:100 } }).action, "راجع خريطة الدروس");
  assert.equal(getSubjectCardPresentation(subject, { learning:{ progress:24, requiredLessonsCompleted:7, publishedPartsTotal:7 } }).action, "راجع خريطة الدروس");
  const unavailable = getSubjectCardPresentation({ ...subject, status:"unpublished" }, { learning:{ progress:100 } });
  assert.equal(unavailable.action, "قيد الإعداد");
  assert.equal(unavailable.progress, 0);
  assert.equal(unavailable.label, "المادة، قيد الإعداد");
});

test("mathematics counts newly published questions when a learner snapshot has an older total", () => {
  const total = getSubjectRoadmap("mathematics").units.flatMap(unit => unit.lessons)
    .filter(lesson => !lesson.hidden).flatMap(lesson => lesson.parts)
    .reduce((count, part) => count + part.questionIds.length, 0);
  const view = getSubjectCardPresentation({ id:"mathematics", name:"الرياضيات", status:"available" }, {
    learning:{ subjects:{ mathematics:{ currentQuestionsSolved:1, currentQuestionsTotal:2 } } },
  });
  assert.equal(view.totalCount, total);
  assert.equal(view.completedCount, 1);
  assert.equal(view.progress, Math.round(100 / total));
});
