import React from "react";
import { Link, useLocation } from "react-router-dom";
import home from "../assets/home.png";
import homeActive from "../assets/home-active.png";
import chat from "../assets/chat.png";
import chatActive from "../assets/chat-active.png";
import daily from "../assets/daily.png";
import dailyActive from "../assets/daily-active.png";
import challenge from "../assets/challenge.png";
import challengeActive from "../assets/challenge-active.png";
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", activeImg: homeActive, img: home, alt: "Home" },
    { path: "/chat", activeImg: chatActive, img: chat, alt: "Chat" },
    { path: "/daily", activeImg: dailyActive, img: daily, alt: "Daily" },
    {
      path: "/challenge",
      activeImg: challengeActive,
      img: challenge,
      alt: "Challenge",
    },
  ];

  return (
    <div className="bottom-nav-wrapper">
      {/* 흰색 박스 안에 포함 */}
      <div className="bottom-nav">
        {navItems.map((navItem, index) => (
          <Link to={navItem.path} key={index} className="nav-link">
            <img
              src={
                location.pathname === navItem.path
                  ? navItem.activeImg
                  : navItem.img
              }
              alt={navItem.alt}
              className="nav-item"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
