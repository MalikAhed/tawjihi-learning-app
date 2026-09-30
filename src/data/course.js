export const COURSE_SUBJECTS = Object.freeze([
  { id:"ict", name:"تكنولوجيا المعلومات", status:"available" },
  { id:"mathematics", name:"الرياضيات 1", status:"available", artwork:"mathematics" },
  { id:"mathematics-2", name:"الرياضيات 2", status:"unpublished", artwork:"mathematics" },
  { id:"physics", name:"الفيزياء", status:"unpublished" },
  { id:"biology", name:"الأحياء", status:"unpublished" },
  { id:"chemistry", name:"الكيمياء", status:"unpublished" },
  { id:"english", name:"اللغة الإنجليزية", status:"unpublished" },
  { id:"arabic", name:"اللغة العربية", status:"unpublished" },
  { id:"islamic-education", name:"التربية الإسلامية", status:"unpublished" },
]);

export const TOTAL_SUBJECTS = COURSE_SUBJECTS.length;

export function getCourseSubject(subjectId) {
  return COURSE_SUBJECTS.find(({ id }) => id === subjectId) || null;
}

// Compatibility scale used by existing learner ranks; independent of the ICT catalog.
export const TOTAL_DAYS = 112;
