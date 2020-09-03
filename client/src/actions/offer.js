import axios from 'axios';
import {OfferActionTypes as types} from './types';
import {setAlert} from './alert';

export const getOffersForEstate = () => async (dispatch) => {};

export const addOffer = (estateId, data, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify(data);
    try {
        await axios.post(
            `/real_estate_ad/estates/${estateId}/offers`,
            body,
            config
        );
        dispatch(setAlert('Offer added'));
        history.go(-1);
    } catch (err) {
        dispatch(setAlert(err, 'danger'));
        dispatch({
            type: types.OFFER_ERROR,
            payload: err.msg,
        });
    }
};
