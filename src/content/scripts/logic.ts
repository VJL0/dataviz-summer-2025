// logic.ts

import { cloneElement, getGraphElement } from "./helper";
import { createDraggableWrapper } from "./wrapper";

function makeSvgResponsive(svg: SVGSVGElement) {
  console.log("makeSvgResponsive", svg);
  // read original dimensions
  const rect = svg.getBoundingClientRect();
  console.log("rect", rect);

  // set viewBox and preserveAspectRatio
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  svg.setAttribute("preserveAspectRatio", "xMinYMin meet");

  // remove fixed sizing
  svg.removeAttribute("width");
  svg.removeAttribute("height");
}

function makeParentResponsive(parent: HTMLElement) {
  parent.style.width = "";
  parent.style.height = "";
}

function handleChartIconClick(svgId: string) {
  // 1) grab the original SVG
  const originalSvg = getGraphElement(svgId);

  // 2) clone the SVG parent element
  const clonedParent = cloneElement(originalSvg.parentElement!);

  // 3) wrap it in a draggable wrapper
  const wrapper = createDraggableWrapper(clonedParent);

  // 4) get the cloned SVG
  const clonedSvg = getGraphElement(svgId, wrapper);

  // 5) append to DOM first so layout happens
  document.documentElement.appendChild(wrapper);

  // 6) make the elements inside the wrapper responsive
  makeParentResponsive(clonedParent);
  makeSvgResponsive(clonedSvg);

  // 7) hide everything but the SVG
  clonedParent.classList.add("dv-hidden");
  clonedSvg.classList.add("dv-visible");

  // 8) position wrapper based on the original
  const rect = originalSvg.getBoundingClientRect();
  wrapper.style.width = rect.width + "px";
  wrapper.style.left = rect.left + "px";
  wrapper.style.top = rect.top + "px";
}

export { handleChartIconClick };
