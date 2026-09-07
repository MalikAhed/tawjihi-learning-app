import { mkdir, writeFile } from 'node:fs/promises';
import { cpus, platform, release } from 'node:os';
import { withBrowserPage } from './browser-page.mjs';
import { startPreviewServer } from './preview-server.mjs';

const host=await startPreviewServer();
const measurements=[];
let browserVersion;
try {
  await withBrowserPage(async({base,cdp,send,evaluate,waitFor,onEvent})=>{
    browserVersion=await cdp.send("Browser.getVersion");
    const completed=[];
    const requests=new Map();
    onEvent(({method,params})=>{
      if(method==='Network.requestWillBeSent')requests.set(params.requestId,params.request.url);
      if(method==='Network.loadingFinished')completed.push({url:requests.get(params.requestId),bytes:params.encodedDataLength});
    });
    await send('Performance.enable');
    await send('Emulation.setCPUThrottlingRate',{rate:4});
    await send('Network.emulateNetworkConditions',{offline:false,latency:100,downloadThroughput:1.6*1000*1000/8,uploadThroughput:750*1000/8,connectionType:'cellular4g'});
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    await send('Page.addScriptToEvaluateOnNewDocument',{source:`window.measuredShift=0;new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.measuredShift+=entry.value;}).observe({type:'layout-shift',buffered:true});`});
    const measure=async(name,width,action,predicate)=>{
      const first=completed.length;
      const initialShift=await evaluate('window.measuredShift||0');
      const origin=await evaluate('performance.timeOrigin');
      const start=performance.now();
      await action();
      // The deliberately throttled cold entry exceeded the normal 15s test bound.
      await waitFor(`(${predicate}) && !document.querySelector('.media-pending,[aria-busy=true]')`,{timeoutMs:60000});
      const readyMs=Math.round(performance.now()-start);
      console.log(`Measured ${width}px ${name}: ready in ${readyMs} ms`);
      const resources=completed.slice(first).filter(item=>item.url?.startsWith(base));
      measurements.push({name,width,readyMs,transferredBytes:resources.reduce((sum,item)=>sum+item.bytes,0),requests:resources.length,layoutShift:await evaluate(`Math.max(0,(window.measuredShift||0)-(performance.timeOrigin===${origin}?${initialShift}:0))`),largest:resources.sort((a,b)=>b.bytes-a.bytes).slice(0,5).map(item=>({path:item.url.slice(base.length),bytes:item.bytes}))});
    };
    for(const width of [390,1440]) {
      await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
      await send('Network.clearBrowserCache');
      // Each viewport starts from the same fresh, disposable guest session.
      await evaluate("if(location.protocol.startsWith('http'))sessionStorage.clear()");
      const navigate=async(route)=>{const origin=await evaluate('performance.timeOrigin');await send('Page.navigate',{url:base+route});await waitFor(`performance.timeOrigin!==${origin}`);};
      await measure('cold entry',width,()=>navigate(''),"document.querySelector('.visitor-landing')");
      await measure('warm entry',width,()=>navigate(''),"document.querySelector('.visitor-landing')");
      await measure('Home',width,()=>navigate('?page=learn'),"document.querySelector('.subject-map')");
      await evaluate("document.querySelector('[data-subject=ict]').click()");
      await waitFor("document.querySelector('[data-roadmap-part=getting-started]')");
      await measure('lesson opening',width,()=>evaluate("document.querySelector('[data-roadmap-part=getting-started]').click();document.querySelector('[data-bubble-start]').click()"),"document.querySelector('[data-live-authored-step]')");
      await measure('next step',width,()=>evaluate("document.querySelector('[data-template-primary]').click()"),"document.querySelector('[data-lesson-step=watch-introduction-together]')");
      await measure('return navigation',width,()=>evaluate("document.querySelector('.lesson-back').click()"),"document.querySelector('.subject-roadmap')");
    }
    await send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
    await send('Emulation.setCPUThrottlingRate',{rate:1});
    const heap=async()=>{await send('HeapProfiler.collectGarbage');return (await send('Performance.getMetrics')).metrics.find(metric=>metric.name==='JSHeapUsedSize').value;};
    // Warm the exact cycle before retaining the baseline so lazy module loads are not counted as leaks.
    const before=await heap();
    let halfway;
    for(let index=0;index<20;index++) {
      await evaluate("document.querySelector('[data-roadmap-part=getting-started]').click();document.querySelector('[data-bubble-start]').click()");
      await waitFor("document.querySelector('[data-live-authored-step]') && !document.querySelector('.media-pending')");
      await evaluate("document.querySelector('.lesson-back').click()");
      await waitFor("document.querySelector('.subject-roadmap')");
      if(index===9)halfway=await heap();
    }
    measurements.push({name:'retained memory after 20 lesson/roadmap cycles',beforeBytes:before,afterTenCyclesBytes:halfway,afterBytes:await heap()});
  },{baseUrl:host.base});
}finally{await host.close();}
const report={recordedAt:new Date().toISOString(),mode:'packaged fixture',externalDisplayFonts:'blocked for repeatability; self-hosted Arabic fonts included',browserVersion,machine:{platform:platform(),release:release(),cpu:cpus()[0].model,node:process.version},throttling:{cpuRate:4,latencyMs:100,downloadMbps:1.6,uploadKbps:750},measurements};
await mkdir('artifacts',{recursive:true});await writeFile('artifacts/browser-performance.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
