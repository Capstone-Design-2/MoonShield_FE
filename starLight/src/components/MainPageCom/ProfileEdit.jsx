import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import { apiClient } from "../../util/api"; // API 유틸리티 가져오기
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const [id, setId] = useState(""); // 사용자 ID
  const [nickname, setNickname] = useState(""); // 닉네임
  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(""); // 에러 메시지

  const navigate = useNavigate(); // useNavigate 훅 초기화

  // 서버에서 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient(
          "http://www.0429.site:8081/api/v1/member/me"
        );
        if (response && response.data) {
          const { loginId, nickname, email } = response.data;
          setId(loginId); // ID 설정
          setNickname(nickname); // 닉네임 설정
          setEmail(email); // 이메일 설정
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("정보가 성공적으로 저장되었습니다!");
    navigate("/"); // "/" 페이지로 이동
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="edit-page">
      <h2>프로필 수정</h2>
      <form className="edit-form">
        <div className="form-group">
          <label>ID</label>
          <input type="text" value={id} disabled className="input-disabled" />
        </div>

        <div className="form-group">
          <label>닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
        </div>

        <button type="button" onClick={handleSave} className="save-button">
          저장
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
