/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";

import "./style.scss";

const whatsHappening = [
  {
    type: "trending",
    title:
      "Why did the chicken cross the road? To get to the other side...duh!",
    time: "1 hour ago",
    count: "1.2K Tweets",
    img: "data:image/png;base64,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",
  },
  {
    type: "trending",
    title: "Why did the tomato turn red? Because it saw the salad dressing!",
    time: "3 hour ago",
    count: "1.2K Tweets",
  },
  {
    type: "trending",
    title:
      "I just spilled my coffee all over my keyboard. Now my keys are extra caffeinated and typing really fast",
    time: "1 hour ago",
    count: "1.2K Tweets",
  },
];

const whoToFollow = [
  {
    avatar: "/twitter/avatars/elon.jpg",
    name: "Elon Musk",
    username: "@elonmusk",
  },
  {
    avatar: "/twitter/avatars/nasa.png",
    name: "NASA",
    username: "@NASA",
  },
  {
    avatar: "/twitter/avatars/react.png",
    name: "Javascript",
    username: "@JSDevs",
  },
];

const Sidebar = ({ appRef }) => {
  const initialAppWidth = appRef?.current?.offsetWidth || 0;
  const [isHidden, setIsHidden] = useState(initialAppWidth < 1000);

  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;
    if (appWidth < 1000) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [appRef?.current?.offsetWidth]);

  return (
    <div>
      {!isHidden && (
        <div className="twitter-sidebar">
          {/* Search Twitter */}
          <div className="twitter-sidebar-search">
            <input type="text" placeholder="Search Twitter" />
          </div>

          {/* Whats happening */}
          <div className="twitter-sidebar-whats-happening">
            <span className="twitter-sidebar-whats-happening-title">
              What's happening
            </span>
            {whatsHappening.map((item, index) => (
              <div className="twitter-sidebar-whats-happening-item" key={index}>
                <div className="twitter-sidebar-whats-happening-item-left">
                  {/* Header */}
                  <div className="twitter-sidebar-whats-happening-item-left-header">
                    <div className="twitter-sidebar-whats-happening-item-left-header-type">
                      {item.type}
                    </div>

                    {/* Time */}
                    <div className="twitter-sidebar-whats-happening-item-left-header-time">
                      {item.time}
                    </div>
                  </div>
                  {/* Title */}
                  <div className="twitter-sidebar-whats-happening-item-left-title">
                    {item.title}
                  </div>
                </div>
                <div className="twitter-sidebar-whats-happening-item-right">
                  {/* Image */}
                  {item.img ? (
                    <div className="twitter-sidebar-whats-happening-item-right-img">
                      <img src={item.img} alt="" />
                    </div>
                  ) : (
                    <div className="twitter-sidebar-whats-happening-item-right-more">
                      ...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Who to follow */}
          <div className="twitter-sidebar-who-to-follow">
            <span className="twitter-sidebar-who-to-follow-title">
              Who to follow
            </span>
            {whoToFollow.map((item, index) => (
              <div className="twitter-sidebar-who-to-follow-item" key={index}>
                <div className="twitter-sidebar-who-to-follow-item-left">
                  {/* Avatar */}
                  <div className="twitter-sidebar-who-to-follow-item-left-avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                </div>

                {/* Info */}
                <div className="twitter-sidebar-who-to-follow-item-info">
                  <div className="twitter-sidebar-who-to-follow-item-info-name">
                    {item.name}
                  </div>
                  <div className="twitter-sidebar-who-to-follow-item-info-username">
                    {item.username}
                  </div>
                </div>
                {/* Follow */}
                <div className="twitter-sidebar-who-to-follow-item-right">
                  <div className="twitter-sidebar-who-to-follow-item-right-follow">
                    <span>Follow</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
