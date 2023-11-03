import { useHistory } from "react-router-dom";
import "./threadtitle.css";

export function ThreadTitle() {
  const history = useHistory();

  return (
    <h1 className="threadTitle">
      <button onClick={() => history.push("/main")}> Pomadoro App</button>
    </h1>
  );
}
