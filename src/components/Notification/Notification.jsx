// Third Party Components
import CloseIcon from "@mui/icons-material/Close";

// Styles
import "./Notification.scss";
import { useState } from "react";

const Notification = ({ icon, title, message }) => {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      {!isClosed && (
        <div className="notification">
          <div
            className="notification-close"
            onClick={() => {
              setIsClosed(true);
            }}
          >
            <CloseIcon />
          </div>
          <div className="notification-icon">
            <img src={icon} alt="icon" />
          </div>
          <div className="notification-content">
            <div className="notification-title">{title}</div>
            <div className="notification-message">{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
