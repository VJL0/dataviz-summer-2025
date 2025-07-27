// helper.ts
// create an element with a class name
export function createElement(element: string, className: string): HTMLElement {
  const el = document.createElement(element);
  el.classList.add(className);
  return el;
}

export function getSvgElement(
  id: string,
  refElement: ParentNode = document,
): SVGSVGElement {
  return refElement.querySelector<SVGSVGElement>(
    `svg[data-expert-graph-id="${id}"]`,
  )!;
}

export function cloneElement<T extends Element>(element: T): T {
  return element.cloneNode(true) as T;
}
