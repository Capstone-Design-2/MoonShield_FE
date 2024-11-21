import React from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation 추가
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
  const location = useLocation(); // 현재 경로 감지

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
    <nav className="wrapper">
      {navItems.map((navItem, index) => (
        <div key={index}>
          <Link to={navItem.path} className="nav-link">
            <img
              src={
                location.pathname === navItem.path
                  ? navItem.activeImg
                  : navItem.img
              } // 현재 경로와 비교
              alt={navItem.alt}
              className="nav-item"
            />
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;
