import { registerMarkup } from "../ui/visitor-flow-markup.js";
import { waitForImage } from "../ui/media-ready.js";

const decodedArtwork = new Map();

// Read the actual onboarding markup so changing a choice illustration also
// changes the startup dependencies. Templates never start SVG playback.
export function onboardingSources() {
  const template = document.createElement("template");
  template.innerHTML = registerMarkup();
  const sources = [...template.content.querySelectorAll("img")].map((image) => {
    const alternative = [...(image.closest("picture")?.querySelectorAll("source") || [])]
      .find((source) => !source.media || matchMedia(source.media).matches);
    return alternative?.srcset || image.getAttribute("src");
  });
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
    sources.push("assets/mascot/rocky-password-peek.svg");
  return [...new Set(sources)];
}

export async function fetchStartupAsset(source, signal) {
  // Forward cancellation without requiring AbortSignal.any on older browsers.
  const controller = new AbortController();
  const abort = () => controller.abort(signal.reason);
  if (signal.aborted) abort();
  else signal.addEventListener("abort", abort, { once:true });
  const timer = setTimeout(() => controller.abort(new DOMException("Startup asset timed out", "TimeoutError")), 15000);
  try {
    const response = await fetch(source, { signal:controller.signal, priority:"high" });
    if (!response.ok) throw new Error(`Startup asset failed: ${source}`);
    await response.arrayBuffer();
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", abort);
  }
  if (/\.(png|webp|jpe?g)$/.test(source)) {
    const image = new Image();
    image.src = source;
    await waitForImage(image, { signal });
    decodedArtwork.set(source, image);
  }
}
