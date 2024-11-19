import React from "react";

import ChallengeContent from "../components/ChallengeContent";

const ChallengePage = () => {
  return (
    <div className="challenge-page">
      <header className="header">
        <h1 className="header-title">CHALLENGE</h1>
      </header>
      <ChallengeContent dailyContent={"밖에 나가서 신선한 공기 마시기"} />
      <ChallengeContent dailyContent={"친한 친구에게 안부 전화 하기"} />
      <ChallengeContent dailyContent={"New Challenge"} />
    </div>
  );
};

export default ChallengePage;
