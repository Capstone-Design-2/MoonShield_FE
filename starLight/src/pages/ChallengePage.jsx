import React from "react";

import ChallengeContent from "../components/ChallengeContent";

const ChallengePage = () => {
  return (
    <div className="challenge-page">
      <header className="header">
        <h1 className="header-title">CHALLENGE</h1>
      </header>
      <ChallengeContent />
      <ChallengeContent />
      <ChallengeContent />
    </div>
  );
};

export default ChallengePage;
