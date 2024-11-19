import ChallengeCard from "./ChallengeCard";
import ChallengeCheckbox from "./ChallengeCheckbox";

const ChallengeContent = ({ dailyContent }) => {
  return (
    <div className="challenge-content">
      <ChallengeCard text={dailyContent} />
      <ChallengeCheckbox text={dailyContent} />
    </div>
  );
};

export default ChallengeContent;
