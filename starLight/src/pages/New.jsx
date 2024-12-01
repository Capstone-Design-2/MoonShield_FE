import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import Editor from "../components/DailyPageCom/Editor";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (input) => {
    console.log(input);
    const API = "http://www.0429.site:8081/api/v1/moods";
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(
        API,
        {
          emotionId: input.emotionId,
          content: input.Content, // 올바른 키 사용
          hashTag: input.HashTag.join(","), // 배열로 전달
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer AccessToken", // 토큰 값이 유효해야 함
          },
        }
      );

      console.log(response.data);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);

    // // 웹 스토리지 상에서 테스트 코드
    // onCreate(
    //   input.createdDate.getTime(),
    //   input.emotionId,
    //   input.Content,
    //   input.HashTag
    // );
    nav("/daily", { replace: true });
  };

  if (loading) return <div>로딩중..</div>; // 로딩 상태가 활성화 됐을때 렌더링 될 문구
  if (error) return <div>에러가 발생했습니다</div>; // 에러 발생시 렌더링 될 문구

  return (
    <div>
      <Header
        title={"새 기록 작성"}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={" < 뒤로가기"}
          />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
