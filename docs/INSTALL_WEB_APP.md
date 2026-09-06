# Install the web app

The app manifest at `assets/app/manifest.json` provides an Arabic name, standalone window, theme color, and PNG icons for desktop, Android, and iOS. Apple touch metadata is in `index.html`. Icons derive from the existing favicon; regenerate with `node scripts/generate-app-icons.mjs` (requires Chrome).

Serve the app on a stable HTTPS origin for phone installation. `http://localhost:4173` works for desktop development; a LAN HTTP address such as `http://10.0.0.6:4173` does not meet browser PWA installation requirements. ChromeOS port forwarding alone does not enable HTTPS.

- iPhone/iPad: open the HTTPS address in Safari, use Share → Add to Home Screen, and enable Open as Web App if offered.
- Android Chrome: use the browser menu → Install app / Add to Home screen.
- Desktop Chrome/Edge: use the address-bar install icon or browser menu install action.
- macOS Safari: use File → Add to Dock.

This is an online app. There is no service worker or offline lesson cache; installation does not promise offline lessons. Saved source changes continue to use the existing live reload when served by the development server. The server must remain reachable. Installing does not synchronize prototype storage between devices.

Validation: run `node scripts/browser-installability.mjs` while the development server is running. Set `APP_URL` to test another localhost or HTTPS address. The test checks Chrome's parsed manifest and installability errors and decodes each icon at its declared size. Actual OS installation on iPhone/Android must be checked on those devices.
