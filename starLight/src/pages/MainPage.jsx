import React from "react";
import ProfileCard from "../components/MainPageCom/ProfileCard";
import ChallengeCard from "../components/ChallengeCard";
import CharPrompt from "../components/MainPageCom/CharPrompt";
import Header from "../components/Header";

const MainPage = () => {
  return (
    <div>
      <Header />
      <ProfileCard />
      <ChallengeCard />
      <ChallengeCard />
      <CharPrompt />
    </div>
  );
};

export default MainPage;
