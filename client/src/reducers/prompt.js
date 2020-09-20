import {PromptActionTypes as types} from '../actions/types';

const initialState = {show: false, confirm: false, promptMsg: ''};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case types.DISPLAY_PROMPT:
            return {
                ...state,
                ...payload,
            };
        case types.CONFIRM_PROMPT:
            return {
                ...state,
                show: false,
                confirm: true,
            };
        default:
            return state;
    }
}
