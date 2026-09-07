import { preloadImages } from "../media-ready.js";
import { renderMarkdownDocument } from "../../markdown/renderer.js";

export function preloadNextStep(step) {
  if (step?.type !== "markdown") return;
  const template = document.createElement("template");
  template.innerHTML = renderMarkdownDocument(step.source);
  preloadImages(
    [...template.content.querySelectorAll("img")].map((image) =>
      image.getAttribute("src"),
    ),
  );
}
