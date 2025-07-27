import { useAppSelector } from "../app/hooks";
import { cloneElement, getSvgElement } from "../utils";
import DraggableWrapper from "./DraggableWrapper";
import { createPortal } from "react-dom";

const CurriculumResults = () => {
  const selectedChartId = useAppSelector(
    (state) => state.ui.selection.chartId,
  )!;
  const svgElement = getSvgElement(selectedChartId);
  const clonedParent = cloneElement(svgElement.parentElement!);
  const clonedSvg = getSvgElement(selectedChartId, clonedParent);
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
    <div className="fixed">
      {createPortal(
        <DraggableWrapper>
          <div dangerouslySetInnerHTML={{ __html: clonedParent.outerHTML }} />
        </DraggableWrapper>,
        document.body,
      )}
    </div>
  );
};

export default CurriculumResults;
