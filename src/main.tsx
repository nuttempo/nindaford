import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ต้องชี้ไปที่ App.tsx

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Please check index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
