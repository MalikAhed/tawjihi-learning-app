// Lesson-specific artwork and composition; teaching copy stays in authored Markdown.
function art(kind) {
  const grid = '<rect x="24" y="40" width="132" height="102" rx="9" fill="white" stroke="#22ace0" stroke-width="4"/><path d="M26 65h128M26 91h128M26 117h128M69 65v75M112 65v75" stroke="#9bdaf0" stroke-width="3"/><path d="M29 43h122v19H29Z" fill="#36bbed"/>';
  const drawings = {
    file:'<path d="M42 18h66l30 30v111H42a9 9 0 0 1-9-9V27a9 9 0 0 1 9-9Z" fill="#fff" stroke="#b77ddd" stroke-width="5"/><path d="M107 19v30h30" fill="#e6cef6"/><ellipse cx="87" cy="83" rx="32" ry="12" fill="#d15270"/><path d="M55 83v38c0 17 64 17 64 0V83c0 16-64 16-64 0" fill="#c33355"/><path d="M55 102c0 16 64 16 64 0" fill="none" stroke="#ffd5df" stroke-width="4"/><circle cx="137" cy="139" r="24" fill="#a575d6"/><path d="M137 126v26m-13-13h26" stroke="white" stroke-width="5" stroke-linecap="round"/>',
    window:'<rect x="14" y="29" width="152" height="124" rx="10" fill="white" stroke="#23a8dc" stroke-width="4"/><path d="M18 33h144v23H18Z" fill="#31b9ec"/><path d="M18 59h144v17H18Z" fill="#bceafa"/><rect x="119" y="80" width="43" height="68" rx="3" fill="#d9eff8"/><path d="M128 92h25m-25 14h19m-19 14h25" stroke="#56b4d6" stroke-width="5" stroke-linecap="round"/><rect x="25" y="86" width="85" height="55" rx="3" fill="#f3fbfe" stroke="#b6dfe9" stroke-width="2"/><path d="M27 104h81M55 88v51M81 88v51M27 121h81" stroke="#b6dfe9" stroke-width="2"/>',
    design:grid+'<path d="m111 120 35-52 14 10-35 52-22 10Z" fill="#ffca50" stroke="#dca328" stroke-width="3" stroke-linejoin="round"/><path d="m146 68 7-10c7-8 20 2 14 10l-7 10" fill="#b184e2"/><path d="m103 140 5-16 12 9Z" fill="#495677"/>',
    types:'<rect x="23" y="26" width="101" height="122" rx="10" fill="white" stroke="#b38ada" stroke-width="4"/><rect x="35" y="40" width="77" height="27" rx="5" fill="#ede0f8"/><path d="M39 83h45M39 100h31M39 117h45" stroke="#bba8ce" stroke-width="6" stroke-linecap="round"/><rect x="93" y="92" width="66" height="58" rx="9" fill="#a77bd1"/><path d="m106 122 11 11 26-29" fill="none" stroke="white" stroke-width="7" stroke-linejoin="round"/>',
    key:grid+'<circle cx="117" cy="106" r="22" fill="#ffd966" stroke="#e3ac26" stroke-width="5"/><circle cx="117" cy="106" r="7" fill="white"/><path d="m103 124-34 34m12-12 9 9m3-22 9 9" stroke="#e3ac26" stroke-width="12" stroke-linecap="round"/>',
    save:'<path d="M37 26h97l19 20v103a8 8 0 0 1-8 8H37a8 8 0 0 1-8-8V34a8 8 0 0 1 8-8Z" fill="#49bb86"/><path d="M53 26h70v51H53Z" fill="#d5f7e6"/><rect x="98" y="35" width="14" height="31" rx="2" fill="#289765"/><rect x="49" y="97" width="81" height="60" rx="5" fill="white"/><path d="M63 115h52m-52 16h38" stroke="#b4dcc8" stroke-width="5" stroke-linecap="round"/><circle cx="146" cy="137" r="24" fill="#268c60"/><path d="m134 137 8 8 15-18" stroke="white" stroke-width="5" fill="none" stroke-linejoin="round"/>',
  };
  return `<svg class="access-summary-art" viewBox="0 0 180 180" aria-hidden="true" focusable="false">${drawings[kind] || drawings.design}</svg>`;
}

function viewComparison() {
  return `<div class="access-design-views">${[false, true].map(data => `<figure>
    <figcaption>${data ? 'ورقة البيانات: الحقل عمود' : 'التصميم: نعرّف الحقل في صف'}</figcaption>
    <svg viewBox="0 0 240 136" role="img" aria-label="${data ? 'عمود ملوّن داخل جدول يوضح حقل الاسم لجميع الطلبة' : 'صف ملوّن في شبكة التصميم يوضح اسم الحقل ونوعه ووصفه'}">
      <rect x="12" y="12" width="216" height="112" rx="7" fill="white" stroke="#bfd3df" stroke-width="2"/>
      <path d="M13 13h214v26H13Z" fill="#e6eff5"/>
      <path d="${data ? 'M84 13h72v110H84Z' : 'M13 66h214v28H13Z'}" fill="${data ? '#c5eefa' : '#e6d6f5'}"/>
      <path d="M84 13v110m72-110v110M13 39h214M13 66h214M13 94h214" stroke="#bfd3df" stroke-width="2"/>
      ${[26,52,80,108].map(y=>[48,120,192].map(x=>`<path d="M${x-18} ${y}h36" stroke="${data && x===120 ? '#199ac5' : !data && y===80 ? '#9a69c4' : '#a6b9c6'}" stroke-width="4" stroke-linecap="round"/>`).join('')).join('')}
      <rect x="${data ? 84 : 12}" y="${data ? 12 : 66}" width="${data ? 72 : 216}" height="${data ? 112 : 28}" rx="3" fill="none" stroke="${data ? '#22a6d0' : '#aa7bd3'}" stroke-width="3"/>
    </svg>
    <p>${data ? 'كل صف جديد = بيانات طالب جديد' : 'اسم الحقل + نوع البيانات + وصف اختياري'}</p>
  </figure>`).join('')}</div>`;
}

const sections = [
  ['file', 'queries'], ['window', 'tables'], ['types', 'tables'],
  ['types', 'queries'], ['key', 'forms'], ['save', 'reports'],
];

export function enhanceAccessDesignSummary(summary, titleId) {
  const doc = summary.ownerDocument;
  const authored = [...summary.children];
  summary.classList.add('lesson-summary-content', 'access-summary', 'access-design-summary');
  summary.replaceChildren();
  const header = doc.createElement('header');
  header.className = 'access-summary-heading';
  header.innerHTML = '<p>ملخص الدرس الثاني · خطوة بخطوة</p>';
  const title = authored.find(node => node.tagName === 'H1');
  if (title) header.append(title);
  summary.append(header);
  let body;
  let index = -1;
  for (const node of authored) {
    if (node === title) continue;
    if (node.tagName === 'H2') {
      index++;
      const [kind, theme] = sections[index] || ['design', 'tables'];
      const card = doc.createElement('section');
      card.className = `access-tool access-tool--${theme} access-design-card`;
      card.dataset.designSection = String(index);
      node.id = `${titleId}-design-${index}`;
      card.setAttribute('aria-labelledby', node.id);
      const top = doc.createElement('header');
      top.className = 'access-design-card-heading';
      top.append(node);
      top.insertAdjacentHTML('beforeend', art(kind));
      body = doc.createElement('div');
      body.className = 'access-design-card-body';
      card.append(top, body);
      if (index === 2) body.insertAdjacentHTML('afterbegin', viewComparison());
      if (node.textContent.includes('يجب حفظه')) {
        card.classList.add('access-memorization');
        top.className = 'lesson-memorization-label';
        top.querySelector('svg').remove();
        top.insertAdjacentHTML('afterbegin','<img src="assets/icons/brain-svgrepo-com.svg" width="38" height="38" alt="">');
      }
      summary.append(card);
    } else if (node.classList.contains('markdown-callout')) {
      node.classList.add('access-design-note');
      summary.append(node);
    } else if (body) {
      body.append(node);
    }
  }
  const exactTerms = /^(Text|Memo|Date\/Time|Number|AutoNumber|Primary Key|255 رمزًا|65536 رمزًا|School\.accdb|tblStudents|studentID|stdName|birthDate|phone)$/;
  summary.querySelectorAll('strong').forEach(term => {
    if (exactTerms.test(term.textContent.trim().replace(/:$/, ''))) term.classList.add('access-design-term');
  });
  summary.querySelectorAll('table').forEach(table => table.classList.add('access-data'));
  summary.querySelectorAll('.access-design-card-body p > img').forEach(img => {
    const figure = doc.createElement('figure');
    figure.className = 'access-design-screenshot';
    const caption = doc.createElement('figcaption');
    caption.textContent = img.alt;
    const link = doc.createElement('a');
    link.href = img.getAttribute('src');
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `فتح الصورة بالحجم الكامل في تبويب جديد: ${img.alt}`);
    const label = doc.createElement('span');
    label.textContent = 'فتح الصورة بالحجم الكامل ↗';
    img.parentElement.replaceWith(figure);
    link.append(img, label);
    figure.append(link, caption);
  });
}
