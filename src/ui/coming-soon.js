/** A locked navigation action leaves the current page and lesson intact. */
export function mountComingSoonToast(element) {
  let timer;
  function hide() {
    clearTimeout(timer);
    element.hidden = true;
  }
  return {
    show() {
      clearTimeout(timer);
      element.textContent = "قريبًا";
      element.hidden = false;
      timer = setTimeout(hide, 2500);
    },
  };
}
