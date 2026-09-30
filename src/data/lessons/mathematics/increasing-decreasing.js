import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const lessonSource = `
:::exam-question
id: math-book-p037-ex1
title: الكتاب، ص 35 · مثال ١
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 35، مثال ١
answer-label: الحل المطبوع في الكتاب
body:
في الشكل المجاور، حدد الفترات التي يكون فيها منحنى الاقتران ق(س) متزايدًا، أو متناقصًا، أو ثابتًا.

![الرسم الأصلي لمنحنى الاقتران وعليه علامات أ، ج، د، ب](assets/lessons/mathematics/source-crops/math-book-p037-ex1-figure.webp)
solution:
يكون منحنى الاقتران ق(س) ثابتًا في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mi mathvariant="normal">أ</mi><mo>،</mo><mi mathvariant="normal">ج</mi></mrow><mo stretchy="true">]</mo></mrow></math>\`، ومتناقصًا في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mi mathvariant="normal">ج</mi><mo>،</mo><mi mathvariant="normal">د</mi></mrow><mo stretchy="true">]</mo></mrow></math>\`، ومتزايدًا في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mi mathvariant="normal">د</mi><mo>،</mo><mi mathvariant="normal">ب</mi></mrow><mo stretchy="true">]</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p039-ex3
title: الكتاب، ص 37 · مثال ٣
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 37، مثال ٣
answer-label: الحل المطبوع في الكتاب
body:
عيّن فترات التزايد والتناقص للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٤</mn></msup><mo>+</mo><mn dir="ltr">٤</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٥</mn></mrow></mrow></math>\`، س ∈ ح.
solution:
يتزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`، ويتناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::mcq
id: math-kamel-u2-p003-r3
title: الكامل، الوحدة 2 · PDF ص 3 · row-3
kicker: الكامل، الوحدة 2 · PDF ص 3 · row-3
reference: الكامل، الوحدة 2 · PDF ص 3، row-3
question: إذا كانت ق(س)، هـ(س) معرفتين على ح، وكان ق(س) متزايدًا على ح، وق(س) لا تساوي صفرًا، بحيث إن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>×</mo><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow><mo>=</mo><mn dir="ltr">٧</mn></mrow></math>\`، فإن إحدى العبارات الآتية صحيحة دائمًا:
- [x] option-1 | هـ(س) متناقص على ح
- [ ] option-2 | هـ(س) متزايد على ح
- [ ] option-3 | هـ(س) ثابت على ح
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>&gt;</mo><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\` على ح
explanation: الإجابة النهائية: هـ(س) متناقص على ح.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p004-r1
title: الكامل، الوحدة 2 · PDF ص 4 · row-1
kicker: الكامل، الوحدة 2 · PDF ص 4 · row-1
reference: الكامل، الوحدة 2 · PDF ص 4، row-1
question: ما قيم الثابت أ التي تجعل الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٣</mn><mi mathvariant="normal">أ</mi><mo>−</mo><mn dir="ltr">٦</mn></mrow><mo stretchy="true">)</mo></mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٧</mn></mrow></mrow></math>\` متزايدًا على ح؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&gt;</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&lt;</mo><mn dir="ltr">٢</mn></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>&gt;</mo><mn dir="ltr">٢</mn></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p004-r6
title: الكامل، الوحدة 2 · PDF ص 4 · row-6
kicker: الكامل، الوحدة 2 · PDF ص 4 · row-6
reference: الكامل، الوحدة 2 · PDF ص 4، row-6
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mi mathvariant="normal">س</mi><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، س ≠ −١، فما العبارة الصحيحة مما يأتي؟
- [ ] option-1 | ق(س) متزايد على ح
- [x] option-2 | ق(س) متزايد على \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\` وعلى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-3 | ق(س) متناقص على ح
- [ ] option-4 | ق(س) متناقص على \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\` وعلى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة النهائية: ق(س) متزايد على \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\` وعلى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p005-r1
title: الكامل، الوحدة 2 · PDF ص 5 · row-1
kicker: الكامل، الوحدة 2 · PDF ص 5 · row-1
reference: الكامل، الوحدة 2 · PDF ص 5، row-1
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup><mo>−</mo><msup><mtext dir="rtl">هـ</mtext><mrow><mo>−</mo><mi mathvariant="normal">س</mi></mrow></msup></mrow></mrow></math>\`، فما العبارة الصحيحة بالنسبة للاقتران ق(س)؟
- [x] option-1 | متزايد في ح
- [ ] option-2 | متناقص في ح
- [ ] option-3 | متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\` ومتناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`
- [ ] option-4 | متناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\` ومتزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة النهائية: متزايد في ح.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-book-p038-activity-1
title: الكتاب، ص 36 · activity-1
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 36، activity-1
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
الشكل أدناه يمثل منحنيات الاقترانات ق(س)، هـ(س)، ع(س) المعرفة في الفترة [أ، ب]. حدّد أي الاقترانات السابقة يكون منحناه متزايدًا، وأيها متناقصًا، وأيها ثابتًا في الفترة [أ، ب].

![منحنيات ق، هـ، ع في الفترة أ إلى ب](assets/lessons/mathematics/source-crops/u2-book-p038-activity.webp)
solution:
ق(س) متزايد؛ هـ(س) متناقص؛ ع(س) ثابت.
:::

:::exam-question
id: math-book-p038-activity-2
title: الكتاب، ص 36 · activity-2
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 36، activity-2
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
اعتمادًا على المنحنيات المرفقة، ارسم لكل منحنى مماسًا عند النقطة جـ ومماسًا عند النقطة د.

![منحنيات ق، هـ، ع والنقطتان جـ ود](assets/lessons/mathematics/source-crops/u2-book-p038-activity.webp)
solution:
المماسان لق(س) ميلهما موجب، والمماسان لهـ(س) ميلهما سالب، والمماسان لع(س) أفقيان وميلهما صفر.
:::

:::exam-question
id: math-book-p038-activity-3
title: الكتاب، ص 36 · activity-3
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 36، activity-3
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ما نوع زاوية الميل للمماسات المرسومة عند النقطتين جـ، د في الشكل؟

![منحنيات ق، هـ، ع والنقطتان جـ ود](assets/lessons/mathematics/source-crops/u2-book-p038-activity.webp)
solution:
زاوية ميل مماس ق حادة؛ وزاوية ميل مماس هـ منفرجة؛ وزاوية ميل مماس ع صفر.
:::

:::exam-question
id: math-book-p038-activity-4
title: الكتاب، ص 36 · activity-4
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 36، activity-4
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ما إشارة ظل زاوية ميل المماس لكل من المماسات التي رسمت؟ ولماذا؟

![منحنيات ق، هـ، ع](assets/lessons/mathematics/source-crops/u2-book-p038-activity.webp)
solution:
لق موجبة، ولهـ سالبة، ولع صفر؛ لأن ظل زاوية الميل يساوي ميل المماس.
:::

:::exam-question
id: math-book-p038-activity-5
title: الكتاب، ص 36 · activity-5
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 36، activity-5
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ما إشارة كل من قَ(س)، هـَ(س)، عَ(س) في ]أ، ب[؟

![منحنيات الاقترانات الثلاثة](assets/lessons/mathematics/source-crops/u2-book-p038-activity.webp)
solution:
قَ(س) موجبة، هـَ(س) سالبة، عَ(س) صفر.
:::

:::exam-question
id: math-book-p038-activity-6
title: الكتاب، ص 36 · activity-6
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 36، activity-6
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ما العلاقة بين فترات التزايد والتناقص وإشارة المشتقة الأولى للاقتران؟
solution:
إشارة المشتقة الأولى موجبة في فترات التزايد، وسالبة في فترات التناقص، وتساوي صفرًا للاقتران الثابت.
:::

:::exam-question
id: math-book-p038-ex2
title: الكتاب، ص 36 · ex2
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 36، ex2
answer-label: الحل المطبوع في الكتاب
body:
جد فترات التزايد والتناقص لمنحنى الاقتران إذا علمت بأن \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`، س ∈ ح.
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`. متناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p039-ex4
title: الكتاب، ص 37 · ex4
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 37، ex4
answer-label: الحل المطبوع في الكتاب
body:
عين فترات التزايد والتناقص للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\`، س ≠ −١.
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p039-discuss
title: الكتاب، ص 37 · discuss
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 37، discuss
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
هل يمكن القول إن الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\` متزايد في ح − {−١}؟
solution:
لا؛ مثلًا ق(−٢) = ٣، وق(٠) = −١، مع أن −٢ < ٠. التزايد حاصل على كل فترة من فترتي المجال على حدة.
:::

:::exam-question
id: math-book-p039-ex5
title: الكتاب، ص 37 · ex5
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 37، ex5
answer-label: الحل المطبوع في الكتاب
body:
أثبت أن منحنى الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mrow><mtext dir="rtl">ظا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\` متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mfrac><mtext dir="ltr">−π</mtext><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">[</mo></mrow></math>\`.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mo>+</mo><msup><mrow><mtext dir="rtl">قا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup></mrow></mrow></math>\` وهي موجبة على الفترة، إذن الاقتران متزايد.
:::

:::exam-question
id: math-book-p040-ex6
title: الكتاب، ص 38 · ex6
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 38، ex6
answer-label: الحل المطبوع في الكتاب
body:
عين فترات التزايد والتناقص لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">|</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">|</mo></mrow></mrow></math>\`، س ∈ [−٣، ٢].
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`. متناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow><mo stretchy="true">]</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p040-exercise-1-a
title: الكتاب، ص 38 · exercise-1-a
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 38، exercise-1-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد فترات التزايد والتناقص لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mrow></mrow></math>\`، س ∈ [−٢، ٥].
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`. متناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٥</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p040-exercise-1-b
title: الكتاب، ص 38 · exercise-1-b
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 38، exercise-1-b
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد فترات التزايد والتناقص لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><msup><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup></mrow></mrow></math>\`، س ∈ [٠، π].
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">١</mn><mo>+</mo><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\` ≥ ٠، وتنعدم فقط عند س = ٣π/٤؛ الاقتران متزايد على [٠، π].
:::

:::exam-question
id: math-book-p040-exercise-2
title: الكتاب، ص 38 · exercise-2
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 38، exercise-2
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>−</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، س > −١، فأثبت أن منحنى ق(س) متزايد في ح⁺.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">١</mn></mrow></mfrac></mrow></math>\` > ٠ لكل س > ٠، إذن متزايد في ح⁺.
:::

:::exam-question
id: math-book-p040-exercise-3
title: الكتاب، ص 38 · exercise-3
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 38، exercise-3
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
حدد فترات التزايد والتناقص لمنحنى \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">{</mo><mtable><mtr><mtd><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup></mtd><mtd><mrow><mn dir="ltr">٠</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>&lt;</mo><mn dir="ltr">١</mn></mrow></mtd></mtr><mtr><mtd><mrow><mn dir="ltr">٢</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow></mtd><mtd><mrow><mn dir="ltr">١</mn><mo>≤</mo><mi mathvariant="normal">س</mi><mo>≤</mo><mn dir="ltr">٢</mn></mrow></mtd></mtr></mtable></mrow></mrow></math>\` في [٠، ٢].
solution:
الاقتران متصل عند ١؛ مشتقته ٣س² في ]٠، ١[، و٤س في ]١، ٢[، وكلتاهما موجبة. لذا هو متزايد في [٠، ٢].
:::

:::exam-question
id: math-book-p040-exercise-4
title: الكتاب، ص 38 · exercise-4
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 38، exercise-4
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كانت ق(س)، هـ(س) قابلتين للاشتقاق على ح، وكان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ك</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>+</mo><msup><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mn dir="ltr">٢</mn></msup><mo>+</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow></mrow></math>\`، فحدد فترات التزايد والتناقص لمنحنى ك(س)، علمًا أن قَ(س) = هـ(س)، هـَ(س) = −ق(س).
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">كَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٢</mn><mi mathvariant="normal">س</mi></mrow></mrow></math>\`؛ متناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`، ومتزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p051-ex6-a
title: الكتاب، ص 49 · ex6-a
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 49، ex6-a
answer-label: الحل المطبوع في الكتاب
body:
الشكل المجاور يمثل منحنى قَ(س). اعتمادًا عليه، جد فترات التزايد والتناقص للاقتران ق(س).

![منحنى المشتقة الأولى قَ(س) وعليه القيم −٣، −١، ١، ٣](assets/lessons/mathematics/source-crops/u2-book-p051-ex6.webp)
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومتناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p053-exercise-5-a
title: الكتاب، ص 51 · exercise-5-a
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 51، exercise-5-a
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
ق(س) اقتران متصل في [−٣، ٢]، ق(٠) = ٠، قَ(١) = ٠، قَ(−٢) = ٠، وقً(س) > ٠ عندما س < ٠، وقً(س) < ٠ عندما س > ٠. حدد فترات التزايد والتناقص لمنحنى ق(س).
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`؛ ومتناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">٢</mn></mrow></mrow><mo stretchy="true">]</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`.
:::

:::exam-question
id: math-book-p057-worksheet-1
title: الكتاب، ص 55 · worksheet-1
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 55، worksheet-1
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كانت ق(س)، هـ(س) كثيري حدود معرفين في [٠، ٤]، بحيث إن منحنى ق(س) متناقص في مجاله ويقع في الربع الرابع، ومنحنى هـ(س) متزايد في مجاله ويقع في الربع الأول، أثبت أن منحنى الاقتران ق(س) × هـ(س) متناقص في [٠، ٤].
solution:
لأن ق سالب ومتناقص، و هـ موجب ومتزايد؛ إذا س₁ < س₂ فإن ق(س₁)هـ(س₁) > ق(س₂)هـ(س₁) > ق(س₂)هـ(س₂)، فيكون حاصل الضرب متناقصًا.
:::

:::exam-question
id: math-book-p057-worksheet-3-c
title: الكتاب، ص 55 · worksheet-3-c
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 55، worksheet-3-c
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
الشكل المجاور يمثل منحنى قً(س)، وعلمت أن قَ(٠) = قَ(٦) = ٠. جد فترات التزايد والتناقص لمنحنى ق(س).

![منحنى المشتقة الثانية قً(س) خط مستقيم يقطع محور السينات عند ٢](assets/lessons/mathematics/source-crops/u2-book-p057-worksheet3.webp)
solution:
متزايد في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٠</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٦</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">[</mo></mrow></math>\`؛ ومتناقص في \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٠</mn><mo>،</mo><mn dir="ltr">٦</mn></mrow><mo stretchy="true">[</mo></mrow></math>\`.
:::

:::mcq
id: math-book-p080-test-2
title: الكتاب، ص 78 · test-2
kicker: الكتاب، ص 78 · test-2
reference: الكتاب، ص 78، test-2
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٣</mn></msup><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٤</mn></msup></mrow></mrow></math>\`، فما الفترة التي يكون فيها ق(س) متناقصًا؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">]</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow></mrow><mo stretchy="true">]</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-book-p082-test-6
title: الكتاب، ص 80 · test-6
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 80، test-6
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>+</mo><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، س ∈ [٠، π/٤]، أثبت أن ق(س) متزايد على مجاله.
solution:
قَ(س) = جتا س − جا س ≥ ٠ على [٠، π/٤]، وتكون موجبة في داخل الفترة؛ إذن ق متزايد.
:::

:::exam-question
id: math-book-p082-test-9
title: الكتاب، ص 80 · test-9
question: الاقترانات المتزايدة والمتناقصة
reference: الكتاب، ص 80، test-9
answer-label: إجابة محسوبة من معطيات السؤال وقواعد الكتاب
body:
إذا كان ق(س) كثير حدود معرفًا على [٢، ٦[، ويقع منحناه في الربع الأول ومتناقصًا على مجاله، وكان هـ(س) = ٨ − س، بين أن ك(س) = (ق × هـ)(س) متناقص في [٢، ٦[.
solution:
ك حاصل ضرب اقترانين موجبين متناقصين؛ إذا س₁ < س₂، فإن ق(س₁)هـ(س₁) > ق(س₂)هـ(س₁) > ق(س₂)هـ(س₂)، فيكون ك متناقصًا.
:::

:::mcq
id: math-kamel-u2-p003-r4
title: الكامل، الوحدة 2 · PDF ص 3 · البند 4
kicker: الكامل، الوحدة 2 · PDF ص 3 · البند 4
reference: الكامل، الوحدة 2 · PDF ص 3 · البند 4
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">قَ</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٣</mn></msup><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٤</mn></msup></mrow></mrow></math>\`، فإن ق يكون متناقصًا على الفترة:
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [x] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">١</mn><mo>،</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">]</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mrow><mo>−</mo><mn dir="ltr">١</mn></mrow><mo>،</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p004-r3
title: الكامل، الوحدة 2 · PDF ص 4 · البند 3
kicker: الكامل، الوحدة 2 · PDF ص 4 · البند 3
reference: الكامل، الوحدة 2 · PDF ص 4 · البند 3
question: إذا كان الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`، س ∈ [π/٤، π[، فما الفترة التي يكون فيها الاقتران ق(س) متزايدًا؟
- [x] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mi>π</mi></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mi>π</mi></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٨</mn></mfrac><mo>،</mo><mi>π</mi></mrow><mo stretchy="true">]</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p005-r4
title: الكامل، الوحدة 2 · PDF ص 5 · البند 4
kicker: الكامل، الوحدة 2 · PDF ص 5 · البند 4
reference: الكامل، الوحدة 2 · PDF ص 5 · البند 4
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٨</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٤</mn></msup><msup><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><mn dir="ltr">٥</mn></msup></mrow></mrow></math>\`، فما الفترة التي يكون فيها منحنى الاقتران ق(س) متزايدًا؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mtext dir="ltr">−∞</mtext><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mn dir="ltr">٢</mn><mo>،</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [x] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">]</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mn dir="ltr">٣</mn><mo>،</mo><mo>∞</mo></mrow><mo stretchy="true">]</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::mcq
id: math-kamel-u2-p006-r1
title: الكامل، الوحدة 2 · PDF ص 6 · البند 1
kicker: الكامل، الوحدة 2 · PDF ص 6 · البند 1
reference: الكامل، الوحدة 2 · PDF ص 6 · البند 1
question: إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msub><mtext dir="rtl">لو</mtext><mtext dir="rtl">هـ</mtext></msub><mrow><mo stretchy="true">(</mo><mrow><mtext dir="rtl">قتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`، س ∈ ]π/٤، ٣π/٤]، متى يكون منحنى ق(س) متزايدًا؟
- [ ] option-1 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-2 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٣</mn><mi>π</mi></mrow><mn dir="ltr">٤</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [x] option-3 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٣</mn><mi>π</mi></mrow><mn dir="ltr">٤</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></math>\`
- [ ] option-4 | \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">[</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٤</mn></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٣</mn><mi>π</mi></mrow><mn dir="ltr">٤</mn></mfrac></mrow><mo stretchy="true">[</mo></mrow></math>\`
explanation: الإجابة النهائية: \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mo stretchy="true">]</mo><mrow><mfrac><mi>π</mi><mn dir="ltr">٢</mn></mfrac><mo>،</mo><mfrac><mrow><mn dir="ltr">٣</mn><mi>π</mi></mrow><mn dir="ltr">٤</mn></mfrac></mrow><mo stretchy="true">]</mo></mrow></math>\`.
hint: اقرأ المعطيات وحدد المطلوب، ثم قارن الخيارات.
:::

:::exam-question
id: math-kamel-u2-p007-r1
title: الكامل، الوحدة 2 · PDF ص 7 · البند 1
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 7 · البند 1
answer-label: الإجابة المطبوعة في الكامل
body:
عين فترات التزايد والتناقص للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mo stretchy="true">|</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٤</mn></mrow><mo stretchy="true">|</mo></mrow></mrow></math>\`.
solution:
متزايد في [−٢، ٠]، [٢، ∞[؛ ومتناقص في ]−∞، −٢]، [٠، ٢].
:::

:::exam-question
id: math-kamel-u2-p007-r5
title: الكامل، الوحدة 2 · PDF ص 7 · البند 5
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 7 · البند 5
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان متوسط التغير للاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mi mathvariant="normal">أ</mi><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>+</mo><mi mathvariant="normal">ب</mi><mi mathvariant="normal">س</mi></mrow></mrow></math>\` في الفترة [١، ٣] يساوي ٢٢، وكان لمنحنى الاقتران ق(س) قيمة حرجة عند س = ٢، أوجد قيمة كل من الثابتين أ، ب.
solution:
\`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">أ</mi><mo>=</mo><mn dir="ltr">٢٢</mn></mrow></math>\`، \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mi mathvariant="normal">ب</mi><mo>=</mo><mrow><mo>−</mo><mn dir="ltr">٢٦٤</mn></mrow></mrow></math>\`.
:::

:::exam-question
id: math-kamel-u2-p008-r1
title: الكامل، الوحدة 2 · PDF ص 8 · البند 1
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 8 · البند 1
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mroot><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٣</mn></msup><mo>−</mo><mn dir="ltr">٣</mn><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup></mrow><mn dir="ltr">٣</mn></mroot></mrow></math>\`، أوجد مجالات التزايد والتناقص للاقتران ق(س).
solution:
ق متناقص في [٠، ٢]؛ وق متزايد في ]−∞، ٠]، [٢، ∞[.
:::

:::exam-question
id: math-kamel-u2-p008-r2
title: الكامل، الوحدة 2 · PDF ص 8 · البند 2
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 8 · البند 2
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">(</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">)</mo></mrow><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup></mrow></mrow></math>\`، س ∈ ح، فأوجد مجالات التزايد والتناقص للاقتران ق(س).
solution:
ق متناقص في [−٣، ١]؛ وق متزايد في ]−∞، −٣]، [١، ∞[.
:::

:::exam-question
id: math-kamel-u2-p008-r4
title: الكامل، الوحدة 2 · PDF ص 8 · البند 4
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 8 · البند 4
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mtext dir="rtl">هـ</mtext><mi mathvariant="normal">س</mi></msup><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\` معرفًا في الفترة [٠، π/٢]، فما فترات التزايد والتناقص للاقتران ق(س)؟
solution:
ق متزايد في [٠، π/٤]؛ وق متناقص في [π/٤، π/٢].
:::

:::exam-question
id: math-kamel-u2-p008-r5
title: الكامل، الوحدة 2 · PDF ص 8 · البند 5
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 8 · البند 5
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان ق(س)، هـ(س) اقترانين بحيث قَ(س) + هـ(س) = ٠، و هـَ(س) − ق(س) = ٠، وق(س)، هـ(س) < ٠. عين مجالات التزايد والتناقص لمنحنى الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ع</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mfrac><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo stretchy="true">)</mo></mrow></mrow><mrow><mtext dir="rtl">هـ</mtext><mrow><mo stretchy="true">(</mo><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mo stretchy="true">)</mo></mrow></mrow></mfrac></mrow></math>\` في الفترة [−١/٢، ١/٢].
solution:
متزايد على [−١/٢، ٠]؛ ومتناقص على [٠، ١/٢].
:::

:::exam-question
id: math-kamel-u2-p009-r1
title: الكامل، الوحدة 2 · PDF ص 9 · البند 1
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 9 · البند 1
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mn dir="ltr">٣</mn><mrow><mtext dir="rtl">جا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mrow><mtext dir="rtl">جتا</mtext><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow></mrow></mrow></math>\`، س ∈ [٠، π]، جد فترات التزايد والتناقص لمنحنى الاقتران ق(س).
solution:
متزايد في [٠، π/٤]، [٣π/٤، π]؛ ومتناقص في [π/٤، ٣π/٤].
:::

:::exam-question
id: math-kamel-u2-p009-r3
title: الكامل، الوحدة 2 · PDF ص 9 · البند 3
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 9 · البند 3
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان الاقتران \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><msup><mi mathvariant="normal">س</mi><mn dir="ltr">٢</mn></msup><mrow><mo stretchy="true">|</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">٣</mn></mrow><mo stretchy="true">|</mo></mrow></mrow></mrow></math>\`، س ∈ [−٢، ٥]، جد فترات التزايد والتناقص للاقتران ق(س) على نفس الفترة.
solution:
متناقص في [−٢، ٠]، [٢، ٣]؛ ومتزايد في [٠، ٢]، [٣، ٥].
:::

:::exam-question
id: math-kamel-u2-p009-r6
title: الكامل، الوحدة 2 · PDF ص 9 · البند 6
question: سؤال من المصدر
reference: الكامل، الوحدة 2 · PDF ص 9 · البند 6
answer-label: الإجابة المطبوعة في الكامل
body:
إذا كان \`mathml: <math xmlns="http://www.w3.org/1998/Math/MathML" dir="rtl"><mrow><mrow><mi mathvariant="normal">ق</mi><mrow><mo stretchy="true">(</mo><mi mathvariant="normal">س</mi><mo stretchy="true">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><mo stretchy="true">|</mo><mrow><mi mathvariant="normal">س</mi><mo>−</mo><mn dir="ltr">١</mn></mrow><mo stretchy="true">|</mo></mrow><mrow><mo stretchy="true">(</mo><mrow><mi mathvariant="normal">س</mi><mo>+</mo><mn dir="ltr">٢</mn></mrow><mo stretchy="true">)</mo></mrow></mrow></mrow></math>\`، أوجد مجالات التزايد والتناقص للاقتران ق(س).
solution:
ق متزايد في ]−∞، −١/٢]، [١، ∞[؛ وق متناقص في [−١/٢، ١].
:::
`;

export default defineMarkdownLesson({
  "status": "published",
  "language": "ar",
  "title": "الاقترانات المتزايدة والمتناقصة",
  "summary": "أسئلة من الكتاب والكامل بإجابات موثقة من المصادر.",
  "outcome": "مراجعة الاقترانات المتزايدة والمتناقصة من الأسئلة الأصلية.",
  "mode": "أسئلة وبطاقات",
  "duration": "29 أسئلة",
  "level": "الثاني عشر · العلمي",
  "reward": 10
}, lessonSource);
