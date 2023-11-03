import { ActionCreator, AnyAction } from "redux";
import { CREATE_STATISTICS, GET_STATISTICS, UPDATE_STATISTICS } from "../store";

export const getStatistics: ActionCreator<AnyAction> = (statistics) => ({
    type: GET_STATISTICS,
    statistics
})

export const createStatistics: ActionCreator<AnyAction> = () => ({
    type: CREATE_STATISTICS,
})

export const updateStatistics: ActionCreator<AnyAction> = (date, statistics) => ({
    type: UPDATE_STATISTICS,
    date, statistics
})
