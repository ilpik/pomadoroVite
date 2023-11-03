import { useEffect, useState, useCallback } from "react";
import { Button } from "./Button";
import { Timer } from "./Timer";
import "./pomodoroTimer.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  createStatistics,
  updateStatistics,
} from "../../store/actions/statisticsAction";
import { RootState } from "../../store/store";
import { secondsToMinutes } from "../../utils/react/seconds-to-minutes";
import { useInterval } from "../../hooks/useInterval";

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}
const today = moment(new Date()).format("DD.MM.YYYY");

export function PomodoroTimer(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const statistics = useSelector((state: RootState) => state.statistics);

  const [mainTime, setMainTime] = useState(props.pomodoroTime); // Время на счетчике (время работы/отдыха)
  const [timeCounting, setTimeCounting] = useState(false); // таймер запущен
  const [working, setWorking] = useState(false); // таймер работы
  const [resting, setResting] = useState(false); // таймер отдыха
  const [paused, setPaused] = useState(false); // на паузе
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true) // кол-во циклов (работы и отдыхов)
  );
  const [stopsCount, setStopsCount] = useState(0);

  const [completedCycles, setCompletedCycles] = useState(0); // кол-во полностью завершенных циклов
  const [workingTime, setWorkingTime] = useState(0); // общее время работы
  const [restingTime, setRestingTime] = useState(0); // общее время отдыха
  const [pauseTime, setPauseTime] = useState(0); // общее время на паузе
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0); // кол-во завершенных циклов работы(помадоров) = 1 цикл работы

  useEffect(() => {
    if (
      statistics.data.length === 0 ||
      statistics.data.find((t) => t.date !== today)
    ) {
      dispatch(createStatistics());
    }
  }, []);

  const Test1 = () => {
    console.log(statistics);
  };

  useEffect(() => {
    dispatch(
      updateStatistics(today, {
        workingTime: workingTime,
        restingTime: restingTime,
        numberOfPomodoros: numberOfPomodoros,
        completedCycles: completedCycles,
        pauseTime: pauseTime,
        stopsCount: stopsCount,
      })
    );
  }, [
    today,
    workingTime,
    restingTime,
    numberOfPomodoros,
    pauseTime,
    completedCycles,
    stopsCount,
  ]);

  useInterval(
    () => {
      if (paused) {
        setPauseTime(pauseTime + 1);
      } else {
        setMainTime(mainTime - 1);
        if (working) setWorkingTime(workingTime + 1);
        if (resting) setRestingTime(restingTime + 1);
      }
    },
    timeCounting ? 1000 : null
    // timeCounting ? 10 : null // ускорить
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setPaused(false);
    setMainTime(props.pomodoroTime);
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTime,
  ]);

  const configurePause = useCallback(() => {
    setPaused(!paused);
  }, [paused, setPaused]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);
      setPaused(false);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ]
  );

  const configureStop = () => {
    setTimeCounting(false);
    setWorking(false);
    setResting(false);
    setPaused(false);

    setCyclesQtdManager(
      new Array(props.cycles - 1).fill(true) // кол-во циклов (работы и отдыхов)
    );
    setMainTime(props.pomodoroTime);
    setStopsCount(stopsCount + 1);
  };

  useEffect(() => {
    // if (working) document.body.classList.add("working");
    // if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtdManager,
    configureWork,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <Button text={"Вывести статистику"} onClick={() => Test1()} />

      <h2>{working ? "Работаете" : "Отдыхаете"}</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Работать" onClick={() => configureWork()} />
        <Button text="Отдыхать" onClick={() => configureRest(false)} />
        <Button
          className={!timeCounting ? "hidden" : ""}
          text={!paused ? "Пауза" : "Продолжить"}
          onClick={() => configurePause()}
        />
      </div>
      <div className="controls">
        <Button
          text={"Стоп"}
          className={!timeCounting ? "hidden" : ""}
          onClick={() => configureStop()}
        />
        <Button
          text={"+10"}
          // className={!working && !resting ? "hidden" : ""}
          // className={!timeCounting ? "hidden" : ""}
          onClick={() => setMainTime(mainTime + 10)}
        />
        <Button
          text={"Пропустить"}
          // className={!timeCounting ? "hidden" : ""}
          onClick={() => configureWork()}
        />
      </div>

      <div className="details">
        <p>
          <i>Один законченный цикл состоит из четырёх законченных Помидоров.</i>
        </p>
        <br />
        <p>Количество готовых помидоров: {numberOfPomodoros}</p>
        <p>Количество законченных циклов:{completedCycles}</p>
        <p>время работы: {secondsToMinutes(workingTime)}</p>
        <p>время отдыха: {secondsToMinutes(restingTime)}</p>
        <p>время на паузе: {secondsToMinutes(pauseTime)}</p>
      </div>
    </div>
  );
}
