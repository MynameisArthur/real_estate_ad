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
        const offer = await axios.post(
            `/real_estate_ad/estates/${estateId}/offers`,
            body,
            config
        );
        dispatch(setAlert('Offer added'));
        history.push('/estates');
    } catch (err) {
        dispatch(setAlert(err, 'danger'));
        dispatch({
            type: types.OFFER_ERROR,
            payload: err.msg,
        });
    }
};
