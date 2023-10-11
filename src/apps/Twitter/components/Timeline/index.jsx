// React
import { useEffect } from "react";

// Components
import Post from "./components/Post";
import ProfileImg from "../../assets/images/profile.jpeg"

// Styles
import "./style.scss";

const users = [
  {
    id: 1,

    name: "James Hinton",
    username: "jameshinton",
    followers: 100,
    following: 255,
    activelyFollowing: true,
    avatar: ProfileImg,
    verified: false,
  },
  {
    id: 2,
    name: "Elon Musk",
    username: "elonmusk",
    followers: 8394389433,
    following: 1290129012,
    activelyFollowing: false,
    avatar: "/twitter/avatars/elon.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "National Aeronautics and Space Administration",
    username: "NASA",
    followers: 8394389433,
    following: 1290129012,
    activelyFollowing: false,
    avatar: "/twitter/avatars/nasa.png",
    verified: true,
  },
];

const Timeline = ({ tweets, setTweets }) => {
  const hasThisTweetGotAReply = (id) => {
    return tweets.find((tweet) => tweet.replyTo === id);
  };

  // Every 3 seconds refresh the tweets
  useEffect(() => {
    const interval = setInterval(() => {
      setTweets((tweets) => {
        return tweets.map((tweet) => {
          return {
            ...tweet,
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="twitter-timeline">
      {tweets.map((tweet) => {
        const repliedTweet = hasThisTweetGotAReply(tweet.id);
        return (
          <Post
            user={users.find((user) => user.id === tweet.user)}
            tweet={tweet}
            // Look through the other tweets and if theres a reply to that ID
            // then return that tweet
            reply={
              repliedTweet && {
                tweet: repliedTweet,
                user: users.find((user) => user.id === repliedTweet.user),
              }
            }
          />
        );
      })}
    </div>
  );
};

export default Timeline;
