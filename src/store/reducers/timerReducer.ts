import { Reducer } from "redux";
import { SET_TIMER } from "../store";

interface ITimerData {
    pomodoroTime: number,
    shortRestTime: number,
    longRestTime: number,
    cycles: number
}

export type TimerState = {
    data: ITimerData;
}

export const timerState: TimerState = {
    data: {
        pomodoroTime: 30,
        shortRestTime: 5,
        longRestTime: 10,
        cycles: 4
    }
};

export const timerReducer: Reducer<TimerState> = (state = timerState, action) => {
    switch (action.type) {
        case SET_TIMER:
            return {
                data: action.timer,
            };
        default:
            return state;
    }
};