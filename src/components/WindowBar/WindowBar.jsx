import "./WindowBar.scss";

const WindowBar = ({ onClose }) => {
  return (
    <div className="window-bar">
      <div className="window-controls interactable">
        <button className="control-btn " onClick={onClose} title="Close">
          &times;
        </button>
      </div>
    </div>
  );
};

export default WindowBar;
