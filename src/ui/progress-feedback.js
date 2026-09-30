// One visible saving indicator, shared across navigation and account changes.
export function mountProgressFeedback({ store, service }) {
  const host = document.createElement("aside");
  host.className = "progress-feedback system-feedback";
  host.setAttribute("role", "status");
  host.setAttribute("aria-live", "polite");
  const text = document.createElement("span");
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "system-action system-action--secondary";
  retry.textContent = "إعادة المحاولة";
  retry.addEventListener("click", () => void store.retry(service.getLearnerProgressOwner()));
  const dismiss = document.createElement("button");
  dismiss.type = "button";
  dismiss.className = "system-action system-action--secondary";
  dismiss.textContent = "حسنًا";
  dismiss.addEventListener("click", () => store.dismissRecoveryWarning(service.getLearnerProgressOwner()));
  host.append(text, retry, dismiss);
  document.body.append(host);
  const update = () => {
    const state = store.getSaveState(service.getLearnerProgressOwner());
    const warning = store.hasRecoveryWarning(service.getLearnerProgressOwner());
    host.hidden = !["pending", "failed"].includes(state) && !warning;
    dismiss.hidden = !warning || ["pending", "failed"].includes(state);
    retry.hidden = state !== "failed";
    text.textContent = state === "failed" ? "تعذّر حفظ تقدّمك. إجابتك محفوظة في هذه الصفحة؛ حاول مجددًا." : state === "pending" ? "جارٍ حفظ تقدّمك…" : "تم استعادة التقدّم السليم؛ تعذّر قراءة بعض السجلات القديمة.";
  };
  const stop = store.subscribe(update);
  const stopSession = service.subscribe(update);
  update();
  return () => { stop(); stopSession(); host.remove(); };
}
