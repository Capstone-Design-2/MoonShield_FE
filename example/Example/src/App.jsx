import Login from "./components/Login";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h4>별빛이 비추듯 당신의 마음을 지켜드립니다.</h4>
      <Login />
      <p className="text1">카카오 로그인을 통해 MoonSheild에 접속해보세요.</p>
    </>
  );
}

export default App;
