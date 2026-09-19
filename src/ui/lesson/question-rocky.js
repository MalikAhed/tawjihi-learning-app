import { preloadImages, revealWhenReady } from "../media-ready.js";

// Temporary developer control. Set false to remove Skip from lesson questions.
export const ENABLE_DEVELOPER_QUESTION_SKIP = true;

export function mountQuestionRocky(host, { signal, locale, onSkip, questionIndex = 0 }) {
  const question = host.querySelector(".ui-lab-mcq");
  if (!question) return { react() {} };
  const idle = questionIndex % 2 === 0 ? "rocky-thinking" : "rocky-thoughtful-discovery";
  question.classList.add("lesson-question-with-rocky");
  question.insertAdjacentHTML("afterbegin", `<figure class="lesson-question-rocky" aria-hidden="true">
    <picture><source media="(prefers-reduced-motion: reduce)" srcset="assets/mascot/${idle}-reduced.svg">
      <img src="assets/mascot/${idle}.svg" alt="" width="200" height="190">
    </picture>
  </figure>`);
  const picture = question.querySelector(".lesson-question-rocky picture");
  const image = picture.querySelector("img");
  const reduced = picture.querySelector("source");
  preloadImages(["assets/mascot/rocky-happy-jump.svg", "assets/mascot/rocky-standing-still-reduced.svg",
    "assets/mascot/rocky-sad.svg", "assets/mascot/rocky-sad-reduced.svg"]);
  revealWhenReady(host.querySelector(".level-layout-task"), { signal });
  if (ENABLE_DEVELOPER_QUESTION_SKIP) {
    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "level-action lesson-question-skip";
    skip.dataset.developerQuestionSkip = "";
    skip.textContent = locale === "ar" ? "تخطّي (اختبار)" : "Skip (test)";
    skip.title = locale === "ar" ? "متابعة الاختبار دون حفظ تقدّم أو منح إنجاز" : "Continue testing without saving progress or awarding completion";
    host.querySelector("[data-template-primary]").before(skip);
    skip.addEventListener("click", onSkip, { signal });
  }
  return {
    react(correct) {
      if (signal.aborted) return;
      reduced.srcset = `assets/mascot/${correct ? "rocky-standing-still-reduced" : "rocky-sad-reduced"}.svg`;
      image.src = `assets/mascot/${correct ? "rocky-happy-jump" : "rocky-sad"}.svg`;
      question.dataset.rockyState = correct ? "happy" : "sad";
    },
  };
}
