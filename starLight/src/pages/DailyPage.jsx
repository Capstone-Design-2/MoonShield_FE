import { useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { DiaryStateContext } from "../App";

import axios from "axios";

import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import DiaryList from "../components/DailyPageCom/DiaryList";
import Customcalendar from "../components/DailyPageCom/Customcalendar";

const getMonthlyData = (date, data) => {
  const beginTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const data = useContext(DiaryStateContext);
  const [pivotdate, setPivottDate] = useState(new Date());

  const fetchMonthlyData = async () => {
    const API = "http://www.0429.site:8081/api/v1/moods/month";
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
          date: `${pivotdate.getFullYear()}${String(
            pivotdate.getMonth() + 1
          ).padStart(2, "0")}`,
          sort: "lastest",
          page: 1,
          limit: 10,
        },
      });

      setData(fetchData.data.data.responses);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMonthlyData();
  }, [pivotdate]);

  const onIncreasedMonth = () => {
    if (pivotdate.getMonth() + 1 === new Date().getMonth() + 1) {
      return;
    } else {
      setPivottDate(
        new Date(pivotdate.getFullYear(), pivotdate.getMonth() + 1)
      );
    }
  };

  const onDecreasedMonth = () => {
    setPivottDate(new Date(pivotdate.getFullYear(), pivotdate.getMonth() - 1));
  };

  const isSameMonthAsToday = () => {
    const today = new Date();
    return (
      pivotdate.getFullYear() === today.getFullYear() &&
      pivotdate.getMonth() === today.getMonth()
    );
  };

  const monthlyData = getMonthlyData(pivotdate, data);
  const Disabled = isSameMonthAsToday();

  if (loading) return <div>로딩중..</div>; // 로딩 상태가 활성화 됐을때 렌더링 될 문구
  if (error) return <div>에러가 발생했습니다</div>; // 에러 발생시 렌더링 될 문구
  if (!Data) return null; // users 값이 없을 때에는 null 을 보여주도록 처리

  return (
    <div>
      <Header
        title={`${pivotdate.getFullYear()}년 ${pivotdate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreasedMonth} />}
        rightChild={<Button text={">"} onClick={onIncreasedMonth} />}
      />
      <Customcalendar records={Data} pivotdate={pivotdate}></Customcalendar>
      <DiaryList data={Data} Disabled={!Disabled} />
    </div>
  );
};

export default Home;
