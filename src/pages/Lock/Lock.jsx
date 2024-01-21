import { useState, useContext, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

// Components
import TimeAndDate from "./components/TimeAndDate/TimeAndDate";
import SwipeAlert from "./components/SwipeAlert/SwipeAlert";
import Notification from "../../components/Notification/Notification";

// Context
import { PhoneContext } from "../../context/PhoneContext";

import "./Lock.scss";

const Lock = ({ lockScreenLoaded, setLockScreenLoaded, startLoadingHome }) => {
  const { phoneLocked, setPhoneLocked } = useContext(PhoneContext);
  const [isMovedUp, setIsMovedUp] = useState(false);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false);
  const [showSwipeNotification, setShowSwipeNotification] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (!startLoadingHome) return;
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
      if (!startLoadingHome) return;
      setIsMovedUp(true);
      setTimeout(() => {
        setPhoneLocked(false);
      }, 500);
    }
  });

  useEffect(() => {
    if (!lockScreenLoaded) return;
    setTimeout(() => {
      setShowWelcomeNotification(true);
    }, 1000);
    setTimeout(() => {
      setShowSwipeNotification(true);
    }, 13000);
  }, [lockScreenLoaded]);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    const imageUrl = "/assets/wallpapers/background.jpg";
    img.src = imageUrl;
    img.onload = () => {
      setBackgroundImage(imageUrl);
      setTimeout(() => {
        setLockScreenLoaded(true);
      }, 1500);
    };

    img.onerror = () => {
      console.error("Failed to load the background image");
    };
  }, []);

  return (
    <div
      className={`lock-screen ${isMovedUp ? "move-up" : ""} ${
        backgroundImage ? "fade-in" : ""
      }`}
      {...handlers}
      style={{
        display: phoneLocked ? "block" : "none",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="lock-screen-content">
        {!lockScreenLoaded && !backgroundImage ? (
          <div className="lock-screen-loading">
            <img src={"tail-spin.svg"} alt="Loading..." />
          </div>
        ) : (
          <>
            <TimeAndDate />

            <div className="lock-screen-notifications">
              {showWelcomeNotification && (
                <Notification
                  icon="assets/contact/bot.png"
                  title="Welcome!"
                  message="Hello & Welcome! 👋 Swipe up or press Enter to unlock."
                />
              )}

              {showSwipeNotification && (
                <Notification
                  icon="assets/contact/bell.png"
                  title="Reminder"
                  message="This site is still under development. Use the message app to send any ideas or suggestions."
                />
              )}
            </div>
          </>
        )}
      </div>
      {lockScreenLoaded && (
        <div className="lock-screen-footer fade-in">
          <SwipeAlert />
        </div>
      )}
    </div>
  );
};

export default Lock;
