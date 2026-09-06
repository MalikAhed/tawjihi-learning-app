// Registration mascot behavior; the visitor controller owns its lifetime through AbortSignal.
const ROCKY_SHOULDERS = {
  "arm-left": [182, 422],
  "arm-right": [606, 422]
};

function bodyFollowDelta(anchor, origin, pose) {
  const radians = pose.rotation * Math.PI / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const localX = anchor[0] - origin.x;
  const localY = (anchor[1] - origin.y) * pose.scaleY;
  return {
    x: pose.x + cosine * localX - sine * localY - (anchor[0] - origin.x),
    y: pose.y + sine * localX + cosine * localY - (anchor[1] - origin.y)
  };
}

function scopeSvgIds(svg, prefix) {
  const idMap = new Map();
  svg.querySelectorAll("[id]").forEach((element) => {
    const originalId = element.id;
    const scopedId = `${prefix}-${originalId}`;
    idMap.set(originalId, scopedId);
    element.id = scopedId;
  });
  [svg, ...svg.querySelectorAll("*")].forEach((element) => {
    for (const attribute of [...element.attributes]) {
      let value = attribute.value;
      for (const [originalId, scopedId] of idMap) {
        if (value === `#${originalId}`) value = `#${scopedId}`;
        value = value.replaceAll(`url(#${originalId})`, `url(#${scopedId})`);
      }
      if (attribute.name === "aria-labelledby" || attribute.name === "aria-describedby") {
        value = value.split(/\s+/).map((id) => idMap.get(id) ?? id).join(" ");
      }
      if (value !== attribute.value) element.setAttributeNS(attribute.namespaceURI, attribute.name, value);
    }
  });
}

function scopeSvgStyles(svg, className) {
  svg.classList.add(className);
  svg.querySelectorAll("style").forEach((style) => {
    style.textContent = style.textContent.replaceAll("[data-part", `.${className} [data-part`);
  });
}

async function bindRockyPointerTracking(root, signal, documentObject) {
  const mascots = [...root.querySelectorAll("[data-rocky-pointer-track]")];
  const view = documentObject.defaultView;
  if (!mascots.length || !view || view.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  try {
    const response = await view.fetch("assets/mascot/rocky-standing-still.svg", { signal });
    if (!response.ok) return;
    const source = await response.text();
    if (signal.aborted) return;
    for (const [index, mascot] of mascots.entries()) {
      const parsed = new view.DOMParser().parseFromString(source, "image/svg+xml");
      const svg = parsed.documentElement;
      if (svg.localName !== "svg" || parsed.querySelector("parsererror")) continue;
      svg.querySelectorAll("script,foreignObject").forEach((node) => node.remove());
      scopeSvgIds(svg, `rocky-pointer-${index + 1}`);
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", mascot.dataset.rockyLabel || "روكي");
      scopeSvgStyles(svg, "rocky-pointer-svg");
      mascot.querySelector("picture")?.setAttribute("hidden", "");
      mascot.append(documentObject.importNode(svg, true));
    }
  } catch (error) {
    if (error?.name !== "AbortError") console.warn("Rocky pointer tracking could not load.", error);
    return;
  }

  const reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)");
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let armX = 0;
  let armY = 0;
  let frame = 0;
  const pointAt = (event) => {
    const active = mascots.find((mascot) => !mascot.closest("[data-onboarding-step]")?.hidden);
    if (!active) return;
    const bounds = active.getBoundingClientRect();
    targetX = Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width / 2)) / Math.max(1, view.innerWidth * 0.35)));
    targetY = Math.max(-1, Math.min(1, (event.clientY - (bounds.top + bounds.height / 2)) / Math.max(1, view.innerHeight * 0.4)));
  };
  const render = () => {
    frame = 0;
    if (signal.aborted || reducedMotion.matches) return;
    x += (targetX - x) * 0.13;
    y += (targetY - y) * 0.13;
    armX += (targetX - armX) * 0.1;
    armY += (targetY - armY) * 0.1;
    const proximity = Math.max(0, 1 - Math.hypot(x, y) / 0.72);
    const bodyPose = {
      x: x * 15,
      y: y < 0 ? y * 20 : y * 12,
      rotation: x * (6 + Math.abs(y) * 2.5),
      scaleY: 1 - y * 0.05
    };
    for (const mascot of mascots) {
      if (mascot.closest("[data-onboarding-step]")?.hidden) continue;
      const svg = mascot.querySelector(".rocky-pointer-svg");
      const body = svg?.querySelector('[data-part="body"]');
      let bodyOrigin = { x: 400, y: 545 };
      if (body) {
        const bounds = body.getBBox();
        bodyOrigin = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height * 0.88 };
        body.style.translate = `${bodyPose.x}px ${bodyPose.y}px`;
        body.style.rotate = `${bodyPose.rotation}deg`;
        body.style.scale = `1 ${bodyPose.scaleY}`;
        body.style.transformOrigin = "50% 88%";
        body.style.transformBox = "fill-box";
      }
      for (const [partId, side] of [["arm-left", -1], ["arm-right", 1]]) {
        const selector = `[data-part="${partId}"]`;
        const arm = svg?.querySelector(selector);
        if (!arm) continue;
        const shoulder = ROCKY_SHOULDERS[partId];
        const inherited = bodyFollowDelta(shoulder, bodyOrigin, bodyPose);
        const followThroughX = (armX - x) * 10;
        const followThroughY = (armY - y) * 10;
        arm.style.translate = `${inherited.x + followThroughX}px ${inherited.y + followThroughY}px`;
        arm.style.rotate = `${bodyPose.rotation + armX * 10 + armY * side * 10}deg`;
        arm.style.scale = `1 ${bodyPose.scaleY * (1 - armY * 0.04)}`;
        arm.style.transformOrigin = `${shoulder[0]}px ${shoulder[1]}px`;
        arm.style.transformBox = "view-box";
      }
      for (const [selector, inwardDirection] of [['[data-part="pupil-left"]', 1], ['[data-part="pupil-right"]', -1]]) {
        const pupil = svg?.querySelector(selector);
        if (pupil) pupil.style.translate = `${x * 12 + proximity * 5 * inwardDirection}px ${y * 8}px`;
      }
    }
    frame = view.requestAnimationFrame(render);
  };
  reducedMotion.addEventListener("change", () => {
    view.cancelAnimationFrame(frame);
    frame = 0;
    if (reducedMotion.matches) {
      targetX = targetY = x = y = armX = armY = 0;
      for (const mascot of mascots) mascot.querySelectorAll("[data-part]").forEach((part) => {
        part.style.removeProperty("translate");
        part.style.removeProperty("rotate");
        part.style.removeProperty("scale");
      });
    } else frame = view.requestAnimationFrame(render);
  }, { signal });
  view.addEventListener("pointermove", pointAt, { passive:true, signal });
  documentObject.documentElement.addEventListener("pointerleave", () => { targetX = 0; targetY = 0; }, { signal });
  signal.addEventListener("abort", () => view.cancelAnimationFrame(frame), { once:true });
  frame = view.requestAnimationFrame(render);
}

async function bindRockyPassword(root, signal, documentObject) {
  const mascot = root.querySelector("[data-rocky-password] .onboarding-mascot");
  const input = root.querySelector('input[name="password"]');
  const view = documentObject.defaultView;
  if (!mascot || !input || !view) return;
  // Typing starts the performance; focusing the field alone leaves Rocky resting.
  let wake = () => {};
  const start = () => { mascot.classList.add("is-password-active"); wake(); };
  const pause = () => { mascot.classList.remove("is-password-active"); wake(); };
  input.addEventListener("input", start, { signal });
  input.addEventListener("blur", pause, { signal });
  try {
    const response = await view.fetch("assets/mascot/rocky-password-peek.svg", { signal });
    if (!response.ok) return;
    const source = await response.text();
    if (signal.aborted) return;
    const parsed = new view.DOMParser().parseFromString(source, "image/svg+xml");
    const svg = parsed.documentElement;
    if (svg.localName !== "svg" || parsed.querySelector("parsererror")) return;
    svg.querySelectorAll("script,foreignObject").forEach((node) => node.remove());
    scopeSvgIds(svg, "password");
    // Inline SVG styles participate in the page cascade and must stay instance-specific.
    scopeSvgStyles(svg, "rocky-password-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "روكي يغطي عينيه ويختلس نظرة مرحة");
    const rendered = documentObject.importNode(svg, true);
    mascot.append(rendered);
    mascot.classList.add("is-password-ready");
    const loopStart = Number(rendered.dataset.motionLoopStart);
    const loopEnd = Number(rendered.dataset.motionLoopEnd);
    const duration = Number(rendered.dataset.motionDuration);
    if (!(loopStart > 0 && loopEnd > loopStart && duration > loopEnd)) return;
    const reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)");
    let animations = rendered.getAnimations({ subtree:true });
    let position = 0;
    let frame = 0;
    let previousTime = 0;
    const paint = () => animations.forEach((animation) => { animation.currentTime = position; });
    const tick = (now) => {
      frame = 0;
      if (signal.aborted || reducedMotion.matches) return;
      if (mascot.closest("[data-onboarding-step]")?.hidden) {
        position = 0;
        mascot.classList.remove("is-password-active");
        animations = [];
        return;
      }
      const elapsed = Math.min(64, now - previousTime);
      previousTime = now;
      const active = mascot.classList.contains("is-password-active");
      const priorPosition = position;
      if (active) {
        position += elapsed;
        // Repeat only the covered-eye/peek section, leaving the arm lowering for blur.
        if (priorPosition < loopEnd && position >= loopEnd) position = loopStart + (position - loopEnd);
        else if (position >= duration) position = 0;
      } else if (position < loopStart) {
        // Leaving during the lift gently reverses it, without starting a peek.
        position = Math.max(0, position - elapsed * 1.4);
      } else {
        position = Math.min(duration, position + elapsed * 2);
      }
      paint();
      if (active || (position > 0 && position < duration)) frame = view.requestAnimationFrame(tick);
    };
    wake = () => {
      if (frame || signal.aborted || reducedMotion.matches) return;
      animations = rendered.getAnimations({ subtree:true });
      previousTime = view.performance.now();
      frame = view.requestAnimationFrame(tick);
    };
    reducedMotion.addEventListener("change", () => {
      view.cancelAnimationFrame(frame);
      frame = 0;
      position = 0;
      if (reducedMotion.matches) {
        animations.forEach((animation) => animation.cancel());
        animations = [];
        return;
      }
      animations = rendered.getAnimations({ subtree:true });
      paint();
      if (mascot.classList.contains("is-password-active")) wake();
    }, { signal });
    signal.addEventListener("abort", () => view.cancelAnimationFrame(frame), { once:true });
    paint();
    if (mascot.classList.contains("is-password-active")) wake();
  } catch (error) {
    if (error?.name !== "AbortError") console.warn("Rocky password animation could not load.", error);
  }
}

export function bindVisitorMascots(root, signal, documentObject) {
  void bindRockyPointerTracking(root, signal, documentObject);
  void bindRockyPassword(root, signal, documentObject);
  const repeatingRocky = root.querySelector("[data-rocky-repeat]");
  const motion = documentObject.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)");
  if (!repeatingRocky) return;
  const timer = setInterval(() => {
    if (motion?.matches || repeatingRocky.closest("[data-onboarding-step]")?.hidden) return;
    const picture = repeatingRocky.querySelector("picture");
    picture?.replaceWith(picture.cloneNode(true));
  }, Number(repeatingRocky.dataset.rockyRepeat));
  signal.addEventListener("abort", () => clearInterval(timer), { once:true });
}
