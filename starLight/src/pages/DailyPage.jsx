import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";

import { DiaryStateContext } from "../App";

import Header from "../components/DailyPageCom/Header";
import Button from "../components/DailyPageCom/Button";
import DiaryList from "../components/DailyPageCom/DiaryList";

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
  const data = useContext(DiaryStateContext);
  const [pivotdate, setPivottDate] = useState(new Date());

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

  const monthlyData = getMonthlyData(pivotdate, data);

  return (
    <div>
      <Header
        title={`${pivotdate.getFullYear()}년 ${pivotdate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreasedMonth} />}
        rightChild={<Button text={">"} onClick={onIncreasedMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
