import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./tailwind.css";

const domNode = document.getElementById("root");
domNode?.classList.add("h-screen", "bg-slate-300", "bg-polka-dot-pattern");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
