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

:::mcq
id: math-kamel-u2-p023-r1
title: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ١ · ٢٠٠٧ دراسات
kicker: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ١ · ٢٠٠٧ دراسات
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r1-key.webp)
question: يقع الاقتران فوق جميع مماساته عندما يكون الاقتران:
- [x] option-1 | مقعراً للأعلى
- [ ] option-2 | مقعراً للأسفل
- [ ] option-3 | متزايداً
- [ ] option-4 | متناقصاً
explanation: الإجابة حسب مفتاح الكامل: مقعراً للأعلى.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p023-r2
title: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٢ · ٢٠٠٧ دراسات
kicker: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٢ · ٢٠٠٧ دراسات
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r2-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتران كثير حدود من الدرجة الثانية فإن الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`:
- [x] option-1 | لا توجد له نقاط انعطاف
- [ ] option-2 | توجد له نقطة انعطاف واحدة فقط
- [ ] option-3 | يوجد له نقطتي انعطاف
- [ ] option-4 | توجد له نقطة انعطاف واحدة على الأقل
explanation: الإجابة حسب مفتاح الكامل: لا توجد له نقاط انعطاف.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p023-r3
title: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٣ · ٢٠٠٧ دراسات، ٢٠١٨
kicker: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٣ · ٢٠٠٧ دراسات، ٢٠١٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r3-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><mrow><mo>|</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo>|</mo></mrow></mrow></math>\`، فإن:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` غير موجودة
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p023-r4
title: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٤ · ٢٠٠٧ إكمال
kicker: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٤ · ٢٠٠٧ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r4-key.webp)
question: إذا كانت النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">ل</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi></mrow></math>\` ثابت، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mo>=</mo></mrow></math>\`
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p023-r5
title: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٥ · ٢٠٠٨
kicker: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٥ · ٢٠٠٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r5-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` موجودة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\` ويوجد عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` نقطة انعطاف، فإن إحدى العبارات التالية صحيحة دائماً:
- [ ] option-1 | منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` مقعر للأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">]</mo></mrow></math>\` وللأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` له نقطة حرجة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi></mrow></math>\` له نقطة حرجة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi></mrow></math>\` له نقطة حرجة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi></mrow></math>\` له نقطة حرجة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p023-r6
title: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٦ · ٢٠١٠
kicker: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٦ · ٢٠١٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r6-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى واحدة وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` يمر بالنقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فإن تلك القيمة العظمى هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | صفر
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p023-r7
title: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٧ · ٢٠١١
kicker: الكامل، الوحدة الثانية · WebP ٢٣ · ص ٢٢ · البند ٧ · ٢٠١١
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r7-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p023-r7-key.webp)
question: إذا كانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\` في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`، فإن:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p024-r1
title: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ١ · ٢٠١١
kicker: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ١ · ٢٠١١
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r1-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` نقطة انعطاف عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p024-r2
title: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٢ · ٢٠١٤
kicker: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٢ · ٢٠١٤
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متصلاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\` لجميع قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`، ولاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` ثلاث نقاط حرجة فقط في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢,٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢,٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢,٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢,٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢,٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p024-r3
title: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٣ · ٢٠١٤
kicker: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٣ · ٢٠١٤
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r3-key.webp)
question: إذا كان الشكل المجاور يمثل منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` فإن نقطة انعطاف منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![منحنى المشتقة مع النهايتين المفتوحتين والنقطة المعلّمة والتدريجات الأصلية](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r3-figure.webp)

:::

:::mcq
id: math-kamel-u2-p024-r4
title: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٤ · ٢٠١٤ — الإكمال
kicker: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٤ · ٢٠١٤ — الإكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r4-key.webp)
question: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي نقطة انعطاف لمنحنى إحدى الاقترانات الآتية:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p024-r5
title: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٥ · ٢٠١٥؛ ٢٠٢٠ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٥ · ٢٠١٥؛ ٢٠٢٠ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r5-key.webp)
question: إذا كان لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">م</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\` نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\` فإن قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi></mrow></math>\` تساوي:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p024-r6
title: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٦ · ٢٠١٥
kicker: الكامل، الوحدة الثانية · WebP ٢٤ · ص ٢٣ · البند ٦ · ٢٠١٥
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r6-key.webp)
question: الشكل المجاور يبين منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، إن مجموعة حل المتباينة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\` هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![رسم المشتقة والمحورين والإسقاط المتقطع كما ورد في السؤال](assets/lessons/mathematics/source-crops/math-kamel-u2-p024-r6-figure.webp)

:::

:::mcq
id: math-kamel-u2-p025-r1
title: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ١ · ٢٠١٦
kicker: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ١ · ٢٠١٦
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r1-key.webp)
question: بالاعتماد على الشكل المجاور الذي يمثل منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، ما النقطة التي يكون عندها \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` موجبتين؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ن</mi></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">و</mi></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![المنحنى الملوّن مع النقاط المسماة ومحوري الإحداثيات في المصدر](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r1-figure.webp)

:::

:::mcq
id: math-kamel-u2-p025-r2
title: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٢ · ٢٠١٦
kicker: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٢ · ٢٠١٦
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mi mathvariant="normal">س</mi><mo>+</mo><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\` فإن منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يكون مقعراً للأسفل في:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p025-r3
title: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٣ · ٢٠١٦
kicker: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٣ · ٢٠١٦
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` كثير حدود وكان الشكل المجاور يبين إشارة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن العبارة الصحيحة دائماً هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![مخطط إشارة المشتقة الثانية الأصلي مع الصفر والإشارات على خط الأعداد](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r3-figure.webp)

:::

:::mcq
id: math-kamel-u2-p025-r4
title: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٤ · ٢٠١٧
kicker: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٤ · ٢٠١٧
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mtext dir="rtl">جتا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\` فإن قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون عندها نقط انعطاف \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo></mrow></math>\`
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p025-r5
title: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٥ · ٢٠١٧
kicker: الكامل، الوحدة الثانية · WebP ٢٥ · ص ٢٤ · البند ٥ · ٢٠١٧
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r5-key.webp)
question: الشكل المجاور يمثل منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يكون:
- [x] option-1 | مقعراً للأسفل \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | مقعراً للأسفل \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-3 | متناقصاً \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-4 | متناقصاً \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: مقعراً للأسفل \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![الرسم الأصلي للمشتقة الثانية، بقطعه ونهاياته المفتوحة وتدريجاته](assets/lessons/mathematics/source-crops/math-kamel-u2-p025-r5-figure.webp)

:::

:::mcq
id: math-kamel-u2-p026-r1
title: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ١ · ٢٠١٧ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ١ · ٢٠١٧ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r1-key.webp)
question: الشكل المجاور هو \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` فإن نقطة الانعطاف لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | لا يوجد له نقطة انعطاف
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![منحنى المشتقة مع النهايتين المفتوحتين والتدريجات والإسقاط المتقطع](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r1-figure.webp)

:::

:::mcq
id: math-kamel-u2-p026-r2
title: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٢ · ٢٠١٧ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٢ · ٢٠١٧ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود، وكانت زاوية ميل المماس لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عند أي نقطة عليه في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\` هي زاوية منفرجة، فإن العبارة الصحيحة هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأسفل في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأسفل في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p026-r3
title: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٣ · ٢٠١٧ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٣ · ٢٠١٧ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∀</mo><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن العبارة الصحيحة فيما يلي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p026-r4
title: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٤ · ٢٠١٧ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٤ · ٢٠١٧ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\` فإن منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يقع فوق جميع مماساته على الفترة:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p026-r5
title: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٥ · ٢٠١٨
kicker: الكامل، الوحدة الثانية · WebP ٢٦ · ص ٢٥ · البند ٥ · ٢٠١٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p026-r5-key.webp)
question: إذا كانت النقطتان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هما نقطتا انعطاف لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">ك</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`، فإن قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi></mrow></math>\` هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p027-r1
title: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ١ · ٢٠١٨
kicker: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ١ · ٢٠١٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r1-key.webp)
question: الشكل المجاور يمثل منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن العبارة الصحيحة:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٤</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٤</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٤</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![الرسم الأصلي للمشتقة الثانية مع المحاور والإسقاطات والعلامات العددية](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r1-figure.webp)

:::

:::mcq
id: math-kamel-u2-p027-r2
title: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ٢ · ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ٢ · ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\` لجميع \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">[</mo></mrow></math>\`، وكان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` ثلاث نقاط حرجة فقط بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، فما العبارة الصحيحة مما يأتي؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p027-r4
title: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ٤ · ٢٠١٩ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ٤ · ٢٠١٩ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٥</mn></msup><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٤</mn></msup></mrow></math>\`، فما مجموعة قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون عندها نقط انعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٥</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٤</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٥</mn></mrow><mo>}</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p027-r5
title: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ٥ · ٢٠١٩ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٧ · ص ٢٦ · البند ٥ · ٢٠١٩ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p027-r5-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ك</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\` اقتراناً له نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، فما ظل زاوية الانعطاف؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-2 | صفر
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p028-r1
title: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ١ · ٢٠٢٠
kicker: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ١ · ٢٠٢٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r1-key.webp)
question: إذا كان لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p028-r2
title: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٢ · ٢٠٢٠
kicker: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٢ · ٢٠٢٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١٨</mn><mo>−</mo><mn dir="ltr">٦</mn><mi mathvariant="normal">س</mi><mo>−</mo><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، فأي من الخصائص التالية تحقق في منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∀</mo><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`؟
- [ ] option-1 | متزايد
- [ ] option-2 | متناقص
- [x] option-3 | مقعر لأسفل
- [ ] option-4 | مقعر لأعلى
explanation: الإجابة حسب مفتاح الكامل: مقعر لأسفل.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p028-r3
title: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٣ · ٢٠٢٠
kicker: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٣ · ٢٠٢٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r3-key.webp)
question: معتمداً على الشكل المجاور الذي يمثل منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، ما المجال الذي يقع فيه منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` تحت جميع مماساته؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![منحنى المشتقة والمحورين والتدريجات كما في الرسم الأزرق الأصلي](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r3-figure.webp)

:::

:::mcq
id: math-kamel-u2-p028-r4
title: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٤ · ٢٠٢٠ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٤ · ٢٠٢٠ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mfrac><mrow><mn dir="ltr">٤</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></msup><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، فما قياس زاوية الانعطاف لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | صفر
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>π</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p028-r5
title: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٥ · ٢٠٢٠ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٨ · ص ٢٧ · البند ٥ · ٢٠٢٠ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r5-key.webp)
question: بالاعتماد على الشكل المجاور الذي يمثل منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما النقطة / النقاط التي يكون عندها \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` سالبة؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ن</mi></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">و</mi></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ن</mi></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![منحنى ق مع النقاط والحروف المعلّمة عليه في السؤال](assets/lessons/mathematics/source-crops/math-kamel-u2-p028-r5-figure.webp)

:::

:::mcq
id: math-kamel-u2-p029-r1
title: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ١ · ٢٠٢٠ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ١ · ٢٠٢٠ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r1-key.webp)
question: يمثل الشكل المجاور منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` فماذا تمثل النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [x] option-1 | عظمى محلية
- [ ] option-2 | صغرى محلية
- [ ] option-3 | ليست حرجة لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | نقطة انعطاف
explanation: الإجابة حسب مفتاح الكامل: عظمى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![الرسم الخطي للمشتقة الثانية مع النهايات المفتوحة ومحوري الإحداثيات](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r1-figure.webp)

:::

:::mcq
id: math-kamel-u2-p029-r2
title: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٢ · ٢٠٢٠ — الدور الثالث
kicker: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٢ · ٢٠٢٠ — الدور الثالث
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r2-key.webp)
question: ليكن الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi><mo>−</mo><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\`، فما الإحداثي السيني لنقطة الانعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p029-r3
title: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٣ · ٢٠٢١
kicker: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٣ · ٢٠٢١
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\` لجميع قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">[</mo></mrow></math>\`، وكان للاقتران ثلاث نقط حرجة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، فإذا علمت أن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، فما العبارة الصحيحة فيما يلي؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p029-r4
title: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٤ · ٢٠٢١
kicker: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٤ · ٢٠٢١
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r4-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` وكانت النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ب</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p029-r5
title: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٥ · ٢٠٢١ — الدور الثالث
kicker: الكامل، الوحدة الثانية · WebP ٢٩ · ص ٢٨ · البند ٥ · ٢٠٢١ — الدور الثالث
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p029-r5-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow></math>\`، فما العبارة الصحيحة فيما يلي؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`
- [ ] option-4 | النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف لمنحنى الاقتران
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p030-r1
title: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ١ · ٢٠٢١ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ١ · ٢٠٢١ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r1-key.webp)
question: ما العبارة الصحيحة دائماً من العبارات التالية؟
- [x] option-1 | إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود من الدرجة الثانية فإن له نقطة حرجة واحدة فقط
- [ ] option-2 | إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٥</mn></mrow></math>\`، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-3 | الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٤</mn></msup></mrow></math>\` يكون مقعراً للأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`
- [ ] option-4 | إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi></mrow><mo stretchy="true">)</mo></mrow><mo>≠</mo><mn dir="ltr">٠</mn></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\` لمجال \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فلا يوجد قيم قصوى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mi mathvariant="normal">أ</mi></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود من الدرجة الثانية فإن له نقطة حرجة واحدة فقط.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p030-r2
title: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ٢ · ٢٠٢٢
kicker: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ٢ · ٢٠٢٢
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mi mathvariant="normal">ج</mi><mi mathvariant="normal">س</mi></mrow></math>\`، وكان قياس زاوية الانعطاف لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هو \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p030-r3
title: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ٣ · ٢٠٢٢
kicker: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ٣ · ٢٠٢٢
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r3-key.webp)
question: يمثل الشكل المجاور منحنى الاقتران كثير الحدود \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، أي العبارات الآتية صحيحة دائماً؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![منحنى ق مع المحورين المسمّيين س وص والقيمة المعلّمة على محور السينات](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r3-figure.webp)

:::

:::mcq
id: math-kamel-u2-p030-r4
title: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ٤ · ٢٠٢٤ — الدور الأول
kicker: الكامل، الوحدة الثانية · WebP ٣٠ · ص ٢٩ · البند ٤ · ٢٠٢٤ — الدور الأول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p030-r4-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><mrow><mo>|</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo>|</mo></mrow></mrow></math>\` فما العبارة الصحيحة فيما يلي؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` غير موجودة
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p031-r1
title: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ١ · ٢٠٢٤ — الدور الأول
kicker: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ١ · ٢٠٢٤ — الدور الأول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r1-key.webp)
question: الشكل المجاور يمثل منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` المعرف على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">و</mi><mo stretchy="true">[</mo></mrow></math>\`، أي من الفترات التالية يكون عندها \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>×</mo><mi mathvariant="normal">لَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>×</mo><mi mathvariant="normal">لً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقداراً سالباً؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">ب</mi><mo>،</mo><mi mathvariant="normal">ج</mi><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">ب</mi><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">د</mi><mo>،</mo><mtext dir="rtl">هـ</mtext><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![منحنى ل مع الحروف على المحور والنهايات المفتوحة والإسقاطات المتقطعة](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r1-figure.webp)

:::

:::mcq
id: math-kamel-u2-p031-r2
title: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٢ · ٢٠٢٤ — الدور الأول
kicker: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٢ · ٢٠٢٤ — الدور الأول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r2-key.webp)
question: ما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi></mrow></math>\` التي تجعل لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٧</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\` نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p031-r3
title: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٣ · ٢٠٢٤ — الدور الثاني
kicker: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٣ · ٢٠٢٤ — الدور الثاني
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r3-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` نقطة انعطاف عند النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p031-r4
title: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٤ · تجريبي رام الله والبيرة — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٤ · تجريبي رام الله والبيرة — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r4-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\` عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٣</mn></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\` عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&gt;</mo><mn dir="ltr">٣</mn></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، فما العبارة الصحيحة دائماً من العبارات الآتية؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p031-r5
title: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٥ · تجريبي سلفيت — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣١ · ص ٣٠ · البند ٥ · تجريبي سلفيت — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p031-r5-key.webp)
question: إذا كان المستقيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ص</mi><mo>=</mo><mn dir="ltr">١</mn><mo>−</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi></mrow></math>\` مماساً للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عند نقطة الانعطاف \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` فإن ظل زاوية الانعطاف هو:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-3 | صفر
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p032-r1
title: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ١ · تجريبي الوسطى — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ١ · تجريبي الوسطى — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r1-key.webp)
question: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يمر بالنقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فأي مما يلي قيمة عظمى للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | صفر
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٥</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٥</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p032-r2
title: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٢ · تجريبي الخليل — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٢ · تجريبي الخليل — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>×</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p032-r3
title: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٣ · تجريبي سلفيت — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٣ · تجريبي سلفيت — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r3-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\` فإن قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\` هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p032-r4
title: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٤ · تجريبي الخليل — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٤ · تجريبي الخليل — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٨</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\` التي تجعل \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعراً للأسفل؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&lt;</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&gt;</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&gt;</mo><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&lt;</mo><mn dir="ltr">١٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&lt;</mo><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p032-r5
title: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٥ · تجريبي الخليل — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٥ · تجريبي الخليل — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r5-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً يحقق شروط نظرية رول في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi></mrow></math>\` التي تحددها النظرية \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`، فإن إحدى العبارات صحيحة:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية للاقتران
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية للاقتران
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>≠</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية للاقتران.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p032-r6
title: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٦ · تجريبي الخليل — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣٢ · ص ٣١ · البند ٦ · تجريبي الخليل — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p032-r6-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msub></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">س</mi><mn dir="ltr">١</mn></msub><mo>∈</mo><mo stretchy="true">[</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">]</mo></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">س</mi><mn dir="ltr">١</mn></msub></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msub></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∀</mo><msub><mi mathvariant="normal">س</mi><mn dir="ltr">١</mn></msub><mo>&gt;</mo><msub><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msub></mrow></math>\`، أي العبارات التالية صحيحة دائماً؟
- [ ] option-1 | منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-2 | منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">]</mo></mrow></math>\`
- [x] option-3 | منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p033-r1
title: الكامل، الوحدة الثانية · WebP ٣٣ · ص ٣٢ · البند ١ · تجريبي الخليل — ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ٣٣ · ص ٣٢ · البند ١ · تجريبي الخليل — ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p033-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p033-r1-key.webp)
question: إذا كانت النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، فما قياس زاوية الانعطاف؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>π</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p033-r3
title: الكامل، الوحدة الثانية · WebP ٣٣ · ص ٣٢ · البند ٣ · تجريبي طوباس — ٢٠٢٠
kicker: الكامل، الوحدة الثانية · WebP ٣٣ · ص ٣٢ · البند ٣ · تجريبي طوباس — ٢٠٢٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p033-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p033-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>×</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\` فإن النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي:
- [x] option-1 | قيمة عظمى محلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\`
- [ ] option-2 | قيمة صغرى محلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\`
- [ ] option-3 | قيمة صغرى مطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\`
- [ ] option-4 | نقطة انعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: قيمة عظمى محلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p033-r6
title: الكامل، الوحدة الثانية · WebP ٣٣ · ص ٣٢ · البند ٦ · تجريبي شمال الخليل — ٢٠٢٤
kicker: الكامل، الوحدة الثانية · WebP ٣٣ · ص ٣٢ · البند ٦ · تجريبي شمال الخليل — ٢٠٢٤
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p033-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p033-r6-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود مقعراً للأسفل \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∀</mo><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، ما العبارة الصحيحة دائماً مما يأتي؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p034-r1
title: الكامل، الوحدة الثانية · WebP ٣٤ · ص ٣٣ · البند ١ · تجريبي نابلس — ٢٠٢٤
kicker: الكامل، الوحدة الثانية · WebP ٣٤ · ص ٣٣ · البند ١ · تجريبي نابلس — ٢٠٢٤
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p034-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p034-r1-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مماس أفقي عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mo>−</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي:
- [ ] option-1 | نقطة انعطاف
- [ ] option-2 | نقطة قيمة عظمى محلية
- [x] option-3 | نقطة قيمة صغرى محلية
- [ ] option-4 | نقطة قيمة عظمى مطلقة
explanation: الإجابة حسب مفتاح الكامل: نقطة قيمة صغرى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p034-r2
title: الكامل، الوحدة الثانية · WebP ٣٤ · ص ٣٣ · البند ٢ · خارجي
kicker: الكامل، الوحدة الثانية · WebP ٣٤ · ص ٣٣ · البند ٢ · خارجي
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p034-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p034-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يقع في الربع الثالث، معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص في نفس الفترة وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup><mo>×</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، أي العبارات التالية صحيحة؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::exam-question
id: math-kamel-u2-p035-r1
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ١ · ٢٠٠٧
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
حدد فترات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow></math>\`، ثم أوجد نقطة الانعطاف.
solution:
مقعر لأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo></mrow></math>\`. نقطة الانعطاف \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p035-r2
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٢ · ٢٠٠٨
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
جد مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\` في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\`.
solution:
مقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p035-r3-a
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٣ · الجزء ١ · ٢٠٠٨ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`: ١) مجالات التزايد والتناقص.
solution:
متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">٤</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومتناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p035-r3-b
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٣ · الجزء ٢ · ٢٠٠٨ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`: ٢) مجالات التقعر للأعلى وللأسفل.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p035-r4
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٤ · ٢٠٠٩
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn></mrow></mfrac></mrow></math>\`، جد مجالات التقعر للأعلى للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p035-r5-a
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٥ · الجزء ١ · ٢٠١٠
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
معتمداً على الشكل المجاور والذي يمثل منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، جد: ١) مجالات التقعر للأعلى وللأسفل لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

![الرسم الأصلي للمنحنى مع المحورين وتدريجات السينات](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r5-figure.webp)
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p035-r5-b
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٥ · الجزء ٢ · ٢٠١٠
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
معتمداً على الشكل المجاور والذي يمثل منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، جد: ٢) الإحداثيات السينية لنقاط الانعطاف.

![الرسم الأصلي للمنحنى مع المحورين وتدريجات السينات](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r5-figure.webp)
solution:
للاقتران نقاط انعطاف عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p035-r6-a
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٦ · الجزء ١ · ٢٠١٠ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r6-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r6-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٢</mn></mrow></math>\`، جد: ١) القيم القصوى للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
قيمة صغرى محلية \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">١٩</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\` عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p035-r6-b
title: الكامل، الوحدة الثانية · WebP ٣٥ · ص ٣٤ · البند ٦ · الجزء ٢ · ٢٠١٠ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r6-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p035-r6-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٢</mn></mrow></math>\`، جد: ٢) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r1-a
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ١ · الجزء ١ · ٢٠١١
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">١٠</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٣٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد: ١. مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r1-b
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ١ · الجزء ٢ · ٢٠١١
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">١٠</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٣٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد: ٢. الإحداثيات السينية لنقاط الانعطاف.
solution:
نقط الانعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r2-a
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٢ · الجزء ١ · ٢٠١٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، جد: ١. القيم القصوى المحلية.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` قيمة محلية عظمى، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\` قيمة محلية صغرى.

:::

:::exam-question
id: math-kamel-u2-p036-r2-b
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٢ · الجزء ٢ · ٢٠١٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، جد: ٢. مجالات التقعر للأعلى وللأسفل.
solution:
مقعر لأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\` ومقعر لأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r3-a
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٣ · الجزء ١ · ٢٠١٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r3-key.webp)
answer-label: الإجابة المصححة مع توثيق المفتاح المطبوع
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، جد: ١. مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومتناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">]</mo></mrow></math>\`.

تصحيح طباعي موثق: رُسم طرف اللانهاية في فترة التزايد بقوس مغلق في المفتاح؛ كُتب هنا مفتوحاً لأن اللانهاية ليست طرفاً مشمولاً. لم يتغير الطرف المحدود.

:::

:::exam-question
id: math-kamel-u2-p036-r3-b
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٣ · الجزء ٢ · ٢٠١٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، جد: ٢. مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r3-c
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٣ · الجزء ٣ · ٢٠١٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، جد: ٣. الإحداثيات السينية لنقط الانعطاف.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>±</mo><mn dir="ltr">١</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p036-r4-a
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٤ · الجزء ١ · ٢٠١٣
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi><mo>−</mo><mtext dir="rtl">جتا</mtext><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ١) القيم العظمى والصغرى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
صغرى عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وعظمى عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r4-b
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٤ · الجزء ٢ · ٢٠١٣
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi><mo>−</mo><mtext dir="rtl">جتا</mtext><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ٢) فترات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r6-a
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٦ · الجزء ١ · ٢٠١٣ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r6-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r6-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، جد ما يأتي: ١) القيم الصغرى والعظمى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">١٣,٥</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r6-b
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٦ · الجزء ٢ · ٢٠١٣ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r6-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r6-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، جد ما يأتي: ٢) فترات تقعر \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` للأعلى وللأسفل.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p036-r7
title: الكامل، الوحدة الثانية · WebP ٣٦ · ص ٣٥ · البند ٧ · ٢٠١٤
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r7-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p036-r7-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود من الدرجة الثالثة، جد قاعدة الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` إذا علمت أن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة قيمة صغرى محلية وأن النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٣</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p037-r1-a
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ١ · الجزء ١ · ٢٠١٤ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><msup><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r1-b
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ١ · الجزء ٢ · ٢٠١٤ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><msup><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ٢) مجالات التقعر للأعلى وللأسفل لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r2-a
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٢ · الجزء ١ · ٢٠١٤ — إكمال الضفة
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، جد: ١. مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r2-b
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٢ · الجزء ٢ · ٢٠١٤ — إكمال الضفة
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، جد: ٢. مجالات التقعر ونقط الانعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ونقطة الانعطاف \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r3-a
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٣ · الجزء ١ · ٢٠١٥
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`: ١. عين مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r3-b
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٣ · الجزء ٢ · ٢٠١٥
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`: ٢. أوجد القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
قيمة عظمى عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r3-c
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٣ · الجزء ٣ · ٢٠١٥
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`: ٣. عين مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r4-a
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٤ · الجزء ١ · ٢٠١٥ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، فأوجد: ١. القيم القصوى للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، وقيمتها \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١٠</mn></mrow></math>\`. قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، وقيمتها \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r4-b
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٤ · الجزء ٢ · ٢٠١٥ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، فأوجد: ٢. مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r5-a
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٥ · الجزء ١ · ٢٠١٦
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r5-b
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٥ · الجزء ٢ · ٢٠١٦
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ٢) القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
عظمى: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\`. صغرى: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٥٠</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p037-r5-c
title: الكامل، الوحدة الثانية · WebP ٣٧ · ص ٣٦ · البند ٥ · الجزء ٣ · ٢٠١٦
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p037-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ٣) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r2-a
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٢ · الجزء ١ · ٢٠١٦ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r2-b
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٢ · الجزء ٢ · ٢٠١٦ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ٢) القيم العظمى والصغرى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
عظمى: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٧</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١٦</mn></mrow></math>\`. صغرى محلية: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r2-c
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٢ · الجزء ٣ · ٢٠١٦ — الإكمال
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ٣) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r3-a
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٣ · الجزء ١ · ٢٠١٧
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r3-b
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٣ · الجزء ٢ · ٢٠١٧
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ٢) القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
عظمى: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١١٢</mn></mrow></math>\`. صغرى: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r3-c
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٣ · الجزء ٣ · ٢٠١٧
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: ٣) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r4-a
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٤ · الجزء ١ · ٢٠١٧ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r4-b
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٤ · الجزء ٢ · ٢٠١٧ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ٢) القيم العظمى والصغرى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
عظمى محلية مطلقة: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٢</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٢</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo>+</mo><mn dir="ltr">١</mn></mrow></math>\`. صغرى محلية: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p038-r4-c
title: الكامل، الوحدة الثانية · WebP ٣٨ · ص ٣٧ · البند ٤ · الجزء ٣ · ٢٠١٧ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p038-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ٣) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p039-r2-a
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٢ · الجزء ١ · ٢٠١٨
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، جد: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p039-r2-b
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٢ · الجزء ٢ · ٢٠١٨
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، جد: ٢) القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤٠</mn></mrow></math>\` عظمى محلية مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` صغرى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٨</mn></mrow></math>\` عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` صغرى محلية ومطلقة.

:::

:::exam-question
id: math-kamel-u2-p039-r2-c
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٢ · الجزء ٣ · ٢٠١٨
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، جد: ٣) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p039-r2-d
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٢ · الجزء ٤ · ٢٠١٨
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، جد: ٤) نقطة الانعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p039-r3
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٣ · ٢٠١٩
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٤</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف أفقي هي النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ع</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">ك</mi><mn dir="ltr">٢</mn></msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، احسب \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">عً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢٤٨</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p039-r4-a
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٤ · الجزء ١ · ٢٠١٩
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد كلاً مما يلي: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p039-r4-b
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٤ · الجزء ٢ · ٢٠١٩
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد كلاً مما يلي: ٢) القيم القصوى المحلية والمطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية ومطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn><mo>،</mo><mn dir="ltr">٢٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية ومطلقة.

:::

:::exam-question
id: math-kamel-u2-p039-r4-c
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٤ · الجزء ٣ · ٢٠١٩
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد كلاً مما يلي: ٣) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p039-r4-d
title: الكامل، الوحدة الثانية · WebP ٣٩ · ص ٣٨ · البند ٤ · الجزء ٤ · ٢٠١٩
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p039-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد كلاً مما يلي: ٤) نقط الانعطاف لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p040-r1-a
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ١ · الجزء ١ · ٢٠١٩ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد كلاً مما يلي: ١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\` و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p040-r1-b
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ١ · الجزء ٢ · ٢٠١٩ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد كلاً مما يلي: ٢) القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٢٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٦</mn><mo>،</mo><mn dir="ltr">٥٩</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى مطلقة.

:::

:::exam-question
id: math-kamel-u2-p040-r1-c
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ١ · الجزء ٣ · ٢٠١٩ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد كلاً مما يلي: ٣) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`. ويذكر المفتاح أن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p040-r2
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ٢ · ٢٠١٩ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ج</mi><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">د</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>،</mo><mi mathvariant="normal">ج</mi><mo>،</mo><mi mathvariant="normal">د</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\`، وكان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، ومعادلة المماس لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عند نقطة الانعطاف هي \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">ص</mi><mo>−</mo><mn dir="ltr">٥</mn><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، أوجد قاعدة الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٤</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p040-r3-a
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ٣ · الجزء ١ · ٢٠٢٠
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mtext dir="rtl">جتا</mtext><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`، أوجد: ١) مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p040-r3-b
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ٣ · الجزء ٢ · ٢٠٢٠
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mtext dir="rtl">جتا</mtext><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`، أوجد: ٢) نقطة / نقاط الانعطاف.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p040-r3-c
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ٣ · الجزء ٣ · ٢٠٢٠
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mtext dir="rtl">جا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac><mtext dir="rtl">جتا</mtext><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`، أوجد: ٣) زاوية / زوايا الانعطاف.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p040-r4-a
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ٤ · الجزء ١ · ٢٠٢٠ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mroot><mrow><mi mathvariant="normal">س</mi></mrow><mrow><mn dir="ltr">٣</mn></mrow></mroot><mo>+</mo><mn dir="ltr">٢</mn></mrow></math>\`، أوجد: ١) مجالات التقعر للأعلى وللأسفل للاقتران.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p040-r4-b
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ٤ · الجزء ٢ · ٢٠٢٠ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mroot><mrow><mi mathvariant="normal">س</mi></mrow><mrow><mn dir="ltr">٣</mn></mrow></mroot><mo>+</mo><mn dir="ltr">٢</mn></mrow></math>\`، أوجد: ٢) نقطة / نقاط الانعطاف (إن وجدت).
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p040-r4-c
title: الكامل، الوحدة الثانية · WebP ٤٠ · ص ٣٩ · البند ٤ · الجزء ٣ · ٢٠٢٠ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p040-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mroot><mrow><mi mathvariant="normal">س</mi></mrow><mrow><mn dir="ltr">٣</mn></mrow></mroot><mo>+</mo><mn dir="ltr">٢</mn></mrow></math>\`، أوجد: ٣) قياس زاوية / زوايا الانعطاف (إن وجدت).
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p041-r1
title: الكامل، الوحدة الثانية · WebP ٤١ · ص ٤٠ · البند ١ · ٢٠٢٠ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
يمثل الشكل المجاور منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` لكثير حدود \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` من الدرجة الثالثة. أوجد قاعدة الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` إذا علمت أن منحناه يمر بنقطة الأصل.

![الرسم الأصلي للمشتقة مع المحاور والأعداد المشار إليها](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r1-figure.webp)
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p041-r2
title: الكامل، الوحدة الثانية · WebP ٤١ · ص ٤٠ · البند ٢ · ٢٠٢٠ — الدور الثالث
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\` نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٨</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان قياس زاوية الانعطاف عند نقطة الانعطاف تلك يساوي \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`، أوجد قيم الثوابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo>،</mo><mi mathvariant="normal">ج</mi></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi><mo>=</mo><mn dir="ltr">٨</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p041-r3-a
title: الكامل، الوحدة الثانية · WebP ٤١ · ص ٤٠ · البند ٣ · الجزء ١ · ٢٠٢١
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١٢</mn><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&gt;</mo><mn dir="ltr">١</mn></mrow></math>\`، فأوجد: ١- مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p041-r3-b
title: الكامل، الوحدة الثانية · WebP ٤١ · ص ٤٠ · البند ٣ · الجزء ٢ · ٢٠٢١
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١٢</mn><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&gt;</mo><mn dir="ltr">١</mn></mrow></math>\`، فأوجد: ٢- نقط الانعطاف (إن وجدت) للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">١٦</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p041-r5-a
title: الكامل، الوحدة الثانية · WebP ٤١ · ص ٤٠ · البند ٥ · الجزء ١ · ٢٠٢١ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٧</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ١- مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٧</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p041-r5-b
title: الكامل، الوحدة الثانية · WebP ٤١ · ص ٤٠ · البند ٥ · الجزء ٢ · ٢٠٢١ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p041-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٧</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ٢- نقط الانعطاف (إن وجدت) للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">٩</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p042-r1
title: الكامل، الوحدة الثانية · WebP ٤٢ · ص ٤١ · البند ١ · ٢٠٢١ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">ب</mi></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\` وكان لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية قيمتها \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٨</mn></mrow></math>\` وله نقطة انعطاف عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، فأوجد قيم الثابتين \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p042-r3-a
title: الكامل، الوحدة الثانية · WebP ٤٢ · ص ٤١ · البند ٣ · الجزء ١ · ٢٠٢١ — الدور الثالث
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢٤</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٥</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ١- القيم القصوى المحلية والمطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٥</mn><mo>،</mo><mn dir="ltr">٧٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٢٨</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٤</mn><mo>،</mo><mn dir="ltr">٨٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn><mo>،</mo><mn dir="ltr">١٦</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية.

:::

:::exam-question
id: math-kamel-u2-p042-r3-b
title: الكامل، الوحدة الثانية · WebP ٤٢ · ص ٤١ · البند ٣ · الجزء ٢ · ٢٠٢١ — الدور الثالث
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢٤</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٥</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: ٢- مجالات التقعر للأعلى وللأسفل لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٥</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p042-r4
title: الكامل، الوحدة الثانية · WebP ٤٢ · ص ٤١ · البند ٤ · ٢٠٢١ — الدور الثالث
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان المستقيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ص</mi><mo>=</mo><mn dir="ltr">١</mn><mo>−</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi></mrow></math>\` يمس منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ج</mi><mi mathvariant="normal">س</mi></mrow></math>\` عند نقطة انعطاف \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وهي \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما قيمة الثوابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi><mo>،</mo><mi mathvariant="normal">ج</mi></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٩</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p042-r5
title: الكامل، الوحدة الثانية · WebP ٤٢ · ص ٤١ · البند ٥ · ٢٠٢٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p042-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><msup><mtext dir="rtl">جتا</mtext><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` معرفاً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`، فحدد فترات التقعر للأعلى وللأسفل لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٥</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mfrac><mrow><mn dir="ltr">٥</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac><mo>،</mo><mo>π</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p043-r2-a
title: الكامل، الوحدة الثانية · WebP ٤٣ · ص ٤٢ · البند ٢ · الجزء ١ · ٢٠٢٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، وكان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف هي \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، جد: ١- قيم الثابتين أ، ب.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p043-r2-b
title: الكامل، الوحدة الثانية · WebP ٤٣ · ص ٤٢ · البند ٢ · الجزء ٢ · ٢٠٢٢
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، وكان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف هي \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، جد: ٢- ظل زاوية الانعطاف لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">ظا</mtext><mtext dir="rtl">هـ</mtext><mo>=</mo><mfrac><mrow><mn dir="ltr">٢٧</mn></mrow><mrow><mn dir="ltr">٨</mn></mrow></mfrac></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p043-r3
title: الكامل، الوحدة الثانية · WebP ٤٣ · ص ٤٢ · البند ٣ · ٢٠٢٢ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، وكان لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مماساً أفقياً عند النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٧</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما قيمة الثابتين \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p043-r4-a
title: الكامل، الوحدة الثانية · WebP ٤٣ · ص ٤٢ · البند ٤ · الجزء ١ · ٢٠٢٢ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><mi mathvariant="normal">س</mi></mrow></math>\` قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، وقيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، فجد: ١- قيمة الثابتين أ، ب.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p043-r4-b
title: الكامل، الوحدة الثانية · WebP ٤٣ · ص ٤٢ · البند ٤ · الجزء ٢ · ٢٠٢٢ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><mi mathvariant="normal">س</mi></mrow></math>\` قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، وقيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، فجد: ٢- مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر لأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`، ومقعر لأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p043-r5-a
title: الكامل، الوحدة الثانية · WebP ٤٣ · ص ٤٢ · البند ٥ · الجزء ١ · ٢٠٢٢ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد: ١- مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p043-r5-b
title: الكامل، الوحدة الثانية · WebP ٤٣ · ص ٤٢ · البند ٥ · الجزء ٢ · ٢٠٢٢ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p043-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد: ٢- نقط الانعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٦٤</mn></mrow><mrow><mn dir="ltr">٩</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٦٤</mn></mrow><mrow><mn dir="ltr">٩</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطتا انعطاف.

:::

:::exam-question
id: math-kamel-u2-p044-r1-a
title: الكامل، الوحدة الثانية · WebP ٤٤ · ص ٤٣ · البند ١ · الجزء ١ · ٢٠٢٢ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد: ١- مجالات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p044-r1-b
title: الكامل، الوحدة الثانية · WebP ٤٤ · ص ٤٣ · البند ١ · الجزء ٢ · ٢٠٢٢ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، جد: ٢- نقط الانعطاف للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٦٤</mn></mrow><mrow><mn dir="ltr">٩</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٦٤</mn></mrow><mrow><mn dir="ltr">٩</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطتا انعطاف.

:::

:::exam-question
id: math-kamel-u2-p044-r2
title: الكامل، الوحدة الثانية · WebP ٤٤ · ص ٤٣ · البند ٢ · ٢٠٢٣ — الدور الأول
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، جد لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` فترات التقعر للأعلى وللأسفل ونقاط الانعطاف.
solution:
مقعر للأسفل في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأعلى في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">[</mo></mrow></math>\`، و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p044-r3-a
title: الكامل، الوحدة الثانية · WebP ٤٤ · ص ٤٣ · البند ٣ · الجزء ١ · ٢٠٢٣ — الدور الأول
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
يمثل الشكل المجاور منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` لكثير الحدود \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` المعرف على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، إذا علمت أن للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقاط انعطاف عند كل من \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، معتمداً عليه جد كلاً مما يلي: ١. مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

![الرسم الأصلي للمشتقة مع المحورين والتدريجات ونهايتي المجال](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r3-figure.webp)
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p044-r3-b
title: الكامل، الوحدة الثانية · WebP ٤٤ · ص ٤٣ · البند ٣ · الجزء ٢ · ٢٠٢٣ — الدور الأول
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
يمثل الشكل المجاور منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` لكثير الحدود \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` المعرف على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، إذا علمت أن للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقاط انعطاف عند كل من \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`، معتمداً عليه جد كلاً مما يلي: ٢. مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

![الرسم الأصلي للمشتقة مع المحورين والتدريجات ونهايتي المجال](assets/lessons/mathematics/source-crops/math-kamel-u2-p044-r3-figure.webp)
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">[</mo></mrow></math>\`، ومتزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p046-r1-a
title: الكامل، الوحدة الثانية · WebP ٤٦ · ص ٤٥ · البند ١ · الجزء ١ · ٢٠٢٤ — الدور الأول
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، جد: ١. فترات التقعر للأعلى وللأسفل لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">[</mo></mrow></math>\`.
solution:
مقعر للأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p046-r1-b
title: الكامل، الوحدة الثانية · WebP ٤٦ · ص ٤٥ · البند ١ · الجزء ٢ · ٢٠٢٤ — الدور الأول
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، جد: ٢. نقاط الانعطاف (إن وجدت) للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف.

:::

:::exam-question
id: math-kamel-u2-p046-r2
title: الكامل، الوحدة الثانية · WebP ٤٦ · ص ٤٥ · البند ٢ · ٢٠٢٤ — الدور الأول
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ع</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وكان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة انعطاف أفقي عند النقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">ع</mi><mn dir="ltr">٢</mn></msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ع</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>≠</mo><mn dir="ltr">٠</mn></mrow></math>\`، جد \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">لً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧٤</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u2-p046-r3-a
title: الكامل، الوحدة الثانية · WebP ٤٦ · ص ٤٥ · البند ٣ · الجزء ١ · ٢٠٢٤ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٤</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، جد: ١. فترات التقعر للأعلى وللأسفل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
مقعر للأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">٦</mn><mo stretchy="true">[</mo><mo>∪</mo><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومقعر للأسفل على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mn dir="ltr">٦</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p046-r3-b
title: الكامل، الوحدة الثانية · WebP ٤٦ · ص ٤٥ · البند ٣ · الجزء ٢ · ٢٠٢٤ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٤</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، جد: ٢. نقطة / نقاط الانعطاف لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` إن وجدت.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٦</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">٢٢</mn></mrow><mrow><msup><mtext dir="rtl">هـ</mtext><mn dir="ltr">٦</mn></msup></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١٠</mn><msup><mtext dir="rtl">هـ</mtext><mn dir="ltr">٢</mn></msup></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطتا انعطاف.

:::

:::exam-question
id: math-kamel-u2-p046-r4
title: الكامل، الوحدة الثانية · WebP ٤٦ · ص ٤٥ · البند ٤ · ٢٠٢٤ — الدور الثاني
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`، حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mtext dir="rtl">هـَ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>×</mo><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، بالاعتماد على الشكل المجاور الذي يمثل منحنيي الاقترانين \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـَ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، حدد نوع التقعر لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo></mrow></math>\`؟

![المنحنيان هـ ول مع تسمياتهما ومحوري الإحداثيات كما في المصدر](assets/lessons/mathematics/source-crops/math-kamel-u2-p046-r4-figure.webp)
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">٠</mn><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p048-r3
title: الكامل، الوحدة الثانية · WebP ٤٨ · ص ٤٧ · البند ٣ · خارجي
question: التقعر ونقاط الانعطاف
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p048-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p048-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>×</mo><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وكان منحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يقع فوق محور السينات ومتزايداً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`، ومتناقصاً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، جد مجالات تقعر الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` مقعر للأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`.

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
