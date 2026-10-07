import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";
import { delay } from "./browser-session.mjs";

const evidence = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/learn-ui-fixes";
await mkdir(evidence, { recursive:true });
const dialogueSource = `<!-- step-id: dialogue-fixture -->
<!-- presentation: rocky-dialogue -->
# تعرّف إلى روكي

![روكي يلوّح مرحبًا بالطالب](assets/mascot/rocky-wave.svg)

:::note مرحبًا، أنا روكي!
مرحبًا، أنا روكي! سأساعدك ونتعلّم معًا خطوة بخطوة.
:::

<!-- lesson-step -->
<!-- step-id: callout-fixture -->
# تعلّم على راحتك

:::note خطوة واحدة في كل مرة
خطوة واحدة في كل مرة.
:::
`;
await withBrowserPage(async ({ base, send, evaluate, waitFor }) => {
  // Keep the fixture independent of the app startup gate.
  await send("Network.setBlockedURLs", {urls:["*fonts.googleapis.com*","*fonts.gstatic.com*","*/src/bootstrap.js","*/src/main.js"]});
  await send("Page.navigate", { url:base + "?page=learn" });
  await waitFor("document.readyState==='complete'");
  await evaluate(`(async () => {
    document.querySelectorAll('[data-app-style]').forEach(link=>link.media='all');
    const [{ renderAuthoredInteractiveLesson }, { parseLessonMarkdown }, { loadSubjectLesson }] = await Promise.all([
      import('./src/ui/lesson/authored.js'), import('./src/markdown/lesson-authoring.js'), import('./src/data/lessons/subject-lesson-registry.js')]);
    const lesson=await loadSubjectLesson('ict','database-management');
    document.body.innerHTML='<main class="page"><section class="lesson-view is-visible"><div class="lesson-shell"><div class="lesson-top"><button class="lesson-back">×</button><div class="lesson-top-title"></div><div class="lesson-status"></div></div><article class="lesson-card" id="fixture-lesson"></article></div></section></main>';
    document.body.removeAttribute('data-startup');
    document.body.removeAttribute('data-account-type');
    window.lessonFixture={ destroy:()=>{}, progress:0, answers:0, lesson, dialogueSource:${JSON.stringify(dialogueSource)}, steps:parseLessonMarkdown(lesson.authoringSource).steps };
    lessonFixture.mount=(type, { steps }={}) => {
      lessonFixture.destroy();
      const selected=steps || lessonFixture.steps.filter(step => step.type===type).slice(0,1);
      lessonFixture.destroy=renderAuthoredInteractiveLesson(document.querySelector('#fixture-lesson'),'الدرس',lesson,selected,{
        isLessonPart:true,
        onProgress:()=>lessonFixture.progress++, onAnswer:()=>lessonFixture.answers++,
        getCompletionOutcome:()=>({ xpGain:10, totalXp:10, progress:3, completed:1, totalParts:29, streak:1 }),
      });
    };
    await document.fonts.ready;
  })()`);
  for (const width of [390, 761]) {
    await send("Emulation.setDeviceMetricsOverride", { width,height:844,deviceScaleFactor:1,mobile:false });
    for (const count of [2, 3, 4]) {
      await evaluate(`(() => {
        const base=lessonFixture.steps.find(step=>step.type==='mcq' && step.content.answers.length>=${count} && step.content.prompt.length<=105 && step.content.answers.every(answer=>answer.text.length<=48));
        const answers=base.content.answers.slice(0,${count});
        lessonFixture.mount('mcq',{steps:[{...base,id:'mcq-${count}',content:{...base.content,answers}}]});
      })()`);
      await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
      const layout=await evaluate(`(() => {
        const list=document.querySelector('.lesson-answer-list');
        const buttons=[...list.children];
        return {
          count:list.dataset.answerCount,
          columns:getComputedStyle(list).gridTemplateColumns.split(' ').length,
          distinctRows:new Set(buttons.map(button=>Math.round(button.getBoundingClientRect().top))).size,
          kicker:Boolean(document.querySelector('.ui-lab-mcq .level-layout-kicker')),
          textAlign:getComputedStyle(buttons[0]).textAlign,
        };
      })()`);
      assert.equal(layout.count,String(count));
      assert.equal(layout.kicker,false,"lesson question category title is removed");
      assert.equal(layout.textAlign,"right","Arabic MCQ option text aligns to the right");
      const expectedColumns=width<=760 ? 1 : count===3 ? 1 : 2;
      assert.equal(layout.columns,expectedColumns,`${count} answers use ${expectedColumns} columns at ${width}px`);
      assert.equal(layout.distinctRows,width<=760 ? count : count===4 ? 2 : count===3 ? 3 : 1);
    }
  }
  await send("Emulation.setDeviceMetricsOverride", { width:390,height:480,deviceScaleFactor:1,mobile:false });
  await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] });
  await evaluate("lessonFixture.mount('mcq')");
  await waitFor("document.querySelector('[data-content-scroll]')?.hidden===false && !document.querySelector('[data-content-scroll]').closest('[inert]') && !document.querySelector('.media-pending')");
  const cue=await evaluate(`(() => {
    const button=document.querySelector('[data-content-scroll]');
    const rect=button.getBoundingClientRect();
    const surface=document.querySelector('.level-layout-task');
    return {text:button.textContent.trim(),height:rect.height,animation:getComputedStyle(button).animationName,scrollBehavior:getComputedStyle(surface).scrollBehavior,controls:button.getAttribute('aria-controls')===surface.id,outsideContent:rect.top>=surface.getBoundingClientRect().bottom};
  })()`);
  assert.equal(cue.text,"المزيد بالأسفل");
  assert.ok(cue.height>=44,"the scroll cue has a clear touch target");
  assert.equal(cue.animation,"none","the cue does not continuously move");
  assert.equal(cue.scrollBehavior,"auto","reduced motion disables smooth scrolling");
  assert.equal(cue.controls,true);
  assert.equal(cue.outsideContent,true,"the cue never covers reading content or answer options");
  await evaluate("document.querySelector('[data-content-scroll]').focus()");
  assert.equal(await evaluate("document.activeElement===document.querySelector('[data-content-scroll]')"),true,"the scroll cue is keyboard reachable");
  await send("Input.dispatchKeyEvent", { type:"keyDown",key:"Enter",code:"Enter",windowsVirtualKeyCode:13,text:"\r" });
  await send("Input.dispatchKeyEvent", { type:"keyUp",key:"Enter",code:"Enter",windowsVirtualKeyCode:13 });
  await waitFor("document.querySelector('.level-layout-task').scrollTop>0");
  await evaluate("document.querySelector('.level-layout-task').scrollTo({top:100000,behavior:'instant'})");
  await waitFor("document.querySelector('[data-content-scroll]').hidden");
  assert.equal(await evaluate("document.activeElement===document.querySelector('.level-layout-task')"),true,"focus stays in the reading area when the cue disappears");
  await evaluate("document.querySelector('.level-layout-task').scrollTo({top:0,behavior:'instant'})");
  await waitFor("document.querySelector('[data-content-scroll]').hidden===false");
  await send("Emulation.setDeviceMetricsOverride", { width:1440,height:1000,deviceScaleFactor:1,mobile:false });
  await waitFor("document.querySelector('[data-content-scroll]').hidden");
  assert.equal(await evaluate("document.querySelector('.level-layout-task').tabIndex"),-1,"fitting content does not add an unnecessary tab stop");
  await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"no-preference" }] });
  await send("Emulation.setDeviceMetricsOverride", { width:390,height:844,deviceScaleFactor:1,mobile:false });
  await evaluate(`lessonFixture.mount('markdown',{steps:[{id:'localized-reference',type:'markdown',title:'مصطلحات',source:${JSON.stringify('# مصطلحات\n\n[[term: قاعدة البيانات | مجموعة من البيانات المرتبطة ببعضها.]]\n\n| الحقل | النوع |\n| --- | --- |\n| رمز | نص |')}}]})`);
  assert.equal(await evaluate("document.querySelector('.markdown-tech-card small').textContent"),"مصطلح تقني");
  assert.equal(await evaluate("document.querySelector('.markdown-table-scroll').getAttribute('aria-label')"),"جدول قابل للتمرير");
  await evaluate(`(async()=>{
    const {parseLessonMarkdown}=await import('./src/markdown/lesson-authoring.js');
    const calloutStep=parseLessonMarkdown(lessonFixture.dialogueSource).steps.find(step=>step.source?.includes('خطوة واحدة في كل مرة'));
    lessonFixture.mount('markdown',{steps:[calloutStep]});
  })()`);
  assert.deepEqual(await evaluate("(() => {const style=getComputedStyle(document.querySelector('.markdown-callout'));return {right:style.borderRightWidth,left:style.borderLeftWidth};})()"),{right:"5px",left:"0px"},"Arabic lesson callout accent appears on the right");
  await evaluate(`(async()=>{
    const {parseLessonMarkdown}=await import('./src/markdown/lesson-authoring.js');
    const first=parseLessonMarkdown(lessonFixture.dialogueSource).steps[0];
    lessonFixture.mount('markdown',{steps:[{...first,id:'different-persisted-id',dialogue:{...first.dialogue,source:'مرحبًا بك في هذا الدرس. '.repeat(16)}}]});
  })()`);
  await waitFor("document.querySelector('[data-rocky-dialogue] .rocky-dialogue-word')");
  const before=await evaluate("document.querySelector('.rocky-dialogue').getBoundingClientRect().height");
  await send("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
  await waitFor("document.querySelectorAll('.rocky-dialogue-word').length===0");
  assert.equal(await evaluate("document.querySelectorAll('.rocky-dialogue-word').length"),0,"changing reduced motion finishes dialogue immediately");
  assert.ok(Math.abs(await evaluate("document.querySelector('.rocky-dialogue').getBoundingClientRect().height")-before)<1,"dialogue height is reserved");
  const screenshot=await send("Page.captureScreenshot",{format:"png"});
  await writeFile(`${evidence}/dialogue-long-390.png`,Buffer.from(screenshot.data,"base64"));
  await evaluate("lessonFixture.destroy();document.querySelector('#fixture-lesson').textContent='Navigation completed'");
  await delay(250);
  assert.equal(await evaluate("document.querySelector('#fixture-lesson').textContent"),"Navigation completed","disposed lesson cannot repaint after navigation");
});
console.log(`MCQ layouts, locale and dialogue motion passed. Evidence: ${evidence}`);
