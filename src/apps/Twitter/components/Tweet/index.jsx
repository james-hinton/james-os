import { useState } from "react";

// Images
import ProfileImg from "../../assets/images/profile.jpeg";

// Styles
import "./style.scss";

const Tweet = ({ tweets, setTweets }) => {
  const [tweet, setTweet] = useState("");

  const createTweet = () => {
    // make tweet text safe and only include a-z or A-Z
    let safeTweet = tweet.replace(/[^a-zA-Z ]/g, "");

    // If safe tweet is empty then return
    if (safeTweet === "") return;
    

    let userTweet = {
      id: tweets.length + 1,
      user: 1,
      text: safeTweet,
      // likes: Random number between 0 and 1 million
      likes: Math.floor(Math.random() * 1000000),
      // retweets: Random number between 0 and 1 million
      retweets: Math.floor(Math.random() * 1000000),
      // replies: Random number between 0 and 1 million
      replies: Math.floor(Math.random() * 1000000),
      createdAt: new Date().toISOString(),
    };

    // Add it to the first index
    setTweets([userTweet, ...tweets]);
    setTweet("");
  };

  return (
    <>
      <div className="twitter-tweet">
        <div className="twitter-tweet-container">
          <div className="twitter-tweet-avatar">
            <img src={ProfileImg} alt="Profile" />
          </div>
          <div className="twitter-tweet-content">
            <input
              type="text"
              placeholder="What's happening?"
              className="twitter-tweet-content-input"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              // handle enter key
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  tweet.length > 0
                    ? createTweet()
                    : alert("Please enter a tweet");
                }
              }}
            />
          </div>
        </div>
        <div className="twitter-tweet-footer">
          <div
            className="twitter-tweet-footer-tweet"
            onClick={
              tweet.length > 0
                ? createTweet
                : () => alert("Please enter a tweet")
            }
          >
            Tweet
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
