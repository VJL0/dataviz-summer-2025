import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App";
import tailwind from "@/styles/tailwind.css?inline";
import styles from "./main.css?raw";

const container = document.createElement("div");
container.id = "dataviz-container";

const shadowRoot = container.attachShadow({ mode: "open" });

const style = document.createElement("style");
style.textContent = tailwind + styles;
shadowRoot.appendChild(style);

createRoot(shadowRoot).render(
  <StrictMode>
    <App />
  </StrictMode>
);

document.documentElement.appendChild(container);
