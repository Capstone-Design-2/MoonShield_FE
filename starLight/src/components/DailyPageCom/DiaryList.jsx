import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createdDate - b.createdDate);
      } else {
        return Number(b.createdDate - a.createdDate);
      }
    });
  };

  const sortedData = getSortedDate();

  const isTodayWritten = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return data.some(
      (item) => new Date(item.createdDate).setHours(0, 0, 0, 0) === today
    );
  };

  const todayWritten = isTodayWritten();

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
          disabled={todayWritten}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
