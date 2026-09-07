import path from 'node:path';
import { isIP } from 'node:net';

const normalizeAddress=address=>String(address||'').replace(/^::ffff:/,'');
export function readRuntimeConfig(environment,{root,production=false}) {
  const port=Number(environment.PORT??4173);
  if(!Number.isInteger(port)||port<0||port>65535)throw new Error('PORT must be an integer between 0 and 65535.');
  let publicOrigin=null;
  if(environment.PUBLIC_ORIGIN) {
    const url=new URL(environment.PUBLIC_ORIGIN);
    if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.pathname!=='/'||url.search||url.hash)throw new Error('PUBLIC_ORIGIN must be a plain HTTP(S) origin.');
    if(production&&url.protocol!=='https:'&&!['127.0.0.1','localhost','[::1]'].includes(url.hostname))throw new Error('Hosted PUBLIC_ORIGIN must use HTTPS.');
    publicOrigin=url.origin;
  }
  if(production&&!publicOrigin)throw new Error('Production requires PUBLIC_ORIGIN.');
  if(production&&(!environment.ACCOUNTS_DATABASE_PATH||environment.ACCOUNTS_DATABASE_PATH===':memory:'))throw new Error('Production requires ACCOUNTS_DATABASE_PATH on durable storage.');
  if(production&&!environment.REVIEW_PROVIDER_URL)throw new Error('Production requires a working REVIEW_PROVIDER_URL.');
  if(environment.REVIEW_PROVIDER_URL) {
    const provider=new URL(environment.REVIEW_PROVIDER_URL);
    if(!['http:','https:'].includes(provider.protocol)||provider.username||provider.password)throw new Error('REVIEW_PROVIDER_URL must be an HTTP(S) URL without embedded credentials.');
  }
  const trustedProxies=new Set((environment.TRUSTED_PROXY_ADDRESSES||'').split(',').filter(Boolean).map(value=>normalizeAddress(value.trim())));
  if([...trustedProxies].some(address=>!isIP(address)))throw new Error('TRUSTED_PROXY_ADDRESSES must list explicit IP addresses.');
  return {port,publicOrigin,trustedProxies,secureCookies:publicOrigin?.startsWith('https:')||false,
    databasePath:environment.ACCOUNTS_DATABASE_PATH||path.join(root,'data/accounts.sqlite'),
    reviewUrl:environment.REVIEW_PROVIDER_URL,reviewToken:environment.REVIEW_PROVIDER_TOKEN,
    liveReload:!production&&environment.LIVE_RELOAD!=='0',production};
}

export function createRequestPolicy({publicOrigin,trustedProxies}) {
  const clientAddress=request=>{
    const direct=normalizeAddress(request.socket.remoteAddress);
    const forwarded=request.headers['x-forwarded-for'];
    if(forwarded!==undefined) {
      if(!trustedProxies.has(direct)||typeof forwarded!=='string'||!isIP(forwarded.trim()))throw Object.assign(new Error('Untrusted forwarded client address.'),{status:400});
      return normalizeAddress(forwarded.trim());
    }
    if(request.headers['x-forwarded-proto']&&!trustedProxies.has(direct))throw Object.assign(new Error('Untrusted proxy headers.'),{status:400});
    return direct;
  };
  const rejectOrigin=request=>{
    if(request.headers['sec-fetch-site']==='cross-site')return true;
    if(!request.headers.origin)return false;
    try {return new URL(request.headers.origin).origin!==(publicOrigin||`http://${request.headers.host}`);}
    catch {return true;}
  };
  return {clientAddress,rejectOrigin};
}
