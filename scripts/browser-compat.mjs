import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { createFailureDirectory } from "./browser-diagnostics.mjs";
import { platform, release } from "node:os";
import path from "node:path";
import { firefox, webkit } from "playwright";
import { getAvailablePort, waitForServer, terminateProcess } from "./browser-session.mjs";
import { startPreviewServer } from "./preview-server.mjs";

const port = await getAvailablePort();
const server = spawn(process.execPath, ["dev-server.mjs"], { env:{...process.env,PORT:String(port),LIVE_RELOAD:"0",ACCOUNTS_DATABASE_PATH:':memory:'},stdio:'ignore' });
let preview;
try {
  await waitForServer(port);
  preview = await startPreviewServer();
  const engines=process.env.BROWSER_WEBKIT_ONLY === "1" ? {webkit} : {firefox,webkit};
  for (const [engine, browserType] of Object.entries(engines)) {
    let browser;
    try { browser = await browserType.launch({ headless:true }); }
    catch (error) { throw new Error(`Cannot start ${engine}. Install prerequisites with: npx playwright install --with-deps firefox webkit`, {cause:error}); }
    try {
      console.log(`Compatibility: ${engine} ${browser.version()} on ${platform()} ${release()}; WebKit engine coverage, not a physical iPhone test.`);
      for (const [mode, base] of [["http",`http://127.0.0.1:${port}/`],["fixture",preview.base]]) {
        const context = await browser.newContext({ viewport:{width:390,height:844}, reducedMotion:'reduce' });
        await context.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
        const page = await context.newPage();
        // Keep Playwright's normal 30s bound. On this Celeron, 15s expired
        // during concurrent checks even though the failure capture showed a ready Home.
        page.setDefaultTimeout(30000);
        const errors = [];
        const pendingRequests = new Map();
        let inspectedPage = page;
        let releaseHeldRequest = () => {};
        context.on('request', request => pendingRequests.set(request, Date.now()));
        context.on('requestfinished', request => pendingRequests.delete(request));
        context.on('requestfailed', request => {
          pendingRequests.delete(request);
          if (request.url().startsWith(base) && !request.failure()?.errorText.includes('ABORTED')) errors.push(request.failure()?.errorText + ': ' + new URL(request.url()).pathname);
        });
        page.on('response', response => { if(response.url().startsWith(base) && response.status()>=400)errors.push(`${response.status()}: ${new URL(response.url()).pathname}`); });
        page.on('pageerror', error => errors.push(error.message));
        let journey = 'guest entry and trial';
        const ready = async () => { await page.waitForFunction(() => !document.querySelector('.media-pending,[aria-busy=true],.app-loading')); };
        const visit = async (route) => { await page.goto(base+route,{waitUntil:'domcontentloaded'}); await page.locator('.visitor-shell,.course-units').first().waitFor({state:'attached'}); await ready(); };
        const openIntro = async () => {
          await page.locator('[data-subject=ict]').click();
          await page.locator('[data-roadmap-part=getting-started]').click();
          await page.locator('[data-bubble-start]').click();
          await page.locator('[data-live-authored-step]').waitFor();
          await ready();
        };
        const finishIntro = async () => {
          for (let index=0;index<12;index++) {
            await ready();
            if (await page.locator('.subject-completion').count()) return;
            const answer = page.locator('[data-ui-lab-answer=retry]');
            if (await answer.count() && await answer.getAttribute('aria-pressed') !== 'true') { await answer.focus(); await page.keyboard.press('Enter'); }
            await page.locator('[data-template-primary]').focus();
            await page.keyboard.press('Enter');
          }
          throw new Error('Introduction did not complete.');
        };
        const signIn = async (identifier,password) => {
          await visit('?flow=sign-in');
          await page.locator('[name=identifier]').fill(identifier);
          await page.locator('[name=password]').fill(password);
          await page.locator('[data-sign-in-form] [type=submit]').click();
          await page.locator('[data-learner-dashboard]').waitFor();
          await ready();
        };
        try {
          await visit('');
          await page.locator('[data-flow=register]').click();
          await page.locator('[data-guest-start]').click();
          await page.locator('[data-guest-dashboard]').waitFor();
          await openIntro();
          await finishIntro();
          assert.equal(await page.locator('.subject-completion-preview').count(),0);
          console.log(`${engine}/${mode}: ${journey} passed`);

          journey='account registration and sign-in';
          await visit('?flow=register');
          await page.locator('[data-onboarding-step=intro] [data-step-next]').click();
          const name=`compat-${engine}`;
          await page.locator('[name=username]').fill(name);
          await page.locator('[data-onboarding-step="0"] [data-step-next]').click();
          await ready();
          await page.locator('[name=curriculum][value=gaza]').focus();
          await page.keyboard.press('Space');
          assert.equal(await page.locator('[name=curriculum][value=gaza]').isChecked(),true);
          await page.locator('[data-onboarding-step="1"] [data-step-next]').click();
          await ready();
          await page.locator('[name=path][value=scientific]').focus();
          await page.keyboard.press('Space');
          assert.equal(await page.locator('[name=path][value=scientific]').isChecked(),true);
          await page.locator('[data-onboarding-step="2"] [data-step-next]').click();
          await page.locator('[name=email]').fill(`${name}@example.com`);
          await page.locator('[data-onboarding-step="3"] [data-step-next]').click();
          await page.locator('[name=password]').fill('Learn123');
          await page.locator('[data-onboarding-step="4"] [data-step-next]').click();
          await page.locator('[data-skip-submit]').click();
          await page.locator('[data-registration-continue]').click();
          await page.locator('[data-learner-dashboard]').waitFor();
          const signOut = page.locator('[data-auth-sign-out]');
          if(mode==='http') await Promise.all([page.waitForResponse(response=>response.url().endsWith('/api/auth/sign-out') && response.status()===200),signOut.click()]);
          else await signOut.click();
          const identifier=mode==='http'?name:'free';
          await signIn(identifier,'Learn123');
          console.log(`${engine}/${mode}: ${journey} passed`);

          journey='lesson completion and Home consistency';
          await openIntro();
          await finishIntro();
          await page.locator('[data-authored-restart]').click();
          await page.locator('[data-completion-step="1"]').waitFor();
          await ready();
          await page.locator('[data-authored-restart]').click();
          await page.locator('.subject-roadmap').waitFor();
          assert.equal(await page.locator('[data-roadmap-part=getting-started]').getAttribute('data-part-state'),'completed');
          await page.locator('.lesson-back').click();
          await ready();
          await page.waitForFunction(()=>document.querySelector('.dashboard-progress--level')?.getAttribute('aria-valuenow')==='10');
          await page.waitForFunction(()=>document.querySelector('.progress-feedback')?.hidden);
          console.log(`${engine}/${mode}: ${journey} passed`);

          journey='reload and progress isolation';
          await page.reload();
          if(mode==='fixture') await signIn(identifier,'Learn123');
          await page.locator('[data-learner-dashboard]').waitFor();
          assert.equal(await page.locator('.dashboard-progress--level').getAttribute('aria-valuenow'),'10');
          const isolated=await browser.newContext({viewport:{width:320,height:760},reducedMotion:'reduce'});
          await isolated.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
          const other=await isolated.newPage();
          inspectedPage=other;
          await other.goto(base+'?page=learn',{waitUntil:'domcontentloaded'});
          await other.locator('[data-auth-flow=sign-in]').waitFor();
          assert.equal(await other.locator('[data-learner-dashboard]').count(),0);
          await isolated.close();
          inspectedPage=page;
          await page.bringToFront();
          console.log(`${engine}/${mode}: ${journey} passed`);

          journey='keyboard dialog and back navigation';
          await page.locator('[data-subject=ict]').click();
          await page.locator('.subject-roadmap').waitFor();
          await ready();
          const part=page.locator('[data-roadmap-part=access-basics]');
          await part.focus();
          assert.equal(await part.evaluate(element=>element===document.activeElement),true);
          await page.keyboard.press('Enter');
          await page.locator('[data-roadmap-bubble]').waitFor();
          await page.keyboard.press('Tab');
          await page.keyboard.press('Shift+Tab');
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('[data-roadmap-bubble]').isVisible(),false);
          await page.locator('.lesson-back').focus();
          await page.keyboard.press('Enter');
          await page.waitForFunction(()=>!document.querySelector('main').classList.contains('lesson-mode'));
          console.log(`${engine}/${mode}: ${journey} passed`);

          journey='loading cancellation and reduced motion';
          // New page ensures the lesson module is not already in the module cache.
          const loading=await context.newPage();
          inspectedPage=loading;
          await loading.emulateMedia({reducedMotion:'reduce'});
          const held=new Promise(resolve=>{releaseHeldRequest=resolve;});
          await loading.goto(base+'?subject=ict',{waitUntil:'domcontentloaded'});
          await loading.locator('.subject-roadmap').waitFor();
          await loading.waitForFunction(()=>!document.querySelector('.media-pending,[aria-busy=true]'));
          assert.equal(await loading.evaluate(()=>performance.getEntriesByType('resource').some(entry=>entry.name.includes('/src/ui/lesson-view.js'))),false);
          await loading.route('**/src/ui/lesson-view.js',async route=>{await held;await route.continue().catch(()=>{});});
          await loading.locator('[data-roadmap-part=getting-started]').click();
          await loading.locator('[data-bubble-start]').click();
          await loading.locator('[aria-busy=true]').waitFor();
          await loading.locator('.lesson-back').click();
          releaseHeldRequest();
          await loading.locator('.subject-roadmap').waitFor();
          await loading.waitForLoadState('networkidle');
          assert.equal(await loading.locator('[data-live-authored-step]').count(),0);
          assert.equal(await loading.evaluate(()=>document.querySelector('.lesson-view').getAnimations().length),0);
          assert.equal(await loading.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
          await loading.close();
          console.log(`${engine}/${mode}: ${journey} passed`);
          assert.deepEqual(errors,[]);
        } catch(error) {
          const directory=await createFailureDirectory(`compat-${engine}-${mode}`);
          await inspectedPage.screenshot({path:path.join(directory,'failure.png')}).catch(()=>{});
          const actual=await inspectedPage.evaluate(()=>({route:location.pathname+location.search,mode:document.querySelector('meta[name=learn-account-mode]')?.content,focus:document.activeElement?.tagName,pending:[...document.querySelectorAll('.media-pending,[aria-busy=true]')].map(el=>el.className)})).catch(()=>null);
          await writeFile(path.join(directory,'failure.json'),JSON.stringify({engine,mode,journey,actual,viewport:page.viewportSize(),expected:error.message,failures:errors.slice(-20),pending:[...pendingRequests].map(([request,start])=>({path:new URL(request.url()).pathname,ms:Date.now()-start})).slice(-20)},null,2));
          throw new Error(`${engine}/${mode}/${journey}: ${error.message}; evidence: ${directory}`,{cause:error});
        } finally { releaseHeldRequest(); await context.close(); }
      }
    } finally { await browser.close(); }
  }
} finally { await preview?.close();await terminateProcess(server); }
