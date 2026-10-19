import React from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App";
import "leaflet/dist/leaflet.css";
import "./styles/global.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
