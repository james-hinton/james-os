// Hooks
import {
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

// External Libraries
import Draggable from "react-draggable";
import { useSwipeable } from "react-swipeable";

// Context
import { PhoneContext } from "../../context/PhoneContext";

// Components
import Dock from "./components/Dock/Dock";
import WindowBar from "../../components/WindowBar/WindowBar";

// Data
import { HomeApps } from "./consts";

// Styles
import "./Home.scss";

const Home = () => {
  const { openApps, setOpenApps, setPhoneLocked } = useContext(PhoneContext);
  const homeScreenRef = useRef(null);
  const isSmallScreen = window.innerHeight < 700 || window.innerWidth < 700;
  const [defaultPositions, setDefaultPositions] = useState({});

  useLayoutEffect(() => {
    if (homeScreenRef.current) {
      const parentWidth = homeScreenRef.current.offsetWidth;
      const parentHeight = homeScreenRef.current.offsetHeight;

      const newPositions = {};

      openApps.forEach((app, index) => {
        const draggableElem = document.getElementById(`draggable-${index}`);
        if (draggableElem) {
          const draggableWidth = draggableElem.offsetWidth;
          const draggableHeight = draggableElem.offsetHeight;

          const centerX = (parentWidth - draggableWidth) / 2;
          const centerY = (parentHeight - draggableHeight) / 2;

          newPositions[index] = { x: centerX, y: centerY };
        }
      });

      setDefaultPositions(newPositions);
    }
  }, [openApps]);

  // Listen for Control + Command + Q shortcut and lock
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "q" && e.ctrlKey && e.metaKey) {
        setPhoneLocked(true);
        window.location.href = "/";
      }
    });
  }, []);

  return (
    <div className="home-screen" ref={homeScreenRef}>
      <div className="home-screen-content">
        {HomeApps.map((app, index) => {
          return (
            <div
              key={index}
              className={`app-icon-container ${
                app.widget ? "widget-container" : ""
              }`}
              style={app.width ? { gridColumn: `span ${app.width}` } : {}}
            >
              {app.widget ? (
                <div className="widget-content">{app.widget}</div>
              ) : (
                <a
                  href="#"
                  className="app-link"
                  onClick={() => {
                    if (app.component) {
                      setOpenApps([...new Set([app])]);
                    }
                  }}
                >
                  {app.icon ? (
                    app.icon
                  ) : (
                    <img src={app.iconHref} alt={app.name} />
                  )}
                  <span className="app-label">{app.label}</span>
                </a>
              )}
            </div>
          );
        })}
      </div>
      {openApps?.map((app, index) => {
        return (
          <Draggable
            key={index}
            bounds="parent"
            defaultPosition={
              isSmallScreen
                ? { x: 0, y: 0 }
                : defaultPositions[index] || { x: 0, y: 0 }
            }
            cancel=".interactable"
            // resize
            enableUserSelectHack={false}
          >
            <div
              id={`draggable-${index}`}
              style={
                isSmallScreen
                  ? {
                      width: "100%",
                      height: "70%",
                      position: "absolute",
                      top: "4rem",
                      left: 0,
                      zIndex: 1010,
                    }
                  : {
                      position: "absolute",
                      top: "4rem",
                      left: "25%",
                      height: "30%",
                      width: "50%",
                      zIndex: 1010,
                    }
              }
            >
              <WindowBar
                onClose={() => {
                  setOpenApps(openApps.filter((a) => a !== app));
                }}
              />
              <div
                className="app-container"
                style={
                  isSmallScreen
                    ? {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        paddingTop: '1.5rem'
                      }
                    : {
                        width: "100%",
                        height: "100%",
                      }
                }
              >
                {app.component}
              </div>
            </div>
          </Draggable>
        );
      })}
      <Dock />
    </div>
  );
};

export default Home;
