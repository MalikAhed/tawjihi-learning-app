import { loadStylesheet } from "./stylesheet-loader.js";
let designSystemPromise;

export async function loadDesignSystem({ reference = false } = {}) {
  if (!designSystemPromise) {
    designSystemPromise = Promise.all([
      import("./design-system-view.js"),
      loadStylesheet("src/styles/design-system.css"),
    ]).then(([module]) => module).catch((error) => {
      designSystemPromise = undefined;
      throw error;
    });
  }
  const [module] = await Promise.all([designSystemPromise, reference ? loadStylesheet("src/styles/current-system.css") : null]);
  return module;
}
