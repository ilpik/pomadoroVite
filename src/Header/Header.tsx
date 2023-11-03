import "./header.css";
import { ThreadTitle } from "./ThreadTitle";
import { useHistory } from "react-router-dom";

export function Header() {
  const history = useHistory();

  return (
    <header className="header">
      <ThreadTitle />
      <button onClick={() => history.push("/statistics")}>Statistics</button>
    </header>
  );
}
