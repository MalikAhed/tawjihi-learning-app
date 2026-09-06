import { sendJson } from "./http.mjs";

export function handleDeveloperReset(request, response, store) {
  const peer = request.socket.remoteAddress;
  const localPeer = ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(peer);
  let localHost = false;
  let sameOrigin = false;
  try {
    const hostUrl = new URL(`http://${request.headers.host}`);
    localHost = ["localhost", "127.0.0.1", "[::1]"].includes(hostUrl.hostname);
    const origin = new URL(request.headers.origin);
    sameOrigin = origin.host === hostUrl.host && ["http:", "https:"].includes(origin.protocol);
  } catch { /* Reject malformed or missing origin. */ }
  if (!localPeer || !localHost || !sameOrigin || request.headers["x-developer-reset"] !== "confirm") {
    sendJson(response, 403, { error:"Local developer access required." });
    return;
  }
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error:"POST required." });
    return;
  }
  try {
    store.resetDevelopmentData();
    sendJson(response, 200, { ok:true });
  } catch {
    sendJson(response, 500, { error:"Could not reset the local database." });
  }
}
