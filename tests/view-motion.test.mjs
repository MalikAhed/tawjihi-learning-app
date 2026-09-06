import test from "node:test";
import assert from "node:assert/strict";
import { animateView, VIEW_TRANSITION_MS } from "../src/ui/view-motion.js";

test("rapid navigation cancels prior motion without deferring content updates", () => {
  const calls = [];
  const element = { animate(frames, options) {
    const animation = { cancel() { this.cancelled = true; }, finished:new Promise(() => {}) };
    calls.push({ frames, options, animation });
    return animation;
  } };
  animateView(element);
  animateView(element);
  assert.equal(calls[0].animation.cancelled, true);
  assert.equal(calls[1].animation.cancelled, undefined);
  assert.equal(calls[1].options.duration, VIEW_TRANSITION_MS);
  assert.equal(calls[1].frames.at(-1).opacity, 1);
  assert.equal(calls[1].frames[0].translate, "0 8px");
  assert.equal(calls[1].frames.at(-1).translate, "0 0");
});

test("reduced motion cancels an active entrance and starts no new animation", () => {
  let cancelled = false;
  let count = 0;
  const element = { animate() { count++; return { cancel() { cancelled = true; }, finished:new Promise(() => {}) }; } };
  animateView(element);
  const original = globalThis.matchMedia;
  globalThis.matchMedia = () => ({ matches:true });
  try { animateView(element); } finally {
    if (original) globalThis.matchMedia = original;
    else delete globalThis.matchMedia;
  }
  assert.equal(cancelled, true);
  assert.equal(count, 1);
});

test("missing animation support keeps navigation usable", () => {
  assert.doesNotThrow(() => animateView({}));
  assert.doesNotThrow(() => animateView(null));
});
