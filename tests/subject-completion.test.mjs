import assert from "node:assert/strict";
import test from "node:test";

import { renderSubjectCompletion, renderSubjectStreak } from "../src/ui/subject-completion.js";

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

test("earned and repeated outcomes never fabricate lesson share or elapsed time", () => {
  const previousWindow = globalThis.window;
  globalThis.window = { matchMedia:() => ({ matches:true }) };
  try {
    for (const outcome of [{ xpGain:10 }, { xpGain:0 }]) {
      const markup = renderSubjectCompletion("Lesson", outcome);
      assert.doesNotMatch(markup, /100%|3:21/);
        assert.match(markup, /مجموع XP/);
        assert.match(markup, /حصة الدرس من المادة/);
        assert.match(markup, /وقت التعلّم/);
        assert.match(markup, new RegExp(`data-gain-count="${outcome.xpGain}"`));
        assert.doesNotMatch(markup, /مراجعة مفيدة|محسوبة من قبل/);
    }
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("completion displays the lesson share and measured time with padded seconds", () => {
  globalThis.window = { matchMedia:() => ({ matches:false }) };
  try {
    const markup = renderSubjectCompletion("Lesson", { xpGain:10, totalParts:25, elapsedSeconds:201 });
    assert.match(markup, /data-gain-count="4"/);
    assert.match(markup, /data-gain-count="10"/);
    assert.match(markup, /3:21/);
    assert.match(markup, /rocky-happy-jump.svg/);
  } finally { delete globalThis.window; }
});
