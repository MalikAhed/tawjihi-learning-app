export async function verifyDeveloperWorkspace({ appUrl, navigate, evaluate, waitFor, assert, cdp, sessionId, captureScreenshot }) {
  await navigate(`${appUrl}?page=more`);
  await waitFor("document.querySelector('[data-open-lab]') && !document.querySelector('.more-tabs').hidden", "developer workspace");
  assert(await evaluate("getComputedStyle(document.querySelector('[data-more-tab=ui-lab]')).backgroundColor === 'rgb(232, 247, 255)'"), "More uses the blue selected surface");
  for (const width of [320, 390, 1440]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
    assert(await evaluate("document.documentElement.scrollWidth <= innerWidth"), `More fits ${width}px`);
    await captureScreenshot(`developer-area-${width}.png`);
  }
  await evaluate("document.querySelector('[data-more-tab=ui-lab]').click()");
  await waitFor("location.search === '?view=ui-lab' && document.querySelector('.playground-board')", "full-screen UI Lab");
  assert(await evaluate(`(() => { const board=document.querySelector('.playground-board'); const rect=board.getBoundingClientRect(); return rect.width === innerWidth && rect.height === innerHeight && board.getAttribute('sandbox') === 'allow-scripts' && !document.querySelector('[data-language=html]').value && document.querySelector('#lab-editor').hidden && getComputedStyle(document.querySelector('.topbar-wrap')).display === 'none'; })()`), "UI Lab is a blank viewport with an isolated preview and hidden editor");
  await captureScreenshot("ui-lab-blank.png");
  await evaluate(`document.querySelector('[data-lab-edit]').click(); document.querySelector('[data-language=html]').value='<button id="demo">Try it</button>'; document.querySelector('[data-language=css]').value='button { background: rgb(232, 247, 255); padding: 24px; }'; document.querySelector('[data-language=js]').value='document.querySelector("#demo").textContent = "JavaScript runs"; window.parent.postMessage({type:"lab-test",text:document.querySelector("#demo").textContent,color:getComputedStyle(document.querySelector("#demo")).backgroundColor,isolated:window.origin === "null"}, "*");'; window.addEventListener('message', event => { if(event.data?.type === 'lab-test') window.labTest = event.data; }); document.querySelector('[data-lab-run]').click()`);
  await waitFor("window.labTest?.text === 'JavaScript runs'", "HTML, CSS, and JavaScript rendering");
  assert(await evaluate("window.labTest.color === 'rgb(232, 247, 255)' && window.labTest.isolated"), "preview runs CSS and JS in an opaque origin");
  await evaluate("document.querySelector('[data-lab-close]').click()");
  await waitFor("location.search === '?page=more' && !document.body.classList.contains('playground-open')", "return from UI Lab");
  await waitFor("document.activeElement.dataset.moreTab === 'ui-lab'", "UI Lab focus restoration");
  await evaluate("document.querySelector('[data-more-tab=ui-lab]').click(); document.querySelector('[data-lab-edit]').click()");
  assert(await evaluate("document.querySelector('[data-language=html]').value.includes('demo')"), "current experiment survives reopening");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
  assert(await evaluate("document.querySelector('.playground-editor').getBoundingClientRect().right <= innerWidth && document.querySelector('.playground-editor').scrollWidth <= document.querySelector('.playground-editor').clientWidth"), "mobile editor fits its panel");
  await captureScreenshot("ui-lab-editor-mobile.png");
  await evaluate("document.querySelector('[data-lab-clear]').click(); document.querySelector('[data-lab-close]').click()");
  await evaluate("document.querySelector('[data-more-tab=design-system]').click()");
  await waitFor("document.querySelector('.current-system .system-section')", "current design system");
  assert(await evaluate("document.querySelectorAll('.system-section').length === 6 && !document.querySelector('.ds-hero') && document.querySelector('.system-nav-demo .nav-item')"), "current reference groups six sections and includes navigation controls");
  for (const width of [320, 390, 1440]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
    assert(await evaluate("document.documentElement.scrollWidth <= innerWidth"), `design system fits ${width}px`);
    await captureScreenshot(`design-system-${width}.png`);
  }
  await evaluate("document.querySelector('#system-assets').scrollIntoView()");
  await waitFor("[...document.querySelectorAll('.current-system img')].every(img => img.complete && img.naturalWidth > 0)", "all current SVG and mascot assets");
  await captureScreenshot("design-system-assets.png");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("location.search === '?page=more' && document.activeElement.dataset.moreTab === 'design-system'", "reference return and focus");
  await evaluate("document.querySelector('[data-more-tab=ship-ready]').click()");
  await waitFor("document.querySelectorAll('.ship-ready-card').length === 8", "Ship Ready library");
  for (const width of [320, 390, 1440]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
    assert(await evaluate("document.documentElement.scrollWidth <= innerWidth"), `Ship Ready fits ${width}px`);
    await captureScreenshot(`ship-ready-library-${width}.png`);
  }
  for (const route of ['ship-ready-sequence', 'ship-ready-fill-blanks', 'ship-ready-spot-bug']) {
    await evaluate(`document.querySelector('[data-open-template="${route}"]').click()`);
    await waitFor("document.querySelector('img[src*=rocky]')?.naturalWidth > 0", "Rocky in lesson template");
    assert(await evaluate("!document.querySelector('img[src*=placeholder]')"), `${route} uses Rocky`);
    assert(await evaluate(`(() => { const back=document.querySelector('[data-template-back]').getBoundingClientRect(); const next=document.querySelector('[data-template-primary]').getBoundingClientRect(); return back.left > innerWidth/2 && next.right < innerWidth/2 && document.querySelector('[data-template-back]').textContent === 'السابق' && getComputedStyle(document.body).direction === 'rtl' && getComputedStyle(document.querySelector('.lesson-top-title'), '::after').backgroundImage.includes('linear-gradient'); })()`), `${route} uses Arabic, opposite-side actions, and glossy progress`);
    await captureScreenshot(`${route}-system.png`);
    if (route === 'ship-ready-sequence') {
      for (const width of [320, 390]) {
        await cdp.send("Emulation.setDeviceMetricsOverride", { width, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
        assert(await evaluate(`(() => { const back=document.querySelector('[data-template-back]').getBoundingClientRect(); const next=document.querySelector('[data-template-primary]').getBoundingClientRect(); const label=document.querySelector('[data-template-action-label]'); return back.left > next.right && next.left >= 0 && back.right <= innerWidth && label.scrollWidth <= label.clientWidth + 1 && document.documentElement.scrollWidth <= innerWidth; })()`), `Arabic footer fits ${width}px with actions at opposite edges`);
        await captureScreenshot(`arabic-template-${width}.png`);
      }
      await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
    }
    await evaluate("document.querySelector('.lesson-back').click()");
    await waitFor("location.search === '?page=more'", "return from template");
  }
  await evaluate("document.querySelector('[data-more-tab=studio]').click()");
  await waitFor("document.querySelector('.developer-studio img')?.naturalWidth > 0", "studio illustration");
  await evaluate("document.querySelector('[data-more-tab=design-system]').click(); document.querySelector('[data-page=more]').click()");
  await waitFor("location.search === '?page=more' && !document.querySelector('.lesson-view.is-visible')", "rapid navigation cancels reference opening");
  await cdp.send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] }, sessionId);
  await evaluate("document.querySelector('[data-more-tab=ui-lab]').click()");
  assert(await evaluate("document.getAnimations().every(animation => animation.playState !== 'running')"), "UI Lab respects reduced motion");
  await evaluate("document.querySelector('[data-lab-close]').click()");
  await cdp.send("Emulation.setEmulatedMedia", { features:[] }, sessionId);
}
