import { ActionCreator, AnyAction } from "redux";
import { SET_TIMER } from "../store";


export const setTimer: ActionCreator<AnyAction> = (timer) => ({
    type: SET_TIMER,
    timer,
});
