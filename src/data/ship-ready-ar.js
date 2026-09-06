// Arabic presentation of the template fixtures; IDs and code remain unchanged.
const copy = {
  "ship-ready-markdown": { label:"مساحة الكتابة", title:"محرّر المحتوى", chromeTitle:"محرّر المحتوى" },
  "ship-ready": { label:"قالب الشرح", title:"مساحة المحتوى", chromeTitle:"مساحة المحتوى", content:{ title:"مساحة المحتوى" } },
  "ship-ready-mcq": { label:"اختيار من متعدد", title:"اختر الإجابة", chromeTitle:"اختر الإجابة", content:{
    kicker:"تحقّق من فهمك · اختر إجابة واحدة", title:"استجابات HTTP", prompt:"ما رمز الحالة الأنسب لطلب POST ناجح أنشأ موردًا جديدًا؟",
    idleFeedback:"اختر أفضل إجابة، ثم تحقّق من اختيارك.", selectedFeedback:"تم اختيار الإجابة. تحقّق منها عندما تكون جاهزًا.",
    correctFeedback:"يشير الرمز `201 Created` إلى أن الطلب أنشأ موردًا جديدًا.", wrongFeedback:"عند إنشاء مورد بنجاح، نستخدم الرمز `201 Created`.",
  } },
  "ship-ready-response": { label:"إجابة كتابية", title:"اشرح بأسلوبك", chromeTitle:"اشرح بأسلوبك", content:{
    title:"الطلب والاستجابة", prompt:"اشرح الفرق بين الطلب والاستجابة بأسلوبك، واستعن بمثال واضح.",
    rubricTitle:"تتضمن الإجابة الجيدة", rubric:["ما يرسله العميل", "ما يعيده الخادم", "مثالًا واقعيًا واحدًا"],
    fieldLabel:"إجابتك", placeholder:"الطلب هو ما يرسله العميل إلى الخادم…", guideTitle:"اشرح الفكرة بأسلوبك", guide:"ابدأ بما يرسله العميل، ثم وضّح ما يعيده الخادم، وأضف مثالًا واحدًا.",
  } },
  "ship-ready-sequence": { label:"ترتيب خطوات", title:"رتّب الخطوات", chromeTitle:"رتّب الخطوات", content:{
    kicker:"خطوات متتابعة · رحلة الطلب", title:"رتّب رحلة فتح الرابط", prompt:"ماذا يحدث بعد النقر على رابط وقبل ظهور الصفحة الجديدة؟",
    mascot:"تتبّع الرابط خطوة بخطوة!", placeholder:"اختر خطوة من الأسفل",
    steps:[{ id:"render", text:"يعرض المتصفح الصفحة الجديدة" }, { id:"request", text:"يرسل المتصفح طلب HTTP" }, { id:"click", text:"ينقر المستخدم على الرابط" }, { id:"response", text:"يرسل الخادم الاستجابة" }],
    correctFeedback:"نقرة، ثم طلب، ثم استجابة، ثم عرض الصفحة.", wrongFeedback:"ابدأ بالنقر، ثم الطلب، ثم الاستجابة، وأخيرًا عرض الصفحة.",
  } },
  "ship-ready-fill-blanks": { label:"سؤال برمجي", title:"أكمل الفراغات", chromeTitle:"أكمل الفراغات", content:{
    kicker:"تحقّق من الشيفرة · أكمل الفراغات", title:"أكمل طلب جلب المستخدمين", prompt:"اختر القيم المناسبة لجلب قائمة المستخدمين.", mascot:"فراغ واحد في كل مرة، أنت تستطيع!", codeLabel:"شيفرة JavaScript تحتوي على فراغين",
    correctFeedback:"يرسل المتصفح طلب `GET` إلى المسار `/api/users`.", wrongFeedback:"اختر المسار أولًا، ثم طريقة الطلب `GET`.",
  } },
  "ship-ready-spot-bug": { label:"تصحيح الأخطاء", title:"اكتشف الخطأ", chromeTitle:"اكتشف الخطأ", content:{
    kicker:"تصحيح الشيفرة · اكتشف الخطأ", title:"أي سطر يحتوي على الخطأ؟", prompt:"اختر السطر الذي يحتوي على خطأ نحوي، ثم حدّد السبب.", mascot:"اقرأ الشيفرة سطرًا سطرًا.",
    reasons:[{ id:"method", text:"الدالة `json` غير موجودة" }, { id:"parenthesis", text:"قوس الإغلاق مفقود" }, { id:"await", text:"لا يمكن استخدام `await` هنا" }, { id:"declaration", text:"يجب تعريف المتغير باستخدام `let`" }],
    correctFeedback:"يفتقد السطر الثالث قوس إغلاق الاستدعاء `response.json()`.", wrongFeedback:"الخطأ في السطر الثالث: يحتاج `response.json(;` إلى قوس إغلاق.",
  } },
  "ship-ready-code-lab": { label:"تدريب برمجي", title:"محرّر الشيفرة", chromeTitle:"محرّر الشيفرة", content:{
    instructions:"# مهمّتك\n\nأضف خلفية إلى بطاقة المستكشف، وحافظ على عنوان واضح داخل عنصر دلالي.\n\n## المتطلبات\n\n- [ ] ضع اسم المستكشف داخل عنصر `h1`.\n- [ ] أضف خلفية باستخدام `background` أو `background-color`.",
  } },
};
export function localizeShipReady(template) {
  if (!template) return null;
  const translated = copy[template.route] || {};
  return { ...template, ...translated, ...(template.content ? { content:{ ...template.content, ...translated.content, locale:"ar" } } : {}) };
}
