import CloseIcon from "@mui/icons-material/Close";
import "./Popup.scss";

const Popup = ({ sender, message, time, setDisplayPopup }) => {
  return (
    <div
      className="popup"
      onClick={() => {
        document.getElementById("dock-app-Contact").click();
        setDisplayPopup(false);
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
