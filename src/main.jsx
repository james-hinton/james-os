import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.scss";
import { PhoneProvider } from "./context/PhoneContext.jsx";

function MainRouter() {
  const [attemptedPaths, setAttemptedPaths] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<App attemptedPaths={attemptedPaths} />} />
      <Route
        path="*"
        element={<RedirectHandler setAttemptedPaths={setAttemptedPaths} />}
      />
    </Routes>
  );
}

function RedirectHandler({ setAttemptedPaths }) {
  const location = useLocation();

  useEffect(() => {
      setAttemptedPaths((prevPaths) => [...prevPaths, location.pathname]);
  }, [location, setAttemptedPaths]);

  return <Navigate to="/" replace />;
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <PhoneProvider>
    <Router>
      <MainRouter />
    </Router>
  </PhoneProvider>
);
