import { escapeHtml } from "../../lib/dom.js";
import { parseYouTubeUrl, renderMarkdownDocument } from "../../markdown/renderer.js";
import { renderLessonReferencesInline } from "./lesson-summary.js";
import { readablePageReferences } from "../../lib/page-labels.js";

let youtubeApiPromise;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const previousReady = window.onYouTubeIframeAPIReady;
      const timeout = setTimeout(() => fail(), 10000);
      const ready = () => {
        clearTimeout(timeout);
        window.onYouTubeIframeAPIReady = previousReady;
        previousReady?.();
        resolve(window.YT);
      };
      const fail = () => {
        clearTimeout(timeout);
        if (window.onYouTubeIframeAPIReady === ready) window.onYouTubeIframeAPIReady = previousReady;
        script.remove();
        reject(new Error("YouTube player API unavailable"));
      };
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      window.onYouTubeIframeAPIReady = ready;
      script.onerror = fail;
      document.head.append(script);
    }).catch((error) => {
      youtubeApiPromise = null;
      throw error;
    });
  }
  return youtubeApiPromise;
}

function formatVideoTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function parseVideoSkipRanges(value = "", duration = Infinity) {
  if (!value) return [];
  const ranges = [];
  for (const segment of value.split(",")) {
    const match = /^(\d+)-(\d+)$/.exec(segment.trim());
    if (!match) return [];
    const [from, to] = match.slice(1).map(Number);
    if (!Number.isSafeInteger(from) || !Number.isSafeInteger(to) || to <= from || to > duration) return [];
    ranges.push({ from, to });
  }
  ranges.sort((a, b) => a.from - b.from);
  return ranges.reduce((merged, range) => {
    const previous = merged.at(-1);
    if (previous && range.from <= previous.to) previous.to = Math.max(previous.to, range.to);
    else merged.push({ ...range });
    return merged;
  }, []);
}

export function nextIncludedVideoTime(seconds, ranges) {
  return ranges.find(({ from, to }) => seconds >= from && seconds < to)?.to ?? seconds;
}

function skipStatusText(state, ranges, locale) {
  const times = ranges.map(({ from, to }) => `${formatVideoTime(from)}–${formatVideoTime(to)}`).join("، ");
  const copy = locale === "ar" ? {
    pending:"جار تفعيل تجاوز المقاطع خارج المنهج",
    active:"التجاوز التلقائي مفعّل للمقاطع خارج المنهج",
    unavailable:"تعذّر تفعيل التجاوز التلقائي. تجاوز هذه المقاطع يدويًا",
  } : {
    pending:"Enabling automatic skipping for material outside the syllabus",
    active:"Automatic skipping is active for material outside the syllabus",
    unavailable:"Automatic skipping is unavailable. Skip these sections manually",
  };
  return `${copy[state]}: ${times}.`;
}

function videoIntroParts(source = "") {
  const lines = String(source).replace(/^<!--\s*(?:step-id|presentation):.*?-->\s*$/gim, "").trim().split("\n");
  if (/^#\s+/.test(lines[0] || "")) lines.shift(); // The title is already rendered from the authored step.
  while (lines[0]?.trim() === "") lines.shift();
  const video = /^https?:\/\/\S+$/i.test(lines[0] || "") ? parseYouTubeUrl(lines[0]) : null;
  const sourceUrl = video ? new URL(lines[0]) : null;
  const duration = Number(sourceUrl?.searchParams.get("duration")) || Infinity;
  const skips = parseVideoSkipRanges(sourceUrl?.searchParams.get("skip") || "", duration);
  if (video) lines.shift();
  return { video, skips, resources:lines.join("\n").trim() };
}

export function renderVideoIntro(step, { titleId, locale = "en", summaryStep = null } = {}) {
  const placeholderLabel = locale === "ar" ? "مكان فيديو الدرس" : "Lesson video placeholder";
  const { video, skips, resources } = videoIntroParts(step.source);
  const start = video ? nextIncludedVideoTime(video.start, skips) : 0;
  const embedUrl = video
    ? `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0&controls=1&playsinline=1&fs=1${start ? `&start=${start}` : ""}${skips.length ? `&enablejsapi=1&origin=${encodeURIComponent(globalThis.location?.origin || "")}` : ""}`
    : "";
  // Touch gestures belong to YouTube's native controls, without an app overlay.
  const media = video
    ? `<iframe class="lesson-video-placeholder lesson-video-embed" id="${escapeHtml(titleId)}-player" src="${escapeHtml(embedUrl)}"${skips.length ? ` data-video-skips="${skips.map(({ from, to }) => `${from}-${to}`).join(",")}"` : ""} title="${escapeHtml(locale === "ar" ? `فيديو ${step.title}` : `${step.title} video`)}" width="820" height="461" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    : resources || summaryStep ? "" : `<div class="lesson-video-placeholder" role="img" aria-label="${escapeHtml(placeholderLabel)}"></div>`;
  const summary = summaryStep
    ? `<section class="markdown-authored-content" data-lesson-presentation="lesson-summary" data-inline-summary-step="${escapeHtml(summaryStep.id)}" aria-labelledby="${escapeHtml(titleId)}-summary"><div class="markdown-rendered">${renderMarkdownDocument(summaryStep.source, { locale })}</div></section>`
    : "";
  const guideId = `${titleId}-guide`;
  const guide = resources
    ? `<section class="lesson-video-resources" aria-labelledby="${escapeHtml(guideId)}"><h2 id="${escapeHtml(guideId)}">${video ? (locale === "ar" ? "عن هذا الفيديو" : "About this video") : (locale === "ar" ? "مراجع الدرس" : "Lesson references")}</h2><div class="markdown-rendered">${renderMarkdownDocument(resources, { locale })}</div></section>`
    : "";
  const title = `<h1 class="${step.id === "course-introduction-video" ? "visually-hidden" : "lesson-video-title"}" id="${escapeHtml(titleId)}">${escapeHtml(step.title)}</h1>`;
  const orientationTip = video ? `<p class="lesson-video-orientation-tip">${locale === "ar" ? 'لشاشة أوسع، أدر جهازك أفقيًا ثم اضغط زر ملء الشاشة ⛶ داخل الفيديو.' : 'For a larger view, rotate your device sideways, then use the fullscreen button ⛶ in the video.'}</p>` : "";
  return `<article class="level-lesson-copy ready-lesson-copy lesson-video-intro${guide || summary || video ? " lesson-video-intro--with-resources" : ""}${!video && (resources || summary) ? " lesson-video-intro--guide-only" : ""}">
    ${media ? `<div class="lesson-video-viewport"><div class="lesson-video-stage"><div class="lesson-video-frame">${media}</div></div>${title}${orientationTip}</div>` : title}
    ${skips.length ? `<p class="lesson-video-skip-status" data-video-skip-status="pending" role="status" hidden>${skipStatusText("pending", skips, locale)}</p>` : ""}
    ${guide}
    ${summary ? `<div class="lesson-study-layout"><header class="lesson-study-heading"></header>${summary}</div>` : ""}
  </article>`;
}

export function mountVideoIntro(container, { signal, locale = "en" } = {}) {
  const guide = container.querySelector(".lesson-video-resources");
  const player = container.querySelector(".lesson-video-embed");
  const summaryHeading = container.querySelector("[data-inline-summary-step] h1");
  if (summaryHeading) summaryHeading.id = container.querySelector("[data-inline-summary-step]").getAttribute("aria-labelledby");
  let apiPlayer;
  let playingTimer;
  let playerReady = false;
  const skips = parseVideoSkipRanges(player?.dataset.videoSkips || "");
  if (skips.length) {
    const status = container.querySelector("[data-video-skip-status]");
    const setStatus = state => {
      if (signal?.aborted || !status?.isConnected) return;
      status.dataset.videoSkipStatus = state;
      status.textContent = skipStatusText(state, skips, locale);
    };
    let readyTimeout;
    let lastSeek = { target:-1, at:0 };
    const unavailable = () => {
      clearInterval(playingTimer);
      clearTimeout(readyTimeout);
      playerReady = false;
      setStatus("unavailable");
    };
    const watchTime = () => {
      if (!playerReady || signal?.aborted) return;
      try {
        const current = apiPlayer.getCurrentTime();
        const target = nextIncludedVideoTime(current, skips);
        if (target !== current && (target !== lastSeek.target || Date.now() - lastSeek.at > 750)) {
          lastSeek = { target, at:Date.now() };
          apiPlayer.seekTo(target, true);
        }
      } catch { unavailable(); }
    };
    signal?.addEventListener("abort", () => {
      clearInterval(playingTimer);
      clearTimeout(readyTimeout);
      playerReady = false;
      apiPlayer?.destroy();
    }, { once:true });
    if (!signal || signal.aborted) unavailable();
    else loadYouTubeApi().then((YT) => {
      if (signal.aborted) return;
      readyTimeout = setTimeout(unavailable, 10000);
      apiPlayer = new YT.Player(player, { events:{
        onReady(event) {
          if (signal.aborted) return;
          apiPlayer = event.target;
          clearTimeout(readyTimeout);
          playerReady = true;
          setStatus("active");
          watchTime();
          // Keep watching while paused so a manual seek cannot stay in an excluded section.
          playingTimer = setInterval(watchTime, 250);
        },
        onStateChange:watchTime,
        onError:unavailable,
      } });
    }).catch(unavailable);
  }
  const summaryHost = container.querySelector("[data-inline-summary-step]");
  const studyHeading = container.querySelector(".lesson-study-heading");
  if (summaryHost && studyHeading) {
    const doc = container.ownerDocument;
    if (summaryHeading) {
      summaryHeading.textContent = summaryHeading.textContent.replace(/^خلاصة:\s*/, "");
      studyHeading.append(summaryHeading);
    }
    const scans = summaryHost.querySelector(".lesson-summary-scans");
    if (scans) {
      const sources = doc.createElement("details");
      sources.className = "lesson-study-sources";
      const label = doc.createElement("summary");
      label.textContent = locale === "ar" ? "صفحات الملخص الأصلية" : "Original summary pages";
      sources.append(label, scans);
      summaryHost.append(sources);
    }
    const content = summaryHost.querySelector(".lesson-summary-content");
    const recap = [...content.querySelectorAll(":scope > .lesson-summary-focus")].find(section => /^مراجعة من الملخص/.test(section.querySelector("h2")?.textContent || ""));
    if (recap) content.append(recap);
    const headings = [...summaryHost.querySelectorAll("h2")];
    headings.forEach((heading, position) => {
      const authoredNumber = [...heading.childNodes].find(node => node.nodeType === 3 && node.textContent.trim());
      if (authoredNumber) authoredNumber.textContent = authoredNumber.textContent.replace(/^\s*[\d٠-٩]+[.)،-]\s*/, "");
      if (!heading.id) heading.id = `${summaryHost.getAttribute("aria-labelledby")}-topic-${position + 1}`;
      heading.tabIndex = -1;
      const section = heading.closest(".lesson-summary-focus");
      if (!section) return;
      const label = doc.createElement("header");
      label.className = "lesson-study-section-heading";
      label.append(heading);
      const body = doc.createElement("div");
      body.className = "lesson-study-section-body";
      body.append(...section.childNodes);
      section.append(label, body);

    });

  }
  if (!guide) return;
  const references = guide.ownerDocument.createElement("aside");
  references.className = "lesson-page-references";
  references.setAttribute("aria-label", locale === "ar" ? "صفحات الدرس في مصادره" : "Lesson source pages");
  for (const [file, label] of [["ict", locale === "ar" ? "الكتاب المدرسي" : "Textbook"], ["summary", locale === "ar" ? "الملخص" : "Summary"]]) {
    const links = [...guide.querySelectorAll(`a[href^="assets/books/${file}.pdf"]`)].filter(link => !/^(?:تحميل|Download)/i.test(link.textContent.trim()));
    if (!links.length) continue;
    const card = guide.ownerDocument.createElement("div");
    card.dataset.sourceDocument = file;
    const heading = guide.ownerDocument.createElement("strong");
    heading.textContent = label;
    card.append(heading);
    for (const link of links) {
      const pages = guide.ownerDocument.createElement("span");
      const pageLabel = link.textContent.match(/(?:ص|الصفحة|الصفحات)\s*\d[^\n]*/)?.[0]
        || (file === "ict" ? guide.textContent.match(/الكتاب\s+((?:ص|الصفحة|الصفحات)\s*[\d–—−-]+)/)?.[1] : "");
      if (pageLabel) {
        pages.textContent = readablePageReferences(pageLabel);
        card.append(pages);
      }
      let emptyParent = link.parentElement;
      link.remove();
      while (emptyParent && emptyParent !== guide && !emptyParent.textContent.trim() && !emptyParent.children.length) {
        const parent = emptyParent.parentElement;
        emptyParent.remove();
        emptyParent = parent;
      }
    }
    references.append(card);
  }
  if (references.children.length) (studyHeading || guide).append(references);
  guide.querySelectorAll('a[href^="assets/books/"]').forEach(link => {
    if (!/^(?:تحميل|Download)/i.test(link.textContent.trim())) return;
    link.setAttribute("download", new URL(link.href).pathname.split("/").pop());
    link.classList.add("lesson-source-download");
    const icon = guide.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<path d="M12 3v11m0 0 4-4m-4 4-4-4M4 17v3h16v-3" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
    link.prepend(icon);
  });
  const videoId = player ? new URL(player.src).pathname.split("/").pop() : "";
  const chapters = guide.ownerDocument.createElement("nav");
  chapters.className = "lesson-video-chapters";
  chapters.setAttribute("aria-label", locale === "ar" ? "مواضيع الفيديو" : "Video topics");
  const jumpToChapter = (seconds) => {
    seconds = nextIncludedVideoTime(seconds, skips);
    if (playerReady) apiPlayer.seekTo(seconds, true);
    else {
      const source = new URL(player.src);
      source.searchParams.set("start", String(seconds));
      player.src = source.href;
    }
    const scrollSurface = container.querySelector(".level-layout-task");
    if (scrollSurface) scrollSurface.scrollTop = 0;
    player.focus({ preventScroll:true });
  };
  guide.querySelectorAll("a[href]").forEach(link => {
    const chapter = parseYouTubeUrl(link.getAttribute("href"));
    if (!player || !chapter || chapter.videoId !== videoId) return;
    const button = guide.ownerDocument.createElement("button");
    button.type = "button";
    button.className = "lesson-video-chapter";
    button.dataset.videoChapter = String(chapter.start);
    button.setAttribute("aria-controls", player.id);
    const time = guide.ownerDocument.createElement("span");
    time.className = "lesson-video-chapter-time";
    time.textContent = formatVideoTime(chapter.start);
    const title = guide.ownerDocument.createElement("span");
    title.className = "lesson-video-chapter-title";
    title.textContent = link.textContent.replace(/^في الفيديو:\s*/, "").replace(/^\s*\d{1,2}:\d{2}\s*[—–-]\s*|\s*\d{1,2}:\d{2}\s*$/g, "").trim();
    button.setAttribute("aria-label", `${title.textContent}، ${time.textContent} — ${locale === "ar" ? "انتقل إلى هذا الموضع في الفيديو" : "Go to this point in the video"}`);
    button.append(time, title);
    let emptyParent = link.parentElement;
    link.remove();
    chapters.append(button);
    while (emptyParent && emptyParent !== guide && !emptyParent.textContent.trim() && !emptyParent.children.length) {
      const parent = emptyParent.parentElement;
      emptyParent.remove();
      emptyParent = parent;
    }
    button.addEventListener("click", () => jumpToChapter(chapter.start), { signal });
  });
  if (chapters.children.length) {
    player.closest(".lesson-video-stage").after(chapters);
  }
  renderLessonReferencesInline(guide);
  const points = guide.querySelector('.markdown-rendered > ul');
  if (points?.textContent.trim()) {
    const heading = guide.ownerDocument.createElement('h2');
    heading.className = 'lesson-video-points-heading';
    heading.textContent = locale === 'ar' ? 'أهم النقاط' : 'Key points';
    points.before(heading);
  }
  if (!guide.textContent.trim() || (!guide.querySelector(".markdown-rendered")?.textContent.trim() && !guide.querySelector(".lesson-page-references"))) guide.remove();
}
