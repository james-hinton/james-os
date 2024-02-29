// Hooks
import {
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useSwipeable } from "react-swipeable";

// Context
import { PhoneContext } from "../../context/PhoneContext";

// Components
import App from "./components/App/App";
import Dock from "./components/Dock/Dock";
import PageControl from "./components/PageControl/PageControl";

// Data
import { HomeApps, SecondPage, ThirdPage } from "./consts";

// Styles
import "./Home.scss";
import OpenApp from "./components/OpenApp/OpenApp";
import Popup from "../../components/Popup/Popup";

const Home = () => {
  const PAGES = [HomeApps, SecondPage, ThirdPage];

  const {
    openApps,
    setOpenApps,
    phoneLocked,
    setPhoneLocked,
    displayPopup,
    setDisplayPopup,
    popupContent,
    setPopupContent,
    darkenScreen,
    setDarkenScreen,
    background,
  } = useContext(PhoneContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [defaultPositions, setDefaultPositions] = useState({});
  const [appPositions, setAppPositions] = useState({});

  const homeScreenRef = useRef(null);
  const isSmallScreen = window.innerHeight < 500 || window.innerWidth < 700;
  const openAppsRef = useRef(openApps);

  const [zIndices, setZIndices] = useState({});

  // Set default positions for new apps
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

  // Mac shortcut to lock
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "q" && e.ctrlKey && e.metaKey) {
        setPhoneLocked(true);
        window.location.href = "/";
      }
    });
  }, []);

  // Handle swipe
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      const openApp = document.querySelector(".open-app");

      if (isDragging) return;
      if (openApp && openApp.contains(eventData.event.target)) return;
      setIsSwiping(true);
      setDeltaX(eventData.deltaX * 0.08);
    },

    onSwipedRight: (eventData) => {
      const openApp = document.querySelector(".open-app");

      if (isDragging) return;
      if (openApp && openApp.contains(eventData.event.target)) return;

      if (currentPage - 1 >= 0) {
        setCurrentPage(currentPage - 1);
      }
      setIsSwiping(false);
      setDeltaX(0);
    },

    onSwipedLeft: (eventData) => {
      const openApp = document.querySelector(".open-app");

      if (isDragging) return;
      if (openApp && openApp.contains(eventData.event.target)) return;

      if (currentPage + 1 < PAGES.length) {
        setCurrentPage(currentPage + 1);
      }
      setIsSwiping(false);
      setDeltaX(0);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Check for scroll wheel to initiate swipe
  useEffect(() => {
    const handleWheel = (e) => {
      const openApps = document.querySelectorAll(".open-app");
      if (isDragging) return;

      // check if the user is scrolling on an open app
      let isScrollingOnOpenApp = false;

      if (openApps && openApps.length > 0) {
        openApps.forEach((openApp) => {
          if (openApp.contains(e.target)) {
            isScrollingOnOpenApp = true;
          }
        });
      }

      if (isScrollingOnOpenApp) return;

      if (e.deltaY > 0 && currentPage + 1 < PAGES.length) {
        setCurrentPage(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage - 1 >= 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentPage, isDragging]);

  useEffect(() => {
    openAppsRef.current = openApps;
  }, [openApps]);

  // Wait for 45 seconds to display popup and then hide after 15 seconds, but wait until the phone is unlocked
  useEffect(() => {
    if (phoneLocked) return;

    const timeout = setTimeout(() => {
      if (isSmallScreen && openAppsRef.current.length > 0) return;
      if (openAppsRef.current.find((app) => app.name === "Contact")) return;
      if (localStorage.getItem("contact-popup")) return;
      if (displayPopup) return;

      localStorage.setItem("contact-popup", true);
      setPopupContent({
        sender: "James Hinton",
        message:
          "Hey, still here? Thanks for checking out my portfolio! Click on this notification to send me a message.",
        time: "now",
        action: "open-contact",
      });

      setDisplayPopup(true);
      setTimeout(() => {
        setDisplayPopup(false);
      }, 15000);
    }, 45000);

    return () => {
      clearTimeout(timeout);
    };
  }, [phoneLocked]);

  // Listen for when the user goes onto the second page and then send a popup saying "This is my experience page"
  useEffect(() => {
    if (currentPage === 1) {
      if (Object.keys(popupContent).length > 0) return;
      const date = new Date();
      // 2 hours
      const delay = 1000 * 60 * 60 * 2;
      const lastPopup = localStorage.getItem("experience-popup");
      if (lastPopup) {
        const lastPopupDate = new Date(lastPopup);
        const timeSinceLastPopup = date.getTime() - lastPopupDate.getTime();
        if (timeSinceLastPopup < delay) return;
      }
      // Date in YYYY-MM-DD HH:MM format
      const dateToSet = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

      localStorage.setItem("experience-popup", dateToSet);

      setDisplayPopup(true);
      setPopupContent({
        sender: "James Hinton",
        message: "This is my projects and experience section.",
        time: "now",
        action: "close",
        duration: 2500,
      });
    }
  }, [currentPage]);

  // Function to bring a window to the front
  const bringToFront = (index) => {
    const maxZIndex = Math.max(0, ...Object.values(zIndices));
    setZIndices((prev) => ({ ...prev, [index]: maxZIndex + 1 }));
  };

  return (
    <div
      className="home-screen"
      ref={homeScreenRef}
      {...handlers}
      style={{
        backgroundImage: `url(/assets/wallpapers/${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
            <App
              pageApps={pageApps}
              openApps={openApps}
              setOpenApps={setOpenApps}
              appPositions={appPositions}
              setAppPositions={setAppPositions}
              isSmallScreen={isSmallScreen}
            />
          </div>
        ))}
      </div>
      {openApps?.map((app, index) => (
        <OpenApp
          key={index}
          app={app}
          index={index}
          zIndex={zIndices[index] || 1000}
          onClick={() => bringToFront(index)}
          openApps={openApps}
          setOpenApps={setOpenApps}
          appPositions={appPositions}
          setAppPositions={setAppPositions}
          defaultPositions={defaultPositions}
          isSmallScreen={isSmallScreen}
          setIsDragging={setIsDragging}
          setDarkenScreen={setDarkenScreen}
          smallScreenHeight={app.smallScreenHeight}
        />
      ))}

      <div className="home-screen__control">
        <PageControl
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={PAGES.length}
        />
        <Dock />
      </div>

      {displayPopup && (
        <Popup
          sender={popupContent.sender}
          message={popupContent.message}
          action={popupContent.action}
          setDisplayPopup={setDisplayPopup}
          duration={popupContent.duration}
        />
      )}

      {darkenScreen && <div className="darken-screen fade-in"></div>}
    </div>
  );
};

export default Home;
