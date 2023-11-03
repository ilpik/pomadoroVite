import { AddTask } from "./AddTask/AddTask";
import { Tasks } from "./Tasks";
import { useSelector } from "react-redux";
import { PomodoroTimer } from "./Timer";
import "./main.css";
import { RootState } from "../store/store";

export function Main() {
  const timer = useSelector((state: RootState) => state.timer.data);

  return (
    <div className="wrapper">
      <div className="box1">
        <div style={{ textAlign: "center" }}>
          <h2>Краткая инструкция о работе с приложением.</h2>
        </div>
      </div>
      <div className="box2">
        <AddTask />
      </div>

      <div className="box3">
        <PomodoroTimer
          pomodoroTime={timer.pomodoroTime}
          shortRestTime={timer.shortRestTime}
          longRestTime={timer.longRestTime}
          cycles={timer.cycles}
        />
      </div>

      <div className="box4">
        <Tasks />
      </div>
    </div>
  );
}
