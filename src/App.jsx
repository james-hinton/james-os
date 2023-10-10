import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Pages
import Lock from "./pages/Lock/Lock";
import Home from "./pages/Home/Home";

// Components
import TopBar from "./components/TopBar/TopBar";

const App = () => {
  const location = useLocation();
  const [showLock, setShowLock] = useState(true);

  useEffect(() => {
    setShowLock(location.pathname === '/');
  }, [location.pathname]);

  return (
    <div id="phone">
      <TopBar />
      <Home />
      {showLock && <Lock />}
    </div>
  );
};
export default App;
