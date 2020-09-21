import {PromptActionTypes as types} from '../actions/types';

const initialState = {show: false, confirm: false, promptMsg: ''};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case types.DISPLAY_PROMPT:
            return {
                ...state,
                show: true,
                promptMsg: payload,
            };
        case types.CONFIRM_PROMPT:
            return {
                ...state,
                show: false,
                confirm: true,
            };
        case types.CANCEL_PROMPT:
            return initialState;
        default:
            return state;
    }
}
