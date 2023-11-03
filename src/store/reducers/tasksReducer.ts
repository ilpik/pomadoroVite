import { Reducer } from "redux";
import { DELETE_TASK, SET_TASKS, SORT_TASKS, UPDATE_TASK } from "../store";

interface ITaskData {
    id: string;
    name: string;
    description: string;
    finished: boolean;
    cycles: number;
    active: boolean;
    createDate: Date
}

export type TasksState = {
    data: Array<ITaskData>;
}

export const tasksState: TasksState = {
    data: [{ id: '1', name: 'Первая задача', description: 'Описание Первой задачи', finished: true, cycles: 4, active: false, createDate: new Date() },
    { id: '2', name: 'Вторая задача', description: 'Описание Второй задачи', finished: false, cycles: 5, active: true, createDate: new Date() }]
};

export const tasksReducer: Reducer<TasksState> = (state = tasksState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                data: [...state.data, action.tasks],
            };
        case SORT_TASKS:
            state.data.sort((n1, n2) => {
                if (n1.name.toLocaleUpperCase() < n2.name.toLocaleUpperCase()) {
                    return 1;
                }
                if (n1.name.toLocaleUpperCase() > n2.name.toLocaleUpperCase()) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                data: [...state.data].sort((n1, n2) => {
                    if (n1.name.toLocaleUpperCase() > n2.name.toLocaleUpperCase()) {
                        return 1;
                    }
                    if (n1.name.toLocaleUpperCase() < n2.name.toLocaleUpperCase()) {
                        return -1;
                    }
                    return 0;
                })
            }

        case UPDATE_TASK:
            const updatedState = state.data.map((t) => {
                if (t.id === action.id) {
                    switch (action.fieldName) {
                        case 'name':
                            t.name = action.value;
                            break;
                        case 'description':
                            t.description = action.value;
                            break;
                        case 'finished':
                            t.finished = action.value;
                            break;
                        case 'cycles':
                            t.cycles = action.value;
                            break;
                        default:
                            break
                    }

                    return t;
                }
                else { return t }
            });
            return {
                data: updatedState
            };
        case DELETE_TASK:
            return {
                ...state,
                data: state.data.filter((t) => { return t.id !== action.id })
            };
        default:
            return state;
    }
};