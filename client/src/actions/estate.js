import axios from 'axios';
import {EstateActionTypes as types} from './types';
import {setAlert} from './alert';

export const getEstates = () => async (dispatch) => {
    try {
        const res = await axios.get('/real_estate_ad/estates');
        dispatch({type: types.GET_ESTATES, payload: res.data});
    } catch (err) {
        const errors = err.response.data.error.split(',');
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: types.ESTATE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
