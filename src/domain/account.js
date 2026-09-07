export const ACCOUNT_FIELD_ORDER = Object.freeze([
  "username", "curriculum", "path", "email", "password", "phone",
]);
export const ACCOUNT_IDENTIFIER_FIELDS = Object.freeze(["username", "email", "phone"]);
export const SUPPORTED_CURRICULA = Object.freeze(["gaza", "full-palestinian"]);
export const SUPPORTED_PATHS = Object.freeze(["scientific", "literary"]);

const accountIdentifierFields = new Set(ACCOUNT_IDENTIFIER_FIELDS);
const supportedCurricula = new Set(SUPPORTED_CURRICULA);
const supportedPaths = new Set(SUPPORTED_PATHS);

const USERNAME_PATTERN = /^[\p{L}\p{N}_.-]{3,30}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+97259\d{7}|\+97056\d{7}|\+201[0125]\d{8})$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z\u0600-\u06ff])(?=.*\d).{8,128}$/;

export const DUPLICATE_ACCOUNT_FIELD_LABELS = Object.freeze({
  username:"اسم المستخدم",
  email:"البريد الإلكتروني",
  phone:"رقم الهاتف",
});

export function normalizeUsername(value) {
  return String(value || "").trim().normalize("NFKC").toLocaleLowerCase("en-US");
}

export function normalizeEmail(value) {
  return String(value || "").trim().normalize("NFKC").toLocaleLowerCase("en-US");
}

export function normalizePhone(value) {
  return String(value || "").trim().normalize("NFKC").replace(/[\s()-]/g, "");
}

export function identifierAliases(value) {
  return [...new Set([
    normalizeUsername(value),
    normalizeEmail(value),
    normalizePhone(value),
  ].filter(Boolean))];
}

export function duplicateAccountFieldMessage(field) {
  return `${DUPLICATE_ACCOUNT_FIELD_LABELS[field] || "هذه البيانات"} مستخدم بالفعل. سجّل الدخول أو استخدم بيانات أخرى.`;
}

export function isAccountIdentifierField(field) {
  return accountIdentifierFields.has(field);
}

export function isValidVisitorSelection(selection) {
  return supportedCurricula.has(selection?.curriculum) && supportedPaths.has(selection?.path);
}

export function validateAccountField(name, value) {
  const stringValue = String(value || "");
  if (name === "username") return USERNAME_PATTERN.test(stringValue.trim()) ? "" : "استخدم من 3 إلى 30 حرفًا أو رقمًا.";
  if (name === "curriculum") return supportedCurricula.has(stringValue) ? "" : "اختر منهاجك للمتابعة.";
  if (name === "path") return supportedPaths.has(stringValue) ? "" : "اختر فرعك للمتابعة.";
  if (name === "email") {
    const email = stringValue.trim();
    if (!email) return "أدخل بريدك الإلكتروني للمتابعة.";
    return EMAIL_PATTERN.test(email) && email.length <= 254 ? "" : "اكتب بريدًا إلكترونيًا صالحًا.";
  }
  if (name === "password") return PASSWORD_PATTERN.test(stringValue) ? "" : "استخدم 8 أحرف على الأقل، بينها حرف ورقم.";
  if (name === "phone") {
    const phone = normalizePhone(stringValue);
    if (!phone) return "أدخل رقم هاتف للمتابعة.";
    return PHONE_PATTERN.test(phone) ? "" : "أدخل رقمًا صحيحًا للشبكة المختارة.";
  }
  return "تعذّر التحقق من هذه البيانات.";
}

export function validateRegistration(body) {
  const values = {
    username:String(body?.username || "").trim(),
    curriculum:String(body?.curriculum || ""),
    path:String(body?.path || ""),
    email:String(body?.email || "").trim(),
    password:String(body?.password || ""),
    phone:String(body?.phone || "").trim(),
  };
  const fieldErrors = Object.fromEntries(ACCOUNT_FIELD_ORDER
    .map((name) => [name, validateAccountField(name, values[name])])
    .filter(([, message]) => message));
  return { values, fieldErrors };
}
