import { secondsToMinutes } from "../../utils/react/seconds-to-minutes";
import "./pomodoroTimer.css";

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}
