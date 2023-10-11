// Hooks
import {
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useSwipeable } from "react-swipeable";

// External Libraries
import Draggable from "react-draggable";

// Context
import { PhoneContext } from "../../context/PhoneContext";

// Components
import Dock from "./components/Dock/Dock";
import WindowBar from "../../components/WindowBar/WindowBar";

// Data
import { HomeApps, SecondPage, ThirdPage } from "./consts";

// Styles
import "./Home.scss";

const Home = () => {
  const { openApps, setOpenApps, setPhoneLocked } = useContext(PhoneContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [defaultPositions, setDefaultPositions] = useState({});
  const [appPositions, setAppPositions] = useState({});

  const homeScreenRef = useRef(null);
  const isSmallScreen = window.innerHeight < 700 || window.innerWidth < 700;

  const PAGES = [HomeApps, SecondPage, ThirdPage];

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

          const offsetX = index * 30;
          const offsetY = index * 30;

          const centerX = (parentWidth - draggableWidth) / 2 + offsetX;
          const centerY = (parentHeight - draggableHeight) / 2 + offsetY;

          newPositions[index] = { x: centerX, y: centerY };
        }
      });

      setDefaultPositions(newPositions);
    }
  }, [openApps]);

  // Listen for Control + Command + Q shortcut and lock
  const getLeftPosition = (width) => {
    if (width.endsWith("%")) {
      const widthValue = parseFloat(width);
      return `${(100 - widthValue) / 2}%`;
    }
    return "25%";
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "q" && e.ctrlKey && e.metaKey) {
        setPhoneLocked(true);
        window.location.href = "/";
      }
    });
  }, []);

  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (isDragging) return;
      setIsSwiping(true);
      setDeltaX(eventData.deltaX * 0.08);
    },

    onSwipedRight: () => {
      if (isDragging) return;
      if (currentPage - 1 >= 0) {
        setCurrentPage(currentPage - 1);
      }
      setIsSwiping(false);
      setDeltaX(0);
    },

    onSwipedLeft: () => {
      if (isDragging) return;
      if (currentPage + 1 < PAGES.length) {
        setCurrentPage(currentPage + 1);
      }
      setIsSwiping(false);
      setDeltaX(0);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Resizing
  const isResizing = useRef(false);
  const appRefs = useRef({});
  const [appSize, setAppSize] = useState({ width: 0, height: 0 });

  const handleMouseDown = (e) => {
    e.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const currentAppRef = appRefs.current[0];
    if (currentAppRef && e.target.className !== "handle") {
      let newWidth = currentAppRef.offsetWidth + e.movementX;
      let newHeight = currentAppRef.offsetHeight + e.movementY;

      // minimum width
      if (newWidth < 300) {
        newWidth = 300;
      }
      if (newHeight < 300) {
        newHeight = 300;
      }

      currentAppRef.style.width = `${newWidth}px`;
      currentAppRef.style.height = `${newHeight}px`;
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
  };

  return (
    <div className="home-screen" ref={homeScreenRef} {...handlers}>
      <div
        className="page-container"
        style={{
          display: "flex",
          transition: isSwiping ? "none" : "transform 0.8s ease",
          transform: isSwiping
            ? `translateX(${-currentPage * 100 + deltaX * 0.07}%)`
            : `translateX(-${currentPage * 100}%)`,
        }}
      >
        {PAGES.map((pageApps, pageIndex) => (
          <div key={pageIndex} className="home-screen-page">
            <div className="home-screen-container">
              <div className="home-screen-content">
                {pageApps.map((app, index) => {
                  return (
                    <div
                      key={index}
                      className={`app-icon-container ${
                        app.widget ? "widget-container" : ""
                      }`}
                      style={
                        app.width ? { gridColumn: `span ${app.width}` } : {}
                      }
                    >
                      {app.widget ? (
                        <div className="widget-content">{app.widget}</div>
                      ) : (
                        <span
                          href="#"
                          className="app-link"
                          onClick={() => {
                            if (
                              app.component &&
                              !openApps.includes(app) &&
                              openApps.length < 7
                            ) {
                              const newIndex = openApps.length;

                              let offsetX = 0;
                              let offsetY = 0;
                              if (appPositions[newIndex - 1]) {
                                // Check if a previous app exists
                                offsetX = appPositions[newIndex - 1].x + 30;
                                offsetY = appPositions[newIndex - 1].y + 30;
                              }

                              setAppPositions((prev) => ({
                                ...prev,
                                [newIndex]: { x: offsetX, y: offsetY },
                              }));

                              if (isSmallScreen) {
                                setOpenApps([app]);
                              } else {
                                setOpenApps([...openApps, app]);
                              }
                            }
                          }}
                        >
                          {app.icon ? (
                            app.icon
                          ) : (
                            <img
                              src={app.iconHref}
                              alt={app.name}
                              draggable={false}
                            />
                          )}
                          <span className="app-label">{app.label}</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Move to own component */}
      {openApps?.map((app, index) => {
        return (
          <Draggable
            key={index}
            bounds="parent"
            position={appPositions[index] || { x: 0, y: 0 }}
            defaultPosition={
              isSmallScreen
                ? { x: 0, y: 0 }
                : defaultPositions[index] || { x: 0, y: 0 }
            }
            cancel=".interactable"
            onStart={() => setIsDragging(true)}
            onStop={(e, data) => {
              setAppPositions((prevPositions) => ({
                ...prevPositions,
                [index]: {
                  x: data.x,
                  y: data.y,
                },
              }));

              setTimeout(() => {
                setIsDragging(false);
              }, 100);
            }}
          >
            <div
              id={`draggable-${index}`}
              ref={(el) => (appRefs.current[index] = el)}
              style={
                isSmallScreen
                  ? {
                      width: "100%",
                      height: "70%",
                      position: "absolute",
                      top: "4rem",
                      left: 0,
                      zIndex: 1010,
                      overflow: "hidden",
                    }
                  : {
                      position: "absolute",
                      top: "4rem",
                      left: getLeftPosition(app.width || "50%"),
                      height: app.height || "35%",
                      width: app.width || "50%",
                      zIndex: 1010,
                      backgroundColor: "white",
                      overflow: "hidden",
                    }
              }
            >
              <div className="handle" onMouseDown={handleMouseDown}></div>

              <WindowBar
                onClose={() => {
                  const closedAppIndex = openApps.indexOf(app);
                  const newAppPositions = { ...appPositions };
                  delete newAppPositions[closedAppIndex];
                  for (let i = closedAppIndex + 1; i < openApps.length; i++) {
                    newAppPositions[i - 1] = newAppPositions[i];
                  }
                  delete newAppPositions[openApps.length - 1];
                  setAppPositions(newAppPositions);
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
                        paddingTop: "1.5rem",
                        overflow: "auto",
                      }
                    : {
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                      }
                }
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
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
