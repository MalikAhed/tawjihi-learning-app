import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

// Temporary, authored display samples; no textbook content or unit divisions.
export const lessonSource = String.raw`
:::mcq
id: physics-latex-mcq
title: تجربة مؤقتة — اختيار من متعدد
kicker: اختبار عرض فقط
question: جسم كتلته \(m=2\,\mathrm{kg}\) يتحرك بسرعة \(v=3\,\mathrm{m\,s^{-1}}\). ما طاقته الحركية \(K=\frac{1}{2}mv^2\)؟
- [ ] six | الطاقة \(K=6\,\mathrm{J}\)
- [x] nine | الطاقة \(K=9\,\mathrm{J}\)
- [ ] eighteen | الطاقة \(K=18\,\mathrm{J}\)
explanation: نعوّض الكتلة والسرعة: \(K=\frac{1}{2}\times2\times3^2=9\,\mathrm{J}\)، فتكون الإجابة الثانية صحيحة.
hint: ربّع السرعة \(v^2\) أولًا، ثم اضرب في \(\frac{m}{2}\).
:::

:::exam-question
id: physics-latex-card
title: تجربة مؤقتة — بطاقة مراجعة
question: اختبار رموز الفيزياء داخل بطاقة
reference: مثال تجريبي مؤلف لاختبار العرض؛ ليس من الكتاب.
answer-label: حل تعليمي تجريبي
body:
بروتون شحنته \(q=+1.60\times10^{-19}\,\mathrm{C}\) يتحرك بسرعة \(\vec{v}=3.00\times10^5\,\hat{\mathbf{x}}\,\mathrm{m\,s^{-1}}\) داخل مجال \(\vec{B}=0.200\,\hat{\mathbf{z}}\,\mathrm{T}\). ما مقدار القوة المغناطيسية واتجاهها؟

استخدم \(\vec{F}_B=q\,\vec{v}\times\vec{B}\)، حيث الزاوية \(\theta=90^\circ\). ثم فسّر لماذا لا يغيّر المجال المغناطيسي الطاقة الحركية.

\[
|\vec{F}_B|=qvB\sin\theta,\qquad K=\frac12mv^2.
\]
solution:
**المقدار والاتجاه:** لأن \(\hat{\mathbf{x}}\times\hat{\mathbf{z}}=-\hat{\mathbf{y}}\)، تتجه القوة نحو المحور الصادي السالب:

\[
\begin{aligned}
|\vec{F}_B|&=(1.60\times10^{-19})(3.00\times10^5)(0.200)\\
&=9.60\times10^{-15}\,\mathrm{N},\\
\vec{F}_B&=-9.60\times10^{-15}\,\hat{\mathbf{y}}\,\mathrm{N}.
\end{aligned}
\]

**الطاقة:** القوة عمودية على السرعة، لذلك \(\vec{F}_B\cdot\vec{v}=0\)، ومن ثم:

$$
W_B=\int\vec{F}_B\cdot\mathrm{d}\vec{\ell}=0,\qquad \frac{\mathrm{d}K}{\mathrm{d}t}=0\quad\Longrightarrow\quad\Delta K=0.
$$

**رموز إضافية لاختبار العرض فقط:** كسر وجذر وعدم يقين \(v=(3.00\pm0.02)\times10^5\,\mathrm{m\,s^{-1}}\)، والعلاقة \(v=\sqrt{\frac{2K}{m}}\).

\[
\begin{pmatrix}v_x\\v_y\end{pmatrix}=\begin{pmatrix}v\cos\theta\\v\sin\theta\end{pmatrix},\qquad
E(x)=\begin{cases}E_0,&0\le x\le d,\\0,&\text{otherwise}.\end{cases}
\]
:::
`;

export default defineMarkdownLesson({
  status:"published", language:"ar",
  title:"اختبار LaTeX — مؤقت",
  summary:"سؤال اختيار من متعدد وبطاقة لاختبار المعادلات والنص العربي؛ بانتظار فهرس الكتاب.",
  outcome:"مراجعة عرض LaTeX قبل اعتماد محتوى الفيزياء.",
  mode:"اختبار عرض", mission:"اختبار المعادلات داخل السؤال والإجابات والبطاقة.",
  duration:"دقيقتان", level:"تجريبي", reward:0, passingScore:80,
}, lessonSource);
