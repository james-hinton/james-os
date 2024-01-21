import { useContext, useState, useEffect, useRef } from "react";
import { PhoneContext } from "../../../../context/PhoneContext";

// Icons
import LockIcon from "@mui/icons-material/Lock";

// Styles
import "./Island.scss";

const Island = () => {
  const { phoneLocked } = useContext(PhoneContext);
  const islandRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // have a delay for after phone unlocked, so we can show a fade out animation
  const [unMountIsland, setUnMountIsland] = useState(false);
  useEffect(() => {
    if (!phoneLocked) {
      setTimeout(() => {
        setUnMountIsland(true);
      }, 1000);
    }
  }, [phoneLocked]);

  // Add the fadeout class to islandRef and then remove it and put fade-in class
  useEffect(() => {
    if (!phoneLocked) {
      islandRef.current.classList.add("fade-out");
      setTimeout(() => {
        islandRef.current.classList.remove("fade-out");
        islandRef.current.classList.add("fade-in");
      }, 1000);
    }
  }, [phoneLocked]);

  return (
    <div
      className="island-container"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <div
        className={
          "island" + (phoneLocked ? " island-locked" : "island-unlocked")
        }
        ref={islandRef}
      >
        {!unMountIsland ? (
          <div className={`${!phoneLocked && "fade-out"}`}>
            <div className="island__lock">
              <LockIcon style={{ display: phoneLocked ? "block" : "none" }} />
            </div>
            <div className="island__text">James OS</div>
          </div>
        ) : (
          <div className="island__text island__text-unlocked fade-in">
            {currentTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default Island;
