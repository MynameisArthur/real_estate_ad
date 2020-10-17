import {OfferActionTypes as types} from '../actions/types';
const initialState = {
    selectedOffer: null,
    offer: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case types.OFFER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case types.DELETE_OFFER:
            return {
                ...state,
                selectedOffer: payload,
            };
        case types.SELECT_OFFER:
            return {
                ...state,
                selectedOffer: payload,
            };
        case types.DESELECT_OFFER:
            return {
                ...state,
                selectedOffer: null,
            };
        default:
            return state;
    }
}
