import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./style.css";

const rootElement = document.createElement("div");
rootElement.id = "container";

document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
