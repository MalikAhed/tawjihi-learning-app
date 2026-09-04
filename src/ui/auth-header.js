export function createAuthHeader({ guest, member, label, flowButtons, signOutButton, courseContainer, service, onFlow }) {
  if (!guest || !member || !label || !signOutButton || !courseContainer || !service || !onFlow) throw new TypeError("auth header dependencies are required");
  const controller = new AbortController();
  const { signal } = controller;
  const update = () => {
    const type = service.getAccountType();
    const isGuest = type === "guest";
    guest.hidden = !isGuest;
    member.hidden = isGuest;
    label.textContent = { free:"حساب مجاني", subscribed:"حساب مشترك", banned:"حساب محظور" }[type] || "";
    document.body.dataset.accountType = type;
    courseContainer.querySelectorAll("[data-subject]").forEach((button) => {
      const unavailable = button instanceof HTMLButtonElement && button.disabled;
      button.setAttribute("aria-disabled", String(type === "banned" || unavailable));
    });
  };
  const unsubscribe = service.subscribe(update);
  flowButtons.forEach((button) => button.addEventListener("click", () => onFlow(button.dataset.authFlow), { signal }));
  signOutButton.addEventListener("click", async () => { await service.signOut(); update(); }, { signal });
  return Object.freeze({
    update,
    destroy() {
      controller.abort();
      unsubscribe();
    },
  });
}
