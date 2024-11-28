import { useParams, useNavigate, replace } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

import useDiary from "../hooks/useDiary";

import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import Editor from "../components/DailyPageCom/Editor";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠나요? 복구할 수 없습니다.")) {
      onDelete(params.id);
      nav("/daily", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.Content,
        input.HashTag
      );
      nav("/daily", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
