import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const lessonSource = `
:::exam-question
id: math-book-p108-ex2
title: الكتاب، ص 106 · مثال ٢ · متقدم
question: التكامل المحدود
reference: [السؤال، PDF ص 108](assets/lessons/mathematics/source-crops/math-book-p108-ex2-question.webp) · [الحل المطبوع ](assets/lessons/mathematics/source-crops/math-book-p108-ex2-answer.webp)
answer-label: الحل المطبوع في الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٥</mn><mo>−</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، احسب \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mn dir="ltr">٠</mn><mn dir="ltr">٣</mn></msubsup><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` باستخدام تعريف التكامل المحدود، معتبرًا \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mi mathvariant="normal">س</mi><mi mathvariant="normal">ر</mi><mo>×</mo></msubsup><mo>=</mo><msub><mi mathvariant="normal">س</mi><mi mathvariant="normal">ر</mi></msub></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
:::

:::exam-question
id: math-book-p109-ex3
title: الكتاب، ص 107 · مثال محلول
question: التكامل المحدود
reference: [الكتاب، PDF ص 109](assets/lessons/mathematics/sources/mathbook.pdf#page=109)
answer-label: الحل المطبوع في الكتاب
body:
إذا علمت أن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mn dir="ltr">٤</mn></msubsup><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mn dir="ltr">٩</mn></mrow></math>\`، وكان مجموع ريمان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">ن</mi></mfrac></math>\`، حيث σₙ تجزئة نونية منتظمة للفترة [−١، ٤]، فجد قيمة الثابت أ.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mfrac><mn dir="ltr">٩</mn><mn dir="ltr">٢</mn></mfrac></mrow></math>\`
:::

:::exam-question
id: math-kamel-u5-p069-r1
title: الكامل، الوحدة 5 · PDF ص 69
question: التكامل المحدود
reference: [الكامل، الوحدة 5، PDF ص 69](assets/lessons/mathematics/sources/kamel-u5.pdf#page=69)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان ق(س) قابلًا للتكامل على [١، ٥]، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><msubsup><mo>∫</mo><mn dir="ltr">١</mn><mn dir="ltr">٥</mn></msubsup><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، جد الثابت أ، حيث مجموع ريمان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">ن</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">١</mn><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">ن</mi></mrow></mfrac><mo>+</mo><mi mathvariant="normal">ن</mi><mo>+</mo><mi mathvariant="normal">ب</mi></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\`
:::

:::exam-question
id: math-kamel-u5-p069-r2
title: الكامل، الوحدة 5 · PDF ص 69
question: التكامل المحدود
reference: [الكامل، الوحدة 5، PDF ص 69](assets/lessons/mathematics/sources/kamel-u5.pdf#page=69)
answer-label: الإجابة المطبوعة في الكامل
body:
باستخدام تعريف التكامل المحدود، جد \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mn dir="ltr">٢</mn></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>−</mo><mrow><msubsup><mo>∫</mo><mn dir="ltr">٣</mn><mn dir="ltr">٢</mn></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، حيث س*ᵣ = سᵣ.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٨</mn></math>\`
:::

:::exam-question
id: math-kamel-u5-p069-r3
title: الكامل، الوحدة 5 · PDF ص 69
question: التكامل المحدود
reference: [الكامل، الوحدة 5، PDF ص 69](assets/lessons/mathematics/sources/kamel-u5.pdf#page=69)
answer-label: الإجابة المطبوعة في الكامل
body:
استخدم تعريف التكامل المحدود لحساب \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mn dir="ltr">٠</mn><mn dir="ltr">٣</mn></msubsup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`، علمًا بأن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><munderover><mo>∑</mo><mrow><mi mathvariant="normal">ر</mi><mo>=</mo><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></munderover><msup><mi mathvariant="normal">ر</mi><mn dir="ltr">٢</mn></msup></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">ن</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٦</mn></mfrac></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١٢</mn></math>\`
:::

:::exam-question
id: math-kamel-u5-p057-r1
title: الكامل، الوحدة 5 · PDF ص 57
question: التكامل المحدود
reference: [الكامل، الوحدة 5، PDF ص 57](assets/lessons/mathematics/sources/kamel-u5.pdf#page=57)
answer-label: الإجابة المطبوعة في الكامل
body:
ما قيمة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><msubsup><mo>∫</mo><mn dir="ltr">٢</mn><mn dir="ltr">٣</mn></msubsup><mfrac><mrow><msup><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow></mfrac><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>−</mo><mrow><msubsup><mo>∫</mo><mn dir="ltr">٢</mn><mn dir="ltr">٣</mn></msubsup><mfrac><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><msup><mrow><mtext dir="rtl">قا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">٨</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow></mfrac><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، س ≠ ٣؟
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">١١</mn><mn dir="ltr">٢</mn></mfrac></math>\`
:::

:::exam-question
id: math-kamel-u5-p057-r2
title: الكامل، الوحدة 5 · PDF ص 57
question: التكامل المحدود
reference: [الكامل، الوحدة 5، PDF ص 57](assets/lessons/mathematics/sources/kamel-u5.pdf#page=57)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\` اقترانًا أصليًا لق(س)، وكانت \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mrow><msubsup><mo>∫</mo><mn dir="ltr">١</mn><mtext dir="rtl">هـ</mtext></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mtext dir="rtl">هـ</mtext></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>+</mo><mrow><msubsup><mo>∫</mo><mn dir="ltr">٩</mn><msup><mtext dir="rtl">هـ</mtext><mn dir="ltr">٢</mn></msup></msubsup><mfrac><mi mathvariant="normal">أ</mi><mrow><mn dir="ltr">٣</mn><mo>−</mo><mtext dir="rtl">هـ</mtext></mrow></mfrac><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><mo>+</mo><mtext dir="rtl">هـ</mtext></mrow></mrow></math>\`، فما قيمة أ؟
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mrow><mtext dir="rtl">هـ</mtext><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow></math>\`
:::

:::exam-question
id: math-kamel-u5-p057-r3
title: الكامل، الوحدة 5 · PDF ص 57
question: التكامل المحدود
reference: [الكامل، الوحدة 5، PDF ص 57](assets/lessons/mathematics/sources/kamel-u5.pdf#page=57)
answer-label: الإجابة المطبوعة في الكامل
body:
ما قيمة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mn dir="ltr">٠</mn><mn dir="ltr">٢</mn></msubsup><mrow><mn dir="ltr">١٢٠</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٣</mn></msup></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٩٦</mn></math>\`
:::

:::exam-question
id: math-book-p107-ex1
title: الكتاب، ص 105 · مثال محلول
question: التكامل المحدود
reference: [الكتاب، PDF ص 107](assets/lessons/mathematics/sources/mathbook.pdf#page=107)
answer-label: الحل المطبوع في الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٣</mn></mrow></mrow></math>\` معرفًا في الفترة [٢، ٦]، وكانت σₙ تجزئة نونية منتظمة للفترة نفسها، فاحسب مجموع ريمان، معتبرًا س*ᵣ = سᵣ.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤٤</mn><mo>+</mo><mfrac><mn dir="ltr">١٦</mn><mi mathvariant="normal">ن</mi></mfrac></mrow></math>\`
:::

:::exam-question
id: math-book-p109-q1
title: الكتاب، ص 107 · نشاط أو تمرين
question: التكامل المحدود
reference: [الكتاب، PDF ص 109](assets/lessons/mathematics/sources/mathbook.pdf#page=109)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mo>−</mo><mn dir="ltr">٥</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\`، وكانت σₙ تجزئة منتظمة للفترة [−١، ٣]، فاحسب مجموع ريمان، معتبرًا س*ᵣ = سᵣ.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow><mo>−</mo><mfrac><mn dir="ltr">٤٠</mn><mi mathvariant="normal">ن</mi></mfrac></mrow></math>\`
:::

:::exam-question
id: math-book-p109-q2-a
title: الكتاب، ص 107 · نشاط أو تمرين
question: التكامل المحدود
reference: [الكتاب، PDF ص 109](assets/lessons/mathematics/sources/mathbook.pdf#page=109)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
استخدم تعريف التكامل المحدود لإيجاد قيمة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mn dir="ltr">٤</mn></msubsup><mfrac><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></mfrac><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mfrac><mn dir="ltr">٥</mn><mn dir="ltr">٢</mn></mfrac></math>\`
:::

:::exam-question
id: math-book-p109-q2-b
title: الكتاب، ص 107 · نشاط أو تمرين
question: التكامل المحدود
reference: [الكتاب، PDF ص 109](assets/lessons/mathematics/sources/mathbook.pdf#page=109)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
استخدم تعريف التكامل المحدود لإيجاد قيمة \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mn dir="ltr">١</mn><mn dir="ltr">٢</mn></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٤</mn><mo>−</mo><mn dir="ltr">٦</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٥</mn></mrow></math>\`
:::

:::exam-question
id: math-book-p123-worksheet2-q2
title: الكتاب، ص 121 · نشاط أو تمرين
question: التكامل المحدود
reference: [الكتاب، PDF ص 123](assets/lessons/mathematics/sources/mathbook.pdf#page=123)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\` معرفًا في [١، ب]، وكان مجموع ريمان = \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣٥</mn><mo>+</mo><mfrac><mn dir="ltr">٢٥</mn><mi mathvariant="normal">ن</mi></mfrac></mrow></math>\`، فما قيمة ب؟
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mn dir="ltr">٦</mn></mrow></math>\`
:::

:::mcq
id: math-book-p124-unit-q1-e
title: الكتاب، ص 122 · اختبار الوحدة
kicker: اختبار الوحدة
reference: [الكتاب، PDF ص 124](assets/lessons/mathematics/sources/mathbook.pdf#page=124)
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mrow></math>\` معرفًا في [١، ٢]، وكانت σₙ تجزئة منتظمة للفترة، فما نهاية مجموع ريمان عندما ن ← ∞؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">١</mn></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٢</mn></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`
- [ ] option-4 | غير موجودة
explanation: الإجابة المحسوبة من معطيات السؤال وقواعد الكتاب: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mn dir="ltr">٤</mn></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-book-p126-unit-q7
title: الكتاب، ص 124 · اختبار الوحدة
question: التكامل المحدود
reference: [الكتاب، PDF ص 126](assets/lessons/mathematics/sources/mathbook.pdf#page=126)
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
استخدم تعريف التكامل المحدود لإيجاد \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mn dir="ltr">١</mn><mn dir="ltr">٥</mn></msubsup><mrow><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
solution:
٣٦.
:::

:::exam-question
id: math-kamel-u5-p069-r1-b
title: الكامل، الوحدة 5 · PDF ص 69
question: التكامل المحدود
reference: [الكامل، الوحدة 5، PDF ص 69](assets/lessons/mathematics/sources/kamel-u5.pdf#page=69)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان ق(س) قابلًا للتكامل على [١، ٥]، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><msubsup><mo>∫</mo><mn dir="ltr">١</mn><mn dir="ltr">٥</mn></msubsup><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، جد الثابت ب، حيث مجموع ريمان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">ن</mi><mn dir="ltr">٢</mn></msup><mo>+</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">١</mn><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">ن</mi></mrow></mfrac><mo>+</mo><mi mathvariant="normal">ن</mi><mo>+</mo><mi mathvariant="normal">ب</mi></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mfrac><mn dir="ltr">٧</mn><mn dir="ltr">٣</mn></mfrac></mrow></math>\`
:::
`;

export default defineMarkdownLesson({
  "status": "published",
  "language": "ar",
  "title": "التكامل المحدود",
  "summary": "أسئلة من الكتاب والكامل بإجابات موثقة من المصادر.",
  "outcome": "مراجعة التكامل المحدود من الأسئلة الأصلية.",
  "mode": "أسئلة وبطاقات",
  "duration": "16 أسئلة",
  "level": "الثاني عشر · العلمي",
  "reward": 10
}, lessonSource);
