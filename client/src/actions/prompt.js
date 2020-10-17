import {PromptActionTypes as types} from './types';

const deselectResource = (type, dispatch) => {
    switch (type) {
        case 'estate':
            return dispatch({type: 'DESELECT_ESTATE'});
        case 'offer':
            return dispatch({type: 'DESELECT_OFFER'});
        case 'comment':
            return dispatch({type: 'DESELECT_COMMENT'});
    }
};

export const showPrompt = (msg, type) => async (dispatch) => {
    await dispatch({type: types.DISPLAY_PROMPT, payload: {msg, type}});
};

export const confirmPrompt = (type) => async (dispatch) => {
    await dispatch({type: types.CONFIRM_PROMPT});
    deselectResource(type, dispatch);
};
export const cancelPrompt = (type) => async (dispatch) => {
    await dispatch({type: types.CANCEL_PROMPT});
    deselectResource(type, dispatch);
};
