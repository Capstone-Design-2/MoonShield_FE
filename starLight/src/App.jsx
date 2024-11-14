import "./App.css";
import ChatPage from "./pages/ChatPage";
import MainPage from "./pages/MainPage";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
