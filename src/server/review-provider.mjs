import { parseCliReview } from "./explanation-review.mjs";

// A hosted provider implements this small JSON contract. Credentials stay server-side.
export function createHttpReviewProvider({ url, token, fetchImpl = globalThis.fetch }) {
  const endpoint=new URL(url);
  if(!['http:','https:'].includes(endpoint.protocol))throw new Error('Review provider must use HTTP(S).');
  return async ({answer,content,signal})=>{
    const response=await fetchImpl(endpoint,{method:'POST',signal,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},
      body:JSON.stringify({answer,title:content.title,prompt:content.prompt,rubric:content.rubric,passScore:content.review.passScore})});
    if(!response.ok)throw new Error('Review provider is unavailable.');
    if(!response.body)throw new Error('Review provider returned no data.');
    const reader=response.body.getReader();
    const decoder=new TextDecoder();
    let text='';
    let bytes=0;
    try {
      while(true) {
        const {done,value}=await reader.read();
        if(done)break;
        bytes+=value.byteLength;
        if(bytes>24000)throw new Error('Review provider returned too much data.');
        text+=decoder.decode(value,{stream:true});
      }
      text+=decoder.decode();
    } finally {await reader.cancel().catch(()=>{});}
    return {...parseCliReview(text,content.review.passScore),source:'provider'};
  };
}
