// Shared entrance for every navigation surface. Keep DOM updates synchronous so
// rapid navigation cannot commit an older screen after a newer selection.
const active = new Map();
export const VIEW_TRANSITION_MS = 280;

export function animateView(element) {
  if (!element) return;
  for (const [target, animation] of active) {
    if (target === element || element.contains?.(target)) {
      animation.cancel();
      active.delete(target);
    }
  }
  if (typeof element.animate !== "function" || globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const animation = element.animate([{ opacity:0, translate:"0 8px" }, { opacity:1, translate:"0 0" }], {
    duration:VIEW_TRANSITION_MS, easing:"cubic-bezier(.22, 1, .36, 1)",
  });
  active.set(element, animation);
  const release = () => { if (active.get(element) === animation) active.delete(element); };
  animation.finished.then(release, release);
}

// A preference change also stops motion already in progress.
globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").addEventListener?.("change", (event) => {
  if (!event.matches) return;
  for (const animation of active.values()) animation.cancel();
  active.clear();
});
