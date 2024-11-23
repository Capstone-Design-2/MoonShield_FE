import "./App.css";
import ChatPage from "./pages/ChatPage";
import MainPage from "./pages/MainPage";
import DailyPage from "./pages/DailyPage"; // Home
import ChallengePage from "./pages/ChallengePage";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";

import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import BottomNav from "./components/BottomNav";

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
export const ChallengeContext = createContext();

function App() {
  const [isloading, setIsLoading] = useState(true);

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });

    setIsLoading(false);
  }, []);

  // 새로운 기록 추가
  const onCreate = (createdDate, emotionId, eventContent, feelingContent) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        eventContent,
        feelingContent,
      },
    });
  };

  // 기존 기록 수정
  const onUpdate = (
    id,
    createdDate,
    emotionId,
    eventContent,
    feelingContent
  ) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        eventContent,
        feelingContent,
      },
    });
  };

  // 기존 기록 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isloading) {
    return <div>Loading 중...</div>;
  }

  // Challenge 관련 아이템
  const challengeMission = {
    Mission1: "밖에 나가서 신선한 공기 마시기",
    Mission2: "친한 친구에게 안부 전화 하기",
    Mission3: "New Challenge",
  };

  const pointsOfMission = {
    p1: 10,
    p2: 15,
    p3: 20,
  };

  const challengeId = {
    Id1: 1,
    Id2: 2,
    Id3: 3,
  };

  let sumOfpoint = 0;

  const pointUpdate = (sumOfpoint) => {
    dispatch(sumOfpoint);
  };

  const addPoint = (point) => {
    sumOfpoint += point;
    console.log(`{2 : ${sumOfpoint}}`);
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <ChallengeContext.Provider
            value={{
              challengeMission,
              challengeId,
              pointsOfMission,
              sumOfpoint,
              addPoint,
            }}
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/chat" element={<ChatPage />} />

              <Route path="/daily" element={<DailyPage />}></Route>
              <Route path="/daily/new" element={<New />}></Route>
              <Route path="/daily/diary/:id" element={<Diary />}></Route>
              <Route path="/daily/edit/:id" element={<Edit />}></Route>

              <Route path="/challenge" element={<ChallengePage />}></Route>

              <Route path="*" element={<Notfound />}></Route>
            </Routes>
            <BottomNav />
          </ChallengeContext.Provider>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
