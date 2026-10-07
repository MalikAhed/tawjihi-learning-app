import assert from "node:assert/strict";
import test from "node:test";
import { canPrefetchAssets, preloadImages, revealWhenReady } from "../src/ui/media-ready.js";
import { registerMarkup } from "../src/ui/visitor-flow-markup.js";

test("optional assets yield bandwidth to active screens on constrained connections", () => {
  for (const connection of [{ saveData:true }, { effectiveType:"slow-2g" }, { effectiveType:"2g" }, { downlink:0.5 }, { rtt:600 }]) {
    assert.equal(canPrefetchAssets(connection), false);
  }
  assert.equal(canPrefetchAssets({ effectiveType:"4g", downlink:10, rtt:50 }), true);
  assert.equal(canPrefetchAssets(), false, "an unreported connection does not trigger speculative requests");
});

test("prefetch sends no requests in data saver and deduplicates optional requests otherwise", async () => {
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  const originalFetch = globalThis.fetch;
  const requests = [];
  try {
    Object.defineProperty(globalThis, "navigator", { configurable:true, value:{ connection:{ saveData:true } } });
    globalThis.fetch = async source => { requests.push(source); return { ok:true, arrayBuffer:async () => new ArrayBuffer(0) }; };
    preloadImages(["optional.svg"]);
    assert.deepEqual(requests, []);
    Object.defineProperty(globalThis, "navigator", { configurable:true, value:{ connection:{ effectiveType:"4g" } } });
    preloadImages(["optional.svg", "optional.svg", ""]);
    preloadImages(["optional.svg"]);
    await Promise.resolve();
    assert.deepEqual(requests, ["optional.svg"]);
  } finally {
    globalThis.fetch = originalFetch;
    if (navigatorDescriptor) Object.defineProperty(globalThis, "navigator", navigatorDescriptor);
    else delete globalThis.navigator;
  }
});

test("future registration illustrations remain deferred until their step is shown", () => {
  const steps = [...registerMarkup().matchAll(/<section\b[^>]*data-onboarding-step="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g)];
  assert.equal(steps.length, 6);
  assert.doesNotMatch(steps[0][2], /loading="lazy"/);
  for (const [, id, content] of steps.slice(1)) {
    const images = [...content.matchAll(/<img\b[^>]*>/g)].map(match=>match[0]);
    assert.ok(images.length, `${id} retains its illustrations`);
    assert.ok(images.every(image=>image.includes('loading="lazy"') && image.includes("data-onboarding-image")), `${id} defers every future illustration`);
  }
});

test('a pending decorative background leaves screen controls usable',()=>{
  let revealed=false;
  const attributes=new Map();
  const control={inert:false};
  const image={loading:'eager',closest:()=>null,hasAttribute:name=>name==='data-decorative-image'};
  const surface={
    isConnected:true,children:[control],dataset:{},
    querySelectorAll:()=>[image],
    getAttribute:name=>attributes.get(name)??null,
    removeAttribute:name=>attributes.delete(name),
    classList:{remove(){},add(){throw Error('Decorative art cannot hide current controls');}},
  };
  const cleanup=revealWhenReady(surface,{animate:false,onReady:()=>{revealed=true;}});
  assert.equal(revealed,true);
  assert.equal(control.inert,false);
  assert.equal(surface.dataset.mediaState,'ready');
  cleanup();
});
