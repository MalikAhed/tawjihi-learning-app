import { bindVisitorMascots } from "./visitor-mascot.js";
import { warmLearningExperience } from "../app/background-loading.js";
import { revealWhenReady, preloadImages } from "./media-ready.js";
import {
  ACCOUNT_FIELD_ORDER,
  validateAccountField,
} from "../domain/account.js";
import {
  accountCompleteMarkup,
  entryMarkup,
  registerMarkup,
  signInMarkup,
} from "./visitor-flow-markup.js";

const FLOW_IDS = new Set(["entry", "register", "sign-in"]);
const TITLES = {
  entry: "الرئيسية",
  register: "إنشاء حساب",
  "sign-in": "تسجيل الدخول",
};
function setSubmitting(form, submitting, label) {
  const button = form.querySelector('[type="submit"]');
  form.setAttribute("aria-busy", String(submitting));
  [...form.elements].forEach((element) => {
    element.disabled = submitting;
  });
  if (!button.dataset.label) button.dataset.label = button.textContent;
  button.textContent = submitting ? label : button.dataset.label;
}

export function createVisitorFlow({
  container,
  service,
  onNavigate,
  onHome,
  documentObject = document,
}) {
  if (!container || !service || !onNavigate || !onHome)
    throw new TypeError("visitor flow dependencies are required");
  let currentFlow = null;
  let viewController = new AbortController();
  let navigationPending = false;

  const reduceMotion = () =>
    documentObject.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches;
  const afterAnimation = (element, callback, timeout = 500) => {
    const { signal } = viewController;
    const motion = documentObject.defaultView?.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    let finished = false;
    const cleanup = () => {
      clearTimeout(timer);
      element.removeEventListener("animationend", complete);
      element.removeEventListener("animationcancel", complete);
      motion?.removeEventListener("change", preferenceChanged);
      signal.removeEventListener("abort", cleanup);
    };
    const complete = (event) => {
      if (finished || (event && event.target !== element)) return;
      finished = true;
      cleanup();
      if (!signal.aborted) callback();
    };
    const preferenceChanged = (event) => {
      if (event.matches) complete();
    };
    const timer = setTimeout(complete, timeout);
    signal.addEventListener("abort", cleanup, { once: true });
    motion?.addEventListener("change", preferenceChanged);
    element.addEventListener("animationend", complete);
    element.addEventListener("animationcancel", complete);
  };
  const leaveCurrentFlow = (callback, className = "is-leaving") => {
    if (navigationPending) return;
    const activeShell = container.querySelector(".visitor-shell");
    if (!activeShell || reduceMotion()) {
      callback();
      return;
    }
    navigationPending = true;
    activeShell.classList.add(className);
    afterAnimation(activeShell, () => {
      navigationPending = false;
      callback();
    });
  };

  const bindCommon = () => {
    container.querySelectorAll("[data-flow]").forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          leaveCurrentFlow(() =>
            onNavigate(button.dataset.flow, { historyMode: "push" }),
          );
        },
        { signal: viewController.signal },
      ),
    );
  };
  const setFieldError = (form, name, message = "") => {
    const node = form.querySelector(`[data-field-error="${name}"]`);
    if (!node) return;
    node.textContent = message;
    node.hidden = !message;
    const control = form.elements[name];
    const target =
      typeof control?.setAttribute === "function" ? control : control?.[0];
    if (message) target?.setAttribute("aria-invalid", "true");
    else target?.removeAttribute("aria-invalid");
  };
  const setFormError = (form, message = "") => {
    const node = form.querySelector("[data-auth-error]");
    node.textContent = message;
    node.hidden = !message;
  };

  const renderRegister = () => {
    const { signal } = viewController;
    container.innerHTML = registerMarkup();
    const form = container.querySelector("[data-register-form]");
    bindVisitorMascots(form, signal, documentObject);
    const steps = [...form.querySelectorAll("[data-onboarding-step]")];
    const progress = container.querySelector("[data-onboarding-progress]");
    const backButton = container.querySelector("[data-onboarding-back]");
    const backLabel = backButton.querySelector("[data-back-label]");
    let stepIndex = 0;
    let stepTransitioning = false;
    let stepRequestPending = false;
    let stopStepMedia = () => {};
    const stepForField = {
      username: 1,
      curriculum: 2,
      path: 3,
      email: 4,
      password: 5,
      phone: 6,
    };
    const readData = () => {
      const data = Object.fromEntries(new FormData(form));
      const localPhone = String(data.phone || "").trim().replace(/^0/, "");
      data.phone = localPhone ? `${data.phonePrefix || ""}${localPhone}` : "";
      delete data.phonePrefix;
      return data;
    };
    const validateStep = (index, data = readData()) => {
      if (index === 0) return true;
      const name = ACCOUNT_FIELD_ORDER[index - 1];
      const message = validateAccountField(name, data[name]);
      const valid = !message;
      setFieldError(form, name, message);
      const control = form.elements[name];
      const target =
        typeof control?.focus === "function" ? control : control?.[0];
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
      progress
        .querySelectorAll("span")
        .forEach((segment, index) =>
          segment.classList.toggle("is-complete", index < stepIndex),
        );
      const isFirstStep = stepIndex === 0;
      backLabel.textContent = isFirstStep ? "الرئيسية" : "السابق";
      backButton.setAttribute(
        "aria-label",
        isFirstStep
          ? "العودة إلى الصفحة الرئيسية"
          : "العودة إلى الخطوة السابقة",
      );
      setFormError(form);
      const revealTarget = () => {
        stopStepMedia();
        steps.forEach((step, index) => {
          step.hidden = index !== targetIndex;
        });
        stepTransitioning = true;
        stopStepMedia = revealWhenReady(targetStep, {
          signal,
          onReady() {
            if (animate && !reduceMotion() && previousIndex !== targetIndex)
              targetStep.classList.add(`is-entering-${direction}`);
            if (focus)
              requestAnimationFrame(() => {
                if (!signal.aborted)
                  targetStep.querySelector("input:checked, input, h1")?.focus();
              });
            if (targetStep.classList.contains(`is-entering-${direction}`))
              afterAnimation(targetStep, () =>
                targetStep.classList.remove(`is-entering-${direction}`),
              );
            preloadImages(
              [...(steps[targetIndex + 1]?.querySelectorAll("img") || [])].map(
                (image) => image.currentSrc || image.src,
              ),
            );
            stepTransitioning = false;
          },
        });
      };
      if (
        !animate ||
        reduceMotion() ||
        previousIndex === targetIndex ||
        previousStep.hidden
      ) {
        revealTarget();
        return;
      }
      stepTransitioning = true;
      previousStep.classList.add(`is-leaving-${direction}`);
      afterAnimation(previousStep, () => {
        previousStep.classList.remove(`is-leaving-${direction}`);
        revealTarget();
      });
    };
    const continueFromCurrentStep = async () => {
      if (stepTransitioning || stepRequestPending || !validateStep(stepIndex))
        return;
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
      activeStep.querySelectorAll("input,button").forEach((control) => {
        control.disabled = true;
      });
      backButton.disabled = true;
      setFormError(form);
      const result = await service.checkAccountAvailability(
        { field: fieldName, value: requestValue },
        { signal: signal },
      );
      if (signal.aborted || requestStep !== stepIndex) return;
      stepRequestPending = false;
      activeStep.setAttribute("aria-busy", "false");
      activeStep.querySelectorAll("input,button").forEach((control) => {
        control.disabled = false;
      });
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
    form.querySelectorAll("[data-step-next]").forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          void continueFromCurrentStep();
        },
        { signal: signal },
      ),
    );
    const phonePrefix = form.elements.phonePrefix;
    const updatePhoneExample = () => {
      const option = phonePrefix?.selectedOptions?.[0];
      const example = option?.dataset.phonePlaceholder || "";
      form.elements.phone.placeholder = example;
      form.querySelector("[data-phone-example]").textContent = example;
      setFieldError(form, "phone");
    };
    phonePrefix?.addEventListener("change", updatePhoneExample, { signal });
    form.querySelector("[data-guest-start]")?.addEventListener(
      "click",
      () => {
        if (stepTransitioning || stepRequestPending) return;
        service.startGuestTrial();
        leaveCurrentFlow(() => onHome({ historyMode: "push" }));
      },
      { signal: signal },
    );
    form.querySelectorAll("[data-skip-field]").forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          if (stepTransitioning || stepRequestPending) return;
          const fieldName = button.dataset.skipField;
          form.elements[fieldName].value = "";
          setFieldError(form, fieldName);
          if (button.hasAttribute("data-skip-submit")) form.requestSubmit();
          else showStep(stepIndex + 1);
        },
        { signal: signal },
      ),
    );
    form.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key !== "Enter" ||
          stepTransitioning ||
          stepRequestPending ||
          stepIndex === steps.length - 1 ||
          event.target.matches('input[type="radio"]')
        )
          return;
        event.preventDefault();
        void continueFromCurrentStep();
      },
      { signal: signal },
    );
    backButton.addEventListener(
      "click",
      () => {
        if (stepTransitioning || stepRequestPending) return;
        if (stepIndex === 0)
          leaveCurrentFlow(() => onNavigate("entry", { historyMode: "push" }));
        else showStep(stepIndex - 1);
      },
      { signal: signal },
    );
    form.addEventListener(
      "input",
      (event) => {
        if (event.target?.name) setFieldError(form, event.target.name);
        setFormError(form);
      },
      { signal: signal },
    );
    form.addEventListener(
      "change",
      (event) => {
        if (event.target?.name) setFieldError(form, event.target.name);
      },
      { signal: signal },
    );
    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        setFormError(form);
        const data = readData();
        const invalidIndex = steps.findIndex(
          (_step, index) => index > 0 && !validateStep(index, data),
        );
        if (invalidIndex >= 0) {
          showStep(invalidIndex);
          return;
        }
        setSubmitting(form, true, "جارٍ إنشاء الحساب…");
        backButton.disabled = true;
        const result = await service.createAccount(data, { signal: signal });
        if (signal.aborted || result.status === "aborted") return;
        if (result.status === "created") {
          container.innerHTML = accountCompleteMarkup();
          // The learner can continue immediately, even while the celebration loads.
          // Only the illustration waits on its own media; navigation never uses a timer.
          const mascot = container.querySelector(".onboarding-mascot");
          revealWhenReady(mascot, { signal });
          container.querySelector("h1").focus({ preventScroll: true });
          container.querySelector("[data-registration-continue]").addEventListener(
            "click",
            () => onHome({ historyMode: "push" }),
            { signal, once: true },
          );
          return;
        }
        backButton.disabled = false;
        setSubmitting(form, false, "");
        if (result.fieldErrors) {
          const serverErrors = Object.entries(result.fieldErrors);
          serverErrors.forEach(([name, message]) =>
            setFieldError(form, name, message),
          );
          const firstField = serverErrors[0]?.[0];
          if (firstField && firstField in stepForField)
            showStep(stepForField[firstField]);
        } else if (result.field && form.elements[result.field]) {
          setFieldError(form, result.field, result.error);
          showStep(stepForField[result.field]);
        } else
          setFormError(
            form,
            result.error || "تعذّر إنشاء الحساب. حاول مرة أخرى.",
          );
      },
      { signal: signal },
    );
    showStep(0, { focus: false, animate: false });
  };
  const renderSignIn = () => {
    const { signal } = viewController;
    container.innerHTML = signInMarkup();
    const form = container.querySelector("[data-sign-in-form]");
    form.addEventListener(
      "input",
      (event) => {
        if (event.target?.name) setFieldError(form, event.target.name);
        setFormError(form);
      },
      { signal: signal },
    );
    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        setFormError(form);
        const data = Object.fromEntries(new FormData(form));
        const identifierMissing = !String(data.identifier || "").trim();
        const passwordMissing = !data.password;
        setFieldError(
          form,
          "identifier",
          identifierMissing
            ? "أدخل اسم المستخدم أو البريد الإلكتروني أو رقم الهاتف."
            : "",
        );
        setFieldError(
          form,
          "password",
          passwordMissing ? "أدخل كلمة المرور." : "",
        );
        if (identifierMissing || passwordMissing) {
          (identifierMissing
            ? form.elements.identifier
            : form.elements.password
          ).focus();
          return;
        }
        setSubmitting(form, true, "جارٍ تسجيل الدخول…");
        const result = await service.signIn(data, { signal: signal });
        if (signal.aborted || result.status === "aborted") return;
        if (result.status === "signed-in") {
          onHome({ historyMode: "push" });
          return;
        }
        setSubmitting(form, false, "");
        setFormError(
          form,
          result.error || "لم نتمكن من تسجيل الدخول بهذه البيانات.",
        );
        form.elements.identifier.focus();
      },
      { signal: signal },
    );
  };
  function show(flow, { focus = true } = {}) {
    if (!FLOW_IDS.has(flow)) flow = "entry";
    currentFlow = flow;
    navigationPending = false;
    viewController.abort();
    viewController = new AbortController();
    container.hidden = false;
    documentObject.body.classList.add("product-flow-active");
    if (flow === "entry") container.innerHTML = entryMarkup();
    else if (flow === "register") {
      renderRegister();
      warmLearningExperience();
    }
    else renderSignIn();
    bindCommon();
    documentObject.title = TITLES[flow];
    const { signal } = viewController;
    if (flow !== "register")
      revealWhenReady(container, {
        signal,
        onReady() {
          if (focus) container.querySelector("h1")?.focus();
        },
      });
  }
  function hide() {
    currentFlow = null;
    navigationPending = false;
    viewController.abort();
    container.hidden = true;
    container.replaceChildren();
    documentObject.body.classList.remove("product-flow-active");
  }
  return Object.freeze({
    show,
    hide,
    getCurrentFlow: () => currentFlow,
    destroy: hide,
  });
}
