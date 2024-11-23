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
  } = useContext(ChallengeContext);

  useEffect(() => {
    console.log(`{1 : ${sumOfpoint}}`);
  }, [sumOfpoint]);

  var contentName;

  console.log(`1 : ${sumOfpoint}`);

  if (id === 1) {
    contentName = setClassName(challengeMission.Mission1);

    if (contentName === "") {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p1}pt`}</div>
          <button
            className="challenge-checkbtn"
            onClick={addPoint(pointsOfMission.p1)}
          >
            {" "}
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
            className="challenge-checkbtn"
            onClick={addPoint(pointsOfMission.p2)}
          >
            {" "}
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
            className="challenge-checkbtn"
            onClick={addPoint(pointsOfMission.p3)}
          >
            {" "}
            완료
          </button>
        </div>
      );
    } else {
      return (
        <div className={`challenge-checkbox${contentName}`}>
          <div className="challenge-point">{`+ ${pointsOfMission.p3}pt`}</div>
          <button className="challenge-checkbtn"> 미오픈</button>
        </div>
      );
    }
  }
};

export default ChallengeCheckbox;
