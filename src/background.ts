import { Message } from "./types";

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: "SHOW_ICONS" });
  }
});

function handleMessage(message: Message): Promise<any> {
  switch (message.type) {
    case "FETCH_CURRICULUM":
      return postJSON("/api/generate-curriculum", {
        svg: message.payload.svgHTML,
      });

    case "FETCH_ANSWER":
      return postJSON("/api/generate-answer", {
        question: message.payload.question,
        topic: message.payload.topic,
      });

    case "FETCH_SVG":
      return postJSON("/api/generate-svg", {
        svg: message.payload.svgHTML,
        topic: message.payload.topic,
      });
    default:
      return Promise.reject(new Error("Unknown message type"));
  }
}

async function postJSON(url: string, data: any) {
  console.log("Posting JSON to:", url, "with data:", data);
  const response = await fetch(`http://localhost:8000${url}`, {
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
