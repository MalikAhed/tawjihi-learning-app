const pluralRules = new Intl.PluralRules("ar");
const nounForms = Object.freeze({
  day:{ zero:"أيام", one:"يوم واحد", two:"يومان", few:"أيام", many:"يومًا", other:"يوم" },
  part:{ zero:"أجزاء", one:"جزء واحد", two:"جزآن", few:"أجزاء", many:"جزءًا", other:"جزء" },
  question:{ zero:"أسئلة", one:"سؤال واحد", two:"سؤالان", few:"أسئلة", many:"سؤالًا", other:"سؤال" },
});

function countValue(value) {
  return Math.max(0, Math.floor(Number(value) || 0));
}

/** Keep an overlaid value on one side of the fill edge instead of bisecting it. */
export function isProgressLabelCovered(value, maximum) {
  const safeMaximum = Number(maximum);
  if (!(safeMaximum > 0)) return false;
  return Math.max(0, Number(value) || 0) / safeMaximum >= 0.6;
}

/** Arabic noun agreement for the integer counts shown to learners. Returns plain text. */
export function formatArabicCount(value, noun) {
  const forms = nounForms[noun];
  if (!forms) throw new TypeError(`Unknown count noun: ${noun}`);
  const count = countValue(value);
  const category = pluralRules.select(count);
  return category === "one" || category === "two" ? forms[category] : `${count} ${forms[category]}`;
}

export function formatLevel(value) {
  return `Lv. ${String(Math.max(1, countValue(value))).padStart(2, "0")}`;
}

export function formatXp(value) {
  return `${countValue(value)} XP`;
}

export function formatXpProgress(value, maximum) {
  return `${countValue(value)} / ${formatXp(maximum)}`;
}
