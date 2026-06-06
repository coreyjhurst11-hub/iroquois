import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const css = document.createElement("style");
css.textContent = `html,body,#root{margin:0;background:#06080F;min-height:100%;}*{scroll-behavior:smooth;}`;
document.head.appendChild(css);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
