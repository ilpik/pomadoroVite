import { Reducer } from "redux";
import { CREATE_STATISTICS, GET_STATISTICS, UPDATE_STATISTICS } from "../store";
import moment from "moment";

interface IStatisticsData {
    statistics: {
        workingTime: number; // время в режиме работы
        restingTime: number; // время в режиме отдыха
        numberOfPomodoros: number; // кол-во помидоров
        completedCycles: number, // кол-во завершенных циклов
        pauseTime: number; // время на паузе
        stopsCount: number; // кол-во остановок   
    },
    date: string;
}

export type StatisticsState = {
    data: Array<IStatisticsData>;
}

export const statisticsState: StatisticsState = {
    data: [
        {
            date: "31.10.2022",
            statistics: {
                workingTime: 20,
                restingTime: 20,
                numberOfPomodoros: 2,
                completedCycles: 20,
                pauseTime: 20,
                stopsCount: 20
            }
        }, {
            date: "30.10.2022",
            statistics: {
                workingTime: 10,
                restingTime: 10,
                numberOfPomodoros: 1,
                completedCycles: 10,
                pauseTime: 10,
                stopsCount: 10
            }
        }, {
            date: "29.10.2022",
            statistics: {
                workingTime: 30,
                restingTime: 30,
                numberOfPomodoros: 3,
                completedCycles: 30,
                pauseTime: 30,
                stopsCount: 30
            }
        }, {
            date: "28.10.2022",
            statistics: {
                workingTime: 43,
                restingTime: 40,
                numberOfPomodoros: 4,
                completedCycles: 40,
                pauseTime: 40,
                stopsCount: 40
            }
        }
    ]
};

export const statisticsReducer: Reducer<StatisticsState> = (state = statisticsState, action) => {
    switch (action.type) {
        case CREATE_STATISTICS:
            return {
                ...state,
                data: [...state.data, {
                    date: moment(new Date()).format('DD.MM.YYYY'),
                    statistics: {
                        workingTime: 0,
                        restingTime: 0,
                        numberOfPomodoros: 0,
                        completedCycles: 0,
                        pauseTime: 0,
                        stopsCount: 0,
                    }
                }]
            };
        case UPDATE_STATISTICS:
            return {
                ...state,
                data: state.data.map((t) => t.date === action.date ? {
                    ...t, statistics: action.statistics
                } : t)
            };
        case GET_STATISTICS:
            return {
                data: action.statistics,
            };
        default:
            return state;
    }
};