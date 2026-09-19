import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {withBrowserPage} from './browser-page.mjs';
const evidence='/tmp/unit1-verification';
await mkdir(evidence,{recursive:true});
const results=[];
await withBrowserPage(async({base,send,evaluate,waitFor})=>{
  await send('Network.setBlockedURLs',{urls:['*fonts.googleapis.com*','*fonts.gstatic.com*','*/src/main.js']});
  await send('Page.navigate',{url:base});
  await waitFor("document.readyState==='complete'");
  await evaluate(`(async()=>{
    const [{renderAuthoredInteractiveLesson},{parseLessonMarkdown},{loadSubjectLessonPart},{getSubjectRoadmap}]=await Promise.all([
      import('./src/ui/lesson/authored.js'),import('./src/markdown/lesson-authoring.js'),import('./src/data/lessons/subject-lesson-registry.js'),import('./src/data/subject-roadmaps.js')]);
    document.body.innerHTML='<main class="page"><section class="lesson-view is-visible"><div class="lesson-shell"><div class="lesson-top"><button class="lesson-back">×</button><div class="lesson-top-title"></div><div class="lesson-status"></div></div><article class="lesson-card" id="fixture-lesson"></article></div></section></main>';
    document.body.removeAttribute('data-startup');
    window.parts=[];
    for(const lesson of getSubjectRoadmap('ict').units[0].lessons.filter(l=>!l.optional)) for(const part of lesson.parts){
      const content=await loadSubjectLessonPart('ict',lesson.id,part.id);
      parts.push({id:part.id,lesson:content,steps:parseLessonMarkdown(content.authoringSource).steps});
    }
    window.mount=(index)=>{
      window.cleanup?.();window.answers=[];window.completed=false;
      const part=parts[index];
      window.cleanup=renderAuthoredInteractiveLesson(document.querySelector('#fixture-lesson'),part.lesson.title,part.lesson,part.steps,{
        mode:'learner',isLessonPart:true,onAnswer:result=>answers.push(result),onProgress:({isComplete})=>{if(isComplete)completed=true;}
      });
    };
    await document.fonts.ready;
  })()`);
  const parts=await evaluate('parts.map(p=>({id:p.id,steps:p.steps.map(s=>({id:s.id,type:s.type,presentation:s.presentation}))}))');
  for(const [width,height] of [[1280,900],[390,844]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    for(const [index,part] of parts.entries()){
      if(process.env.UNIT1_PART && process.env.UNIT1_PART!==part.id) continue;
      await evaluate(`mount(${index})`);
      for(const step of part.steps){
        await waitFor(`document.querySelector('[data-live-authored-step]')?.dataset.lessonStep===${JSON.stringify(step.id)}`);
        await waitFor("document.querySelector('.level-layout-task')?.getAttribute('aria-busy')!=='true'");
        await evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
        const layout=await evaluate(`(()=>({
          documentOverflow:document.documentElement.scrollWidth>innerWidth+1,
          optionOverflow:[...document.querySelectorAll('[data-ui-lab-answer]')].filter(n=>n.scrollWidth>n.clientWidth+2).map(n=>n.innerText),
          progressHidden:document.querySelector('.lesson-top-title').hidden,
          codeDirections:[...document.querySelectorAll('pre, .ui-lab-mcq > p code')].map(n=>getComputedStyle(n).direction),
          hiddenContent:[...document.querySelectorAll('.lesson-summary-focus .markdown-table-scroll, .lesson-summary-focus pre')].filter(n=>n.scrollWidth>n.clientWidth+2).map(n=>n.innerText.slice(0,80))
        }))()`);
        assert.equal(layout.documentOverflow,false,`${width}: ${step.id} page overflow`);
        assert.deepEqual(layout.optionOverflow,[],`${width}: ${step.id} answer overflow`);
        assert.equal(layout.progressHidden,step.type!=='mcq',`${step.id} phase progress`);
        assert.ok(layout.codeDirections.every(d=>d==='ltr'),`${step.id} SQL direction`);
        assert.deepEqual(layout.hiddenContent,[],`${width}: ${step.id} hidden summary columns/code`);
        if(['sql-update-queries-summary','sql-unit-update-parameters-check'].includes(step.id)){
          const assignment=await evaluate(`(()=>{
            const code=[...document.querySelectorAll('code')].find(n=>n.textContent.includes('[ادخل رقم الطالب]'));
            const names=[...code.querySelectorAll('bdi')];
            const target=names.find(n=>n.textContent==='رقم الطالب').getClientRects()[0];
            const value=names.find(n=>n.textContent==='ادخل رقم الطالب').getClientRects()[0];
            return {text:code.textContent,target:{top:target.top,left:target.left},value:{top:value.top,left:value.left},ordered:target.top<value.top-2 || (Math.abs(target.top-value.top)<2 && target.left<value.left)};
          })()`);
          assert.match(assignment.text,/\[رقم الطالب\]\s*=\s*\[ادخل رقم الطالب\]/);
          assert.equal(assignment.ordered,true,`${width}: ${step.id} SQL target appears before input value: ${JSON.stringify(assignment)}`);
        }
        if(step.presentation==='lesson-summary'){
          const shot=await send('Page.captureScreenshot',{format:'png'});
          await writeFile(`${evidence}/${part.id}-${width}.png`,Buffer.from(shot.data,'base64'));
        }
        if(step.type==='mcq'){
          await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').click();document.querySelector('[data-template-primary]').click()");
          assert.equal(await evaluate("document.querySelector('[data-ui-lab-answer][data-correct=true]').classList.contains('is-correct')"),true,step.id+' correct feedback');
        }
        await evaluate("document.querySelector('[data-template-primary]').click()");
      }
      await waitFor("document.querySelector('[data-completion-step]')");
      const result=await evaluate('({answers:answers.length,completed})');
      assert.equal(result.answers,part.steps.filter(s=>s.type==='mcq').length,part.id+' all answers saved');
      assert.equal(result.completed,true,part.id+' completes');
      results.push({width,part:part.id,...result});
      console.log(`${width}px ${part.id}: ${result.answers} answers, completion, no overflow`);
    }
  }
});
await writeFile(`${evidence}/results${process.env.UNIT1_PART ? "-"+process.env.UNIT1_PART : ""}.json`,JSON.stringify(results,null,2));
