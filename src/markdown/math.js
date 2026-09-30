import DOMPurify from "../../node_modules/dompurify/dist/purify.es.mjs";

const MATH_TAGS = ["math", "mrow", "mi", "mn", "mo", "mtext", "mspace", "ms", "mfrac", "msqrt", "mroot", "msub", "msup", "msubsup", "munder", "mover", "munderover", "mmultiscripts", "mprescripts", "none", "mtable", "mtr", "mtd", "mstyle", "mpadded", "mphantom", "semantics", "annotation"];
const MATH_ATTRIBUTES = ["xmlns", "dir", "display", "aria-label", "mathvariant", "stretchy", "largeop", "movablelimits", "fence", "separator", "accent", "accentunder", "linethickness", "lspace", "rspace", "width", "height", "depth", "rowspacing", "columnspacing", "columnalign", "rowalign", "encoding"];

// One MathML path for lesson blocks, inline copy, answer choices and explanations.
export function renderMathML(source, { display = false } = {}) {
  const invalid = '<span class="lesson-math-error" role="alert">صيغة رياضية غير صالحة</span>';
  if (/<!/i.test(source)) return invalid;
  const parser = new DOMParser();
  const original = parser.parseFromString(source.trim(), "application/xml");
  if (original.querySelector("parsererror") || original.documentElement.localName !== "math") return invalid;
  if ([...original.querySelectorAll("*")].some(node => !MATH_TAGS.includes(node.localName))) return invalid;
  const clean = DOMPurify.sanitize(source, {
    ALLOWED_TAGS:MATH_TAGS, ALLOWED_ATTR:MATH_ATTRIBUTES,
    ALLOW_DATA_ATTR:false, FORBID_ATTR:["style"],
  });
  const document = parser.parseFromString(clean, "application/xml");
  const math = document.documentElement;
  if (document.querySelector("parsererror") || math.localName !== "math") return invalid;
  math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
  math.setAttribute("class", "lesson-math");
  math.setAttribute("dir", math.getAttribute("dir") === "ltr" ? "ltr" : "rtl");
  math.setAttribute("display", display ? "block" : "inline");
  // An explicit row lets Firefox stretch operators against sibling fractions/tables.
  const row = document.createElementNS(math.namespaceURI, "mrow");
  row.append(...math.childNodes);
  math.append(row);
  math.querySelectorAll("mn").forEach(node => node.setAttribute("dir", "ltr"));
  math.querySelectorAll("mi").forEach(node => {
    if (/\p{Script=Arabic}/u.test(node.textContent) && !node.hasAttribute("mathvariant")) node.setAttribute("mathvariant", "normal");
  });
  return math.outerHTML;
}
