import { useEffect, useState } from "react";
import PrimevalNavbar from "./components/Navbar";
import Map from "./components/Map";
import "./style.scss";

const PrimevalTraces = ({ appRef }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWelcome(false);
    }, 4500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      id="primeval"
      className="interactable"
      onClick={() => setShowWelcome(false)}
    >
      {showWelcome && (
        <div className="primeval__popup">
          <div className="primeval__popup-content">
            <img
              src="/assets/fossil/fossil.png"
              alt="Primeval Traces"
              className="primeval__popup-logo"
            />
            <div className="primeval__popup-text">
              <p>
                Welcome to Primeval Traces, an interactive map of the fossil
                record of the British Isles.
              </p>
            </div>
            <div
              className="primeval__popup-close"
              onClick={() => setShowWelcome(false)}
            >
              <p>Close</p>
            </div>
          </div>
        </div>
      )}
      <Map 
        appRef={appRef}
      />
    </div>
  );
};

export default PrimevalTraces;
