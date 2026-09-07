// Bounds waiting work as well as active provider calls. Deadlines include queue time.
export function createReviewLimiter({ maxConcurrent = 2, maxQueue = 8, timeoutMs = 12000 } = {}) {
  let active=0;
  let closed=false;
  const queue=[];
  const running=new Set();
  const busy=()=>Object.assign(new Error('Review service is busy. Try again shortly.'),{code:'EBUSY'});
  const drain=()=>{
    while(!closed&&active<maxConcurrent&&queue.length) {
      const job=queue.shift();
      if(job.controller.signal.aborted)continue;
      active++;
      running.add(job);
      Promise.resolve().then(()=>job.task(job.controller.signal)).then(job.resolve,job.reject).finally(()=>{
        clearTimeout(job.timer);job.detach();running.delete(job);active--;drain();
      });
    }
  };
  return {
    run(task,{signal}={}) {
      if(closed||signal?.aborted)return Promise.reject(Object.assign(new Error('Review cancelled.'),{code:'ABORT_ERR'}));
      if(active>=maxConcurrent&&queue.length>=maxQueue)return Promise.reject(busy());
      return new Promise((resolve,reject)=>{
        const controller=new AbortController();
        const job={task,controller,resolve,reject,timer:null,detach:()=>signal?.removeEventListener('abort',cancel)};
        const abort=(error)=>{
          controller.abort(error);
          const index=queue.indexOf(job);
          if(index!==-1) {queue.splice(index,1);clearTimeout(job.timer);job.detach();}
          reject(error);
        };
        const cancel=()=>abort(Object.assign(new Error('Review cancelled.'),{code:'ABORT_ERR'}));
        signal?.addEventListener('abort',cancel,{once:true});
        job.timer=setTimeout(()=>abort(Object.assign(new Error('Review deadline exceeded.'),{code:'ETIMEDOUT'})),timeoutMs);
        job.timer.unref?.();
        queue.push(job);drain();
      });
    },
    stats:()=>({active,queued:queue.length,capacity:maxConcurrent,maxQueue}),
    close() {
      closed=true;
      for(const job of [...queue,...running]) {clearTimeout(job.timer);job.detach();job.controller.abort();job.reject(Object.assign(new Error('Review service is closing.'),{code:'ABORT_ERR'}));}
      queue.length=0;
    },
  };
}
