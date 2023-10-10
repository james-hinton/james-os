import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

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

ReactDOM.createRoot(root).render(app);
