import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import InjectTailwind from "./InjectTailwind";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <InjectTailwind>
        <App />
      </InjectTailwind>
    </Router>
  </React.StrictMode>
);
