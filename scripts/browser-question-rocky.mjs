import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";

await withBrowserPage(async ({ base, send, evaluate, waitFor }) => {
  await send("Network.setBlockedURLs", { urls:["*/src/main.js"] });
  await send("Page.navigate", { url:base });
  await waitFor("document.readyState === 'complete'");
  await evaluate(`(async () => {
    const [{renderAuthoredInteractiveLesson}, {parseLessonMarkdown}, {default:lesson}] = await Promise.all([
      import('./src/ui/lesson/authored.js'), import('./src/markdown/lesson-authoring.js'), import('./src/data/lessons/ict/database-management.js')]);
    document.body.innerHTML='<main class="page"><section class="lesson-view is-visible"><div class="lesson-shell"><div class="lesson-top"><button class="lesson-back">×</button><div class="lesson-top-title"></div><div class="lesson-status"></div></div><article class="lesson-card" id="fixture-lesson"></article></div></section></main>';
    document.body.removeAttribute('data-startup');
    const steps=parseLessonMarkdown(lesson.authoringSource).steps.filter(step=>step.type==='mcq').slice(0,3);
    window.fixture={destroy:()=>{}, answers:0, saves:0, results:[], completions:0};
    fixture.mount=()=>{
      fixture.destroy(); fixture.answers=0; fixture.saves=0; fixture.results=[]; fixture.completions=0;
      fixture.destroy=renderAuthoredInteractiveLesson(document.querySelector('#fixture-lesson'),'الدرس',lesson,steps,{
        mode:'learner',isLessonPart:true,onAnswer:(result)=>{fixture.answers++;fixture.results.push(result)},onProgress:({isComplete})=>{fixture.saves++;if(isComplete)fixture.completions++},
      });
    };
    await document.fonts.ready;
  })()`);
  for (const width of [1024,390]) {
    await send("Emulation.setDeviceMetricsOverride", { width,height:844,deviceScaleFactor:1,mobile:false });
    await evaluate("fixture.mount()");
    await waitFor("document.querySelector('.level-layout-task').getAttribute('aria-busy') !== 'true'");
    assert.equal(await evaluate("document.querySelector('.lesson-question-rocky img').getAttribute('src')"),'assets/mascot/rocky-thinking.svg');
    const state = await evaluate(`(()=>{
      const rocky=document.querySelector('.lesson-question-rocky').getBoundingClientRect();
      const options=document.querySelector('.lesson-answer-list').getBoundingClientRect();
      const task=document.querySelector('.level-layout-task');
      const skip=document.querySelector('[data-developer-question-skip]').getBoundingClientRect();
      return {left:rocky.right<=options.left+1,centered:Math.abs((rocky.top+rocky.bottom-options.top-options.bottom)/2)<2,scrolls:task.scrollHeight>task.clientHeight+1,skipVisible:skip.bottom<=innerHeight,overflow:document.documentElement.scrollWidth>innerWidth};
    })()`);
    assert.deepEqual(state,{left:true,centered:true,scrolls:false,skipVisible:true,overflow:false});
    await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=false]').click(); document.querySelector('[data-template-primary]').click()");
    assert.equal(await evaluate("Boolean(document.querySelector('[data-rocky-state=happy]'))"), false);
    await waitFor("document.querySelector('[data-rocky-state=sad]') && document.querySelector('.lesson-question-rocky img').complete");
    await send("Emulation.setEmulatedMedia", { features:[{name:"prefers-reduced-motion",value:"reduce"}] });
    await waitFor("document.querySelector('.lesson-question-rocky img').currentSrc.includes('rocky-sad-reduced')");
    await send("Emulation.setEmulatedMedia", { features:[{name:"prefers-reduced-motion",value:"no-preference"}] });
    assert.deepEqual(await evaluate(`(()=>({
      green:document.querySelectorAll('[data-correct=true].is-correct').length,
      red:document.querySelectorAll('[data-correct=false].is-wrong').length,
      action:document.querySelector('[data-template-primary]').dataset.actionState,
    }))()`),{green:1,red:1,action:'continue'});
    await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').click()");
    assert.equal(await evaluate("document.querySelectorAll('.is-selected.is-wrong').length"),1,'checked answers cannot be changed');
    await evaluate("document.querySelector('[data-template-primary]').click()");
    assert.equal(await evaluate("document.querySelector('.lesson-question-rocky img').getAttribute('src')"),'assets/mascot/rocky-thoughtful-discovery.svg');
    await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').click(); document.querySelector('[data-template-primary]').click()");
    await waitFor("document.querySelector('.lesson-question-rocky img').complete && document.querySelector('.lesson-question-rocky img').currentSrc.includes('happy-jump')");
    const screenshot=await send("Page.captureScreenshot",{format:"png"});
    await writeFile(`/tmp/question-rocky-${width}.png`,Buffer.from(screenshot.data,"base64"));
    await send("Emulation.setEmulatedMedia", { features:[{name:"prefers-reduced-motion",value:"reduce"}] });
    await waitFor("document.querySelector('.lesson-question-rocky img').currentSrc.includes('standing-still-reduced')");
    await send("Emulation.setEmulatedMedia", { features:[{name:"prefers-reduced-motion",value:"no-preference"}] });
    // Finish the original three questions: only the first mistake is reviewed.
    await evaluate("document.querySelector('[data-template-primary]').click(); document.querySelector('[data-ui-lab-answer][data-correct=true]').click(); document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click()");
    await waitFor("document.querySelector('[data-mistake-review-intro]') && document.querySelector('#fixture-lesson').getAttribute('aria-busy') !== 'true'");
    assert.equal(await evaluate("fixture.completions"),0,'completion waits for review');
    assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"),false);
    await evaluate("Promise.all(document.querySelector('.lesson-review-whoosh').getAnimations().map(animation=>animation.finished.catch(()=>{})))");
    const reviewScreenshot=await send("Page.captureScreenshot",{format:"png"});
    await writeFile(`/tmp/question-review-${width}.png`,Buffer.from(reviewScreenshot.data,"base64"));
    await send("Emulation.setEmulatedMedia", { features:[{name:"prefers-reduced-motion",value:"reduce"}] });
    await waitFor("document.querySelector('.lesson-review-whoosh').getAnimations().length === 0");
    assert.equal(await evaluate("document.querySelector('.lesson-review-whoosh').getAnimations().length"),0,'live reduced motion stops swoosh');
    await evaluate("document.querySelector('main').inert=false; document.querySelector('[data-template-primary]').focus()");
    await send("Input.dispatchKeyEvent", { type:"keyDown",key:"Enter",code:"Enter",windowsVirtualKeyCode:13,text:"\r" });
    await send("Input.dispatchKeyEvent", { type:"keyUp",key:"Enter",code:"Enter",windowsVirtualKeyCode:13 });
    await waitFor("document.querySelector('[data-mistake-review]')");
    assert.equal(await evaluate("document.querySelector('[data-mistake-review]').dataset.lessonStep"),'dbms-task-check');
    await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').click(); document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click()");
    await waitFor("document.querySelector('[data-completion-step]')");
    assert.deepEqual(await evaluate("({count:fixture.results.length,reviewing:fixture.results[3].reviewing,completions:fixture.completions})"),{count:4,reviewing:true,completions:1});
    assert.equal(await evaluate("document.querySelector('.subject-gain--accuracy [data-gain-count]').dataset.gainCount"),'67','review does not inflate the original 2/3 accuracy');
    await send("Emulation.setEmulatedMedia", { features:[{name:"prefers-reduced-motion",value:"no-preference"}] });
    await evaluate("fixture.mount()");
    await waitFor("document.querySelector('.level-layout-task').getAttribute('aria-busy') !== 'true'");
    await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
    // This isolated fixture blocks main.js; release the startup shell's inert state.
    await evaluate("document.querySelector('main').inert=false; document.querySelector('[data-developer-question-skip]').focus()");
    assert.equal(await evaluate("document.activeElement.hasAttribute('data-developer-question-skip')"),true);
    await send("Input.dispatchKeyEvent", { type:"keyDown",key:"Enter",code:"Enter",windowsVirtualKeyCode:13,text:"\r" });
    await send("Input.dispatchKeyEvent", { type:"keyUp",key:"Enter",code:"Enter",windowsVirtualKeyCode:13 });
    await waitFor("document.querySelector('[data-live-authored-step]').dataset.lessonStep==='access-characteristics'");
    await waitFor("document.querySelector('.level-layout-task').getAttribute('aria-busy') !== 'true'");
    await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').click(); document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click()");
    await waitFor("document.querySelector('[data-live-authored-step]').dataset.lessonStep==='access-tradeoff-check'");
    await evaluate("document.querySelector('[data-developer-question-skip]').click()");
    assert.deepEqual(await evaluate("({answers:fixture.answers,saves:fixture.saves})"),{answers:0,saves:0});
    await evaluate(`fixture.mount(); for(let index=0;index<3;index++) {
      document.querySelector('[data-ui-lab-answer][data-correct=true]').click();
      document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click();
    }`);
    assert.equal(await evaluate("Boolean(document.querySelector('[data-completion-step]')) && !document.querySelector('[data-mistake-review-intro]')"),true,'perfect runs skip mistake review');
    await evaluate(`fixture.mount(); for(let index=0;index<3;index++) {
      document.querySelector('[data-ui-lab-answer][data-correct=false]').click();
      document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click();
    }
    document.querySelector('[data-template-primary]').click();
    for(let index=0;index<3;index++) {
      document.querySelector('[data-ui-lab-answer][data-correct=false]').click();
      document.querySelector('[data-template-primary]').click(); document.querySelector('[data-template-primary]').click();
    }`);
    assert.deepEqual(await evaluate("({completed:fixture.completions,reviews:fixture.results.filter(result=>result.reviewing).length})"),{completed:1,reviews:3},'review wrong answers reveal the correction without another retry loop');
    await evaluate("fixture.mount()");
    await waitFor("document.querySelector('.level-layout-task').getAttribute('aria-busy') !== 'true'");
    assert.equal(await evaluate(`(()=>{
      document.querySelector('.ui-lab-mcq > p').textContent='سؤال طويل يحتاج مساحة إضافية للقراءة. '.repeat(100);
      const task=document.querySelector('.level-layout-task');
      task.scrollTo({top:300,behavior:'instant'});
      return task.scrollHeight>task.clientHeight && task.scrollTop>0;
    })()`),true,"long questions remain scrollable");
    await evaluate("fixture.destroy()");
    console.log(`Rocky/Skip passed at ${width}px: feedback, reduced motion, keyboard, and no test-run saves.`);
  }
});
