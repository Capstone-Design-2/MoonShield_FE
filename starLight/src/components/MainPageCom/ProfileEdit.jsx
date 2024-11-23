import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 가져오기
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const [nickname, setNickname] = useState("닉네임");
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // useNavigate 훅 초기화

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("정보가 성공적으로 저장되었습니다!");
    navigate("/"); // "/" 페이지로 이동
  };

  return (
    <div className="edit-page">
      <h2>프로필 수정</h2>
      <form className="edit-form">
        <div className="form-group">
          <label>ID</label>
          <input
            type="text"
            value="@this_is_ID"
            disabled
            className="input-disabled"
          />
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
