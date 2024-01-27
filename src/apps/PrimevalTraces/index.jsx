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

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName("head")[0].appendChild(meta);
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
      <Map />
    </div>
  );
};

export default PrimevalTraces;
