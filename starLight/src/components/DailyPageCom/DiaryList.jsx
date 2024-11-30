import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data, Disabled }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.date - b.date);
      } else {
        return Number(b.date - a.date);
      }
    });
  };

  const sortedData = getSortedDate();

  const isTodayWrittenInData = () => {
    const todayString = `${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${String(new Date().getDate()).padStart(2, "0")}`;

    return data.some((item) => item.date === todayString);
  };

  const buttonDisabled = isTodayWrittenInData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/daily/new")}
          text={"작성하기"}
          type={"POSITIVE"}
          disabled={Disabled ? Disabled : buttonDisabled}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
