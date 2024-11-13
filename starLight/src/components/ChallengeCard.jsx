import React from "react";
import "./ChallengeCard.css";

const ChallengeCard = ({ text }) => {
  return (
    <div className="challenge-container">
      <div className="challenge-title">오늘의 챌린지</div>
      <div className="challenge-text">{text}</div>
    </div>
  );
};

export default ChallengeCard;
