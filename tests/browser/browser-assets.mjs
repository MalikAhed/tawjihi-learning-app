import assert from "node:assert/strict";
import { withBrowserPage } from "./browser-page.mjs";
import { delay } from "./browser-session.mjs";

await withBrowserPage(async ({ base, send, evaluate, waitFor, onEvent }) => {
  const held = new Map();
  const requests = [];
  onEvent((event) => {
    if (event.method === "Fetch.requestPaused")
      held.set(event.params.request.url, event.params.requestId);
    if (event.method === "Network.requestWillBeSent")
      requests.push(event.params.request.url);
  });
  await send("Fetch.enable", {
    patterns: [
      { urlPattern: "*assets/icons/subject-lock.svg", requestStage: "Request" },
    ],
  });
  await send("Page.navigate", { url: base + "?page=learn" });
  await waitFor("document.querySelector('.course-units.media-pending')");
  assert.equal(
    await evaluate("document.querySelector('.subject-map').inert"),
    true,
  );
  for (let n = 0; n < 300 && !held.has(base + "assets/icons/subject-lock.svg"); n++)
    await delay(20);
  const homeImageRequest = held.get(base + "assets/icons/subject-lock.svg");
  assert.ok(homeImageRequest, "Home waits for its required illustration");
  await send("Fetch.continueRequest", { requestId: homeImageRequest });
  held.delete(base + "assets/icons/subject-lock.svg");
  await waitFor(
    "document.querySelector('.course-units[data-media-state=ready]')",
  );
  assert.ok(
    !requests.some((url) =>
      /highlight\.min|marked\.esm|lesson\/authored/.test(url),
    ),
    "Home must not load the lesson rendering stack",
  );
  await send("Fetch.enable", {
    patterns: [{ urlPattern: "*test-media*", requestStage: "Request" }],
  });
  const settle = async (name, fail = false) => {
    const url = base + "assets/" + name + ".svg?test-media";
    for (let n = 0; n < 300 && !held.has(url); n++) await delay(20);
    const requestId = held.get(url);
    assert.ok(requestId, "Expected request for " + name);
    held.delete(url);
    if (fail)
      await send("Fetch.failRequest", { requestId, errorReason: "Failed" });
    else
      await send("Fetch.fulfillRequest", {
        requestId,
        responseCode: 200,
        responseHeaders: [{ name: "Content-Type", value: "image/svg+xml" }],
        body: Buffer.from(
          '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="30" fill="gold"/></svg>',
        ).toString("base64"),
      });
  };
  await evaluate(`(async () => {
    window.media = await import('./src/ui/media-ready.js');
    window.host = document.createElement('section');
    document.body.append(host);
    window.readyCount = 0;
    window.showMedia = name => {
      window.mediaAbort?.abort();
      window.mediaAbort = new AbortController();
      host.innerHTML = '<div><img alt="Test illustration" src="assets/'+name+'.svg?test-media"><button>Continue</button></div>';
      media.revealWhenReady(host, {signal:mediaAbort.signal,onReady:() => readyCount++});
    };
    showMedia('slow');
  })()`);
  assert.equal(await evaluate("host.dataset.mediaState"), "loading");
  assert.equal(await evaluate("readyCount"), 0);
  assert.equal(await evaluate("host.firstElementChild.inert"), true);
  assert.equal(
    await evaluate("getComputedStyle(host.firstElementChild).visibility"),
    "hidden",
  );
  await settle("slow");
  await waitFor("host.dataset.mediaState === 'ready'");
  assert.equal(await evaluate("host.querySelector('img').naturalWidth"), 80);
  assert.equal(await evaluate("readyCount"), 1);
  assert.equal(await evaluate("host.firstElementChild.inert"), false);

  await evaluate("showMedia('failure')");
  await settle("failure", true);
  await waitFor("host.dataset.mediaState === 'error'");
  assert.equal(await evaluate("readyCount"), 1);
  await evaluate("host.querySelector('[data-media-status] button').click()");
  await settle("failure");
  await waitFor("host.dataset.mediaState === 'ready'");
  assert.equal(await evaluate("readyCount"), 2);

  await evaluate("showMedia('obsolete')");
  await evaluate("mediaAbort.abort(); host.replaceChildren();");
  await settle("obsolete");
  await delay(60);
  assert.equal(
    await evaluate("readyCount"),
    2,
    "Aborted content cannot reveal or start motion",
  );

  await evaluate("showMedia('missing')");
  await settle("missing", true);
  await waitFor("host.dataset.mediaState === 'error'");
  await evaluate(
    "host.querySelectorAll('[data-media-status] button')[1].click()",
  );
  assert.equal(
    await evaluate("host.querySelector('.media-fallback').textContent"),
    "Test illustration",
  );
  assert.equal(await evaluate("readyCount"), 3);
  await evaluate(
    "media.preloadImages(['assets/next.svg?test-media', 'assets/next.svg?test-media'])",
  );
  await settle("next");
  assert.equal(
    requests.filter((url) => url.endsWith("/next.svg?test-media")).length,
    1,
    "Background requests must deduplicate",
  );
  await send("Fetch.disable");

  await send("Page.navigate", { url:base + "?subject=ict" });
  await waitFor("document.querySelector('[data-roadmap-lesson=database-management]')");
  await evaluate("document.querySelector('[data-roadmap-lesson=database-management]').click();document.querySelector('[data-bubble-start]').click()");
  await waitFor("document.querySelector('[data-ui-lab-answer]') && !document.querySelector('.media-pending')");
  assert.equal(await evaluate("Boolean(document.querySelector('iframe,.lesson-video-intro,.lesson-video-tour'))"), false, "question lessons never load historical videos");
  // Both layouts decode the optimized artwork at their retained aspect ratio.
  const artwork = await evaluate(`(async () => {
    const entries = [['rocky-beach-desktop-01',1672,941,100000],['rocky-beach-mobile-01',864,1152,120000]];
    const results = [];
    for (const [name,width,height,budget] of entries) {
      const src = 'assets/mascot/hero-options/' + name + '.webp';
      const image = new Image(); image.src = src; await image.decode();
      const response = await fetch(src);
      results.push({name,width,height,budget,actualWidth:image.naturalWidth,actualHeight:image.naturalHeight,bytes:(await response.arrayBuffer()).byteLength});
    }
    return results;
  })()`);
  for (const image of artwork) {
    assert.equal(image.actualWidth,image.width);
    assert.equal(image.actualHeight,image.height);
    assert.ok(image.bytes < image.budget, `${image.name}: retains a small artwork payload`);
  }
});
console.log(
  "Asset browser checks passed: deferred imports, decoded media, retry/fallback, cancellation, question-only lesson loading, and optimized artwork payloads.",
);
