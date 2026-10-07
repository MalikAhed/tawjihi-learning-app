import assert from "node:assert/strict";
import test from "node:test";
import { nextIncludedVideoTime, parseVideoSkipRanges, renderVideoIntro } from "../src/ui/lesson/video-intro.js";

test("video exclusions retain single-range URLs and merge overlapping or adjacent ranges", () => {
  assert.deepEqual(parseVideoSkipRanges("1328-1447"), [{ from:1328, to:1447 }]);
  assert.deepEqual(parseVideoSkipRanges("40-50,10-20,20-30,12-25"), [{ from:10, to:30 }, { from:40, to:50 }]);
  for (const invalid of ["4-4", "5-2", "-1-5", "1.2-5", "1-NaN", "1-5,bad", "1-9007199254740992"]) {
    assert.deepEqual(parseVideoSkipRanges(invalid), [], invalid);
  }
  assert.deepEqual(parseVideoSkipRanges("3-21", 20), []);
  assert.deepEqual(parseVideoSkipRanges("3-20", 20), [{ from:3, to:20 }]);
});

test("opening and seeking into excluded material resumes at the next included second", () => {
  const ranges = parseVideoSkipRanges("0-15,30-45");
  for (const [time, expected] of [[0,15], [14.9,15], [15,15], [29.9,29.9], [30,45], [45,45]]) {
    assert.equal(nextIncludedVideoTime(time, ranges), expected);
  }
  const html = renderVideoIntro({ title:"Lesson", source:"https://youtu.be/AlkDbnbv7dk?t=5&skip=0-15,30-45" }, { titleId:"lesson" });
  assert.match(html, /start=15/);
  assert.match(html, /data-video-skips="0-15,30-45"/);
  assert.match(html, /data-video-skip-status="pending"/);
  assert.match(html, /0:00–0:15، 0:30–0:45/);
  assert.doesNotMatch(html, /autoplay=1/);
});
