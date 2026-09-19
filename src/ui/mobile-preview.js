const DEVICES = Object.freeze({
  compact:{ label:"هاتف صغير", width:375, height:667 },
  standard:{ label:"هاتف متوسط", width:390, height:844 },
  large:{ label:"هاتف كبير", width:412, height:915 },
});

function previewUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("page", "learn");
  url.searchParams.set("mobile-preview", "1");
  return url.href;
}

export function renderMobilePreview(container) {
  if (container.dataset.mobilePreviewMounted === "true") return;
  container.dataset.mobilePreviewMounted = "true";

  if (new URLSearchParams(window.location.search).get("mobile-preview") === "1") {
    container.innerHTML = '<section class="developer-panel mobile-preview-nested"><h2>معاينة الهاتف</h2><p>المعاينة متاحة من نافذة التطبيق الرئيسية.</p></section>';
    return;
  }

  container.innerHTML = `<section class="mobile-preview" aria-labelledby="mobile-preview-title">
    <header class="mobile-preview__header">
      <div><span>معاينة مباشرة</span><h2 id="mobile-preview-title">شاهد التطبيق بحجم الهاتف</h2><p>استخدم التطبيق داخل الشاشة. ستظهر تغييرات الملفات تلقائيًا.</p></div>
      <div class="mobile-preview__controls">
        <label>حجم الشاشة<select data-mobile-preview-device>${Object.entries(DEVICES).map(([value, device]) => `<option value="${value}"${value === "standard" ? " selected" : ""}>${device.label} · ${device.width} × ${device.height}</option>`).join("")}</select></label>
        <button type="button" data-mobile-preview-rotate>تدوير الشاشة</button>
        <button type="button" data-mobile-preview-reload>إعادة التحميل</button>
      </div>
    </header>
    <p class="mobile-preview__size" data-mobile-preview-size aria-live="polite">390 × 844 بكسل</p>
    <div class="mobile-preview__stage">
      <div class="mobile-preview__device" data-mobile-preview-device-frame>
        <div class="mobile-preview__speaker" aria-hidden="true"></div>
        <iframe title="معاينة تفاعلية لتخطيط التطبيق على الهاتف" src="${previewUrl()}"></iframe>
      </div>
    </div>
  </section>`;

  const frame = container.querySelector("[data-mobile-preview-device-frame]");
  const iframe = container.querySelector("iframe");
  const select = container.querySelector("[data-mobile-preview-device]");
  const size = container.querySelector("[data-mobile-preview-size]");
  let landscape = false;

  const resize = () => {
    const device = DEVICES[select.value] || DEVICES.standard;
    const width = landscape ? device.height : device.width;
    const height = landscape ? device.width : device.height;
    frame.style.setProperty("--mobile-preview-width", `${width}px`);
    frame.style.setProperty("--mobile-preview-height", `${height}px`);
    size.textContent = `${width} × ${height} بكسل`;
  };

  select.addEventListener("change", resize);
  container.querySelector("[data-mobile-preview-rotate]").addEventListener("click", () => {
    landscape = !landscape;
    resize();
  });
  container.querySelector("[data-mobile-preview-reload]").addEventListener("click", () => {
    iframe.contentWindow?.location.reload();
  });
  resize();
}
