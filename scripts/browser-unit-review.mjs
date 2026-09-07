import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { withBrowserPage } from "./browser-page.mjs";

await withBrowserPage(async ({base,send,evaluate,waitFor}) => {
  await send('Network.setBlockedURLs',{urls:['*/src/main.js']});
  await send('Page.navigate',{url:base});
  await waitFor("document.readyState==='complete'");
  await evaluate(`(async()=>{
    const [{mountSubjectRoadmap},{getSubjectRoadmap}]=await Promise.all([import('./src/ui/subject-roadmap.js'),import('./src/data/subject-roadmaps.js')]);
    document.body.innerHTML='<main class="page"><section class="lesson-view is-visible"><div class="lesson-shell"><article class="lesson-card" id="review-fixture"></article></div></section></main>';
    const roadmap=getSubjectRoadmap('ict');
    window.mountReview=(many=false,initialReviewUnit=null)=>{
      window.map?.destroy();
      window.map=mountSubjectRoadmap({container:document.querySelector('#review-fixture'),roadmap,initialReviewUnit,
        getPartProgress:()=>({completed:true}),
        getPartReview:(lesson,part)=>many || part.id==='access-basics' ? [{stepId:'question-low',misses:2,active:true,solved:true},{stepId:'question-high',misses:4,active:true,solved:false}] : [],
        onStartLesson:selection=>{window.reviewSelection=selection;},
      });
    };
    mountReview();await document.fonts.ready;
  })()`);
  for (const width of [320,390,1366]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
    await evaluate('mountReview()');
    const before=await evaluate("document.querySelector('.roadmap-unit-header').getBoundingClientRect().height");
    await evaluate('mountReview(true)');
    assert.equal(await evaluate("document.querySelector('.roadmap-unit-header').getBoundingClientRect().height"),before,'summary does not grow with review count');
    assert.equal(await evaluate("document.querySelector('.roadmap-review-panel').hidden"),true);
    await evaluate("document.querySelector('[data-unit-tab=review]').click()");
    assert.equal(await evaluate("document.querySelector('.roadmap-lessons').hidden"),true);
    assert.equal(await evaluate("document.documentElement.scrollWidth<=innerWidth"),true);
    assert.equal(await evaluate("document.querySelector('.roadmap-review-panel').hidden"),false);
    const {data}=await send('Page.captureScreenshot',{format:'png'});
    await writeFile(`/tmp/unit-review-${width}.png`,Buffer.from(data,'base64'));
  }
  await evaluate("mountReview(false,'unit-1');document.querySelector('[data-review-part=access-basics]').click()");
  assert.equal(await evaluate('reviewSelection.reviewStepId'),'question-high');
  await evaluate("document.querySelector('[data-unit-tab=review]').focus()");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Home',code:'Home',windowsVirtualKeyCode:36});
  assert.equal(await evaluate("document.querySelector('[data-unit-tab=lessons]').getAttribute('aria-selected')"),'true');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await evaluate("document.querySelector('[data-unit-tab=review]').click();document.querySelector('[data-unit-tab=lessons]').click();map.destroy();document.querySelector('#review-fixture').innerHTML='<p id=destination>تم</p>'");
  await waitFor("document.querySelector('#destination')");
  assert.equal(await evaluate("document.querySelectorAll('.roadmap-review-panel').length"),0);
});
console.log('Unit review: bounded summaries, mobile/desktop, priority, restored tab, keyboard, reduced motion and interrupted navigation passed.');
