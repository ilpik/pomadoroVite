import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setTasks } from "../../store/actions/tasksAction";
import { generateId } from "../../utils/react/generateRandomIndex";

interface ITask {
  name: string;
  description: string;
  cycles: number;
}

export function AddTask() {
  const dispatch = useDispatch();

  function onChange(values: ITask) {
    let task = {
      name: values.name,
      description: values.description,
      finished: false,
      cycles: values.cycles ? values.cycles : 4,
      active: false,
      createDate: new Date(),
    };
    dispatch(setTasks(generateId(task)));
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Форма для добавления задач.</h2>

      <Formik
        initialValues={{ name: "", description: "", cycles: 4 }}
        onSubmit={(values, { resetForm }) => {
          onChange(values);
          resetForm();
        }}
      >
        <Form>
          <div>
            <label htmlFor="name">Название</label>
            <Field as="textarea" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="description">Описание</label>
            <Field as="textarea" id="description" name="description" />
          </div>
          <div>
            <label htmlFor="cycles">
              Кол-во циклов необходимое на решение задачи
            </label>
            <Field type="number" id="cycles" name="cycles" />
          </div>
          <button type="submit">Добавить задачу</button>
        </Form>
      </Formik>
    </div>
  );
}
