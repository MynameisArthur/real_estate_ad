import {PromptActionTypes as types} from '../actions/types';

const initialState = {show: false, confirm: false, promptMsg: '', type: null};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case types.DISPLAY_PROMPT:
            return {
                ...state,
                show: true,
                confirm: false,
                promptMsg: payload.msg,
                type: payload.type,
            };
        case types.CONFIRM_PROMPT:
            return {
                ...state,
                show: false,
                confirm: true,
                type: null,
            };
        case types.CANCEL_PROMPT:
            return initialState;
        default:
            return state;
    }
}
