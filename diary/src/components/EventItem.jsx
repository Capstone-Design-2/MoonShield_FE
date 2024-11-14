import "./EventItem.css";

const EventItem = ({ eventId, eventName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`EventItem ${isSelected ? `EventItem_on_${eventId}` : ""}`}
    >
      <div className="event_name">{eventName}</div>
    </div>
  );
};

export default EventItem;
