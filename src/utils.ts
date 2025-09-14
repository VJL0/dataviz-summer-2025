import { Message } from "@/types";

export function sendMessageToBackground<TResponse>(
  message: Message,
): Promise<TResponse> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      const lastError = chrome.runtime.lastError;
      if (lastError) reject(lastError.message);
      else resolve(response);
    });
  });
}

export function cloneElement<T extends Element>(element: T): T {
  return element.cloneNode(true) as T;
}

export function getElementByGraphId<T extends Element>(
  id: string,
  root: ParentNode = document,
): T {
  return root.querySelector<T>(`[data-expert-graph-id="${id}"]`)!;
}
