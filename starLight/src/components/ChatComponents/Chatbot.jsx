import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; // react-markdown import
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatDivRef = useRef(null);
  const typingSpeed = 50; // 타이핑 속도 (ms)

  const apiSendUri = "http://www.0429.site:8081/api/v1/chats/query"; // POST 요청: AI 메시지 전송
  const apiReceiveUri = "http://www.0429.site:8081/api/v1/chats/answer"; // GET 요청: AI 응답 가져오기

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 메시지 추가 함수
  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  // 타이핑 효과 추가 함수
  const typeMessage = async (fullMessage) => {
    const messageArray = fullMessage.split(""); // 한 글자씩 분리
    let typedMessage = "";

    for (let i = 0; i < messageArray.length; i++) {
      typedMessage += messageArray[i];
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage?.sender === "bot") {
          // 마지막 메시지가 챗봇의 메시지인 경우 업데이트
          updatedMessages[updatedMessages.length - 1] = {
            ...lastMessage,
            message: typedMessage,
          };
        }
        return updatedMessages;
      });
      await wait(typingSpeed); // 타이핑 속도만큼 대기
    }
  };

  const sendMessageToServer = async (message) => {
    try {
      const response = await fetch(apiSendUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "생성 성공") {
          console.log("메시지 전송 성공:", data.message);
        } else {
          console.error("서버 메시지 처리 실패:", data.message);
          addMessage("bot", "메시지 처리 실패!");
        }
      } else {
        console.error("메시지 전송 실패:", response.status);
        addMessage("bot", `메시지 전송 실패! 상태 코드: ${response.status}`);
      }
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
      addMessage("bot", "메시지 전송 중 오류 발생!");
    }
  };

  const fetchResponseFromServer = async () => {
    try {
      const response = await fetch(apiReceiveUri, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("서버 응답 데이터:", data);
        if (data.message === "조회 성공" && data.data?.content) {
          addMessage("bot", ""); // 빈 메시지로 챗봇 타이핑 시작
          await typeMessage(data.data.content); // 타이핑 효과
        } else {
          console.error("서버 응답 처리 실패:", data.message);
          addMessage("bot", "AI 응답이 비어 있습니다.");
        }
      } else {
        console.error("AI 응답 조회 실패! 상태 코드:", response.status);
        addMessage("bot", `AI 응답 조회 실패! 상태 코드: ${response.status}`);
      }
    } catch (error) {
      console.error("응답 조회 중 오류 발생:", error);
      addMessage("bot", "응답 조회 중 오류 발생!");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage("user", message); // 사용자 메시지 추가
    setUserInput("");
    setLoading(true);

    try {
      await sendMessageToServer(message);
      await wait(3000);
      await fetchResponseFromServer();
    } catch (error) {
      console.error("전체 처리 중 오류 발생:", error);
      addMessage("bot", "전체 처리 중 오류 발생!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.isComposing || event.keyCode === 229) return;

    if (event.key === "Enter" && !event.shiftKey && userInput.trim() !== "") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="Chatbot">
      <h1 className="chatbot-title">인공지능 챗봇</h1>
      <div className="chatDiv" ref={chatDivRef}>
        {loading && (
          <span className="messageWait">답변을 기다리고 있습니다...</span>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === "user" ? (
              <>나: {msg.message}</>
            ) : (
              <>
                챗봇:{" "}
                <ReactMarkdown className="markdown">
                  {msg.message}
                </ReactMarkdown>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="inputDiv">
        <textarea
          rows="1"
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="chatInput"
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "전송 중..." : "전송"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
