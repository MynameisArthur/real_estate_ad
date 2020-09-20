import {AlertActionTypes as types} from './types';
import {v4 as uuid} from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
    const id = uuid();
    dispatch({
        type: types.SET_ALERT,
        payload: {
            msg,
            alertType,
            id,
        },
    });
    setTimeout(
        () => dispatch({type: types.REMOVE_ALERT, payload: id}),
        timeout
    );
};
