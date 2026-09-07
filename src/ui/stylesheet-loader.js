const stylesheetPromises = new Map();
export function loadStylesheet(href) {
  if (stylesheetPromises.has(href)) return stylesheetPromises.get(href);
  const promise = new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.lazyStylesheet = "true";
    link.dataset.loadState = "loading";
    link.addEventListener("load", () => {
      link.dataset.loadState = "loaded";
      resolve(link);
    }, { once:true });
    link.addEventListener("error", () => {
      link.dataset.loadState = "error";
      link.remove();
      reject(new Error(`Could not load ${href}`));
    }, { once:true });
    // Keep current shared styles last, independent of which screen loaded first.
    const system = document.querySelector('link[href="src/styles/system.css"]');
    document.head.insertBefore(link, system);
  }).catch((error) => {
    stylesheetPromises.delete(href);
    throw error;
  });
  stylesheetPromises.set(href, promise);
  return promise;
}
