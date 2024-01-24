import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Pages
import Lock from "./pages/Lock/Lock";
import Home from "./pages/Home/Home";

// Components
import TopBar from "./components/TopBar/TopBar";

const App = (
  { attemptedPaths }
) => {
  const location = useLocation();
  const [showLock, setShowLock] = useState(true);
  const [lockScreenLoaded, setLockScreenLoaded] = useState(false);
  const [startLoadingHome, setStartLoadingHome] = useState(false);

  useEffect(() => {
    if (!lockScreenLoaded) return;
    setTimeout(() => {
      setStartLoadingHome(true);
    }, 1000);
  }, [lockScreenLoaded]);

  useEffect(() => {
    setShowLock(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div id="phone">
      {lockScreenLoaded && <TopBar />}
      {startLoadingHome && <Home />}
      {showLock && (
        <Lock
          lockScreenLoaded={lockScreenLoaded}
          setLockScreenLoaded={setLockScreenLoaded}
          startLoadingHome={startLoadingHome}
          attemptedPaths={attemptedPaths}
        />
      )}
    </div>
  );
};
export default App;
