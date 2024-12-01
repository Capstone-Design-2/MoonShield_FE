import React, { useContext, useEffect, useState } from "react";
import { ChallengeContext } from "../App";

import axios from "axios";

import ChallengeCard from "../components/ChallengeCard";
import ChallengeCheckbox from "../components/ChallengeCheckbox";

const ChallengePage = () => {
  const [challenge, setChallenge] = useState([]);
  const [sumOfPoint, setSumOfPoint] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallege = async () => {
      try {
        setError(null);
        setChallenge(null);
        setLoading(true);
        const fetchChallege = await axios.get(
          "http://www.0429.site:8081/api/v1/challenges"
        );
        setChallenge(fetchChallege.data.data.challenges);
        setSumOfPoint(fetchChallege.data.data.sumOfPoint);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchChallege();
  }, []);

  if (loading) return <div>로딩중..</div>; // 로딩 상태가 활성화 됐을때 렌더링 될 문구
  if (error) return <div>에러가 발생했습니다</div>; // 에러 발생시 렌더링 될 문구
  if (!challenge) return null; // users 값이 없을 때에는 null 을 보여주도록 처리

  // 챌린지 완료 상태 업데이트
  const handleComplete = (id) => {
    setChallenge((prevChallenge) =>
      prevChallenge.map((challenge) =>
        challenge.id === id ? { ...challenge, isCompleted: true } : challenge
      )
    );
  };

  return (
    <div className="challenge-page">
      <header className="header">
        <h1 className="header-title">{`CHALLENGE`}</h1>
      </header>
      {challenge.map((challenge) => (
        <div key={challenge.id}>
          <ChallengeCard
            id={challenge.id}
            challengeName={challenge.challengeName}
          />
          <ChallengeCheckbox
            id={challenge.id}
            challengeName={challenge.challengeName}
            points={challenge.points}
            isCompleted={challenge.isCompleted}
            onComplete={handleComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default ChallengePage;
