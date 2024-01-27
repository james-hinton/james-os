// React
import { useState, useEffect, useRef } from "react";

// Components
import TwitterNavbar from "./components/TwitterNavbar";
import Tweet from "./components/Tweet";
import Timeline from "./components/Timeline";
import Sidebar from "./components/Sidebar";

// Data
import { defaultTweets } from "./data/tweets";

// Styles
import "./style.scss";

const Twitter = ({ appRef }) => {
  const [tweets, setTweets] = useState(defaultTweets);
  const twitterRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;

    const stylesConfig = [
      {
        max: 400,
        styles: {
          contentWidth: "100%",
          twitterTransform: "scale(0.6)",
          twitterTransformOrigin: "top left",
          twitterWidth: "160%",
        },
      },
      {
        max: 600,
        styles: {
          contentWidth: "100%",
          twitterTransform: "scale(0.7)",
          twitterTransformOrigin: "top left",
          twitterWidth: "140%",
        },
      },
      {
        max: 1000,
        styles: {
          contentWidth: "100%",
          twitterTransform: "scale(0.8)",
          twitterTransformOrigin: "top left",
          twitterWidth: "120%",
        },
      },
      {
        max: 1400,
        styles: {
          twitterTransform: "scale(0.9)",
          twitterTransformOrigin: "top left",
          twitterWidth: "110%",
        },
      },
      {
        default: true,
        styles: {
          contentWidth: "45%",
          twitterTransform: "none",
          twitterWidth: "100%",
        },
      },
    ];

    for (const config of stylesConfig) {
      if (config.default || appWidth < config.max) {
        const {
          contentWidth,
          twitterTransform,
          twitterTransformOrigin,
          twitterWidth,
        } = config.styles;

        if (contentWidth) contentRef.current.style.width = contentWidth;
        if (twitterTransform)
          twitterRef.current.style.transform = twitterTransform;
        if (twitterTransformOrigin)
          twitterRef.current.style.transformOrigin = twitterTransformOrigin;
        if (twitterWidth) twitterRef.current.style.width = twitterWidth;

        break; // Stop the loop once we find the appropriate breakpoint
      }
    }
  }, [appRef?.current?.offsetWidth]);

  return (
    <div id="twitter" className="interactable" ref={twitterRef}>
      <div className="twitter-container">
        {/* On the left is the navbar */}
        <TwitterNavbar appRef={appRef} />
        {/* In the middle is the main content */}
        <div className="twitter-content" ref={contentRef}>
          <div className="twitter-content-header">
            <h4 className="twitter-content-header-title">Home</h4>
          </div>

          <Tweet tweets={tweets} setTweets={setTweets} />
          <Timeline tweets={tweets} setTweets={setTweets} />
        </div>
        {/* On the right is the sidebar */}
        <Sidebar appRef={appRef} />
      </div>
    </div>
  );
};

export default Twitter;
