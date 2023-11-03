import "./pomodoroTimer.css";

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: string;
}

export function Button(props: Props): JSX.Element {
  const propClassName = props.className === "hidden" ? props.className : "";
  return (
    <button onClick={props.onClick} className={propClassName}>
      {props.text}
    </button>
  );
}
