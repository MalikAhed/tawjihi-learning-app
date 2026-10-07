// Render a completed lesson with disposable callbacks, then restore the roadmap.
export async function verifyCompletionPreview({ evaluate, waitFor, assert, cdp, sessionId, captureScreenshot }) {
  assert(await evaluate("!document.querySelector('[data-test-lesson-pass],.lesson-markdown-toggle')"),"learner lesson has no preview or source controls");
  await evaluate(`(async()=>{
    const [{renderLesson},{loadSubjectLessonPart}]=await Promise.all([import('./src/ui/lesson-view.js'),import('./src/data/lessons/subject-lesson-registry.js')]);
    const lesson=await loadSubjectLessonPart('ict','database-management','access-basics');
    window.completionPreviewWrites=0;
    window.completionPreview=renderLesson(document.querySelector('.lesson-card'),'معاينة الدرس',lesson,{
      isLessonPart:true,
      progress:{completedStepIds:lesson.steps.map(step=>step.id),completedAt:'2026-09-06'},
      getCompletionOutcome:()=>({xpGain:0,totalXp:0,completed:0,totalParts:29,streak:0}),
      onExitLesson:()=>{window.completionPreview.destroy();document.querySelector('.lesson-back').click();}
    });
  })()`);
  await waitFor("document.querySelector('.subject-completion-rocky')?.naturalWidth>0","decoded preview completion artwork");
  await waitFor("document.querySelector('.subject-completion')?.dataset.animationState==='complete'","preview celebration completes");
  assert(await evaluate("Boolean(document.querySelector('.subject-completion')) && completionPreviewWrites===0"),"completed fixture renders without writing learner progress");
  const checkFit=async name=>{
    for(const [width,height] of [[320,568],[390,667],[844,390],[1366,768]]) {
      await cdp.send("Emulation.setDeviceMetricsOverride",{width,height,deviceScaleFactor:1,mobile:width<600},sessionId);
      await evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))");
      const fit=await evaluate(`(()=>{const task=document.querySelector('.lesson-shell--completion .level-layout-task');const footer=document.querySelector('.level-layout-actions').getBoundingClientRect();const next=document.querySelector('[data-template-primary]').getBoundingClientRect();return {fits:document.documentElement.scrollWidth<=innerWidth+1 && footer.bottom<=innerHeight+1 && next.left>=0 && next.right<=innerWidth && next.bottom<=innerHeight,scroll:task.scrollHeight,available:task.clientHeight};})()`);
      assert(fit.fits,`${name} actions fit at ${width}×${height}: ${JSON.stringify(fit)}`);
      await captureScreenshot(`ict-${name}-${width}.png`);
    }
  };
  await captureScreenshot("ict-ending-preview.png");
  await checkFit("ending");
  await evaluate("document.querySelector('[data-authored-restart]').click()");
  await waitFor("document.querySelector('.subject-completion--streak')?.dataset.animationState==='complete'","preview analytics completes");
  assert(await evaluate("completionPreviewWrites===0"),"completed fixture analytics does not write progress");
  await checkFit("analytics");
  await cdp.send("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]},sessionId);
  await waitFor("document.querySelector('.completion-streak-fire')?.currentSrc.endsWith('streak-fire-burning-reduced.svg') && document.querySelector('.completion-streak-fire').complete && document.querySelector('.completion-streak-fire').naturalWidth>0","current preview mascot decodes its reduced-motion still");
  assert(await evaluate("document.querySelector('.completion-streak-fire').currentSrc.endsWith('streak-fire-burning-reduced.svg')"),"reduced motion stops the current mascot");
  await evaluate("document.querySelector('[data-authored-restart]').click()");
  await waitFor("document.querySelector('.subject-roadmap')","exit explicit completion preview");
  assert(await evaluate("document.querySelectorAll('[data-unit=unit-1] .roadmap-part[data-part-state=completed]').length===0 && completionPreviewWrites===0"),"explicit preview leaves learner completion unchanged");
  await cdp.send("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"no-preference"}]},sessionId);
  await cdp.send("Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false},sessionId);
}
