import { useEffect, FC } from "react";
import FloatingIcon from "./FloatingIcon";

const isGraph = (svgElement: SVGSVGElement): boolean => {
  const graphElements = svgElement.querySelectorAll<SVGGraphicsElement>(
    "g, path, rect, circle, line, polyline, polygon, title, text",
  );

  const svgContent = svgElement.outerHTML.toLowerCase();
  const chartWordsPattern =
    /\b(?:chart|charts?|bar charts?|line charts?|pie charts?|area charts?|scatter charts?|bubble charts?|histograms?|box plot|funnel chart|polar chart|radar chart|heatmap|tree map|sankey diagram|waterfall chart|candlestick chart|graph|graphs?|plot|plots?|diagram|diagrams?|data visualization|visualization|trendline|trend|data plot|data points?|scatter|axis|axes|coordinates?|grid|legend|point|points?|dataset|data series|plotly|d3\\.js|chart\\.js|highcharts)\b/;

  const hasChartWord = chartWordsPattern.test(svgContent);
  const hasHighchartsClass =
    svgElement.classList.contains("highcharts-root") ||
    svgContent.includes("highcharts");

  const { width, height } = svgElement.getBoundingClientRect();

  return (
    (graphElements.length > 0 || hasChartWord || hasHighchartsClass) &&
    width > 100 &&
    height > 100
  );
};

type ChartMeta = {
  id: string;
  element: Element;
};

interface FloatingIconManagerProps {
  onIconClick: (id: string) => void;
  charts: ChartMeta[];
  setCharts: React.Dispatch<React.SetStateAction<ChartMeta[]>>;
}

const FloatingIconManager: FC<FloatingIconManagerProps> = ({
  onIconClick,
  charts,
  setCharts,
}) => {
  const scanCharts = () => {
    const found: ChartMeta[] = [];

    document
      .querySelectorAll<SVGSVGElement>("svg:not([data-expert-graph-id])")
      .forEach((svg) => {
        if (isGraph(svg)) {
          const id = crypto.randomUUID();
          svg.dataset.expertGraphId = id;
          svg.parentElement!.dataset.expertGraphId = `${id}-parent`;
          found.push({ id, element: svg.parentElement! });
        }
      });

    setCharts((prev) => [...prev, ...found]);
  };

  // Listen for messages from the background script
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const { source, data } = event;

      if (source !== window) return;
      if (data.source !== "datavis-decomposer") return;
      if (data.action === "show-icons") scanCharts();
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Update positions when window is resized
  useEffect(() => {
    function updatePositions() {
      setCharts((prev) => [...prev]);
    }

    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return (
    <div className="floating-icon-manager">
      {charts.map((chart) => {
        const rect = chart.element.getBoundingClientRect();
        return (
          <FloatingIcon
            key={chart.id}
            id={chart.id}
            onClick={onIconClick}
            top={rect.top + window.scrollY}
            left={rect.left + window.scrollX}
          />
        );
      })}
    </div>
  );
};

export default FloatingIconManager;
