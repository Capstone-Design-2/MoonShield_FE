import React from "react";
import "./InputBar.css";

const InputBar = ({ userInput, setUserInput, handleSendMessage }) => {
  return (
    <div className="input-bar">
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>전송</button>
    </div>
  );
};

export default InputBar;
