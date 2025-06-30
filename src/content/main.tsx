import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Content Script
import "./scripts/chart-detector";
import "./scripts/logic";

// CSS Imports
import tailwindStyles from "./styles/tailwind.css?inline"; // full Tailwind + @property defs
import customStyles from "./styles/app.css?raw"; // your local overrides

// Split Tailwind into “core” + “@property” sections
const propertyIndex = tailwindStyles.indexOf("@property");

// Inject global @property defs into document <head>
const globalStyles = document.createElement("style");
globalStyles.textContent = tailwindStyles.slice(propertyIndex);
document.head.appendChild(globalStyles);

// Set up host container + Shadow DOM
const container = document.createElement("div");
container.id = "dataviz-host";
document.documentElement.appendChild(container);
const shadowRoot = container.attachShadow({ mode: "open" });

// Create constructable stylesheets for Shadow DOM
const tailwindSheet = new CSSStyleSheet();
tailwindSheet.replaceSync(tailwindStyles.slice(0, propertyIndex));

const customSheet = new CSSStyleSheet();
customSheet.replaceSync(customStyles);

shadowRoot.adoptedStyleSheets = [tailwindSheet, customSheet];

// Mount React app into Shadow DOM
createRoot(shadowRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
