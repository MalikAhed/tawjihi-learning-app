import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";

await withBrowserPage(async ({ base, send, evaluate, waitFor }) => {
  await send("Network.setBlockedURLs", { urls:["*/src/main.js"] });
  await send("Page.navigate", { url:base });
  await waitFor("document.readyState==='complete'");
  await evaluate(`(async()=>{
    const [{renderAuthoredInteractiveLesson},{renderSubjectCompletion,animateSubjectCompletion}] = await Promise.all([import('./src/ui/lesson/authored.js'),import('./src/ui/subject-completion.js')]);
    document.body.innerHTML='<main class="page"><section class="lesson-view is-visible"><div class="lesson-shell"><div class="lesson-top"><button class="lesson-back">×</button><div class="lesson-top-title"></div><div class="lesson-status"></div></div><article class="lesson-card"></article></div></section></main>';
    window.stopLesson=renderAuthoredInteractiveLesson(document.querySelector('.lesson-card'),'الدرس',{title:'الدرس',locale:'ar'},[{id:'done',type:'markdown',content:{}}],{isLessonPart:true,progress:{completedStepIds:['done'],completedAt:'2026-09-06'},getCompletionOutcome:()=>({xpGain:39,streak:2,activeToday:true,completed:1,totalParts:29,progress:3}),onExitLesson:()=>{stopLesson();document.querySelector('.lesson-card').innerHTML='<button id="destination">تم</button>';}});
    window.mountMetrics=()=>{
      window.stopMetrics?.();
      document.querySelector('.level-layout-task').innerHTML=renderSubjectCompletion('الدرس',{xpGain:39,accuracy:92,elapsedSeconds:201});
      window.stopMetrics=animateSubjectCompletion(document.querySelector('.lesson-card'));
    };
    await document.fonts.ready;
  })()`);
  await waitFor("document.querySelector('.subject-completion')?.dataset.animationState==='running' || document.querySelector('.subject-completion')?.dataset.animationState==='complete'");
  await evaluate("mountMetrics()");
  await waitFor("document.querySelector('.subject-completion-rocky')?.naturalWidth>0");
  for (const [width,height] of [[320,568],[390,844],[680,844],[844,390],[1366,768]]) {
    await send("Emulation.setDeviceMetricsOverride", {width,height,deviceScaleFactor:1,mobile:width<600});
    const layout=await evaluate(`(()=>{
      const cards=[...document.querySelectorAll('.subject-gain')].map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,color:getComputedStyle(el).borderTopColor};});
      const button=document.querySelector('[data-template-primary]').getBoundingClientRect();
      return {cards,overflow:document.documentElement.scrollWidth>innerWidth,buttonBottom:button.bottom,height:innerHeight};
    })()`);
    assert.equal(layout.overflow,false);
    assert.equal(new Set(layout.cards.map(card=>Math.round(card.top))).size,1);
    assert.deepEqual(layout.cards.map(card=>card.color),['rgb(255, 200, 0)','rgb(88, 204, 2)','rgb(28, 176, 246)']);
    assert.ok(layout.cards.every(card=>card.left>=0&&card.right<=width));
    assert.ok(layout.buttonBottom<=height);
    const shot=await send('Page.captureScreenshot',{format:'png'});
    await writeFile(`/tmp/lesson-completion-${width}.png`,Buffer.from(shot.data,'base64'));
  }
  await send('Page.bringToFront');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await evaluate('mountMetrics()');
  await waitFor("document.querySelector('.subject-completion-rocky').src.includes('standing-still-reduced')");
  await evaluate("document.querySelector('[data-template-primary]').focus()");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await waitFor("document.querySelector('.subject-completion--streak')");
  for (const stage of ['streak','quests']) {
    if (stage === 'quests') await evaluate("document.querySelector('[data-template-primary]').click()");
    await waitFor(`document.querySelector('.subject-completion--${stage}')`);
    assert.equal(await evaluate("Boolean(document.querySelector('.subject-completion-rocky'))"),false);
    assert.equal(await evaluate("document.querySelectorAll('.completion-quest-icon').length"),stage === 'quests' ? 3 : 0);
    for (const [width,height] of [[320,568],[390,844],[844,390],[1366,768]]) {
      await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
      assert.equal(await evaluate("document.documentElement.scrollWidth<=innerWidth && document.querySelector('[data-template-primary]').getBoundingClientRect().bottom<=innerHeight"),true,`${stage} fits ${width}`);
      const shot=await send('Page.captureScreenshot',{format:'png'});
      await writeFile(`/tmp/lesson-${stage}-${width}.png`,Buffer.from(shot.data,'base64'));
    }
    if (stage === 'streak') {
      await waitFor("document.querySelector('.completion-streak-fire').currentSrc.includes('streak-fire-burning-reduced.svg')");
    } else {
      assert.equal(await evaluate("document.querySelectorAll('.completion-quests li').length"),3);
      await evaluate("document.querySelector('[data-template-back]').click()");
      await waitFor("document.querySelector('.subject-completion--streak')");
      await evaluate("document.querySelector('[data-template-primary]').click()");
    }
  }
  await evaluate("stopMetrics();document.querySelector('[data-template-primary]').click()");
  await waitFor("document.querySelector('#destination')");
  assert.equal(await evaluate("document.querySelector('.lesson-shell').classList.contains('lesson-shell--completion')"),false);
});
console.log('Completion layout, colors, keyboard, reduced motion and interrupted navigation passed.');
