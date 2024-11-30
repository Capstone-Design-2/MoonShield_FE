import React, { useState } from "react";
import "./Customcalendar.css";
import { getStringedDate } from "../../util/get-stringed-date";

const Customcalendar = ({ records = [] }) => {
  // 캘린더에 표시할 일수 (1일부터 32일까지)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 각 날짜의 색상을 결정하는 함수
  const getColorForDay = (emotionId) => {
    if (emotionId == 1) {
      return "#64c864";
    } else if (emotionId == 2) {
      return "#9dd772";
    } else if (emotionId == 3) {
      return "#fdce17";
    } else if (emotionId == 4) {
      return "#fd8446";
    } else if (emotionId == 5) {
      return "#fd565f";
    } else {
      return "#ffffff";
    }
  };

  return (
    <div className="calendar-grid">
      {days.map((day) => {
        const recordForDay = records.find((record) => {
          const recordDate = record.date.substring(6, 8); // '30'
          return recordDate === String(day).padStart(2, "0"); // day를 두 자릿수 문자열로 맞추어 비교
        });

        return (
          <div
            key={day}
            className="calendar-cell"
            style={{
              backgroundColor: recordForDay
                ? getColorForDay(recordForDay.emotionId) // 기록이 있으면 색상 결정
                : "#ffffff", // 기록이 없으면 기본 배경색
            }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default Customcalendar;
