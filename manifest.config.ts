import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    16: "icon-16.png",
    32: "icon-32.png",
    48: "icon-48.png",
    128: "icon-128.png",
  },
  action: {
    default_title: "Click to process Charts",
    default_icon: {
      16: "icon-16.png",
      32: "icon-32.png",
    },
  },
  permissions: ["scripting", "storage", "tabs"],
  host_permissions: ["*://www.nytimes.com/*"],
  background: {
    service_worker: "src/background/main.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["*://www.nytimes.com/*"],
      js: ["src/content/main.tsx"],
    },
  ],
});
