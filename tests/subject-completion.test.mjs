import assert from "node:assert/strict";
import test from "node:test";

import { renderSubjectCompletion, renderSubjectStreak } from "../src/ui/subject-completion.js";

test("the lesson ending keeps Rocky without visible completion copy", () => {
  const previousWindow = globalThis.window;
  globalThis.window = { matchMedia:() => ({ matches:true }) };
  const markup = renderSubjectCompletion("Lesson", { xpGain:10 });
  if (previousWindow === undefined) delete globalThis.window;
  else globalThis.window = previousWindow;

  assert.match(markup, /subject-completion-rocky/);
  assert.doesNotMatch(markup, /subject-completion-rocky-name/);
  assert.doesNotMatch(markup, /أكملت الدرس!/);
});

test("the streak ending uses numbered days and the animated streak artwork", () => {
  const previousWindow = globalThis.window;
  globalThis.window = { matchMedia:() => ({ matches:false }) };
  const markup = renderSubjectStreak({ streak:2 });
  if (previousWindow === undefined) delete globalThis.window;
  else globalThis.window = previousWindow;

  assert.match(markup, /streak-fire-burning\.svg/);
  assert.doesNotMatch(markup, /subject-completion-rocky/);
  assert.doesNotMatch(markup, /كنت أعرف أنك ستعود/);
  assert.deepEqual(
    [...markup.matchAll(/<li[^>]*><span>(\d)<\/span>/g)].map((match) => Number(match[1])),
    [1, 2, 3, 4, 5, 6, 7],
  );
});
