import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import Editor from "../components/DailyPageCom/Editor";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.Content,
      input.HashTag
    );
    nav("/daily", { replace: true });
  };

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
