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
reference: [الكتاب، PDF ص 109](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=109)
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
reference: [الكتاب، PDF ص 107](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=107)
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
reference: [الكتاب، PDF ص 109](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=109)
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
reference: [الكتاب، PDF ص 109](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=109)
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
reference: [الكتاب، PDF ص 109](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=109)
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
reference: [الكتاب، PDF ص 123](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=123)
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
reference: [الكتاب، PDF ص 124](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=124)
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
reference: [الكتاب، PDF ص 126](https://moe.edu.ps/storage/app/gaza/subjects/12v/%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A7%D8%AA%20%D8%B9%D9%84%D9%85%D9%8A%20%D9%A1%D9%A2%20%D8%BA%D8%B2%D8%A9%20%D9%85%D8%AA%D9%85%D8%A7%D8%B2%D8%AC%D8%A9.pdf#page=126)
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

:::mcq
id: math-kamel-u5-p013-r1
title: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 1 · ٢٠٠٨
kicker: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 1 · ٢٠٠٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r1-key.webp)
question: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتران معرف على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة لها بحيث أن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٥</mn><mo>+</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">ن</mi></mrow><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">ن</mi></mrow></mfrac></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٠</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٧</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p013-r2
title: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 2 · ٢٠١٠
kicker: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 2 · ٢٠١٠
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r2-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة لنفس الفترة بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٧</mn><mi mathvariant="normal">ن</mi><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow><mrow><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">١</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p013-r3
title: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 3 · ٢٠١٠ إكمال
kicker: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 3 · ٢٠١٠ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r3-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٥</mn><mi mathvariant="normal">س</mi></mrow><mrow><msup><mi mathvariant="normal">س</mi><mrow><mn dir="ltr">٢</mn></mrow></msup><mo>+</mo><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\` اقتراناً أصلياً للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٢٨</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٢٨</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١٠</mn></mrow><mrow><mn dir="ltr">٧</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١٠</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٢٨</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p013-r4
title: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 4 · ٢٠١٢
kicker: الكامل، الوحدة الخامسة · WebP 13 · ص 12 · البند 4 · ٢٠١٢
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p013-r4-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً أصلياً للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١٠</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٠</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p014-r1
title: الكامل، الوحدة الخامسة · WebP 14 · ص 13 · البند 1 · ٢٠١٣ الإكمال
kicker: الكامل، الوحدة الخامسة · WebP 14 · ص 13 · البند 1 · ٢٠١٣ الإكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p014-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p014-r1-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><mo>−</mo><mfrac><mrow><mn dir="ltr">٥</mn><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">ن</mi></mrow><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">ن</mi></mrow></mfrac></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٧</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٧</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٩</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٧</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p014-r2
title: الكامل، الوحدة الخامسة · WebP 14 · ص 13 · البند 2 · ٢٠١٤ الإكمال
kicker: الكامل، الوحدة الخامسة · WebP 14 · ص 13 · البند 2 · ٢٠١٤ الإكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p014-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p014-r2-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً ومحدداً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">أ</mi><mi mathvariant="normal">ن</mi><mo>+</mo><mi mathvariant="normal">أ</mi></mrow><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\` التي تجعل \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٠</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mfrac><mrow><mn dir="ltr">٨</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٨</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | صفر
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p014-r3
title: الكامل، الوحدة الخامسة · WebP 14 · ص 13 · البند 3 · ٢٠١٤ إكمال ضفة
kicker: الكامل، الوحدة الخامسة · WebP 14 · ص 13 · البند 3 · ٢٠١٤ إكمال ضفة
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p014-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p014-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً أصلياً للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٥</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٧</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">مَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: د — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p015-r1
title: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 1 · ٢٠١٥
kicker: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 1 · ٢٠١٥
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r1-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقترانين أصليين للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٨</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١٨</mn></mrow></math>\`، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٥</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ل</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يساوي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: د — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p015-r2
title: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 2 · ٢٠١٦
kicker: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 2 · ٢٠١٦
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi></mrow></math>\` متصلاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><mo>−</mo><mfrac><mrow><mn dir="ltr">٥</mn><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">ن</mi></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></mfrac></mrow></math>\`، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يساوي:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p015-r3
title: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 3 · ٢٠١٦ إكمال
kicker: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 3 · ٢٠١٦ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r3-key.webp)
question: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><msup><mi mathvariant="normal">س</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يساوي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: د — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٦</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p015-r4
title: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 4 · ٢٠١٦ إكمال
kicker: الكامل، الوحدة الخامسة · WebP 15 · ص 14 · البند 4 · ٢٠١٦ إكمال
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p015-r4-key.webp)
question: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mroot><mrow><mi mathvariant="normal">س</mi></mrow><mrow><mn dir="ltr">٣</mn></mrow></mroot><mo>×</mo><msup><mi mathvariant="normal">س</mi><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></msup></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يساوي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: د — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p016-r1
title: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 1 · ٢٠١٧
kicker: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 1 · ٢٠١٧
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r1-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` معرفاً ومحدداً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٨</mn><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup><mo>+</mo><mn dir="ltr">١٢</mn><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">٤</mn></mrow><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\`، فإن قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٠</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` تساوي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٨</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p016-r2
title: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 2 · ٢٠١٧
kicker: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 2 · ٢٠١٧
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r2-key.webp)
question: إذا كان الاقترانان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقترانين أصليين للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١٠</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣٥</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣٨</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤٠</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤٥</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤٠</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p016-r3
title: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 3 · ٢٠١٧ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 3 · ٢٠١٧ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r3-key.webp)
question: \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٠</mn></mrow><mrow><mn dir="ltr">١</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><msqrt><mrow><mi mathvariant="normal">س</mi></mrow></msqrt><mo>×</mo><msup><mi mathvariant="normal">س</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يساوي:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٧</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٥</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٥</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٧</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٧</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p016-r4
title: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 4 · ٢٠١٨
kicker: الكامل، الوحدة الخامسة · WebP 16 · ص 15 · البند 4 · ٢٠١٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p016-r4-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">أ</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ب</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">أ</mi><mi mathvariant="normal">ب</mi></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">س</mi></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` يساوي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p017-r1
title: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 1 · ٢٠١٨
kicker: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 1 · ٢٠١٨
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r1-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">أ</mi></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث كانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">١٦</mn><mo>+</mo><mfrac><mrow><mn dir="ltr">٨</mn></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></mfrac></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p017-r2
title: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 2 · ٢٠١٨ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 2 · ٢٠١٨ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">م</mi><mrow><mn dir="ltr">١</mn></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">م</mi><mrow><mn dir="ltr">٢</mn></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقترانين أصليين للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` بحيث أن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">م</mi><mrow><mn dir="ltr">١</mn></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mrow><mn dir="ltr">٢</mn></mrow></msup><mo>−</mo><mn dir="ltr">٦</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">م</mi><mrow><mn dir="ltr">٢</mn></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">ب</mi><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></math>\`، فما قيمة الثابتين \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ب</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p017-r3
title: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 3 · ٢٠١٨ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 3 · ٢٠١٨ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r3-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msqrt><mrow><msup><mi mathvariant="normal">س</mi><mrow><mn dir="ltr">٢</mn></mrow></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></msqrt></mrow></math>\` هو اقتران أصلي للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فإن قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٧</mn></mrow></msqrt></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` تساوي:
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msqrt><mrow><mn dir="ltr">٢</mn></mrow></msqrt></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn><msqrt><mrow><mn dir="ltr">٢</mn></mrow></msqrt></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn><msqrt><mrow><mn dir="ltr">٢</mn></mrow></msqrt></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msqrt><mrow><mn dir="ltr">٢</mn></mrow></msqrt></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p017-r4
title: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 4 · ٢٠١٨ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 17 · ص 16 · البند 4 · ٢٠١٨ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p017-r4-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فإن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><munder><mtext dir="rtl">نها</mtext><mrow><mi mathvariant="normal">ن</mi><mo>→</mo><mo>∞</mo></mrow></munder><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` يساوي:
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٨</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٩</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p018-r1
title: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 1 · ٢٠١٩ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 1 · ٢٠١٩ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r1-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٣</mn></mrow><mrow><msup><mi mathvariant="normal">س</mi><mrow><mn dir="ltr">٢</mn></mrow></msup><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">١</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | صفر
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p018-r2
title: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 2 · ٢٠١٩ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 2 · ٢٠١٩ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r2-key.webp)
question: إذا كان الاقترانان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقترانين أصليين للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١٠</mn></mrow></math>\`، جد \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mrow><mo stretchy="true">(</mo><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٥٠</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤٠</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤٠</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٥٠</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٤٠</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p018-r3
title: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 3 · ٢٠١٩ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 3 · ٢٠١٩ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r3-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٥</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">١</mn><mo>+</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mi mathvariant="normal">س</mi></mrow></msup></mrow></mfrac></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [x] option-2 | صفر
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — صفر.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p018-r4
title: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 4 · ٢٠١٩ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 18 · ص 17 · البند 4 · ٢٠١٩ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p018-r4-key.webp)
question: إذا علمت أن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢٤</mn></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mrow><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p019-r1
title: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 1 · ٢٠١٩ دور ثالث
kicker: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 1 · ٢٠١٩ دور ثالث
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r1-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\` معرفاً على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><munder><mtext dir="rtl">نها</mtext><mrow><mi mathvariant="normal">ن</mi><mo>→</mo><mo>∞</mo></mrow></munder><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-4 | غير موجودة
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p019-r2
title: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 2 · ٢٠٢٠ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 2 · ٢٠٢٠ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r2-key.webp)
question: إذا كانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><mo>+</mo><mfrac><mrow><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">ن</mi></mrow><mrow><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٠</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p019-r3
title: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 3 · ٢٠٢٠ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 3 · ٢٠٢٠ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r3-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٢٤</mn></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٤</mn><mi mathvariant="normal">ن</mi><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow><mrow><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\` للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٠</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p019-r4
title: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 4 · ٢٠٢١ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 19 · ص 18 · البند 4 · ٢٠٢١ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p019-r4-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً قابلاً للتكامل على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث كانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></mfrac><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٧</mn><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mi mathvariant="normal">س</mi><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow></mfrac><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٧</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٩</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٠</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p020-r1
title: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 1 · ٢٠٢١ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 1 · ٢٠٢١ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r1-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">س</mi><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mtext dir="rtl">هـ</mtext></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">قً</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٨</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p020-r2
title: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 2 · ٢٠٢١ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 2 · ٢٠٢١ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r2-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٠</mn></mrow><mrow><msub><mtext dir="rtl">لو</mtext><mrow><mtext dir="rtl">هـ</mtext></mrow></msub><mi mathvariant="normal">ب</mi></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><msup><mtext dir="rtl">هـ</mtext><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></msup></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mfrac><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p020-r3
title: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 3 · ٢٠٢١ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 3 · ٢٠٢١ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r3-key.webp)
question: إذا كان الاقترانان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقترانين أصليين للاقتران المتصل \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٥</mn></mrow></msubsup><mfrac><mrow><mi mathvariant="normal">س</mi></mrow><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></mfrac><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>−</mo><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: د — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p020-r4
title: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 4 · ٢٠٢١ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 4 · ٢٠٢١ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r4-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً متصلاً على \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ح</mi></mrow></math>\` ويمر بالنقطة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">(</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn><mo>،</mo><mo>−</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، وكان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>+</mo><mi mathvariant="normal">س</mi><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">١٧</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٩</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: د — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٩</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p020-r5
title: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 5 · ٢٠٢٢ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 20 · ص 19 · البند 5 · ٢٠٢٢ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r5-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p020-r5-key.webp)
question: إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` اقتراناً أصلياً للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` المتصل، حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٥</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>+</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٦</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١١</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p021-r1
title: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 1 · ٢٠٢٢ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 1 · ٢٠٢٢ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r1-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٣</mn></mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></msubsup><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mi mathvariant="normal">أ</mi></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mi mathvariant="normal">أ</mi><mo>+</mo><mfrac><mrow><mn dir="ltr">٤</mn><mo>−</mo><mn dir="ltr">٨</mn><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow><mrow><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [x] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ج — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p021-r2
title: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 2 · ٢٠٢٢ دور أول
kicker: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 2 · ٢٠٢٢ دور أول
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r2-key.webp)
question: ما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٤</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٣</mn></mrow></mfrac></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mtext dir="rtl">ظا</mtext><mi mathvariant="normal">س</mi></mrow><mrow><mtext dir="rtl">ظتا</mtext><mi mathvariant="normal">س</mi></mrow></mfrac><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١</mn><mo>+</mo><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></math>\`
- [ ] option-3 | صفر
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msqrt><mrow><mn dir="ltr">٣</mn></mrow></msqrt><mo>−</mo><mn dir="ltr">١</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p021-r3
title: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 3 · ٢٠٢١ دور ثالث
kicker: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 3 · ٢٠٢١ دور ثالث
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r3-key.webp)
question: إذا كانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٦</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><munder><mtext dir="rtl">نها</mtext><mrow><mi mathvariant="normal">ن</mi><mo>→</mo><mo>∞</mo></mrow></munder><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">١</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٨</mn></mrow></math>\`
- [x] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٩</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: ب — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٩</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p021-r4
title: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 4 · ٢٠٢٤ دور ثانٍ
kicker: الكامل، الوحدة الخامسة · WebP 21 · ص 20 · البند 4 · ٢٠٢٤ دور ثانٍ
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p021-r4-key.webp)
question: إذا كان اقتراناً معرفاً في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، وكانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mo>−</mo><mn dir="ltr">٣</mn><mo>−</mo><mfrac><mrow><mn dir="ltr">١٨</mn></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></mfrac></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٠</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mn dir="ltr">٢</mn><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٣</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٦</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٦</mn></mrow></math>\`. لم يطبع المصدر اسم الاقتران بعد «إذا كان»؛ يرد الرمز ق في مجموع ريمان وفي المطلوب.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p022-r1
title: الكامل، الوحدة الخامسة · WebP 22 · ص 21 · البند 1 · تجريبي مديرية شرق غزة ٢٠٢٣
kicker: الكامل، الوحدة الخامسة · WebP 22 · ص 21 · البند 1 · تجريبي مديرية شرق غزة ٢٠٢٣
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p022-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p022-r1-key.webp)
question: إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٠</mn></mrow></msubsup><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mo>−</mo><mn dir="ltr">٢٤</mn></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة على الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` بحيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٤</mn><mi mathvariant="normal">ن</mi><mo>−</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">ب</mi><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow><mrow><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\`، فما قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi></mrow></math>\`؟
- [x] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٠</mn></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٤</mn></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: أ — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::mcq
id: math-kamel-u5-p022-r2
title: الكامل، الوحدة الخامسة · WebP 22 · ص 21 · البند 2 · خارجي
kicker: الكامل، الوحدة الخامسة · WebP 22 · ص 21 · البند 2 · خارجي
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p022-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p022-r2-key.webp)
question: إذا علمت أن \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi><mo>=</mo><mn dir="ltr">٩</mn></mrow></math>\`، فجد قيمة الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi></mrow></math>\` إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mfrac><mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">أ</mi><mi mathvariant="normal">ن</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow></mrow><mrow><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mo>−</mo><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`.
- [ ] option-1 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٩</mn></mrow></math>\`
- [ ] option-2 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٩</mn></mrow></mfrac></mrow></math>\`
- [ ] option-3 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mfrac><mrow><mn dir="ltr">٩</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
- [x] option-4 | \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٩</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`
explanation: الإجابة حسب مفتاح الكامل: د — \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mfrac><mrow><mn dir="ltr">٩</mn></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.

:::

:::exam-question
id: math-kamel-u5-p023-r1
title: الكامل، الوحدة الخامسة · WebP 23 · ص 22 · البند 1 · ٢٠١٩ دور أول
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
استخدم تعريف التكامل المحدود في إيجاد قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">٢</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٨</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤٢</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p023-r2
title: الكامل، الوحدة الخامسة · WebP 23 · ص 22 · البند 2 · ٢٠٢٠ دور ثانٍ
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>−</mo><mn dir="ltr">٣</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`، حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` معتبراً \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mi mathvariant="normal">س</mi><mrow><mi mathvariant="normal">ر</mi></mrow><mrow><mo>∗</mo></mrow></msubsup><mo>=</mo><msub><mi mathvariant="normal">س</mi><mrow><mi mathvariant="normal">ر</mi></mrow></msub></mrow></math>\`، احسب \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\` باستخدام تعريف التكامل المحدود.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٨</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p023-r3
title: الكامل، الوحدة الخامسة · WebP 23 · ص 22 · البند 3 · ٢٠٢١ دور أول
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
استخدم تعريف التكامل المحدود في إيجاد قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٠</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p023-r4
title: الكامل، الوحدة الخامسة · WebP 23 · ص 22 · البند 4 · ٢٠٢١ دور ثانٍ
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
استخدم تعريف التكامل المحدود في إيجاد قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mrow><mn dir="ltr">٥</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٤٨</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p023-r5
title: الكامل، الوحدة الخامسة · WebP 23 · ص 22 · البند 5 · ٢٠٢١ دور أول
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r5-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٦</mn><mo>+</mo><mfrac><mrow><mn dir="ltr">٤</mn><mo>+</mo><mn dir="ltr">٨</mn><mo>+</mo><mn dir="ltr">١٢</mn><mo>+</mo><mo>…</mo><mo>+</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">ن</mi></mrow><mrow><msup><mi mathvariant="normal">ن</mi><mrow><mn dir="ltr">٢</mn></mrow></msup></mrow></mfrac></mrow></math>\` حيث \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة في \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٤</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٦</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p023-r6
title: الكامل، الوحدة الخامسة · WebP 23 · ص 22 · البند 6 · ٢٠٢٣ دور أول
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r6-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p023-r6-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
استخدم تعريف التكامل المحدود في إيجاد قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>−</mo><mn dir="ltr">٦</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`.
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">٢٠</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p024-r1
title: الكامل، الوحدة الخامسة · WebP 24 · ص 23 · البند 1 · ٢٠٢٣ دور ثانٍ
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r1-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r1-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ب</mi></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، وكان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">س</mi><mo>∈</mo><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mi mathvariant="normal">ب</mi></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`، \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">م</mi><mrow><mo stretchy="true">(</mo><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub><mo>،</mo><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mn dir="ltr">٣٥</mn><mo>+</mo><mfrac><mrow><mn dir="ltr">٢٥</mn></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></mfrac></mrow></math>\`، ما قيمة/قيم الثابت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mn dir="ltr">٦</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p024-r2
title: الكامل، الوحدة الخامسة · WebP 24 · ص 23 · البند 2 · ٢٠٢٤ دور أول
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r2-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r2-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
استخدم تعريف التكامل المحدود في إيجاد قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mo>−</mo><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">٢</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p024-r3
title: الكامل، الوحدة الخامسة · WebP 24 · ص 23 · البند 3 · ٢٠٢٤ دور ثانٍ
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r3-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r3-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
استخدم تعريف التكامل المحدود في إيجاد قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msubsup><mo>∫</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mn dir="ltr">٣</mn></mrow></msubsup><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mo>−</mo><mn dir="ltr">٥</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">د</mi><mi mathvariant="normal">س</mi></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo>−</mo><mn dir="ltr">١٢</mn></mrow></math>\`

:::

:::exam-question
id: math-kamel-u5-p024-r4
title: الكامل، الوحدة الخامسة · WebP 24 · ص 23 · البند 4 · تجريبي قلقيلية ٢٠٢٣
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r4-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r4-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mrow><mo stretchy="true">{</mo><mtable><mtr><mtd><mrow><mfrac><mrow><mn dir="ltr">١</mn><mo>−</mo><mtext dir="rtl">جا</mtext><mi mathvariant="normal">س</mi></mrow><mrow><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></mfrac></mrow></mtd><mtd><mrow><mi mathvariant="normal">س</mi><mo>≠</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mn dir="ltr">٣</mn></mrow></mtd><mtd><mrow><mi mathvariant="normal">س</mi><mo>=</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow></mtd></mtr></mtable></mrow></mrow></math>\`، ابحث قابلية التكامل للاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\` في الفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>π</mo></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\`.
solution:
قابل للتكامل.

:::

:::exam-question
id: math-kamel-u5-p024-r5
title: الكامل، الوحدة الخامسة · WebP 24 · ص 23 · البند 5 · خارجي
question: التكامل المحدود
reference: [السؤال، WebP](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r5-question.webp) · [الإجابة المطبوعة](assets/lessons/mathematics/source-crops/math-kamel-u5-p024-r5-key.webp)
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كانت \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><msub><mi mathvariant="normal">σ</mi><mrow><mi mathvariant="normal">ن</mi></mrow></msub></mrow></math>\` تجزئة نونية منتظمة للفترة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn></mrow></mfrac></mrow><mo stretchy="true">]</mo></mrow></mrow></math>\` وكان الاقتران \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow><mo>=</mo><mtext dir="rtl">جتا</mtext><mi mathvariant="normal">س</mi></mrow></math>\`، فما قيمة \`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><munder><mtext dir="rtl">نها</mtext><mrow><mi mathvariant="normal">ن</mi><mo>→</mo><mo>∞</mo></mrow></munder><mfrac><mrow><mn dir="ltr">٥</mn><mo>π</mo></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></mfrac><munderover><mo>∑</mo><mrow><mi mathvariant="normal">ر</mi><mo>=</mo><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">ن</mi></mrow></munderover><mrow><mo stretchy="true">(</mo><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mrow><mfrac><mrow><mo>π</mo></mrow><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">ن</mi></mrow></mfrac><mi mathvariant="normal">ر</mi></mrow><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></math>\`؟
solution:
\`mathml:<math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mn dir="ltr">١٠</mn></mrow></math>\`

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
