import ChallengeCard from "./ChallengeCard";
import ChallengeCheckbox from "./ChallengeCheckbox";

const ChallengeContent = ({ dailyContent }) => {
  return (
    <div className={`challenge-content${contentName}`}>
      <ChallengeCard text={dailyContent} />
      <ChallengeCheckbox />
    </div>
  );
};

export default ChallengeContent;
