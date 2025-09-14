import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

import {
  createShadowSheets,
  injectPropertyStyles,
} from "./styles/loadShadowStyles";

// Load light DOM styles globally
import.meta.glob("./styles/light/*.css", { eager: true });
injectPropertyStyles();

const wrapper = document.createElement("div");
wrapper.id = "dv-root";
wrapper.style.position = "absolute";
wrapper.style.top = "0";
wrapper.style.left = "0";
wrapper.style.width = "100%";
wrapper.style.height = "100%";
wrapper.style.zIndex = "2147483647"; // Maximum z-index value to ensure it's on top
const shadow = wrapper.attachShadow({ mode: "open" });
shadow.adoptedStyleSheets = createShadowSheets();
document.body.appendChild(wrapper);

createRoot(shadow).render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>,
);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SHOW_ICONS") {
    window.postMessage(
      { source: "datavis-decomposer", action: "show-icons" },
      "*",
    );
  }
});
