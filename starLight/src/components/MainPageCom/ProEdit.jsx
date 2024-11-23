import React from "react";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅 사용
import "./ProEdit.css";

const ProEdit = () => {
  const navigate = useNavigate(); // useNavigate 훅으로 네비게이션 함수 생성

  const handleEditClick = () => {
    navigate("/edit"); // "/edit" 경로로 이동
  };

  return (
    <div className="pro-edit">
      <div className="points">+205 Point</div>
      <button className="edit-button" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
};

export default ProEdit;
