import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const lessonSource = `
:::exam-question
id: math-book-p084-ex1
title: الكتاب، ص 82 · مثال ١ · سهل
question: التكامل غير المحدود
reference: [السؤال، PDF ص 84](assets/lessons/mathematics/source-crops/math-book-p084-ex1-question.webp) · [الحل المطبوع ](assets/lessons/mathematics/source-crops/math-book-p084-ex1-answer.webp)
answer-label: الحل المطبوع في الكتاب
body:
تحقّق من أن الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٤</mn></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup></mrow></mrow></math>\` اقتران أصلي للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`؛ لذلك م(س) اقتران أصلي للاقتران ق(س).
:::

:::exam-question
id: math-book-p085-ex2
title: الكتاب، ص 83 · مثال ٢ · سهل
question: التكامل غير المحدود
reference: [السؤال، PDF ص 85](assets/lessons/mathematics/source-crops/math-book-p085-ex2-question.webp) · [الحل المطبوع ](assets/lessons/mathematics/source-crops/math-book-p085-ex2-answer.webp)
answer-label: الحل المطبوع في الكتاب
body:
إذا كان الاقترانان م(س)، هـ(س) اقترانين أصليين للاقتران المتصل ق(س)، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، جد \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">لَ</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٣</mn><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">لَ</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٣</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
:::

:::mcq
id: math-kamel-u4-p003-r1
title: الكامل، الوحدة 4 · PDF ص 3 · البند 1 · سهل
kicker: الكامل، الوحدة 4 · PDF ص 3 · البند 1 · سهل
reference: [السؤال والخيارات الأصلية](assets/lessons/mathematics/source-crops/math-kamel-u4-p003-r1-question.webp) · [مفتاح الكامل](assets/lessons/mathematics/source-crops/math-kamel-u4-p003-r1-key.webp)
question: إذا كان م(س)، هـ(س) اقترانين أصليين للاقتران ق(س)، فإن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mtext dir="rtl">هـ</mtext><mo>−</mo><mi mathvariant="normal">م</mi></mrow><mo stretchy="true">)</mo></mrow><mo>َ</mo></msup><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></math>\` =
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p005-r4
title: الكامل، الوحدة 4 · PDF ص 5
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 5
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mfrac><mn dir="ltr">١</mn><mi mathvariant="normal">س</mi></mfrac><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`، س ≠ ٠، فما قاعدة ل(س)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mi mathvariant="normal">س</mi></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mi mathvariant="normal">س</mi></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p006-r1
title: الكامل، الوحدة 4 · PDF ص 6 · البند 1 · سهل
kicker: الكامل، الوحدة 4 · PDF ص 6 · البند 1 · سهل
reference: [السؤال والخيارات الأصلية](assets/lessons/mathematics/source-crops/math-kamel-u4-p006-r1-question.webp) · [مفتاح الكامل](assets/lessons/mathematics/source-crops/math-kamel-u4-p006-r1-key.webp)
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">د</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>−</mo><msqrt><mi mathvariant="normal">س</mi></msqrt></mrow><mo stretchy="true">)</mo></mrow></mrow><mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mfrac></mrow></math>\`، فأي مما يأتي تمثل \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac><msqrt><mi mathvariant="normal">س</mi></msqrt><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>−</mo><msqrt><mi mathvariant="normal">س</mi></msqrt><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><msqrt><mi mathvariant="normal">س</mi></msqrt><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mfrac><mn dir="ltr">٢</mn><mn dir="ltr">٣</mn></mfrac><msup><mi mathvariant="normal">س</mi><mfrac><mn dir="ltr">٣</mn><mn dir="ltr">٢</mn></mfrac></msup><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><msqrt><mi mathvariant="normal">س</mi></msqrt><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p003-r2
title: الكامل، الوحدة 4 · PDF ص 3
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 3
question: ليكن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\` و\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، فما ق(٣)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١٠</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٩</mn></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٨</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٦</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٨</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-book-p084-activity1-table
title: الكتاب، ص 82 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 84](assets/lessons/mathematics/sources/mathbook.pdf#page=84)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
من خلال ما تعلمته في التفاضل، أكمل الجدولين الآتيين.

| ق(س) في الجدول (أ) |
| --- |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mi mathvariant="normal">س</mi></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٤</mn></mrow></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></math>\` |

| قَ(س) في الجدول (ب) |
| --- |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧</mn></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><msup><mrow><mtext dir="rtl">قا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup></math>\` |
| \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">١</mn><mi mathvariant="normal">س</mi></mfrac></math>\` |
solution:
الجدول (أ)، المشتقات بالترتيب: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></math>\`.

الجدول (ب)، اقتراح اقترانات أصلية بالترتيب: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">|</mo><mi mathvariant="normal">س</mi><mo stretchy="true">|</mo></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؛ ويمكن إضافة ثابت لكل منها.
:::

:::exam-question
id: math-book-p084-activity1-q1
title: الكتاب، ص 82 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 84](assets/lessons/mathematics/sources/mathbook.pdf#page=84)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
تسمى العملية في الجدول (أ) عملية اشتقاق. اقترح اسمًا للعملية في الجدول (ب).
solution:
إيجاد الاقتران الأصلي، أو التكامل.
:::

:::exam-question
id: math-book-p084-activity1-q2
title: الكتاب، ص 82 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 84](assets/lessons/mathematics/sources/mathbook.pdf#page=84)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ما العلاقة بين العمليتين في الجدولين (أ)، (ب)؟
solution:
إيجاد الاقتران الأصلي عملية عكسية للاشتقاق.
:::

:::exam-question
id: math-book-p084-activity1-q3
title: الكتاب، ص 82 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 84](assets/lessons/mathematics/sources/mathbook.pdf#page=84)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
هل الاقتران ق(س) يكون وحيدًا لكل حالة في الجدول (ب)؟ أعط أمثلة.
solution:
لا؛ مثلًا \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn><mi mathvariant="normal">س</mi></mrow></math>\` و\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></math>\` لهما المشتقة نفسها: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧</mn></math>\`.
:::

:::exam-question
id: math-book-p085-activity2-main
title: الكتاب، ص 83 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 85](assets/lessons/mathematics/sources/mathbook.pdf#page=85)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد اقترانًا أصليًا للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`
:::

:::exam-question
id: math-book-p085-activity2-q1
title: الكتاب، ص 83 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 85](assets/lessons/mathematics/sources/mathbook.pdf#page=85)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
هل \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">١</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow></math>\` و\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\` اقترانان أصليان آخران للاقتران ق(س) = ٢س؟
solution:
نعم؛ مشتقة كل منهما \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`.
:::

:::exam-question
id: math-book-p085-activity2-q2
title: الكتاب، ص 83 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 85](assets/lessons/mathematics/sources/mathbook.pdf#page=85)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
هل يوجد عدد محدد من الاقترانات الأصلية للاقتران ق(س) = ٢س؟ ما العلاقة بينها؟
solution:
يوجد عدد غير منتهٍ: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`؛ تختلف فيما بينها بثابت.
:::

:::exam-question
id: math-book-p085-ex3
title: الكتاب، ص 83 · مثال محلول
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 85](assets/lessons/mathematics/sources/mathbook.pdf#page=85)
answer-label: الحل المطبوع في الكتاب
body:
بيّن أن مجموعة الاقترانات الأصلية للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\` هي مجموعة من الاقترانات التي منحنياتها مستقيمات متوازية.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`؛ جميع المستقيمات لها الميل نفسه ٣.
:::

:::exam-question
id: math-book-p086-ex4
title: الكتاب، ص 84 · مثال محلول
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 86](assets/lessons/mathematics/sources/mathbook.pdf#page=86)
answer-label: الحل المطبوع في الكتاب
body:
بيّن فيما إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mfrac></mrow></math>\` اقترانًا أصليًا للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">١</mn><mo>+</mo><mfrac><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mfrac></mrow></mrow></math>\`، س ≠ ٠.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">١</mn><mo>+</mo><mfrac><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mfrac></mrow></mrow></math>\`؛ إذن هو اقتران أصلي.
:::

:::exam-question
id: math-book-p086-activity3-q1
title: الكتاب، ص 84 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 86](assets/lessons/mathematics/sources/mathbook.pdf#page=86)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
أكمل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∫</mo><msup><mi mathvariant="normal">ص</mi><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></msup><mi mathvariant="normal">د</mi><mi mathvariant="normal">ص</mi></mrow></math>\` = −١/ص + ج، لأن ...
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mi mathvariant="normal">د</mi><mrow><mfrac><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mi mathvariant="normal">ص</mi></mfrac><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow><mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">ص</mi></mrow></mfrac><mo>=</mo><msup><mi mathvariant="normal">ص</mi><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></msup></mrow></math>\`
:::

:::exam-question
id: math-book-p086-activity3-q2
title: الكتاب، ص 84 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 86](assets/lessons/mathematics/sources/mathbook.pdf#page=86)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
أكمل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∫</mo><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` = جا س + ج، وذلك لأن ...
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mi mathvariant="normal">د</mi><mrow><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow><mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mfrac><mo>=</mo><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
:::

:::exam-question
id: math-book-p086-ex5
title: الكتاب، ص 84 · مثال محلول
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 86](assets/lessons/mathematics/sources/mathbook.pdf#page=86)
answer-label: الحل المطبوع في الكتاب
body:
إذا كان ق(س) اقترانًا متصلًا، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\`، جد قَ(٢)، قً(٢).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">١٢</mn></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٢</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">٦</mn></mrow></math>\`.
:::

:::exam-question
id: math-book-p087-ex6
title: الكتاب، ص 85 · مثال محلول
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 87](assets/lessons/mathematics/sources/mathbook.pdf#page=87)
answer-label: الحل المطبوع في الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo>∫</mo><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، وكان ق(٠) = ٣، فجد ق(١).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">١</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mtext dir="rtl">هـ</mtext><mo>+</mo><mn dir="ltr">٢</mn></mrow></mrow></math>\`
:::

:::exam-question
id: math-book-p087-q1-a
title: الكتاب، ص 85 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 87](assets/lessons/mathematics/sources/mathbook.pdf#page=87)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
بيّن أن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٣</mn></mfrac><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow><mo stretchy="true">)</mo></mrow><mfrac><mn dir="ltr">٣</mn><mn dir="ltr">٢</mn></mfrac></msup></mrow></mrow></math>\` اقتران أصلي لـ \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><msqrt><mrow><mn dir="ltr">٢</mn><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><msqrt><mrow><mn dir="ltr">٢</mn><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></mrow></math>\`
:::

:::exam-question
id: math-book-p087-q1-b
title: الكتاب، ص 85 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 87](assets/lessons/mathematics/sources/mathbook.pdf#page=87)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
بيّن أن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msup><mrow><mtext dir="rtl">قا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\` اقتران أصلي لـ \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><msup><mrow><mtext dir="rtl">قا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><msup><mrow><mtext dir="rtl">قا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`
:::

:::exam-question
id: math-book-p087-q1-c
title: الكتاب، ص 85 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 87](assets/lessons/mathematics/sources/mathbook.pdf#page=87)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
بيّن أن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\` اقتران أصلي لـ \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow></mfrac></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow></mfrac></mrow></math>\`
:::

:::exam-question
id: math-book-p087-q2
title: الكتاب، ص 85 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 87](assets/lessons/mathematics/sources/mathbook.pdf#page=87)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان م(س)، هـ(س) اقترانين أصليين لق(س)، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٦</mn></mrow></mrow></math>\`، وهـ(٣) = ٤، فجد هـ(١).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mn dir="ltr">١</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\`
:::

:::exam-question
id: math-book-p087-q3
title: الكتاب، ص 85 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 87](assets/lessons/mathematics/sources/mathbook.pdf#page=87)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان م(س)، هـ(س) اقترانين أصليين للاقتران المتصل ق(س)، وكان ق(٤) = ٧، قَ(٤) = ١٠، فما قيمة (٣م − هـ)َ(٤)؟
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١٤</mn></math>\`
:::

:::exam-question
id: math-book-p087-q4
title: الكتاب، ص 85 · نشاط أو تمرين
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 87](assets/lessons/mathematics/sources/mathbook.pdf#page=87)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mn dir="ltr">٢</mn><mrow><mtext dir="rtl">قا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\` أحد الاقترانات الأصلية للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mi mathvariant="normal">أ</mi><mrow><mn dir="ltr">١</mn><mo>+</mo><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mfrac></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٤</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، احسب أ.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`
:::

:::mcq
id: math-book-p124-unit-q1-a
title: الكتاب، ص 122 · اختبار الوحدة
kicker: اختبار الوحدة
reference: [الكتاب، PDF ص 124](assets/lessons/mathematics/sources/mathbook.pdf#page=124)
question: إذا كان م(س)، هـ(س) اقترانين أصليين مختلفين لق(س)، فماذا يمثل ∫ (م(س) − هـ(س)) دس؟
- [ ] option-1 | اقترانًا ثابتًا
- [ ] option-2 | اقترانًا تربيعيًا
- [x] option-3 | اقترانًا خطيًا
- [ ] option-4 | صفرًا
explanation: الإجابة المحسوبة من معطيات السؤال وقواعد الكتاب: اقترانًا خطيًا.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-book-p124-unit-q1-b
title: الكتاب، ص 122 · اختبار الوحدة
kicker: اختبار الوحدة
reference: [الكتاب، PDF ص 124](assets/lessons/mathematics/sources/mathbook.pdf#page=124)
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo>∫</mo><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، وق(٢) = ٩، فما قيمة ق(−٢)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٩</mn></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
explanation: الإجابة المحسوبة من معطيات السؤال وقواعد الكتاب: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-book-p125-unit-q2
title: الكتاب، ص 123 · اختبار الوحدة
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 125](assets/lessons/mathematics/sources/mathbook.pdf#page=125)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
أثبت أن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">١</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\` هو اقتران أصلي لـ \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mo>−</mo><mi mathvariant="normal">س</mi></mrow><msqrt><mrow><mn dir="ltr">١</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mfrac></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mo>−</mo><mi mathvariant="normal">س</mi></mrow><msqrt><mrow><mn dir="ltr">١</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mfrac></mrow></math>\`
:::

:::exam-question
id: math-book-p126-unit-q9
title: الكتاب، ص 124 · اختبار الوحدة
question: التكامل غير المحدود
reference: [الكتاب، PDF ص 126](assets/lessons/mathematics/sources/mathbook.pdf#page=126)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان ق(س) متصلًا على مجاله، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">ص</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">ص</mi></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn><msqrt><mi mathvariant="normal">س</mi></msqrt></mrow></mrow></math>\`، فجد ق(٤)، قَ(٤).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٤</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mn dir="ltr">١٥</mn><mn dir="ltr">٢</mn></mfrac></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">٤</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mn dir="ltr">٣٣</mn><mn dir="ltr">١٦</mn></mfrac></mrow></math>\`.
:::

:::mcq
id: math-kamel-u4-p004-r1
title: الكامل، الوحدة 4 · PDF ص 4
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 4](assets/lessons/mathematics/sources/kamel-u4.pdf#page=4)
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\` وق(٢) − ق(١) = ١٨، فما ق(١)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٦</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٩</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢١</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p004-r2
title: الكامل، الوحدة 4 · PDF ص 4
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 4](assets/lessons/mathematics/sources/kamel-u4.pdf#page=4)
question: إذا كان م(س)، هـ(س) اقترانين أصليين لق(س)، وق(٢) = ٩، وقَ(٢) = ٤، فما قيمة (٥م − ٣هـ)َ(٢)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٨</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٨</mn></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١٨</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١٨</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p004-r3
title: الكامل، الوحدة 4 · PDF ص 4
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 4](assets/lessons/mathematics/sources/kamel-u4.pdf#page=4)
question: إذا كان ق(س) متصلًا وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`، فما قَ(١)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٥</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p006-r2
title: الكامل، الوحدة 4 · PDF ص 6
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 6](assets/lessons/mathematics/sources/kamel-u4.pdf#page=6)
question: ليكن م(س) اقترانًا أصليًا لق(س) المتصل على ح، فإذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`، فما ق(١)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٥</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٧</mn><mn dir="ltr">٢</mn></mfrac></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p006-r4
title: الكامل، الوحدة 4 · PDF ص 6
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 6](assets/lessons/mathematics/sources/kamel-u4.pdf#page=6)
question: إذا كان م(س) اقترانًا أصليًا لق(س)، فما العبارة الصحيحة؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p008-r1
title: الكامل، الوحدة 4 · PDF ص 8
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 8](assets/lessons/mathematics/sources/kamel-u4.pdf#page=8)
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`، وق(س) متصل، فما ق(٣)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٨</mn><mn dir="ltr">٥</mn></mfrac></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠٫٨</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٥</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٦</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٨</mn><mn dir="ltr">٥</mn></mfrac></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p008-r2
title: الكامل، الوحدة 4 · PDF ص 8
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 8](assets/lessons/mathematics/sources/kamel-u4.pdf#page=8)
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><msup><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>−</mo><mi mathvariant="normal">أ</mi><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mn dir="ltr">١</mn></mrow></mrow></math>\`، وقَ(π/٤) = ٠، فما أ؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><msqrt><mn dir="ltr">٢</mn></msqrt></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><msqrt><mn dir="ltr">٢</mn></msqrt></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><msqrt><mn dir="ltr">٢</mn></msqrt></mfrac></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">١</mn><msqrt><mn dir="ltr">٢</mn></msqrt></mfrac></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><msqrt><mn dir="ltr">٢</mn></msqrt></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p008-r3
title: الكامل، الوحدة 4 · PDF ص 8
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 8](assets/lessons/mathematics/sources/kamel-u4.pdf#page=8)
question: إذا كان م(س) اقترانًا أصليًا لق(س) = ١/(٣ − س)، س ≠ ٣، فما م(س) من الآتية؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">|</mo><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">|</mo></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">١</mn><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mfrac></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">|</mo><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">|</mo></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mfrac></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">|</mo><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">|</mo></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p008-r4
title: الكامل، الوحدة 4 · PDF ص 8
kicker: الكامل، الوحدة 4
reference: [الكامل، PDF ص 8](assets/lessons/mathematics/sources/kamel-u4.pdf#page=8)
question: إذا كان م(س) الاقتران الأصلي لق(س) المتصل، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>+</mo><mrow><mo>∫</mo><mfrac><mrow><msup><mi mathvariant="normal">ك</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">١٢</mn></mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mfrac><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow><mo>=</mo><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mfrac><mn dir="ltr">٤</mn><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></mrow></math>\`، فما ك؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٨</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٨</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p005-r3
title: الكامل، الوحدة 4 · PDF ص 5
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 5
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\`، فما ق(٢) − ق(−٢)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٨</mn></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢٠</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢٨</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢٠</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p010-r2
title: الكامل، الوحدة 4 · PDF ص 10
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 10
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mo>−</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mrow><mo>∫</mo><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow></mrow></math>\`، فما قاعدة ق(س)، حيث س ∈ ]π/٢، π[؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p010-r5
title: الكامل، الوحدة 4 · PDF ص 10
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 10
question: إذا كان م(س) اقترانًا أصليًا لق(س) المتصل على مجاله، وكان ق(١) = ٣ و\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mfrac><mn dir="ltr">٢</mn><mn dir="ltr">٣</mn></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">أ</mi><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\`، جد الثابت أ.
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p011-r1
title: الكامل، الوحدة 4 · PDF ص 11
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 11
question: إذا كان م(س) اقترانًا أصليًا لق(س) المتصل على مجاله، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mn dir="ltr">٥</mn><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow><mo>=</mo><mrow><mo>∫</mo><mi mathvariant="normal">س</mi><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، فما ق(٤)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p011-r3
title: الكامل، الوحدة 4 · PDF ص 11
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 11
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\` الاقتران الأصلي للاقتران المتصل هـ(س)، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mn dir="ltr">٢</mn><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، فأي الاقترانات التالية يمثل ق(س)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>−</mo><mn dir="ltr">٨</mn></mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>−</mo><mn dir="ltr">٨</mn></mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١٠</mn></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١٠</mn></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١٠</mn></mrow></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١٠</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p011-r5
title: الكامل، الوحدة 4 · PDF ص 11
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 11
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mo stretchy="true">(</mo><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><msup><mtext dir="rtl">هـ</mtext><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></msup><mo>+</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`، جد ق(٠).
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٦</mn></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٧</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p011-r6
title: الكامل، الوحدة 4 · PDF ص 11
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 11
question: ليكن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mo stretchy="true">(</mo><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mi mathvariant="normal">ك</mi><msup><mtext dir="rtl">هـ</mtext><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></msup><mo>−</mo><mn dir="ltr">٦</mn></mrow></mrow></math>\`، وق(١) = ٦هـ، جد الثابت ك.
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٦</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p012-r1
title: الكامل، الوحدة 4 · PDF ص 12
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 12
question: كان م(س)، هـ(س) اقترانين أصليين مختلفين للاقتران المتصل ق(س)، فإن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∫</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></msup><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يمثل اقترانًا:
- [x] option-1 | خطيًا
- [ ] option-2 | ثابتًا
- [ ] option-3 | تربيعيًا
- [ ] option-4 | لوغاريتميًا
explanation: الإجابة المطبوعة في الكامل: خطيًا.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p012-r3
title: الكامل، الوحدة 4 · PDF ص 12
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 12
question: بالاعتماد على الشكل المجاور، إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\` و\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow></mrow></math>\`، جد ق(٢).
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٥</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٩</mn></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١٣</mn></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١٣</mn></math>\`.
example:
![منحنى ق(س) ومستقيم هـ(س) يتقاطعان على محور الصادات](assets/lessons/mathematics/source-crops/u45-kamel-u4-p012-r3-diagram.webp)
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p012-r5
title: الكامل، الوحدة 4 · PDF ص 12
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 12
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">أ</mi><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow><mo>=</mo><mrow><msup><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>−</mo><mi mathvariant="normal">أ</mi><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mn dir="ltr">١</mn></mrow></mrow></math>\`، وقَ(π/٤) = ٥، فما الثابت أ؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mn dir="ltr">٧</mn></mfrac></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٧</mn></mfrac></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٢</mn><mn dir="ltr">٣</mn></mfrac></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mn dir="ltr">٣</mn></mfrac></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mn dir="ltr">٧</mn></mfrac></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p012-r6
title: الكامل، الوحدة 4 · PDF ص 12
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 12
question: إذا كان م(س) اقترانًا أصليًا للاقتران المتصل ق(س)، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mo stretchy="true">(</mo><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">١</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msup><mo>+</mo><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></mrow></math>\`، جد ق(١).
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p013-r1
title: الكامل، الوحدة 4 · PDF ص 13
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 13
question: م(س)، هـ(س) اقترانان أصليان للاقتران ق(س)، فإن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>∫</mo><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يمثل اقترانًا:
- [ ] option-1 | خطيًا
- [ ] option-2 | تربيعيًا
- [ ] option-3 | ثابتًا
- [x] option-4 | من الدرجة الثالثة
explanation: الإجابة المطبوعة في الكامل: من الدرجة الثالثة.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u4-p015-r1
title: الكامل، الوحدة 4 · PDF ص 15
kicker: الكامل، الوحدة 4
reference: الكامل، الوحدة 4، PDF ص 15
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، وق(س) > ٠، فما الاقتران الذي يمثل ق(س)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة المطبوعة في الكامل: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-kamel-u4-p016-r4
title: الكامل، الوحدة 4 · PDF ص 16
question: التكامل غير المحدود
reference: الكامل، الوحدة 4، PDF ص 16
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mo stretchy="true">(</mo><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mi mathvariant="normal">أ</mi><msup><mtext dir="rtl">هـ</mtext><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></msup><mo>−</mo><mn dir="ltr">٦</mn></mrow></mrow></math>\` و\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mn dir="ltr">١</mn><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٦</mn><mtext dir="rtl">هـ</mtext></mrow></mrow></math>\`، فما قيمة الثابت أ؟
solution:
٣
:::

:::exam-question
id: math-kamel-u4-p016-r6-a
title: الكامل، الوحدة 4 · PDF ص 16
question: التكامل غير المحدود
reference: الكامل، الوحدة 4، PDF ص 16
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">س</mi><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، وق(١) = ٢ وقَ(١/٢) = ٦، فجد الثابت أ.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`
:::

:::exam-question
id: math-kamel-u4-p016-r6-b
title: الكامل، الوحدة 4 · PDF ص 16
question: التكامل غير المحدود
reference: الكامل، الوحدة 4، PDF ص 16
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">س</mi><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، وق(١) = ٢ وقَ(١/٢) = ٦، فجد الثابت ب.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></mrow></math>\`
:::

:::exam-question
id: math-kamel-u4-p016-r7
title: الكامل، الوحدة 4 · PDF ص 16
question: التكامل غير المحدود
reference: الكامل، الوحدة 4، PDF ص 16
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>∫</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mrow><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><msup><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٣</mn></mrow></mrow></math>\`، فما قيمة ق(π/٤) − قَ(π/٤)؟
solution:
−٣
:::

:::exam-question
id: math-kamel-u4-p017-r1
title: الكامل، الوحدة 4 · PDF ص 17
question: التكامل غير المحدود
reference: الكامل، الوحدة 4، PDF ص 17
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان م(س)، هـ(س) اقترانين أصليين مختلفين للاقتران المتصل ق(س)، وق(١) = ٤، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><msup><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup></mrow><mo>=</mo><mrow><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></mrow></math>\`، جد قاعدة ق(س).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\`
:::
`;

export default defineMarkdownLesson({
  "status": "published",
  "language": "ar",
  "title": "التكامل غير المحدود",
  "summary": "أسئلة من الكتاب والكامل بإجابات موثقة من المصادر.",
  "outcome": "مراجعة التكامل غير المحدود من الأسئلة الأصلية.",
  "mode": "أسئلة وبطاقات",
  "duration": "56 أسئلة",
  "level": "الثاني عشر · العلمي",
  "reward": 10
}, lessonSource);
