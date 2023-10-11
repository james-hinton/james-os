import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.scss";

import { PhoneProvider } from "./context/PhoneContext.jsx";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <PhoneProvider>
      <Router>
        <App />
      </Router>
    </PhoneProvider>
  </React.StrictMode>
);

createRoot(root).render(app);
