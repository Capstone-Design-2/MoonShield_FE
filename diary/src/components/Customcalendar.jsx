import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Customcalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar />
    </div>
  );
};

export default Customcalendar;
