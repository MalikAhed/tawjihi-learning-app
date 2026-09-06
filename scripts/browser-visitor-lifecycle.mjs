/** Deferred fake services prove that old flows cannot repaint or navigate a new one. */
export async function verifyVisitorLifecycle({ evaluate, assert }) {
  const results = await evaluate(`(async () => {
    const { createVisitorFlow } = await import('/src/ui/visitor-flow.js');
    const host = document.createElement('div');
    document.body.append(host);
    const originalTitle = document.title;
    const originalFlowClass = document.body.classList.contains('product-flow-active');
    let finishSignIn;
    let finishRegistration;
    let finishAvailability;
    let homeCalls = 0;
    let navigationCalls = 0;
    const service = {
      signIn:() => new Promise((resolve) => { finishSignIn = resolve; }),
      createAccount:() => new Promise((resolve) => { finishRegistration = resolve; }),
      checkAccountAvailability:() => new Promise((resolve) => { finishAvailability = resolve; }),
    };
    const flow = createVisitorFlow({ container:host, service,
      onHome:() => { homeCalls++; }, onNavigate:() => { navigationCalls++; },
    });
    const submit = (form) => form.dispatchEvent(new Event('submit', { bubbles:true, cancelable:true }));
    const settle = async () => { await Promise.resolve(); await Promise.resolve(); };
    let exitFlow;
    try {
      flow.show('sign-in', { focus:false });
      const signIn = host.querySelector('form');
      signIn.elements.identifier.value = 'returning';
      signIn.elements.password.value = 'Learn123';
      submit(signIn);
      flow.show('entry', { focus:false });
      finishSignIn({ status:'signed-in' });
      await settle();
      const signInCancelled = homeCalls === 0 && Boolean(host.querySelector('.visitor-landing'));

      flow.show('register', { focus:false });
      const registration = host.querySelector('form');
      for (const [name, value] of Object.entries({ username:'learner-new', email:'learner@example.com', password:'Learn123' })) registration.elements[name].value = value;
      registration.querySelector('input[name=curriculum][value=gaza]').checked = true;
      registration.querySelector('input[name=path][value=scientific]').checked = true;
      submit(registration);
      flow.show('sign-in', { focus:false });
      finishRegistration({ status:'created' });
      await settle();
      const registrationCancelled = homeCalls === 0 && Boolean(host.querySelector('[data-sign-in-form]')) && !host.querySelector('.onboarding-complete');

      flow.show('register', { focus:false });
      const availabilityForm = host.querySelector('form');
      // Finish the intro's existing exit animation to reach the username step.
      availabilityForm.querySelector('[data-step-next]').click();
      availabilityForm.querySelector('[data-onboarding-step=intro]').dispatchEvent(new Event('animationend'));
      availabilityForm.elements.username.value = 'learner-new';
      availabilityForm.querySelector('[data-onboarding-step="0"] [data-step-next]').click();
      flow.show('entry', { focus:false });
      finishAvailability({ status:'available' });
      await settle();
      const availabilityCancelled = Boolean(host.querySelector('.visitor-landing')) && homeCalls === 0;
      flow.destroy();

      // Force the motion-capable exit branch even if the caller is checking reduced motion.
      const documentObject = { body:document.body, title:document.title, defaultView:{ matchMedia:() => ({ matches:false, addEventListener() {}, removeEventListener() {} }) } };
      exitFlow = createVisitorFlow({ container:host, service, documentObject,
        onHome:() => { homeCalls++; }, onNavigate:() => { navigationCalls++; },
      });
      exitFlow.show('entry', { focus:false });
      const oldShell = host.querySelector('.visitor-shell');
      host.querySelector('[data-flow=register]').click();
      exitFlow.show('sign-in', { focus:false });
      oldShell.dispatchEvent(new Event('animationend'));
      await settle();
      const exitCancelled = navigationCalls === 0 && Boolean(host.querySelector('[data-sign-in-form]'));
      return { signInCancelled, registrationCancelled, availabilityCancelled, exitCancelled };
    } finally {
      flow.destroy();
      exitFlow?.destroy();
      host.remove();
      document.title = originalTitle;
      document.body.classList.toggle('product-flow-active', originalFlowClass);
    }
  })()`);
  for (const [boundary, passed] of Object.entries(results)) assert(passed, `visitor lifetime regression: ${boundary}`);
}
