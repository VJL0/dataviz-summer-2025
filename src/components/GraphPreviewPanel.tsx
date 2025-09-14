import { cloneElement, getElementByGraphId } from "@/utils";
import { useAppSelector } from "@/app/hooks";
import FloatingPanel from "./FloatingPanel";

const GraphPreviewPanel = () => {
  const selectedChartId = useAppSelector(
    (state) => state.ui.selection.chartId,
  )!;
  const svgElement = getElementByGraphId<SVGSVGElement>(selectedChartId);
  const clonedParent = cloneElement(svgElement.parentElement!);
  const clonedSvg = getElementByGraphId<SVGSVGElement>(
    selectedChartId,
    clonedParent,
  );

  clonedParent.style.width = "";
  clonedParent.style.height = "";
  const originalRect = svgElement.getBoundingClientRect();
  console.log("originalRect", originalRect);
  clonedSvg.setAttribute(
    "viewBox",
    `0 0 ${originalRect.width} ${originalRect.height}`,
  );
  clonedSvg.setAttribute("preserveAspectRatio", "xMinYMin meet");
  clonedSvg.removeAttribute("width");
  clonedSvg.removeAttribute("height");

  clonedParent.style.overflow = "hidden";
  clonedParent.style.visibility = "hidden";
  clonedSvg.style.visibility = "visible";
  console.log("clonedParent", clonedParent);

  return (
    <FloatingPanel
      resizable
      initialPosition={{
        x: 50,
        y: window.innerHeight / 2 + window.scrollY - originalRect.height / 2,
      }}
      initialWidth={window.innerWidth / 2 - 100}
    >
      <div dangerouslySetInnerHTML={{ __html: clonedParent.outerHTML }} />
    </FloatingPanel>
  );
};

export default GraphPreviewPanel;
