// React
import React, { useState } from "react";

// Components
import TwitterNavbar from "./components/TwitterNavbar";
import Tweet from "./components/Tweet";
import Timeline from "./components/Timeline";
import Sidebar from "./components/Sidebar";

// Data
import { defaultTweets } from "./data/tweets";

// Styles
import "./style.scss";

const Twitter = () => {
  const [tweets, setTweets] = useState(defaultTweets);

  return (
    <div id="twitter" className="interactable">
      <div className="twitter-container">
        {/* On the left is the navbar */}
        <TwitterNavbar />
        {/* In the middle is the main content */}
        <div className="twitter-content">
          <div className="twitter-content-header">
            <h4 className="twitter-content-header-title">Home</h4>
          </div>

          <Tweet 
            tweets={tweets}
            setTweets={setTweets}
          />
          <Timeline
            tweets={tweets}
            setTweets={setTweets}
          />
        </div>
        {/* On the right is the sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Twitter;
