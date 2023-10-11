// React
import { useEffect } from "react";

// Styles
import "./style.scss";

const Post = ({ user, tweet, reply, inReply }) => {
  const renderDate = (date) => {
    const dateObj = new Date(date);
    // Say like 4h or 2d or 1w etc.
    const diff = Math.floor((new Date() - dateObj) / 1000);
    if (diff < 60) {
      return `${diff}s`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}m`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h`;
    } else if (diff < 604800) {
      return `${Math.floor(diff / 86400)}d`;
    } else if (diff < 2419200) {
      return `${Math.floor(diff / 604800)}w`;
    } else if (diff < 29030400) {
      return `${Math.floor(diff / 2419200)}mo`;
    } else {
      return `${Math.floor(diff / 29030400)}y`;
    }
  };

  const renderNumber = (number) => {
    // Render like 1.2k or 1.2m or 1.2b
    if (number < 1000) {
      return number;
    } else if (number < 1000000) {
      return `${Math.floor(number / 1000)}k`;
    } else if (number < 1000000000) {
      return `${Math.floor(number / 1000000)}m`;
    } else {
      return `${Math.floor(number / 1000000000)}b`;
    }
  };

  const renderText = (text) => {
    text = text.replace(/@(\w+)/g, '<a href="/">@$1</a>');
    text = text.replace(/#(\w+)/g, '<a href="/">#$1</a>');
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="twitter-post-container">
      {/* If reply to, then hide unless */}
      {(!tweet.replyTo || inReply) && (
        <>
          {reply && (
            <div className="twitter-post-reply">
              {/* Reply icon */}
              <img src="/twitter/misc-icons/reply.svg" alt="reply" />
              {reply.user.name} replied
            </div>
          )}

          <div className={`twitter-post ${reply && "twitter-post-reply-type"}`}>
            {/* Avatar */}
            <div className="twitter-post-avatar">
              <img src={user.avatar} alt="avatar" />
            </div>
            {/* If reply, make a line */}
            {reply && <div className="twitter-post-reply-line"></div>}
            {/* Content */}
            <div className="twitter-post-content">
              {/* Header */}
              <div className="twitter-post-content-header">
                <div className="twitter-post-content-header-name">
                  <h4>{user.name}</h4>
                </div>
                {/* Verified */}
                {user.verified && (
                  <div className="twitter-post-content-header-verified">
                    <img
                      src="/twitter/misc-icons/verified.svg"
                      alt="verified"
                    />
                  </div>
                )}
                {/* Username */}
                <div className="twitter-post-content-header-username">
                  <span>@{user.username}</span>
                </div>
                {/* Time Posted */}
                <div className="twitter-post-content-header-date">
                  <span>{renderDate(tweet.createdAt)}</span>
                </div>
              </div>

              {/* Body */}
              <div className="twitter-post-content-body">
                <p>{renderText(tweet.text)}</p>

                {/* Image */}
                {tweet.image && (
                  <div className="twitter-post-content-body-image">
                    <img src={tweet.image} alt="tweet" />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="twitter-post-content-footer">
                {/* Reply */}
                <div className="twitter-post-content-footer-action">
                  <img
                    src="/twitter/misc-icons/reply.svg"
                    alt="reply"
                    className="twitter-post-content-footer-icon"
                  />
                  <span>{renderNumber(tweet.replies)}</span>
                </div>
                {/* Retweet */}
                <div className="twitter-post-content-footer-action">
                  <img
                    src="/twitter/misc-icons/retweet.svg"
                    alt="retweet"
                    className="twitter-post-content-footer-icon"
                  />
                  <span>{renderNumber(tweet.retweets)}</span>
                </div>
                {/* Like */}
                <div className="twitter-post-content-footer-action">
                  <img
                    src="/twitter/misc-icons/like.svg"
                    alt="like"
                    className="twitter-post-content-footer-icon"
                  />
                  <span>{renderNumber(tweet.likes)}</span>
                </div>
                {/* Share */}
                <div className="twitter-post-content-footer-action">
                  <img
                    src="/twitter/misc-icons/share.svg"
                    alt="share"
                    className="twitter-post-content-footer-icon"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* If reply, add that users post too */}
          {reply && <Post user={reply.user} tweet={reply.tweet} inReply />}
        </>
      )}
    </div>
  );
};

export default Post;
