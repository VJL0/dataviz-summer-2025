// 0. Inject our utility CSS once
const styleTag = document.createElement("style");
styleTag.textContent = `
  /* hide the whole document */
  .dv-hidden-page {
    background: grey;
    visibility: hidden;
  }

  /* outer wrapper */
  .dv-wrapper {
    position: absolute;
    padding: 0 5px 5px 5px;
    border-radius: 5px;
    overflow: auto;
    resize: horizontal;
    background: black;
    visibility: visible;
  }

  /* draw our own light-grey triangle on bottom-right */
  .dv-wrapper::after {
    content: "";
    position: absolute;
    border-right: 16px solid lightgrey;
    border-top: 16px solid transparent;
    right: 5px;
    bottom: 5px;
    pointer-events: none;
  }

  /* drag handle */
  .dv-wrapper .dv-header {
    height: 20px;
    cursor: move;
    user-select: none;
  }

  /* content area */
  .dv-wrapper .dv-content {
    padding: 10px;
    background: white;
    user-select: none;
    pointer-events: none;
  }
`;

document.head.appendChild(styleTag);

// 1. Open/Close panel functions
function hideHTML() {
  document.documentElement.classList.add("dv-hidden-page");
}

function showHTML() {
  document.documentElement.classList.remove("dv-hidden-page");
}

// 2. Wrap SVG and make draggable
function wrapSvg(svg: SVGSVGElement): HTMLDivElement {
  // Create a wrapper <div>
  const wrapper = document.createElement("div");
  wrapper.classList.add("dv-wrapper");

  // Create a header for the wrapper and give it draggable class
  const header = document.createElement("div");
  header.classList.add("dv-header");
  wrapper.appendChild(header);

  // Create a content for the wrapper
  const content = document.createElement("div");
  content.classList.add("dv-content");
  wrapper.appendChild(content);

  // Insert the wrapper and move the SVG into it
  const parent = svg.parentNode!;
  parent.insertBefore(wrapper, svg);
  content.appendChild(svg);

  // Set the wrapper's position and size based on the SVG
  const rect = svg.getBoundingClientRect();
  wrapper.style.width = rect.width + "px";

  return wrapper;
}

function unwrapSvg(svg: SVGSVGElement) {
  const content = svg.parentElement!;
  const wrapper = content.parentElement!;
  wrapper.replaceWith(svg);
}

// 3. Draggable helper
function makeDraggable(c: HTMLElement) {
  const h = c.querySelector<HTMLElement>(".dv-header")!;
  let px = 0;
  let py = 0;

  function onMove(e: PointerEvent) {
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    px = e.clientX;
    py = e.clientY;
    c.style.left = c.offsetLeft + dx + "px";
    c.style.top = c.offsetTop + dy + "px";
  }

  function onUp(e: PointerEvent) {
    h.releasePointerCapture(e.pointerId);
    document.removeEventListener("pointermove", onMove);
  }

  h.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    px = e.clientX;
    py = e.clientY;
    h.setPointerCapture(e.pointerId);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp, { once: true });
    document.addEventListener("pointercancel", onUp, { once: true });
  });
}

function handleOpen() {
  const svgElements = document.querySelectorAll<SVGSVGElement>("svg")!;
  svgElements.forEach((svgElement) => {
    console.log("Found SVG:", svgElement);
    const wrapper = wrapSvg(svgElement);
    makeDraggable(wrapper);
    setResizable(svgElement);
  });

  hideHTML();
}

function handleClose() {
  const svgElements = document.querySelectorAll<SVGSVGElement>("svg")!;
  svgElements.forEach((svgElement) => {
    unwrapSvg(svgElement);
  });

  showHTML();
}

function setResizable(svg: SVGSVGElement) {
  // read original dimensions
  const rect = svg.getBoundingClientRect();

  // set viewBox and preserveAspectRatio
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  svg.setAttribute("preserveAspectRatio", "xMinYMin meet");

  // remove fixed sizing
  svg.removeAttribute("width");
  svg.removeAttribute("height");
}

// listen for messages from background or popup
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === "PROCESS_SVGS") {
    handleOpen();
  }
});
