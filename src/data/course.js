export const DAYS_PER_WEEK = 7;

export const COURSE_SUBJECTS = Object.freeze([
  { id:"mathematics", name:"الرياضيات", status:"locked" },
  { id:"physics", name:"الفيزياء", status:"locked" },
  { id:"biology", name:"الأحياء", status:"locked" },
  { id:"chemistry", name:"الكيمياء", status:"locked" },
  { id:"ict", name:"تكنولوجيا المعلومات", status:"in-progress" },
  { id:"english", name:"اللغة الإنجليزية", status:"locked" },
  { id:"arabic", name:"اللغة العربية", status:"locked" },
  { id:"islamic-education", name:"التربية الإسلامية", status:"locked" },
]);

export const TOTAL_SUBJECTS = COURSE_SUBJECTS.length;

export function getCourseSubject(subjectId) {
  return COURSE_SUBJECTS.find(({ id }) => id === subjectId) || null;
}

const THEMES = {
  sand: { text:"#49351f", shadow:"rgba(73,53,31,.32)", base:"#7e694e", baseShadow:"#60503c", border:"#d4be95", top:"#e0c79f", middle:"#c7a77b", bottom:"#aa926c" },
  stone: { text:"#4f463b", shadow:"rgba(79,70,59,.32)", base:"#6f685e", baseShadow:"#565149", border:"#d8c3a1", top:"#e3d0b2", middle:"#c3ab8a", bottom:"#8e8575" },
  earth: { text:"#4f4034", shadow:"rgba(79,64,52,.32)", base:"#655f57", baseShadow:"#4d4943", border:"#c9b18e", top:"#ddc29b", middle:"#ba9567", bottom:"#9a8b75" },
  dune: { text:"#4d473d", shadow:"rgba(77,71,61,.32)", base:"#776e5e", baseShadow:"#5d5548", border:"#d5c19d", top:"#e3cea8", middle:"#c8a77a", bottom:"#a99b84" },
  clay: { text:"#514333", shadow:"rgba(81,67,51,.32)", base:"#766756", baseShadow:"#5a4e41", border:"#d4bd99", top:"#e1c9a1", middle:"#c9a373", bottom:"#c5b28f" },
  forest: { text:"#234d25", shadow:"rgba(35,77,37,.32)", base:"#4b9b32", baseShadow:"#367525", border:"#b7ef7e", top:"#e2ffc8", middle:"#a7e866", bottom:"#62bd3d" },
  amber: { text:"#5b360e", shadow:"rgba(91,54,14,.32)", base:"#8d6730", baseShadow:"#684b22", border:"#d9ae62", top:"#ffe2a1", middle:"#d0a15b", bottom:"#a87532" },
  ocean: { text:"#073b71", shadow:"rgba(4,63,122,.4)", base:"#096cc0", baseShadow:"#07549a", border:"#4ab8ff", top:"#c8edff", middle:"#36aaf5", bottom:"#087acf" },
  frost: { text:"#4d5864", shadow:"rgba(56,67,78,.28)", base:"#c7d0d8", baseShadow:"#9ca9b4", border:"#ffffff", top:"#ffffff", middle:"#eef3f7", bottom:"#cdd6df" },
  arcane: { text:"#351069", shadow:"rgba(53,16,105,.42)", base:"#6626be", baseShadow:"#4a168f", border:"#b779ff", top:"#f0d9ff", middle:"#a95bf1", bottom:"#7735cf" },
};

export const WEEK_THEMES = [
  THEMES.sand, THEMES.stone, THEMES.earth, THEMES.dune,
  THEMES.clay, THEMES.forest, THEMES.forest, THEMES.forest,
  THEMES.amber, THEMES.forest, THEMES.ocean, THEMES.ocean,
  THEMES.ocean, THEMES.frost, THEMES.arcane, THEMES.arcane,
];

export const COURSE_WEEKS = [
  { cardImage: "assets/course-cards/week1.webp", cardLabel: "Start Week 1: HTML, CSS and Git", positions: [[39.5, 42.8], [59.6, 50.2], [44.6, 58.2], [34.0, 65.8], [50.0, 72.9], [64.9, 80.1], [49.7, 87.6]] },
  { cardImage: "assets/course-cards/week2.webp", cardLabel: "Start Week 2: How JavaScript Runs", positions: [[39.2, 41.2], [59.2, 49.6], [44.7, 57.1], [33.7, 65.2], [49.7, 72.5], [64.7, 79.4], [49.4, 88.0]] },
  { cardImage: "assets/course-cards/week3.webp", cardLabel: "Start Week 3: JavaScript in Action", positions: [[39.5, 44.0], [59.8, 52.1], [44.4, 59.4], [33.8, 67.4], [49.6, 74.3], [64.2, 82.0], [49.8, 90.5]] },
  { cardImage: "assets/course-cards/week4.webp", cardLabel: "Start Week 4: Async JavaScript", positions: [[39.5, 42.4], [59.1, 49.7], [45.2, 57.9], [33.8, 66.0], [50.0, 72.9], [64.5, 80.6], [50.0, 88.5]] },
  { cardImage: "assets/course-cards/week5.webp", cardLabel: "Start Week 5: TypeScript Toolkit", positions: [[41.2, 42.4], [60.7, 50.0], [44.9, 58.8], [34.0, 66.6], [49.7, 73.6], [62.8, 81.5], [49.9, 89.2]] },
  { cardImage: "assets/course-cards/week6.webp", cardLabel: "Start Week 6: React Foundations", positions: [[40.7, 38.2], [60.6, 46.5], [45.4, 55.7], [33.5, 63.8], [49.4, 71.8], [64.2, 80.1], [49.6, 89.0]] },
  { cardImage: "assets/course-cards/week7.webp", cardLabel: "Start Week 7: React Hooks", positions: [[40.4, 36.4], [59.4, 44.4], [44.4, 53.1], [33.7, 61.0], [49.2, 68.5], [63.3, 76.4], [49.5, 85.2]] },
  { cardImage: "assets/course-cards/week8.webp", cardLabel: "Start Week 8: React App Quest", positions: [[39.6, 37.9], [59.5, 46.0], [45.0, 55.9], [35.2, 64.7], [50.0, 72.1], [63.8, 80.6], [50.0, 87.6]] },
  { cardImage: "assets/course-cards/week9.webp", cardLabel: "Start Week 9: Node.js Runtime", positions: [[40.3, 36.2], [59.3, 44.5], [44.6, 53.0], [44.0, 63.2], [50.7, 73.0], [62.6, 80.3], [47.3, 88.3]] },
  { cardImage: "assets/course-cards/week10.webp", cardLabel: "Start Week 10: Express and REST APIs", positions: [[40.3, 36.5], [59.5, 44.4], [44.7, 53.5], [33.4, 63.9], [50.7, 71.8], [62.1, 80.6], [48.7, 87.8]] },
  { cardImage: "assets/course-cards/week11.webp", cardLabel: "Start Week 11: PostgreSQL Data", positions: [[41.3, 35.7], [60.8, 43.8], [43.4, 53.3], [34.6, 61.7], [50.7, 69.7], [63.6, 78.3], [50.4, 85.9]] },
  { cardImage: "assets/course-cards/week12.webp", cardLabel: "Start Week 12: Full-Stack Connections", positions: [[40.6, 37.7], [60.4, 46.0], [44.8, 55.5], [31.6, 65.6], [50.7, 73.7], [62.2, 82.9], [47.8, 90.1]] },
  { cardImage: "assets/course-cards/week13.webp", cardLabel: "Start Week 13: Testing and Quality", positions: [[40.0, 37.9], [59.4, 45.9], [45.1, 55.0], [33.7, 64.5], [49.9, 73.9], [63.1, 83.3], [48.2, 90.3]] },
  { cardImage: "assets/course-cards/week14.webp", cardLabel: "Start Week 14: Deployment and DevOps", positions: [[71.6, 23.6], [40.1, 38.2], [59.7, 45.6], [44.5, 55.0], [33.7, 64.6], [48.8, 74.1], [63.4, 82.4]] },
  { cardImage: "assets/course-cards/week15.webp", cardLabel: "Start Week 15: Capstone Launch", positions: [[35.9, 28.9], [39.4, 38.0], [59.2, 46.1], [42.7, 55.9], [35.2, 65.5], [49.1, 75.1], [62.5, 84.0]] },
  { cardImage: "assets/course-cards/week16.webp", cardLabel: "Start Week 16: Future Frontier", cardWidth:1949, cardHeight:807, biomeHeight:1671, positions: [[42.4, 29.4], [55.8, 37.7], [42.6, 46.1], [58.7, 53.7], [40.7, 61.5], [57.0, 70.1], [47.9, 79.5]] },
];

export const TOTAL_DAYS = COURSE_WEEKS.length * DAYS_PER_WEEK;
