import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const lessonSource = `
:::exam-question
id: math-book-p049-ex3
title: الكتاب، ص 47 · مثال ٣
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 47، مثال ٣
answer-label: الحل المطبوع في الكتاب
body:
جد نقاط الانعطاف (إن وجدت) للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mi>π</mi></mrow><mo stretchy="true">[</mo></mrow></mrow></math>\`.
solution:
نقطة الانعطاف هي \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p050-ex4
title: الكتاب، ص 48 · مثال ٤
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 48، مثال ٤
answer-label: الحل المطبوع في الكتاب
body:
بيّن أنه لا يوجد للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٩</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\` نقطة انعطاف في الفترة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
solution:
المشتقة الثانية سالبة دائمًا في الفترة المعطاة، فيكون المنحنى مقعرًا للأسفل ولا يغيّر اتجاه تقعره؛ فلا توجد نقطة انعطاف.
:::

:::mcq
id: math-kamel-u2-p027-r3
title: الكامل، الوحدة 2 · PDF ص 27 · row-3
kicker: الكامل، الوحدة 2 · PDF ص 27 · row-3
reference: الكامل، الوحدة 2 · PDF ص 27، row-3
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فما إحداثيات نقطة الانعطاف لمنحنى الاقتران ق(س)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow><mo stretchy="true">)</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></mrow><mo stretchy="true">)</mo></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow><mo stretchy="true">)</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p027-r6
title: الكامل، الوحدة 2 · PDF ص 27 · row-6
kicker: الكامل، الوحدة 2 · PDF ص 27 · row-6
reference: الكامل، الوحدة 2 · PDF ص 27، row-6
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mroot><mrow><mn dir="ltr">٦</mn><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mn dir="ltr">٣</mn></mroot><mo>+</mo><mn dir="ltr">٢</mn></mrow></mrow></math>\`، فما قياس زاوية الانعطاف لمنحنى ق(س) إن وجدت؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠</mn></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mi>π</mi></math>\`
- [ ] option-4 | لا توجد زاوية انعطاف
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p033-r2
title: الكامل، الوحدة 2 · PDF ص 33 · row-2
kicker: الكامل، الوحدة 2 · PDF ص 33 · row-2
reference: الكامل، الوحدة 2 · PDF ص 33، row-2
question: إذا كان ق(س) كثير حدود من الدرجة الثالثة، فما أكبر عدد من نقاط الانعطاف لمنحنى قَ(س)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
- [x] option-2 | صفر
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
explanation: الإجابة النهائية: صفر.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p033-r4
title: الكامل، الوحدة 2 · PDF ص 33 · row-4
kicker: الكامل، الوحدة 2 · PDF ص 33 · row-4
reference: الكامل، الوحدة 2 · PDF ص 33، row-4
question: إذا كان المستقيم \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ص</mi><mo>+</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` مماسًا لمنحنى ق(س) عند نقطة الانعطاف \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`، فما ظل زاوية الانعطاف عند هذه النقطة؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | صفر
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-kamel-u2-p045-r1
title: الكامل، الوحدة 2 · PDF ص 45 · row-1
question: التقعر ونقط الانعطاف
reference: الكامل، الوحدة 2 · PDF ص 45، row-1
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></mrow></mrow></math>\`، س ∈ [−٤، ٢]، فجد: (١) مجالات التقعر للأعلى وللأسفل لمنحنى ق(س)، (٢) نقاط الانعطاف إن وجدت.
solution:
مقعر للأسفل في ]−٤، −٢[، ومقعر للأعلى في ]−٢، ٢[. نقطة الانعطاف \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mfrac><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><msup><mtext dir="rtl">هـ</mtext><mn dir="ltr">٢</mn></msup></mfrac></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-kamel-u2-p045-r2
title: الكامل، الوحدة 2 · PDF ص 45 · row-2
question: التقعر ونقط الانعطاف
reference: الكامل، الوحدة 2 · PDF ص 45، row-2
answer-label: الإجابة المطبوعة في الكامل
body:
الشكل المجاور يبين منحنى كثير الحدود قَ(س)، والمماس له عند س = ٢. معتمدًا عليه جد: (١) مجالات التزايد والتناقص للاقتران ق(س)، (٢) مجالات التقعر للأعلى وللأسفل للاقتران ق(س)، (٣) \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><munder><mtext dir="rtl">نها</mtext><mrow><mi mathvariant="normal">س</mi><mo>←</mo><mn dir="ltr">١</mn></mrow></munder><mfrac><mrow><mn dir="ltr">٣</mn><mo>−</mo><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`.

![منحنى المشتقة الأولى والمماس عند س = ٢](assets/lessons/mathematics/source-crops/u23-kamel-p045-r2-diagram.webp)
solution:
(١) ق متزايد على ح. (٢) مقعر للأعلى في ]٠، ∞[، ومقعر للأسفل في ]−∞، ٠[. (٣) النهاية = −٤.
:::

:::exam-question
id: math-kamel-u2-p047-r1
title: الكامل، الوحدة 2 · PDF ص 47 · row-1
question: التقعر ونقط الانعطاف
reference: الكامل، الوحدة 2 · PDF ص 47، row-1
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ع</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\` نقطة انعطاف أفقي هي (π/٢، ٣π/٢)، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">كً</mi><mrow><mo stretchy="true">(</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧٢</mn></math>\`
:::

:::exam-question
id: math-kamel-u2-p047-r2
title: الكامل، الوحدة 2 · PDF ص 47 · row-2
question: التقعر ونقط الانعطاف
reference: الكامل، الوحدة 2 · PDF ص 47، row-2
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان ص = هـ(س) كثير حدود من الدرجة الثالثة، وكان هـً(س) < ٠ عندما س < −٢/٣، وكان هـً(س) > ٠ عندما س > −٢/٣، ويمر منحناه بالنقطة (١، ٦)، وكانت معادلة المماس عند س = −١ هي ص = ٢، أوجد قاعدة الاقتران ص = هـ(س).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow></mrow></math>\`
:::

:::exam-question
id: math-kamel-u2-p047-r5
title: الكامل، الوحدة 2 · PDF ص 47 · row-5
question: التقعر ونقط الانعطاف
reference: الكامل، الوحدة 2 · PDF ص 47، row-5
answer-label: مفتاح مطبوع متعارض مع المعطيات؛ قيد المراجعة
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـَ</mtext><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mtext dir="rtl">هـَ</mtext><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\` = ٠، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـً</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، أوجد لمنحنى هـ(س): (١) نقط القيم القصوى ونوعها، (٢) فترات التزايد والتناقص، (٣) فترات التقعر للأعلى وللأسفل ونقط الانعطاف.
solution:
المفتاح المطبوع: صغرى محلية عند س = −١، وعظمى محلية عند س = ٢؛ متزايد في [−١، ٢]، ومتناقص قبل −١ وبعد ٢؛ مقعر للأعلى قبل صفر وللأسفل بعد صفر؛ انعطاف عند س = صفر. يوجد تعارض في المصدر: هـً(س) = −٣س تجعل هـَ(−١) و هـَ(٢) غير متساويتين.
:::

:::exam-question
id: math-book-p048-activity-1
title: الكتاب، ص 46 · activity-1
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 46، activity-1
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
الشكل المجاور يمثل منحنى الاقتران ق(س). ما إشارة ميل المماس للمنحنى عند كل من جـ، د؟ لاحظ أن مماسي ق(س) عند جـ، د يقعان فوق منحناه.

![منحنى الاقتران والنقاط جـ، د، هـ، و](assets/lessons/mathematics/source-crops/u2-book-p048-activity.webp)
solution:
ميل المماس موجب عند جـ وسالب عند د؛ والمنحنى مقعر للأسفل هناك.
:::

:::exam-question
id: math-book-p048-activity-2
title: الكتاب، ص 46 · activity-2
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 46، activity-2
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ما إشارة ميل المماس للمنحنى عند هـ، و؟ لاحظ أن مماسي الاقتران عند هـ، و يقعان تحت منحناه.

![منحنى الاقتران والنقاط جـ، د، هـ، و](assets/lessons/mathematics/source-crops/u2-book-p048-activity.webp)
solution:
ميل المماس سالب عند هـ وموجب عند و؛ والمنحنى مقعر للأعلى هناك.
:::

:::exam-question
id: math-book-p048-ex1
title: الكتاب، ص 46 · ex1
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 46، ex1
answer-label: الحل المطبوع في الكتاب
body:
حدد مجالات التقعر للأعلى وللأسفل لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></mrow></math>\`، س ∈ [−٢، ٥].
solution:
مقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p049-ex2
title: الكتاب، ص 47 · ex2
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 47، ex2
answer-label: الحل المطبوع في الكتاب
body:
جد مجالات التقعر للأعلى وللأسفل لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow><mi mathvariant="normal">س</mi></mfrac></mrow></math>\`، س ≠ ٠.
solution:
مقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p050-ex5
title: الكتاب، ص 48 · ex5
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 48، ex5
answer-label: الحل المطبوع في الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></mrow></math>\`، س ∈ ح، فجد فترات التقعر للأعلى وللأسفل، ثم جد نقط الانعطاف إن وجدت.
solution:
مقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`. نقطتا الانعطاف \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p051-ex6-c
title: الكتاب، ص 49 · ex6-c
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 49، ex6-c
answer-label: الحل المطبوع في الكتاب
body:
الشكل المجاور يمثل منحنى قَ(س). اعتمادًا عليه، جد مجالات التقعر للأعلى وللأسفل لمنحنى ق(س).

![منحنى المشتقة الأولى قَ(س) وعليه القيم −٣، −١، ١، ٣](assets/lessons/mathematics/source-crops/u2-book-p051-ex6.webp)
solution:
مقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p051-ex6-d
title: الكتاب، ص 49 · ex6-d
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 49، ex6-d
answer-label: الحل المطبوع في الكتاب
body:
الشكل المجاور يمثل منحنى قَ(س). اعتمادًا عليه، جد قيم س التي يكون عندها نقط انعطاف إن وجدت.

![منحنى المشتقة الأولى قَ(س) وعليه القيم −٣، −١، ١، ٣](assets/lessons/mathematics/source-crops/u2-book-p051-ex6.webp)
solution:
س = −١، س = ١.
:::

:::exam-question
id: math-book-p053-exercise-1-a
title: الكتاب، ص 51 · exercise-1-a
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-1-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
عين فترات التقعر للأعلى وللأسفل لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`، س ∈ ح.
solution:
مقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٣</mn></mfrac></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٣</mn></mfrac><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p053-exercise-1-b
title: الكتاب، ص 51 · exercise-1-b
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-1-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
عين فترات التقعر للأعلى وللأسفل لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، س ∈ ]−π/٢، π/٢[.
solution:
مقعر للأسفل في ]−π/٢، π/٢[؛ لا توجد فترة تقعر للأعلى.
:::

:::exam-question
id: math-book-p053-exercise-1-c
title: الكتاب، ص 51 · exercise-1-c
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-1-c
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
عين فترات التقعر للأعلى وللأسفل لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، س ∈ [٠، ٤].
solution:
مقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p053-exercise-1-d
title: الكتاب، ص 51 · exercise-1-d
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-1-d
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
عين فترات التقعر للأعلى وللأسفل لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mfrac><mn dir="ltr">٣</mn><mn dir="ltr">٢</mn></mfrac></msup></mrow></math>\`، س > ٣.
solution:
مقعر للأعلى في ]٣، ∞[؛ لا توجد فترة تقعر للأسفل.
:::

:::exam-question
id: math-book-p053-exercise-1-e
title: الكتاب، ص 51 · exercise-1-e
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-1-e
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
عين فترات التقعر للأعلى وللأسفل لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mfrac><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></mfrac><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`، س ∈ [٠، ٢π].
solution:
مقعر للأسفل في ]٠، ٢π[؛ لا توجد فترة تقعر للأعلى.
:::

:::exam-question
id: math-book-p053-exercise-2-a
title: الكتاب، ص 51 · exercise-2-a
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-2-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد نقط الانعطاف في الحالة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">س</mi></mrow></mrow></math>\`.
solution:
نقطة الانعطاف \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p053-exercise-2-b
title: الكتاب، ص 51 · exercise-2-b
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-2-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد نقط الانعطاف في الحالة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، س ∈ [٠، ٢π].
solution:
نقطتا الانعطاف \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mi>π</mi></mrow><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٧</mn><mi>π</mi></mrow><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p053-exercise-2-c
title: الكتاب، ص 51 · exercise-2-c
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-2-c
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد نقط الانعطاف في الحالة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٥</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow></msqrt></mrow></math>\`.
solution:
لا توجد نقط انعطاف؛ المشتقة الثانية سالبة على ]−∞، ٥[.
:::

:::exam-question
id: math-book-p053-exercise-4
title: الكتاب، ص 51 · exercise-4
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-4
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></mrow></math>\` نقطة انعطاف عند س = −١، فجد قيمة الثابت أ.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac></mrow></math>\`
:::

:::exam-question
id: math-book-p053-exercise-5-c
title: الكتاب، ص 51 · exercise-5-c
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 51، exercise-5-c
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ق(س) اقتران متصل في [−٣، ٢]، ق(٠) = ٠، قَ(١) = ٠، قَ(−٢) = ٠، وقً(س) > ٠ عندما س < ٠، وقً(س) < ٠ عندما س > ٠. ما قيم س التي يكون لمنحنى ق(س) عندها نقط انعطاف؟
solution:
س = ٠، ونقطة الانعطاف \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p057-worksheet-3-a
title: الكتاب، ص 55 · worksheet-3-a
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 55، worksheet-3-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
الشكل المجاور يمثل منحنى قً(س)، وعلمت أن قَ(٠) = قَ(٦) = ٠. جد فترات التقعر ونقط الانعطاف لمنحنى ق(س).

![منحنى المشتقة الثانية قً(س) خط مستقيم يقطع محور السينات عند ٢](assets/lessons/mathematics/source-crops/u2-book-p057-worksheet3.webp)
solution:
مقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`. نقطة انعطاف عند س = ٢.
:::

:::exam-question
id: math-book-p057-worksheet-5-a
title: الكتاب، ص 55 · worksheet-5-a
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 55، worksheet-5-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
اعتمادًا على الشكل الذي يمثل قَ(س)، جد فترات التقعر للأعلى وللأسفل لمنحنى ق(س).

![منحنى المشتقة الأولى وقيم السينات −٤، −٣، ٢، ٣](assets/lessons/mathematics/source-crops/u2-book-p057-worksheet5.webp)
solution:
مقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p057-worksheet-5-b
title: الكتاب، ص 55 · worksheet-5-b
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 55، worksheet-5-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
اعتمادًا على الشكل الذي يمثل قَ(س)، جد الإحداثيات السينية لنقط الانعطاف.

![منحنى المشتقة الأولى وقيم السينات −٤، −٣، ٢، ٣](assets/lessons/mathematics/source-crops/u2-book-p057-worksheet5.webp)
solution:
س = −٣، س = ٢.
:::

:::mcq
id: math-book-p080-test-3
title: الكتاب، ص 78 · test-3
kicker: الكتاب، ص 78 · test-3
reference: الكتاب، ص 78، test-3
question: إذا كان ق(س) متصلًا على [١، ٣]، وكان قً(س) > ٠ لجميع س ∈ ]١، ٣[، وله ثلاث نقاط حرجة فقط في [١، ٣]، وكان قَ(٢) = ٠، فما العبارة الصحيحة؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mfrac><mn dir="ltr">٥</mn><mn dir="ltr">٢</mn></mfrac><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mfrac><mn dir="ltr">٥</mn><mn dir="ltr">٢</mn></mfrac><mo stretchy="true">)</mo></mrow></mrow><mo>&lt;</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mfrac><mn dir="ltr">٥</mn><mn dir="ltr">٢</mn></mfrac><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mfrac><mn dir="ltr">٥</mn><mn dir="ltr">٢</mn></mfrac><mo stretchy="true">)</mo></mrow></mrow><mo>&gt;</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mfrac><mn dir="ltr">٥</mn><mn dir="ltr">٢</mn></mfrac><mo stretchy="true">)</mo></mrow></mrow><mo>&gt;</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-book-p080-test-4
title: الكتاب، ص 78 · test-4
kicker: الكتاب، ص 78 · test-4
reference: الكتاب، ص 78، test-4
question: الشكل المجاور يمثل منحنى قَ(س). ما مجموعة حل المتباينة قً(س) < ٠؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\` ∪ \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![منحنى المشتقة الأولى وقمته عند س = ٢](assets/lessons/mathematics/source-crops/u2-book-p080-test4.webp)
:::

:::exam-question
id: math-book-p082-test-7-b
title: الكتاب، ص 80 · test-7-b
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 80، test-7-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\` معرفًا في [−٢، ٦[. جد فترات التقعر للأعلى وللأسفل لمنحنى ق(س).
solution:
مقعر للأسفل في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومقعر للأعلى في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٦</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p082-test-7-c
title: الكتاب، ص 80 · test-7-c
question: التقعر ونقط الانعطاف
reference: الكتاب، ص 80، test-7-c
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\` معرفًا في [−٢، ٦[. جد نقط الانعطاف لمنحنى ق(س).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></mrow><mo stretchy="true">)</mo></mrow></math>\`
:::
`;

export default defineMarkdownLesson({
  "status": "published",
  "language": "ar",
  "title": "التقعر ونقط الانعطاف",
  "summary": "أسئلة من الكتاب والكامل بإجابات موثقة من المصادر.",
  "outcome": "مراجعة التقعر ونقط الانعطاف من الأسئلة الأصلية.",
  "mode": "أسئلة وبطاقات",
  "duration": "35 أسئلة",
  "level": "الثاني عشر · العلمي",
  "reward": 10
}, lessonSource);
