import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ sender, message }) => {
  return (
    <div className={`message-bubble ${sender}`}>
      <span>{message}</span>
    </div>
  );
};

export default MessageBubble;
