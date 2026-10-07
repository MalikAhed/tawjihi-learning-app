import assert from "node:assert/strict";
import test from "node:test";
import { formatArabicCount, formatLevel, formatXp, formatXpProgress, isProgressLabelCovered } from "../src/ui/learner-format.js";

test("Arabic learner counts handle zero, one, two, few, many, and other", () => {
  const counts = [0, 1, 2, 3, 11, 100];
  assert.deepEqual(counts.map(count => formatArabicCount(count, "day")), ["0 أيام", "يوم واحد", "يومان", "3 أيام", "11 يومًا", "100 يوم"]);
  assert.deepEqual(counts.map(count => formatArabicCount(count, "part")), ["0 أجزاء", "جزء واحد", "جزآن", "3 أجزاء", "11 جزءًا", "100 جزء"]);
  assert.deepEqual(counts.map(count => formatArabicCount(count, "question")), ["0 أسئلة", "سؤال واحد", "سؤالان", "3 أسئلة", "11 سؤالًا", "100 سؤال"]);
});

test("level and XP values have one plain-text format across learner surfaces", () => {
  assert.equal(formatLevel(1), "Lv. 01");
  assert.equal(formatLevel(4), "Lv. 04");
  assert.equal(formatLevel(12), "Lv. 12");
  assert.equal(formatXp(10), "10 XP");
  assert.equal(formatXpProgress(10, 200), "10 / 200 XP");
});

test("an overlaid progress value changes tone only after the fill clears its center", () => {
  assert.equal(isProgressLabelCovered(0, 100), false);
  assert.equal(isProgressLabelCovered(59, 100), false);
  assert.equal(isProgressLabelCovered(60, 100), true);
  assert.equal(isProgressLabelCovered(4, 5), true);
  assert.equal(isProgressLabelCovered(1, 0), false);
});
