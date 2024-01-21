import CloseIcon from "@mui/icons-material/Close";
import "./Popup.scss";
import { useEffect } from "react";

const Popup = ({ sender, message, action, setDisplayPopup, duration }) => {

  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        setDisplayPopup(false);
      }, duration);
    }
  }, [duration, setDisplayPopup]);
  
  return (
    <div
      className="popup"
      onClick={() => {
        if (action === "open-contact") {
          document.getElementById("dock-app-Contact").click();
          setDisplayPopup(false);
        } else if (action === "close") {
          setDisplayPopup(false);
        }
      }}
    >
      <div className="popup-header">
        <div className="popup-banner">
          <img className="popup-icon" src="assets/contact/contact.png"></img>
          <div className="popup-title">MESSAGES</div>
        </div>
        <span
          className="popup-close"
          onClick={(e) => {
            e.stopPropagation();
            setDisplayPopup(false);
          }}
        >
          <CloseIcon />
        </span>
      </div>
      <div className="popup-content">
        <div className="popup-sender">{sender}</div>
        <div className="popup-message">{message}</div>
      </div>
    </div>
  );
};

export default Popup;
