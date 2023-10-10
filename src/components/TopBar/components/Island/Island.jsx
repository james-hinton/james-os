import { useContext, useState, useEffect } from "react";
import { PhoneContext } from "../../../../context/PhoneContext";

// Icons
import LockIcon from "@mui/icons-material/Lock";

// Styles
import "./Island.scss";

const Island = () => {
  const { phoneLocked } = useContext(PhoneContext);
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
      >
        {phoneLocked ? (
          <>
            <div className="island__lock">
              <LockIcon />
            </div>
            <div className="island__text">James OS</div>
          </>
        ) : (
          <div className="island__text island__text-unlocked">
            {currentTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default Island;
