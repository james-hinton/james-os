import { Tooltip } from "react-tooltip";
import { CopyAll } from "@mui/icons-material";
import "./Settings.scss";
import { useState } from "react";

const Settings = () => {
  const [tooltipMsg, setTooltipMsg] = useState("Copy email to clipboard");
  return (
    <div className="settings">
      <div className="settings-section">
        <h2>General</h2>
        <div className="setting-option">
          <span>Language</span>
          <select className="interactable">
            <option>English</option>
            <option>Chinese (Traditional)</option>
          </select>
        </div>
      </div>
      <div className="settings-section">
        <h2>Contact</h2>
        <div className="setting-option">
          <span>Email</span>
          <div className="setting-option-with-icon">
            hello@james-hinton.com
            <CopyAll
              data-tip
              data-tooltip-id="copyTooltip"
              className="interactable"
              onClick={() => {
                navigator.clipboard.writeText("hello@james-hinton.com");
                setTooltipMsg("Copied!");
                setTimeout(
                  () => setTooltipMsg("Copy email to clipboard"),
                  1000
                );
              }}
            />
            <Tooltip id="copyTooltip" place="bottom" effect="solid">
              {tooltipMsg}
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
