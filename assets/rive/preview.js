const canvas = document.querySelector("#rive-canvas");
const celebrateButton = document.querySelector("#celebrate");
const pauseButton = document.querySelector("#pause");
const status = document.querySelector("#rive-status");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");

let danceInput = null;
let ready = false;
let manuallyPaused = false;

const animation = new rive.Rive({
  src: "./rocky-happy-dance.riv",
  canvas,
  artboard: "Rocky Happy Dance",
  stateMachine: "Rocky Dance State",
  autoplay: !motionPreference.matches,
  layout: new rive.Layout({ fit: rive.Fit.Contain }),
  onLoad() {
    animation.resizeDrawingSurfaceToCanvas();
    danceInput = animation
      .stateMachineInputs("Rocky Dance State")
      .find((input) => input.name === "dance");
    ready = Boolean(danceInput);
    celebrateButton.disabled = !ready || motionPreference.matches;
    pauseButton.disabled = !ready || motionPreference.matches;
    status.textContent = motionPreference.matches
      ? "تم احترام إعداد تقليل الحركة في جهازك."
      : "الحركة جاهزة وتعمل محليًا.";
  },
  onLoadError(error) {
    console.error("Rive pilot could not load.", error);
    status.textContent = "تعذّر تحميل الحركة.";
    celebrateButton.disabled = true;
    pauseButton.disabled = true;
  },
});

celebrateButton.disabled = true;
pauseButton.disabled = true;

celebrateButton.addEventListener("click", () => {
  if (!ready || motionPreference.matches) return;
  if (manuallyPaused) {
    animation.play();
    manuallyPaused = false;
    pauseButton.textContent = "إيقاف مؤقت";
  }
  danceInput.fire();
  status.textContent = "روكي يرقص الآن بسعادة!";
});

pauseButton.addEventListener("click", () => {
  if (!ready || motionPreference.matches) return;
  manuallyPaused = !manuallyPaused;
  if (manuallyPaused) {
    animation.pause();
    pauseButton.textContent = "متابعة الحركة";
    status.textContent = "الحركة متوقفة مؤقتًا.";
  } else {
    animation.play();
    pauseButton.textContent = "إيقاف مؤقت";
    status.textContent = "تمت متابعة الحركة.";
  }
});

motionPreference.addEventListener("change", ({ matches }) => {
  celebrateButton.disabled = !ready || matches;
  pauseButton.disabled = !ready || matches;
  if (matches) {
    animation.pause();
    manuallyPaused = true;
    status.textContent = "تم إيقاف الحركة احترامًا لإعداد تقليل الحركة.";
  } else if (ready) {
    animation.play();
    manuallyPaused = false;
    pauseButton.textContent = "إيقاف مؤقت";
    status.textContent = "الحركة جاهزة وتعمل محليًا.";
  }
});

addEventListener("resize", () => animation.resizeDrawingSurfaceToCanvas());
