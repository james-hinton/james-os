/* eslint-disable react/prop-types */

// React Libs
import { useRef } from "react";

// External Libraries
import Draggable from "react-draggable";

// Components
import WindowBar from "../../../../components/WindowBar/WindowBar";

const OpenApp = ({
  app,
  index,
  openApps,
  setOpenApps,
  appPositions,
  setAppPositions,
  defaultPositions,
  isSmallScreen,
  setIsDragging,
}) => {
  // Listen for Control + Command + Q shortcut and lock
  const getLeftPosition = (width) => {
    if (width.endsWith("%")) {
      const widthValue = parseFloat(width);
      return `${(100 - widthValue) / 2}%`;
    }
    return "25%";
  };

  const isResizing = useRef(false);
  const appRef = useRef(null);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    console.log('App ref', appRef)
    if (appRef.current && e.target.className !== "handle") {
      let newWidth = appRef.current.offsetWidth + e.movementX;
      let newHeight = appRef.current.offsetHeight + e.movementY;

      if (newWidth < 300) {
        newWidth = 300;
      }
      if (newHeight < 300) {
        newHeight = 300;
      }

      appRef.current.style.width = `${newWidth}px`;
      appRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
  };

  return (
    <Draggable
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
        ref={appRef}
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
};

export default OpenApp;
