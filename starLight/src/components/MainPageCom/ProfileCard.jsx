import React from "react";
import "./ProfileCard.css";
import UserInfo from "./UserInfo";
import ProEdit from "./ProEdit";

const ProfileCard = (sumOfPoint) => {
  return (
    <div className="profile-container">
      <div className="avatar" />
      <div className="profile-info">
        <UserInfo />
        <ProEdit sumOfPoint={sumOfPoint} />
      </div>
    </div>
  );
};

export default ProfileCard;
