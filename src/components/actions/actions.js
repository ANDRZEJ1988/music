import {GET_LIST, SET_INFO, SET_TRACK} from "./actions-type";

export const getListAction = (list) => {
    return ({
        type: GET_LIST,
        payload: list
    })
};
export const setInfoAction = (info) => {
    return ({
        type: SET_INFO,
        payload: info
    })
};
export const setTrackAction = (track) => {
    return ({
        type: SET_TRACK,
        payload: track
    })
};

