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

// Custom Element Definition
class DataVisDecomposer extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadow.adoptedStyleSheets = createShadowSheets();

    createRoot(this.shadow).render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>,
    );
  }
}

customElements.define("datavis-decomposer", DataVisDecomposer);

const app = document.createElement("datavis-decomposer");
document.documentElement.appendChild(app);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SHOW_ICONS") {
    window.postMessage(
      { source: "datavis-decomposer", action: "show-icons" },
      "*",
    );
  }
});
