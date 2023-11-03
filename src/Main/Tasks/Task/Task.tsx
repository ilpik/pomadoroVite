import React from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../../store/actions/tasksAction";

interface ITask {
  id: string;
  name: string;
  description: string;
  finished: boolean;
  cycles?: number;
}

export function Task({ id, name, description, finished, cycles }: ITask) {
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTask(
        id,
        e.target.name,
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
    );
  };

  const onDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <>
      <div style={{ textAlign: "center", border: "solid 1px" }}>
        <label>
          Название:
          <input type="text" name="name" value={name} onChange={onChange} />
        </label>
        <hr />
        <label>
          Описание:
          <input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
          ></input>
        </label>
        <hr />

        <label>
          Кол-во циклов:
          <input
            type="number"
            name="cycles"
            value={cycles}
            onChange={onChange}
          ></input>
        </label>
        <hr />

        <label>
          Выполнено:
          <input
            type="checkbox"
            name="finished"
            checked={finished}
            onChange={onChange}
          />
        </label>
        <hr />

        <button onClick={() => onDelete(id)}>Удалить</button>
      </div>
      <hr />
    </>
  );
}
