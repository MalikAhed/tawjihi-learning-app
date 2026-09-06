import { animateView } from "./view-motion.js";

const action = (label, variant = "secondary", extra = "") => `<button type="button" class="system-action system-action--${variant}" ${extra}>${label}</button>`;
const sample = (title, preview, use, rule = "") => `<article class="system-sample"><div class="system-sample-preview">${preview}</div><div class="system-sample-copy"><h3>${title}</h3><p>${use}</p>${rule ? `<small>${rule}</small>` : ""}</div></article>`;
const section = (id, number, title, description, content) => `<section class="system-section" id="system-${id}"><header><span>${number}</span><div><h2>${title}</h2><p>${description}</p></div></header>${content}</section>`;
const colors = [
  ["الإجراء الأساسي", "#58cc02", "للبدء والإرسال والتحقّق والمتابعة. إجراء أساسي واحد لكل مهمة."],
  ["حافة الإجراء", "#46a302", "الحافة السفلية للزر الأخضر، لإظهار عمقه."],
  ["الأزرق السماوي", "#1cb0f6", "لأيقونات التنقل وحدود العناصر المحددة ولمسات الهوية."],
  ["خلفية التحديد", "#e8f7ff", "للتبويب الحالي والإجابة المختارة، مع حد أزرق واضح."],
  ["النص الأزرق", "#0875a5", "للنصوص المقروءة على الخلفيات البيضاء والزرقاء الفاتحة."],
  ["خلفية الصفحة", "#fafafa", "المساحة خلف الأقسام والبطاقات."],
  ["سطح المحتوى", "#ffffff", "للبطاقات والحقول والنوافذ ولوحة التجربة."],
  ["الحدود", "#d4d4d4", "للفواصل والعناصر غير المحددة."],
  ["العناوين", "#30475a", "للعناوين والمعلومات الأبرز."],
  ["النص الثانوي", "#626b76", "للشرح والتلميحات والتفاصيل المساندة."],
  ["النجاح", "#e5f7dc", "لنتيجة مؤكدة، مع علامة صح وشرح مختصر."],
  ["الخطأ", "#fff0f3", "للأخطاء والإجراءات الحذفية، مع توضيح طريقة المعالجة."],
  ["التقدّم", "#f4c430", "أصفر لامع لتقدّم الدرس. اللمعة أفتح والحافة السفلية أغمق."],
];
const assets = [
  ["rocky-standing-still-reduced.svg", "وقوف هادئ", "لمرافقة المحتوى والحالات الفارغة."],
  ["rocky-wave.svg", "ترحيب", "لتحية قصيرة عند الدخول، بعيدًا عن المهام الكثيفة."],
  ["rocky-thinking.svg", "تفكير", "أثناء تقييم الإجابة، مع نص يوضّح الحالة."],
  ["rocky-happy-jump.svg", "نجاح", "بعد اكتمال مرحلة والتحقّق من نتيجتها."],
  ["rocky-working.svg", "عمل", "أثناء تجهيز مهمة أو ميزة."],
];
const iconNames = { home:"الرئيسية", levels:"المستويات", quests:"المهام", shop:"المتجر", challenges:"التحديات", streak:"الاستمرارية", rank:"الترتيب", questions:"الأسئلة", lessons:"الدروس", curriculum:"المنهاج", "quest-time":"الوقت", "subject-lock":"محتوى مقفل" };
export function renderCurrentDesignSystem(container) {
  container.classList.add("current-system");
  container.dir = "rtl";
  container.lang = "ar";
  const controller = new AbortController();
  const { signal } = controller;
  const navItems = [...document.querySelectorAll('.topbar .nav-item')].map((node) => `<button class="nav-item" type="button" aria-pressed="${node.dataset.page === "more"}">${node.innerHTML}</button>`).join("");
  container.innerHTML = `<header class="system-hero"><div><span>نظام التصميم الحالي</span><h1>لغة واحدة.<br>لكل شاشة.</h1><p>واجهتنا بالأزرق والأخضر والأبيض. ابحث عن المكوّن، تعرّف على دوره، وأعد استخدامه بالطريقة نفسها.</p></div><img src="assets/mascot/rocky-standing-still-reduced.svg" alt="روكي، شخصية التطبيق" /></header><nav class="system-index" aria-label="أقسام نظام التصميم">${["الأزرار والتنقل", "لوحة الألوان", "البطاقات والأقسام", "الحقول والحالات", "الرسومات وروكي", "النص والحركة"].map((name,index) => `<a href="#system-${["actions","colors","cards","feedback","assets","type"][index]}">${name}</a>`).join("")}</nav>
  ${section("actions", "٠١", "الأزرار والتنقل", "كل ما يمكن النقر عليه في مكان واحد: الأزرار، الروابط، التبويبات، الأيقونات، والبطاقات الكاملة.", `<div class="system-rule"><strong>اختر اللون بحسب الوظيفة.</strong> الأخضر لإنجاز المهمة، والأزرق الفاتح للتحديد، والأبيض بنص أزرق للإجراء الثانوي. النصوص والأيقونات البسيطة للتنقل الهادئ.</div><div class="system-samples">
  ${sample("أساسي · أخضر", action("متابعة", "primary"), "ابدأ الدرس، أرسل الإجابة، احفظ التغيير، أو انتقل إلى الخطوة التالية.", "إجراء أساسي واحد في كل مجموعة. بعد الإجابة الخاطئة، يبقى زر المحاولة أخضر وتشرح رسالة الخطأ ما يجب تعديله.")}
  ${sample("محدد · أزرق فاتح", action("القسم الحالي", "selected", 'aria-pressed="true"'), "ميّز التبويب النشط أو الوجهة الحالية أو الإجابة المختارة.", "أضف حدًا أزرق وحالة تحديد واضحة. الأزرق يعني الاختيار، ولا يعني أن الإجابة صحيحة.")}
  ${sample("ثانوي · أبيض بنص أزرق", action("السابق"), "للرجوع والإلغاء وفتح قالب أو أداة اختيارية.", "يحافظ على ارتفاع الزر الأساسي واستدارته. يظهر السابق في يمين تذييل الدرس، والمتابعة في يساره.")}
  ${sample("هادئ · نص أو أيقونة", `${action("اعرف المزيد ←", "quiet")}${action("×", "quiet", 'aria-label="إغلاق المعاينة"')}`, "للروابط المساندة والإغلاق والخيارات الإضافية.", "مساحة النقر لا تقل عن ٤٤ بكسل حتى دون خلفية ظاهرة. سمّ الأزرار التي تحتوي على أيقونة فقط.")}
  ${sample("غير متاح", action("متابعة", "primary", "disabled"), "عندما لا يمكن تنفيذ الإجراء قبل إكمال المدخلات المطلوبة.", "اشرح المطلوب بالقرب منه. استخدم التعطيل الفعلي، ولا تعتمد على الرمادي وحده.")}
  ${sample("حذفي · أحمر", action("مسح البيانات", "danger"), "لحذف البيانات أو إعادة ضبطها.", "اطلب تأكيدًا للتغييرات التي لا يمكن التراجع عنها. لا تستخدم الأحمر للمحاولة العادية.")}
  </div><article class="system-wide"><h3>التنقل الرئيسي</h3><div class="system-nav-demo">${navItems}</div><p>استخدم الأيقونة الحالية مع اسم الوجهة. تُميّز الوجهة النشطة بخلفية زرقاء فاتحة، ويحافظ التنقل على ترتيب ثابت.</p></article><article class="system-wide"><h3>التبويبات والروابط والبطاقات القابلة للنقر</h3><div class="system-nav-examples"><div class="system-demo-tabs" aria-label="مثال للتبويبات">${action("نظرة عامة", "selected", 'aria-pressed="true"')}${action("التفاصيل", "quiet", 'aria-pressed="false"')}</div><a href="#system-assets">اعرض مكتبة الرسومات ←</a><a class="system-resource" href="#system-cards"><strong>بطاقة مرجع</strong><span>وجهة واحدة للبطاقة كاملة ↖</span></a></div><p>التبويب يبدّل لوحة، والرابط يفتح وجهة. يظهر إطار التركيز نفسه للبطاقة والزر. لا تضع زرًا داخل رابط البطاقة.</p></article>`)}
  ${section("colors", "٠٢", "لوحة الألوان", "ألوان موحّدة بحسب الوظيفة. تحتفظ الأزرار بأدوارها اللونية مهما تغيّر موضوع الدرس.", `<div class="system-colors">${colors.map(([name,hex,use]) => `<article><span style="background:${hex}"></span><h3>${name}</h3><code dir="ltr">${hex}</code><p>${use}</p></article>`).join("")}</div><p class="system-note">استخدم الأزرق الداكن للنصوص الصغيرة، والأزرق الزاهي للتعبئة والحدود. تأكّد من تباين النص مع الخلفية في كل حالة.</p>`)}
  ${section("cards", "٠٣", "البطاقات والأقسام", "اجمع المحتوى المرتبط في مساحة واحدة، واستخدم التباعد لتوضيح التسلسل قبل إضافة حاوية أخرى.", `<div class="system-samples">${sample("بطاقة محتوى", '<div class="system-content-card"><span>درس</span><h3>خطوة تالية واضحة</h3><p>عنوان واحد، وتفصيل مساند، وإجراء واضح.</p></div>', "لدرس أو مادة أو قالب واحد.", "سطح أبيض وحد محايد، واستدارة ١٦–٢٤ بكسل، ومساحة داخلية ٢٤ بكسل.")}${sample("بطاقة محددة", '<div class="system-content-card is-selected"><strong>إجابة مختارة</strong><p>يظهر الاختيار قبل التحقّق.</p></div>', "لإبراز الإجابة أو الوجهة المختارة.", "خلفية زرقاء فاتحة وحد أزرق. الأخضر يأتي بعد تأكيد صحة الإجابة.")}${sample("قسم", '<div class="system-section-demo"><span>تقدّمك</span><h3>واصل التعلّم</h3><p>مساحة مريحة بين البطاقات المرتبطة.</p></div>', "لفصل موضوع أو مهمة داخل الصفحة.", "غالبًا يكفي عنوان وتباعد ٢٤–٣٢ بكسل. تجنّب تكرار الصناديق داخل بعضها.")}${sample("تذييل الإجراءات", `<div class="system-footer-demo">${action("السابق")}${action("متابعة", "primary")}</div>`, "السابق في الطرف الأيمن، والمتابعة في الطرف الأيسر.", "تبقى رسالة النتيجة بين الطرفين على الشاشة الواسعة، وفوق الأزرار على الهاتف.")}${sample("شريط التقدّم", '<div class="system-progress-demo" role="progressbar" aria-label="تقدّم الدرس" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65"><span></span></div>', "لإظهار الجزء المكتمل من الدرس.", "أصفر لامع، مع إضاءة علوية وحافة أغمق. يتحرك من اليمين إلى اليسار في الواجهة العربية.")}</div>`)}
  ${section("feedback", "٠٤", "الحقول والحالات", "سمّ الحالة بالكلمات، واستخدم اللون والأيقونة لتأكيد المعنى.", `<div class="system-samples">${sample("حقل إدخال", '<label class="system-field">إجابتك<input placeholder="اكتب شرحًا قصيرًا" /><small>يبقى اسم الحقل ظاهرًا أثناء الكتابة.</small></label>', "لإجابة قصيرة؛ استخدم مساحة نصية للإجابات الأطول.", "اسم ظاهر وتلميح مفيد وإطار تركيز أزرق.")}${sample("خيار إجابة", '<button class="lesson-answer" type="button" aria-pressed="false"><span>أ</span><b>اختر إجابة</b></button>', "استخدم بطاقة الإجابة نفسها لجميع الخيارات.", "غير محدد، ثم أزرق عند الاختيار، ثم نجاح أو خطأ بعد التحقّق، مع شرح للنتيجة.")}${sample("نجاح", '<div class="system-feedback is-success"><strong>✓ إجابة صحيحة</strong><p>يتضمن شرحك الفكرة الأساسية.</p></div>', "لتأكيد اكتمال إجراء.", "علامة صح، ونتيجة مختصرة، وخطوة تالية.")}${sample("خطأ", '<div class="system-feedback is-error"><strong>! حاول مرة أخرى</strong><p>أضف الخطوة الناقصة، ثم تحقّق من إجابتك.</p></div>', "لتوضيح ما يحتاج إلى تعديل دون حذف المدخلات.", "يبقى زر المحاولة أخضر، ويظل التركيز قريبًا من المشكلة.")}</div>`)}
  ${section("assets", "٠٥", "الرسومات وروكي", "أعد استخدام ملفات SVG الفعلية، واختر ظهور روكي بحسب وظيفة واضحة.", `<div class="system-icon-grid">${Object.entries(iconNames).map(([name,label]) => { const file = name === "subject-lock" ? name : `dashboard-${name}`; return `<figure><img src="assets/icons/${file}.svg" alt="" loading="lazy" /><figcaption>${label}</figcaption><code dir="ltr">${file}.svg</code></figure>`; }).join("")}</div><p class="system-note">للتنقل: أيقونة واسم. للحالة: أيقونة وقيمة. للزينة: وصف بديل فارغ. حافظ على نسب SVG الأصلية، ولا تعِد رسم أصل موجود.</p><div class="system-mascots">${assets.map(([file,name,use]) => `<figure><picture><source media="(prefers-reduced-motion: reduce)" srcset="assets/mascot/${file === "rocky-thinking.svg" ? "rocky-thinking-reduced.svg" : file === "rocky-working.svg" ? "rocky-working-reduced.svg" : "rocky-standing-still-reduced.svg"}" /><img src="assets/mascot/${file}" alt="روكي: ${name}" loading="lazy" /></picture><figcaption><strong>${name}</strong><p>${use}</p><code dir="ltr">${file}</code></figcaption></figure>`).join("")}</div>`)}
  ${section("type", "٠٦", "النص والتباعد والحركة", "واجهة عربية من اليمين إلى اليسار، مع إبقاء الشيفرة البرمجية من اليسار إلى اليمين.", `<div class="system-samples">${sample("الخط", '<div><h2>خطوتك التالية تبدأ هنا</h2><p>تعلّم خطوة بخطوة، وراجع إجابتك بوضوح.</p></div>', "خط Arial أو خط النظام الحالي. اصنع التسلسل البصري بالحجم والوزن.", "عنوان الصفحة ٢٨–٣٢ بكسل، وعنوان القسم ٢٢–٢٤، والنص ١٦، والمعلومات المساندة ١٢–١٤.")}${sample("التباعد والاستدارة", '<div class="system-spacing">'+[8,12,16,24,32].map(n => `<span><i style="width:${n}px"></i>${n}px</span>`).join("")+'</div>', "استخدم مقياس التباعد الحالي: ٨، ١٢، ١٦، ٢٤، ٣٢ بكسل.", "استدارة الأزرار ١٤ بكسل ومساحة نقر ٤٤ بكسل على الأقل. اترك ٣٢ بكسل بين الأقسام.")}${sample("الحركة ولوحة المفاتيح", action("أعد عرض الحركة", "secondary", 'data-system-replay'), "استخدم حركة الانتقال المشتركة عند تغيير الشاشة، واستجابات قصيرة للتحويم والنقر.", "احترم تفضيل تقليل الحركة. يصل Tab إلى كل عنصر، ويعيد الإغلاق التركيز إلى العنصر الذي فتح الشاشة.")}</div>`)}<p role="status" class="system-demo-status" aria-live="polite"></p>`;
  container.querySelectorAll('a[href^="#system-"]').forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    const target = container.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block:"start" });
    target.tabIndex = -1; target.focus({ preventScroll:true });
  }, { signal }));
  container.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    const group = button.closest(".system-demo-tabs, .system-nav-demo");
    if (group) group.querySelectorAll("button").forEach(item => { item.setAttribute("aria-pressed", String(item === button)); item.classList.toggle("is-active", item === button); });
    if (button.matches("[data-system-replay]")) animateView(button.closest(".system-sample"));
    if (button.matches(".lesson-answer")) { const selected = button.getAttribute("aria-pressed") !== "true"; button.setAttribute("aria-pressed", String(selected)); button.classList.toggle("is-selected", selected); }
    container.querySelector(".system-demo-status").textContent = `معاينة المكوّن: ${button.textContent.trim() || "إغلاق"}.`;
  }, { signal }));
  return () => { controller.abort(); container.classList.remove("current-system"); container.removeAttribute("dir"); container.removeAttribute("lang"); };
}
