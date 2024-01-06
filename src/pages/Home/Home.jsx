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

const Home = () => {
  const PAGES = [HomeApps, SecondPage, ThirdPage];

  const { openApps, setOpenApps, setPhoneLocked } = useContext(PhoneContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [defaultPositions, setDefaultPositions] = useState({});
  const [appPositions, setAppPositions] = useState({});

  const homeScreenRef = useRef(null);
  const isSmallScreen = window.innerHeight < 700 || window.innerWidth < 700;

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

  // Check for scroll wheel to initiate swipe
  useEffect(() => {
    const handleWheel = (e) => {
      if (isDragging) return;

      // check if the user is scrolling on an open app
      const openApp = document.querySelector(".open-app");
      if (openApp && openApp.contains(e.target)) return;

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
      {/* Move to own component */}
      {openApps?.map((app, index) => (
          <OpenApp
            key={index}
            app={app}
            index={index}
            openApps={openApps}
            setOpenApps={setOpenApps}
            appPositions={appPositions}
            setAppPositions={setAppPositions}
            defaultPositions={defaultPositions}
            isSmallScreen={isSmallScreen}
            setIsDragging={setIsDragging}
          />
      ))}
      <div>
        <PageControl
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={PAGES.length}
        />
        <Dock />
      </div>
    </div>
  );
};

export default Home;
