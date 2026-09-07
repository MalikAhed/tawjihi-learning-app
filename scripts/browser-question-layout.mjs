import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";
import { delay } from "./browser-session.mjs";

const evidence = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/learn-ui-fixes";
await mkdir(evidence, { recursive:true });
const results = [];
await withBrowserPage(async ({ base, send, evaluate, waitFor }) => {
  await send("Network.setBlockedURLs", {urls:["*fonts.googleapis.com*","*fonts.gstatic.com*","*/src/main.js"]});
  await send("Page.navigate", { url:base + "?page=learn" });
  await waitFor("document.readyState==='complete'");
  await evaluate(`(async () => {
    const [{ renderAuthoredInteractiveLesson }, { renderLesson }, { parseLessonMarkdown }, { default:lesson }] = await Promise.all([
      import('./src/ui/lesson/authored.js'), import('./src/ui/lesson-view.js'), import('./src/markdown/lesson-authoring.js'), import('./src/data/lessons/ict/database-management.js')]);
    document.body.innerHTML='<main class="page"><section class="lesson-view is-visible"><div class="lesson-shell"><div class="lesson-top"><button class="lesson-back">×</button><div class="lesson-top-title"></div><div class="lesson-status"></div></div><article class="lesson-card" id="fixture-lesson"></article></div></section></main>';
    document.body.removeAttribute('data-account-type');
    window.lessonFixture={ destroy:()=>{}, progress:0, answers:0, lesson, steps:parseLessonMarkdown(lesson.authoringSource).steps };
    lessonFixture.mount=(type, { long=false, mode='learner', steps }={}) => {
      lessonFixture.destroy();
      let selected=steps || lessonFixture.steps.filter(step => step.type===type).slice(0,1);
      if(long) selected=selected.map(step => ({ ...step, content:{ ...step.content,
        title:step.content.title+' وتحقّق من ترتيب جميع البيانات والعلاقات في هذا المثال',
        mascot:'اقرأ السؤال بهدوء. يمكنك مراجعة البيانات ثم اختيار الإجابة المناسبة خطوة واحدة في كل مرة.',
        ...(step.type==='spot-bug' ? { lines:step.content.lines.map(line=>line+' /* Read the complete database schema, including identifiers and relationships. */') }:{}),
      }}));
      lessonFixture.selected=selected;
      lessonFixture.destroy=renderAuthoredInteractiveLesson(document.querySelector('#fixture-lesson'),'الدرس',lesson,selected,{
        mode, allowTestPass:true, isLessonPart:true,
        onProgress:()=>lessonFixture.progress++, onAnswer:()=>lessonFixture.answers++,
        getCompletionOutcome:()=>({ xpGain:10, totalXp:10, progress:3, completed:1, totalParts:29, streak:1 }),
      });
    };
    lessonFixture.mountClassic=()=>{
      lessonFixture.destroy();
      lessonFixture.destroy=renderLesson(document.querySelector('#fixture-lesson'),'Preview',{title:'Classic preview',steps:[{id:'classic-explanation',type:'explanation',title:'A simple explanation',blocks:[{type:'paragraph',text:'Read and continue.'}]}]},{mode:'preview',onProgress:()=>lessonFixture.progress++}).destroy;
    };
    lessonFixture.mountSource=()=>{
      lessonFixture.destroy();
      lessonFixture.destroy=renderLesson(document.querySelector('#fixture-lesson'),'الدرس',lesson,{mode:'developer',isLessonPart:true,allowTestPass:true,onProgress:()=>lessonFixture.progress++,onAnswer:()=>lessonFixture.answers++}).destroy;
    };
    await document.fonts.ready;
  })()`);
  for (const width of [390, 761]) {
    await send("Emulation.setDeviceMetricsOverride", { width,height:844,deviceScaleFactor:1,mobile:false });
    for (const count of [2, 3, 4]) {
      await evaluate(`(() => {
        const base=lessonFixture.steps.find(step=>step.type==='mcq');
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
  for (const width of [320,390,600,680,720,761]) {
    await send("Emulation.setDeviceMetricsOverride", { width,height:844,deviceScaleFactor:1,mobile:false });
    for (const type of ["fill-blanks","sequence","spot-bug"]) {
      await evaluate(`lessonFixture.mount(${JSON.stringify(type)}, {long:true})`);
      await waitFor("document.querySelector('.lesson-question-mascot img')?.complete");
      await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
      const metrics = await evaluate(`(() => {
        const rect=element=>{const r=element.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
        const header=document.querySelector('.lesson-question-header');
        const heading=document.querySelector('.lesson-question-heading');
        const mascot=document.querySelector('.lesson-question-mascot');
        return {header:rect(header),heading:rect(heading),mascot:rect(mascot),bubble:rect(document.querySelector('.lesson-question-bubble')),image:rect(mascot.querySelector('img')),pageWidth:document.documentElement.scrollWidth,viewport:innerWidth,
          authoringControls:document.querySelectorAll('[data-test-lesson-pass],.lesson-markdown-toggle,.lesson-markdown-source').length};
      })()`);
      assert.equal(metrics.authoringControls,0,"ordinary lesson has no preview/source controls");
      assert.ok(metrics.pageWidth<=width+1, `${type} page width at ${width}`);
      assert.ok(metrics.header.left>=-1 && metrics.header.right<=width+1, `${type} header lies within viewport at ${width}: ${JSON.stringify(metrics)}`);
      assert.ok(metrics.heading.width>=Math.min(230,metrics.header.width)-1, `${type} readable heading width at ${width}`);
      for(const item of [metrics.heading,metrics.mascot,metrics.bubble,metrics.image]) {
        assert.ok(item.left>=metrics.header.left-1 && item.right<=metrics.header.right+1, `${type} header child fits at ${width}: ${JSON.stringify(metrics)}`);
      }
      results.push({width,type,...metrics});
      if ([320,390,761].includes(width)) {
        const screenshot=await send("Page.captureScreenshot",{format:"png"});
        await writeFile(`${evidence}/question-${type}-${width}.png`,Buffer.from(screenshot.data,"base64"));
      }
      await evaluate(`(() => {const target=document.querySelector('[data-fill-option],[data-sequence-step],[data-bug-line]');target.focus();target.scrollIntoView({block:'center',behavior:'instant'});})()`);
      assert.equal(await evaluate(`(() => {const control=document.activeElement.getBoundingClientRect();const task=document.querySelector('.level-layout-task').getBoundingClientRect();return control.top>=task.top-1 && control.bottom<=task.bottom+1;})()`),true,`${type} answer reachable at ${width}`);
    }
  }
  await send("Emulation.setDeviceMetricsOverride", { width:390,height:844,deviceScaleFactor:1,mobile:false });
  await evaluate("lessonFixture.mount('sequence')");
  await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  await evaluate("document.querySelector('[data-sequence-step]').focus()");
  await send("Input.dispatchKeyEvent",{type:"keyDown",key:"Enter",code:"Enter",text:"\r",unmodifiedText:"\r",windowsVirtualKeyCode:13});
  await send("Input.dispatchKeyEvent",{type:"keyUp",key:"Enter",code:"Enter",windowsVirtualKeyCode:13});
  assert.equal(await evaluate("document.querySelectorAll('.ui-lab-sequence-slots .is-placed').length"),1);
  await evaluate("document.querySelector('.ui-lab-sequence-slots .is-placed').click()");
  assert.equal(await evaluate("document.querySelectorAll('.ui-lab-sequence-slots .is-placed').length"),0);
  assert.equal(await evaluate("[...document.querySelectorAll('[data-sequence-slot]>b')].every(label=>label.textContent==='اختر خطوة من الأسفل')"),true);
  await evaluate("[...document.querySelectorAll('.ui-lab-sequence-bank [data-sequence-step]')].forEach(button=>button.click()); document.querySelector('[data-sequence-check]').click()");
  assert.equal(await evaluate("document.querySelector('[data-sequence-check]').dataset.actionState"),"retry");
  await waitFor("[...document.querySelectorAll('.ui-lab-sequence-slots button')].every(button=>button.getAnimations().every(animation=>animation.playState!=='running'))");
  assert.equal(await evaluate("[...document.querySelectorAll('.ui-lab-sequence-slots button')].every(button=>{const control=button.getBoundingClientRect();const slot=button.parentElement.getBoundingClientRect();return control.top>=slot.top && control.bottom<=slot.bottom;})"),true,"settled ordering text remains inside every slot");
  const retryColors=await evaluate("({text:getComputedStyle(document.querySelector('[data-sequence-check]')).color,background:getComputedStyle(document.querySelector('[data-sequence-check]')).backgroundColor})");
  assert.equal(retryColors.text,"rgb(255, 255, 255)","filled retry action uses the requested white text");
  const channel=part=>{const n=part/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4};
  const luminance=value=>{const rgb=value.match(/\d+/g).slice(0,3).map(Number).map(channel);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]};
  const contrast=(luminance(retryColors.text)+.05)/(luminance(retryColors.background)+.05);
  assert.equal(retryColors.background,"rgb(255, 75, 75)","filled retry uses the shared red error action");
  results.push({state:"retry",...retryColors,contrast});
  const retryScreenshot=await send("Page.captureScreenshot",{format:"png"});
  await writeFile(`${evidence}/question-sequence-retry-390.png`,Buffer.from(retryScreenshot.data,"base64"));
  await evaluate("document.querySelector('[data-sequence-check]').click()");
  assert.equal(await evaluate("[...document.querySelectorAll('[data-sequence-slot]>b')].every(label=>label.textContent==='اختر خطوة من الأسفل')"),true,"Arabic survives retry/reset");
  await evaluate("lessonFixture.mount('sequence',{steps:[{...lessonFixture.selected[0],content:{...lessonFixture.selected[0].content,placeholder:'Choose the first request'}}]})");
  assert.equal(await evaluate("document.querySelector('[data-sequence-slot]>b').textContent"),"Choose the first request","explicit authored English survives Arabic UI");
  await evaluate("lessonFixture.mount('spot-bug',{long:true})");
  await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
  await evaluate("document.querySelector('.ui-lab-bug-code').focus()");
  const code=await evaluate("(() => {const e=document.querySelector('.ui-lab-bug-code');return {direction:getComputedStyle(e).direction,width:e.clientWidth,scroll:e.scrollWidth,scrollbar:getComputedStyle(e).scrollbarWidth};})()");
  assert.equal(code.direction,"ltr"); assert.ok(code.scroll>code.width); assert.notEqual(code.scrollbar,"none");
  await send("Input.dispatchKeyEvent",{type:"keyDown",key:"ArrowRight",code:"ArrowRight",windowsVirtualKeyCode:39});
  await send("Input.dispatchKeyEvent",{type:"keyUp",key:"ArrowRight",code:"ArrowRight",windowsVirtualKeyCode:39});
  await delay(250);
  assert.ok(await evaluate("document.querySelector('.ui-lab-bug-code').scrollLeft>0"),"keyboard scrolls coherent code surface");
  await evaluate("document.querySelector('[data-bug-line]').click()");
  assert.equal(await evaluate("document.querySelector('[data-bug-line]').getAttribute('aria-pressed')"),"true");
  await evaluate(`lessonFixture.mount('markdown',{steps:[{id:'localized-reference',type:'markdown',title:'مصطلحات',source:${JSON.stringify('# مصطلحات\n\n[[term: قاعدة البيانات | مجموعة من البيانات المرتبطة ببعضها.]]\n\n| الحقل | النوع |\n| --- | --- |\n| رمز | نص |')}}]})`);
  assert.equal(await evaluate("document.querySelector('.markdown-tech-card small').textContent"),"مصطلح تقني");
  assert.equal(await evaluate("document.querySelector('.markdown-table-scroll').getAttribute('aria-label')"),"جدول قابل للتمرير");
  await evaluate(`(async()=>{
    const {parseLessonMarkdown}=await import('./src/markdown/lesson-authoring.js');
    const {default:intro}=await import('./src/data/lessons/ict/course-introduction.js');
    const calloutStep=parseLessonMarkdown(intro.authoringSource).steps.find(step=>step.source?.includes('خطوة واحدة في كل مرة'));
    lessonFixture.mount('markdown',{steps:[calloutStep]});
  })()`);
  assert.deepEqual(await evaluate("(() => {const style=getComputedStyle(document.querySelector('.markdown-callout'));return {right:style.borderRightWidth,left:style.borderLeftWidth};})()"),{right:"5px",left:"0px"},"Arabic lesson callout accent appears on the right");
  await evaluate(`(async()=>{
    const {parseLessonMarkdown}=await import('./src/markdown/lesson-authoring.js');
    const {default:intro}=await import('./src/data/lessons/ict/course-introduction.js');
    const first=parseLessonMarkdown(intro.authoringSource).steps[0];
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
  await evaluate("lessonFixture.mount('sequence',{mode:'preview'});lessonFixture.before=lessonFixture.progress;document.querySelector('[data-test-lesson-pass]').click()");
  await waitFor("document.querySelector('.subject-completion-preview')");
  assert.equal(await evaluate("lessonFixture.progress===lessonFixture.before"),true,"preview never saves progress");
  assert.equal(await evaluate("document.querySelectorAll('.subject-gain').length"),0,"preview does not show earned rewards");
  await evaluate("lessonFixture.before=lessonFixture.progress;lessonFixture.mountClassic();document.querySelector('[data-template-primary]').click()");
  assert.equal(await evaluate("lessonFixture.progress===lessonFixture.before"),true,"classic preview never saves progress");
  await evaluate("lessonFixture.mountSource()");
  assert.equal(await evaluate("document.querySelectorAll('.lesson-markdown-toggle').length"),1,"source editor remains explicit developer mode");
  await evaluate(`(async()=>{
    lessonFixture.destroy();
    const [{renderMarkdownLab},{LESSON_MARKDOWN}]=await Promise.all([import('./src/ui/markdown-lab.js'),import('./src/data/lessons/ict/course-introduction.js')]);
    lessonFixture.destroy=renderMarkdownLab(document.querySelector('#fixture-lesson'));
    const input=document.querySelector('[data-markdown-input]');
    input.value=LESSON_MARKDOWN.split('<!-- lesson-step -->')[0].replace('meet-rocky','authoring-preview-dialogue');
    input.dispatchEvent(new Event('input',{bubbles:true}));
    document.querySelector('[data-markdown-pane="preview"]').click();
  })()`);
  await waitFor("document.querySelector('[data-markdown-output] [data-lesson-presentation=rocky-dialogue]')?.dataset.mediaState==='ready'");
  assert.equal(await evaluate("document.querySelector('[data-markdown-output] .rocky-dialogue-text')?.textContent.trim()"),"مرحبًا، أنا روكي! سأساعدك ونتعلّم معًا خطوة بخطوة.","MarkdownLab renders the shared semantic dialogue in reduced motion");
  assert.equal(await evaluate("document.querySelector('[data-markdown-output] [data-rocky-dialogue] > .visually-hidden')?.textContent"),"مرحبًا، أنا روكي! سأساعدك ونتعلّم معًا خطوة بخطوة.","the complete dialogue remains readable to assistive technology");
  assert.equal(await evaluate("document.querySelectorAll('[data-markdown-output] .rocky-dialogue-word').length"),0,"MarkdownLab honors the active motion preference");
  const authoringScreenshot=await send("Page.captureScreenshot",{format:"png"});
  await writeFile(`${evidence}/dialogue-authoring-390.png`,Buffer.from(authoringScreenshot.data,"base64"));
  await evaluate(`(() => {
    const input=document.querySelector('[data-markdown-input]');
    input.value='# شرح عادي\\n\\nهذا شرح من دون عرض مخصّص.';
    input.dispatchEvent(new Event('input',{bubbles:true}));
  })()`);
  await waitFor("document.querySelector('[data-markdown-output] .markdown-rendered')?.textContent.includes('هذا شرح من دون عرض مخصّص.')");
  assert.equal(await evaluate("document.querySelectorAll('[data-markdown-output] [data-rocky-dialogue]').length"),0,"ordinary Markdown keeps its generic presentation after preview edits");
  await evaluate("lessonFixture.destroy();document.querySelector('#fixture-lesson').textContent='Navigation completed'");
  await delay(250);
  assert.equal(await evaluate("document.querySelector('#fixture-lesson').textContent"),"Navigation completed","disposed lesson cannot repaint after navigation");
});
await writeFile(`${evidence}/question-layout-measurements.json`,JSON.stringify(results,null,2));
console.log(`Question layouts, locale, modes, keyboard code scrolling and dialogue motion passed. Evidence: ${evidence}`);
