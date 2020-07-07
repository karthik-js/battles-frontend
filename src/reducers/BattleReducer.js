import {
    SAVE_BATTLES,
    ADD_PARAMS,
    SEARCH_API_INTIATE,
    DELETE_PARAM,
} from '../actions/constants';
import omit from 'lodash/omit';

const initialState = {
    battles: [],
    params: {},
    searching: false,
};

const addParams = (state, payload) => {
    return {
        ...state,
        params: {
            ...state.params,
            ...payload,
        },
    };
};

const saveBattles = (state, payload) => {
    return {
        ...state,
        battles: [...payload],
        searching: false,
    };
};

const deleteParam = (state, key) => {
    return {
        ...state,
        params: {
            ...omit(state.params, [key]),
        },
    };
};

export const battleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_API_INTIATE:
            return {
                ...state,
                searching: true,
            };
        case SAVE_BATTLES:
            return saveBattles(state, action.payload);
        case ADD_PARAMS:
            return addParams(state, action.payload);
        case DELETE_PARAM:
            return deleteParam(state, action.payload);
        default:
            return state;
    }
};
