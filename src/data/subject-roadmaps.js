import { MATHEMATICS_LESSONS } from "./lessons/mathematics/math-course.js";
import { PHYSICS_LESSONS } from "./lessons/physics/physics-course.js";
import { CHEMISTRY_LESSONS, ISLAMIC_LESSONS, ISLAMIC_LEGACY_LESSONS, BIOLOGY_LESSONS } from "./subject-catalog.js";

const ICT_ROADMAP = Object.freeze({
  subjectId:"ict",
  units:Object.freeze([
    Object.freeze({
      id:"unit-1",
      label:"الوحدة الأولى: قواعد البيانات",
      lessons:Object.freeze([
        Object.freeze({
          id:"course-introduction",
          hidden:true,
          label:"مقدمة المادة",
          summary:"طريقة الدراسة وحدود الرزمة التعليمية المعتمدة.",
          optional:true,
          parts:Object.freeze([
            Object.freeze({ id:"getting-started", label:"مقدمة للمادة", pages:"تمهيد", number:"-", startStepId:"meet-rocky" }),
          ]),
          xp:0,
        }),
        Object.freeze({
          id:"database-management",
          pages:"3–11",
          label:"الدرس الأول: برنامج إدارة قواعد البيانات",
          summary:"التعرّف إلى إدارة قواعد البيانات وبناء الجداول والعلاقات باستخدام Microsoft Access.",
          parts:Object.freeze([
            Object.freeze({ id:"access-basics", label:"برامج إدارة البيانات وبيئة Access", pages:"3–5", startStepId:"database-management-mission" }),
            Object.freeze({ id:"tables-and-types", label:"التعامل مع Access وإنشاء جدول", pages:"4–7", startStepId:"tables-fields-records" }),
            Object.freeze({ id:"keys-and-relations", label:"المفاتيح والعلاقات بين الجداول", pages:"6–11", startStepId:"keys-identity" }),
            Object.freeze({ id:"build-and-integrity", label:"التكامل المرجعي وبناء القاعدة", pages:"7–8", startStepId:"referential-integrity" }),
            Object.freeze({ id:"education-center", label:"تطبيق: قاعدة بيانات مركز تعليمي", pages:"8–10", startStepId:"education-center-model" }),
            Object.freeze({ id:"engineering-office", label:"تطبيق: المكتب الهندسي", pages:"10", startStepId:"engineering-office-intro" }),
            Object.freeze({ id:"practice-and-review", label:"تدريب من الكتاب: المستشفى ومراجعة الوحدة", pages:"11، 34", startStepId:"hospital-transfer" }),
          ]),
          xp:10,
        }),
        Object.freeze({
          id:"sql-queries",
          pages:"12–34",
          label:"الدرس الثاني: الاستعلامات ولغة SQL",
          summary:"التعرّف إلى الاستعلامات وأساسيات لغة SQL للتعامل مع البيانات.",
          parts:Object.freeze([
            Object.freeze({ id:"sql-introduction", label:"لغة SQL وأنواع الاستعلامات", pages:"12–15", startStepId:"sql-introduction-mission" }),
            Object.freeze({ id:"select-order", label:"اختيار البيانات وترتيبها", pages:"16–20", startStepId:"sql-select-order-mission" }),
            Object.freeze({ id:"where-conditions", label:"الشروط والمعاملات", pages:"14–15، 18–21، 25", startStepId:"sql-where-conditions-mission" }),
            Object.freeze({ id:"order-practice", label:"فرز النتائج بـ ORDER BY", pages:"16، 18–19", startStepId:"sql-order-practice-mission" }),
            Object.freeze({ id:"related-tables", label:"الاستعلام من جداول مترابطة", pages:"21–23", startStepId:"sql-related-tables-mission" }),
            Object.freeze({ id:"count-parameters", label:"تدريب من الكتاب: COUNT والمعاملات", pages:"23–25", startStepId:"sql-count-parameters-mission" }),
            Object.freeze({ id:"update-queries", label:"استعلامات التحديث", pages:"25–27، 34", startStepId:"sql-update-queries-mission" }),
            Object.freeze({ id:"insert-queries", label:"الإدخال والإلحاق", pages:"27–29", startStepId:"sql-insert-queries-mission" }),
            Object.freeze({ id:"delete-review", label:"استعلامات الحذف ومراجعة الدرس", pages:"30–33", startStepId:"sql-delete-review-mission" }),
            Object.freeze({ id:"sql-questions", label:"أسئلة مراجعة الاستعلامات", pages:"12–33", startStepId:"sql-questions-video-mission" }),
            Object.freeze({ id:"sql-practical", label:"تدريب عملي على أوامر SQL", pages:"12–33", startStepId:"sql-practical-video-mission" }),
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
          pages:"36–42",
          label:"الدرس الأول: أنظمة تشغيل الهاتف الذكي",
          summary:"التعرّف إلى أنظمة تشغيل الهواتف الذكية وخصائصها والمقارنة بينها.",
          parts:Object.freeze([
            Object.freeze({ id:"android-features", aliases:Object.freeze(["files-sensors", "augmented-reality"]), label:"أندرويد ونقل الملفات والمجسات وVR وAR", pages:"36–40", startStepId:"android-features-mission" }),
            Object.freeze({ id:"ios-files", aliases:Object.freeze(["app-types-review"]), label:"iOS ونقل الملفات وأنواع التطبيقات", pages:"40–42، 53", startStepId:"ios-files-mission" }),
          ]),
          xp:10,
        }),
        Object.freeze({
          id:"my-mobile-app",
          pages:"43–53",
          label:"الدرس الثاني: تطبيقي الخاص على هاتفي",
          summary:"تطوير تطبيق هاتف ذكي وتحويل فكرته إلى تطبيق يعمل على الهاتف.",
          parts:Object.freeze([
            Object.freeze({ id:"app-inventor-tools", label:"أدوات App Inventor وخصائص الواجهة", pages:"43–44، 47–49", startStepId:"app-inventor-tools-mission" }),
            Object.freeze({ id:"app-inventor-blocks", label:"اللبنات والأحداث والمتغيرات", pages:"44–46، 49–51", startStepId:"app-inventor-blocks-mission" }),
            Object.freeze({ id:"bmi-interface", aliases:Object.freeze(["bmi-blocks"]), label:"تطبيق معامل السمنة: الواجهة والبرمجة", pages:"43–46، 52", startStepId:"bmi-interface-mission" }),
            Object.freeze({ id:"calculator-interface", label:"تطبيق العمليات الحسابية البسيطة", pages:"47–51", startStepId:"calculator-interface-mission" }),
            Object.freeze({ id:"calculator-events", label:"تطوير الحاسبة: الأرقام والدوال الإضافية", pages:"52", startStepId:"calculator-events-mission" }),
            Object.freeze({ id:"app-practice", label:"مراجعة تطبيقات الهاتف وتتبع اللبنات", pages:"43–53", startStepId:"app-practice-mission" }),
          ]),
          xp:10,
        }),
      ]),
    }),
    Object.freeze({
      id:"unit-4",
      label:"الوحدة الثالثة: شبكات الاتصال",
      lessons:Object.freeze([
        Object.freeze({
          id:"osi-model-layers",
          pages:"55–60",
          label:"الدرس الأول: طبقات نموذج OSI",
          summary:"التعرّف إلى الطبقات العليا في نموذج OSI ووظيفة كل طبقة.",
          parts:Object.freeze([
            Object.freeze({ id:"upper-layers", aliases:Object.freeze(["session-services"]), label:"طبقات OSI العليا وطبقة الجلسة", pages:"55–57", startStepId:"upper-layers-mission" }),
            Object.freeze({ id:"presentation-layer", aliases:Object.freeze(["application-layer", "osi-review"]), label:"طبقتا التقديم والتطبيقات والبروتوكولات", pages:"58–60", startStepId:"presentation-layer-mission" }),
          ]),
          xp:10,
        }),
      ]),
    }),
  ]),
});

function mathematicsRoadmap(subjectId, units) {
  return Object.freeze({
    subjectId,
    questionsOnly:true,
    units:Object.freeze(units.map(({ unit, label }) => Object.freeze({
      id:`math-unit-${unit}`,
      label,
      lessons:Object.freeze(MATHEMATICS_LESSONS.filter(lesson => lesson.subjectId === subjectId && lesson.unit === unit).map(lesson => Object.freeze({
        id:lesson.id, label:lesson.label, pages:lesson.pages,
        summary:"أسئلة من الكتاب والكامل بإجابات موثقة من المصادر.",
        xp:10,
        parts:Object.freeze([Object.freeze({
          id:`${lesson.id}-practice`, label:lesson.label, pages:lesson.pages,
          startStepId:lesson.questionIds[0], questionIds:[...lesson.questionIds],
        })]),
      }))),
    }))),
  });
}

const MATHEMATICS_ROADMAP = mathematicsRoadmap("mathematics", [
  { unit:1, label:"الوحدة الأولى: التفاضل" },
  { unit:2, label:"الوحدة الثانية: تطبيقات التفاضل" },
]);
const MATHEMATICS_2_ROADMAP = mathematicsRoadmap("mathematics-2", [
  { unit:3, label:"الوحدة الأولى: التكامل" },
  { unit:2, label:"الوحدة الثانية: المصفوفات" },
]);

// Remove the temporary level from view with this switch; keep its IDs and source.
export const PHYSICS_LATEX_TEST_VISIBLE = false;
const PHYSICS_DISPLAY_TEST = Object.freeze({
  id:"latex-test",
  hidden:!PHYSICS_LATEX_TEST_VISIBLE,
  label:"اختبار LaTeX: سؤال وبطاقة",
  summary:"اختبار عرض فقط؛ ليس من المنهج المعتمد.",
  pages:"تجربة عرض",
  optional:true,
  xp:0,
  parts:Object.freeze([Object.freeze({
    id:"latex-test-practice", label:"اختبار العرض", pages:"تجربة عرض",
    startStepId:"physics-latex-mcq",
    questionIds:Object.freeze(["physics-latex-mcq", "physics-latex-card"]),
  })]),
});
const PHYSICS_ROADMAP = Object.freeze({
  subjectId:"physics",
  questionsOnly:true,
  units:Object.freeze([
    { unit:1, label:"الوحدة الأولى: الميكانيكا" },
    { unit:2, label:"الوحدة الثانية: الكهرباء المتحركة" },
    { unit:3, label:"الوحدة الثالثة: الكهرومغناطيسية" },
  ].map(({ unit, label }) => Object.freeze({
    id:`physics-unit-${unit}`, label,
    lessons:Object.freeze([
      ...(unit === 1 ? [PHYSICS_DISPLAY_TEST] : []),
      ...PHYSICS_LESSONS.filter(lesson => lesson.unit === unit).map(lesson => Object.freeze({
        id:lesson.id, label:lesson.label, pages:lesson.pages,
        summary:"أسئلة من التصنيف ضمن دروس الرزمة التعليمية المعتمدة.",
        xp:10,
        parts:Object.freeze([Object.freeze({
          id:`${lesson.id}-practice`, label:lesson.label, pages:lesson.pages,
          startStepId:lesson.questionIds[0], questionIds:lesson.questionIds,
        })]),
      })),
    ]),
  }))),
});

const CHEMISTRY_ROADMAP = Object.freeze({
  subjectId: "chemistry",
  questionsOnly: true,
  units: Object.freeze([
    { unit: 1, label: "الوحدة الأولى: البناء الإلكتروني والعدد الكمي" },
    { unit: 2, label: "الوحدة الثانية: الجدول الدوري ورابطة التكافؤ" },
    { unit: 3, label: "الوحدة الثالثة: الحموض والقواعد" },
    { unit: 4, label: "الوحدة الرابعة: الديناميكا الحرارية وحركية التفاعل" },
    { unit: 5, label: "الوحدة الخامسة: الكيمياء العضوية" },
    { unit: 6, label: "الوحدة السادسة: الخلايا والتحليل الكهربائي" },
  ].map(({ unit, label }) => Object.freeze({
    id: `chemistry-unit-${unit}`,
    label,
    lessons: Object.freeze(CHEMISTRY_LESSONS.filter(lesson => lesson.unit === unit).map(lesson => Object.freeze({
      id: lesson.id,
      label: lesson.title,
      pages: lesson.pages,
      summary: "أسئلة وبطاقات من تصنيف الكيمياء الوزاري (Al Tasnif)، مع رجوع مباشر إلى صفحة الإجابات في نهاية الوحدة.",
      xp: 10,
      parts: Object.freeze([Object.freeze({
        id: `${lesson.id}-practice`,
        label: lesson.title,
        pages: lesson.pages,
        startStepId: lesson.questionIds[0],
        questionIds: lesson.questionIds,
      })]),
    }))),
  }))),
});

const ISLAMIC_ROADMAP = Object.freeze({
  subjectId:"islamic-education",
  questionsOnly:true,
  units:Object.freeze([1, 2, 3, 4, 5].map(unit => {
    const lessons = ISLAMIC_LESSONS.filter(lesson => lesson.unit === unit);
    return Object.freeze({
      id:`islamic-unit-${unit}`,
      label:lessons[0]?.unitKey === "quran" ? "الوحدة الأولى: القرآن الكريم"
        : lessons[0]?.unitKey === "aqidah" ? "الوحدة الثانية: العقيدة الإسلامية"
          : lessons[0]?.unitKey === "hadith" ? "الوحدة الثالثة: الحديث الشريف"
            : lessons[0]?.unitKey === "sirah" ? "الوحدة الرابعة: السير والتراجم"
              : "الوحدة الخامسة: الفقه الإسلامي",
      lessons:Object.freeze(lessons.map(lesson => Object.freeze({
        id:lesson.id, label:lesson.label, pages:lesson.pages,
        summary:"أسئلة ملف 2022 المطابقة لموضوع الدرس في الرزمة التعليمية الرسمية؛ وتظهر رسالة مصدر للدروس التي لا يورد لها الملف أسئلة.",
        xp:10,
        parts:Object.freeze(lesson.parts.map(part => Object.freeze({
          ...part, questionIds:[...part.questionIds],
        }))),
      }))),
    });
  })),
});

const BIOLOGY_ROADMAP = Object.freeze({
  subjectId:"biology",
  questionsOnly:true,
  units:Object.freeze([
    { unit:1, label:"الوحدة الأولى: تدفق الطاقة ومن الجين إلى البروتين" },
    { unit:2, label:"الوحدة الثانية: الوراثة" },
    { unit:3, label:"الوحدة الثالثة: أجهزة جسم الإنسان" },
    { unit:4, label:"الوحدة الرابعة: البكتيريا والفيروسات" },
    { unit:5, label:"أرشيف أسئلة الامتحانات والملزمات" },
  ].map(({ unit, label }) => Object.freeze({
    id:`biology-unit-${unit}`, label,
    lessons:Object.freeze(BIOLOGY_LESSONS.filter(lesson => lesson.unit === unit).map(lesson => Object.freeze({
      id:lesson.id, label:lesson.label, pages:lesson.pages,
      summary:lesson.unit === 5
        ? "أرشيف أسئلة وطنية وملزمات معاد فحصها؛ استخدم دروس الوحدات الأربع لحدود رزمة غزة 2026."
        : "أسئلة الرزمة الرسمية 2024 وأسئلة وزارية مصنفة ضمن نطاق غزة 2026.",
      xp:10,
      parts:Object.freeze([Object.freeze({
        id:`${lesson.id}-practice`, label:lesson.label, pages:lesson.pages,
        startStepId:lesson.questionIds[0], questionIds:[...lesson.questionIds],
      })]),
    }))),
  }))),
});

export function getSubjectRoadmap(subjectId) {
  if (subjectId === ICT_ROADMAP.subjectId) return ICT_ROADMAP;
  if (subjectId === MATHEMATICS_ROADMAP.subjectId) return MATHEMATICS_ROADMAP;
  if (subjectId === MATHEMATICS_2_ROADMAP.subjectId) return MATHEMATICS_2_ROADMAP;
  if (subjectId === PHYSICS_ROADMAP.subjectId) return PHYSICS_ROADMAP;
  if (subjectId === CHEMISTRY_ROADMAP.subjectId) return CHEMISTRY_ROADMAP;
  if (subjectId === ISLAMIC_ROADMAP.subjectId) return ISLAMIC_ROADMAP;
  if (subjectId === BIOLOGY_ROADMAP.subjectId) return BIOLOGY_ROADMAP;
  return null;
}

export function getSubjectRoadmapLesson(subjectId, lessonId) {
  const roadmap = getSubjectRoadmap(subjectId);
  const lesson = roadmap?.units.flatMap(({ lessons }) => lessons).find(({ id }) => id === lessonId);
  if (lesson) return lesson;
  return subjectId === "islamic-education"
    ? ISLAMIC_LEGACY_LESSONS.find(lesson => lesson.id === lessonId) || null
    : null;
}
