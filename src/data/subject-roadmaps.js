const ICT_ROADMAP = Object.freeze({
  subjectId:"ict",
  units:Object.freeze([
    Object.freeze({
      id:"unit-1",
      label:"الوحدة الأولى: قواعد البيانات",
      lessons:Object.freeze([
        Object.freeze({
          id:"database-management",
          label:"الدرس الأول: إدارة قواعد البيانات",
          summary:"التعرّف إلى إدارة قواعد البيانات وبناء الجداول والعلاقات باستخدام Microsoft Access.",
          xp:10,
        }),
        Object.freeze({
          id:"sql-queries",
          label:"الدرس الثاني: الاستعلامات ولغة SQL",
          summary:"التعرّف إلى الاستعلامات وأساسيات لغة SQL للتعامل مع البيانات.",
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
          xp:10,
        }),
        Object.freeze({
          id:"my-mobile-app",
          label:"الدرس الثاني: تطبيقي الخاص على هاتفي",
          summary:"تطوير تطبيق هاتف ذكي وتحويل فكرته إلى تطبيق يعمل على الهاتف.",
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
