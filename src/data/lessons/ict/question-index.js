// Question identities only: Home and the roadmap never download the question banks.
// Regenerate after curriculum edits: node scripts/update-ict-question-index.mjs
const PART_QUESTION_IDS = Object.freeze({
  "getting-started":[],
  "access-basics":["exam-p09-q1-1","exam-p57-q1-b2","exam-p59-q4-b2","exam-p61-q6-a2","exam-p71-q6-a3","past-p6-q1-1","past-p6-q1-2","classified-p06-q1-08","classified-p08-q1-21","classified-p08-q1-25","exam-p11-q3-a1-components","exam-p16-q6-c2","exam-p57-q1-d1","exam-p57-q2-a-forms","exam-p61-q6-b","exam-p69-q2-b","exam-p74-q2-d1","book-p13-q1-components","classified-p10-q2-01","classified-p10-q2-07","classified-p10-q2-08"],
  "tables-and-types":["exam-p57-q1-b4","exam-p59-q3-d2","exam-p73-q1-4","exam-p84-q5-a1","exam-p85-q6-a3","past-p6-q1-3","past-p6-q1-4","classified-p08-q1-18","classified-p09-q1-26","exam-p14-q5-b1","exam-p58-q3-a3","exam-p70-q4-b2","classified-p10-q2-02","classified-p10-q2-12"],
  "keys-and-relations":["exam-p73-q1-5","classified-p06-q1-07","classified-p08-q1-19","classified-p08-q1-23","classified-p08-q1-24","classified-p09-q1-28","exam-p58-q3-a1","exam-p71-q5-b1","classified-p10-q2-06","classified-p10-q2-10","classified-p12-q3-04"],
  "build-and-integrity":["exam-p09-q1-2","exam-p58-q2-d4","exam-p77-q6-c2c","book-p13-q1-integrity","classified-p07-q1-09","classified-p11-q3-01"],
  "education-center":["exam-p58-q3-a2","exam-p74-q2-b","book-p10-center"],
  "engineering-office":["exam-p68-q1-c","book-p12-engineering"],
  "practice-and-review":["classified-p10-q1-34","exam-p03-q2-b-normalization","exam-p57-q2-b","book-p13-hospital","classified-p15-q3-11"],
  "sql-introduction":["exam-p60-q5-d3","past-p17-q1-2","exam-p05-q3-d","exam-p13-q4-b2","exam-p76-q5-a1","exam-p82-q1-c1","classified-p21-q2-06"],
  "select-order":["classified-p18-q1-14","exam-p57-q1-c1","exam-p71-q5-b6","classified-p21-q2-07"],
  "where-conditions":["exam-p09-q1-4","exam-p58-q2-d3","exam-p84-q4-a2","classified-p17-q1-04","classified-p18-q1-09","exam-p07-q5-d3","exam-p10-q2-b2","exam-p76-q5-b2a","classified-p25-q3-10"],
  "order-practice":["classified-p18-q1-13","exam-p69-q3-d1"],
  "related-tables":["exam-p71-q5-b4","exam-p74-q3-b3","exam-p79-q2-1b","classified-p21-q2-10"],
  "count-parameters":["past-p17-q1-5","exam-p13-q4-a5","exam-p59-q3-c1","exam-p76-q5-b2b","exam-p79-q2-1a"],
  "update-queries":["exam-p07-q5-d2","exam-p12-q3-b2","exam-p58-q3-b2","exam-p69-q3-d4","exam-p71-q5-b5","exam-p79-q2-1c","classified-p22-q2-17"],
  "insert-queries":["exam-p78-q1-2","classified-p20-q1-22","exam-p07-q5-d1","exam-p15-q6-b1","exam-p58-q3-b3","exam-p59-q3-c2","exam-p69-q3-d3","exam-p74-q3-b1","exam-p76-q5-b1","exam-p79-q2-1d","classified-p30-q3-25"],
  "delete-review":["exam-p09-q1-3","exam-p12-q3-b1","exam-p58-q3-b4","exam-p59-q3-c3","exam-p69-q3-d2","exam-p74-q3-b2","classified-p29-q3-23"],
  "sql-questions":["exam-p77-q6-b1a","exam-p77-q6-b1b"],
  "sql-practical":["exam-p58-q3-b1"],
  "android-features":["exam-p09-q1-9","exam-p69-q3-a2","exam-p73-q1-8","past-p63-q1-1","past-p63-q1-4","classified-u2-p63-mcq-5","classified-u2-p64-mcq-14","classified-u2-p66-mcq-29","classified-u2-p67-mcq-43","exam-p03-q1-c","exam-p10-q2-b1","exam-p57-q2-a-ar","exam-p59-q4-a-scroll","exam-p61-q6-d3","exam-p70-q4-b1","exam-p74-q2-d2","classified-u2-p70-written-5","classified-u2-p70-written-7","classified-u2-p70-written-10","classified-u2-p70-written-13"],
  "ios-files":["exam-p09-q1-7","exam-p09-q1-8","exam-p57-q1-b1","exam-p59-q3-d1","exam-p83-q3-a2","past-p63-q1-3","classified-u2-p64-mcq-8","classified-u2-p64-mcq-16","classified-u2-p66-mcq-30","classified-u2-p67-mcq-32","exam-p07-q5-c","exam-p57-q1-a","exam-p59-q4-c1","exam-p59-q4-c2","classified-u2-p70-written-1","classified-u2-p70-written-12"],
  "app-inventor-tools":["exam-p58-q2-d2","exam-p71-q5-a3","exam-p71-q6-a1","exam-p78-q1-4","exam-p79-q1-10","past-p73-q1-8","past-p74-q1-20","classified-u2-p73-mcq-10","classified-u2-p73-mcq-15","classified-u2-p75-mcq-25","exam-p59-q4-d","exam-p61-q6-c2","exam-p61-q6-c3","exam-p77-q6-c2a","exam-p77-q6-c2b","exam-p80-q2-4"],
  "app-inventor-blocks":["exam-p79-q1-8","exam-p71-q5-c","past-p73-q1-9","classified-u2-p72-mcq-1","classified-u2-p72-mcq-7","classified-u2-p73-mcq-14","classified-u2-p74-mcq-21","classified-u2-p75-mcq-30","classified-u2-p76-mcq-32","classified-u2-p80-written-7","classified-u2-p81-written-11","classified-u2-p82-written-13"],
  "bmi-interface":["exam-p75-q4-b","book-p54-bmi","classified-u2-p77-written-2"],
  "calculator-interface":["exam-p79-q1-9","exam-p58-q2-c","exam-p61-q6-c4","classified-u2-p84-written-16"],
  "calculator-events":["exam-p57-q1-b3","exam-p60-q5-c","exam-p61-q6-a3","exam-p84-q5-a3","book-p54-digits","classified-u2-p72-mcq-2","classified-u2-p72-mcq-3","classified-u2-p75-mcq-27","classified-u2-p75-mcq-28","classified-u2-p78-written-3","classified-u2-p79-written-6","classified-u2-p80-written-8","classified-u2-p80-written-9","classified-u2-p81-written-10","classified-u2-p82-written-12","classified-u2-p83-written-14","classified-u2-p83-written-15","classified-u2-p85-written-22","classified-u2-p86-written-23","classified-u2-p87-written-25"],
  "app-practice":["exam-p78-q1-5","classified-u2-p77-written-1","classified-u2-p84-written-18","classified-u2-p85-written-20","classified-u2-p85-written-21","classified-u2-p86-written-24"],
  "upper-layers":["past-p124-q1-1","past-p124-q1-4","past-p124-q1-6","book-p62-session","past-p125-q2-2","past-p125-q2-5","past-p126-q2-14","past-p126-q2-18","classified-p126-q2-15","classified-p126-q2-19","classified-p126-q4-1","classified-p127-q6-1-4"],
  "presentation-layer":["past-p124-q1-2","past-p124-q1-3","past-p124-q1-5","past-p124-q1-8","past-p125-q1-9","past-p125-q1-10","past-p125-q1-11","book-p62-layers","book-p62-protocols","past-p125-q2-6","past-p125-q2-9","past-p125-q2-10","past-p126-q2-12","past-p126-q2-16","classified-p125-q2-8","classified-p126-q4-2"]
});

export function getIctPartQuestionIds(partId) {
  return PART_QUESTION_IDS[partId] || [];
}
