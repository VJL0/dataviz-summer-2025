// wrapper.ts
import { createElement } from "./helper";

// Draggable helper
function makeDraggable(wrapper: HTMLElement) {
  const header = wrapper.querySelector<HTMLElement>(".dv-header")!;
  let px = 0;
  let py = 0;

  function onMove(e: PointerEvent) {
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    px = e.clientX;
    py = e.clientY;
    wrapper.style.left = wrapper.offsetLeft + dx + "px";
    wrapper.style.top = wrapper.offsetTop + dy + "px";
  }

  function onUp(e: PointerEvent) {
    header.releasePointerCapture(e.pointerId);
    document.removeEventListener("pointermove", onMove);
  }

  header.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    px = e.clientX;
    py = e.clientY;
    header.setPointerCapture(e.pointerId);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp, { once: true });
    document.addEventListener("pointercancel", onUp, { once: true });
  });
}

function wrapElement(element: HTMLElement) {
  // Format:
  // <div class="dv-wrapper">
  //   <div class="dv-header" />
  //   <div class="dv-content">
  //     {cloned element}
  //   </div>
  // </div>

  const wrapper = createElement("div", "dv-wrapper");
  const header = createElement("div", "dv-header");
  const content = createElement("div", "dv-content");

  wrapper.appendChild(header);
  wrapper.appendChild(content);
  content.appendChild(element);

  return wrapper;
}

function createDraggableWrapper(element: HTMLElement) {
  const wrapper = wrapElement(element);
  makeDraggable(wrapper);
  return wrapper;
}

export { createDraggableWrapper };
