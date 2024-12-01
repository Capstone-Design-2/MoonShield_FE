import React, { useEffect, useState } from "react";
import { apiClient } from "../../util/api"; // 공통 API 유틸리티
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅 사용
import "./ProEdit.css";

const ProEdit = () => {
  const [point, setPoint] = useState(null); // 포인트를 저장할 상태
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const navigate = useNavigate(); // 네비게이션 훅

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await apiClient(
          "http://www.0429.site:8081/api/v1/member/me"
        );
        if (response && response.data) {
          setPoint(response.data.point); // 서버 응답에서 포인트 추출
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        setError("Failed to fetch points.");
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchUserPoints();
  }, []);

  const handleEditClick = () => {
    navigate("/edit"); // "/edit" 경로로 이동
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="pro-edit">
      <div className="points">{`+${point} Point`}</div> {/* 포인트 출력 */}
      <button className="edit-button" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
};

export default ProEdit;
