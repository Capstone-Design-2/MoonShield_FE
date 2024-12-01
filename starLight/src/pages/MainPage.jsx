import React, { useEffect, useState } from "react";
import ProfileCard from "../components/MainPageCom/ProfileCard";
import ChallengeCard from "../components/ChallengeCard";
import CharPrompt from "../components/MainPageCom/CharPrompt";
import Header from "../components/Header";

import axios from "axios";

const MainPage = () => {
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

  return (
    <div>
      <Header />
      <ProfileCard sumOfPoint={sumOfPoint} />
      {challenge.map((challenge) => (
        <div key={challenge.id}>
          <ChallengeCard
            id={challenge.id}
            challengeName={challenge.challengeName}
          />
        </div>
      ))}
      <CharPrompt />
    </div>
  );
};

export default MainPage;
