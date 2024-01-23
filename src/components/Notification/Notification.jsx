// Third Party Components
import CloseIcon from "@mui/icons-material/Close";

// Styles
import "./Notification.scss";
import { useState } from "react";

const Notification = ({ icon, title, message, customOnClick }) => {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      {!isClosed && (
        <div
          className="notification"
          onClick={() => {
            if (customOnClick) {
              customOnClick();
            }
          }}
          style={customOnClick ? { cursor: "pointer" } : {}}
        >
          <div
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
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
