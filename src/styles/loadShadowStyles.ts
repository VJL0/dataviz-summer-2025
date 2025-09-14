import tailwindStyles from "./tailwind.css?inline";

const propertyIndex = tailwindStyles.indexOf("@property");

const shadowModules = import.meta.glob("./shadow/*.css", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function createShadowSheets(): CSSStyleSheet[] {
  const sheets: CSSStyleSheet[] = [];

  // Core tailwind sheet (before @property)
  const tailwindSheet = new CSSStyleSheet();
  tailwindSheet.replaceSync(tailwindStyles.slice(0, propertyIndex));
  sheets.push(tailwindSheet);

  // All shadow styles
  for (const raw of Object.values(shadowModules)) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(raw);
    sheets.push(sheet);
  }

  return sheets;
}

export function injectPropertyStyles() {
  const globalStyle = document.createElement("style");
  globalStyle.textContent = tailwindStyles.slice(propertyIndex);
  document.head.appendChild(globalStyle);
}
