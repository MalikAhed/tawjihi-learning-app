import assert from "node:assert/strict";
import test from "node:test";
import { renderCourseMapMarkup } from "../src/ui/course-map.js";

test("the learning map contains no development reference nodes", () => {
  assert.doesNotMatch(renderCourseMapMarkup(), /data-lesson-studio/);
  assert.doesNotMatch(renderCourseMapMarkup(), /data-design-system/);
});

test("the learning map renders the eight planned subjects without days", () => {
  const markup = renderCourseMapMarkup();
  const subjects = [...markup.matchAll(/data-subject="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(subjects, ["mathematics", "physics", "biology", "chemistry", "ict", "english", "arabic", "islamic-education"]);
  assert.equal((markup.match(/<button class="subject-card(?: subject-card--locked)?"/g) || []).length, 8);
  assert.equal((markup.match(/data-status="locked"/g) || []).length, 7);
  assert.equal((markup.match(/data-status="in-progress"/g) || []).length, 1);
  assert.equal((markup.match(/ disabled(?=[ >])/g) || []).length, 7);
  assert.equal((markup.match(/assets\/icons\/subject-lock\.svg/g) || []).length, 7);
  assert.doesNotMatch(markup.match(/<button[^>]*data-subject="ict"[^>]*>/)?.[0] || "", /disabled|subject-card--locked/);
  assert.doesNotMatch(markup, /subject-card__arrow|[‹›]/);
  assert.doesNotMatch(markup, /subject-card:before|data-day|اليوم|مكتمل|unit-card|biome-image/);
});
