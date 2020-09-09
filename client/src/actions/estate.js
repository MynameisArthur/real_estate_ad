import axios from 'axios';
import {EstateActionTypes as types} from './types';
import {setAlert} from './alert';

export const getEstates = () => async (dispatch) => {
    try {
        const res = await axios.get('/real_estate_ad/estates');
        dispatch({type: types.GET_ESTATES, payload: res.data});
    } catch (err) {
        dispatch({
            type: types.ESTATE_ERROR,
            payload: {
                msg: err.response,
                status: err.response,
            },
        });
    }
};

export const findEstatesInRadius = (data) => async (dispatch) => {
    const {zipcode, distance, unit} = data;
    try {
        const res = await axios.get(
            `/real_estate_ad/estates/radius/${zipcode}/${distance}/${unit}`
        );
        dispatch({type: types.GET_ESTATES, payload: res.data});
    } catch (err) {
        dispatch({
            type: types.ESTATE_ERROR,
            payload: {
                msg: err.response,
                status: err.response,
            },
        });
    }
};

export const getEstate = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/real_estate_ad/estates/${id}`);
        dispatch({type: types.GET_SINGLE_ESTATE, payload: res.data});
        return res.data;
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

export const addEstate = (data, history) => async (dispatch) => {
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
        // dispatch(setAlert('Estate created', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch(setAlert(err, 'danger'));
        dispatch({
            type: types.ESTATE_ERROR,
            payload: err,
        });
    }
};

export const updateEstate = (data, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const estate = data;
    estate.features = estate.features.trim().split(',');
    const body = JSON.stringify(estate);
    try {
        await axios.put(`/real_estate_ad/estates/${estate.id}`, body, config);
        // dispatch(setAlert('Estate updated', 'success'));
        history.go(-1);
    } catch (err) {
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
            file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        dispatch({type: types.UPLOAD_PHOTO, payload: res.data});
    } catch (err) {
        dispatch({
            type: types.ESTATE_ERROR,
        });
    }
};
export const deleteEstate = (estateId, source, history) => async (dispatch) => {
    try {
        await axios.delete(`/real_estate_ad/estates/${estateId}`);
        dispatch({type: types.DELETE_ESTATE});
        // dispatch(setAlert('Estate deleted','success'));
        if (source === '/dashboard') {
            history.push('/');
        } else if (source === '/estates') {
            dispatch(getEstates());
        }
    } catch (err) {
        dispatch({
            type: types.ESTATE_ERROR,
        });
    }
};
