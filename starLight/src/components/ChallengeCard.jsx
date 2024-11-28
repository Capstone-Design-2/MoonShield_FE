import React, { useEffect, useState, useContext } from "react";
import "./ChallengeCard.css";

import axios from "axios";

import { ChallengeContext } from "../App";

const setClassName = (text) => {
  return text === "New Challenge" ? "_NewChallenge" : "";
};

const ChallengeCard = ({ id, challengeName }) => {
  const { challengeData } = useContext(ChallengeContext);
  var contentName;

  return (
    <div className={`challenge-card`}>
      <div className="challenge-title">오늘의 챌린지</div>
      <div className="challenge-text">{challengeName}</div>
    </div>
  );

  // if (id === challengeData.challenge1.id) {
  //   contentName = setClassName(challengeData.challenge1.challengeName);
  //   if (contentName === "") {
  //     return (
  //       <div className={`challenge-card${contentName}`}>
  //         <div className="challenge-title">오늘의 챌린지</div>
  //         <div className="challenge-text">
  //           {challengeData.challenge1.challengeName}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className={`challenge-card${contentName}`}>
  //         <div className="challenge-text">
  //           {challengeData.challenge1.challengeName}
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  // if (id === challengeData.challenge2.id) {
  //   contentName = setClassName(challengeData.challenge2.challengeName);
  //   if (contentName === "") {
  //     return (
  //       <div className={`challenge-card${contentName}`}>
  //         <div className="challenge-title">오늘의 챌린지</div>
  //         <div className="challenge-text">
  //           {challengeData.challenge2.challengeName}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className={`challenge-card${contentName}`}>
  //         <div className="challenge-text">
  //           {challengeData.challenge2.challengeName}
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  // if (id === challengeData.challenge3.id) {
  //   contentName = setClassName(challengeData.challenge3.challengeName);
  //   if (contentName === "") {
  //     return (
  //       <div className={`challenge-card${contentName}`}>
  //         <div className="challenge-title">오늘의 챌린지</div>
  //         <div className="challenge-text">
  //           {challengeData.challenge3.challengeName}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className={`challenge-card${contentName}`}>
  //         <div className="challenge-text">
  //           {challengeData.challenge3.challengeName}
  //         </div>
  //       </div>
  //     );
  //   }
  // }
};

export default ChallengeCard;
