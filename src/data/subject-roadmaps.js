const ICT_ROADMAP = Object.freeze({
  subjectId:"ict",
  units:Object.freeze([
    Object.freeze({
      id:"unit-1",
      label:"الوحدة الأولى: قواعد البيانات",
      lessons:Object.freeze([
        Object.freeze({
          id:"course-introduction",
          label:"الدرس 0: مقدمة المسار",
          summary:"تعرّف إلى طريقة عمل الدروس والأسئلة والتقدّم والمراجعة قبل بدء محتوى الكتاب.",
          optional:true,
          recommended:true,
          parts:Object.freeze([
            Object.freeze({ id:"getting-started", label:"ابدأ من هنا: كيف تعمل الدروس؟", pages:"تمهيد", number:0, startStepId:"meet-rocky" }),
          ]),
          xp:0,
        }),
        Object.freeze({
          id:"database-management",
          label:"الدرس الأول: إدارة قواعد البيانات",
          summary:"التعرّف إلى إدارة قواعد البيانات وبناء الجداول والعلاقات باستخدام Microsoft Access.",
          parts:Object.freeze([
            Object.freeze({ id:"access-basics", label:"برامج إدارة البيانات وبيئة Access", pages:"3–5", startStepId:"database-management-mission" }),
            Object.freeze({ id:"tables-and-types", label:"الجداول والحقول وأنواع البيانات", pages:"6–7", startStepId:"tables-fields-records" }),
            Object.freeze({ id:"keys-and-relations", label:"المفاتيح والعلاقات بين الجداول", pages:"7–9", startStepId:"keys-identity" }),
            Object.freeze({ id:"education-center", label:"تطبيق: قاعدة بيانات مركز تعليمي", pages:"8–10", startStepId:"education-center-model" }),
            Object.freeze({ id:"build-and-integrity", label:"التكامل المرجعي وبناء القاعدة", pages:"7–10", startStepId:"referential-integrity" }),
            Object.freeze({ id:"practice-and-review", label:"تطبيق المستشفى ومراجعة الدرس", pages:"11", startStepId:"hospital-transfer" }),
          ]),
          xp:10,
        }),
        Object.freeze({
          id:"sql-queries",
          label:"الدرس الثاني: الاستعلامات ولغة SQL",
          summary:"التعرّف إلى الاستعلامات وأساسيات لغة SQL للتعامل مع البيانات.",
          parts:Object.freeze([
            Object.freeze({ id:"sql-introduction", label:"لغة SQL وأنواع الاستعلامات", pages:"12–15" }),
            Object.freeze({ id:"select-order", label:"اختيار البيانات وترتيبها", pages:"16–19" }),
            Object.freeze({ id:"where-conditions", label:"الشروط والمعاملات", pages:"19–22" }),
            Object.freeze({ id:"related-tables", label:"الاستعلام من جداول مترابطة", pages:"23–25" }),
            Object.freeze({ id:"update-queries", label:"استعلامات التحديث", pages:"25–27" }),
            Object.freeze({ id:"insert-queries", label:"الإدخال والإلحاق", pages:"27–29" }),
            Object.freeze({ id:"delete-review", label:"استعلامات الحذف ومراجعة الدرس", pages:"30–33" }),
          ]),
          xp:10,
        }),
      ]),
    }),
    Object.freeze({
      id:"unit-2",
      label:"الوحدة الثانية: تطبيقات الهاتف الذكي",
      lessons:Object.freeze([
        Object.freeze({
          id:"smartphone-operating-systems",
          label:"الدرس الأول: أنظمة تشغيل الهاتف الذكي",
          summary:"التعرّف إلى أنظمة تشغيل الهواتف الذكية وخصائصها والمقارنة بينها.",
          parts:Object.freeze([
            Object.freeze({ id:"android-features", label:"نظام أندرويد وميزاته", pages:"36–37" }),
            Object.freeze({ id:"files-sensors", label:"نقل الملفات والمستشعرات", pages:"38–39" }),
            Object.freeze({ id:"augmented-reality", label:"الواقع المعزز", pages:"40" }),
            Object.freeze({ id:"ios-files", label:"نظام iOS ونقل الملفات", pages:"40–41" }),
            Object.freeze({ id:"app-types-review", label:"أنواع التطبيقات والمقارنة بين الأنظمة", pages:"41–42" }),
          ]),
          xp:10,
        }),
        Object.freeze({
          id:"my-mobile-app",
          label:"الدرس الثاني: تطبيقي الخاص على هاتفي",
          summary:"تطوير تطبيق هاتف ذكي وتحويل فكرته إلى تطبيق يعمل على الهاتف.",
          parts:Object.freeze([
            Object.freeze({ id:"bmi-interface", label:"تطبيق معامل السمنة: تصميم الواجهة", pages:"43–44" }),
            Object.freeze({ id:"bmi-blocks", label:"تطبيق معامل السمنة: البرمجة والشروط", pages:"45–46" }),
            Object.freeze({ id:"calculator-interface", label:"الآلة الحاسبة: الواجهة والمتغيرات", pages:"47–50" }),
            Object.freeze({ id:"calculator-events", label:"الآلة الحاسبة: الأحداث والعمليات", pages:"50–51" }),
            Object.freeze({ id:"app-practice", label:"تدريبات التطبيقات", pages:"52" }),
          ]),
          xp:10,
        }),
      ]),
    }),
    Object.freeze({
      id:"unit-4",
      label:"الوحدة الرابعة: شبكات الاتصال",
      lessons:Object.freeze([
        Object.freeze({
          id:"osi-model-layers",
          label:"الدرس الأول: طبقات نموذج OSI",
          summary:"التعرّف إلى الطبقات العليا في نموذج OSI ووظيفة كل طبقة.",
          parts:Object.freeze([
            Object.freeze({ id:"upper-layers", label:"الطبقات العليا وطبقة الجلسة", pages:"55" }),
            Object.freeze({ id:"session-services", label:"أنماط التخاطب وخدمات الجلسة", pages:"55–57" }),
            Object.freeze({ id:"presentation-layer", label:"طبقة التقديم وتمثيل البيانات", pages:"58–59" }),
            Object.freeze({ id:"application-layer", label:"طبقة التطبيقات والبروتوكولات", pages:"59–60" }),
            Object.freeze({ id:"osi-review", label:"مراجعة وظائف الطبقات", pages:"60" }),
          ]),
          xp:10,
        }),
      ]),
    }),
  ]),
});

export function getSubjectRoadmap(subjectId) {
  return subjectId === ICT_ROADMAP.subjectId ? ICT_ROADMAP : null;
}

export function getSubjectRoadmapLesson(subjectId, lessonId) {
  const roadmap = getSubjectRoadmap(subjectId);
  return roadmap?.units.flatMap(({ lessons }) => lessons).find(({ id }) => id === lessonId) || null;
}
