import "./App.css";
import MainPage from "./pages/MainPage";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
