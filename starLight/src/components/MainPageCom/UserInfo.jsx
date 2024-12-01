import React, { useEffect, useState } from "react";
import { apiClient } from "../../util/api";
import "./UserInfo.css";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await apiClient(
          "http://www.0429.site:8081/api/v1/member/me"
        );
        setUserInfo(data); // 데이터 설정
      } catch (err) {
        setError("Failed to fetch user info.");
      }
    };

    fetchUserInfo();
  }, []);

  // 상태 업데이트를 감지
  useEffect(() => {
    if (userInfo) {
      console.log("Updated userInfo:", userInfo);
      console.log(userInfo.data.nickname); // 업데이트된 상태 확인
    }
  }, [userInfo]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!userInfo) return <p>Loading...</p>;

  return (
    <div className="user-info">
      <div className="username">{userInfo.data.nickname}</div>
      <div className="user-id">@{userInfo.data.loginId}</div>
    </div>
  );
};

export default UserInfo;
