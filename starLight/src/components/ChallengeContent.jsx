import ChallengeCard from "./ChallengeCard";
import ChallengeCheckbox from "./ChallengeCheckbox";

const ChallengeContent = () => {
  return (
    <div className="challenge-content">
      <ChallengeCard text="밖에 나가서 신선한 공기 마시기" />
      <ChallengeCheckbox />
    </div>
  );
};

export default ChallengeContent;
