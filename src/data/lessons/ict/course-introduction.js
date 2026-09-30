import { defineMarkdownLesson } from "../../../markdown/lesson-model.js";

export const LESSON_MARKDOWN = `<!-- step-id: meet-rocky -->
<!-- presentation: rocky-dialogue -->
# قبل أن نبدأ

![روكي يلوّح مرحبًا بالطالب](assets/mascot/rocky-wave.svg)

:::note روكي
سنشاهد فيديو يعرّفنا بأنماط الأسئلة. لا تقلق بشأن التفاصيل، سنشرحها لاحقًا.
:::

<!-- lesson-step -->
<!-- step-id: course-introduction-video -->
<!-- presentation: video-intro -->
# مقدمة للمادة

https://www.youtube.com/watch?v=d3gaYsONaIc&t=702s&skip=0-702,949-987,1047-1161,1328-1473,1528-1595

هذا الفيديو **نظرة عامة فقط**. إذا بدت بعض المصطلحات غير واضحة، فلا تقلق؛ سنشرح المهم منها بالتفصيل في الدروس التالية.

**لطلاب غزة:** يتحدث التسجيل عن امتحان الضفة 2024–2025، وفيه تعليمات وموضوعات لا تخص رزمة غزة. اعتمد على الكتاب والدروس المرفقة.

**الكتاب المعتمد:** [تحميل PDF](assets/books/ict.pdf#page=2)

**ملخص الأستاذ حازم قرعاوي:** [تحميل PDF](assets/books/summary.pdf#page=1)

- **\`قواعد البيانات\`:** الجداول، المفاتيح، العلاقات، ومخطط \`ERD\`.
- **\`SQL\`:** كتابة الاستعلامات، فهمها، وتصحيح أخطائها. شاشات تصميم الاستعلامات للاطلاع؛ التركيز في كتابنا على أوامر \`SQL\`.
- **\`تطبيقات الهاتف\`:** أدوات \`App Inventor\` وخصائصها واللبنات والأحداث البرمجية.
- **\`الشبكات\`:** وظيفة طبقات \`الجلسة\` و\`العرض\` و\`التطبيق\` في نموذج \`OSI\`.
- **خارج مسارنا:** تفاصيل النماذج والتقارير، والرسم ثلاثي الأبعاد والروبوت، وإعداد الشبكة المنزلية.
- [11:42 — قواعد البيانات والعلاقات](https://www.youtube.com/watch?v=d3gaYsONaIc&t=702s)
- [14:22 — استعلامات SQL](https://www.youtube.com/watch?v=d3gaYsONaIc&t=862s)
- [19:21 — تطبيقات الهاتف](https://www.youtube.com/watch?v=d3gaYsONaIc&t=1161s)
- [24:33 — طبقات OSI العليا](https://www.youtube.com/watch?v=d3gaYsONaIc&t=1473s)
`;

export default defineMarkdownLesson({
  status:"published",
  title:"مقدمة للمادة",
  summary:"تعرّف إلى طريقة الدراسة وحدود الرزمة التعليمية المعتمدة.",
  outcome:"التعرّف إلى المادة قبل بدء الدروس.",
  mode:"شاهد → ابدأ",
  mission:"الاستعداد لبدء مادة تكنولوجيا المعلومات.",
  duration:"26 دقيقة للفيديو الكامل",
  level:"تمهيدي",
  reward:0,
  passingScore:80,
}, LESSON_MARKDOWN);
