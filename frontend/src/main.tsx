/**
 * main.tsx
 * --------
 * Entry point for the React application.
 * Ensures the #root element exists before mounting.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Ensure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    'Root element not found. Make sure index.html contains <div id="root"></div>'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);