function brand() {
  return `<span class="visitor-brand" aria-label="رحلة التوجيهي"><span class="visitor-brand__mark" aria-hidden="true">ر</span><b>رحلة التوجيهي</b></span>`;
}

function shell(content, { landing = false } = {}) {
  return `<div class="visitor-shell${landing ? " visitor-shell--landing" : ""}">
    <header class="visitor-header">${brand()}</header>
    <div class="visitor-main" role="main">${content}</div>
  </div>`;
}

function field(name, label, attributes = "") {
  const errorId = `auth-${name}-error`;
  return `<label class="auth-field"><span>${label}</span><input name="${name}" aria-describedby="${errorId}" ${attributes}/><small class="visitor-field-error" id="${errorId}" data-field-error="${name}" aria-live="polite" hidden></small></label>`;
}

function backControl(label, attribute) {
  return `<button class="auth-back" type="button" ${attribute} aria-label="العودة إلى ${label}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg><span data-back-label>${label}</span></button>`;
}

function rocky(animation, label, { trackPointer = false } = {}) {
  return `<div class="onboarding-mascot onboarding-mascot--rocky"${animation === "wave" ? ' data-rocky-repeat="2400"' : ""}${trackPointer ? ` data-rocky-pointer-track data-rocky-label="${label}"` : ""}>
    <picture>
      <source media="(prefers-reduced-motion: reduce)" srcset="assets/mascot/rocky-standing-still-reduced.svg"/>
      <img src="assets/mascot/rocky-${animation}.svg" alt="${label}"/>
    </picture>
  </div>`;
}

function authShell(title, intro, form, alternate) {
  return shell(`<section class="auth-page">
    ${backControl("الرئيسية", 'data-flow="entry"')}
    <div class="auth-card">
      <header class="auth-card__hero"><h1 id="visitor-title" tabindex="-1">${title}</h1><p>${intro}</p></header>
      <div class="auth-card__body">${form}<div class="auth-links">${alternate}</div></div>
    </div>
  </section>`);
}

export function entryMarkup() {
  return shell(`<section class="visitor-landing" aria-labelledby="visitor-title">
    <div class="visitor-illustration-placeholder" role="img" aria-label="مكان مخصص لصورة تعليمية"><span>مكان الصورة</span></div>
    <div class="visitor-landing__content">
      <h1 id="visitor-title" tabindex="-1">أكثر طريقة ممتعة للتعلّم والاستعداد للتوجيهي!</h1>
      <div class="visitor-landing__actions">
        <button class="visitor-primary" type="button" data-flow="register">ابدأ</button>
        <button class="visitor-secondary" type="button" data-flow="sign-in">لدي حساب بالفعل</button>
      </div>
    </div>
  </section>`, { landing:true });
}

export function registerMarkup() {
  return shell(`<section class="auth-page onboarding-page" aria-label="إنشاء حساب">
    <div class="onboarding-nav">
      ${backControl("الرئيسية", "data-onboarding-back")}
      <div class="onboarding-progress" role="progressbar" aria-label="تقدّم إنشاء الحساب" aria-valuemin="1" aria-valuemax="6" aria-valuenow="1" data-onboarding-progress>${Array.from({ length:6 }, (_, index) => `<span${index === 0 ? ' class="is-complete"' : ""}></span>`).join("")}</div>
    </div>
    <form class="auth-form onboarding-form" data-register-form novalidate>
      <section class="onboarding-step onboarding-step--hello" data-onboarding-step="intro">
        ${rocky("wave", "روكي يلوّح مرحبًا")}
        <p class="onboarding-eyebrow">رفيقك في رحلة التعلّم</p>
        <h1 id="visitor-title" tabindex="-1">مرحبًا! أنا روكي</h1>
        <p>سأكون معك خطوة بخطوة في رحلة التوجيهي.</p>
        <button class="visitor-primary" type="button" data-step-next>متابعة</button>
        <button class="onboarding-guest" type="button" data-guest-start>تجربة التطبيق كضيف</button>
      </section>
      <section class="onboarding-step" data-onboarding-step="0">
        ${rocky("standing-still", "روكي يقف مبتسمًا")}
        <h1 tabindex="-1">بماذا تحب أن نناديك؟</h1>
        <p>اختر اسمًا يظهر لك داخل رحلة التعلّم.</p>
        ${field("username", "اسمك", 'autocomplete="username" maxlength="30" placeholder="مثال: أحمد" required')}
        <button class="visitor-primary" type="button" data-step-next>متابعة</button>
      </section>
      <section class="onboarding-step" data-onboarding-step="1" hidden>
        ${rocky("standing-still", "روكي ينظر إلى اختيار المنهاج", { trackPointer:true })}
        <h1 tabindex="-1">أي منهاج تدرس؟</h1>
        <p>اختر المكان الذي يتبع له منهاجك.</p>
        <div class="onboarding-choice-grid onboarding-choice-grid--maps">
          <label class="onboarding-choice"><input type="radio" name="curriculum" value="gaza"/><span class="onboarding-choice__visual"><img src="assets/maps/gaza-map.svg" alt=""/></span><strong>غزة</strong></label>
          <label class="onboarding-choice"><input type="radio" name="curriculum" value="full-palestinian"/><span class="onboarding-choice__visual"><img src="assets/maps/palestine-map.svg" alt=""/></span><strong>فلسطين</strong></label>
        </div>
        <small class="visitor-field-error" data-field-error="curriculum" hidden></small>
        <button class="visitor-primary" type="button" data-step-next>متابعة</button>
      </section>
      <section class="onboarding-step" data-onboarding-step="2" hidden>
        ${rocky("standing-still", "روكي ينظر إلى اختيار الفرع", { trackPointer:true })}
        <h1 tabindex="-1">ما هو فرعك؟</h1>
        <p>سنستخدم اختيارك لعرض المواد المناسبة لك.</p>
        <div class="onboarding-choice-grid">
          <label class="onboarding-choice onboarding-choice--path onboarding-choice--scientific"><input type="radio" name="path" value="scientific"/><span class="path-choice__visual" aria-hidden="true"><img class="path-choice__art path-choice__art--pale" src="assets/paths/generated-scientific-light.png" alt=""/><img class="path-choice__art path-choice__art--saturated" src="assets/paths/generated-scientific.png" alt=""/></span><strong>العلمي</strong></label>
          <label class="onboarding-choice onboarding-choice--path onboarding-choice--literary"><input type="radio" name="path" value="literary"/><span class="path-choice__visual" aria-hidden="true"><img class="path-choice__art path-choice__art--pale" src="assets/paths/generated-literary-light.png" alt=""/><img class="path-choice__art path-choice__art--saturated" src="assets/paths/generated-literary.png" alt=""/></span><strong>الأدبي</strong></label>
        </div>
        <small class="visitor-field-error" data-field-error="path" hidden></small>
        <button class="visitor-primary" type="button" data-step-next>متابعة</button>
      </section>
      <section class="onboarding-step" data-onboarding-step="3" hidden>
        ${rocky("standing-still", "روكي يقف مبتسمًا")}
        <h1 tabindex="-1">ما بريدك الإلكتروني؟</h1>
        <p>يمكنك استخدامه لتسجيل الدخول إلى حسابك.</p>
        ${field("email", "البريد الإلكتروني", 'type="email" autocomplete="email" maxlength="254" inputmode="email" dir="ltr" placeholder="name@example.com" required')}
        <button class="visitor-primary" type="button" data-step-next>متابعة</button>
      </section>
      <section class="onboarding-step" data-onboarding-step="4" hidden>
        ${rocky("standing-still", "روكي يقف مبتسمًا")}
        <h1 tabindex="-1">اختر كلمة مرور</h1>
        <p>استخدم 8 أحرف على الأقل، بينها حرف ورقم.</p>
        ${field("password", "كلمة المرور", 'type="password" autocomplete="new-password" maxlength="128" required')}
        <button class="visitor-primary" type="button" data-step-next>متابعة</button>
      </section>
      <section class="onboarding-step" data-onboarding-step="5" hidden>
        ${rocky("standing-still", "روكي يقف مبتسمًا")}
        <h1 tabindex="-1">هل تريد إضافة رقم هاتف؟</h1>
        <p>هذه الخطوة اختيارية، ويمكنك ترك الحقل فارغًا.</p>
        ${field("phone", "رقم الهاتف (اختياري)", 'inputmode="tel" autocomplete="tel" maxlength="21" dir="ltr" placeholder="05xxxxxxxx"')}
        <button class="visitor-primary" type="submit">إنشاء الحساب</button>
        <button class="onboarding-skip" type="button" data-skip-field="phone" data-skip-submit>ليس لدي رقم هاتف</button>
      </section>
      <div class="visitor-callout visitor-callout--error" data-auth-error role="alert" hidden></div>
    </form>
    <div class="auth-links"><span>لديك حساب؟</span><button type="button" data-flow="sign-in">تسجيل الدخول</button></div>
  </section>`);
}

export function accountCompleteMarkup() {
  return shell(`<section class="auth-page onboarding-page onboarding-complete" aria-labelledby="onboarding-complete-title">
    ${rocky("happy-jump", "روكي يقفز فرحًا")}
    <h1 id="onboarding-complete-title" tabindex="-1">رائع! أصبح كل شيء جاهزًا</h1>
    <p>لنبدأ رحلتك الآن.</p>
    <span class="visually-hidden" role="status">تم إنشاء حسابك بنجاح. جارٍ فتح لوحة التعلّم.</span>
  </section>`);
}

export function signInMarkup() {
  const form = `<form class="auth-form" data-sign-in-form novalidate>
    ${field("identifier", "اسم المستخدم أو البريد الإلكتروني أو رقم الهاتف", 'autocomplete="username" maxlength="254" required')}
    ${field("password", "كلمة المرور", 'type="password" autocomplete="current-password" maxlength="128" required')}
    <button class="visitor-primary" type="submit">تسجيل الدخول</button>
    <div class="visitor-callout visitor-callout--error" data-auth-error role="alert" hidden></div>
  </form>`;
  return authShell("تسجيل الدخول", "مرحبًا بعودتك. أدخل بيانات حسابك للمتابعة.", form,
    '<span>ليس لديك حساب؟</span><button type="button" data-flow="register">إنشاء حساب</button>');
}
