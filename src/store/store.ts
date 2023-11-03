import { combineReducers } from "redux";
import { TasksState, tasksReducer, tasksState } from "./reducers/tasksReducer";
import { TimerState, timerReducer, timerState } from "./reducers/timerReducer";
import { StatisticsState, statisticsReducer, statisticsState } from "./reducers/statisticsReducer";

export type RootState = {
    tasks: TasksState;
    timer: TimerState;
    statistics: StatisticsState;
};

export const initialState: RootState = {
    tasks: tasksState,
    timer: timerState,
    statistics: statisticsState,
};

export const SET_TASKS = "SET_TASKS";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK"
export const SORT_TASKS = "SORT_TASKS";

export const SET_TIMER = "SET_TIMER";

export const GET_STATISTICS = "GET_STATISTICS";
export const CREATE_STATISTICS = "CREATE_STATISTICS";
export const UPDATE_STATISTICS = "UPDATE_STATISTICS";

export const reducer = combineReducers<RootState>({
    tasks: tasksReducer,
    timer: timerReducer,
    statistics: statisticsReducer
})

