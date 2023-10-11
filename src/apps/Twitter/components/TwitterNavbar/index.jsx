import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.scss";

const menuItems = [
  {
    name: "Home",
    icon: "home",
    link: "/twitter",
  },
  {
    name: "Explore",
    icon: "explore",
    link: "/twitter/explore",
  },
  {
    name: "Notifications",
    icon: "bell",
    link: "/twitter/notifications",
  },
  {
    name: "Messages",
    icon: "messages",
    link: "/twitter/messages",
  },
  {
    name: "Profile",
    icon: "profile",
    link: "/twitter/profile",
  },
  {
    name: "More",
    icon: "more",
    link: "/twitter/more",
  },
];

const TwitterNavbar = ({ appRef }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const appWidth = appRef?.current?.offsetWidth;
    console.log('IS MOBILE', appWidth)
    if (appWidth > 1300) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [appRef?.current?.offsetWidth]);

  useEffect(() => {
    setSidebarExpanded(isMobile);
  }, [isMobile]);

  return (
    <div
      className={`twitter-navbar ${
        sidebarExpanded ? "twitter-navbar-expanded" : ""
      }`}
    >
      <div
        className={`twitter-navbar-container ${
          sidebarExpanded ? "twitter-navbar-container-expanded" : ""
        }`}
      >
        {/* The Twitter logo */}
        <div
          className={`twitter-navbar-logo ${
            sidebarExpanded && "twitter-navbar-logo-expanded"
          }`}
        >
          <a href="/">
            <img src="/twitter/logo-blue.png" alt="Twitter logo" />
          </a>
        </div>
        {/* Menu Options */}
        <div className="twitter-navbar-menu">
          {menuItems.map((item, index) => (
            <div
              onClick={() => setActiveMenuItem(index)}
              className={`twitter-navbar-menu-item ${
                sidebarExpanded && "twitter-navbar-menu-item-expanded "
              } ${
                activeMenuItem === index && "twitter-navbar-menu-item-active"
              }`}
              key={index}
            >
              {/* An Svg of the icon */}
              <img
                src={`/twitter/nav-icons/${item.icon}.svg`}
                alt={item.name}
                className="twitter-navbar-menu-item-icon"
              />
              {/* The name of the menu item if sidebar is expanded */}
              {sidebarExpanded && <span>{item.name}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwitterNavbar;
