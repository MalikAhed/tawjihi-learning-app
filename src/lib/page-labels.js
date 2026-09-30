// Spell out source-page labels so ranges cannot be mistaken for video timestamps.
export function readablePageReferences(value) {
  return value.replace(/(^|[\s،؛:(])ص\s*(\d+(?:\s*(?:[–−-]|،|و)\s*\d+)*)/g, (_, prefix, pages) => {
    const multiple = /[–−-]|،|و/.test(pages);
    const range = pages.replace(/(\d+)\s*[–−-]\s*(\d+)/g, "من $1 إلى $2");
    return `${prefix}${multiple ? "الصفحات" : "الصفحة"} ${range}`;
  });
}
