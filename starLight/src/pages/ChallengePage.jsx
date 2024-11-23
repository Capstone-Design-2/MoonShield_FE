import React, { useContext, useEffect, useState } from "react";
import { ChallengeContext } from "../App";

import ChallengeCard from "../components/ChallengeCard";
import ChallengeCheckbox from "../components/ChallengeCheckbox";

const ChallengePage = () => {
  const {
    challengeMission,
    challengeId,
    pointsOfMission,
    sumOfpoint,
    addPoint,
  } = useContext(ChallengeContext);

  const [Points, setPoint] = useState(sumOfpoint);

  return (
    <div className="challenge-page">
      <header className="header">
        <h1 className="header-title">{`CHALLENGE /// ${Points}`}</h1>
      </header>
      <ChallengeCard id={challengeId.Id1} />
      <ChallengeCheckbox id={challengeId.Id1} />

      <ChallengeCard id={challengeId.Id2} />
      <ChallengeCheckbox id={challengeId.Id2} />

      <ChallengeCard id={challengeId.Id3} />
      <ChallengeCheckbox id={challengeId.Id3} />
    </div>
  );
};

export default ChallengePage;
