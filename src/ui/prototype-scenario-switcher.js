import { escapeHtml } from "../lib/dom.js";

const STYLE_ID = "prototype-tools-styles";

function ensureStyles(documentObject) {
  if (documentObject.getElementById(STYLE_ID)) return;
  const link = documentObject.createElement("link");
  link.id = STYLE_ID;
  link.rel = "stylesheet";
  link.href = "src/styles/prototype-tools.css";
  documentObject.head.append(link);
}

function renderOptions(scenarios, activeId) {
  const groups = new Map();
  scenarios.forEach((item) => groups.set(item.group, [...(groups.get(item.group) || []), item]));
  return [...groups].map(([group, items]) => `<optgroup label="${escapeHtml(group)}">${items.map(({ id, label }) => `<option value="${escapeHtml(id)}"${id === activeId ? " selected" : ""}>${escapeHtml(label)}</option>`).join("")}</optgroup>`).join("");
}

function renderState(snapshot) {
  const items = [
    ["Actor", snapshot.actor],
    ["Account", snapshot.account.type],
    ["Access", snapshot.access.status],
    ["Content", snapshot.content.status],
    ["System", snapshot.system.status],
  ];
  return items.map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("");
}

export function mountPrototypeScenarioSwitcher({ service, documentObject = document }) {
  if (!service || service.kind !== "fixture") throw new TypeError("A fixture product service is required");
  ensureStyles(documentObject);
  const controller = new AbortController();
  const { signal } = controller;
  const active = service.getScenario();
  const root = documentObject.createElement("aside");
  root.className = "prototype-tools";
  root.setAttribute("aria-label", "Prototype scenario tools");
  root.innerHTML = `<button class="prototype-tools__toggle" type="button" aria-expanded="false" aria-controls="prototype-tools-panel">Prototype</button><div class="prototype-tools__panel" id="prototype-tools-panel" hidden><div class="prototype-tools__heading"><div><strong>Fixture scenario</strong><small>Development only · no backend</small></div><button type="button" data-prototype-close aria-label="Close prototype tools">×</button></div><label for="prototype-scenario">Current scenario</label><select id="prototype-scenario">${renderOptions(service.listScenarios(), active.id)}</select><p data-prototype-description>${escapeHtml(active.description)}</p><div class="prototype-tools__state" data-prototype-state>${renderState(active.snapshot)}</div><button class="prototype-tools__reset" type="button" data-prototype-reset>Reset scenario</button><p class="visually-hidden" role="status" aria-live="polite" data-prototype-status></p></div>`;
  documentObject.body.append(root);

  const toggle = root.querySelector(".prototype-tools__toggle");
  const panel = root.querySelector(".prototype-tools__panel");
  const close = root.querySelector("[data-prototype-close]");
  const select = root.querySelector("select");
  const description = root.querySelector("[data-prototype-description]");
  const state = root.querySelector("[data-prototype-state]");
  const status = root.querySelector("[data-prototype-status]");
  const setOpen = (isOpen, { restoreFocus = false } = {}) => {
    panel.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) select.focus();
    else if (restoreFocus) toggle.focus();
  };
  const applyScenario = (snapshot, scenario) => {
    select.value = scenario.id;
    description.textContent = scenario.description;
    state.innerHTML = renderState(snapshot);
    documentObject.body.dataset.prototypeScenario = scenario.id;
    documentObject.body.dataset.prototypeActor = snapshot.actor;
    status.textContent = `Scenario changed to ${scenario.label}.`;
  };

  applyScenario(active.snapshot, active);
  const unsubscribe = service.subscribe(applyScenario);
  toggle.addEventListener("click", () => setOpen(panel.hidden), { signal });
  close.addEventListener("click", () => setOpen(false, { restoreFocus:true }), { signal });
  select.addEventListener("change", () => service.selectScenario(select.value), { signal });
  root.querySelector("[data-prototype-reset]").addEventListener("click", () => service.reset(), { signal });
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || panel.hidden) return;
    event.preventDefault();
    setOpen(false, { restoreFocus:true });
  }, { signal });

  return () => {
    unsubscribe();
    controller.abort();
    root.remove();
    delete documentObject.body.dataset.prototypeScenario;
    delete documentObject.body.dataset.prototypeActor;
  };
}
