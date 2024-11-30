import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import Viewer from "../components/DailyPageCom/Viewer";

import axios from "axios";
import { useState, useEffect } from "react";

import { getStringedDate } from "../util/get-stringed-date";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  const [Data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const curDiaryItem = useDiary(params.id);
  // const { createdDate, emotionId, Content, HashTag } = curDiaryItem;
  // const title = getStringedDate(new Date(createdDate));

  // if (!curDiaryItem) {
  //   return <div>로딩 중...</div>;
  // }

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

  if (Data.date !== undefined) {
    return (
      <div>
        <Header
          title={`${Data.date.substring(0, 4)}.
              ${Data.date.substring(4, 6)}.
              ${Data.date.substring(6, 8)} 기록`}
          leftChild={
            <Button
              onClick={() => {
                nav(-1);
              }}
              text={"< 뒤로 가기"}
            />
          }
          rightChild={
            <Button
              onClick={() => nav(`/daily/edit/${params.date}`)}
              text={"수정하기"}
            />
          }
        />
        <Viewer
          emotionId={Data.emotionId}
          Content={Data.content}
          hashTag={Data.hashTag}
        />
      </div>
    );
  }
};

export default Diary;
