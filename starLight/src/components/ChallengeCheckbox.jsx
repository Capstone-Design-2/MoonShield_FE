import React, { useState, useEffect, useContext } from "react";
import "./ChallengeCheckbox.css";

import axios from "axios";

import { ChallengeContext } from "../App";

const ChallengeCheckbox = ({
  id,
  challengeName,
  points,
  isCompleted,
  onComplete,
}) => {
  const [challenge, setChallenge] = useState([]);
  const [sumOfPoint, setSumOfPoint] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <div>로딩중..</div>; // 로딩 상태가 활성화 됐을때 렌더링 될 문구
  if (error) return <div>에러가 발생했습니다</div>; // 에러 발생시 렌더링 될 문구
  if (!challenge) return null; // users 값이 없을 때에는 null 을 보여주도록 처리

  const handleAddPoint = async (id) => {
    try {
      setError(null);
      setLoading(true);
      await axios.post(
        `http://www.0429.site:8081/api/v1/challenges/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer Access Token`,
          },
        }
      );

      onComplete(id);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="challenge-checkbox">
      <div className="challenge-point">{`+ ${points}pt`}</div>
      <button
        className={`challenge-checkbtn ${
          isCompleted ? "challenge-checkbtn_disabled" : ""
        }`}
        onClick={() => handleAddPoint(id, points)}
        disabled={isCompleted || loading}
      >
        완료
      </button>
    </div>
  );
};

export default ChallengeCheckbox;
