import { animateView } from "../view-motion.js";

/** A short orientation on the real player, topics and reading below it. */
export function mountVideoTour(host, { signal, locale = "ar", finishLabel, onFinish = () => {} } = {}) {
  const surface = host.querySelector(".level-layout-task");
  const player = host.querySelector(".lesson-video-embed");
  if (!surface || !player || signal?.aborted) return;
  const arabic = locale === "ar";
  const portrait = matchMedia("(orientation:portrait) and (max-width:1100px)");
  const reading = host.querySelector(".lesson-study-layout") ? ".lesson-study-layout" : ".lesson-video-resources";
  const steps = [
    { id:"video", selector:".lesson-video-stage", title:arabic ? "ابدأ بالفيديو" : "Start with the video", text:arabic ? "شاهد الفيديو هنا أولًا. تعال أريك ما سيساعدك على المراجعة بعده!" : "Watch the video here first. Let me show you what will help you review afterward!" },
    { id:"topics", selector:".lesson-video-chapters", title:arabic ? "ارجع لأي موضوع بسهولة" : "Jump to a topic", text:arabic ? "هذه الأزرار الحمراء تنقلك مباشرة إلى الجزء الذي تريد مراجعته في الفيديو." : "These red buttons take you straight to the topic you want to review in the video." },
    { id:"notes", selector:reading, title:arabic ? "بعد المشاهدة، مرّر للأسفل" : "After watching, scroll down", text:arabic ? "اقرأ الملخص بعد كل فيديو لتثبّت فهمك. وقد تجد روابط أو ملفات مفيدة أيضًا. لنبدأ!" : "Read the summary after each video to reinforce what you learned. You may also find useful links or files. Let's begin!" },
    { id:"links", selector:".lesson-source-download", title:arabic ? "روابطك المفيدة هنا" : "Useful links are here", text:arabic ? "وقد تجد روابط للكتاب أو ملفات تحتاجها، مثل هذه. لنرجع الآن إلى الفيديو!" : "You may also find links to the textbook or helpful files, like these. Let's return to the video!" },
  ].filter(step => host.querySelector(step.selector));
  const controller = new AbortController();
  const dialog = document.createElement("dialog");
  dialog.className = "lesson-video-tour";
  dialog.dir = arabic ? "rtl" : "ltr";
  dialog.lang = locale;
  dialog.setAttribute("aria-labelledby", "video-tour-title");
  dialog.setAttribute("aria-describedby", "video-tour-copy");
  dialog.innerHTML = `
    <div class="lesson-video-tour-focus" aria-hidden="true"></div>
    <section class="lesson-video-tour-guide" dir="ltr">
      <div class="lesson-video-tour-bubble" dir="${arabic ? "rtl" : "ltr"}">
        <div class="lesson-video-tour-top"><span data-tour-progress></span><button type="button" data-tour-skip>${arabic ? "تخطي الجولة" : "Skip tour"}</button></div>
        <div class="lesson-video-tour-message" aria-live="polite" aria-atomic="true"><h2 id="video-tour-title"></h2><p id="video-tour-copy"></p></div>
      </div>
      <img class="lesson-video-tour-rocky" src="assets/mascot/rocky-wave.svg#no-shadow" width="300" height="285" alt="${arabic ? "روكي" : "Rocky"}">
      <div class="lesson-video-tour-actions" dir="${arabic ? "rtl" : "ltr"}"><button type="button" data-tour-back>${arabic ? "السابق" : "Back"}</button><button type="button" data-tour-next></button></div>
    </section>`;
  const guide = dialog.querySelector(".lesson-video-tour-guide");
  const spotlight = dialog.querySelector(".lesson-video-tour-focus");
  const next = dialog.querySelector("[data-tour-next]");
  const back = dialog.querySelector("[data-tour-back]");
  let index = 0;
  let frame = 0;
  const targetBounds = () => {
    const rectangles = [...host.querySelectorAll(steps[index].selector)].map(node =>
      (steps[index].id === "links" ? node.closest("p") || node : node).getBoundingClientRect());
    return {
      top:Math.min(...rectangles.map(rect => rect.top)), bottom:Math.max(...rectangles.map(rect => rect.bottom)),
      left:Math.min(...rectangles.map(rect => rect.left)), right:Math.max(...rectangles.map(rect => rect.right)),
    };
  };
  const position = () => {
    frame = 0;
    if (!dialog.open || !host.isConnected) return;
    const target = targetBounds();
    const panel = surface.getBoundingClientRect();
    guide.style.top = `${Math.max(12, Math.min(target.bottom + 20, innerHeight - guide.offsetHeight - 18))}px`;
    guide.style.left = `${Math.max(16, Math.min(index % 2 ? target.left : target.right - guide.offsetWidth, innerWidth - guide.offsetWidth - 16))}px`;
    const top = Math.max(4, panel.top, target.top - 6);
    const bottom = Math.min(panel.bottom, target.bottom + 6, steps[index].id === "video" ? innerHeight : guide.offsetTop - 14);
    const left = Math.max(4, target.left - 6);
    const right = Math.min(innerWidth - 4, target.right + 6);
    spotlight.style.cssText = `top:${top}px;left:${left}px;width:${Math.max(0, right - left)}px;height:${Math.max(0, bottom - top)}px`;
  };
  const queuePosition = () => { if (!frame) frame = requestAnimationFrame(position); };
  const scrollToTarget = () => {
    const zoom = Number(getComputedStyle(surface).zoom) || 1;
    const top = index === 0 ? 0 : surface.scrollTop + (targetBounds().top - surface.getBoundingClientRect().top - 18) / zoom;
    surface.scrollTo({ top, behavior:"instant" });
    position();
  };
  const cleanup = () => {
    controller.abort();
    signal?.removeEventListener("abort", cleanup);
    cancelAnimationFrame(frame);
    observer.disconnect();
    delete host.dataset.videoTourActive;
    dialog.close();
    dialog.remove();
  };
  const finish = () => {
    cleanup();
    if (!signal?.aborted && host.isConnected) {
      surface.scrollTo({ top:0, behavior:"instant" });
      player.focus({ preventScroll:true });
      onFinish();
    }
  };
  const updateCopy = () => {
    const step = steps[index];
    dialog.dataset.tourStep = step.id;
    guide.dataset.side = index % 2 ? "left" : "right";
    dialog.querySelector("#video-tour-title").textContent = step.title;
    dialog.querySelector("#video-tour-copy").textContent = index === 0 && portrait.matches
      ? (arabic ? "شاهد الفيديو هنا. لصورة أكبر، أدر جهازك أفقيًا ثم اضغط زر ملء الشاشة ⛶ داخل الفيديو." : "Watch here. For a larger view, rotate your device sideways, then tap the fullscreen button ⛶ in the video.")
      : step.text;
  };
  const showStep = () => {
    updateCopy();
    dialog.querySelector("[data-tour-progress]").textContent = arabic ? `${index + 1} من ${steps.length}` : `${index + 1} of ${steps.length}`;
    next.textContent = index === steps.length - 1 ? (finishLabel || (arabic ? "لنشاهد الفيديو" : "Watch the video")) : (arabic ? "متابعة" : "Continue");
    back.disabled = index === 0;
    if (back.disabled && document.activeElement === back) next.focus({ preventScroll:true });
    scrollToTarget();
    animateView(guide);
  };
  const options = { signal:controller.signal };
  next.addEventListener("click", () => {
    if (index === steps.length - 1) finish();
    else { index += 1; showStep(); }
  }, options);
  back.addEventListener("click", () => { index -= 1; showStep(); }, options);
  dialog.querySelector("[data-tour-skip]").addEventListener("click", finish, options);
  dialog.addEventListener("cancel", event => { event.preventDefault(); finish(); }, options);
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const buttons = [...dialog.querySelectorAll("button:not(:disabled)")];
    const edge = event.shiftKey ? buttons[0] : buttons.at(-1);
    if (document.activeElement !== edge) return;
    event.preventDefault();
    (event.shiftKey ? buttons.at(-1) : buttons[0]).focus({ preventScroll:true });
  }, options);
  // Keep the spotlight aligned while scrolling, rotating or resizing the page.
  surface.addEventListener("scroll", queuePosition, options);
  window.addEventListener("resize", () => { updateCopy(); scrollToTarget(); }, options);
  const observer = new ResizeObserver(queuePosition);
  observer.observe(guide);
  observer.observe(surface);
  signal?.addEventListener("abort", cleanup, { once:true });
  host.dataset.videoTourActive = "";
  document.body.append(dialog);
  dialog.showModal();
  showStep();
  next.focus({ preventScroll:true });
}
