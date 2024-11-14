import "./FeelingItem.css";

const FeelingItem = ({ feelingId, feelingName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`FeelingItem ${
        isSelected ? `FeelingItem_on_${feelingId}` : ""
      }`}
    >
      <div className="feeling_name">{feelingName}</div>
    </div>
  );
};

export default FeelingItem;
