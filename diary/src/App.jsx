import "./App.css";
import { createContext, useReducer, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-11-19").getTime(),
    emotionId: 1,
    eventContent: "일 때문에",
    feelingContent: "힘들어",
  },
  {
    id: 2,
    createdDate: new Date("2024-10-20").getTime(),
    emotionId: 2,
    eventContent: "그냥",
    feelingContent: "우울해",
  },
  {
    id: 3,
    createdDate: new Date("2024-12-20").getTime(),
    emotionId: 3,
    eventContent: "어지러워서",
    feelingContent: "짜증나",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 1. "/MTpage" : 모든 일기를 조회하는 Home 페이지
// 2. "/MTpage/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/MTpage/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

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
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
