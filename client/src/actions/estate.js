import axios from 'axios';
import {EstateActionTypes as types} from './types';
import {dispatchEstateError as error} from '../utils/dispatchEstateError';
import {setAlert} from './alert';

export const getEstates = () => async (dispatch) => {
    try {
        const res = await axios.get('/real_estate_ad/estates');
        dispatch({type: types.GET_ESTATES, payload: res.data});
    } catch (err) {
        error(dispatch, err);
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
        error(dispatch, err);
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
            errors.forEach((error) =>
                dispatch(setAlert(error, 'danger', 3000))
            );
        }
        error(dispatch, err);
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
        dispatch(setAlert('Estate created', 'success', 2000));
        history.push('/dashboard');
    } catch (err) {
        dispatch(setAlert(err, 'danger'));
        error(dispatch, err);
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
        await dispatch(setAlert('Estate updated', 'success', 2000));
        history.go(-1);
    } catch (err) {
        error(dispatch, err);
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
        await dispatch({type: types.UPLOAD_PHOTO, payload: res.data});
        return await axios.get(`/real_estate_ad/estates/${estateId}`);
    } catch (err) {
        error(dispatch, err);
    }
};

export const deletePhoto = (estateId, photoId) => async (dispatch) => {
    try {
        const res = await axios.delete(
            `/real_estate_ad/estates/${estateId}/photo/${photoId}`
        );
        await dispatch({type: types.DELETE_PHOTO, payload: res.data});
        return await axios.get(`/real_estate_ad/estates/${estateId}`);
    } catch (err) {
        error(dispatch, err);
    }
};

export const deleteEstate = (estateId, source, history) => async (dispatch) => {
    try {
        await axios.delete(`/real_estate_ad/estates/${estateId}`);
        dispatch({type: types.DELETE_ESTATE});
        await dispatch(setAlert('Estate deleted', 'danger', 2000));

        if (source === '/dashboard/estates') {
            history.push('/');
        } else if (source === '/estates') {
            dispatch(getEstates());
        }
    } catch (err) {
        error(dispatch, err);
    }
};
