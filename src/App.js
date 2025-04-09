import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [status, setStatus] = useState("未出勤");
  const [time, setTime] = useState("");

  const handleClick = (type) => {
    const now = new Date().toLocaleTimeString();
    if (type === "start") {
      setStatus("出勤");
      setTime(now);
    } else if (type === "end") {
      setStatus("退勤");
      setTime(now);
    } else if (type === "leave") {
      setStatus("早退");
      setTime(now);
    } else if (type === "overtime") {
      setStatus("残業");
      setTime(now);
    }
  };

  return (
    <div className="container">
      <h1>出勤退勤アプリ</h1>
      <p>現在の状態: <strong>{status}</strong></p>
      <p>時間: <strong>{time}</strong></p>
      <div className="buttons">
        <button onClick={() => handleClick("start")}>出勤</button>
        <button onClick={() => handleClick("end")}>退勤</button>
        <button onClick={() => handleClick("leave")}>早退</button>
        <button onClick={() => handleClick("overtime")}>残業</button>
      </div>
    </div>
  );
};

export default App;
