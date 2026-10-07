import { COURSE_SUBJECTS } from "../../src/data/course.js";
import { loadSubjectLesson } from "../../src/data/lessons/subject-lesson-registry.js";
import { parseLessonMarkdown } from "../../src/markdown/lesson-authoring.js";

// Continues from the completed guest roadmap; creates and restores an isolated test account.
export async function verifyAccountJourney({ appUrl, navigate, evaluate, waitFor, assert, cdp, sessionId, captureScreenshot, delay, completeRoadmap }) {
  const accessPart = await loadSubjectLesson("ict", "database-management");
  const accessSteps = parseLessonMarkdown(accessPart.authoringSource, { published:true }).steps;
  const accessQuestionCount = accessSteps.filter(step => step.type !== "markdown").length;
  const accessOpening = accessSteps[0];
  await waitFor("Boolean(document.querySelector('[data-auth-flow=register]'))", "restored guest account actions");
  await evaluate("document.querySelector('[data-auth-flow=register]').click()");
  await waitFor("Boolean(document.querySelector('[data-register-form]'))", "direct account creation");
  assert(await evaluate("document.querySelectorAll('[data-onboarding-step]:not([hidden])').length === 1 && document.querySelector('[data-onboarding-step=\"intro\"]:not([hidden])') && document.querySelector('[data-onboarding-step=\"intro\"] img').src.endsWith('/assets/mascot/rocky-wave.svg') && document.querySelector('[data-onboarding-back] [data-back-label]').textContent === 'الرئيسية' && !document.querySelector('.visitor-language')"), "registration must start with Rocky's greeting, a labeled Home control, and no language control");
  await captureScreenshot("account-register.png");
  await evaluate("document.querySelector('[data-onboarding-step=\"intro\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"]:not([hidden]) input[name=username]'))", "Rocky's calm name question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"] img'))", "Rocky's calm standing image");
  assert(await evaluate("document.querySelector('[data-onboarding-step=\"0\"] img').src.endsWith('/assets/mascot/rocky-standing-still.svg')"), "the name question must use Rocky's calm standing animation");
  await evaluate("document.querySelector('[data-register-form]').requestSubmit()");
  assert(await evaluate("document.querySelector('[data-onboarding-step=\"0\"]:not([hidden]) [data-field-error]:not([hidden])') !== null"), "registration must validate the current question without exposing later fields");
  await captureScreenshot("account-name-error.png");
  await evaluate(`(() => { const form=document.querySelector('[data-register-form]'); form.elements.username.value='student-new'; document.querySelector('[data-onboarding-step="0"] [data-step-next]').click(); })()`);
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"1\"]:not([hidden])'))", "the curriculum question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"1\"] .rocky-pointer-svg'))", "Rocky's interactive curriculum pose");
  assert(await evaluate("document.querySelector('[data-onboarding-back] [data-back-label]').textContent === 'السابق'"), "later onboarding steps must label the back action as السابق");
  await evaluate(`(() => {
    const mascot=document.querySelector('[data-onboarding-step="1"] [data-rocky-pointer-track]');
    const box=mascot.getBoundingClientRect();
    window.dispatchEvent(new PointerEvent('pointermove',{clientX:innerWidth-4,clientY:box.top+box.height/2}));
  })()`);
  await waitFor(`(() => {
    const svg=document.querySelector('[data-onboarding-step="1"] .rocky-pointer-svg');
    return ['body','arm-left','arm-right'].every(part => Math.abs(Number.parseFloat(svg.querySelector('[data-part="'+part+'"]').style.translate) || 0) > 8);
  })()`, "Rocky's tracked body and shoulders after animation frames");
  const rockyFollow = await evaluate(`(() => {
    const svg=document.querySelector('[data-onboarding-step="1"] .rocky-pointer-svg');
    const offset=(part) => Math.abs(Number.parseFloat(svg.querySelector('[data-part="'+part+'"]').style.translate) || 0);
    return {body:offset('body'),leftArm:offset('arm-left'),rightArm:offset('arm-right')};
  })()`);
  assert(rockyFollow.body > 8 && rockyFollow.leftArm > 8 && rockyFollow.rightArm > 8, `Rocky's shoulders must follow his tracked body movement (${JSON.stringify(rockyFollow)})`);
  await captureScreenshot("account-curriculum.png");
  assert(await evaluate("[...document.querySelectorAll('.onboarding-choice-grid--maps img')].length === 2 && [...document.querySelectorAll('.onboarding-choice-grid--maps img')].every((image) => image.complete && image.naturalWidth > 0)"), "curriculum choices must load the accurate Gaza and Palestine SVG maps");
  await evaluate("document.querySelector('input[name=curriculum][value=gaza]').focus()");
  for (const key of [" ", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]) {
    await cdp.send("Input.dispatchKeyEvent", { type:"keyDown", key, code:key === " " ? "Space" : key, windowsVirtualKeyCode:({" ":32,ArrowDown:40,ArrowUp:38,ArrowLeft:37,ArrowRight:39})[key] }, sessionId);
    await cdp.send("Input.dispatchKeyEvent", { type:"keyUp", key, code:key === " " ? "Space" : key }, sessionId);
  }
  assert(await evaluate(`(() => {
    const input=document.querySelector('input[name=curriculum][value=gaza]');
    const choice=input.closest('.onboarding-choice');
    const other=document.querySelector('input[name=curriculum][value=full-palestinian]').closest('.onboarding-choice');
    return input.checked && document.activeElement === input && getComputedStyle(choice).outlineStyle !== 'none' && getComputedStyle(choice.querySelector('.onboarding-choice__marker svg')).visibility === 'visible' && getComputedStyle(other.querySelector('.onboarding-choice__marker svg')).visibility === 'hidden';
  })()`), "native radio Space/arrows must select a curriculum with separate visible focus and persistent selection markers");
  await evaluate("document.querySelector('[data-onboarding-step=\"1\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"2\"]:not([hidden])'))", "the academic path question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"2\"] .rocky-pointer-svg'))", "Rocky's interactive academic-path pose");
  assert(await evaluate(`(() => {
    const svgs=[...document.querySelectorAll('.rocky-pointer-svg')];
    const ids=svgs.flatMap((svg) => [...svg.querySelectorAll('[id]')].map((element) => element.id));
    const visibleBodyUse=document.querySelector('[data-onboarding-step="2"] .rocky-pointer-svg [data-part="body"] use');
    const reference=visibleBodyUse?.getAttribute('href');
    const definition=reference && document.querySelector(reference);
    return ids.length > 0 && ids.length === new Set(ids).size && Boolean(definition) && definition.closest('svg') === visibleBodyUse.closest('svg');
  })()`), "each inline Rocky must own uniquely scoped SVG definitions");
  await captureScreenshot("account-path.png");
  await captureScreenshot("account-path-svg.png");
  assert(await evaluate("document.querySelector('[data-onboarding-step=\"2\"]').textContent.includes('العلمي') && document.querySelector('[data-onboarding-step=\"2\"]').textContent.includes('الأدبي')"), "the path question must offer العلمي and الأدبي in Arabic");
  assert(await evaluate("[...document.querySelectorAll('[data-onboarding-step=\"2\"] .path-choice__visual img')].length === 4 && [...document.querySelectorAll('[data-onboarding-step=\"2\"] .path-choice__visual img')].every((image) => image.complete && image.naturalWidth > 0)"), "academic path choices must preload pale and saturated generated illustrations");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
  assert(await evaluate("document.documentElement.scrollWidth <= innerWidth && [...document.querySelectorAll('[data-onboarding-step=\"2\"] .onboarding-choice--path')].every((choice) => { const box=choice.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth; })"), "academic path choices must stay contained on mobile");
  await captureScreenshot("account-path-mobile.png");
  await captureScreenshot("account-path-svg-mobile.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await evaluate("document.querySelector('input[name=path][value=scientific]').click()");
  await waitFor("getComputedStyle(document.querySelector('.onboarding-choice--scientific .path-choice__art--saturated')).opacity === '1'", "the selected path artwork transition");
  assert(await evaluate(`(() => {
    const choice=document.querySelector('.onboarding-choice--scientific');
    const other=document.querySelector('.onboarding-choice--literary');
    return getComputedStyle(choice).borderColor !== getComputedStyle(other).borderColor && getComputedStyle(choice.querySelector('.onboarding-choice__marker svg')).visibility === 'visible' && getComputedStyle(other.querySelector('.onboarding-choice__marker svg')).visibility === 'hidden' && getComputedStyle(choice.querySelector('.path-choice__art--pale')).opacity === '0' && getComputedStyle(choice.querySelector('.path-choice__art--saturated')).opacity === '1';
  })()`), "path selection must retain artwork and the same persistent check marker used by curriculum choices");
  await evaluate("document.querySelector('[data-onboarding-back]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"1\"]:not([hidden])'))", "back to the selected curriculum");
  assert(await evaluate("document.querySelector('input[name=curriculum][value=gaza]').checked"), "going back must preserve the native curriculum value");
  await waitFor("!document.querySelector('[data-onboarding-step=\"1\"]').classList.contains('media-pending')", "ready curriculum after going back");
  await evaluate("document.querySelector('[data-onboarding-step=\"1\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"2\"]:not([hidden])'))", "return to the selected path");
  assert(await evaluate("document.querySelector('input[name=path][value=scientific]').checked && getComputedStyle(document.querySelector('.onboarding-choice--scientific .onboarding-choice__marker svg')).visibility === 'visible'"), "going forward must preserve the native path and its visible selected marker");
  await captureScreenshot("account-path-selected.png");
  await evaluate("document.querySelector('[data-onboarding-step=\"2\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"3\"]:not([hidden])'))", "the required email question");
  assert(await evaluate("document.querySelector('input[name=email]').required && !document.querySelector('[data-skip-field=email]')"), "email must be required by the current account decision");
  await captureScreenshot("account-email-required.png");
  await evaluate("document.querySelector('input[name=email]').value='student-new@example.com'; document.querySelector('[data-onboarding-step=\"3\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"4\"]:not([hidden])'))", "the password question after email");
  await captureScreenshot("account-password.png");
  assert(await evaluate("!document.querySelector('input[name=phone]') && !document.querySelector('select[name=phonePrefix]') && document.querySelector('[data-onboarding-progress]').getAttribute('aria-valuemax') === '5'"), "registration must end at password without asking for a phone number");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:568, deviceScaleFactor:1, mobile:true }, sessionId);
  assert(await evaluate("document.documentElement.scrollWidth <= innerWidth && document.querySelector('[data-onboarding-step=\"4\"] [type=submit]').getBoundingClientRect().right <= innerWidth"), "the final registration action must stay contained on mobile");
  await captureScreenshot("account-password-mobile.png");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440, height:900, deviceScaleFactor:1, mobile:false }, sessionId);
  await evaluate("document.querySelector('input[name=password]').value='abc12345'; document.querySelector('input[name=password]').focus()");
  await cdp.send("Input.dispatchKeyEvent", { type:"keyDown", key:"Enter", code:"Enter", windowsVirtualKeyCode:13, text:"\r", unmodifiedText:"\r" }, sessionId);
  await cdp.send("Input.dispatchKeyEvent", { type:"keyUp", key:"Enter", code:"Enter", windowsVirtualKeyCode:13 }, sessionId);
  await waitFor("Boolean(document.querySelector('[data-registration-continue]'))", "successful account creation with explicit Continue");
  assert(await evaluate("!document.querySelector('[data-registration-continue]').disabled && getComputedStyle(document.querySelector('[data-registration-continue]')).visibility === 'visible'"), "registration Continue must be available immediately without waiting for celebration media");
  await delay(3800);
  assert(await evaluate("Boolean(document.querySelector('[data-registration-continue]')) && location.search !== '?page=learn'"), "registration completion must stay until the learner chooses Continue");
  await captureScreenshot("account-created.png");
  await evaluate("document.querySelector('[data-registration-continue]').focus()");
  await cdp.send("Input.dispatchKeyEvent", { type:"keyDown", key:"Enter", code:"Enter", windowsVirtualKeyCode:13, text:"\r", unmodifiedText:"\r" }, sessionId);
  await cdp.send("Input.dispatchKeyEvent", { type:"keyUp", key:"Enter", code:"Enter", windowsVirtualKeyCode:13 }, sessionId);
  await waitFor("location.search === '?page=learn' && !document.querySelector('.topbar-auth-member').hidden", "free-account return to the existing Learn page");
  assert(await evaluate("!document.querySelector('[data-verification-form]') && !document.body.textContent.includes('رمز تحقق')"), "account creation must have no verification-code step");
  const unpublishedSubjectCount = COURSE_SUBJECTS.filter(({ status }) => status === "unpublished").length;
  assert(await evaluate(`document.querySelector('[data-learner-dashboard]')?.textContent.includes('student-new') && !document.querySelector('.dashboard-resume') && document.querySelectorAll('.dashboard-stat').length === 1 && document.querySelectorAll('[data-subject-progress]:not([hidden])').length === ${COURSE_SUBJECTS.length} && document.querySelector('.subject-card[data-subject=ict] [data-subject-count]')?.textContent.startsWith('0 /') && document.querySelectorAll('.subject-card--locked:disabled').length === ${unpublishedSubjectCount} && document.querySelector('.subject-card[data-subject=ict]').getAttribute('aria-label').includes('ابدأ من خريطة الدروس') && !document.querySelector('.subject-card__action-arrow')`), "a new learner must see zero progress, all unpublished subjects disabled, and an accessible ICT map action");
  const ictCardCenter = await evaluate(`(() => { const box=document.querySelector('.subject-card[data-subject="ict"]').getBoundingClientRect(); return {x:box.left+box.width/2,y:box.top+box.height/2}; })()`);
  await cdp.send("Input.dispatchMouseEvent", { type:"mouseMoved", x:ictCardCenter.x, y:ictCardCenter.y }, sessionId);
  if (await evaluate("matchMedia('(hover:hover)').matches")) await waitFor("getComputedStyle(document.querySelector('.subject-card[data-subject=ict]')).transform === 'matrix(1, 0, 0, 1, 0, 2)'", "the shared slight lesson-style press on hover");
  await cdp.send("Input.dispatchMouseEvent", { type:"mousePressed", x:ictCardCenter.x, y:ictCardCenter.y, button:"left", clickCount:1 }, sessionId);
  await waitFor("getComputedStyle(document.querySelector('.subject-card[data-subject=ict]')).transform === 'matrix(1, 0, 0, 1, 0, 3)' && getComputedStyle(document.querySelector('.subject-card[data-subject=ict]')).boxShadow.includes('0px 1px 0px')", "the shared full lesson-style press while clicked");
  await cdp.send("Input.dispatchMouseEvent", { type:"mouseReleased", x:ictCardCenter.x, y:ictCardCenter.y, button:"left", clickCount:1 }, sessionId);
  await waitFor("location.search === '?subject=ict' && Boolean(document.querySelector('.subject-roadmap'))", "the ICT roadmap from the signed-in material card");
  assert(await evaluate("!document.querySelector('.markdown-authored-content') && document.querySelectorAll('.roadmap-lesson-group').length === 5 && !document.querySelector('.roadmap-whole-entry')"), "clicking the ICT material must show its map instead of opening a lesson directly");
  assert(await evaluate("document.querySelectorAll('[data-unit=unit-1] .roadmap-part[data-part-state=completed]').length === 0"), "a new member must not inherit a guest or another learner's progress");
  assert(await evaluate(`(() => {
    const hint=document.querySelector('.roadmap-start-hint');
    const heading=hint.closest('.roadmap-lesson-group').querySelector('.roadmap-lesson-heading');
    const style=getComputedStyle(hint);
    if (document.body.dataset.expandedComponents === 'hidden' && hint.closest('[data-expanded-component]')) return hint.getClientRects().length === 0;
    return style.color === 'rgb(28, 176, 246)' && style.fontSize === '17px' && style.paddingTop === '9px' && style.animationName === 'roadmap-start-bob' && style.animationDuration === '2s' && hint.getBoundingClientRect().top > heading.getBoundingClientRect().bottom;
  })()`), "the first question lesson hint retains its reference size, motion, and title clearance");
  await evaluate("document.querySelector('[data-roadmap-lesson=smartphone-operating-systems]').click()");
  assert(await evaluate("!document.querySelector('[data-bubble-start]').disabled && document.querySelector('[data-bubble-start]').textContent === 'ابدأ الأسئلة'"), "the published Android part must offer a Start action");
  await evaluate("document.querySelector('[data-bubble-start]').click()");
  await waitFor("Boolean(document.querySelector('[data-ui-lab-answer]'))", "the published Android lesson");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("location.search === '?subject=ict' && Boolean(document.querySelector('.subject-roadmap'))", "the ICT roadmap after checking Android");
  await evaluate("document.querySelector('[data-roadmap-part=access-basics]').scrollIntoView({block:'center',behavior:'instant'}); document.querySelector('[data-roadmap-part=access-basics]').click()");
  await waitFor("!document.querySelector('[data-roadmap-bubble]').hidden", "the first lesson information bubble for the signed-in learner");
  await evaluate("document.querySelector('[data-bubble-start]').click()");
  await waitFor(`document.querySelector('[data-live-authored-step]')?.dataset.lessonStep === ${JSON.stringify(accessOpening.id)} && Boolean(document.querySelector('[data-ui-lab-answer]'))`, "the lesson selected from the ICT roadmap");
  const signedInLessonCenter = await evaluate(`(() => { const content=document.querySelector('.ui-lab-mcq').getBoundingClientRect(); const rtlScrollbarWidth=innerWidth-document.documentElement.clientWidth; return { contentCenter:content.left + content.width / 2, usableViewportCenter:(innerWidth + rtlScrollbarWidth) / 2, pageMarginRight:getComputedStyle(document.querySelector('main.page')).marginRight }; })()`);
  assert(Math.abs(signedInLessonCenter.contentCenter - signedInLessonCenter.usableViewportCenter) <= 6 && signedInLessonCenter.pageMarginRight === "0px", `the signed-in ICT lesson must be centered in the usable viewport (${JSON.stringify(signedInLessonCenter)})`);
  assert(await evaluate("!document.querySelector('.dashboard-side-rail')"), "experimental dashboard rails must be removed");
  assert(await evaluate(`Number(document.querySelector('.lesson-top-title').getAttribute('aria-valuemax')) === ${accessQuestionCount} && !document.querySelector('.lesson-top-title').hidden && !document.querySelector('.lesson-label')?.textContent.includes('DAY 1')`), "the personalized Start lesson action must open the subject lesson without a day-based identity");
  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("Boolean(document.querySelector('.subject-roadmap'))", "the ICT roadmap after closing its lesson");
  if (process.env.BROWSER_ROADMAP_ONLY === "1") {
    await captureScreenshot("ict-parts-desktop.png");
    await cdp.send("Emulation.setDeviceMetricsOverride", { width:390, height:844, deviceScaleFactor:1, mobile:true }, sessionId);
    await evaluate("document.querySelector('[data-roadmap-part=sql-introduction]').scrollIntoView({block:'center',behavior:'instant'}); document.querySelector('[data-roadmap-part=sql-introduction]').click()");
    await waitFor("!document.querySelector('[data-roadmap-bubble]').hidden", "visible part brief after scrolling its trigger into view");
    assert(await evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth"), `part map and open brief must fit a narrow RTL viewport: ${JSON.stringify(await evaluate("[...document.querySelectorAll('.subject-roadmap *')].filter(el=>{const r=el.getBoundingClientRect();return r.width && (r.left<0 || r.right>document.documentElement.clientWidth)}).map(el=>({class:el.className,width:el.getBoundingClientRect().width,left:el.getBoundingClientRect().left})).slice(0,8)"))}`);
    await captureScreenshot("ict-parts-mobile.png");
    await evaluate("document.querySelector('[data-bubble-close]').dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true}))");
    assert(await evaluate("document.querySelector('[data-roadmap-bubble]').hidden && document.activeElement.dataset.roadmapPart === 'sql-introduction'"), "Escape must close the part brief and restore the selected part's focus");
    completeRoadmap();
  }

  await evaluate("document.querySelector('.lesson-back').click()");
  await waitFor("location.search === '?page=learn' && !document.querySelector('.lesson-view').classList.contains('is-visible')", "the Learn page after leaving the ICT roadmap");
  await evaluate("document.querySelector('[data-auth-sign-out]').click(); document.querySelector('[data-auth-flow=sign-in]').click()");
  await waitFor("Boolean(document.querySelector('[data-sign-in-form]'))", "the simplified sign-in form");
  assert(await evaluate("[...document.querySelectorAll('[data-sign-in-form] input')].every((input) => input.offsetWidth > 400)"), "sign-in fields must fill the native account card");
  await captureScreenshot("account-sign-in.png");
  await evaluate("document.querySelector('[data-sign-in-form]').requestSubmit()");
  await captureScreenshot("account-sign-in-error.png");
  await evaluate(`(() => { const form=document.querySelector('[data-sign-in-form]'); form.elements.identifier.value='student-new'; form.elements.password.value='abc12345'; form.requestSubmit(); })()`);
  await waitFor("location.search === '?page=learn' && document.body.dataset.accountType === 'free'", "restored free-account Learn page");
  assert(await evaluate("document.querySelector('[data-learner-dashboard]')?.textContent.includes('student-new') && document.querySelectorAll('.dashboard-stat').length === 1"), "a returning learner must restore the account created through the backend");
  const dashboardShell = await evaluate(`(() => {
    const navigation=document.querySelector('.topbar-wrap').getBoundingClientRect();
    const dashboard=document.querySelector('[data-learner-dashboard]').getBoundingClientRect();
    const main=document.querySelector('main.page').getBoundingClientRect();
    const column=document.querySelector('.column').getBoundingClientRect();
    return {navigationLeft:navigation.left,navigationRight:navigation.right,navigationTop:navigation.top,navigationBottom:navigation.bottom,dashboardLeft:dashboard.left,dashboardRight:dashboard.right,mainWidth:main.width,columnWidth:column.width,upcomingFeatures:document.querySelectorAll('.dashboard-premium,.dashboard-quests,.dashboard-side-rail').length};
  })()`);
  assert(dashboardShell.navigationLeft > dashboardShell.dashboardRight && dashboardShell.navigationTop === 0 && dashboardShell.navigationBottom === 900, `signed-in navigation must occupy the right rail instead of the top (${JSON.stringify(dashboardShell)})`);
  assert(dashboardShell.upcomingFeatures === 0 && Math.abs(dashboardShell.mainWidth-dashboardShell.columnWidth) <= 1, `subjects must use the full content width without upcoming feature rails (${JSON.stringify(dashboardShell)})`);
  await captureScreenshot("learner-dashboard.png");
  if (process.env.BROWSER_A11Y === "1") {
    // 720 CSS pixels at DPR 2 gives the reflow of a 1440px desktop at 200% zoom.
    for (const [width,scale] of [[390,1],[320,1],[720,2]]) {
      await cdp.send("Emulation.setDeviceMetricsOverride",{width,height:800,deviceScaleFactor:scale,mobile:false},sessionId);
      assert(await evaluate("document.documentElement.scrollWidth <= innerWidth"),`member Home fits ${width}px / ${scale}x scaling`);
      await captureScreenshot(`learner-dashboard-${width}-${scale}x.png`);
    }
    await cdp.send("Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false},sessionId);
  }
  for (const [width,height] of [[1440,900],[390,844]]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width,height,deviceScaleFactor:1,mobile:width < 600 }, sessionId);
    for (const page of ["quests", "shop", "league", "friends", "super"]) {
      await evaluate(`document.querySelector('[data-page="${page}"]').click()`);
      await waitFor("!document.querySelector('#coming-soon-toast').hidden", "the coming-soon message");
      assert(await evaluate("location.search === '?page=learn' && document.querySelector('.nav-item[aria-current=page]').dataset.page === 'learn' && !document.querySelector('.coming-soon.is-visible') && document.querySelector('#coming-soon-toast').textContent.includes('قريبًا')"), `${page} stays locked without changing the current tab`);
    }
    await captureScreenshot(`locked-tabs-${width}.png`);
  }
  await cdp.send("Emulation.setDeviceMetricsOverride", { width:1440,height:900,deviceScaleFactor:1,mobile:false }, sessionId);
  await navigate(`${appUrl}?page=learn`);
  await waitFor("document.querySelector('.topbar-auth-member')?.hidden === false && document.querySelector('[data-learner-dashboard]')?.textContent.includes('student-new')", "hard-refresh session restoration");
  await evaluate("document.querySelector('[data-auth-sign-out]').click()");
  await waitFor("!document.querySelector('.topbar-auth-guest').hidden", "backend sign out");
  await evaluate("document.querySelector('[data-auth-flow=register]').click()");
  await waitFor("Boolean(document.querySelector('[data-register-form]'))", "registration duplicate check");
  await evaluate("document.querySelector('[data-onboarding-step=\"intro\"] [data-step-next]').click()");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"]:not([hidden]) input[name=username]'))", "the duplicate-check name question");
  await waitFor("Boolean(document.querySelector('[data-onboarding-step=\"0\"] img'))", "the duplicate-check name transition");
  await evaluate("document.querySelector('input[name=username]').value='student-new'; document.querySelector('[data-onboarding-step=\"0\"] [data-step-next]').click()");
  await waitFor("document.querySelector('[data-field-error=username]')?.textContent.includes('مستخدم بالفعل')", "the immediate duplicate username error");
  assert(await evaluate("Boolean(document.querySelector('[data-onboarding-step=\"0\"]:not([hidden])'))"), "a duplicate username must be reported before leaving the username step");
  await navigate(`${appUrl}?page=learn`);

}
