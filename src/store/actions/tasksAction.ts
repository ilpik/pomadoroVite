import { ActionCreator, AnyAction } from "redux";
import { DELETE_TASK, SET_TASKS, SORT_TASKS, UPDATE_TASK } from "../store";


export const setTasks: ActionCreator<AnyAction> = (tasks) => ({
    type: SET_TASKS,
    tasks,
});


export const sortTasks: ActionCreator<AnyAction> = (tasks) => ({
    type: SORT_TASKS,
    tasks
});


export const updateTask: ActionCreator<AnyAction> = (id, fieldName: string, value) => ({
    type: UPDATE_TASK,
    id, fieldName, value
});


export const deleteTask: ActionCreator<AnyAction> = (id) => ({
    type: DELETE_TASK,
    id
});

