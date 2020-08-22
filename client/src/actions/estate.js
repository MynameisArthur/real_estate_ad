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

export const getEstate = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/real_estate_ad/estates/${id}`);
        dispatch({type: types.GET_SINGLE_ESTATE, payload: res.data});
        return res;
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

export const submitEstate = (data, history, edit = false) => async (
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const estate = data;
    estate.features = estate.features.trim().split(',');
    const body = JSON.stringify(estate);
    try {
        await axios.post('/real_estate_ad/estates', body, config);
        dispatch(setAlert(edit ? 'Estate updated' : 'Estate created'));
        if (!edit) {
            // dispatch({type: types.ADD_ESTATE, payload: res.data});
            history.push('/dashboard');
        }
        // dispatch({type: types.EDIT_ESTATE, payload: res.data});
    } catch (err) {
        dispatch(setAlert(err, 'danger'));
        dispatch({
            type: types.ESTATE_ERROR,
            payload: err,
        });
    }
};

export const uploadPhoto = (estateId, file) => async (dispatch) => {
    try {
        const res = await axios.put(
            `/real_estate_ad/estates/${estateId}/photo`,
            file
        );
        dispatch({type: types.UPLOAD_PHOTO, payload: res.data});
    } catch (err) {
        dispatch({
            type: types.ESTATE_ERROR,
        });
    }
};
