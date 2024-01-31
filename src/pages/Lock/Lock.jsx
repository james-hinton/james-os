import { useState, useContext, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

// Components
import TimeAndDate from "./components/TimeAndDate/TimeAndDate";
import SwipeAlert from "./components/SwipeAlert/SwipeAlert";
import Notification from "../../components/Notification/Notification";

// Context
import { PhoneContext } from "../../context/PhoneContext";

import "./Lock.scss";

const Lock = ({
  lockScreenLoaded,
  setLockScreenLoaded,
  startLoadingHome,
  attemptedPaths,
}) => {
  const { phoneLocked, setPhoneLocked, background } = useContext(PhoneContext);
  const [isMovedUp, setIsMovedUp] = useState(false);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false);
  const [showSwipeNotification, setShowSwipeNotification] = useState(false);

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
    if (attemptedPaths.length > 0) return;
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
    const imageUrl = "/assets/wallpapers/" + background;
    img.src = imageUrl;
    img.onload = () => {
      setLockScreenLoaded(true);
    };

    img.onerror = () => {
      console.error("Failed to load the background image");
    };
  }, []);

  const generateFunnyMessage = (path) => {
    // Check for special characters
    if (/[^a-zA-Z0-9\-\/]/.test(path)) {
      return `Trying to use secret codes on "${path}"? Nice try, but no hidden treasures there!`;
    }
    // Check if the path contains 'admin'
    if (path.toLowerCase().includes("admin")) {
      return `Oh, sneaky! Trying to access "${path}"? My admin room is full of mysteries... and dust bunnies!`;
    }
    // Default message
    return `Ah, the mysterious "${path}". A place of legend and lore! Sadly, it's not on my map yet. Maybe try somewhere else?`;
  };

  return (
    <div
      className={`lock-screen ${isMovedUp ? "move-up" : ""} ${
        background ? "fade-in" : ""
      }`}
      {...handlers}
      style={{
        display: phoneLocked ? "block" : "none",
        // backgroundImage: `url(/assets/wallpapers/${background})`,
        // when image is loaded use the background image
        // When lock screen is loadd
        // use the background image
        backgroundImage: lockScreenLoaded
          ? `url(/assets/wallpapers/${background})`
          : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="lock-screen-content">
        {!lockScreenLoaded && !background ? (
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
                  title="James Hinton"
                  message={` ${
                    localStorage.getItem(`notification-${"Contact"}`)
                      ? "Welcome back to my portfolio 😎"
                      : " Hello & welcome to my portfolio 👋 I've just sent you a message, unlock the phone or click here to read it"
                  }`}
                  customOnClick={() => {
                    if (localStorage.getItem(`notification-${"Contact"}`)) {
                      setIsMovedUp(true);
                      setTimeout(() => {
                        setPhoneLocked(false);
                      }, 500);
                      return;
                    }
                    setIsMovedUp(true);
                    setTimeout(() => {
                      setPhoneLocked(false);
                      document
                        .getElementById("dock-app-Contact")
                        .dispatchEvent(
                          new MouseEvent("click", { bubbles: true })
                        );
                    }, 500);
                  }}
                />
              )}

              {showSwipeNotification && (
                <Notification
                  icon="assets/contact/bell.png"
                  title="Reminder"
                  message="This site is still under development. Use the message app to send any ideas or suggestions"
                />
              )}

              {attemptedPaths.length > 0 && (
                <Notification
                  icon="assets/contact/warning.png"
                  title="Whoopsie Daisy!"
                  message={generateFunnyMessage(
                    attemptedPaths[attemptedPaths.length - 1]
                  )}
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
