import axios from 'axios';
import {EstateActionTypes as types} from './types';
import {dispatchError as error} from '../utils/dispatchErrors';
import {setAlert} from './alert';
import {getCurrentProfile} from './profile';
import {showPrompt} from './prompt';

export const getEstates = (page = 1) => async (dispatch) => {
    try {
        const res = await axios.get(`/real_estate_ad/estates?page=${page}`);
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
        // const errors = err.response.data.error.split(',');
        // if (errors) {
        //     errors.forEach((error) =>
        //         dispatch(setAlert(error, 'danger', 3000))
        //     );
        // }
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
        await dispatch(getCurrentProfile());
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
        await dispatch(getCurrentProfile());
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
        return res.data;
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
        return photoId;
    } catch (err) {
        error(dispatch, err);
    }
};

export const deleteEstate = (estateId, source, history) => async (dispatch) => {
    const pattern = /estate\/\w+/gi;
    try {
        await axios.delete(`/real_estate_ad/estates/${estateId}`);
        dispatch({type: types.DELETE_ESTATE});

        if (source === '/dashboard/estates') {
            await dispatch(getCurrentProfile());
            history.push('/');
        } else if (pattern.test(source)) {
            //check if delete is called from EstateDetails component
            await dispatch(getCurrentProfile());
            history.push('/dashboard');
        } else if (source === '/estates') {
            await dispatch(getEstates());
        }

        await dispatch(setAlert('Estate deleted', 'danger', 2000));
    } catch (err) {
        error(dispatch, err);
    }
};
export const selectEstate = (estateId, action = 'delete') => async (
    dispatch
) => {
    await dispatch({type: types.SELECT_ESTATE, payload: estateId});
    dispatch(showPrompt(action, 'estate'));
};
