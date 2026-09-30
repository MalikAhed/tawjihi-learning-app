export function sendJson(response, status, value, headers = {}) {
  response.writeHead(status, {
    "Content-Type":"application/json; charset=utf-8",
    "Cache-Control":"no-store",
    ...headers,
  }).end(JSON.stringify(value));
}

export async function readJsonBody(request, maximumBytes = 8_192) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += bytes.length;
    if (size > maximumBytes) {
      const error = new Error("Request body is too large.");
      error.code = "ETOOBIG";
      throw error;
    }
    chunks.push(bytes);
  }
  return JSON.parse(Buffer.concat(chunks, size).toString("utf8") || "{}");
}

export function hasJsonContentType(request) {
  return String(request.headers["content-type"] || "").split(";", 1)[0].trim().toLowerCase() === "application/json";
}
