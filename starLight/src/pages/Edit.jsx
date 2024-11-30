import { useParams, useNavigate, replace } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

import axios from "axios";

// import useDiary from "../hooks/useDiary";
import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import Editor from "../components/DailyPageCom/Editor";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  // const curDiaryItem = useDiary(params);

  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDaily = async () => {
      const API = "http://www.0429.site:8081/api/v1/moods/day";
      try {
        setError(null);
        setLoading(true);
        const responses = await axios.get(API, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer AccessToken",
          },
          params: {
            date: params.date,
            sort: "lastest",
          },
        });
        setData(responses.data.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchDaily();
  }, [params]);

  const onClickDelete = () => {
    const fetchDaily = async () => {
      const API = `http://www.0429.site:8081/api/v1/moods/${Data.id}`;
      try {
        setError(null);
        setLoading(true);
        const responses = await axios.delete(API, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer AccessToken",
          },
        });
        console.log(responses);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchDaily();

    if (window.confirm("정말 삭제하시겠나요? 복구할 수 없습니다.")) {
      onDelete(params.id);
      nav("/daily", { replace: true });
    }
  };

  const onSubmit = (input) => {
    const fetchDaily = async () => {
      const API = `http://www.0429.site:8081/api/v1/moods/${input.id}`;
      try {
        setError(null);
        setLoading(true);
        const responses = await axios.put(
          API,
          {
            emotionId: input.emotionId,
            content: input.Content,
            hashTag: input.HashTag.join(","),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer AccessToken",
            },
          }
        );
        console.log(responses);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchDaily();

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

  if (Data.date !== undefined) {
    return (
      <div>
        <Header
          title={"일기 수정"}
          leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
          rightChild={
            <Button
              onClick={onClickDelete}
              text={"삭제하기"}
              type={"NEGATIVE"}
            />
          }
        />
        <Editor initData={Data} onSubmit={onSubmit} />
      </div>
    );
  }
};

export default Edit;
