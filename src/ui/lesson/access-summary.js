// Vector redraws of the supplied lesson.png illustrations.
function illustration(kind) {
  const shapes = {
    access: `<path d="M64 38h103v99c0 26-103 26-103 0Z" fill="#c53249"/><ellipse cx="115.5" cy="38" rx="51.5" ry="20" fill="#dc4b60"/><path d="M65 40c8 24 94 24 101 0M65 76c8 24 94 24 101 0M65 111c8 24 94 24 101 0" fill="none" stroke="#ffd4d9" stroke-width="5"/><rect x="33" y="72" width="69" height="69" rx="8" fill="#ae0018"/><path d="m48 125 16-39h11l16 39H80l-3-9H61l-3 9Zm16-18h10l-5-14Z" fill="white"/><path d="m32 53-12-7m21-11-7-12m-17 49 14-2" stroke="#bd0927" stroke-width="7" stroke-linecap="round"/>`,
    tables: `<rect x="22" y="39" width="136" height="104" rx="10" fill="#08adeb"/><path d="M28 71h124v65H28Z" fill="#fff"/><path d="M66 71v65m44-65v65M28 94h124M28 116h124" stroke="#08adeb" stroke-width="5"/>`,
    queries: `<rect x="16" y="31" width="125" height="103" rx="8" fill="#aa7bed"/><path d="M22 53h113v75H22Z" fill="#fff"/><path d="M56 53v75m38-75v75M22 78h113M22 103h113" stroke="#aa7bed" stroke-width="5"/><path d="m120 118 30 30" stroke="#7138d2" stroke-width="17" stroke-linecap="round"/><circle cx="105" cy="98" r="31" fill="#c7a6f3" fill-opacity=".88" stroke="#7138d2" stroke-width="9"/>`,
    forms: `<rect x="17" y="30" width="148" height="125" rx="11" fill="#fff" stroke="#f5b400" stroke-width="2"/><path d="M28 30h126a11 11 0 0 1 11 11v14H17V41a11 11 0 0 1 11-11" fill="#f4b000"/><circle cx="47" cy="82" r="10" fill="#f4b000"/><path d="M32 110c-5-22 34-22 30 0Z" fill="#f4b000"/><g fill="#fff" stroke="#bfcbd9" stroke-width="3"><rect x="79" y="69" width="71" height="18" rx="3"/><rect x="79" y="95" width="71" height="18" rx="3"/></g><rect x="79" y="126" width="51" height="15" rx="4" fill="#bfcbd9"/>`,
    reports: `<path d="M35 20h77l27 28v108H35a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8Z" fill="#fff" stroke="#04b657" stroke-width="7" stroke-linejoin="round"/><path d="M110 20v26a6 6 0 0 0 6 6h24" fill="#04b657"/><path d="M47 52h49M47 71h42M47 90h18" stroke="#c2cedc" stroke-width="10" stroke-linecap="round"/><g fill="#05bf59"><rect x="42" y="123" width="15" height="17" rx="3"/><rect x="63" y="110" width="15" height="30" rx="3"/><rect x="84" y="97" width="15" height="43" rx="3"/><rect x="105" y="82" width="15" height="58" rx="3"/></g>`,
    shield: `<path d="m90 16 57 22c0 55-20 88-57 112-37-24-57-57-57-112Z" fill="#f4b000"/><path d="M90 16v134c37-24 57-57 57-112Z" fill="#e99a00"/><path d="m63 80 19 19 36-40" fill="none" stroke="white" stroke-width="12" stroke-linejoin="round"/>`,
    file: `<path d="M48 15h58l29 30v115H48Z" fill="#61738e"/><path d="M106 15v31h29" fill="#a9b7ca"/><path d="M66 81h51M66 101h51M66 121h36" stroke="white" stroke-width="8"/>`,
  };
  return `<svg class="access-summary-art" viewBox="0 0 180 180" aria-hidden="true" focusable="false">${shapes[kind]}</svg>`;
}

function toolCard(kind, name, purpose, example, facts = []) {
  return `<section class="access-tool access-tool--${kind}">
    <div class="access-tool-copy"><h3>${name}</h3><p class="access-tool-purpose">${purpose}</p></div>
    ${illustration(kind)}
    ${facts.length ? `<ul class="access-tool-facts">${facts.map(fact => `<li>${fact}</li>`).join("")}</ul>` : ""}
    <p class="access-tool-example"><strong>مثال:</strong> ${example}</p>
  </section>`;
}

export function renderTableStructure() {
  return `<div class="access-table-structure">${["table", "column", "row"].map(kind => {
    const table = kind === "table";
    const column = kind === "column";
    const label = table ? "الكيان = الجدول" : column ? "الحقول = الأعمدة" : "السجلات = الصفوف";
    return `<figure class="access-table-axis access-table-axis--${kind}">
      <figcaption>${label}</figcaption>
      <svg viewBox="0 0 240 132" role="img" aria-label="${table ? "جدول كامل ملوّن يوضّح الكيان" : column ? "جدول بعمود ملوّن كامل يوضّح الحقل" : "جدول بصف ملوّن كامل يوضّح السجل"}">
        <rect x="12" y="10" width="216" height="112" rx="6" fill="white"/>
        <path d="M12 10h216v28H12Z" fill="#eef2f6"/>
        <path d="${table ? "M12 10h216v112H12Z" : column ? "M84 10h72v112H84Z" : "M12 66h216v28H12Z"}" fill="${table ? "#eee3f5" : column ? "#c2eaff" : "#c7efd9"}"/>
        <path d="M84 10v112m72-112v112M12 38h216M12 66h216M12 94h216" fill="none" stroke="#bbcbd8"/>
        <rect x="12" y="10" width="216" height="112" rx="6" fill="none" stroke="#bbcbd8"/>
        ${[24, 52, 80, 108].map(y => [48, 120, 192].map(x => `<path d="M${x - 15} ${y}h30" stroke="#8c9bad" stroke-width="3" stroke-linecap="round"/>`).join("")).join("")}
        <rect x="${column ? 84 : 12}" y="${table || column ? 10 : 66}" width="${column ? 72 : 216}" height="${table || column ? 112 : 28}" rx="3" fill="none" stroke="${table ? "#9874b5" : column ? "#159bd1" : "#2da873"}" stroke-width="3"/>
      </svg>
    </figure>`;
  }).join("")}</div>`;
}

export function renderAccessPropertyIcon(index) {
  const drawings = [
    '<rect x="3" y="5" width="12" height="12" rx="2"/><rect x="21" y="19" width="12" height="12" rx="2"/><path d="M3 9h12M21 23h12M9 17v8h12"/>',
    '<path d="M9 3h13l7 7v23H9Z"/><path d="M22 3v8h7M14 18h10M14 24h10"/>',
    '<path d="M5 11h25m-6-6 6 6-6 6M31 25H6m6-6-6 6 6 6"/>',
    '<path d="m18 3 12 5v9c0 8-12 16-12 16S6 25 6 17V8Z"/><path d="m12 17 4 4 8-9"/>',
    '<rect x="12" y="3" width="12" height="9" rx="2"/><rect x="2" y="25" width="12" height="8" rx="2"/><rect x="22" y="25" width="12" height="8" rx="2"/><path d="M18 12v7M8 25v-6h20v6"/>',
    '<circle cx="12" cy="13" r="8"/><path d="m18 19 13 13m-5-5 4-4m-9-1 4-4"/><circle cx="10" cy="11" r="1"/>',
  ];
  return `<svg class="access-property-icon" viewBox="0 0 36 36" aria-hidden="true" focusable="false" fill="#f4eefa" stroke="#9874b5" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${drawings[index]}</svg>`;
}

export function renderAccessSummary() {
  return `<header class="access-summary-heading"><p>ملخص الدرس</p></header>
    <section class="access-summary-concept"><div><h2>الفكرة الأساسية</h2><p>برنامج لإنشاء قواعد البيانات وتنظيمها والبحث فيها وإعداد التقارير.</p></div>${illustration("access")}</section>
    <section class="access-memorization" aria-label="يجب حفظه">
      <header class="lesson-memorization-label"><img src="assets/icons/brain-svgrepo-com.svg" width="56" height="56" alt=""><h2>يجب حفظه</h2></header>
      <div class="access-map-root">قواعد البيانات</div>
      <div class="access-memorization-body">
        <section class="access-summary-facts access-summary-facts--programs" data-summary-facts="برامج إدارة قواعد البيانات"></section>
        <section class="access-summary-facts access-summary-facts--properties" data-summary-facts="خصائص Access الست"></section>
      </div>
    </section>
    <section class="access-summary-tools"><h2>أربع أدوات، أربع وظائف</h2><div class="access-tool-grid">
      ${toolCard("tables", "الجداول", "تخزّن البيانات", "أسماء الطلاب ودرجاتهم", ["تتكوّن من حقول (أعمدة).", "وسجلات (صفوف)."])}
      ${toolCard("queries", "الاستعلامات", "تبحث وتُجري العمليات", "عرض الطلاب المتفوّقين", ["استرجاع بيانات وفق معايير محددة.", "حذف، إضافة، تعديل سجلات أو حقول.", "إنشاء جداول وحذفها."])}
      ${toolCard("forms", "النماذج", "تُضيف، تُعدّل، تحذف", "إضافة طالب بسهولة عبر واجهة", ["واجهات للتعامل مع بيانات الجداول."])}
      ${toolCard("reports", "التقارير", "تعرض البيانات وتطبعها", "طباعة كشف الدرجات", ["بأشكال وتنسيقات متنوعة."])}
    </div><p class="access-tools-note">هذه المكونات المذكورة في الكتاب؛ توجد مكونات أخرى.</p></section>
    <section class="access-summary-facts access-summary-facts--details" data-summary-facts="تفاصيل لا تختصرها"></section>
    <aside class="access-summary-memory"><h2>تذكّرها ببساطة</h2><ul><li>جدول يخزّن</li><li>استعلام يبحث</li><li>نموذج يُدخل</li><li>تقرير يعرض</li></ul></aside>
    `;
}
