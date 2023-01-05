import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GlobalProvider } from "./components/context/GlobalState";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
