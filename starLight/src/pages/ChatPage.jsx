import React from "react";
import Chatbot from "../components/ChatComponents/ChatBot";
import InputBar from "../components/ChatComponents/InputBar";
import MessageBubble from "../components/ChatComponents/MessageBubble";
import Header from "../components/Header";

const ChatPage = () => {
  return (
    <div className="chat-page">
      <Header />
      <div className="chat-container">
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatPage;
