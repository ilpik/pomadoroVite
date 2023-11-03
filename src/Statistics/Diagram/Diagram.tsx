import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { secondsToMinutes } from "../../utils/react/seconds-to-minutes";
import moment from "moment";

export function Diagram() {
  const tasks = useSelector((state: RootState) => state.statistics.data);
  const [diagramData, setDiagramData] = useState([{}]);

  const today = moment(new Date()).format("DD.MM.YYYY");

  const [pauseTime, setPauseTime] = useState(0);
  const [stopsCount, setStopsCount] = useState(0);
  const [focus, setFocus] = useState(0);
  const [todayStat, setTodayStat] = useState({});

  useEffect(() => {
    if (tasks.length > 0) {
      let tempPauseTime = tasks.reduce((accumulator, t) => {
        return accumulator + t.statistics.pauseTime;
      }, 0);

      let tempStopsCount = tasks.reduce((accumulator, t) => {
        return accumulator + t.statistics.stopsCount;
      }, 0);

      let totalTime = tasks.reduce((accumulator, t) => {
        return (
          accumulator +
          t.statistics.workingTime +
          t.statistics.restingTime +
          t.statistics.pauseTime
        );
      }, 0);

      let tempFocus = tasks.reduce((accumulator, t) => {
        return (
          accumulator + t.statistics.workingTime + t.statistics.restingTime
        );
      }, 0);

      let templist = tasks.map((t) => {
        return {
          date: t.date,
          fullTime: t.statistics.workingTime + t.statistics.restingTime,
          pauseTime: t.statistics.pauseTime,
        };
      });

      let tempTodayStat = tasks.filter((t) => t.date === today);
      console.log(tempTodayStat);

      console.log(totalTime, tempFocus);
      setPauseTime(tempPauseTime);
      setDiagramData(templist);
      setStopsCount(tempStopsCount);
      setFocus(totalTime / tempFocus);
      setTodayStat(tempTodayStat);
    }
  }, [tasks]);

  return (
    <div>
      <div>
        <h3>Diagram</h3>
        <BarChart
          width={500}
          height={300}
          data={diagramData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="fullTime"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </div>
      <div>
        <h2>Статистика за сегодня</h2>
        {Object.keys(todayStat).length !== 0 && (
          <div>
            <h3>Время работы: {} </h3>
            <h3>Время отдыха: {}</h3>
            <h3>Кол-во помадоров: {} </h3>
          </div>
        )}
        {Object.keys(todayStat).length === 0 && <h3>Отсутствует</h3>}
        <hr />
      </div>
      <div>
        <h3>Время на паузе : {secondsToMinutes(pauseTime)} </h3>
        <h3>Фокус : {focus.toFixed(2)}</h3>
        <h3>Кол-во остановок : {stopsCount} </h3>
      </div>
    </div>
  );
}
