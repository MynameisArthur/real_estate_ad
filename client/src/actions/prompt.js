import {PromptActionTypes as types} from './types';

export const showPrompt = ({msg}) => (dispatch) => {
    dispatch({type: types.DISPLAY_PROMPT, payload: msg});
};
export const handleDelete = () => {
    setPrompt({...prompt, show: true, promptMsg: 'delete estate'});
};
export const handleConfirm = () => {
    setPrompt({...prompt, confirm: true});
};
export const hidePrompt = () => {
    setPrompt({...prompt, show: false});
};
export const setPrompt = (data) => {
    promptConfig = {...promptConfig, data};
};
