// Context
import { useContext } from "react";
import { PhoneContext } from "../../../../context/PhoneContext";

// Data
import { DockApps } from "../../consts";

import "./Dock.scss";
import { Close } from "@mui/icons-material";

const Dock = () => {
  const { openApps, setOpenApps, phoneLocked } = useContext(PhoneContext);

  return (
    <div className="dock-container" style={phoneLocked ? {} : { zIndex: 9999 }}>
      {DockApps.map((app, index) => (
        <a key={index} href={app.href} className="dock-app">
          {app.icon}
        </a>
      ))}

      {openApps.length > 0 && (
        <div className="open-apps">
          {openApps.map((app, index) => (
            <div key={index} className="open-app">
              <div
                className="open-app__close"
                onClick={() => {
                  setOpenApps(openApps.filter((a) => a !== app));
                }}
              >
                <Close />
              </div>
              {app.icon ? app.icon : <img src={app.iconHref} alt={app.name} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dock;
