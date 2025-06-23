// URL to our icon asset
const iconPath: string = chrome.runtime.getURL("icons/icon-48.png");

function isGraph(svgElement: SVGSVGElement): boolean {
  // find any of these graphic tags
  const graphElements: NodeListOf<SVGGraphicsElement> =
    svgElement.querySelectorAll<SVGGraphicsElement>(
      "g, path, rect, circle, line, polyline, polygon, title, text",
    );

  // look for chart-related keywords
  const svgContent: string = svgElement.outerHTML.toLowerCase();
  const chartWordsPattern =
    /\b(?:chart|charts?|bar charts?|line charts?|pie charts?|area charts?|scatter charts?|bubble charts?|histograms?|box plot|funnel chart|polar chart|radar chart|heatmap|tree map|sankey diagram|waterfall chart|candlestick chart|graph|graphs?|plot|plots?|diagram|diagrams?|data visualization|visualization|trendline|trend|data plot|data points?|scatter|axis|axes|coordinates?|grid|legend|point|points?|dataset|data series|plotly|d3\.js|chart\.js|highcharts)\b/;
  const hasChartWord: boolean = chartWordsPattern.test(svgContent);

  // ensure it’s big enough to matter
  const { width, height } = svgElement.getBoundingClientRect();

  // also detect Highcharts library
  const hasHighchartsClass: boolean =
    svgElement.classList.contains("highcharts-root") ||
    svgContent.includes("highcharts");

  return (
    (graphElements.length > 0 || hasChartWord || hasHighchartsClass) &&
    width > 100 &&
    height > 100
  );
}

function createAndAttachIconButton(svgElement: SVGSVGElement): void {
  const button: HTMLButtonElement = document.createElement("button");
  button.classList.add("expert-submit-button");
  Object.assign(button.style, {
    position: "absolute",
    top: "0",
    left: "0",
    height: "48px",
    width: "48px",
    backgroundImage: `url(${iconPath})`,
    cursor: "pointer",
  });

  button.onclick = (): void => {
    const rect = svgElement.getBoundingClientRect();
    const elementTopAbsolute = rect.top + window.pageYOffset;
    const offset = window.innerHeight * 0.2;

    window.scrollTo({
      top: elementTopAbsolute - offset,
      behavior: "instant",
    });

    chrome.storage.local.set({
      isOpen: true,
      svgId: svgElement.dataset.expertGraphId,
    });

    iconButtonsState("disable");
  };

  svgElement.parentElement?.appendChild(button);
}

export function processSVGs(): void {
  console.log("Processing SVGs...");
  document
    .querySelectorAll<SVGSVGElement>("svg:not([data-expert-graph-id])")
    .forEach((svgElement) => {
      if (isGraph(svgElement)) {
        // assign a random id for later reference
        svgElement.dataset.expertGraphId = crypto.randomUUID();
        createAndAttachIconButton(svgElement);
      }
    });
}

function iconButtonsState(state: "enable" | "disable") {
  document
    .querySelectorAll<HTMLButtonElement>(".expert-submit-button")
    .forEach((button) => {
      button.style.display = state === "enable" ? "" : "none";
    });
}

// listen for messages from background or popup
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === "PROCESS_SVGS") {
    processSVGs();
  }
});
