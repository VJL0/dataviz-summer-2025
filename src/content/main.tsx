import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Raw CSS imports
import "./tailwind.css";
import tailwindStyles from "./tailwind.css?inline";
// import propertyDefinitions from "./property.css?raw";
import customStyles from "./app.css?raw";

// Create root host container
const container = document.createElement("div");
container.id = "dataviz-host";

// Inject @property definitions globally (required for Tailwind v4)
// const globalPropertyStyle = document.createElement("style");
// globalPropertyStyle.textContent = propertyDefinitions;
// document.head.appendChild(globalPropertyStyle);

// Create Shadow DOM
const shadowRoot = container.attachShadow({ mode: "open" });

// Create and apply constructable stylesheets
const tailwindSheet = new CSSStyleSheet();
tailwindSheet.replaceSync(tailwindStyles);

const customSheet = new CSSStyleSheet();
customSheet.replaceSync(customStyles);

shadowRoot.adoptedStyleSheets = [tailwindSheet, customSheet];

// Mount React app inside Shadow DOM
createRoot(shadowRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Attach container to document
document.documentElement.appendChild(container);
