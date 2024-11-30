import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const useDiary = (id) => {
  // const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurrentDiaryItem] = useState();
  const nav = useNavigate();

  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDaily = async () => {
      const API = "/api/v1/moods/day";
      try {
        setError(null);
        setData(null);
        setLoading(true);
        const fetchData = await axios.get(API, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer AccessToken",
          },
          params: {
            date: id,
            sort: "lastest",
          },
        });
        setData(fetchData);
        console.log(Data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchDaily();
  }, []);

  // useEffect(() => {
  //   const currentDiaryItem = Data.find(
  //     (item) => String(item.id) === String(id)
  //   );

  //   if (!currentDiaryItem) {
  //     window.alert("존재하지 않는 일기입니다!");
  //     nav("/", { replace: true });
  //   }

  //   setCurrentDiaryItem(currentDiaryItem);
  // }, [id, Data]);

  return curDiaryItem;
};

export default useDiary;
