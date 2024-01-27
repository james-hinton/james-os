// Hooks
import { useState, useEffect, useContext } from "react";

// Icons
import WifiIcon from "@mui/icons-material/Wifi";
import {
  Battery20,
  Battery30,
  Battery50,
  Battery60,
  Battery80,
  Battery90,
  BatteryFull,
  LockOpen,
  LockOutlined,
} from "@mui/icons-material";

// Tooltip
import { Tooltip } from "react-tooltip";

// Style
import "./StatusBar.scss";
import { PhoneContext } from "../../../../context/PhoneContext";

const StatusBar = () => {
  const { phoneLocked } = useContext(PhoneContext);
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const checkBatteryLevel = () => {
      try {
        navigator.getBattery().then((battery) => {
          setBatteryLevel(Math.floor(battery.level * 100));
        });
      } catch (e) {
        console.log(e);
        setBatteryLevel(100);
      }
    };

    checkBatteryLevel();
    const interval = setInterval(checkBatteryLevel, 10000);
    return () => clearInterval(interval);
  }, []);

  const getBatteryIcon = () => {
    let IconComponent;
    if (batteryLevel <= 20) IconComponent = Battery20;
    else if (batteryLevel <= 30) IconComponent = Battery30;
    else if (batteryLevel <= 50) IconComponent = Battery50;
    else if (batteryLevel <= 60) IconComponent = Battery60;
    else if (batteryLevel <= 80) IconComponent = Battery80;
    else if (batteryLevel <= 90) IconComponent = Battery90;
    else IconComponent = BatteryFull;

    return (
      <>
        <IconComponent data-tip data-tooltip-id="batteryTooltip" />
        <Tooltip id="batteryTooltip" place="bottom" effect="solid">
          {batteryLevel}%
        </Tooltip>
      </>
    );
  };

  return (
    <div
      className="status-bar"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      <WifiIcon data-tip data-tooltip-id="wifiTooltip" />
      <Tooltip id="wifiTooltip" place="bottom" effect="solid">
        Connected
      </Tooltip>
      {getBatteryIcon()}
      {phoneLocked ? (
        <>
          <LockOutlined data-tip data-tooltip-id="lockTooltip" />
          <Tooltip id="lockTooltip" place="bottom" effect="solid">
            Screen Locked
          </Tooltip>
        </>
      ) : (
        <>
          <LockOpen
            onClick={() => {
              window.location.href = "/";
            }}
            data-tip
            data-tooltip-id="lockTooltip"
          />
          <Tooltip id="lockTooltip" place="bottom" effect="solid">
            Lock Screen
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default StatusBar;
