import assert from "node:assert/strict";
import { withBrowserPage } from "./browser-page.mjs";

for (const width of [1440, 390]) {
  await withBrowserPage(async ({ base, send, evaluate, waitFor, onEvent }) => {
    const navigateDocument = async (method, params) => {
      let timer;
      let stop;
      const loaded = new Promise((resolve, reject) => {
        stop = onEvent(({ method: event }) => {
          if (event === "Page.loadEventFired") resolve();
        });
        timer = setTimeout(() => reject(new Error("Document navigation timed out")), 15000);
      });
      try {
        await send(method, params);
        await loaded;
      } finally { clearTimeout(timer); stop?.(); }
    };
    const navigate = async query => {
      await navigateDocument("Page.navigate", { url:base + query });
      await waitFor("!document.querySelector('#app-splash') && document.body?.dataset.accountType");
    };
    await send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:width < 600 });
    await navigate("");
    await waitFor("document.querySelector('.visitor-landing')");
    assert.equal(await evaluate("document.body.dataset.accountType"), "guest", "startup does not sign into an experimental account");
    await navigate("?flow=sign-in");
    await waitFor("document.querySelector('[data-sign-in-form]')");
    await navigate("?page=learn");
    await waitFor("document.querySelector('[data-subject=ict]')");
    assert.equal(await evaluate("Boolean(document.querySelector('[data-more-tab], .question-review-opener, [data-prototype-scenario]'))"), false);
    const pages = await evaluate("[...document.querySelectorAll('.nav-item')].filter(item=>item.getClientRects().length).map(item=>item.dataset.page)");
    assert.deepEqual(pages, ["learn", "quests", "shop", "league", "friends", "super", "more"]);
    for (const page of pages.filter(page=>!["learn", "more"].includes(page))) {
      const before = await evaluate("({url:location.href,history:history.length,active:document.querySelector('.nav-item.active').dataset.page,content:document.querySelector('.course-units').innerHTML})");
      await evaluate(`document.querySelector('[data-page=${page}]').click()`);
      await waitFor("!document.querySelector('#coming-soon-toast').hidden");
      const after = await evaluate("({url:location.href,history:history.length,active:document.querySelector('.nav-item.active').dataset.page,content:document.querySelector('.course-units').innerHTML})");
      assert.deepEqual(after, before, `${page} leaves the active route and content intact`);
      assert.equal(await evaluate("document.querySelector('#coming-soon-toast').textContent"), "قريبًا");
      assert.ok(await evaluate(`document.querySelector('[data-page=${page}]').getAttribute('aria-disabled') === 'true'`));
    }
    await waitFor("document.querySelector('#coming-soon-toast').hidden", { timeoutMs:5000 });
    await evaluate("document.querySelector('[data-page=quests]').focus()");
    await send("Input.dispatchKeyEvent", { type:"keyDown", key:"Enter", code:"Enter", windowsVirtualKeyCode:13, text:"\r", unmodifiedText:"\r" });
    await send("Input.dispatchKeyEvent", { type:"keyUp", key:"Enter", code:"Enter", windowsVirtualKeyCode:13 });
    await waitFor("!document.querySelector('#coming-soon-toast').hidden");
    assert.equal(await evaluate("location.search"), "?page=learn");
    await evaluate("document.querySelector('[data-page=more]').click()");
    await waitFor("location.search === '?page=more' && document.querySelector('.coming-soon.is-visible')");
    assert.equal(await evaluate("document.querySelector('.coming-soon').children.length"), 0, "More is a blank page");
    await evaluate("document.querySelector('[data-page=shop]').click()");
    assert.equal(await evaluate("location.search"), "?page=more");
    assert.equal(await evaluate("document.querySelector('.nav-item.active').dataset.page"), "more");
    await evaluate("document.querySelector('[data-page=learn]').click(); document.querySelector('[data-subject=ict]').click()");
    await waitFor("document.querySelector('.subject-roadmap')");
    const subjectUrl = await evaluate("location.href");
    await evaluate("document.querySelector('[data-page=quests]').click()");
    assert.equal(await evaluate("location.href"), subjectUrl);
    assert.ok(await evaluate("Boolean(document.querySelector('.subject-roadmap'))"));
    for (const route of ["?page=quests", "?page=shop", "?view=ui-lab", "?view=design-system", "?view=ship-ready-mcq", "?subject=physics", "?subject=mathematics-2"]) {
      await navigate(route);
      await waitFor("document.querySelector('[data-subject=ict]') && !document.querySelector('main').classList.contains('lesson-mode')");
      assert.equal(await evaluate("location.search"), "?page=learn");
    }
  });
}
console.log("Navigation browser checks passed at desktop/mobile widths: real entry, blank More, locked tabs, keyboard toast, stable URLs and history.");
