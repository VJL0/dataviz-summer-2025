// ------------------ Imports ------------------
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App";
import cssText from "./main.css?raw";

// ------------------ DOM Setup ------------------
const container = document.createElement("div");
container.id = "dataviz-container";

// Attach Shadow DOM
const shadowRoot = container.attachShadow({ mode: "open" });

// ------------------ Style Injection ------------------
const style = document.createElement("style");
style.textContent = cssText;
shadowRoot.appendChild(style);

// ------------------ React Mount ------------------
createRoot(shadowRoot).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// ------------------ DOM Insertion ------------------
document.documentElement.appendChild(container);

// ------------------ Debug ------------------
console.log("[CRXJS] Hello world from content script!");
