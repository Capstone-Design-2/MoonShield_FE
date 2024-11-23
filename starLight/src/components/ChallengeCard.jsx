import React, { useContext } from "react";
import "./ChallengeCard.css";

import { ChallengeContext } from "../App";

const setClassName = (text) => {
  return text === "New Challenge" ? "_NewChallenge" : "";
};

const ChallengeCard = ({ id }) => {
  const {
    challengeMission,
    challengeId,
    pointsOfMission,
    sumOfpoint,
    addPoint,
  } = useContext(ChallengeContext);
  var contentName;

  if (id === 1) {
    contentName = setClassName(challengeMission.Mission1);
    if (contentName === "") {
      return (
        <div className={`challenge-card${contentName}`}>
          <div className="challenge-title">오늘의 챌린지</div>
          <div className="challenge-text">{challengeMission.Mission1}</div>
        </div>
      );
    } else {
      return (
        <div className={`challenge-card${contentName}`}>
          <div className="challenge-text">{challengeMission.Mission1}</div>
        </div>
      );
    }
  }

  if (id === 2) {
    contentName = setClassName(challengeMission.Mission2);
    if (contentName === "") {
      return (
        <div className={`challenge-card${contentName}`}>
          <div className="challenge-title">오늘의 챌린지</div>
          <div className="challenge-text">{challengeMission.Mission2}</div>
        </div>
      );
    } else {
      return (
        <div className={`challenge-card${contentName}`}>
          <div className="challenge-text">{challengeMission.Mission2}</div>
        </div>
      );
    }
  }

  if (id === 3) {
    contentName = setClassName(challengeMission.Mission3);
    if (contentName === "") {
      return (
        <div className={`challenge-card${contentName}`}>
          <div className="challenge-title">오늘의 챌린지</div>
          <div className="challenge-text">{challengeMission.Mission3}</div>
        </div>
      );
    } else {
      return (
        <div className={`challenge-card${contentName}`}>
          <div className="challenge-text">{challengeMission.Mission3}</div>
        </div>
      );
    }
  }
};

export default ChallengeCard;
