// Context
import { useContext } from "react";

// Components
import { Tooltip } from "react-tooltip";

// Styles
import "./ExternalLink.scss";
import { PhoneContext } from "../../context/PhoneContext";

const ExternalLink = ({ message, href }) => {
  const { setOpenApps } = useContext(PhoneContext);

  const handleStay = () => {
    setOpenApps([]);
  };

  return (
    <div className="external-link">
      <div className="external-link-content">
        <p>{message}</p>
        <div className="button-group">
          <button
            onClick={handleStay}
            className="stay-button"
            data-tip
            data-tooltip-id="stayTooltip"
          >
            Nope, stay here
          </button>
          <a
            rel="noopener noreferrer"
            className="leave-button"
            data-tip
            data-tooltip-id="leaveTooltip"
            onClick={() => {
              setOpenApps([]);
              window.open(href, "_blank");
            }}
          >
            Yep, let's go!
          </a>
        </div>
        <Tooltip id="stayTooltip" place="bottom" effect="solid">
          <span>Stay on this page</span>
        </Tooltip>

        <Tooltip id="leaveTooltip" place="bottom" effect="solid">
          <span>Visit the link in a new tab</span>
        </Tooltip>
      </div>
    </div>
  );
};

export default ExternalLink;
