import { useState, useContext } from "react";
import { useSwipeable } from "react-swipeable";

// Components
import TimeAndDate from "./components/TimeAndDate/TimeAndDate";
import SwipeAlert from "./components/SwipeAlert/SwipeAlert";

// Context
import { PhoneContext } from "../../context/PhoneContext";

import "./Lock.scss";

const Lock = () => {
  const { phoneLocked, setPhoneLocked } = useContext(PhoneContext);
  const [isMovedUp, setIsMovedUp] = useState(false);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      setIsMovedUp(true);
      setTimeout(() => {
        setPhoneLocked(false);
      }, 500);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  window.addEventListener("keydown", (e) => {
    const listenableKeys = [
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Space",
    ];
    if (listenableKeys.includes(e.key)) {
      setIsMovedUp(true);
      setTimeout(() => {
        setPhoneLocked(false);
      }, 500);
    }
  });

  return (
    <div
      className={`lock-screen ${isMovedUp ? "move-up" : ""}`}
      {...handlers}
      style={phoneLocked ? {} : { display: "none" }}
    >
      <div className="lock-screen-content">
        <TimeAndDate />
      </div>

      <div className="lock-screen-footer">
        <SwipeAlert />
      </div>
    </div>
  );
};

export default Lock;
