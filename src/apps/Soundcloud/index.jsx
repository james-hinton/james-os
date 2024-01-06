import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ProfileMenu from "./components/ProfileMenu";
import Songs from "./components/Songs";
import AccountDetails from "./components/AccountDetails";
import { useState, useEffect, useRef } from "react";

import "./index.css";
// import "./App.css";

const Home = ({ appRef }) => {
  const [tracks, setTracks] = useState([
    {
      title: "Discotation",
      song: "./soundcloud/disco.mp3",
      image: "./soundcloud/disco.jpg",
      description: "Drum & Bass",
      artist: "James Hinton & Aidan Maskell",
    },
    {
      title: "Dream",
      song: "./soundcloud/dream.mp3",
      image: "./soundcloud/dream.jpg",
      description: "Jazzy song",
    },
    {
      title: "Skitz",
      song: "./soundcloud/skitz.mp3",
      image: "./soundcloud/skitz.jpg",
      description: "Drum & Bass",
    },
  ]);

  const soundcloudRef = useRef(null);
  const contentRef = useRef(null);


  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;

    const stylesConfig = [
      {
        max: 800,
        styles: {
          contentWidth: "100%",
          soundcloudTransform: "scale(0.8)",
          soundcloudTransformOrigin: "top left",
          soundcloudWidth: "100%",
        },
      },
      {
        max: 1000,
        styles: {
          contentWidth: "100%",
          soundcloudTransform: "scale(0.8)",
          soundcloudTransformOrigin: "top left",
          soundcloudWidth: "100%",
        },
      },
      {
        max: 1400,
        styles: {
          contentWidth: "100%",
          soundcloudTransform: "none",
          soundcloudWidth: "100%",
        },
      },
      {
        default: true,
        styles: {
          contentWidth: "100%",
          soundcloudTransform: "none",
          soundcloudWidth: "100%",
        },
      },
    ];

    console.log("appWidth", appWidth);

    for (const config of stylesConfig) {
      if (config.default || appWidth < config.max) {
        const {
          contentWidth,
          soundcloudTransform,
          soundcloudTransformOrigin,
          soundcloudWidth,
        } = config.styles;

        if (contentWidth) contentRef.current.style.width = contentWidth;
        if (soundcloudTransform)
          soundcloudRef.current.style.transform = soundcloudTransform;
        if (soundcloudTransformOrigin)
          soundcloudRef.current.style.transformOrigin =
            soundcloudTransformOrigin;
        if (soundcloudWidth)
          soundcloudRef.current.style.width = soundcloudWidth;

        break; // Stop the loop once we find the appropriate breakpoint
      }
    }
  }, [appRef?.current?.offsetWidth]);

  const [hideSidebar, sideHideSidebar] = useState(false);
  console.log("Soundcloud refreshign ");

  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;
    if (appWidth < 1000) {
      sideHideSidebar(true);
    } else {
      sideHideSidebar(false);
    }
  }, [appRef?.current?.offsetWidth]);

  return (
    <div
      id="soundcloud"
      className="interactable sc-bg-sc-background sc-bg-sc-background min-w-[1200px] "
      ref={soundcloudRef}
    >
      <Navbar appRef={appRef} />

      <div
        className="sc-flex sc-justify-center soundcloud-container"
        ref={contentRef}
      >
        <div className="sc-w-[100%] sc-max-w-[1200px] sc-bg-white">
          <Profile />
          <ProfileMenu />

          {/* Left side 66% */}
          <div className="sc-flex sc-mt-4">
            {/* Min 1000px */}
            <div className="sc-flex sc-flex-col sc-w-4/6 sc-min-w-[750px]">
              <Songs tracks={tracks} />
            </div>

            {/* Right side 33% with left border */}
            {!hideSidebar && (
              <div className="sc-flex sc-flex-col sc-w-2/6 sc-p-4 sc-border-l-[0.5px] sc-min-w-[400px]">
                <AccountDetails tracks={tracks} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
