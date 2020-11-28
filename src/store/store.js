import {createStore} from "redux";

const initialState = {
    list: [],
    info: [],
    track:[]
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST':
            return {...state, list: action.payload};
        case 'SELECT_ARTIST':
            return {...state, selectedArtist: action.payload};
        case 'SET_INFO':
            return {...state, info: action.payload};
            case 'SET_TRACK':
            return {...state, track: action.payload};

        default:
            return state;
    }
};
export const store = createStore(reducer);
