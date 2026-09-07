import { verifyReviewedResponse } from "./browser-reviewed-response.mjs";
import { verifyMarkdownLab } from "./browser-markdown-lab.mjs";

export async function verifyShipReadyTemplates({ assert, captureScreenshot, cdp, delay, evaluate, sessionId, waitFor }) {
  const assertSharedActions = async (pattern) => {
    const chrome = await evaluate(`(() => { const primary=document.querySelector('[data-template-primary]'); const back=document.querySelector('[data-template-back]'); const shortcut=primary?.querySelector('kbd'); if (!primary || !back || !shortcut) return null; const primaryRect=primary.getBoundingClientRect(); const backRect=back.getBoundingClientRect(); const shortcutRect=shortcut.getBoundingClientRect(); const shortcutStyle=getComputedStyle(shortcut); return { primaryWidth:primaryRect.width, primaryHeight:primaryRect.height, backWidth:backRect.width, backHeight:backRect.height, shortcutWidth:shortcutRect.width, shortcutHeight:shortcutRect.height, shortcutText:shortcut.textContent.trim(), shortcutBackground:shortcutStyle.backgroundColor, shortcutColor:shortcutStyle.color, shortcutDirection:shortcutStyle.direction }; })()`);
    assert(chrome?.primaryWidth === 240 && chrome?.primaryHeight === 52 && chrome?.backWidth === 128 && chrome?.backHeight === 52 && chrome?.shortcutWidth === 62 && chrome?.shortcutHeight === 34 && chrome?.shortcutText.includes("ENTER") && chrome?.shortcutBackground === "rgb(255, 255, 255)" && chrome?.shortcutColor === "rgb(7, 59, 82)" && chrome?.shortcutDirection === "ltr", `${pattern} must use the shared action sizes and solid-white English ENTER key with dark-grey text (${JSON.stringify(chrome)})`);
  };
  await evaluate("document.querySelector('[data-more-tab=\"ship-ready\"]').click()");
  await waitFor("Boolean(document.querySelector('[data-open-template=\"ship-ready-mcq\"]'))", "the Ship Ready templates");
  assert(await evaluate(`(() => {
    const cards = [...document.querySelectorAll('#ship-ready-panel .ship-ready-card')];
    const routes = cards.map((card) => card.querySelector('[data-preview-route]')?.dataset.previewRoute);
    const buttons = cards.map((card) => card.querySelector('[data-open-template]')?.dataset.openTemplate);
    return cards.length === 8
      && cards[0].querySelector('h3')?.textContent === 'محرّر المحتوى'
      && cards[1].querySelector('h3')?.textContent === 'مساحة المحتوى'
      && cards[2].querySelector('h3')?.textContent === 'اختر الإجابة'
      && cards[3].querySelector('h3')?.textContent === 'اشرح بأسلوبك'
      && cards[4].querySelector('h3')?.textContent === 'رتّب الخطوات'
      && cards[5].querySelector('h3')?.textContent === 'أكمل الفراغات'
      && cards[5].querySelectorAll('.ship-ready-fill-options .lesson-inline-code').length === 3
      && cards[6].querySelector('h3')?.textContent === 'اكتشف الخطأ'
      && cards[7].querySelector('h3')?.textContent === 'محرّر الشيفرة'
      && JSON.stringify(routes) === JSON.stringify(['ship-ready-markdown','ship-ready','ship-ready-mcq','ship-ready-response','ship-ready-sequence','ship-ready-fill-blanks','ship-ready-spot-bug','ship-ready-code-lab'])
      && JSON.stringify(buttons) === JSON.stringify(['ship-ready-markdown','ship-ready','ship-ready-mcq','ship-ready-response','ship-ready-sequence','ship-ready-fill-blanks','ship-ready-spot-bug','ship-ready-code-lab']);
  })()`), "Ship Ready cards must stay in the approved order and use previews of the exact routes they open");
  await captureScreenshot("ship-ready-previews.png");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready-markdown\"]').click()");
  await waitFor("location.search === '?view=ship-ready-markdown' && Boolean(document.querySelector('[data-markdown-input]'))", "the Ship Ready Markdown template");
  await verifyMarkdownLab({ assert, captureScreenshot, cdp, delay, evaluate, sessionId, waitFor });
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("Boolean(document.querySelector('[data-open-template=\"ship-ready-sequence\"]'))", "the Ship Ready templates after closing Markdown");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready-sequence\"]').click()");
  await waitFor("location.search === '?view=ship-ready-sequence' && document.body.classList.contains('ui-lab-sequence-open')", "the Ship Ready Put in Order template");
  await assertSharedActions("Put in Order");
  assert(await evaluate("document.querySelector('#ui-lab-content-title').textContent === 'رتّب رحلة فتح الرابط'"), "the Ship Ready sequence route must render Put in Order");
  await evaluate(`['click','request','response','render'].forEach((id) => document.querySelector('[data-sequence-step="' + id + '"]').click()); document.querySelector('.level-layout-task').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))`);
  assert(await evaluate("document.querySelector('[data-sequence-feedback]').classList.contains('is-correct')"), "the data-driven Put in Order template must accept its configured sequence");
  await evaluate("document.querySelector('[data-sequence-check]').click()");
  await waitFor("Boolean(document.querySelector('[data-open-template=\"ship-ready-fill-blanks\"]'))", "the Ship Ready templates after closing Put in Order");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready-fill-blanks\"]').click()");
  await waitFor("location.search === '?view=ship-ready-fill-blanks' && document.body.classList.contains('ui-lab-fill-open')", "the Ship Ready Fill in the Blanks template");
  await assertSharedActions("Fill in the Blanks");
  assert(await evaluate(`(() => {
    const choice = document.querySelector('.ui-lab-fill-options button');
    const inlineCode = choice.querySelector('.lesson-inline-code');
    const choiceStyle = getComputedStyle(choice);
    const codeStyle = getComputedStyle(inlineCode);
    return document.querySelector('#ui-lab-content-title').textContent === 'أكمل طلب جلب المستخدمين'
      && document.querySelectorAll('.ui-lab-fill-options .lesson-inline-code').length === 4
      && choiceStyle.minHeight === '72px'
      && choiceStyle.borderRadius === '14px'
      && codeStyle.backgroundColor === 'rgba(0, 0, 0, 0)'
      && codeStyle.borderTopWidth === '0px';
  })()`), "the Ship Ready fill route must use MCQ cards without a second inline-code surface");
  await evaluate(`['"/api/users"','"GET"'].forEach((value) => [...document.querySelectorAll('[data-fill-option]')].find((option) => option.dataset.fillOption === value).click()); document.querySelector('.level-layout-task').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))`);
  assert(await evaluate("document.querySelector('[data-fill-feedback]').classList.contains('is-correct')"), "the data-driven Fill in the Blanks template must accept its configured answers");
  assert(await evaluate("document.querySelectorAll('.level-layout-actions').length === 1 && Boolean(document.querySelector('[data-template-back]'))"), "Fill in the Blanks must use the shared approved footer");
  await evaluate("document.querySelector('[data-fill-check]').click()");
  await waitFor("Boolean(document.querySelector('[data-open-template=\"ship-ready\"]'))", "the Ship Ready templates after closing Fill in the Blanks");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready\"]').click()");
  await waitFor("location.search === '?view=ship-ready' && Boolean(document.querySelector('.ui-lab-content-placeholder'))", "the Ship Ready lesson shell");
  await assertSharedActions("Content Area");
  assert(await evaluate("document.querySelectorAll('.level-layout-actions').length === 1 && Boolean(document.querySelector('[data-template-back]'))"), "the Content Area must use the shared approved footer");
  await captureScreenshot("template-lesson-shell.png");
  await evaluate("document.querySelector('.level-layout-task').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))");
  await waitFor("location.search === '?page=more'", "return from the Ship Ready lesson shell");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready-response\"]').click()");
  await waitFor("location.search === '?view=ship-ready-response' && document.body.classList.contains('ui-lab-response-open')", "the Ship Ready response template");
  await assertSharedActions("Explain It");
  assert(await evaluate("document.querySelector('#ui-lab-content-title').textContent === 'الطلب والاستجابة'"), "the Ship Ready response route must render Explain It");
  await captureScreenshot("template-explain-it.png");
  await verifyReviewedResponse({ assert, captureScreenshot, cdp, delay, evaluate, sessionId, waitFor });
  await evaluate("document.querySelector('[data-response-submit]').click()");
  await waitFor("location.search === '?page=more'", "return from the Ship Ready response template");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready-mcq\"]').click()");
  await waitFor("document.body.classList.contains('ui-lab-mcq-open')", "the Ship Ready MCQ template");
  await assertSharedActions("MCQ");
  await captureScreenshot("template-mcq.png");
  const mcqChrome = await evaluate(`(() => {
    const progress = document.querySelector('.lesson-top-title').getBoundingClientRect();
    const close = document.querySelector('.lesson-back').getBoundingClientRect();
    return {
      topControlsAligned:Math.abs((progress.top + progress.bottom) / 2 - (close.top + close.bottom) / 2) <= 1,
      lighterFooterDivider:parseFloat(getComputedStyle(document.querySelector('.level-layout-actions')).borderTopWidth)>0,
    };
  })()`);
  assert(Object.values(mcqChrome).every(Boolean), `MCQ chrome alignment failed: ${JSON.stringify(mcqChrome)}`);
  await evaluate("document.querySelector('[data-ui-lab-answer=\"201\"]').click(); document.querySelector('.level-layout-task').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))");
  assert(await evaluate("Boolean(document.querySelector('.level-feedback.is-correct .level-result-icon--correct') && document.querySelector('.level-feedback.is-correct .level-result-copy'))"), "Ship Ready MCQ feedback must use the compact shared result treatment");
  await evaluate("document.querySelector('.ui-lab-mcq').style.paddingBottom = '900px'");
  await waitFor("document.querySelector('.level-layout-task').classList.contains('has-more-content')", "the MCQ overflow indicator");
  assert(await evaluate("getComputedStyle(document.querySelector('[data-content-scroll]')).display === 'grid'"), "overflowing MCQ content must show its down arrow");
  await evaluate("document.querySelector('[data-content-scroll]').click()");
  await waitFor("document.querySelector('.level-layout-task').scrollTop > 0", "MCQ content scrolling");
  await evaluate("document.querySelector('[data-ui-lab-check]').click()");
  await waitFor("location.search === '?page=more'", "return from the Ship Ready MCQ");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready-spot-bug\"]').click()");
  await waitFor("location.search === '?view=ship-ready-spot-bug' && document.body.classList.contains('ui-lab-bug-open')", "the Ship Ready Spot the Bug template");
  await assertSharedActions("Spot the Bug");
  assert(await evaluate("document.querySelector('#ui-lab-content-title').textContent === 'أي سطر يحتوي على الخطأ؟'"), "the Ship Ready Spot the Bug route must render the approved debugging question");
  await evaluate("document.querySelector('[data-bug-line=\"3\"]').click(); document.querySelector('[data-bug-reason=\"parenthesis\"]').click(); document.querySelector('.level-layout-task').dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}))");
  assert(await evaluate("document.querySelector('[data-bug-feedback]').classList.contains('is-correct')"), "the data-driven Spot the Bug template must accept its configured line and reason");
  await evaluate("document.querySelector('[data-bug-check]').click()");
  await waitFor("location.search === '?page=more'", "return from the Ship Ready Spot the Bug template");

  await evaluate("document.querySelector('[data-open-template=\"ship-ready-code-lab\"]').click()");
  await waitFor("location.search === '?view=ship-ready-code-lab' && Boolean(document.querySelector('.ds-build-guide > .markdown-rendered')) && Boolean(document.querySelector('.cm-editor'))", "the Ship Ready Code Editor template");
  await waitFor("document.querySelector('.ds-live-preview')?.dataset.previewReady === 'true'", "the sandboxed Code Editor runner");
  await waitFor("document.querySelector('[data-console-output]')?.textContent.includes('Explorer card ready: Mira the Explorer')", "JavaScript execution in the Code Editor template");
  const codeLabState = await evaluate(`(() => ({
    markdownChecklist:document.querySelectorAll('.ds-build-guide input[type="checkbox"]').length === 2,
    noLegacyCards:!document.querySelector('.ds-build-brief, .ds-code-requirements, .ds-build-tip, .ds-hero, #foundations, #questions, #explanations'),
    editorTouchesFooter:Math.abs(document.querySelector('.ds-code-lab').getBoundingClientRect().bottom - document.querySelector('.ds-quest-footer').getBoundingClientRect().top) <= 3,
    noBottomBorder:getComputedStyle(document.querySelector('.ds-code-lab')).borderBottomWidth === '0px',
    uiLabRouteRemoved:location.search !== '?view=ui-lab',
    sharedFooter:document.querySelectorAll('.level-layout-actions').length === 1 && Boolean(document.querySelector('[data-template-back]')),
    threeEditors:document.querySelectorAll('[data-editor-tab]').length === 3 && document.querySelectorAll('.cm-editor').length === 3,
    javascriptTab:Boolean(document.querySelector('[data-editor-tab="js"] .ds-language-logo')),
    sandboxedScripts:document.querySelector('.ds-live-preview').getAttribute('sandbox') === 'allow-scripts',
    outputTabs:document.querySelectorAll('[data-output-tab]').length === 2,
    readableRunAction:document.querySelector('[data-run-code]').getBoundingClientRect().width <= 240
      && document.querySelector('[data-run-code] [data-template-action-label]').scrollWidth <= document.querySelector('[data-run-code] [data-template-action-label]').clientWidth + 1,
    unboxedSolidPlayIcon:Boolean(document.querySelector('[data-run-code] .ds-run-play svg path'))
      && getComputedStyle(document.querySelector('.ds-run-play')).backgroundColor === 'rgba(0, 0, 0, 0)'
      && getComputedStyle(document.querySelector('.ds-run-play svg')).fill !== 'none',
  }))()`);
  assert(Object.values(codeLabState).every(Boolean), `Ship Ready Code Editor state failed: ${JSON.stringify(codeLabState)}`);
  await evaluate("document.querySelector('[data-editor-tab=\"js\"]').click(); document.querySelector('[data-editor-host=\"js\"] .cm-content').focus()");
  await cdp.send("Input.dispatchKeyEvent", { type:"keyDown", modifiers:2, key:" ", code:"Space", windowsVirtualKeyCode:32 }, sessionId);
  await cdp.send("Input.dispatchKeyEvent", { type:"keyUp", modifiers:2, key:" ", code:"Space", windowsVirtualKeyCode:32 }, sessionId);
  await waitFor("Boolean(document.querySelector('[data-editor-host=\"js\"] .cm-tooltip-autocomplete'))", "JavaScript autocomplete suggestions");
  const selectedSuggestion=await evaluate("document.querySelector('.cm-tooltip-autocomplete [aria-selected=true]')?.id");
  await cdp.send("Input.dispatchKeyEvent",{type:"keyDown",key:"ArrowDown",code:"ArrowDown",windowsVirtualKeyCode:40},sessionId);
  await cdp.send("Input.dispatchKeyEvent",{type:"keyUp",key:"ArrowDown",code:"ArrowDown",windowsVirtualKeyCode:40},sessionId);
  assert(await evaluate(`document.querySelector('.cm-tooltip-autocomplete [aria-selected=true]')?.id!==${JSON.stringify(selectedSuggestion)}`),"native arrow keys select another code suggestion");
  await evaluate("document.querySelector('.cm-tooltip-autocomplete ul').focus()");
  await cdp.send("Input.dispatchKeyEvent",{type:"keyDown",key:"PageDown",code:"PageDown",windowsVirtualKeyCode:34},sessionId);
  await cdp.send("Input.dispatchKeyEvent",{type:"keyUp",key:"PageDown",code:"PageDown",windowsVirtualKeyCode:34},sessionId);
  await waitFor("document.querySelector('.cm-tooltip-autocomplete ul')?.scrollTop>0","native keyboard scrolling in suggestions");
  await evaluate("document.querySelector('[data-editor-host=js] .cm-content').focus()");
  await evaluate("document.querySelector('[data-output-tab=\"console\"]').click()");
  assert(await evaluate(`(() => document.querySelector('[data-output-tab="console"]').classList.contains('is-active')
    && document.querySelector('[data-output-panel="preview"]').hidden
    && !document.querySelector('[data-output-panel="console"]').hidden
    && document.querySelector('[data-console-output]').textContent.includes('Explorer card ready: Mira the Explorer'))()`), "the Code Editor must switch between Preview and Console without losing JavaScript output");
  await captureScreenshot("code-editor-js-console.png");
  await evaluate("document.querySelector('[data-template-back]').click()");
  await waitFor("location.search === '?page=more'", "return from the Ship Ready Code Editor template");
  await evaluate("document.querySelector('[data-open-template=\"ship-ready-code-lab\"]').click()");
  await waitFor("location.search === '?view=ship-ready-code-lab' && document.querySelectorAll('.cm-editor').length === 3", "reopening the same Ship Ready Code Editor template");
  assert(await evaluate("!document.querySelector('.ds-editor-hint')"), "the Code Editor tab bar must not show the Ctrl + Space shortcut hint");
  await evaluate("document.querySelector('[data-template-back]').click()");
  await waitFor("location.search === '?page=more'", "return after reopening the Ship Ready Code Editor template");
}
