export const COURSE_SUBJECTS = Object.freeze([
  { id:"ict", name:"تكنولوجيا المعلومات", status:"available" },
  { id:"mathematics", name:"الرياضيات 1", status:"available", artwork:"mathematics" },
  { id:"mathematics-2", name:"الرياضيات 2", status:"available", artwork:"mathematics" },
  { id:"physics", name:"الفيزياء", status:"available" },
  { id:"biology", name:"الأحياء", status:"available" },
  { id:"chemistry", name:"الكيمياء", status:"available", artwork:"chemistry" },
  { id:"english", name:"اللغة الإنجليزية", status:"unpublished" },
  { id:"arabic", name:"اللغة العربية", status:"unpublished" },
  { id:"islamic-education", name:"التربية الإسلامية", status:"available" },
]);

export const TOTAL_SUBJECTS = COURSE_SUBJECTS.length;

export function getCourseSubject(subjectId) {
  return COURSE_SUBJECTS.find(({ id }) => id === subjectId) || null;
}

// Compatibility scale used by existing learner ranks; independent of the ICT catalog.
export const TOTAL_DAYS = 112;
