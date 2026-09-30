import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const LESSON_MARKDOWN = `<!-- step-id: app-inventor-tools-mission -->
<!-- presentation: video-intro -->
# أدوات App Inventor وخصائص الواجهة

https://www.youtube.com/watch?v=CVwK8gwlv2o

الكتاب ص 43–44، 47–49؛ الشرح والخلاصة أدناه لهذه الصفحات. قد يتضمن الفيديو توسعًا خارجها.

- [مرجع الكتاب، ص 43–44، 47–49](assets/books/ict.pdf#page=45)
- [مرجع الملخص، ص 62–65](assets/books/summary.pdf#page=62)

<!-- lesson-step -->
<!-- step-id: app-inventor-tools-summary -->
<!-- presentation: lesson-summary -->
# خلاصة: أدوات App Inventor وخصائص الواجهة

![أدوات واجهة App Inventor — الملخص، الصفحة 62](assets/lessons/ict/summary/mobile-p062-inventor-tools.webp)

![خصائص أدوات الواجهة والجدول — الملخص، الصفحة 62](assets/lessons/ict/summary/mobile-p062-inventor-properties.webp)

> ترد Picture في الصورة بتهجئة غير دقيقة؛ وهي الخاصية المستخدمة لاختيار صورة أداة Image.

![الاسم البرمجي والنص الظاهر — الملخص، الصفحة 65](assets/lessons/ict/summary/mobile-p065-inventor-names.webp)

## يجب حفظه

- **Designer** لتصميم الواجهة وضبط خصائصها، و**Blocks** لتركيب البرمجة التي تحدد سلوكها.
- من **User Interface**: أداة **Label** لعرض النص والنتائج، **TextBox** لإدخال النص أو القيم، **Button** لتنفيذ أمر عند النقر، و**Image** لعرض صورة.
- من **Layout**: **HorizontalArrangement** لترتيب الأدوات أفقيًا، و**TableArrangement** لترتيبها في صفوف وأعمدة.
- **Text** يحدد النص الظاهر، **BackgroundColor** لون الخلفية، **Visible** إظهار الأداة أو إخفاءها، و**Picture** صورة أداة Image. تضبط **Alignment = right** محاذاة الشاشة إلى اليمين في نشاط الوزن.
- **Rename** يغيّر الاسم البرمجي للأداة؛ تغيير **Text** يغيّر ما يراه المستخدم. الاسمان ليسا الشيء نفسه.
- تضبط **Rows** عدد الصفوف و**Columns** عدد الأعمدة في TableArrangement؛ ولعرض ملف في Image نختاره من **Picture** عبر upload file.

## افهم

- في تطبيق الكتاب يدخل الطالب الوزن والطول في TextBox، ثم يضغط Button، وتعرض Label النتيجة.
- اختيار الأداة يعتمد على وظيفتها: لا نستخدم Label بوصفها صندوق إدخال للمستخدم.
- قائمة أدوات الفيديو والتلخيص أوسع من النشاطين في الكتاب. نركز هنا على الأدوات المستخدمة في تطبيق الوزن والآلة الحاسبة، ولا نطلب أدوات الكرة والرسم خارج هذين النشاطين.

المراجع: [الكتاب ص 43–44، 47–49](assets/books/ict.pdf#page=45)، [التلخيص ص 62–65](assets/books/summary.pdf#page=62). النقاط هنا مصاغة من الجزء الموافق للكتاب.

:::mcq
id: app-inventor-tools-views
title: التصميم والبرمجة
question: أين تضبط أماكن الأدوات أولًا، وأين تحدد سلوكها عند النقر؟
- [x] correct | Designer للواجهة، وBlocks للسلوك
- [ ] alternative | Designer لبرمجة الأحداث، وBlocks لترتيب عناصر الشاشة
- [ ] other | Designer لترتيب الأدوات وبرمجة Click دون الانتقال إلى Blocks
explanation: Designer يرتب الأدوات ويضبط خصائصها، وBlocks يحدد ما يحدث عند النقر أو التهيئة.
hint: ميّز الشكل عن ما يحدث عند الاستخدام.
:::

:::mcq
id: app-inventor-tools-input
title: اختيار أداة الإدخال
question: أي أداة تختار لإدخال المستخدم طولًا في تطبيق الكتاب؟
- [ ] alternative | Label
- [ ] other | Button الذي يبدأ الحساب بعد إدخال القيم
- [x] correct | TextBox
explanation: TextBox يستقبل إدخال المستخدم، بينما Label يعرض نصًا أو نتيجة.
hint: المطلوب استقبال قيمة.
:::

:::mcq
id: app-inventor-tools-output
title: عرض النتيجة
question: في نشاط الكتاب، بعد حساب النتيجة، أي أداة مخصصة لعرضها للمستخدم؟
- [ ] other | TextBox المخصص لإدخال القيمة قبل الحساب
- [x] correct | Label
- [ ] alternative | HorizontalArrangement التي ترتب أدوات العرض لكنها لا تعرض قيمة بذاتها
explanation: Label يعرض نص النتيجة بعد إسنادها إلى خاصية Text؛ TextBox للإدخال والترتيب يجمع الأدوات.
hint: المطلوب إخراج قيمة مرئية.
:::

:::mcq
id: app-inventor-tools-button
title: تنفيذ الأمر
question: أي أداة يرتبط بها عادة حدث Click لتنفيذ الحساب في المثال؟
- [x] correct | Button
- [ ] alternative | TextBox الذي يكتب فيه المستخدم العدد
- [ ] other | Label الذي يعرض نتيجة العملية
explanation: يبدأ الحساب عند النقر على زر الأمر Button.
hint: ابحث عن أداة ينقرها المستخدم.
:::

:::mcq
id: app-inventor-tools-layouts
title: ترتيب الأدوات
question: نريد ستة أزرار في صفين وثلاثة أعمدة. ما الأداة المناسبة؟
- [ ] alternative | TextBox
- [ ] other | Label
- [x] correct | TableArrangement
explanation: أداة ترتيب الجدول تنظم الأدوات في صفوف وأعمدة، كما في الآلة الحاسبة.
hint: فكّر في صفوف وأعمدة.
:::

:::mcq
id: app-inventor-tools-horizontal
title: محاذاة الشاشة
question: في تصميم نشاط الوزن، ما الخاصية والقيمة اللتان تضبطان محاذاة الشاشة إلى اليمين؟
- [ ] other | Visible = false
- [x] correct | Alignment = right
- [ ] alternative | BackgroundColor = right
explanation: يضبط الكتاب محاذاة الشاشة إلى اليمين بقيمة right لخاصية Alignment؛ أما Visible فللظهور وBackgroundColor للون الخلفية.
hint: ابحث عن خاصية اتجاه العناصر على الشاشة.
:::

:::mcq
id: app-inventor-tools-table-size
title: ضبط شبكة الأزرار
question: لإنشاء جدول أزرار من صفين وثلاثة أعمدة في TableArrangement، ماذا تضبط؟
- [ ] alternative | Rows = 3 وColumns = 2
- [x] correct | Rows = 2 وColumns = 3
- [ ] other | Text = 2 وPicture = 3
explanation: Rows لعدد الصفوف وColumns لعدد الأعمدة؛ الصفان والثلاثة أعمدة تستوعب ستة أزرار.
hint: اربط اسم كل خاصية باتجاه العد.
:::

:::mcq
id: app-inventor-tools-names
title: الاسم الظاهر والبرمجي
question: أردت أن يظهر على الزر «احسب» مع بقاء اسمه البرمجي Button1. ماذا تغيّر؟
- [x] correct | خاصية Text
- [ ] alternative | Rename إلى احسب
- [ ] other | نوع الأداة إلى Image
explanation: Text يغير النص الظاهر؛ Rename يغير اسم الأداة المستخدم في البرمجة.
hint: المستخدم يرى النص وليس الاسم البرمجي.
:::

:::mcq
id: app-inventor-tools-properties
title: خصائص الواجهة
question: أي اقتران صحيح؟
- [ ] alternative | Visible للخلفية؛ BackgroundColor للصورة؛ Picture للإخفاء
- [ ] other | Visible للصورة؛ BackgroundColor للإظهار؛ Picture للون الخلفية
- [x] correct | Visible للإظهار؛ BackgroundColor للخلفية؛ Picture للصورة
explanation: Visible تضبط ظهور الأداة، BackgroundColor لون خلفيتها، وPicture صورتها.
hint: اربط معنى الاسم بوظيفته.
:::

<!-- lesson-step -->
<!-- step-id: app-inventor-blocks-mission -->
<!-- presentation: video-intro -->
# اللبنات والأحداث والمتغيرات

https://www.youtube.com/watch?v=VJHcUBHvNNI

الكتاب ص 44–46، 49–51؛ الشرح والخلاصة أدناه لهذه الصفحات. قد يتضمن الفيديو توسعًا خارجها.

- [مرجع الكتاب، ص 44–46، 49–51](assets/books/ict.pdf#page=46)
- [مرجع الملخص، ص 63–65، 67–68](assets/books/summary.pdf#page=63)

<!-- lesson-step -->
<!-- step-id: app-inventor-blocks-summary -->
<!-- presentation: lesson-summary -->
# خلاصة: اللبنات والأحداث والمتغيرات

![لبنات التحكم والحساب — الملخص، الصفحة 64](assets/lessons/ict/summary/mobile-p064-inventor-math-blocks.webp)

> تصحيح: floor يعطي أكبر عدد صحيح لا يتجاوز القيمة؛ مثلًا floor(-2.3) = -3، فلا نعرّفه بحذف الجزء العشري دائمًا. واسم مجموعة التحكم الصحيح Control.

![لبنات المنطق والمتغيرات — الملخص، الصفحة 64](assets/lessons/ict/summary/mobile-p064-inventor-variables.webp)

![حدث النقر وتهيئة الشاشة — الملخص، الصفحة 67](assets/lessons/ict/summary/mobile-p067-inventor-events.webp)

## يجب حفظه

- **الحدث Event** يحدد متى تنفذ اللبنات: **Button.Click** عند النقر، و**Screen.Initialize** عند تهيئة الشاشة.
- **المتغير** يحفظ قيمة تستخدم أثناء التنفيذ. **set** يسند قيمة، و**get** يقرأ القيمة المحفوظة.
- **if / else if / else** من مجموعة **Control** تختار المسار وفق الشروط. في السلسلة ينفذ أول فرع يتحقق شرطه.
- من **Math**: العمليات الحسابية والمقارنات والجذر التربيعي والدوال المثلثية؛ ومن **Variables** لبنات تعريف المتغيرات وقراءتها وتعديلها.
- قراءة **TextBox.Text** تجلب المدخل، وإسناد قيمة إلى **Label.Text** يعرض المخرج، وإسناد **false** إلى **Visible** يخفي الأداة.
- قيمتا **true** و**false** اللتان نضعهما في Visible تأتيان من مجموعة **Logic**.

## افهم

- تسلسل الحساب المعتاد: **اقرأ المدخلات ← احسب ← خزّن أو اعرض النتيجة**.
- لا تكفي تسمية متغير؛ يجب أن يكون للقيمة المستخدمة معنى وأن تصل من مدخل أو عملية سابقة.
- تغيير Visible لا يحذف الأداة أو يغيّر قيمتها إلى صفر. نعيد إظهارها بإسناد true.
- نطبق هذه الأساسيات على نشاطي الكتاب. اللبنات الإضافية في الفيديو لا تصبح متطلبات جديدة خارج صفحاته.

المراجع: [الكتاب ص 44–46، 49–51](assets/books/ict.pdf#page=46)، [التلخيص ص 63–65، 67–68](assets/books/summary.pdf#page=63). النقاط هنا مصاغة من الجزء الموافق للكتاب.

:::mcq
id: app-inventor-blocks-click
title: متى يبدأ التنفيذ؟
question: متى ينفذ الجسم الموجود داخل when Button1.Click؟
- [x] correct | عند النقر على Button1
- [ ] alternative | عند تهيئة الشاشة حتى لو لم يُنقر الزر
- [ ] other | عند تغيير نص TextBox فقط من دون نقر الزر
explanation: لبنة Button1.Click تنفذ جسمها بعد حدث النقر على الزر المحدد؛ التهيئة وتغيير النص حدثان مختلفان.
hint: اقرأ اسم الحدث.
:::

:::mcq
id: app-inventor-blocks-initialize
title: تهيئة الشاشة
question: نريد إخفاء أدوات عند بدء الشاشة. أي حدث مناسب؟
- [ ] alternative | Button.Click الذي يتطلب ضغط المستخدم بعد بدء التطبيق
- [ ] other | TextBox.TextChanged الذي يتطلب تغير المدخلات
- [x] correct | Screen.Initialize
explanation: Screen.Initialize يضبط الحالة الابتدائية بمجرد تهيئة الشاشة؛ لا ينتظر نقرًا أو تعديل نص.
hint: المطلوب يحدث في البداية.
:::

:::mcq
id: app-inventor-blocks-set-get
title: قراءة المتغير وتعديله
question: ما الفرق بين set global x وget global x؟
- [ ] other | set يقرأ القيمة الحالية؛ get يكتب قيمة جديدة
- [x] correct | set يعدّل القيمة؛ get يقرأها
- [ ] alternative | كلاهما يقرأ القيمة الحالية ولا يغيرها
explanation: set يسند قيمة إلى المتغير، وget يقرأ قيمته الحالية لاستخدامها في الحساب أو العرض.
hint: فكّر في الكتابة والقراءة.
:::

:::mcq
id: app-inventor-blocks-conditional
title: اتخاذ القرار
question: أي لبنة تختار لعرض رسائل مختلفة حسب تحقق شروط؟
- [x] correct | if من Control
- [ ] alternative | Picture من Image
- [ ] other | Rename من قائمة الأدوات
explanation: if تنفذ فروعًا مختلفة بناءً على شرط أو أكثر.
hint: المطلوب قرار لا تغيير مظهر.
:::

:::mcq
id: app-inventor-blocks-math
title: مجموعة الحساب
question: من أي مجموعة نأخذ لبنة المقارنة والضرب في أمثلة الكتاب؟
- [ ] alternative | Layout
- [ ] other | User Interface
- [x] correct | Math
explanation: Math تتضمن اللبنات الحسابية والمقارنات، وLayout لأدوات ترتيب الواجهة.
hint: قارن مجموعات اللبنات بمجموعات التصميم.
:::

:::mcq
id: app-inventor-blocks-io
title: من المدخل إلى المخرج
question: ما التسلسل الصحيح لجمع قيمتي مربعَي نص وعرض الناتج؟
- [ ] other | قراءة Label.Text بوصفه مدخلًا، ثم كتابة الناتج في TextBox.Text
- [x] correct | قراءة TextBox.Text ثم الجمع ثم إسناد الناتج إلى Label.Text
- [ ] alternative | إسناد TextBox1.Text إلى Label.Text قبل قراءة القيمة الثانية أو إجراء الجمع
explanation: نقرأ القيم المدخلة في TextBox ونحسب مجموعهما كأعداد، ثم نسند الناتج إلى Label.Text ليظهر.
hint: ابدأ بالقيم التي يحتاجها الحساب.
:::

:::mcq
id: app-inventor-blocks-visible
title: معنى الإخفاء
question: ما نتيجة set Label1.Visible to false؟
- [x] correct | إخفاء Label1 دون حذفها
- [ ] alternative | حذف Label1 نهائيًا من المشروع
- [ ] other | تصفير كل المتغيرات
explanation: Visible يغير الظهور فقط، ويمكن إعادة الإظهار بقيمة true.
hint: لا تخلط الظهور بالمحتوى.
:::

:::mcq
id: app-inventor-blocks-event-trace
title: تتبّع حدث ومتغير
question: بدأ المتغير count بالقيمة 0. عند كل نقرة على Button1 نضبطه على get count + 1 ثم نعرضه في Label1. ما النص المعروض بعد نقرتين؟
- [ ] zero | 0 لأن المتغير لا يتغير داخل Click
- [ ] one | 1 لأن Label تتغير في النقرة الأولى فقط
- [x] two | 2 لأن الحدث ينفذ الزيادة مرتين ثم يعرض القيمة
explanation: يبدأ count بصفر، وبعد النقرات يصبح 1 ثم 2؛ إسناد القيمة إلى Label1.Text يعرض 2.
hint: تتبّع الحالة بعد كل نقرة، لا بعد بداية التطبيق فقط.
:::

<!-- lesson-step -->
<!-- step-id: bmi-interface-mission -->
<!-- presentation: video-intro -->
# تطبيق معامل السمنة: الواجهة والبرمجة

https://www.youtube.com/watch?v=1eH8PNtyca8

الكتاب ص 43–46، 52؛ الشرح والخلاصة أدناه لهذه الصفحات. قد يتضمن الفيديو توسعًا خارجها.

- [مرجع الكتاب، ص 43–46، 52](assets/books/ict.pdf#page=45)
- [مرجع الملخص، ص 66–70](assets/books/summary.pdf#page=66)

<!-- lesson-step -->
<!-- step-id: bmi-interface-summary -->
<!-- presentation: lesson-summary -->
# خلاصة: تطبيق معامل السمنة: الواجهة والبرمجة

![متغير معامل السمنة ولبنة الإدخال — الملخص، الصفحة 68](assets/lessons/ict/summary/mobile-p068-bmi-input-variable.webp)

![شروط معامل السمنة ونتائجها — الملخص، الصفحة 69](assets/lessons/ict/summary/mobile-p069-bmi-conditions.webp)

> نتبع أول شرط يتحقق في سلسلة if: القيمة 20 للفرع الثاني، و25 للثالث، و30 لفرع else. هذا مثال برمجي من الكتاب، وليس أداة لتقييم صحة الطالب.

## يجب حفظه

- مدخلا نشاط الكتاب: **TextBox1 للوزن بالكيلوغرام** و**TextBox2 للطول بالسنتيمتر**؛ يبدأ الحساب في **Button1.Click**.
- نحول الطول إلى متر بالقسمة على 100، ثم نحسب **factor = الوزن ÷ مربع الطول بالمتر**.
- في واجهة النشاط **Label6** يعرض القيمة العددية للمعامل، و**Label4** يعرض الرسالة الناتجة عن الشروط.
- تتكون الواجهة في الكتاب من 3 أدوات ترتيب أفقي، و6 أدوات Label، وصندوقَي TextBox، وزر Button، وأداة Image.

## افهم الشروط بالترتيب

| أول فرع ينطبق في لبنات الكتاب | الرسالة |
| --- | --- |
| factor أقل من 20 | وزنك أقل من الطبيعي |
| وإلا: factor أقل من 25 | وزنك مناسب |
| وإلا: factor أقل من 30 | زيادة في الوزن |
| وإلا | زيادة مفرطة |

- للقيم الحدية نتبع اللبنات المصورة: **20** يصل للفرع الثاني، **25** للثالث، و**30** لفرع else.
- في لقطة واجهة الكتاب: وزن 45 كغ وطول 150 سم يعطيان **45 ÷ 1.5² = 20**؛ فتظهر رسالة «وزنك مناسب».
- الشروط هنا للتدرب على برمجة مثال الكتاب وفهم مخرجاته، وليست أداة لتقييم صحة الطالب.

المراجع: [الكتاب ص 43–46، 52](assets/books/ict.pdf#page=45)، [التلخيص ص 66–70](assets/books/summary.pdf#page=66). النقاط هنا مصاغة من الجزء الموافق للكتاب.

:::mcq
id: bmi-interface-inputs
title: قراءة المدخلات
question: ما المصدران اللذان يعتمد عليهما factor في نشاط الكتاب؟
- [x] correct | TextBox1 للوزن وTextBox2 للطول
- [ ] alternative | Label4 وLabel6 بوصفهما مدخلَي المستخدم
- [ ] other | TextBox1 للوزن وLabel4 لكتابة الطول بدل عرضه
explanation: الوزن والطول مدخلان، أما Label4 وLabel6 فيستخدمان للإخراج.
hint: ميّز المدخل عن المخرج.
:::

:::mcq
id: bmi-interface-meters
title: تحويل الوحدة
question: أدخل المستخدم 180 سم. ما القيمة بالمتر قبل تربيع الطول؟
- [ ] alternative | 18000
- [ ] other | 0.18
- [x] correct | 1.8
explanation: نقسم السنتيمترات على100: 180÷100=1.8 متر.
hint: المتر يساوي100 سم.
:::

:::mcq
id: bmi-interface-formula
title: ترتيب الحساب
question: أي تعبير يطابق نشاط الكتاب عندما h بالسنتيمتر وw بالكيلوغرام؟
- [ ] other | w / (h / 100) من دون تربيع الطول
- [x] correct | w / ((h / 100) * (h / 100))
- [ ] alternative | (w / h) * h من دون تحويل السنتيمترات إلى أمتار
explanation: يحوّل نشاط الكتاب الطول من سم إلى متر، ثم يربع القيمة بالمتر، ثم يقسم الوزن على هذا المربع.
hint: لا تنس مربع الطول والتحويل.
:::

:::mcq
id: bmi-interface-calculate
title: تطبيق المعادلة
question: ما قيمة factor لمدخلين: وزن80 وطول200 سم؟
- [x] correct | 20
- [ ] alternative | 40
- [ ] other | 0.002
explanation: الطول2 متر، ومربعه4؛ 80÷4=20.
hint: حوّل الوحدة أولًا.
:::

:::mcq
id: bmi-interface-outputs
title: مكان النتيجة
question: في نموذج الكتاب، أين يظهر العدد وأين تظهر الرسالة؟
- [ ] alternative | العدد في Label4 والرسالة في Label6
- [ ] other | العدد والرسالة كلاهما في Label4
- [x] correct | العدد في Label6 والرسالة في Label4
explanation: في واجهة نشاط الكتاب Label6.Text للمعامل العددي، وLabel4.Text لرسالة الشرط.
hint: راجع أدوات الإخراج.
:::

:::mcq
id: bmi-interface-eighteen
title: تتبع شرط
question: إذا كان factor يساوي18، فأي رسالة تعرضها اللبنات؟
- [ ] other | زيادة مفرطة
- [x] correct | وزنك أقل من الطبيعي
- [ ] alternative | وزنك مناسب
explanation: 18 أقل من20، فينفذ الفرع الأول وتظهر الرسالة في Label4.
hint: ابدأ بأول شرط.
:::

:::mcq
id: bmi-interface-twenty
title: القيمة الحدية20
question: إذا كان factor يساوي20، فأي فرع ينفذ في اللبنات المصورة؟
- [x] correct | الفرع الثاني: وزنك مناسب
- [ ] alternative | الفرع الأول لأن20 أقل من20
- [ ] other | فرع else مباشرة
explanation: الشرط20<20 غير صحيح؛ الشرط20<25 صحيح، فينفذ الفرع الثاني.
hint: علامة أقل من لا تشمل المساواة.
:::

:::mcq
id: bmi-interface-twenty-seven
title: سؤال الكتاب عن factor
question: إذا كانت قيمة factor تساوي 27، فما الرسالة وأين تظهر؟
- [ ] alternative | «وزنك مناسب» في Label6
- [ ] other | «زيادة مفرطة» في Label4
- [x] correct | «زيادة في الوزن» في Label4
explanation: لا يحقق 27 شرطي أقل من20 وأقل من25، لكنه أقل من30؛ لذلك يُكتب نص الفرع الثالث في Label4.
hint: تتبع شروط المقارنة بالترتيب، ثم حدد أداة عرض الرسالة.
:::

:::mcq
id: bmi-interface-twenty-five
title: القيمة الحدية25
question: إذا كان factor يساوي25، فما مخرج اللبنات؟
- [ ] alternative | وزنك مناسب
- [ ] other | وزنك أقل من الطبيعي
- [x] correct | زيادة في الوزن
explanation: لا يتحقق <20 أو <25، ويتحقق <30، فتظهر زيادة في الوزن.
hint: جرّب الشروط بالترتيب.
:::

:::mcq
id: bmi-interface-thirty
title: القيمة الحدية30
question: إذا كان factor يساوي30، فما مخرج اللبنات؟
- [ ] other | وزنك مناسب
- [x] correct | زيادة مفرطة
- [ ] alternative | زيادة في الوزن
explanation: 30 لا تحقق أيًا من الشروط الثلاثة التي تستخدم <، فتصل إلى else.
hint: أي شرط أقل من يشمل30؟
:::

:::mcq
id: bmi-interface-interface
title: عدد صناديق الإدخال
question: لماذا يحتاج النشاط صندوقَي TextBox؟
- [x] correct | لإدخال الوزن والطول قبل الحساب
- [ ] alternative | لأن كل تطبيق يحتاج صندوقين دائمًا
- [ ] other | لأن Label لا تستطيع عرض النتائج
explanation: المعادلة تحتاج قيمتين مستقلتين؛ عدد الأدوات يتبع متطلبات التطبيق.
hint: انظر إلى متغيرات المعادلة.
:::

<!-- lesson-step -->
<!-- step-id: calculator-interface-mission -->
<!-- presentation: video-intro -->
# تطبيق العمليات الحسابية البسيطة

https://www.youtube.com/watch?v=bOotzHiK-hs

الكتاب ص 47–51؛ الشرح والخلاصة أدناه لهذه الصفحات. قد يتضمن الفيديو توسعًا خارجها.

- [مرجع الكتاب، ص 47–51](assets/books/ict.pdf#page=49)
- [مرجع الملخص، ص 71–74](assets/books/summary.pdf#page=71)

<!-- lesson-step -->
<!-- step-id: calculator-interface-summary -->
<!-- presentation: lesson-summary -->
# خلاصة: تطبيق العمليات الحسابية البسيطة

![خصائص أدوات الحاسبة — الملخص، الصفحة 71](assets/lessons/ict/summary/mobile-p071-calculator-controls.webp)

![قراءة المدخل وعرض ناتج الدالة — الملخص، الصفحة 73](assets/lessons/ict/summary/mobile-p073-calculator-sin.webp)

> تختلف أسماء الأدوات في هذا المثال عن أسماء الحاسبة في الكتاب؛ نتتبع الوظيفة نفسها: قراءة المدخل، وحساب sin، ثم عرض الناتج.

## يجب حفظه

- الحاسبة توفر وضع **متغير واحد** للدوال **sin وcos وtan**، ووضع **متغيرين** للجمع والطرح والضرب والقسمة والقوة وباقي القسمة.
- زر **btn_1oprand** يختار الوضع الأحادي، و**btn_2oprand** يختار الوضع الثنائي؛ تجمع **one_variable_Box** أزرار الدوال الأحادية، و**two_variable_Box** أزرار العمليات الست في جدول من صفين وثلاثة أعمدة، وتحتوي **Result_Box** عرض النتيجة.
- **Var1** و**Var2** لحفظ العددين، وقيمتهما الابتدائية في المثال صفر. **lbl_Result** يعرض النتيجة.
- في وضع المتغير الواحد نخفي صندوق العدد الثاني وأزرار العمليات الثنائية؛ وفي الوضع الثنائي نظهر المدخلين ونخفي العمليات الأحادية.
- **^** للقوة: العدد الأول مرفوع للأس الثاني. **mod** لباقي القسمة.
- عند **Screen.Initialize** تُخفى حاويتا إدخال العددين وحاويتا أزرار العمليات بقيمة **Visible = false**، فيبدأ المستخدم باختيار وضع الحساب.
- يصف النص المكتوب زر **btn_New** بأنه يفرّغ صناديق الإدخال ويعيد واجهة الاختيار. أمّا **اللبنات المصوّرة** للزر فتخفي الحاويات الأربع، وتمسح نص lbl_Result، وتعيد Var1 وVar2 إلى صفر؛ لا تظهر فيها لبنة تمسح نص صندوقَي الإدخال.

## افهم

- قراءة المدخلات تسبق تنفيذ العملية وعرض الناتج. تغيير الوضع يتم عبر خاصية **Visible** للمجموعات.
- عند نقر زر العملية، تُقرأ قيمة **txt_var1.Text** في Var1، وقيمة **txt_var2.Text** في Var2 عند الحاجة إليها، ثم تُحسب النتيجة وتُعرض في lbl_Result.Text. في زر **btn_Tan** تُقرأ الزاوية من txt_var1 فقط.
- عند \`Var1 = 7\` و\`Var2 = 3\`: الجمع10، والضرب21، و\`7 mod 3 = 1\`.
- الطرح والقسمة والقوة تتأثر بترتيب العددين: \`2 ^ 3 = 8\`، بينما \`3 ^ 2 = 9\`.
- في شرح الوضع الثنائي يطلب النص إخفاء الدوال الأحادية؛ إحدى اللبنات المصوّرة تضبط حاويتها على true. عند تفسير مقطع مصوّر نتبع قيمة Visible الموصولة باللبنة نفسها.

المراجع: [الكتاب ص 47–51](assets/books/ict.pdf#page=49)، [التلخيص ص 71–74](assets/books/summary.pdf#page=71). النقاط هنا مصاغة من الجزء الموافق للكتاب.

:::mcq
id: calculator-interface-unary
title: عملية بمدخل واحد
question: أي مجموعة تحتاج مدخلًا واحدًا في حاسبة الكتاب؟
- [x] correct | sin وcos وtan
- [ ] alternative | الجمع والطرح بين عددين
- [ ] other | القوة وباقي القسمة بين عددين
explanation: الدوال المثلثية في المثال تستخدم زاوية واحدة، بينما العمليات الثنائية تحتاج عددين.
hint: احسب عدد المدخلات المطلوبة.
:::

:::mcq
id: calculator-interface-binary
title: تبديل الوضع
question: وفق الوصف المكتوب لوضع «عمليات على متغيرين»، ماذا ينبغي أن يظهر؟
- [ ] alternative | صندوق العدد الأول وحده وأزرار sin/cos/tan
- [ ] other | صندوق العدد الثاني وحده مع الأزرار الثنائية
- [x] correct | صندوقَي العددين والعمليات الثنائية مع إخفاء الأحادية
explanation: يطلب الوصف المكتوب إظهار صندوقَي العددين والعمليات الثنائية وإخفاء sin وcos وtan؛ تخالف إحدى اللبنات المصوّرة هذا الوصف.
hint: الأدوات الظاهرة يجب أن توافق نوع العملية.
:::

:::mcq
id: calculator-interface-variables
title: القيم الابتدائية
question: ما قيمة Var1 وVar2 الابتدائية في المثال؟
- [ ] other | قيمة عشوائية لا نعرفها
- [x] correct | صفر لكل منهما
- [ ] alternative | واحد لكل منهما
explanation: يعرّف الكتاب المتغيرين بقيمة ابتدائية صفر قبل استخدام مدخلات المستخدم.
hint: راجع تعريف المتغيرين.
:::

:::mcq
id: calculator-interface-initial-visibility
title: حالة بداية الحاسبة
question: عند تنفيذ Screen.Initialize في لبنات الحاسبة، ماذا يحدث لحاويتَي إدخال العددين وحاويتَي العمليات؟
- [x] correct | تُخفى بقيمة Visible = false حتى يختار المستخدم وضعًا
- [ ] alternative | تظهر جميعها بقيمة Visible = true قبل اختيار الوضع
- [ ] other | تُحذف من تصميم التطبيق نهائيًا
explanation: تهيئة الشاشة تضبط Visible للحاويات الأربع على false؛ الإخفاء لا يحذف الأدوات.
hint: اقرأ قيمة Visible في حدث التهيئة.
:::

:::mcq
id: calculator-interface-refresh-inputs
title: تحديث المتغيرين قبل الضرب
question: عُرّف Var1 وVar2 بصفر، ثم كُتب 4 و6 في صندوقَي الإدخال ونُقر btn_Multiply. أي خطوة في اللبنات تجعل النتيجة 24 بدلًا من صفر؟
- [ ] alternative | إظهار lbl_Result دون قراءة صندوقَي الإدخال
- [x] correct | إسناد txt_var1.Text إلى Var1 وtxt_var2.Text إلى Var2 قبل الضرب
- [ ] other | إبقاء Var1 وVar2 على قيمتيهما الابتدائيتين ثم ضربهما
explanation: زر الضرب يحدّث المتغيرين من نصَّي الإدخال، ثم يضرب القيمتين المحفوظتين ويعرض الناتج.
hint: القيمة الابتدائية لا تتغير لمجرد الكتابة في الصندوق.
:::

:::mcq
id: calculator-interface-result
title: أداة الإخراج
question: أين يعرض النشاط نتيجة العملية؟
- [x] correct | lbl_Result
- [ ] alternative | txt_var1 الذي يدخل فيه المستخدم العدد الأول
- [ ] other | lbl_num2 الذي يعرّف صندوق العدد الثاني
explanation: lbl_Result أداة Label المخصصة لعرض النتيجة؛ أدوات الإدخال والعناوين لها أدوار أخرى.
hint: الاسم البرمجي يدل على النتيجة.
:::

:::mcq
id: calculator-interface-tan-flow
title: تتبع زر tan
question: عند النقر على btn_Tan في لبنات الكتاب، من أين تؤخذ الزاوية وأين يظهر ناتج tan؟
- [ ] alternative | من txt_var2.Text، ثم في txt_var1.Text
- [ ] other | من lbl_Result.Text، ثم في Var2 فقط
- [x] correct | من txt_var1.Text، ثم في lbl_Result.Text
explanation: يقرأ الزر مدخل العدد الأول في Var1، ويحسب tan له، ثم يسند الناتج إلى نص تسمية النتيجة.
hint: اتبع لبنتَي set داخل حدث btn_Tan.Click.
:::

:::mcq
id: calculator-interface-mod
title: باقي القسمة
question: ما ناتج 17 mod 5؟
- [ ] alternative | 3
- [ ] other | 85
- [x] correct | 2
explanation: 17=5×3+2؛ mod يعطي الباقي2 ولا يعطي خارج القسمة3.
hint: ما المتبقي بعد طرح15 من17؟
:::

:::mcq
id: calculator-interface-power
title: القوة والأس
question: إذا كانت القيمة الأولى2 والثانية3، فما نتيجة زر القوة؟
- [ ] other | 9
- [x] correct | 8
- [ ] alternative | 6
explanation: القوة تحسب2³=8؛ الضرب2×3=6 عملية مختلفة.
hint: الثاني هو الأس.
:::

:::mcq
id: calculator-interface-order
title: ترتيب العددين
question: هل تتساوى 9−4 مع4−9؟
- [x] correct | لا؛ الأولى5 والثانية−5
- [ ] alternative | نعم؛ كلاهما5
- [ ] other | نعم؛ كلاهما13
explanation: ترتيب المدخلات مهم في الطرح، وكذلك القسمة والقوة عمومًا.
hint: تتبع العدد الأول ثم الثاني.
:::

:::mcq
id: calculator-interface-new
title: ابدأ من جديد
question: ما الذي تنفذه اللبنات المصوّرة لزر btn_New بوضوح؟
- [ ] alternative | تمسح نصَّي txt_var1 وtxt_var2 وتُبقي حاويات العمليات ظاهرة
- [ ] other | تحذف الأدوات من تصميم التطبيق وتُبقي Var1 وVar2 دون تغيير
- [x] correct | تخفي الحاويات الأربع وتمسح lbl_Result وتعيد Var1 وVar2 إلى صفر
explanation: هذا ما يظهر في اللبنات المصوّرة. يذكر الوصف المكتوب تفريغ صناديق الإدخال أيضًا، لكن لبنة تفريغهما غير ظاهرة في الصورة.
hint: تتبع كل لبنة set داخل حدث btn_New.Click.
:::

<!-- lesson-step -->
<!-- step-id: calculator-events-mission -->
<!-- presentation: video-intro -->
# تطوير الحاسبة: الأرقام والدوال الإضافية

https://www.youtube.com/watch?v=7_8TQqE3UVI

الكتاب ص 52؛ الشرح والخلاصة أدناه لهذه الصفحة. قد يتضمن الفيديو توسعًا خارجها.

- [مرجع الكتاب، ص 52](assets/books/ict.pdf#page=54)
- [مرجع الملخص، ص 78–79](assets/books/summary.pdf#page=78)

<!-- lesson-step -->
<!-- step-id: calculator-events-summary -->
<!-- presentation: lesson-summary -->
# خلاصة: تطوير الحاسبة: الأرقام والدوال الإضافية

![الجذر التربيعي وfloor في تتبع اللبنات — الملخص، الصفحة 78](assets/lessons/ict/summary/mobile-p078-calculator-root-floor.webp)

> النتيجة 3 صحيحة لهذا المثال الموجب. تعريف floor العام: أكبر عدد صحيح لا يتجاوز القيمة؛ لذلك floor(-2.3) = -3.

![إضافة خانة رقمية عند النقر — الملخص، الصفحة 79](assets/lessons/ict/summary/mobile-p079-calculator-digits.webp)

> ظهور 1 بعد النقرة الأولى و11 بعد الثانية يفترض أن القيمة الابتدائية للمتغير x تساوي صفرًا.

## يجب حفظه

- سؤال الكتاب يطلب إضافة **square root** للجذر التربيعي، و**min** لاختيار الأصغر، و**floor** لأكبر عدد صحيح لا يتجاوز القيمة.
- يطلب أيضًا عشرة أزرار للأرقام **0–9** في وضع العمليات على متغير واحد.
- لبناء عدد من نقرات أرقام متتالية نستخدم: **القيمة الجديدة = القيمة السابقة × 10 + الرقم المنقور**.
- كل زر يرتبط بحدث **Click**، وبعد تحديث العدد نعرضه في أداة الإخراج المناسبة.

## افهم

- من القيمة0، نقر2 ثم5 يصنع25: أولًا \`0×10+2\` ثم \`2×10+5\`؛ الجمع وحده يعطي7.
- \`square root(81) = 9\`، و\`min(8, 3) = 3\`، و\`floor(3.8) = 3\`.
- لا نعرّف floor بأنه حذف الكسور دائمًا: \`floor(-2.3) = -3\` لأنه أكبر عدد صحيح لا يتجاوز−2.3.
- موضع السؤال في الكتاب المرفق ص52؛ قد يذكر الفيديو رقم صفحة مختلفًا لطبعة أخرى.

المراجع: [الكتاب ص 52](assets/books/ict.pdf#page=54)، [التلخيص ص 78–79](assets/books/summary.pdf#page=78). النقاط هنا مصاغة من الجزء الموافق للكتاب.

:::mcq
id: calculator-events-sqrt
title: الجذر التربيعي
question: ما ناتج square root(64)؟
- [x] correct | 8
- [ ] alternative | 32
- [ ] other | 4096
explanation: 8×8=64، لذلك الجذر التربيعي64 يساوي8.
hint: ابحث عن عدد مربعه64.
:::

:::mcq
id: calculator-events-min
title: العدد الأصغر
question: ما ناتج min(12, 7)؟
- [ ] alternative | 12
- [ ] other | 19
- [x] correct | 7
explanation: min تختار القيمة الأصغر من المدخلات.
hint: لا تجمع القيم هنا.
:::

:::mcq
id: calculator-events-floor
title: تعريف floor
question: ما ناتج floor(4.9)؟
- [ ] other | 0.9
- [x] correct | 4
- [ ] alternative | 5
explanation: أكبر عدد صحيح لا يتجاوز4.9 هو4؛ floor ليست التقريب إلى الأقرب.
hint: نريد عددًا صحيحًا لا يزيد على المدخل.
:::

:::mcq
id: calculator-events-floor-negative
title: تطبيق تعريف floor
question: ما ناتج floor(-2.3) وفق تعريفها؟
- [x] correct | -3
- [ ] alternative | -2
- [ ] other | 2
explanation: -2 أكبر من−2.3، فلا يحقق التعريف؛ العدد الصحيح الأقرب من الأسفل هو−3.
hint: افحص شرط «لا يتجاوز القيمة».
:::

:::mcq
id: calculator-events-digits
title: إضافة منزلة
question: كان العدد12 ثم نقر المستخدم زر3. أي عملية تعطي123؟
- [ ] alternative | 12 + 3
- [ ] other | 12 × 3
- [x] correct | 12 × 10 + 3
explanation: الضرب في10 يفتح منزلة آحاد جديدة قبل إضافة الرقم.
hint: نريد إلحاق رقم بالعدد.
:::

:::mcq
id: calculator-events-zero
title: زر الصفر
question: كان العدد7 ثم نقر المستخدم0. ما القيمة وفق قاعدة بناء العدد؟
- [ ] other | 0
- [x] correct | 70
- [ ] alternative | 7
explanation: 7×10+0=70؛ للصفر أثر في المنزلة حتى إن لم يزد قيمة الآحاد.
hint: طبق القاعدة نفسها لكل رقم.
:::

:::mcq
id: calculator-events-trace
title: تتبع النقرات
question: بدأ العدد0 ثم نُقرت الأزرار1 ثم0 ثم4. ما الناتج؟
- [x] correct | 104
- [ ] alternative | 5
- [ ] other | 14
explanation: القيم المتتالية1 ثم10 ثم104، لأن كل نقرة تنقل العدد السابق منزلة.
hint: لا تجمع الأرقام دون اعتبار منازلها.
:::

:::mcq
id: calculator-events-combined-math
title: جذر ثم تقريب لأسفل
question: طبقنا square root على 10، ثم floor على الناتج. ما القيمة النهائية؟
- [x] three | 3 لأن الجذر نحو 3.16 ثم floor تعطي العدد الصحيح الأقل
- [ ] four | 4 لأن floor تقرّب العدد إلى الأعلى
- [ ] ten | 10 لأن العمليتين تلغيان بعضهما
explanation: الجذر التربيعي لـ10 نحو 3.16، وfloor تعطي أكبر عدد صحيح لا يزيد على هذه القيمة، وهو 3.
hint: احسب الجذر أولًا، ثم طبّق floor عليه.
:::

<!-- lesson-step -->
<!-- step-id: app-practice-mission -->
<!-- presentation: video-intro -->
# مراجعة تطبيقات الهاتف وتتبع اللبنات

https://www.youtube.com/watch?v=0jvFwR5EesE

الكتاب ص 43–53؛ الشرح والخلاصة أدناه لهذه الصفحات. قد يتضمن الفيديو توسعًا خارجها.

- [مرجع الكتاب، ص 43–53](assets/books/ict.pdf#page=45)
- [مرجع الملخص، ص 77–79 و82–86](assets/books/summary.pdf#page=77)

<!-- lesson-step -->
<!-- step-id: app-practice-summary -->
<!-- presentation: lesson-summary -->
# خلاصة: مراجعة تطبيقات الهاتف وتتبع اللبنات

![شرط قبول الطالب وحد العمر — الملخص، الصفحة 78](assets/lessons/ict/summary/mobile-p078-practice-admission.webp)

![إجابات سؤال معامل السمنة — الملخص، الصفحة 86](assets/lessons/ict/summary/mobile-p086-practice-bmi-answers.webp)

> هذه إجابات مختصرة لسؤال التلخيص. نرجع إلى اللبنات لتحديد المدخلات والشروط؛ Label4 يعرض الرسالة، وTextBox1 للوزن وTextBox2 للطول.

## يجب حفظه

- لتفسير مقطع لبنات حدّد **الحدث، المدخلات، العمليات، المخرجات** بهذا الترتيب.
- ترتيب الشروط مهم؛ في سلسلة if ينفذ أول فرع صحيح ثم تتجاوز السلسلة بقية الفروع.
- تحويل الوحدات وترتيب العمليات جزء من صحة الحساب، وليس شكل الواجهة وحده.

## افهم بتطبيق أسئلة الكتاب

- متوسط ثلاث علامات: **(الأولى + الثانية + الثالثة) ÷ 3**. يبدأ التقدير من أعلى شرط ثم يهبط إلى الأقل.
- في سؤال التقدير بالكتاب: **90 فأعلى ممتاز**، و**80–89 جيد جدًا**، و**70–79 جيد جدًا** كما طُبعت أيضًا، و**50–69 جيد**، و**أقل من50 راسب**. تكرار «جيد جدًا» للفترتين في النص المطبوع قد يكون خطأً؛ لا نفترض تقديرًا آخر من عندنا.
- لتنفيذ سؤال العلامات: ثلاث أدوات إدخال للعلامات، ثم عند النقر نحسب المتوسط ونعرضه، ونعرض تقديره في أداة إخراج أخرى بعد فحص الشروط بالترتيب.
- مثال قبول الطالب: إذا كان العمر أقل من6 تظهر «يؤجل»، وإلا تظهر «تم القبول»؛ إذن العمر6 يدخل فرع القبول.
- ربح المحل: **ثمن البيع − (أجور العمال + أجرة المحل + ثمن الشراء)**.
- في مسألتي القبول والربح تُقرأ المدخلات عند تنفيذ الحدث، ثم تُسند الرسالة أو قيمة الربح إلى Text لأداة عرض؛ حساب القيمة وحده لا يجعلها تظهر للمستخدم.
- راجع في التلخيص الأسئلة المرتبطة بالحساب والمتغيرات وقراءة اللبنات. تمارين الكرة وCanvas ومشروع الحركة خارج الكتاب المرفق وليست مطلوبة هنا.

المراجع: [الكتاب ص 43–53](assets/books/ict.pdf#page=45)، [التلخيص ص 77–79 و82–86](assets/books/summary.pdf#page=77). النقاط هنا مصاغة من الجزء الموافق للكتاب.

:::mcq
id: app-practice-trace
title: كيف نقرأ اللبنات؟
question: ما البداية الأفضل لتفسير مقطع برمجي؟
- [x] correct | تحديد الحدث الذي يشغله ثم تتبع المدخلات والعمليات والمخرجات
- [ ] alternative | عد ألوان اللبنات دون قراءة محتواها
- [ ] other | افتراض أن كل اللبنات تنفذ عند بدء التطبيق
explanation: الحدث يحدد وقت التنفيذ، ثم نتابع انتقال القيم خطوة خطوة.
hint: ابدأ بوقت تشغيل المقطع.
:::

:::mcq
id: app-practice-average
title: حساب المعدل
question: علامات طالب90 و75 و75. ما متوسطها؟
- [ ] alternative | 240
- [ ] other | 85
- [x] correct | 80
explanation: نجمع240 ثم نقسم على3 فنحصل على80.
hint: لا تنس عدد المواد.
:::

:::mcq
id: app-practice-condition-order
title: ترتيب التقديرات
question: نريد ممتاز عند90 فأعلى وجيد جدًا عند80 فأعلى. أي ترتيب في سلسلة if صحيح؟
- [ ] other | نكتب الشرطين دون أي ترتيب لأن النتيجة واحدة
- [x] correct | نفحص90 أولًا ثم80 في else if
- [ ] alternative | نفحص80 أولًا ثم90 في else if
explanation: لو بدأنا80 لالتقط الشرط علامة95 قبل وصولها إلى شرط ممتاز.
hint: أول فرع صحيح ينفذ.
:::

:::mcq
id: app-practice-admission
title: عمر القبول
question: الشرط: إن كان العمر أقل من6 نعرض «يؤجل»، وإلا «تم القبول». ما ناتج العمر6؟
- [x] correct | تم القبول
- [ ] alternative | يؤجل
- [ ] other | لا تظهر رسالة
explanation: 6 ليست أقل من6، لذلك ينفذ else.
hint: المساواة لا تحقق شرط أقل من.
:::

:::mcq
id: app-practice-grade-seventy-seven
title: تتبع فرع المعدل
question: متوسط الطالب 77. بعد اختبار شرط 90 فأعلى ثم 80 فأعلى، أي فرع يصل إليه؟
- [ ] alternative | فرع 80–89
- [x] correct | فرع 70–79
- [ ] other | فرع أقل من50
explanation: 77 أقل من80 ويقع في الفترة 70–79. يطبع الكتاب التقدير نفسه لفترتَي 70–79 و80–89؛ هنا نتتبع الفرع الذي ينفذ.
hint: ابحث عن أول فترة تحتوي 77 بعد تجاوز الشروط الأعلى.
:::

:::mcq
id: app-practice-grade-boundary
title: الحد الفاصل للرسوب
question: حسب فروع تقدير المعدل في سؤال الكتاب، ما تقديرا المعدلين 49 و50 بالترتيب؟
- [x] correct | راسب، ثم جيد
- [ ] alternative | جيد، ثم راسب
- [ ] other | راسب، ثم راسب
explanation: ما دون50 «راسب»، وتبدأ فترة «جيد» عند50 وتمتد إلى69.
hint: 50 ليست أقل من50.
:::

:::mcq
id: app-practice-profit
title: حساب الربح
question: بيع البضاعة1000، وثمن شرائها600، وأجور العمال100، وأجرة المحل150. ما الربح؟
- [ ] alternative | 250
- [ ] other | 850
- [x] correct | 150
explanation: إجمالي التكاليف850، والربح1000−850=150.
hint: اجمع جميع التكاليف قبل الطرح.
:::

:::mcq
id: app-practice-precedence
title: الأقواس في الحساب
question: لماذا نكتب (a+b+c)/3 لحساب المتوسط؟
- [ ] other | لمنع قراءة أي متغير
- [x] correct | حتى نقسم مجموع العلامات كله على3
- [ ] alternative | حتى نقسم العلامة الأخيرة فقط
explanation: الأقواس تجمع المدخلات أولًا؛ a+b+c/3 تقسم c فقط حسب أولوية العمليات.
hint: ما المقدار الذي يجب تقسيمه؟
:::

:::mcq
id: app-practice-output
title: فصل الحساب عن الإخراج
question: حُسب الناتج في متغير، لكن لم يظهر للمستخدم. ما الخطوة الناقصة غالبًا؟
- [x] correct | إسناد قيمة المتغير إلى Text لأداة عرض مثل Label
- [ ] alternative | تحديث قيمة المتغير مرة ثانية دون إسنادها إلى أداة عرض
- [ ] other | تغيير Visible للـ Label إلى true فقط مع ترك Text بلا ناتج
explanation: تخزين الناتج لا يحدث خاصية Text تلقائيًا؛ يلزم إسناده إلى أداة عرض مناسبة.
hint: الحساب الداخلي يختلف عن العرض.
:::
`;

export default defineMarkdownLesson({
  "status": "published",
  "title": "تطبيقي الخاص على هاتفي",
  "summary": "قراءة واجهات App Inventor ولبناته وتطبيق الحساب والشروط على نشاطي الكتاب.",
  "outcome": "قراءة واجهات App Inventor ولبناته وتطبيق الحساب والشروط على نشاطي الكتاب.",
  "mode": "شاهد ← راجع ← أجب",
  "mission": "قراءة واجهات App Inventor ولبناته وتطبيق الحساب والشروط على نشاطي الكتاب.",
  "duration": "حسب الفيديو والتدريب",
  "level": "الثاني عشر",
  "reward": 10,
  "passingScore": 80
}, LESSON_MARKDOWN);
