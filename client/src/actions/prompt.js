import {PromptActionTypes as types} from './types';

export const showPrompt = (msg) => async (dispatch) => {
    await dispatch({type: types.DISPLAY_PROMPT, payload: msg});
};

export const confirmPrompt = () => async (dispatch) => {
    await dispatch({type: types.CONFIRM_PROMPT});
};
export const cancelPrompt = () => async (dispatch) => {
    await dispatch({type: types.CANCEL_PROMPT});
};
