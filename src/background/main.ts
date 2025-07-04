import { Message } from "../types";

chrome.action.onClicked.addListener((tab) => {
  if (typeof tab.id !== "number") return;
  chrome.tabs.sendMessage(tab.id, { type: "PROCESS_SVGS" });
});

function handleMessage(message: Message): Promise<any> {
  switch (message.type) {
    case "FETCH_CURRICULUM":
      return postJSON("api/analyze-graph", {
        svgHTML: message.payload.svgHTML,
      });

    case "FETCH_SVG":
      return postJSON("api/update-svg", {
        svgHTML: message.payload.svgHTML,
        topic: message.payload.topic,
      });

    case "FETCH_ANSWER":
      return postJSON("api/ask-question", {
        question: message.payload.question,
        topic: message.payload.topic,
      });

    default:
      return Promise.reject(new Error("Unknown message type"));
  }
}

async function postJSON(url: string, data: any) {
  const response = await fetch(`http://localhost:8000/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  handleMessage(message)
    .then(sendResponse)
    .catch((err) => {
      console.error("Fetch error:", err);
      sendResponse({ error: err.message });
    });

  return true;
});
