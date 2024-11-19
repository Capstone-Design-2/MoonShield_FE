import "./ChallengeCheckbox.css";

const setClassName = (text) => {
  return text === "New Challenge" ? "_NewChallenge" : "";
};

const ChallengeCheckbox = ({ text }) => {
  const contentName = setClassName(text);

  if (text === "New Challenge") {
    return (
      <div className={`challenge-checkbox${contentName}`}>
        <div className="challenge-point"></div>
        <button className="challenge-checkbtn"> 미오픈</button>
      </div>
    );
  } else {
    return (
      <div className={`challenge-checkbox${contentName}`}>
        <div className="challenge-point">+ 10pt</div>
        <button className="challenge-checkbtn"> 완료</button>
      </div>
    );
  }
};

export default ChallengeCheckbox;
