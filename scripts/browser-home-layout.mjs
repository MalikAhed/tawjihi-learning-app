import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { withBrowserPage } from "./browser-page.mjs";

const output = process.env.BROWSER_SCREENSHOT_DIR || "/tmp/learn-ui-fixes";
await mkdir(output, { recursive:true });
const evidence = { widths:[], popups:[], stress:[] };
const widths = [320,390,600,700,760,761,820,1024,1180,1181,1280,1320,1366,1440];

await withBrowserPage(async ({ base, send, evaluate, waitFor }) => {
  const settleLayout = () => evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))");
  const viewport = async (width, height = 844, scale = 1) => {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor:scale, mobile:false });
    await waitFor(`innerWidth === ${width} && innerHeight === ${height} && matchMedia("(width: ${width}px)").matches`);
    await settleLayout();
  };
  const screenshot = async name => {
    const image = await send("Page.captureScreenshot", { format:"png", captureBeyondViewport:false });
    await writeFile(path.join(output, name), Buffer.from(image.data, "base64"));
  };
  const homeReady = () => waitFor("document.querySelector('.subject-card--ict')?.getBoundingClientRect().width > 0 && !document.querySelector('.course-units').classList.contains('media-pending') && !document.querySelector('.subject-map').inert && !document.querySelector('main').classList.contains('lesson-mode') && !document.querySelector('main').classList.contains('coming-mode') && [...document.querySelectorAll('.course-units img')].every(image=>image.complete && image.naturalWidth>0)");
  const navigate = async url => {
    await evaluate("window.layoutOldDocument=true");
    await send("Page.navigate", { url });
    await waitFor("!window.layoutOldDocument && document.readyState==='complete'");
  };
  const reload = async () => {
    await evaluate("window.layoutOldDocument=true");
    await send("Page.reload");
    await waitFor("!window.layoutOldDocument && document.readyState==='complete'");
  };
  const key = async value => {
    const windowsVirtualKeyCode = { Enter:13, Escape:27, Tab:9 }[value];
    await send("Input.dispatchKeyEvent", { type:"keyDown", key:value, code:value, windowsVirtualKeyCode, ...(value === "Enter" ? { text:"\r", unmodifiedText:"\r" } : {}) });
    await send("Input.dispatchKeyEvent", { type:"keyUp", key:value, code:value, windowsVirtualKeyCode });
  };
  const checkCard = async label => {
    const result = await evaluate(`(() => {
      const card = document.querySelector('.subject-card--ict');
      const rect = element => { const r=element.getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}; };
      const selectors = ['h2','[data-subject-action]','.subject-card__progress-heading','.subject-card__progress-track','[data-subject-solved]','[data-subject-review]','.subject-card__analytics>span:first-child .subject-card__metric-copy','.subject-card__analytics>span:last-child .subject-card__metric-copy'];
      return {card:rect(card),items:selectors.map(selector => {
        const element=card.querySelector(selector), range=document.createRange(); range.selectNodeContents(element);
        return {selector,rect:rect(element),text:rect(range),visible:getComputedStyle(element).visibility!=='hidden'};
      }),arrow:card.querySelector('.subject-card__action-arrow')?.textContent,action:card.querySelector('[data-subject-action]').textContent,scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,overflow:[...document.querySelectorAll('body *')].map(element=>({element:element.tagName+'.'+element.className,right:element.getBoundingClientRect().right,left:element.getBoundingClientRect().left})).filter(item=>item.right>innerWidth+1||item.left < -1).slice(0,12)};
    })()`);
    for (const item of result.items) {
      assert.ok(item.visible, `${label}: ${item.selector} is visible`);
      for (const rect of [item.rect,item.text]) {
        assert.ok(rect.left >= result.card.left - 1 && rect.right <= result.card.right + 1, `${label}: ${item.selector} stays inside the card horizontally: ${JSON.stringify(result)}`);
        assert.ok(rect.top >= result.card.top - 1 && rect.bottom <= result.card.bottom + 1, `${label}: ${item.selector} stays inside the card vertically`);
      }
    }
    assert.equal(result.arrow, "←", `${label}: action updates retain the arrow`);
    assert.ok(result.scrollWidth <= result.viewport + 1, `${label}: no horizontal page overflow: ${JSON.stringify(result.overflow)}`);
    return result;
  };
  const checkSubjectGrid = async label => {
    const result = await evaluate(`(() => {
      const map=document.querySelector('.subject-map'),cards=[...map.querySelectorAll(':scope>.subject-card')];
      const mapRect=map.getBoundingClientRect();
      return {columns:getComputedStyle(map).gridTemplateColumns.split(' ').length,map:{left:mapRect.left,right:mapRect.right},cards:cards.map(card=>({subject:card.dataset.subject,left:card.getBoundingClientRect().left,right:card.getBoundingClientRect().right,top:card.getBoundingClientRect().top}))};
    })()`);
    assert.equal(result.columns, 2, `${label}: subjects use two columns`);
    assert.ok(Math.abs(result.cards[0].left-result.map.left) <= 1 && Math.abs(result.cards[0].right-result.map.right) <= 1, `${label}: ICT spans the full row`);
    const subjects=result.cards.slice(1);
    for (let index=0; index<subjects.length; index+=2) {
      const row=subjects.slice(index,index+2);
      if (row.length === 2) assert.ok(Math.abs(row[0].top-row[1].top) <= 1, `${label}: each pair shares a row`);
    }
    return result;
  };
  const checkNavigation = async label => {
    const result = await evaluate(`(() => {
      const buttons=[...document.querySelectorAll('.nav-item'),...document.querySelectorAll(document.body.dataset.accountType==='guest'?'.topbar-auth-guest button':'[data-auth-sign-out]')];
      return buttons.map(button=>{const r=button.getBoundingClientRect();const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {name:button.getAttribute('aria-label')||button.textContent.trim(),width:r.width,height:r.height,left:r.left,right:r.right,top:r.top,bottom:r.bottom,hit:hit===button||button.contains(hit),current:button.getAttribute('aria-current'),page:button.dataset.page};});
    })()`);
    for (const button of result) {
      assert.ok(button.name, `${label}: each navigation/account action has a name`);
      assert.ok(button.width >= 44 && button.height >= 44, `${label}: ${button.name} has a 44px target: ${JSON.stringify(button)}`);
      assert.ok(button.hit, `${label}: ${button.name} can be hit at its center: ${JSON.stringify(button)}`);
    }
    assert.equal(result.find(button => button.page === "learn").current, "page");
    return result;
  };
  const checkHeaderResources = async label => {
    const result = await evaluate(`(() => {
      const rect=element=>{const r=element.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
      return {viewport:innerWidth,signOut:rect(document.querySelector('[data-auth-sign-out]')),resources:[...document.querySelectorAll('.nav-resource')].map(element=>({rect:rect(element),source:element.querySelector('img').getAttribute('src'),image:rect(element.querySelector('img')),text:element.textContent.trim(),color:getComputedStyle(element).color}))};
    })()`);
    assert.deepEqual(result.resources.map(resource => resource.source), ["assets/icons/nav-gem.svg","assets/icons/nav-heart.svg","assets/icons/streak-freeze.svg"], `${label}: all three navigation SVGs are present`);
    assert.deepEqual(result.resources.slice(0,2).map(resource => resource.text), ["0","0"], `${label}: gem and heart balances start at zero`);
    assert.deepEqual(result.resources.slice(0,2).map(resource => resource.color), ["rgb(28, 176, 246)","rgb(255, 75, 75)"], `${label}: balance text matches its SVG color`);
    for (const resource of result.resources) {
      assert.ok(resource.image.width >= 28 && resource.image.height >= 28, `${label}: the original resource artwork is visible`);
      assert.ok(resource.rect.left >= 0 && resource.rect.right <= result.viewport, `${label}: the resource stays inside the viewport`);
      const overlap = resource.rect.left < result.signOut.right && resource.rect.right > result.signOut.left && resource.rect.top < result.signOut.bottom && resource.rect.bottom > result.signOut.top;
      assert.equal(overlap, false, `${label}: navigation artwork and the account action do not overlap: ${JSON.stringify(result)}`);
    }
    return result;
  };

  await send("Emulation.setEmulatedMedia", { features:[{ name:"prefers-reduced-motion", value:"reduce" }] });
  await navigate(base + "?page=learn");
  await homeReady();
  await evaluate("document.fonts.ready");
  for (const width of widths) {
    await viewport(width);
    await evaluate("scrollTo(0,0)");
    const card = await checkCard(`guest ${width}`);
    await checkSubjectGrid(`guest ${width}`);
    const navigation = await checkNavigation(`guest ${width}`);
    evidence.widths.push({ account:"guest", width, card, navigation });
    if ([320,390].includes(width)) await screenshot(`guest-home-after-${width}.png`);
  }
  assert.equal(await evaluate("document.querySelector('.nav-resources').getBoundingClientRect().height"), 0, "Guest shell has no sample resource balances");

  const register = async username => {
    const result = await evaluate(`fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:${JSON.stringify(username)},email:${JSON.stringify(username + "@example.test")},password:'Learning123',curriculum:'gaza',path:'scientific'})}).then(async response=>({status:response.status,body:await response.json()}))`);
    assert.equal(result.status, 201, JSON.stringify(result));
    await navigate(base + "?page=learn");
    await homeReady();
    await waitFor("document.body.dataset.accountType === 'free' && !document.querySelector('[data-learner-streak-freeze]')?.hidden");
    await waitFor("[...document.querySelectorAll('.nav-resources img')].every(image=>image.complete && image.naturalWidth>0)");
    await evaluate("document.fonts.ready");
    return result.body.account;
  };
  const account = await register("LayoutLearner");
  const initialXp = await evaluate("document.querySelector('.dashboard-progress bdi').textContent");
  for (const width of widths) {
    await viewport(width);
    await evaluate("scrollTo(0,0)");
    const card = await checkCard(`member ${width}`);
    await checkSubjectGrid(`member ${width}`);
    const navigation = await checkNavigation(`member ${width}`);
    const resources = await checkHeaderResources(`member ${width}`);
    assert.equal(card.action, "ابدأ من خريطة الدروس");
    evidence.widths.push({ account:"member", width, card, navigation, resources });
    if (width === 390) {
      const bounds = await evaluate("import('/src/ui/app-shell.js').then(module=>module.getShellViewportBounds())");
      assert.ok(card.items[1].rect.bottom < bounds.bottom, "Fresh learner sees the ICT action in the first usable viewport");
    }
    if ([320,390,761,1280,1440].includes(width)) await screenshot(`member-home-after-${width}.png`);
  }
  await send("DOM.enable");
  await send("CSS.enable");
  const { root } = await send("DOM.getDocument");
  const { nodeId } = await send("DOM.querySelector", { nodeId:root.nodeId, selector:".subject-card--ict h2" });
  evidence.fonts = (await send("CSS.getPlatformFontsForNode", { nodeId })).fonts;
  assert.ok(evidence.fonts.some(font => font.familyName.includes("Noto Sans Arabic")), "The supplied Arabic UI font is actually rendered");
  const expectedFills = {
    mathematics:"rgb(255, 204, 0)", "mathematics-2":"rgb(255, 204, 0)", physics:"rgb(166, 107, 255)", biology:"rgb(88, 204, 2)", chemistry:"rgb(255, 120, 79)",
    ict:"rgb(10, 175, 255)", english:"rgb(255, 92, 159)", arabic:"rgb(255, 159, 26)", "islamic-education":"rgb(13, 204, 170)",
    level:"rgb(255, 202, 40)", streak:"rgb(255, 133, 51)",
  };
  evidence.colors = await evaluate(`(() => {
    return [...document.querySelectorAll('.subject-card'),...document.querySelectorAll('.dashboard-stat')].map(element=>({
      name:element.dataset.subject || (element.classList.contains('dashboard-stat--level')?'level':'streak'),
      background:getComputedStyle(element).backgroundColor,
      color:getComputedStyle(element.querySelector('h2,.dashboard-stat__heading strong')).color,
    }));
  })()`);
  for (const card of evidence.colors) {
    assert.equal(card.background, expectedFills[card.name], `${card.name}: the original vibrant fill is preserved`);
    assert.equal(card.color, "rgb(255, 255, 255)", `${card.name}: colored cards retain the requested white text`);
  }
  evidence.contrast = await evaluate(`(() => {
    const channel=value=>{value/=255;return value<=.04045?value/12.92:((value+.055)/1.055)**2.4};
    const luminance=color=>{const values=color.match(/[\\d.]+/g).slice(0,3).map(Number).map(channel);return values[0]*.2126+values[1]*.7152+values[2]*.0722};
    return ['.subject-card--ict h2','.subject-card__eyebrow','.dashboard-stat--level .dashboard-stat__heading>span','.dashboard-stat--streak .dashboard-stat__heading>span'].map(selector=>{
      const element=document.querySelector(selector),color=getComputedStyle(element).color;
      let parent=element,background;while(parent){background=getComputedStyle(parent).backgroundColor;if(background!=='rgba(0, 0, 0, 0)'&&background!=='transparent')break;parent=parent.parentElement;}
      const a=luminance(color),b=luminance(background);return {selector,color,background,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
    });
  })()`);
  // Record contrast honestly: the user explicitly chose the original bright fills with white text.

  for (const width of [320,761,1280]) {
    await viewport(width);
    await evaluate(`window.layoutText=[...document.querySelectorAll('.subject-card--ict h2,[data-subject-solved],[data-subject-review]')].map(element=>[element,element.textContent]);layoutText[0][0].textContent='تكنولوجيا المعلومات وتطبيقاتها في حياتنا اليومية';layoutText[1][0].textContent='999999999';layoutText[2][0].textContent='999999999';document.querySelector('#learner-dashboard-title bdi').textContent='متعلم باسم عربي طويل لاختبار التفاف النص';`);
    await settleLayout();
    evidence.stress.push({ width, kind:"long labels and counts", card:await checkCard(`long copy ${width}`) });
    await evaluate("layoutText.forEach(([element,text])=>element.textContent=text)");
  }
  await viewport(720,450,2);
  evidence.stress.push({ kind:"200 percent desktop zoom equivalent", card:await checkCard("200 percent layout") });
  await viewport(390);

  const savePart = async complete => {
    const result = await evaluate(`(async()=>{
      const {loadSubjectLessonPart}=await import('/src/data/lessons/subject-lesson-registry.js');
      const part=await loadSubjectLessonPart('ict','database-management','access-basics');
      const completedStepIds=part.steps.map(step=>step.id).slice(0,${complete ? "undefined" : "1"});
      const response=await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json','X-Progress-Owner':${JSON.stringify("account:" + account.id)}},body:JSON.stringify({id:crypto.randomUUID(),type:'completion',subjectId:'ict',lessonId:'database-management',partId:'access-basics',completedStepIds,isComplete:${complete}})});
      document.dispatchEvent(new Event('visibilitychange'));
      return {status:response.status,body:await response.json()};
    })()`);
    assert.equal(result.status, 200, JSON.stringify(result));
  };
  await savePart(false);
  await waitFor("document.querySelector('[data-subject-action]').textContent==='تابع من خريطة الدروس'");
  await checkCard("partial progress subscription");
  await savePart(true);
  await waitFor("document.querySelector('.dashboard-progress bdi').textContent.startsWith('10 /')");
  await savePart(true);
  assert.equal(await evaluate("document.querySelector('.dashboard-progress bdi').textContent"), initialXp.replace(/^0 /,"10 "), "Repeated completion does not duplicate Home XP");
  assert.equal(await evaluate("document.querySelector('[data-learner-streak-freeze] bdi').textContent"), "0", "Header shows the learner's available streak freezes");
  await evaluate("scrollTo(0,0)");
  const resumed = await checkCard("returning learner");
  const bounds = await evaluate("import('/src/ui/app-shell.js').then(module=>module.getShellViewportBounds())");
  assert.ok(resumed.items[1].rect.bottom < bounds.bottom, "Returning learner sees the map continuation in the first usable viewport");

  await evaluate("document.querySelector('[data-auth-sign-out]').focus()");
  await key("Enter");
  await waitFor("document.body.dataset.accountType==='guest'");
  assert.equal(await evaluate("document.querySelector('[data-learner-streak-freeze]').hidden"), true);
  await register("OtherLayoutLearner");
  assert.equal(await evaluate("document.querySelector('.dashboard-progress bdi').textContent"), initialXp, "Account switch shows the new account's progress");
  await evaluate("document.querySelector('[data-auth-sign-out]').click()");
  await waitFor("document.body.dataset.accountType==='guest'");
  const signedIn = await evaluate("fetch('/api/auth/sign-in',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({identifier:'LayoutLearner',password:'Learning123'})}).then(response=>response.status)");
  assert.equal(signedIn, 200);
  await navigate(base + "?page=learn");
  await homeReady();
  await waitFor("document.querySelector('.dashboard-progress bdi')?.textContent.startsWith('10 /')");
  await checkCard("reload restored member");

  // Failed font requests exercise the documented platform fallback without changing account data.
  await send("Network.setCacheDisabled", { cacheDisabled:true });
  await send("Network.setBlockedURLs", { urls:["*assets/fonts/*","*fonts.googleapis.com*","*fonts.gstatic.com*"] });
  await reload();
  await homeReady();
  evidence.stress.push({ kind:"blocked font fallback", card:await checkCard("blocked Arabic font") });
  await evaluate("document.fonts.ready");
  const fallbackDocument = await send("DOM.getDocument");
  const fallbackNode = await send("DOM.querySelector", { nodeId:fallbackDocument.root.nodeId, selector:".subject-card--ict h2" });
  evidence.fallbackFonts = (await send("CSS.getPlatformFontsForNode", { nodeId:fallbackNode.nodeId })).fonts;
  await screenshot("member-home-after-font-blocked-390.png");
  await send("Network.setBlockedURLs", { urls:["*fonts.googleapis.com*","*fonts.gstatic.com*"] });
  await send("Network.setCacheDisabled", { cacheDisabled:false });
  await reload();
  await homeReady();

  const popupGeometry = async label => {
    // Opening/scrolling schedules placement for the next frame. Measure the
    // painted position, keeping the same bounds and hit-testing assertions.
    await settleLayout();
    const result = await evaluate(`(async()=>{
      const {getShellViewportBounds}=await import('/src/ui/app-shell.js');
      const bubble=document.querySelector('[data-roadmap-bubble]:not([hidden])');
      const rect=element=>{const r=element.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
      const buttons=[...bubble.querySelectorAll('button')].filter(button=>!button.hidden);
      return {bounds:getShellViewportBounds(),bubble:rect(bubble),scrollable:bubble.querySelector('.roadmap-bubble-copy').scrollHeight>bubble.querySelector('.roadmap-bubble-copy').clientHeight,buttons:buttons.map(button=>({text:button.textContent,rect:rect(button),hits:[[.5,.5],[.1,.1],[.9,.9]].map(([x,y])=>{const r=button.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width*x,r.top+r.height*y);return hit===button||button.contains(hit);})}))};
    })()`);
    assert.ok(result.bubble.top >= result.bounds.top - 1 && result.bubble.bottom <= result.bounds.bottom + 1, `${label}: popup is within usable vertical bounds: ${JSON.stringify(result)}`);
    assert.ok(result.bubble.left >= result.bounds.left - 1 && result.bubble.right <= result.bounds.right + 1, `${label}: popup is within usable horizontal bounds`);
    for (const button of result.buttons) assert.ok(button.hits.every(Boolean), `${label}: ${button.text} stays reachable at its center and edges: ${JSON.stringify(result)}`);
    evidence.popups.push({ label,...result });
    return result;
  };
  // Keep one mounted roadmap across orientation changes; route reloads have their own probe.
  await navigate(base + "?subject=ict");
  await waitFor("document.querySelector('[data-roadmap-part]')");
  await evaluate("document.fonts.ready");
  for (const [width,height] of [[390,844],[760,390],[844,390]]) {
    await viewport(width,height);
    for (const id of ["getting-started","access-basics","tables-and-types","keys-and-relations"]) {
      const opened = await evaluate(`(()=>{const button=[...document.querySelectorAll('[data-roadmap-part]')].find(button=>button.dataset.roadmapPart===${JSON.stringify(id)});if(!button)return false;button.scrollIntoView({block:'center',behavior:'instant'});button.click();return true;})()`);
      assert.ok(opened, `Published test part ${id} exists`);
      await waitFor("document.querySelector('[data-roadmap-bubble]:not([hidden])')");
      await popupGeometry(`${width}x${height} ${id}`);
      let expectedFocus = id;
      if (id === "keys-and-relations") {
        await evaluate("document.querySelector('[data-bubble-start]').click()");
        await waitFor("document.querySelector('[data-roadmap-part=\"tables-and-types\"]').getAttribute('aria-expanded')==='true'");
        await popupGeometry(`${width}x${height} previous-part action`);
        expectedFocus = "tables-and-types";
      }
      await key("Escape");
      assert.equal(await evaluate("document.activeElement.dataset.roadmapPart"), expectedFocus, "Escape returns focus to the opened node");
    }
    await evaluate(`(()=>{const button=[...document.querySelectorAll('[data-roadmap-part]')].at(-1);button.scrollIntoView({block:'center',behavior:'instant'});button.dataset.lessonLabel='جزء ذو عنوان عربي طويل '.repeat(18);button.click()})()`);
    await waitFor("document.querySelector('[data-roadmap-bubble]:not([hidden])')");
    const long = await popupGeometry(`${width}x${height} long unpublished`);
    if (height === 390) assert.ok(long.scrollable, "Long popup copy scrolls while actions remain visible");
    await screenshot(`roadmap-popup-after-${width}x${height}.png`);
    await key("Escape");
  }
  await viewport(390,844);
  await evaluate(`(async()=>{
    const {mountSubjectRoadmap}=await import('/src/ui/subject-roadmap.js');
    const {getSubjectRoadmap}=await import('/src/data/subject-roadmaps.js');
    const host=document.createElement('div');document.querySelector('#lesson-content').replaceChildren(host);
    window.accountGateCalls=[];
    window.layoutRoadmap=mountSubjectRoadmap({container:host,roadmap:getSubjectRoadmap('ict'),isLessonLocked:()=>true,onRequireAccount:flow=>accountGateCalls.push(flow)});
    layoutRoadmap.openPart({lessonId:'course-introduction',partId:'getting-started'});
  })()`);
  await popupGeometry("390x844 account required");
  await evaluate("document.querySelector('[data-bubble-start]').click();document.querySelector('[data-bubble-sign-in]').click()");
  assert.deepEqual(await evaluate("accountGateCalls"), ["register","sign-in"]);
  await key("Escape");
  assert.equal(await evaluate("document.activeElement.dataset.roadmapPart"), "getting-started");
  await evaluate("layoutRoadmap.openPart({lessonId:'database-management',partId:'access-basics'});layoutRoadmap.destroy();document.querySelector('[data-page=learn]').click()");
  await homeReady();
  assert.equal(await evaluate("Boolean(document.querySelector('[data-roadmap-bubble]:not([hidden])'))"), false, "Navigation/disposal cancels pending popup placement");
  await viewport(844,390);
  await evaluate("document.querySelector('[data-auth-sign-out]').focus()");
  const shortAccount = await evaluate(`(()=>{const button=document.querySelector('[data-auth-sign-out]'),r=button.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {top:r.top,bottom:r.bottom,hit:hit===button||button.contains(hit),sidebarScroll:document.querySelector('.topbar').scrollTop};})()`);
  assert.ok(shortAccount.top >= 0 && shortAccount.bottom <= 390 && shortAccount.hit, "Keyboard focus reveals reachable sign-out in a short sidebar");
  evidence.shortAccount = shortAccount;
  await key("Enter");
  await waitFor("document.body.dataset.accountType==='guest'");
});
await writeFile(path.join(output, "home-layout-measurements.json"), JSON.stringify(evidence, null, 2));
console.log("Home/shell browser checks passed: all widths, actual card contents, fonts/fallback, large text/counts, account/progress updates, keyboard sign-out, and measured popup hit tests.");
