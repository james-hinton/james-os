import { useState, useEffect } from "react";
import "./TimeAndDate.scss";

const TimeAndDate = () => {
  const [currentTime, setCurrentTime] = useState(fetchCurrentTime());
  const [currentDate, setCurrentDate] = useState(fetchCurrentDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(fetchCurrentTime());
      setCurrentDate(fetchCurrentDate());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  function fetchCurrentTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  function fetchCurrentDate() {
    const date = new Date();

    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    const day = date.getDate();

    return `${dayName}, ${monthName} ${day}`;
  }

  return (
    <div className="time-and-date fade-in">
      <div className="time-and-date__date fade-in">{currentDate}</div>
      <div className="time-and-date__time fade-in">{currentTime}</div>
    </div>
  );
};

export default TimeAndDate;
