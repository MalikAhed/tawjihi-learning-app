import { loadSubjectLessonPart } from "../data/lessons/subject-lesson-registry.js";
import { hasJsonContentType, sendJson } from "./http.mjs";
import { getSessionToken, isCrossSiteRequest } from "./auth-api.mjs";

export function createProgressApi({accountStore,readJsonBody,originPolicy=isCrossSiteRequest}) {
  return async (request,response) => {
    if(originPolicy(request)) {sendJson(response,403,{error:'Invalid request origin.'});return;}
    const account=accountStore.getAccountForSession(getSessionToken(request));
    if(!account||account.accountType==='banned') {sendJson(response,401,{error:'Sign in to save progress.'});return;}
    // A stale tab must not attach its queued work to a newly signed-in account.
    if(request.headers['x-progress-owner']!==`account:${account.id}`) {sendJson(response,409,{error:'The active account changed.'});return;}
    if(request.method==='GET') {sendJson(response,200,{accountId:account.id,records:accountStore.progress.read(account.id)});return;}
    if(request.method!=='POST') {response.writeHead(405,{Allow:'GET, POST'}).end();return;}
    if(!hasJsonContentType(request)) {sendJson(response,415,{error:'JSON is required.'});return;}
    try {
      const body=await readJsonBody(request);
      const fields=['id','type','subjectId','lessonId','partId','completedStepIds','isComplete','stepId','correct','reviewing','revision','date','review'];
      if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(key=>!fields.includes(key))
        ||typeof body.id!=='string'||body.id.length<8||body.id.length>240||!['completion','answer','import'].includes(body.type)
        ||!['subjectId','lessonId','partId'].every(key=>typeof body[key]==='string'&&body[key].length<=120)) throw Object.assign(new Error('Invalid progress update.'),{status:422});
      const lesson=await loadSubjectLessonPart(body.subjectId,body.lessonId,body.partId);
      if(!lesson||lesson.status!=='published') throw Object.assign(new Error('Unknown published part.'),{status:422});
      const stepIds=lesson.steps.map(step=>step.id);
      if(body.type==='answer') {
        if(!stepIds.includes(body.stepId)||typeof body.correct!=='boolean'||(body.reviewing!==undefined&&typeof body.reviewing!=='boolean')
          ||(body.revision!==undefined&&(!Number.isSafeInteger(body.revision)||body.revision<0))) throw Object.assign(new Error('Invalid answer update.'),{status:422});
      } else if(!Array.isArray(body.completedStepIds)||body.completedStepIds.length>stepIds.length||body.completedStepIds.some(id=>!stepIds.includes(id))||typeof body.isComplete!=='boolean') {
        throw Object.assign(new Error('Invalid completed steps.'),{status:422});
      }
      if(body.date!==undefined && (body.type!=='import'||typeof body.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(body.date)||Number.isNaN(Date.parse(body.date))||new Date(body.date).toISOString().slice(0,10)!==body.date||body.date>new Date().toISOString().slice(0,10))) throw Object.assign(new Error('Invalid completion date.'),{status:422});
      if(body.review!==undefined&&(body.type!=='import'||!Array.isArray(body.review)||body.review.length>stepIds.length)) throw Object.assign(new Error('Invalid imported review.'),{status:422});
      accountStore.progress.update(account.id,body,stepIds);
      sendJson(response,200,{accountId:account.id,records:accountStore.progress.read(account.id)});
    }catch(error){sendJson(response,error.code==='ETOOBIG'?413:error instanceof SyntaxError?400:error.status||500,{error:error.status?error.message:'Progress could not be saved.'});}
  };
}
