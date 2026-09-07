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
      { urlPattern: "*assets/subjects/ict.svg", requestStage: "Request" },
    ],
  });
  await send("Page.navigate", { url: base + "?page=learn" });
  await waitFor("document.querySelector('.course-units.media-pending')");
  assert.equal(
    await evaluate("document.querySelector('.subject-map').inert"),
    true,
  );
  for (let n = 0; n < 300 && !held.has(base + "assets/subjects/ict.svg"); n++)
    await delay(20);
  const homeImageRequest = held.get(base + "assets/subjects/ict.svg");
  assert.ok(homeImageRequest, "Home waits for its required illustration");
  await send("Fetch.continueRequest", { requestId: homeImageRequest });
  held.delete(base + "assets/subjects/ict.svg");
  await waitFor(
    "document.querySelector('.course-units[data-media-state=ready]')",
  );
  assert.ok(
    !requests.some((url) =>
      /highlight\.min|marked\.esm|lesson\/authored|markdown-lab\.js|ui\/ship-ready\.js/.test(url),
    ),
    "Home must not load lesson/editor runtimes or the developer catalog",
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

  // Real published lesson: decode before dialogue; prefetch the following image.
  await send("Page.navigate", { url: base + "?subject=ict" });
  await waitFor(
    "document.querySelector('[data-roadmap-part=getting-started]')",
  );
  await evaluate(
    "document.querySelector('[data-roadmap-part=getting-started]').click(); document.querySelector('[data-bubble-start]').click()",
  );
  await waitFor(
    "document.querySelector('[data-lesson-step=meet-rocky][data-media-state=ready]')",
  );
  assert.equal(
    await evaluate(
      "document.querySelector('[data-lesson-step=meet-rocky] img').naturalWidth > 0",
    ),
    true,
  );
  await waitFor(
    "document.querySelector('.rocky-dialogue-text').textContent.length > 0",
  );
  for (
    let n = 0;
    n < 150 && !requests.some((url) => url.endsWith("rocky-watching-tv.png"));
    n++
  )
    await delay(20);
  assert.ok(
    requests.some((url) => url.endsWith("rocky-watching-tv.png")),
    "The next lesson image loads in the background",
  );
  await evaluate("document.querySelector('[data-template-primary]').click()");
  await waitFor(
    "document.querySelector('[data-lesson-step=watch-introduction-together][data-media-state=ready]')",
  );
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await evaluate("document.querySelector('[data-template-back]').click()");
  await waitFor(
    "document.querySelector('[data-lesson-step=meet-rocky][data-media-state=ready]')",
  );
  assert.equal(
    await evaluate(
      "document.querySelector('[data-lesson-step=meet-rocky]').getAnimations().length",
    ),
    0,
  );
  // Encoding changes must preserve the approved artwork's decoded RGBA pixels.
  const encodedImages = await evaluate(`(async () => {
    const paths = ['hero-options/rocky-beach-mobile-01', 'hero-options/rocky-beach-desktop-01'];
    const decoded = async (path) => {
      const image = new Image();
      image.src = 'assets/mascot/' + path;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', {willReadFrequently:true});
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const digest = await crypto.subtle.digest('SHA-256', pixels);
      return {width:canvas.width, height:canvas.height, rgbaHash:[...new Uint8Array(digest)].join(',')};
    };
    const results = [];
    for (const path of paths) results.push({path, original:await decoded(path + '.png'), compressed:await decoded(path + '.webp')});
    return results;
  })()`);
  for (const result of encodedImages) {
    assert.deepEqual(result.compressed, result.original, `${result.path}: lossless pixels, including alpha`);
  }
});
console.log(
  "Asset browser checks passed: deferred imports, decoded media, retry/fallback, cancellation, next-step preloading, reduced motion, and lossless artwork pixels.",
);
