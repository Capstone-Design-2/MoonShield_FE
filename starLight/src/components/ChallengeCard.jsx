import React from "react";
import "./ChallengeCard.css";

const setClassName = (text) => {
  return text === "New Challenge" ? "_NewChallenge" : "";
};

const ChallengeCard = ({ text }) => {
  const contentName = setClassName(text);

  if (text !== "New Challenge") {
    return (
      <div className={`challenge-card${contentName}`}>
        <div className="challenge-title">오늘의 챌린지</div>
        <div className="challenge-text">{text}</div>
      </div>
    );
  } else {
    return (
      <div className={`challenge-card${contentName}`}>
        <div className="challenge-text">{text}</div>
      </div>
    );
  }
};

export default ChallengeCard;
