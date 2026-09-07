import assert from "node:assert/strict";
import test from "node:test";

import { renderSubjectCompletion, renderSubjectStreak, renderSubjectQuests } from "../src/ui/subject-completion.js";

test("the lesson ending celebrates with Rocky and a visible heading", () => {
  const previousWindow = globalThis.window;
  globalThis.window = { matchMedia:() => ({ matches:true }) };
  const markup = renderSubjectCompletion("Lesson", { xpGain:10 });
  if (previousWindow === undefined) delete globalThis.window;
  else globalThis.window = previousWindow;

  assert.match(markup, /subject-completion-rocky/);
  assert.doesNotMatch(markup, /subject-completion-rocky-name/);
  assert.match(markup, /أكملت الدرس!/);
});

test("the streak ending uses actual recent weekdays and flame artwork without a mascot", () => {
  const previousWindow = globalThis.window;
  globalThis.window = { matchMedia:() => ({ matches:false }) };
  const markup = renderSubjectStreak({ streak:2, activeToday:true, date:new Date(2026,8,6) });
  const inactiveMarkup = renderSubjectStreak({ streak:0, activeToday:false });
  if (previousWindow === undefined) delete globalThis.window;
  else globalThis.window = previousWindow;

  assert.match(markup, /streak-fire-burning\.svg/);
  assert.doesNotMatch(markup, /subject-completion-rocky/);
  assert.doesNotMatch(markup, /كنت أعرف أنك ستعود/);
  assert.deepEqual(
    [...markup.matchAll(/<li[^>]*><span[^>]*>([^<]+)<\/span>/g)].map((match) => match[1]),
    ["إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"],
  );
  assert.equal((markup.match(/class="is-complete/g) || []).length, 2);
  assert.equal((markup.match(/<svg viewBox="0 0 24 24"/g) || []).length, 2);
  assert.doesNotMatch(markup, /✓/);
  assert.doesNotMatch(inactiveMarkup, /كل يوم فرصة جديدة|أكمل جزءًا جديدًا/);
});

test("quests reflect lesson goals and session performance without invented rewards", () => {
  const markup = renderSubjectQuests({perfect:true, bestAnswerRun:3, completed:1, totalParts:29, progress:7});
  assert.equal((markup.match(/<li class="completion-quest/g) || []).length,3);
  assert.match(markup,/أكمل 5 دروس/);
  assert.match(markup,/max="5" value="1"/);
  assert.match(markup,/أكمل 3 دروس بتقييم مثالي/);
  assert.match(markup,/max="3" value="1"/);
  assert.match(markup,/max="5" value="3"/);
  assert.doesNotMatch(markup,/تقدّمك في المادة|أجزاء مكتملة|1 \/ 29/);
  assert.equal((markup.match(/class="completion-quest-icon"/g) || []).length,3);
  assert.doesNotMatch(markup,/chest|سبتمبر|نقطة مهام/);
  assert.doesNotMatch(markup,/مهام هذا الدرس/);
  assert.doesNotMatch(renderSubjectQuests({preview:true}), /<progress|<li>/);
});

test("earned, repeated and preview outcomes never fabricate accuracy or elapsed time", () => {
  const previousWindow = globalThis.window;
  globalThis.window = { matchMedia:() => ({ matches:true }) };
  try {
    for (const outcome of [{ xpGain:10 }, { xpGain:0 }, { xpGain:10, preview:true }]) {
      const markup = renderSubjectCompletion("Lesson", outcome);
      assert.doesNotMatch(markup, /100%|3:21/);
      if (outcome.preview) {
        assert.match(markup, /معاينة فقط/);
        assert.doesNotMatch(markup, /data-gain-count/);
      } else {
        assert.match(markup, /مجموع XP/);
        assert.match(markup, /التقييم/);
        assert.match(markup, /الوقت/);
        assert.match(markup, new RegExp(`data-gain-count="${outcome.xpGain}"`));
        assert.doesNotMatch(markup, /مراجعة مفيدة|محسوبة من قبل/);
      }
    }
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("completion displays measured rating and minutes with padded seconds", () => {
  globalThis.window = { matchMedia:() => ({ matches:false }) };
  try {
    const markup = renderSubjectCompletion("Lesson", { xpGain:39, accuracy:92, elapsedSeconds:201 });
    assert.match(markup, /data-gain-count="92"/);
    assert.match(markup, /3:21/);
    assert.match(markup, /rocky-happy-jump.svg/);
  } finally { delete globalThis.window; }
});
