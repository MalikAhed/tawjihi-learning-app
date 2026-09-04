import { ACCOUNT_FIELD_ORDER, validateAccountField } from "../domain/account.js";
import { accountCompleteMarkup, entryMarkup, registerMarkup, signInMarkup } from "./visitor-flow-markup.js";

const FLOW_IDS = new Set(["entry", "register", "sign-in"]);
const TITLES = { entry:"رحلة التوجيهي", register:"إنشاء حساب", "sign-in":"تسجيل الدخول" };
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
      svg.classList.add("rocky-pointer-svg");
      mascot.querySelector("picture")?.setAttribute("hidden", "");
      mascot.append(documentObject.importNode(svg, true));
    }
  } catch (error) {
    if (error?.name !== "AbortError") console.warn("Rocky pointer tracking could not load.", error);
    return;
  }

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
  view.addEventListener("pointermove", pointAt, { passive:true, signal });
  documentObject.documentElement.addEventListener("pointerleave", () => { targetX = 0; targetY = 0; }, { signal });
  signal.addEventListener("abort", () => view.cancelAnimationFrame(frame), { once:true });
  frame = view.requestAnimationFrame(render);
}

function setSubmitting(form, submitting, label) {
  const button = form.querySelector('[type="submit"]');
  form.setAttribute("aria-busy", String(submitting));
  [...form.elements].forEach((element) => { element.disabled = submitting; });
  if (!button.dataset.label) button.dataset.label = button.textContent;
  button.textContent = submitting ? label : button.dataset.label;
}

export function createVisitorFlow({ container, service, onNavigate, onHome, documentObject = document }) {
  if (!container || !service || !onNavigate || !onHome) throw new TypeError("visitor flow dependencies are required");
  let currentFlow = null;
  let viewController = new AbortController();
  let navigationPending = false;

  const reduceMotion = () => documentObject.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const afterAnimation = (element, callback, timeout = 500) => {
    let finished = false;
    const complete = (event) => {
      if (finished || (event && event.target !== element)) return;
      finished = true;
      clearTimeout(timer);
      element.removeEventListener("animationend", complete);
      element.removeEventListener("animationcancel", complete);
      callback();
    };
    const timer = setTimeout(complete, timeout);
    element.addEventListener("animationend", complete);
    element.addEventListener("animationcancel", complete);
  };
  const leaveCurrentFlow = (callback, className = "is-leaving") => {
    if (navigationPending) return;
    const activeShell = container.querySelector(".visitor-shell");
    if (!activeShell || reduceMotion()) { callback(); return; }
    navigationPending = true;
    activeShell.classList.add(className);
    afterAnimation(activeShell, () => {
      navigationPending = false;
      callback();
    });
  };

  const bindCommon = () => {
    container.querySelectorAll("[data-flow]").forEach((button) => button.addEventListener("click", () => {
      leaveCurrentFlow(() => onNavigate(button.dataset.flow, { historyMode:"push" }));
    }, { signal:viewController.signal }));
  };
  const setFieldError = (form, name, message = "") => {
    const node = form.querySelector(`[data-field-error="${name}"]`);
    if (!node) return Boolean(message);
    node.textContent = message;
    node.hidden = !message;
    const control = form.elements[name];
    const target = typeof control?.setAttribute === "function" ? control : control?.[0];
    if (message) target?.setAttribute("aria-invalid", "true");
    else target?.removeAttribute("aria-invalid");
    return Boolean(message);
  };
  const setFormError = (form, message = "") => {
    const node = form.querySelector("[data-auth-error]");
    node.textContent = message;
    node.hidden = !message;
  };

  const renderEntry = () => { container.innerHTML = entryMarkup(); };
  const renderRegister = () => {
    container.innerHTML = registerMarkup();
    const form = container.querySelector("[data-register-form]");
    void bindRockyPointerTracking(form, viewController.signal, documentObject);
    const repeatingRocky = form.querySelector("[data-rocky-repeat]");
    if (repeatingRocky && !reduceMotion()) {
      const interval = Number(repeatingRocky.dataset.rockyRepeat);
      const timer = setInterval(() => {
        if (repeatingRocky.closest("[data-onboarding-step]")?.hidden) return;
        const picture = repeatingRocky.querySelector("picture");
        picture?.replaceWith(picture.cloneNode(true));
      }, interval);
      viewController.signal.addEventListener("abort", () => clearInterval(timer), { once:true });
    }
    const steps = [...form.querySelectorAll("[data-onboarding-step]")];
    const progress = container.querySelector("[data-onboarding-progress]");
    const backButton = container.querySelector("[data-onboarding-back]");
    const backLabel = backButton.querySelector("[data-back-label]");
    let stepIndex = 0;
    let stepTransitioning = false;
    let stepRequestPending = false;
    const stepForField = { username:1, curriculum:2, path:3, email:4, password:5, phone:6 };
    const readData = () => Object.fromEntries(new FormData(form));
    const validateStep = (index, data = readData()) => {
      if (index === 0) return true;
      const name = ACCOUNT_FIELD_ORDER[index - 1];
      const message = validateAccountField(name, data[name]);
      const valid = !message;
      setFieldError(form, name, message);
      const control = form.elements[name];
      const target = typeof control?.focus === "function" ? control : control?.[0];
      if (!valid) target?.focus();
      return valid;
    };
    const showStep = (nextIndex, { focus = true, animate = true } = {}) => {
      const previousIndex = stepIndex;
      const targetIndex = Math.max(0, Math.min(steps.length - 1, nextIndex));
      const previousStep = steps[previousIndex];
      const targetStep = steps[targetIndex];
      const direction = targetIndex >= previousIndex ? "forward" : "backward";
      stepIndex = targetIndex;
      progress.hidden = stepIndex === 0;
      progress.setAttribute("aria-valuenow", String(Math.max(1, stepIndex)));
      progress.querySelectorAll("span").forEach((segment, index) => segment.classList.toggle("is-complete", index < stepIndex));
      const isFirstStep = stepIndex === 0;
      backLabel.textContent = isFirstStep ? "الرئيسية" : "السابق";
      backButton.setAttribute("aria-label", isFirstStep ? "العودة إلى الصفحة الرئيسية" : "العودة إلى الخطوة السابقة");
      setFormError(form);
      const revealTarget = () => {
        steps.forEach((step, index) => { step.hidden = index !== targetIndex; });
        if (animate && !reduceMotion() && previousIndex !== targetIndex) targetStep.classList.add(`is-entering-${direction}`);
        if (focus) requestAnimationFrame(() => targetStep.querySelector("input:checked, input, h1")?.focus());
        if (targetStep.classList.contains(`is-entering-${direction}`)) afterAnimation(targetStep, () => targetStep.classList.remove(`is-entering-${direction}`));
        stepTransitioning = false;
      };
      if (!animate || reduceMotion() || previousIndex === targetIndex || previousStep.hidden) { revealTarget(); return; }
      stepTransitioning = true;
      previousStep.classList.add(`is-leaving-${direction}`);
      afterAnimation(previousStep, () => {
        previousStep.classList.remove(`is-leaving-${direction}`);
        revealTarget();
      });
    };
    const continueFromCurrentStep = async () => {
      if (stepTransitioning || stepRequestPending || !validateStep(stepIndex)) return;
      if (stepIndex === 0) {
        showStep(1);
        return;
      }
      const fieldName = ACCOUNT_FIELD_ORDER[stepIndex - 1];
      if (!["username", "email"].includes(fieldName)) {
        showStep(stepIndex + 1);
        return;
      }
      const requestStep = stepIndex;
      const requestValue = readData()[fieldName];
      const activeStep = steps[requestStep];
      stepRequestPending = true;
      activeStep.setAttribute("aria-busy", "true");
      activeStep.querySelectorAll("input,button").forEach((control) => { control.disabled = true; });
      backButton.disabled = true;
      setFormError(form);
      const result = await service.checkAccountAvailability(
        { field:fieldName, value:requestValue },
        { signal:viewController.signal },
      );
      if (viewController.signal.aborted || requestStep !== stepIndex) return;
      stepRequestPending = false;
      activeStep.setAttribute("aria-busy", "false");
      activeStep.querySelectorAll("input,button").forEach((control) => { control.disabled = false; });
      backButton.disabled = false;
      if (result.status === "available") {
        showStep(stepIndex + 1);
        return;
      }
      const message = result.fieldErrors?.[fieldName] || result.error;
      if (message && ["duplicate", "invalid"].includes(result.status)) {
        setFieldError(form, fieldName, message);
        form.elements[fieldName].focus();
        return;
      }
      setFormError(form, message || "تعذّر التحقق من البيانات. حاول مرة أخرى.");
      form.elements[fieldName].focus();
    };
    form.querySelectorAll("[data-step-next]").forEach((button) => button.addEventListener("click", () => {
      void continueFromCurrentStep();
    }, { signal:viewController.signal }));
    form.querySelector("[data-guest-start]")?.addEventListener("click", () => {
      if (stepTransitioning || stepRequestPending) return;
      service.startGuestTrial();
      leaveCurrentFlow(() => onHome({ historyMode:"push" }));
    }, { signal:viewController.signal });
    form.querySelectorAll("[data-skip-field]").forEach((button) => button.addEventListener("click", () => {
      if (stepTransitioning || stepRequestPending) return;
      const fieldName = button.dataset.skipField;
      form.elements[fieldName].value = "";
      setFieldError(form, fieldName);
      if (button.hasAttribute("data-skip-submit")) form.requestSubmit();
      else showStep(stepIndex + 1);
    }, { signal:viewController.signal }));
    form.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" || stepTransitioning || stepRequestPending || stepIndex === steps.length - 1 || event.target.matches('input[type="radio"]')) return;
      event.preventDefault();
      void continueFromCurrentStep();
    }, { signal:viewController.signal });
    backButton.addEventListener("click", () => {
      if (stepTransitioning || stepRequestPending) return;
      if (stepIndex === 0) leaveCurrentFlow(() => onNavigate("entry", { historyMode:"push" }));
      else showStep(stepIndex - 1);
    }, { signal:viewController.signal });
    form.addEventListener("input", (event) => {
      if (event.target?.name) setFieldError(form, event.target.name);
      setFormError(form);
    }, { signal:viewController.signal });
    form.addEventListener("change", (event) => {
      if (event.target?.name) setFieldError(form, event.target.name);
    }, { signal:viewController.signal });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFormError(form);
      const data = readData();
      const invalidIndex = steps.findIndex((_step, index) => index > 0 && !validateStep(index, data));
      if (invalidIndex >= 0) { showStep(invalidIndex); return; }
      setSubmitting(form, true, "جارٍ إنشاء الحساب…");
      backButton.disabled = true;
      const result = await service.createAccount(data, { signal:viewController.signal });
      if (viewController.signal.aborted || result.status === "aborted") return;
      if (result.status === "created") {
        container.innerHTML = accountCompleteMarkup();
        const delay = reduceMotion() ? 500 : 3400;
        const timer = setTimeout(() => {
          if (!viewController.signal.aborted) leaveCurrentFlow(() => onHome({ historyMode:"push" }), "is-completing");
        }, delay);
        viewController.signal.addEventListener("abort", () => clearTimeout(timer), { once:true });
        return;
      }
      backButton.disabled = false;
      setSubmitting(form, false, "");
      if (result.fieldErrors) {
        const serverErrors = Object.entries(result.fieldErrors);
        serverErrors.forEach(([name, message]) => setFieldError(form, name, message));
        const firstField = serverErrors[0]?.[0];
        if (firstField && firstField in stepForField) showStep(stepForField[firstField]);
      } else if (result.field && form.elements[result.field]) {
        setFieldError(form, result.field, result.error);
        showStep(stepForField[result.field]);
      } else setFormError(form, result.error || "تعذّر إنشاء الحساب. حاول مرة أخرى.");
    }, { signal:viewController.signal });
    showStep(0, { focus:false, animate:false });
  };
  const renderSignIn = () => {
    container.innerHTML = signInMarkup();
    const form = container.querySelector("[data-sign-in-form]");
    form.addEventListener("input", (event) => {
      if (event.target?.name) setFieldError(form, event.target.name);
      setFormError(form);
    }, { signal:viewController.signal });
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFormError(form);
      const data = Object.fromEntries(new FormData(form));
      const identifierMissing = !String(data.identifier || "").trim();
      const passwordMissing = !data.password;
      setFieldError(form, "identifier", identifierMissing ? "أدخل اسم المستخدم أو البريد الإلكتروني أو رقم الهاتف." : "");
      setFieldError(form, "password", passwordMissing ? "أدخل كلمة المرور." : "");
      if (identifierMissing || passwordMissing) {
        (identifierMissing ? form.elements.identifier : form.elements.password).focus();
        return;
      }
      setSubmitting(form, true, "جارٍ تسجيل الدخول…");
      const result = await service.signIn(data, { signal:viewController.signal });
      if (viewController.signal.aborted || result.status === "aborted") return;
      if (result.status === "signed-in") {
        onHome({ historyMode:"push" });
        return;
      }
      setSubmitting(form, false, "");
      setFormError(form, result.error || "لم نتمكن من تسجيل الدخول بهذه البيانات.");
      form.elements.identifier.focus();
    }, { signal:viewController.signal });
  };

  function show(flow, { focus = true } = {}) {
    if (!FLOW_IDS.has(flow)) flow = "entry";
    currentFlow = flow;
    navigationPending = false;
    viewController.abort();
    viewController = new AbortController();
    container.hidden = false;
    documentObject.body.classList.add("product-flow-active");
    if (flow === "entry") renderEntry();
    else if (flow === "register") renderRegister();
    else renderSignIn();
    bindCommon();
    documentObject.title = `${TITLES[flow]} · رحلة التوجيهي`;
    if (focus) requestAnimationFrame(() => container.querySelector("h1")?.focus());
  }
  function hide() {
    currentFlow = null;
    navigationPending = false;
    viewController.abort();
    container.hidden = true;
    container.replaceChildren();
    documentObject.body.classList.remove("product-flow-active");
  }
  return Object.freeze({ show, hide, getCurrentFlow:() => currentFlow, destroy:hide });
}
