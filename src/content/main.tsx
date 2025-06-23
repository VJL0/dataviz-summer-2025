import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// CSS Imports
import tailwindStyles from "./tailwind.css?inline"; // full Tailwind + @property defs
import customStyles from "./app.css?raw"; // your local overrides

// Split Tailwind into “core” + “@property” sections
const firstPropertyIndex = tailwindStyles.indexOf("@property");
const coreTailwindCSS = tailwindStyles.slice(0, firstPropertyIndex);
const propertyDefinitions = tailwindStyles.slice(firstPropertyIndex);

// Inject global @property defs into document <head>
const globalPropertyStyle = document.createElement("style");
globalPropertyStyle.textContent = propertyDefinitions;
document.head.appendChild(globalPropertyStyle);

// Set up host container + Shadow DOM
const container = document.createElement("div");
container.id = "dataviz-host";
document.documentElement.appendChild(container);

const shadowRoot = container.attachShadow({ mode: "open" });

// Create constructable stylesheets for Shadow DOM
const tailwindSheet = new CSSStyleSheet();
tailwindSheet.replaceSync(coreTailwindCSS);

const customSheet = new CSSStyleSheet();
customSheet.replaceSync(customStyles);

shadowRoot.adoptedStyleSheets = [tailwindSheet, customSheet];

// Mount React app into Shadow DOM
createRoot(shadowRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
