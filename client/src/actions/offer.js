import axios from 'axios';
import {OfferActionTypes as types} from './types';
import {setAlert} from './alert';
import {dispatchError as error} from '../utils/dispatchErrors';

export const modifyOffer = (estateId, data, history, edit) => async (
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify(data);
    let message = 'Offer added';
    try {
        // if edit=false add new offer
        if (!edit) {
            await axios.post(
                `/real_estate_ad/estates/${estateId}/offers`,
                body,
                config
            );
        } else {
            // if edit=true update offer
            await axios.put(`/real_estate_ad/offers/${data._id}`, body, config);
            message = 'Offer updated';
        }
        dispatch(setAlert(message, 'success', 2000));
        history.go(-1);
    } catch (err) {
        dispatch(setAlert(err, 'danger'));
        error(dispatch, err, 'offer');
    }
};

export const getSingleOffer = (offerId) => async (dispatch) => {
    try {
        return await axios.get(`/real_estate_ad/offers/${offerId}`);
    } catch (err) {
        error(dispatch, err, 'offer');
    }
};
export const deleteOffer = (offerId) => async (dispatch) => {
    try {
        await axios.delete(`/real_estate_ad/offers/${offerId}`);
        await dispatch(setAlert('Offer removed', 'danger', 2000));
    } catch (err) {
        error(dispatch, err, 'offer');
    }
};
