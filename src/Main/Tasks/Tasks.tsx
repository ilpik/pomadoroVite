import { Task } from "./Task";
import { Button } from "../Timer/Button";
import { useDispatch, useSelector } from "react-redux";
import { sortTasks } from "../../store/actions/tasksAction";
import { RootState } from "../../store/store";

export function Tasks() {
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.tasks.data);

  const sortList = () => {
    dispatch(sortTasks(tasks));
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>Список задач с возможностью редактирования.</h2>
      </div>
      <div style={{ backgroundColor: "rgb(202 255 220)" }}>
        <h3>Текущая задача</h3>
        {tasks &&
          tasks.map((task) => {
            if (task.active) {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  description={task.description}
                  finished={task.finished}
                  cycles={task.cycles ? task.cycles : undefined}
                />
              );
            }
          })}
      </div>
      <div style={{ backgroundColor: "rgb(231 231 231)" }}>
        <Button text={"Сортировать по названию"} onClick={() => sortList()} />
        {tasks &&
          tasks.map((task) => {
            if (!task.active) {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  description={task.description}
                  finished={task.finished}
                  cycles={task.cycles ? task.cycles : undefined}
                />
              );
            }
          })}
      </div>
    </>
  );
}
