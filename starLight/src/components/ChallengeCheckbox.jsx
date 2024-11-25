import React, { useState, useEffect, useContext } from "react";
import "./ChallengeCheckbox.css";

import { ChallengeContext } from "../App";

const setClassName = (text) => {
  return text === "New Challenge" ? "_NewChallenge" : "";
};

const ChallengeCheckbox = ({ id }) => {
  const {
    challengeMission,
    challengeId,
    pointsOfMission,
    sumOfpoint,
    addPoint,
    completedChallenges,
  } = useContext(ChallengeContext);

  var contentName;

  const handleAddPoint = (id, point) => {
    addPoint(id, point);
  };

  if (id === 1) {
    contentName = setClassName(challengeMission.Mission1);
    if (contentName === "") {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p1}pt`}</div>
          <button
            className={`challenge-checkbtn ${
              completedChallenges[id - 1] ? "challenge-checkbtn_disabled" : ""
            }`}
            onClick={() => handleAddPoint(id, pointsOfMission.p1)}
            disabled={completedChallenges[id - 1]}
          >
            완료
          </button>
        </div>
      );
    } else {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p1}pt`}</div>
          <button className="challenge-checkbtn"> 미오픈</button>
        </div>
      );
    }
  }

  if (id === 2) {
    contentName = setClassName(challengeMission.Mission2);
    if (contentName === "") {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p2}pt`}</div>
          <button
            className={`challenge-checkbtn ${
              completedChallenges[id - 1] ? "challenge-checkbtn_disabled" : ""
            }`}
            onClick={() => handleAddPoint(id, pointsOfMission.p2)}
            disabled={completedChallenges[id - 1]}
          >
            완료
          </button>
        </div>
      );
    } else {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p2}pt`}</div>
          <button className="challenge-checkbtn"> 미오픈</button>
        </div>
      );
    }
  }

  if (id === 3) {
    contentName = setClassName(challengeMission.Mission3);
    if (contentName === "") {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p3}pt`}</div>
          <button
            className={`challenge-checkbtn ${
              completedChallenges[id - 1] ? "challenge-checkbtn_disabled" : ""
            }`}
            onClick={() => handleAddPoint(id, pointsOfMission.p3)}
            disabled={completedChallenges[id - 1]}
          >
            완료
          </button>
        </div>
      );
    } else {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p3}pt`}</div>
          <button className="challenge-checkbtn">미오픈</button>
        </div>
      );
    }
  }
};

export default ChallengeCheckbox;
