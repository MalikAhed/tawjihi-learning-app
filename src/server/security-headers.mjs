const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'self' https://www.youtube-nocookie.com",
  "img-src 'self' data:",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
  "script-src 'self' https://cdn.jsdelivr.net",
  "connect-src 'self'",
].join("; ");

export function applySecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  response.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  response.setHeader("Content-Security-Policy", CONTENT_SECURITY_POLICY);
}

export function applyCodePreviewSecurityHeaders(response, nonce) {
  if (!/^[A-Za-z0-9_-]{16,}$/.test(nonce)) throw new TypeError("A valid code preview nonce is required.");
  // The learner-code runner is framed only by this app and receives an opaque
  // origin from iframe sandboxing. Keep its unsafe-eval permission off the app.
  response.removeHeader("X-Frame-Options");
  response.setHeader("Content-Security-Policy", [
    "default-src 'none'",
    "base-uri 'none'",
    "object-src 'none'",
    "form-action 'none'",
    "frame-ancestors 'self'",
    "img-src data:",
    "style-src 'unsafe-inline'",
    `script-src 'nonce-${nonce}' 'unsafe-eval'`,
    "connect-src 'none'",
  ].join("; "));
}
