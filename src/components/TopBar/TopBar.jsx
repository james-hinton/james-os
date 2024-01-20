import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import the hook

import Island from "./components/Island/Island";
import StatusBar from "./components/StatusBar/StatusBar";

import "./TopBar.scss";

const TopBar = () => {
  const location = useLocation();
  const [locked, setLocked] = useState(location.pathname === "/");

  useEffect(() => {
    setLocked(location.pathname === "/");
  }, [location]);

  return (
    <div className="top-bar">
      <div className="island-container">
        <Island locked={locked} />
      </div>
      <StatusBar />
    </div>
  );
};

export default TopBar;
