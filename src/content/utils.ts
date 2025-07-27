import { ChromeMessage } from "./types";

export function openReactApp() {
  disableScroll();
  chrome.storage.local.set({ isOpen: true });

  // 1) grab the host from the light DOM
  const host = document.getElementById("expert-process-extension-container");
  if (!host) return;

  // 2) reach into its shadowRoot
  const shadow = host.shadowRoot;
  if (!shadow) return;

  // 3) query the react container *inside* the shadow
  const container = shadow.getElementById("expert-process-extension-root");
  if (container) container.style.display = "";
}

export function closeReactApp() {
  deleteSvgCopies();
  enableScroll();
  iconButtonsState("enable");

  chrome.storage.local.set({ isOpen: false, svgId: "" });

  const host = document.getElementById("expert-process-extension-container");
  if (!host) return;

  const shadow = host.shadowRoot;
  if (!shadow) return;

  const container = shadow.getElementById("expert-process-extension-root");
  if (container) container.style.display = "none";
}

function disableScroll() {
  document.documentElement.classList.add("disable-scrolling");
}
function enableScroll() {
  document.documentElement.classList.remove("disable-scrolling");
}

export function sendChromeMessage(message: ChromeMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve(response);
    });
  });
}

type ButtonState = "enable" | "disable";
export function iconButtonsState(state: ButtonState) {
  const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".expert-submit-button",
  );
  if (state === "enable") {
    buttons.forEach((button) => (button.style.display = ""));
  } else if (state === "disable") {
    buttons.forEach((button) => (button.style.display = "none"));
  }
}

export function getSvgReference(
  svgId: string,
  copy = false,
): SVGSVGElement | null {
  if (copy) {
    return document.querySelector(`svg[data-expert-svg-copy-id="${svgId}"]`);
  }
  return document.querySelector(`svg[data-expert-graph-id="${svgId}"]`);
}

export function deleteSvgCopies() {
  const allSvgCopies: NodeListOf<SVGSVGElement> = document.querySelectorAll(
    `svg[data-expert-svg-copy-id]`,
  );
  allSvgCopies.forEach((copy) => copy.remove());
}

export function cloneElement<T extends Element>(element: T): T {
  return element.cloneNode(true) as T;
}

export function getSvgElement(
  id: string,
  root: ParentNode = document,
): SVGSVGElement {
  return root.querySelector<SVGSVGElement>(
    `svg[data-expert-graph-id="${id}"]`,
  )!;
}
