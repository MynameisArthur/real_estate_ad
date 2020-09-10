import {EstateActionTypes as types} from '../actions/types';
export const dispatchEstateError = (dispatch, err) => {
    return dispatch({
        type: types.ESTATE_ERROR,
        payload: {
            msg: err.response,
            status: err.response,
        },
    });
};
