import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const lessonSource = `
:::exam-question
id: math-book-p041-ex1
title: الكتاب، ص 39 · مثال ١
question: القيم القصوى
reference: الكتاب، ص 39، مثال ١
answer-label: الحل المطبوع في الكتاب
body:
يمثل الشكل المجاور منحنى الاقتران ق(س) في الفترة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`، اعتمد عليه في إيجاد القيم القصوى المحلية والمطلقة (إن وجدت). ثم جد قيمة المشتقة الأولى عند كل قيمة منها (إن وجدت).

![منحنى ق(س) في الفترة [−٢، ٢]](assets/lessons/mathematics/source-crops/u23-book-p041-ex1-diagram.webp)
solution:
توجد قيمة صغرى محلية عندما س = −٢، وهي ق(−٢). أما ق(−١) فهي قيمة عظمى محلية ومطلقة، وقَ(−١) = ٠. وأما ق(٢) فهي قيمة صغرى محلية ومطلقة. قَ(−٢) وقَ(٢) غير موجودتين.
:::

:::exam-question
id: math-book-p046-ex8
title: الكتاب، ص 44 · مثال ٨
question: القيم القصوى
reference: الكتاب، ص 44، مثال ٨
answer-label: الحل المطبوع في الكتاب
body:
جد أكبر قيمة وأصغر قيمة للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><msqrt><mrow><mn dir="ltr">٤</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></mrow></math>\`.
solution:
أكبر قيمة = ٢، وأصغر قيمة = −٢.
:::

:::mcq
id: math-kamel-u2-p004-r2
title: الكامل، الوحدة 2 · PDF ص 4 · row-2
kicker: الكامل، الوحدة 2 · PDF ص 4 · row-2
reference: الكامل، الوحدة 2 · PDF ص 4، row-2
question: إذا كان ق(س) اقترانًا كثير حدود من الدرجة الرابعة، فما أكبر عدد ممكن من النقاط الحرجة للاقتران ق(س)؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٥</mn></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p004-r4
title: الكامل، الوحدة 2 · PDF ص 4 · row-4
kicker: الكامل، الوحدة 2 · PDF ص 4 · row-4
reference: الكامل، الوحدة 2 · PDF ص 4، row-4
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\`، فما قيم س التي يكون عندها للاقتران ق(س) نقاط حرجة؟
- [ ] option-1 | −١
- [x] option-2 | −٤، ٠
- [ ] option-3 | −٤، −٢
- [ ] option-4 | −٤، −٢، ٠
explanation: الإجابة النهائية: −٤، ٠.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p004-r5
title: الكامل، الوحدة 2 · PDF ص 4 · row-5
kicker: الكامل، الوحدة 2 · PDF ص 4 · row-5
reference: الكامل، الوحدة 2 · PDF ص 4، row-5
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣٢</mn><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، فما عدد القيم الحرجة للاقتران ق(س) على مجاله؟
- [ ] option-1 | صفر
- [x] option-2 | ١
- [ ] option-3 | ٢
- [ ] option-4 | ٣
explanation: الإجابة النهائية: ١.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p005-r2
title: الكامل، الوحدة 2 · PDF ص 5 · row-2
kicker: الكامل، الوحدة 2 · PDF ص 5 · row-2
reference: الكامل، الوحدة 2 · PDF ص 5، row-2
question: ما عدد النقاط الحرجة للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><msqrt><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></msqrt></mrow></mrow></math>\` المعرف على مجاله؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٠</mn></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p006-r6
title: الكامل، الوحدة 2 · PDF ص 6 · row-6
kicker: الكامل، الوحدة 2 · PDF ص 6 · row-6
reference: الكامل، الوحدة 2 · PDF ص 6، row-6
question: إذا كان ق(س) كثير حدود من الدرجة الثالثة معرفًا على [أ، ب]، فما أكبر عدد من النقاط الحرجة يمكن أن نحصل عليها من الاقتران ق(س)؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p015-r1
title: الكامل، الوحدة 2 · PDF ص 15 · row-1
kicker: الكامل، الوحدة 2 · PDF ص 15 · row-1
reference: الكامل، الوحدة 2 · PDF ص 15، row-1
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٩</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فما قيمة س التي يكون عندها للاقتران ق(س) قيمة عظمى مطلقة؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [x] option-2 | صفر
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٣</mn></math>\`
explanation: الإجابة النهائية: صفر.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p015-r3
title: الكامل، الوحدة 2 · PDF ص 15 · row-3
kicker: الكامل، الوحدة 2 · PDF ص 15 · row-3
reference: الكامل، الوحدة 2 · PDF ص 15، row-3
question: إذا كان قَ(س) متناقصًا على ح ويقطع محور السينات عندما س = ١، فما العبارة الصحيحة فيما يلي؟
- [ ] option-1 | ق(١) صغرى محلية
- [x] option-2 | ق(١) عظمى محلية
- [ ] option-3 | قَ(١) صغرى محلية
- [ ] option-4 | قَ(١) عظمى محلية
explanation: الإجابة النهائية: ق(١) عظمى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-kamel-u2-p021-r2
title: الكامل، الوحدة 2 · PDF ص 21 · row-2
question: القيم القصوى
reference: الكامل، الوحدة 2 · PDF ص 21، row-2
answer-label: الإجابة المطبوعة في الكامل
body:
جد أكبر وأصغر قيمة للاقتـران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>+</mo><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، س ∈ [٠، π].
solution:
أكبر قيمة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٥</mn><mn dir="ltr">٤</mn></mfrac></math>\` عند س = π/٣؛ وأصغر قيمة −١ عند س = π.
:::

:::exam-question
id: math-kamel-u2-p021-r3
title: الكامل، الوحدة 2 · PDF ص 21 · row-3
question: القيم القصوى
reference: الكامل، الوحدة 2 · PDF ص 21، row-3
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٣</mn></msup></mrow></mrow></math>\`، س ∈ [−٢، ٣]، فجد فترات التزايد والتناقص، والقيم القصوى المحلية مبينًا نوعها.
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`. صغرى محلية −١٢٨ عند س = −٢، عظمى محلية \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٢٧</mn><mn dir="ltr">١٦</mn></mfrac></math>\` عند س = ١/٢، وصغرى محلية −٣ عند س = ٣.
:::

:::exam-question
id: math-kamel-u2-p021-r4
title: الكامل، الوحدة 2 · PDF ص 21 · row-4
question: القيم القصوى
reference: الكامل، الوحدة 2 · PDF ص 21، row-4
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">أ</mi><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mrow></math>\` وله قيمة عظمى محلية عند س = ٢، وقيمة صغرى محلية عند س = م² = ن، فأوجد قيمة الثابت أ > ٠.
solution:
أ = ٢.
:::

:::exam-question
id: math-kamel-u2-p021-r5
title: الكامل، الوحدة 2 · PDF ص 21 · row-5
question: القيم القصوى
reference: الكامل، الوحدة 2 · PDF ص 21، row-5
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mroot><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi><mi mathvariant="normal">س</mi><mo>−</mo><mi mathvariant="normal">ب</mi></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup><mn dir="ltr">٣</mn></mroot><mo>+</mo><mn dir="ltr">٥</mn><mi mathvariant="normal">ب</mi></mrow></mrow></math>\`، أ ≠ ٠، قيمة قصوى محلية عند النقطة (٤، ١٠)، جد قيمة الثابتين أ، ب.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`.
:::

:::exam-question
id: math-kamel-u2-p021-r6
title: الكامل، الوحدة 2 · PDF ص 21 · row-6
question: القيم القصوى
reference: الكامل، الوحدة 2 · PDF ص 21، row-6
answer-label: مفتاح مطبوع متعارض مع القراءة الحالية؛ قيد المراجعة
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٦</mn><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">١٥</mn><msup><mi mathvariant="normal">أ</mi><mn dir="ltr">٢</mn></msup><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، أ > ٠، له عظمى محلية عند س = م وصغرى محلية عند س = ن، وكان هـ(م) + ١١هـ(ن) = ٩٦، فجد أ.
solution:
أ = ٢.
:::

:::exam-question
id: math-book-p042-ex2
title: الكتاب، ص 40 · ex2
question: القيم القصوى
reference: الكتاب، ص 40، ex2
answer-label: الحل المطبوع في الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\`، س ∈ [٠، ٣[، جد القيم القصوى المحلية للاقتران ق(س).

![الرسم الأصلي للاقتران الثابت على الفترة المعطاة](assets/lessons/mathematics/source-crops/math-book-p042-ex2-figure.webp)
solution:
عند كل س في [٠، ٣[ توجد قيمة عظمى محلية وقيمة صغرى محلية، وكلتاهما ٤.
:::

:::exam-question
id: math-book-p042-discuss
title: الكتاب، ص 40 · discuss
question: القيم القصوى
reference: الكتاب، ص 40، discuss
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ما صحة القول إن القيمة العظمى المحلية للاقتران دائمًا أكبر من القيمة الصغرى المحلية له؟
solution:
القول غير صحيح؛ قد تتساويان كما في الاقتران الثابت.
:::

:::exam-question
id: math-book-p042-ex3
title: الكتاب، ص 40 · ex3
question: القيم القصوى
reference: الكتاب، ص 40، ex3
answer-label: الحل المطبوع في الكتاب
body:
عين جميع النقط الحرجة للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">{</mo><mtable><mtr><mtd><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn></mrow></mtd><mtd><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr><mtr><mtd><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow></mtd><mtd><mrow><mn dir="ltr">٢</mn><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\` في ]−١، ٣].
solution:
النقط الحرجة هي \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p043-ex4
title: الكتاب، ص 41 · ex4
question: القيم القصوى
reference: الكتاب، ص 41، ex4
answer-label: الحل المطبوع في الكتاب
body:
جد القيم القصوى المحلية للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٥</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\`.
solution:
عظمى محلية عند س = −٥/٣ وقيمتها \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٤٠</mn><mn dir="ltr">٢٧</mn></mfrac></math>\`. صغرى محلية عند س = ١ وقيمتها −٨.
:::

:::exam-question
id: math-book-p043-discuss
title: الكتاب، ص 41 · discuss
question: القيم القصوى
reference: الكتاب، ص 41، discuss
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
هل يأخذ الاقتران ق(س) = س³ + س² − ٥س − ٥ قيمًا قصوى مطلقة؟ إن وجدت حددها.
solution:
لا توجد قيم قصوى مطلقة؛ الاقتران غير محدود من أعلى ولا من أسفل.
:::

:::exam-question
id: math-book-p044-ex5
title: الكتاب، ص 42 · ex5
question: القيم القصوى
reference: الكتاب، ص 42، ex5
answer-label: الحل المطبوع في الكتاب
body:
جد القيم القصوى المحلية للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٨</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mroot><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></mroot></mrow></mrow></math>\`.
solution:
قيمة عظمى محلية عند س = ٢ وقيمتها \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn><mroot><mn dir="ltr">٢</mn><mn dir="ltr">٣</mn></mroot></mrow></math>\`؛ لا توجد صغرى محلية.
:::

:::exam-question
id: math-book-p044-discuss
title: الكتاب، ص 42 · discuss
question: القيم القصوى
reference: الكتاب، ص 42، discuss
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
هل توجد قيم قصوى للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٨</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mroot><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></mroot></mrow></mrow></math>\` عند س = ٠؟ ولماذا؟
solution:
لا؛ لأن إشارة المشتقة موجبة على جانبي الصفر، فلا يتغير اتجاه الاقتران.
:::

:::exam-question
id: math-book-p044-ex6
title: الكتاب، ص 42 · ex6
question: القيم القصوى
reference: الكتاب، ص 42، ex6
answer-label: الحل المطبوع في الكتاب
body:
جد القيم القصوى المحلية للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٣</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، س ≠ ١.
solution:
عظمى محلية عند س = −١ وقيمتها −٢؛ صغرى محلية عند س = ٣ وقيمتها ٦.
:::

:::exam-question
id: math-book-p045-ex7-a
title: الكتاب، ص 43 · ex7-a
question: القيم القصوى
reference: الكتاب، ص 43، ex7-a
answer-label: الحل المطبوع في الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">{</mo><mtable><mtr><mtd><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mtd><mtd><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>≤</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr><mtr><mtd><mn dir="ltr">٤</mn></mtd><mtd><mrow><mn dir="ltr">٢</mn><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، جد مجموعة قيم س للنقط الحرجة للاقتران ق(س).
solution:
المجموعة هي \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">{</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">}</mo></mrow><mo>∪</mo><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">[</mo></mrow></mrow></math>\`.
:::

:::exam-question
id: math-book-p045-ex7-b
title: الكتاب، ص 43 · ex7-b
question: القيم القصوى
reference: الكتاب، ص 43، ex7-b
answer-label: الحل المطبوع في الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">{</mo><mtable><mtr><mtd><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mtd><mtd><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>≤</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr><mtr><mtd><mn dir="ltr">٤</mn></mtd><mtd><mrow><mn dir="ltr">٢</mn><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، حدد الإحداثيات السينية للقيم القصوى المحلية للاقتران ق(س).
solution:
عند س = −١ عظمى محلية؛ عند س = ٠ صغرى محلية؛ عند س = ٢ عظمى محلية؛ وعند كل س ∈ ]٢، ٣[ توجد عظمى محلية وصغرى محلية معًا.
:::

:::exam-question
id: math-book-p047-exercise-1-a
title: الكتاب، ص 45 · exercise-1-a
question: القيم القصوى
reference: الكتاب، ص 45، exercise-1-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد النقط الحرجة للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٣</mn></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٣</mn></mfrac></mrow></mrow></math>\`، س ∈ [−٢، ٣].
solution:
النقط: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mtext dir="rtl">−١٩/٣</mtext></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mtext dir="rtl">١/٣</mtext></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mtext dir="rtl">١/٣</mtext></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p047-exercise-1-b
title: الكتاب، ص 45 · exercise-1-b
question: القيم القصوى
reference: الكتاب، ص 45، exercise-1-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد النقط الحرجة للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mfrac><mn dir="ltr">٢</mn><mn dir="ltr">٣</mn></mfrac></msup></mrow></math>\`، س ∈ [−٨، ٨].
solution:
النقط: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٨</mn></mrow><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٨</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p047-exercise-2-a
title: الكتاب، ص 45 · exercise-2-a
question: القيم القصوى
reference: الكتاب، ص 45، exercise-2-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد القيم العظمى والصغرى المحلية، إن وجدت، للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢٤</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، س ∈ ح.
solution:
عظمى محلية عند س = −٤ وقيمتها −١٦؛ صغرى محلية عند س = −٢ وقيمتها −٢٠.
:::

:::exam-question
id: math-book-p047-exercise-2-b
title: الكتاب، ص 45 · exercise-2-b
question: القيم القصوى
reference: الكتاب، ص 45، exercise-2-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد القيم العظمى والصغرى المحلية، إن وجدت، للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٤</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\`.
solution:
عظمى محلية ومطلقة عند س = ٠ وقيمتها ٢؛ صغرى محلية ومطلقة عند س = ±٢ وقيمتها صفر.
:::

:::exam-question
id: math-book-p047-exercise-2-c
title: الكتاب، ص 45 · exercise-2-c
question: القيم القصوى
reference: الكتاب، ص 45، exercise-2-c
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد القيم العظمى والصغرى المحلية، إن وجدت، للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mtext dir="rtl">هـ</mtext><mrow><mo>−</mo><mi mathvariant="normal">س</mi></mrow></msup></mrow></mrow></math>\`، س ∈ ح.
solution:
صغرى محلية عند س = −١ وقيمتها \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mtext dir="rtl">هـ</mtext></mrow></math>\`. عظمى محلية عند س = ٣ وقيمتها \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٦</mn><msup><mtext dir="rtl">هـ</mtext><mn dir="ltr">٣</mn></msup></mfrac></math>\`.
:::

:::exam-question
id: math-book-p047-exercise-2-d
title: الكتاب، ص 45 · exercise-2-d
question: القيم القصوى
reference: الكتاب، ص 45، exercise-2-d
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد القيم العظمى والصغرى المحلية، إن وجدت، للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٢</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، س ≠ ١.
solution:
لا توجد قيم قصوى محلية؛ المشتقة موجبة على فترتي المجال.
:::

:::exam-question
id: math-book-p047-exercise-3-a
title: الكتاب، ص 45 · exercise-3-a
question: القيم القصوى
reference: الكتاب، ص 45، exercise-3-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد أكبر وأصغر قيمة، إن وجدت، للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">{</mo><mtable><mtr><mtd><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mtd><mtd><mrow><mn dir="ltr">٠</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr><mtr><mtd><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٤</mn></mrow></mtd><mtd><mrow><mn dir="ltr">٢</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، س ∈ [٠، ٣].
solution:
أصغر قيمة صفر عند س = ٠؛ أكبر قيمة ١٣ عند س = ٣.
:::

:::exam-question
id: math-book-p047-exercise-3-b
title: الكتاب، ص 45 · exercise-3-b
question: القيم القصوى
reference: الكتاب، ص 45، exercise-3-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد أكبر وأصغر قيمة، إن وجدت، للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup><mo>−</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mo>−</mo><mi mathvariant="normal">س</mi></mrow></msup></mrow></mrow></math>\`، س ∈ [٠، ٣].
solution:
أصغر قيمة صفر عند س = ٠؛ أكبر قيمة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msup><mtext dir="rtl">هـ</mtext><mn dir="ltr">٣</mn></msup><mo>−</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></msup></mrow></math>\` عند س = ٣.
:::

:::exam-question
id: math-book-p047-exercise-3-c
title: الكتاب، ص 45 · exercise-3-c
question: القيم القصوى
reference: الكتاب، ص 45، exercise-3-c
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد أكبر وأصغر قيمة، إن وجدت، للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٣</mn></mfrac><msup><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٣</mn></msup></mrow></mrow></math>\`، س ∈ [π/٢، ٣π/٢].
solution:
أكبر قيمة صفر عند طرفي الفترة؛ أصغر قيمة −٢/٣ عند س = π.
:::

:::exam-question
id: math-book-p051-ex6-b
title: الكتاب، ص 49 · ex6-b
question: القيم القصوى
reference: الكتاب، ص 49، ex6-b
answer-label: الحل المطبوع في الكتاب
body:
الشكل المجاور يمثل منحنى قَ(س). اعتمادًا عليه، جد القيم القصوى المحلية للاقتران ق(س).

![منحنى المشتقة الأولى قَ(س) وعليه القيم −٣، −١، ١، ٣](assets/lessons/mathematics/source-crops/u2-book-p051-ex6.webp)
solution:
ق(−٣) صغرى محلية؛ ق(٠) عظمى محلية؛ ق(٣) صغرى محلية.
:::

:::exam-question
id: math-book-p052-ex7
title: الكتاب، ص 50 · ex7
question: القيم القصوى
reference: الكتاب، ص 50، ex7
answer-label: الحل المطبوع في الكتاب
body:
جد القيم العظمى والصغرى المحلية للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>−</mo><mn dir="ltr">٨</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></mrow></math>\` باستخدام اختبار المشتقة الثانية إن أمكن.
solution:
قيمة صغرى محلية عند س = ٠ وقيمتها صفر، لأن قً(٠) = ١٢ > ٠. عند س = ١ يفشل اختبار المشتقة الثانية، وباختبار المشتقة الأولى لا توجد قيمة قصوى هناك.
:::

:::exam-question
id: math-book-p053-exercise-3
title: الكتاب، ص 51 · exercise-3
question: القيم القصوى
reference: الكتاب، ص 51، exercise-3
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
جد القيم القصوى المحلية للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></mrow></math>\` وحدد نوعها باستخدام اختبار المشتقة الثانية إن أمكن؛ وإذا تعذر ذلك فاختبار المشتقة الأولى.
solution:
قيمة صغرى محلية عند س = ٠ وقيمتها صفر، لأن قً(٠) = ٤ > ٠. لا توجد عظمى محلية.
:::

:::exam-question
id: math-book-p053-exercise-5-b
title: الكتاب، ص 51 · exercise-5-b
question: القيم القصوى
reference: الكتاب، ص 51، exercise-5-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ق(س) اقتران متصل في [−٣، ٢]، ق(٠) = ٠، قَ(١) = ٠، قَ(−٢) = ٠، وقً(س) > ٠ عندما س < ٠، وقً(س) < ٠ عندما س > ٠. ما قيم س التي يكون لمنحنى ق(س) عندها قيم قصوى؟ وما نوع كل منها؟
solution:
عند س = −٣ عظمى محلية؛ عند س = −٢ صغرى محلية؛ عند س = ١ عظمى محلية؛ عند س = ٢ صغرى محلية.
:::

:::exam-question
id: math-book-p057-worksheet-2
title: الكتاب، ص 55 · worksheet-2
question: القيم القصوى
reference: الكتاب، ص 55، worksheet-2
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mrow></math>\`، أ، ب ∈ ح، له قيمة عظمى محلية عند س = ١، وصغرى محلية عند س = ٣، فما قيمة أ، ب؟
solution:
أ = ١، ب = −٦.
:::

:::exam-question
id: math-book-p057-worksheet-3-b
title: الكتاب، ص 55 · worksheet-3-b
question: القيم القصوى
reference: الكتاب، ص 55، worksheet-3-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
الشكل المجاور يمثل منحنى قً(س)، وعلمت أن قَ(٠) = قَ(٦) = ٠. جد القيم القصوى المحلية للاقتران ق(س).

![منحنى المشتقة الثانية قً(س) خط مستقيم يقطع محور السينات عند ٢](assets/lessons/mathematics/source-crops/u2-book-p057-worksheet3.webp)
solution:
ق(٠) عظمى محلية؛ ق(٦) صغرى محلية.
:::

:::mcq
id: math-book-p080-test-1
title: الكتاب، ص 78 · test-1
kicker: الكتاب، ص 78 · test-1
reference: الكتاب، ص 78، test-1
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">{</mo><mtable><mtr><mtd><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mi mathvariant="normal">س</mi></mrow></mtd><mtd><mrow><mn dir="ltr">٠</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">١</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></mtd><mtd><mrow><mn dir="ltr">١</mn><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، فما مجموعة قيم س التي عندها للاقتران نقطة حرجة في [٠، ٣]؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-book-p080-test-5
title: الكتاب، ص 78 · test-5
kicker: الكتاب، ص 78 · test-5
reference: الكتاب، ص 78، test-5
question: إذا كان ق(س) كثير حدود من الدرجة الثالثة معرفًا على [أ، ب]، فما أكبر عدد من النقط الحرجة التي يمكن أن نحصل عليها للاقتران ق(س)؟
- [ ] option-1 | ١
- [ ] option-2 | ٢
- [ ] option-3 | ٣
- [x] option-4 | ٤
explanation: الإجابة النهائية: ٤.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-book-p082-test-7-a
title: الكتاب، ص 80 · test-7-a
question: القيم القصوى
reference: الكتاب، ص 80، test-7-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\` معرفًا في [−٢، ٦[. جد القيم القصوى المحلية للاقتران ق(س).
solution:
عظمى محلية ١٠ عند س = −١؛ صغرى محلية −٢٢ عند س = ٣؛ وعند الطرف س = −٢ صغرى محلية ٣.
:::

:::mcq
id: math-kamel-u2-p003-r1
title: الكامل، الوحدة 2 · PDF ص 3 · البند 1
kicker: الكامل، الوحدة 2 · PDF ص 3 · البند 1
reference: الكامل، الوحدة 2 · PDF ص 3 · البند 1
question: إذا كان ق(س) اقترانًا معرفًا على [٠، ٣]، وكانت \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`، فإن مجموعة جميع قيم س التي يوجد عند كل منها قيمة حرجة للاقتران ق(س) هي:
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p003-r2
title: الكامل، الوحدة 2 · PDF ص 3 · البند 2
kicker: الكامل، الوحدة 2 · PDF ص 3 · البند 2
reference: الكامل، الوحدة 2 · PDF ص 3 · البند 2
question: إذا كان ق(س) معرفًا على [٠، ٤]، وكانت \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، فإن مجموعة الإحداثيات السينية للنقاط الحرجة هي:
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow><mo stretchy="true">}</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">}</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p004-r7
title: الكامل، الوحدة 2 · PDF ص 4 · البند 7
kicker: الكامل، الوحدة 2 · PDF ص 4 · البند 7
reference: الكامل، الوحدة 2 · PDF ص 4 · البند 7
question: إذا كان الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></mrow></mrow></math>\`، فما قيمة أو قيم س الحرجة لمنحنى قَ(س)؟
- [x] option-1 | −٢
- [ ] option-2 | −١
- [ ] option-3 | ٠، −١
- [ ] option-4 | ٠، −٢
explanation: الإجابة النهائية: −٢.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p005-r3
title: الكامل، الوحدة 2 · PDF ص 5 · البند 3
kicker: الكامل، الوحدة 2 · PDF ص 5 · البند 3
reference: الكامل، الوحدة 2 · PDF ص 5 · البند 3
question: إذا كان الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\`، فإن قيمة أو قيم س التي يكون عندها للاقتران ق(س) نقط حرجة هي:
- [ ] option-1 | −٢
- [x] option-2 | ٠، −٤
- [ ] option-3 | −٢، −٤
- [ ] option-4 | ٠، −٢، −٤
explanation: الإجابة النهائية: ٠، −٤.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p005-r5
title: الكامل، الوحدة 2 · PDF ص 5 · البند 5
kicker: الكامل، الوحدة 2 · PDF ص 5 · البند 5
reference: الكامل، الوحدة 2 · PDF ص 5 · البند 5
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mn dir="ltr">١</mn><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\` معرفًا في الفترة ]١، ٣]، فما عدد النقاط الحرجة للاقتران ق(س)؟
- [x] option-1 | نقطة واحدة
- [ ] option-2 | نقطتان
- [ ] option-3 | ثلاث نقاط
- [ ] option-4 | أربع نقاط
explanation: الإجابة النهائية: نقطة واحدة.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p005-r6
title: الكامل، الوحدة 2 · PDF ص 5 · البند 6
kicker: الكامل، الوحدة 2 · PDF ص 5 · البند 6
reference: الكامل، الوحدة 2 · PDF ص 5 · البند 6
question: ما مجموعة قيم س للنقاط الحرجة للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo>−</mo><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، س ∈ [٠، π/٢]؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٦</mn></mfrac><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٥</mn><mi>π</mi></mrow><mn dir="ltr">٦</mn></mfrac></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٦</mn></mfrac></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">}</mo></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٦</mn></mfrac><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">}</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٦</mn></mfrac><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">}</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p006-r2
title: الكامل، الوحدة 2 · PDF ص 6 · البند 2
kicker: الكامل، الوحدة 2 · PDF ص 6 · البند 2
reference: الكامل، الوحدة 2 · PDF ص 6 · البند 2
question: ما عدد النقط الحرجة للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">|</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">|</mo></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`؟
- [ ] option-1 | صفر
- [x] option-2 | ١
- [ ] option-3 | ٢
- [ ] option-4 | ٣
explanation: الإجابة النهائية: ١.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p006-r3
title: الكامل، الوحدة 2 · PDF ص 6 · البند 3
kicker: الكامل، الوحدة 2 · PDF ص 6 · البند 3
reference: الكامل، الوحدة 2 · PDF ص 6 · البند 3
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">أ</mi><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">ب</mi></mrow><mrow><mi mathvariant="normal">ج</mi><mi mathvariant="normal">س</mi><mo>+</mo><mi mathvariant="normal">د</mi></mrow></mfrac></mrow></math>\`، وكان أ د − ب ج ≠ ٠، فما عدد النقط الحرجة للاقتران ق(س)؟
- [x] option-1 | صفر
- [ ] option-2 | ١
- [ ] option-3 | ٢
- [ ] option-4 | ٣
explanation: الإجابة النهائية: صفر.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p006-r4
title: الكامل، الوحدة 2 · PDF ص 6 · البند 4
kicker: الكامل، الوحدة 2 · PDF ص 6 · البند 4
reference: الكامل، الوحدة 2 · PDF ص 6 · البند 4
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">[</mo><mi mathvariant="normal">س</mi><mo stretchy="true">]</mo></mrow><mo>−</mo><mrow><mo stretchy="true">[</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></mrow></math>\`، س ∈ [−١، ١]، فما قيمة أو قيم س التي يكون عندها نقاط حرجة؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | ٢
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p006-r5
title: الكامل، الوحدة 2 · PDF ص 6 · البند 5
kicker: الكامل، الوحدة 2 · PDF ص 6 · البند 5
reference: الكامل، الوحدة 2 · PDF ص 6 · البند 5
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٣</mn></msup><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٤</mn></msup></mrow></mrow></math>\`، وكان ق(س) اقترانًا متصلًا على الفترة [٠، ٣[، فما عدد النقاط الحرجة للاقتران ق(س)؟
- [x] option-1 | ٣
- [ ] option-2 | ٢
- [ ] option-3 | ٤
- [ ] option-4 | ٥
explanation: الإجابة النهائية: ٣.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-kamel-u2-p007-r7
title: الكامل، الوحدة 2 · PDF ص 7 · البند 7
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 7 · البند 7
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><mi mathvariant="normal">س</mi></mrow></mrow></math>\` وكان له نقطة حرجة واحدة فقط عند س = ١، فما قيم الثابتين أ، ب؟
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></mrow></math>\`.
:::

:::mcq
id: math-kamel-u2-p011-r1
title: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ١ · ٢٠٠٧
kicker: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ١ · ٢٠٠٧
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r1-key.webp)
question: للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٥</mn><mo>−</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` قيمة عظمى في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\` عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo></mrow></math>\`
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [x] option-4 | صفر
explanation: الإجابة حسب مفتاح الكامل: صفر.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p011-r2
title: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٢ · ٢٠٠٨ إكمال
kicker: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٢ · ٢٠٠٨ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r2-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mi mathvariant="normal">ج</mi></mrow></math>\`، فإن إحدى العبارات التالية صحيحة دائماً:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ج</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ج</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ج</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ج</mi><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ج</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة حرجة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ج</mi><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ج</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطة حرجة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p011-r3
title: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٣ · ٢٠٠٩
kicker: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٣ · ٢٠٠٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r3-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متصلاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\` لجميع قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`، فإن إحدى العبارات التالية صحيحة دائماً:
- [ ] option-1 | لا يوجد للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` نقطة انعطاف في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`
- [x] option-2 | للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٥</mn></mrow></math>\`
- [ ] option-3 | الاقتران مقعر للأعلى على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٥</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p011-r4
title: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٤ · ٢٠٠٩ إكمال
kicker: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٤ · ٢٠٠٩ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` وكان لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` قيمة قصوى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، فإن قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo></mrow></math>\`
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p011-r5
title: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٥ · ٢٠١٢
kicker: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٥ · ٢٠١٢
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r5-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></mfrac></mrow></math>\`، فإن عدد النقط الحرجة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يساوي:
- [ ] option-1 | صفر
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p011-r6
title: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٦ · ٢٠١٣
kicker: الكامل، الوحدة الثانية · WebP ١١ · ص ١٠ · البند ٦ · ٢٠١٣
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p011-r6-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`، فإن جميع قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي تكون عندها نقط حرجة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`. القوسان المربعان في تعريف الاقتران هما رمز الجزء الصحيح كما في المصدر.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p012-r1
title: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ١ · ٢٠١٦ إكمال
kicker: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ١ · ٢٠١٦ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r1-key.webp)
question: ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٤</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`، فإن قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون عندها للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى مطلقة هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-2 | صفر
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: صفر.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p012-r2
title: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٢ · ٢٠١٦ إكمال
kicker: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٢ · ٢٠١٦ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r2-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mtable><mtr><mtd><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mi mathvariant="normal">س</mi></mrow></mtd><mtd><mrow><mn dir="ltr">٠</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">١</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></mtd><mtd><mrow><mn dir="ltr">١</mn><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، فإن مجموعة قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون عندها للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطاً حرجة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\` هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">١</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo>}</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo>}</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p012-r3
title: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٣ · ٢٠١٦
kicker: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٣ · ٢٠١٦
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r3-key.webp)
question: إن مجموعة قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msqrt><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi></mrow></msqrt></mrow></math>\` نقطاً حرجة هي:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١٢</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٦</mn><mo>،</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١٢</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٦</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">١٢</mn><mo>،</mo><mn dir="ltr">٦</mn></mrow><mo>}</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١٢</mn></mrow><mo>}</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p012-r4
title: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٤ · ٢٠١٧
kicker: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٤ · ٢٠١٧
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r4-key.webp)
question: ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msqrt><mrow><mn dir="ltr">٦</mn><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></msqrt></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، فإن القيمة الصغرى المطلقة:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p012-r5
title: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٥ · ٢٠١٧
kicker: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٥ · ٢٠١٧
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r5-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mtable><mtr><mtd><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></mtd><mtd><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">١</mn></mrow></mtd></mtr><mtr><mtd><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mtd><mtd><mrow><mn dir="ltr">١</mn><mo>&lt;</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، فإن عدد النقط الحرجة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p012-r6
title: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٦ · ٢٠١٧ دور ثانٍ
kicker: الكامل، الوحدة الثانية · WebP ١٢ · ص ١١ · البند ٦ · ٢٠١٧ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p012-r6-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، فإن مجموعة الإحداثيات السينية للنقاط الحرجة هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٢</mn></mrow><mo>}</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo>}</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p013-r1
title: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ١ · ٢٠١٧ دور ثانٍ
kicker: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ١ · ٢٠١٧ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r1-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">س</mi></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن العبارة الصحيحة فيما يأتي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي القيمة العظمى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي القيمة الصغرى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` هي القيمة الصغرى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p013-r2
title: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٢ · ٢٠١٨
kicker: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٢ · ٢٠١٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، فإن مجموعة قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون عندها للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقطاً حرجة هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p013-r3
title: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٣ · ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٣ · ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً معرفاً في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><munder><mtext dir="rtl">نها</mtext><mrow><mi mathvariant="normal">س</mi><mo>←</mo><msup><mn dir="ltr">١</mn><mrow><mo>−</mo></mrow></msup></mrow></munder><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، فما العبارة الصحيحة فيما يأتي؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى مطلقة
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p013-r4
title: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٤ · ٢٠٢٠
kicker: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٤ · ٢٠٢٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r4-key.webp)
question: ما قيمة / قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون عندها للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
example:
![المنحنى الأصلي للمشتقة مع محوري الإحداثيات وتدريجات محور السينات](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r4-figure.webp)

:::

:::mcq
id: math-kamel-u2-p013-r5
title: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٥ · ٢٠٢٠ دور ثانٍ
kicker: الكامل، الوحدة الثانية · WebP ١٣ · ص ١٢ · البند ٥ · ٢٠٢٠ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p013-r5-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mtable><mtr><mtd><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mtd><mtd><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr><mtr><mtd><mrow><mn dir="ltr">٨</mn></mrow></mtd><mtd><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٣</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، فما القيمة العظمى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` إن وجدت؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٨</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٠</mn></mrow></math>\`
- [x] option-4 | لا يوجد للاقتران قيمة قصوى مطلقة
explanation: الإجابة حسب مفتاح الكامل: لا يوجد للاقتران قيمة قصوى مطلقة.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p014-r1
title: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ١ · ٢٠٢٠ دور ثانٍ
kicker: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ١ · ٢٠٢٠ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r1-key.webp)
question: ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقترانين سالبين وقابلين للاشتقاق ومتناقصين على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mo>∘</mo><mtext dir="rtl">هـ</mtext></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، فأي العبارات التالية صحيحة على الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">لَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>≥</mo><mn dir="ltr">٠</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتران ثابت
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p014-r2
title: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٢ · ٢٠٢٠ دور ثانٍ
kicker: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٢ · ٢٠٢٠ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r2-key.webp)
question: ليكن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup></mrow></math>\`، فإن لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة:
- [ ] option-1 | عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [x] option-2 | صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p014-r3
title: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٣ · ٢٠٢٠ دور ثالث
kicker: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٣ · ٢٠٢٠ دور ثالث
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r3-key.webp)
question: إذا كان لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` قيمة صغرى محلية عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p014-r4
title: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٤ · ٢٠٢١ دور ثانٍ
kicker: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٤ · ٢٠٢١ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></mrow></math>\`، فماذا يكون للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [x] option-4 | قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p014-r5
title: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٥ · ٢٠٢٢
kicker: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٥ · ٢٠٢٢
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r5-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mo>−</mo><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi></mrow></msup></mrow></math>\` معرفاً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\`، فما القيمة الصغرى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mtext dir="rtl">هـ</mtext></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mtext dir="rtl">هـ</mtext></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mtext dir="rtl">هـ</mtext></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p014-r6
title: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٦ · ٢٠٢٣
kicker: الكامل، الوحدة الثانية · WebP ١٤ · ص ١٣ · البند ٦ · ٢٠٢٣
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p014-r6-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢٧</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`، ما القيمة العظمى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣٤</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`
- [ ] option-3 | صفر
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣٤</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p015-r2
title: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٢ · ٢٠٢٤ دور أول
kicker: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٢ · ٢٠٢٤ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٣</mn></msup><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٤</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١٠</mn><mo stretchy="true">]</mo></mrow></math>\`، فما مجموعة قيم \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi></mrow></math>\` التي يكون عندها للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` نقط حرجة؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠,٥</mn><mo>،</mo><mn dir="ltr">٢,٥</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠,٥</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٢,٥</mn><mo>،</mo><mn dir="ltr">١٠</mn></mrow><mo>}</mo></mrow></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠,٥</mn><mo>،</mo><mn dir="ltr">٢,٥</mn><mo>،</mo><mn dir="ltr">١٠</mn></mrow><mo>}</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mn dir="ltr">٠,٥</mn><mo>،</mo><mn dir="ltr">٢,٥</mn><mo>،</mo><mn dir="ltr">١٠</mn></mrow><mo>}</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p015-r4
title: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٤ · تجريبي رام الله والبيرة ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٤ · تجريبي رام الله والبيرة ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo>{</mo><mtable><mtr><mtd><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></mtd><mtd><mrow><mo>−</mo><mn dir="ltr">٢</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr><mtr><mtd><mrow><mn dir="ltr">١</mn></mrow></mtd><mtd><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\` معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`، فإن إحدى العبارات الآتية صحيحة:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p015-r5
title: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٥ · تجريبي القدس ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٥ · تجريبي القدس ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r5-key.webp)
question: أكبر قيمة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mroot><mrow><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mroot></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\` هي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | صفر
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p015-r6
title: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٦ · تجريبي رام الله والبيرة ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٥ · ص ١٤ · البند ٦ · تجريبي رام الله والبيرة ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p015-r6-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>−</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٣</mn></msup></mrow></math>\`، فإن للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`:
- [x] option-1 | قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٨</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-2 | قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٨</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-3 | قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٨</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | قيمة عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٨</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٨</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p016-r1
title: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ١ · تجريبي قلقيلية ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ١ · تجريبي قلقيلية ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r1-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r1-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\` هي الصغرى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\`، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi></mrow></math>\` على الترتيب:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p016-r2
title: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٢ · تجريبي سلفيت ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٢ · تجريبي سلفيت ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r2-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r2-key.webp)
question: إذا كان للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ج</mi></mrow></math>\` قيمة صغرى محلية قيمتها \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ج</mi></mrow></math>\`؟
- [ ] option-1 | صفر
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p016-r3
title: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٣ · تجريبي القدس ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٣ · تجريبي القدس ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r3-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٢</mn></msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` فإن عدد القيم القصوى للاقتران هو:
- [ ] option-1 | صفر
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p016-r4
title: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٤ · تجريبي الوسطى ٢٠١٩
kicker: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٤ · تجريبي الوسطى ٢٠١٩
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r4-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo>|</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>|</mo></mrow><mo>−</mo><mn dir="ltr">٥</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، فما القيمة الصغرى المطلقة للاقتران؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٥</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | صفر
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٥</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٥</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p016-r5
title: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٥ · تجريبي القدس ٢٠٢٠
kicker: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٥ · تجريبي القدس ٢٠٢٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r5-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r5-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` كثير حدود، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>×</mo><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، فإن قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`:
- [ ] option-1 | عظمى محلية
- [x] option-2 | صغرى محلية
- [ ] option-3 | عظمى مطلقة
- [ ] option-4 | صغرى مطلقة
explanation: الإجابة حسب مفتاح الكامل: صغرى محلية.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p016-r6
title: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٦ · تجريبي قلقيلية ٢٠٢٠
kicker: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٦ · تجريبي قلقيلية ٢٠٢٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r6-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r6-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mtext dir="rtl">جا</mtext><mo>π</mo><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، فإن أكبر قيمة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`:
- [ ] option-1 | صفر
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u2-p016-r7
title: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٧ · تجريبي طولكرم ٢٠٢٤
kicker: الكامل، الوحدة الثانية · WebP ١٦ · ص ١٥ · البند ٧ · تجريبي طولكرم ٢٠٢٤
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r7-question.webp) · [المفتاح](assets/lessons/mathematics/source-crops/math-kamel-u2-p016-r7-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mrow><mo>|</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٦</mn></mrow><mo>|</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً على مجاله، جد عدد النقاط الحرجة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-4 | صفر
explanation: الإجابة حسب مفتاح الكامل: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::exam-question
id: math-kamel-u2-p017-r1
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ١ · ٢٠٠٧
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
عين فترات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\` ثم أوجد القيم القصوى للاقتران.
solution:
متزايد عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&gt;</mo><mn dir="ltr">٠</mn></mrow></math>\`، ومتناقص عندما \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\`. قيمة صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p017-r2-a
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٢ · الجزء ١ · ٢٠١٠
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، جد: (١) فترات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`. متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p017-r2-b
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٢ · الجزء ٢ · ٢٠١٠
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، جد: (٢) القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\` قيمة عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\` قيمة صغرى محلية.

:::

:::exam-question
id: math-kamel-u2-p017-r3
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٣ · ٢٠١١
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
جد مجالات التزايد والتناقص والقيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`.
solution:
متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`. متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo><mo>∪</mo><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\` قيمة عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\` قيمة صغرى محلية.

:::

:::exam-question
id: math-kamel-u2-p017-r4-a
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٤ · الجزء ١ · ٢٠١٧ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: (١) الإحداثي السيني للنقاط الحرجة.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>{</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo>}</mo></mrow></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p017-r4-b
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٤ · الجزء ٢ · ٢٠١٧ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: (٢) فترات التزايد والتناقص.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\` و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p017-r4-c
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٤ · الجزء ٣ · ٢٠١٧ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، أوجد: (٣) القيم القصوى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\`.
solution:
عظمى مطلقة عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mfrac><mrow><mn dir="ltr">١٦</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`. صغرى مطلقة عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١٦</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p017-r5-a
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٥ · الجزء ١ · ٢٠٢٠
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msqrt><mrow><mi mathvariant="normal">س</mi></mrow></msqrt><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi></mrow></math>\`، أوجد: (١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p017-r5-b
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٥ · الجزء ٢ · ٢٠٢٠
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><msqrt><mrow><mi mathvariant="normal">س</mi></mrow></msqrt><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi></mrow></math>\`، أوجد: (٢) القيم القصوى المحلية، وحدد المطلقة منها إن وجدت.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` قيمة صغرى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\` قيمة عظمى محلية ومطلقة.

:::

:::exam-question
id: math-kamel-u2-p017-r6-a
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٦ · الجزء ١ · ٢٠٢٠ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r6-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r6-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٤</mn></mrow></math>\`، أوجد: (١) مجالات التزايد والتناقص للاقتران.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo><mo stretchy="true">[</mo></mrow></math>\` و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mo>−</mo><mo>∞</mo><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p017-r6-b
title: الكامل، الوحدة الثانية · WebP ١٧ · ص ١٦ · البند ٦ · الجزء ٢ · ٢٠٢٠ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r6-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p017-r6-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٤</mn></mrow></math>\`، أوجد: (٢) القيم القصوى المحلية إن وجدت.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٥</mn></mrow></math>\` قيمة صغرى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٥</mn><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\` قيمة عظمى محلية.

:::

:::exam-question
id: math-kamel-u2-p018-r1
title: الكامل، الوحدة الثانية · WebP ١٨ · ص ١٧ · البند ١ · ٢٠٢١
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup><mo>−</mo><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></mrow></math>\`، فما هي أصغر قيمة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p018-r2-a
title: الكامل، الوحدة الثانية · WebP ١٨ · ص ١٧ · البند ٢ · الجزء ١ · ٢٠٢١
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٥</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: (١) فترات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\` و\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٥</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، ومتناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p018-r2-b
title: الكامل، الوحدة الثانية · WebP ١٨ · ص ١٧ · البند ٢ · الجزء ٢ · ٢٠٢١
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r2-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١٥</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٦</mn><mo stretchy="true">]</mo></mrow></math>\`، فأوجد: (٢) القيم القصوى المحلية والمطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\` صغرى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">١٠٠</mn></mrow></math>\` صغرى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٨</mn></mrow></math>\` عظمى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٦</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٩٠</mn></mrow></math>\` عظمى محلية.

:::

:::exam-question
id: math-kamel-u2-p018-r3-a
title: الكامل، الوحدة الثانية · WebP ١٨ · ص ١٧ · البند ٣ · الجزء ١ · ٢٠٢١
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ك</mi></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ك</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، وكان لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية وأخرى عظمى محلية إحداهما تكون عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`، فأوجد: (١) قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p018-r3-b
title: الكامل، الوحدة الثانية · WebP ١٨ · ص ١٧ · البند ٣ · الجزء ٢ · ٢٠٢١
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mi mathvariant="normal">ك</mi></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ك</mi><mo>∈</mo><mi mathvariant="normal">ح</mi></mrow></math>\`، وكان لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية وأخرى عظمى محلية إحداهما تكون عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`، فأوجد: (٢) قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi></mrow></math>\` علماً بأن مجموع القيمتين العظمى والصغرى يساوي \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ك</mi><mo>=</mo><mo>−</mo><mn dir="ltr">١٠</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p018-r4
title: الكامل، الوحدة الثانية · WebP ١٨ · ص ١٧ · البند ٤ · ٢٠٢١ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٣</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>≠</mo><mn dir="ltr">١</mn></mrow></math>\`، فأوجد القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\` عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn></mrow></math>\` صغرى محلية.

:::

:::exam-question
id: math-kamel-u2-p018-r5
title: الكامل، الوحدة الثانية · WebP ١٨ · ص ١٧ · البند ٥ · ٢٠٢١ دور ثالث
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p018-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، فما القيمة الصغرى المطلقة للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٨</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p019-r1-a
title: الكامل، الوحدة الثانية · WebP ١٩ · ص ١٨ · البند ١ · الجزء ١ · ٢٠٢٢ دور أول
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٩</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><msqrt><mrow><mi mathvariant="normal">س</mi></mrow></msqrt></mrow></math>\` معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، فجد: (١) مجالات التزايد والتناقص للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
متزايد في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn><mo stretchy="true">]</mo></mrow></math>\`، متناقص في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p019-r1-b
title: الكامل، الوحدة الثانية · WebP ١٩ · ص ١٨ · البند ١ · الجزء ٢ · ٢٠٢٢ دور أول
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٩</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><msqrt><mrow><mi mathvariant="normal">س</mi></mrow></msqrt></mrow></math>\` معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، فجد: (٢) القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mn dir="ltr">٦</mn><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` عظمى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn><mo>،</mo><mn dir="ltr">١٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` صغرى محلية.

:::

:::exam-question
id: math-kamel-u2-p019-r3
title: الكامل، الوحدة الثانية · WebP ١٩ · ص ١٨ · البند ٣ · ٢٠٢٢ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><mo>−</mo><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></mrow></math>\` معرفاً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo stretchy="true">]</mo></mrow></math>\`، فجد القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mtext dir="rtl">هـ</mtext></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">١</mn><mo>−</mo><mtext dir="rtl">هـ</mtext></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` قيمة صغرى محلية.

:::

:::exam-question
id: math-kamel-u2-p019-r4
title: الكامل، الوحدة الثانية · WebP ١٩ · ص ١٨ · البند ٤ · ٢٠٢٣ دور أول
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٦</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، جد القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">١٦</mn></mrow></math>\` صغرى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\` عظمى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` صغرى. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\` عظمى مطلقة.

:::

:::exam-question
id: math-kamel-u2-p019-r5
title: الكامل، الوحدة الثانية · WebP ١٩ · ص ١٨ · البند ٥ · ٢٠٢٣ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r5-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p019-r5-key.webp)
answer-label: الإجابة المصححة مع توثيق المفتاح المطبوع
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٨</mn><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">]</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، جد القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وحدد نوعها.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٨</mn><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mn dir="ltr">٤</mn></mrow></math>\` عظمى محلية.

\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٨</mn><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mn dir="ltr">١٦</mn></mrow></math>\` صغرى محلية عند طرف المجال.

تنبيه على المفتاح: وصف المصدر القيمة عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\` بأنها «عظمى محلية». التصحيح: هي صغرى محلية؛ إذ \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٨</mn></mrow><mrow><mi mathvariant="normal">س</mi></mrow></mfrac><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">٠</mn></mrow></math>\` على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٤</mn><mo stretchy="true">]</mo></mrow></math>\`، فيتناقص الاقتران حتى الطرف \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`. حُفظت صورة المفتاح المطبوع في المرجع.

تصحيح موثق: المفتاح يصف ق(٤) بأنها عظمى محلية؛ والصحيح صغرى محلية، وفق المشتقة على المجال ]٠،٤].

:::

:::exam-question
id: math-kamel-u2-p020-r1
title: الكامل، الوحدة الثانية · WebP ٢٠ · ص ١٩ · البند ١ · ٢٠٢٣ دور ثانٍ
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p020-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p020-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
يمثل الشكل المجاور منحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` لكثير حدود من الدرجة الثالثة، جد قاعدة الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` علماً بأن منحناه يمر بالنقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

![رسم المشتقة في السؤال، مع المحورين والقيم المشار إليها](assets/lessons/mathematics/source-crops/math-kamel-u2-p020-r1-figure.webp)
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p020-r3
title: الكامل، الوحدة الثانية · WebP ٢٠ · ص ١٩ · البند ٣ · ٢٠٢٣ دور ثالث
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p020-r3-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p020-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٩</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١٧</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٥</mn><mo stretchy="true">]</mo></mrow></math>\`، جد القيم القصوى المحلية للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢٢</mn></mrow></math>\` عظمى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">١٠</mn></mrow></math>\` صغرى مطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢٢</mn></mrow></math>\` عظمى مطلقة.

:::

:::exam-question
id: math-kamel-u2-p020-r4
title: الكامل، الوحدة الثانية · WebP ٢٠ · ص ١٩ · البند ٤ · ٢٠٢٤ دور أول
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p020-r4-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p020-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\`، جد القيم القصوى المحلية والمطلقة لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` إن وجدت؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\` عظمى محلية ومطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mo>π</mo></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` عظمى محلية. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\` صغرى محلية ومطلقة. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٠</mn></mrow></math>\` صغرى محلية.

:::

:::exam-question
id: math-kamel-u2-p022-r1-a
title: الكامل، الوحدة الثانية · WebP ٢٢ · ص ٢١ · البند ١ · الجزء ١ · تجريبي رام الله ٢٠٢٤
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p022-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p022-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٤</mn><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mi mathvariant="normal">س</mi><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow><mrow><mn dir="ltr">٢</mn><mo>+</mo><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\`، جد: (١) مجالات التزايد والتناقص لمنحنى الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متزايد على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mn dir="ltr">٢</mn><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\`. \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` متناقص على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo stretchy="true">]</mo></mrow></math>\`.

:::

:::exam-question
id: math-kamel-u2-p022-r1-b
title: الكامل، الوحدة الثانية · WebP ٢٢ · ص ٢١ · البند ١ · الجزء ٢ · تجريبي رام الله ٢٠٢٤
question: القيم القصوى المحلية والمطلقة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u2-p022-r1-question.webp) · [الحل](assets/lessons/mathematics/source-crops/math-kamel-u2-p022-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٤</mn><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mi mathvariant="normal">س</mi><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow><mrow><mn dir="ltr">٢</mn><mo>+</mo><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mo stretchy="true">[</mo><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn><mo>π</mo><mo stretchy="true">]</mo></mrow></math>\`، جد: (٢) القيم القصوى المحلية لمنحنى \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وحدد نوعها؟
solution:
صغرى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>−</mo><mfrac><mrow><mn dir="ltr">٣</mn><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`. عظمى محلية عند \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>π</mo><mo>،</mo><mo>−</mo><mn dir="ltr">٢</mn><mo>π</mo></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac><mo>،</mo><mn dir="ltr">٢</mn><mo>−</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`.

:::

`;

export default defineMarkdownLesson({
  "status": "published",
  "language": "ar",
  "title": "القيم القصوى",
  "summary": "أسئلة من الكتاب والكامل بإجابات موثقة من المصادر.",
  "outcome": "مراجعة القيم القصوى من الأسئلة الأصلية.",
  "mode": "أسئلة وبطاقات",
  "duration": "42 أسئلة",
  "level": "الثاني عشر · العلمي",
  "reward": 10
}, lessonSource);
