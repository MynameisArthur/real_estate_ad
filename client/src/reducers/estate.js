import {EstateActionTypes as types} from '../actions/types';
const initialState = {
    selectedEstate: null,
    estates: [],
    errors: null,
    loading: true,
    photos: [],
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case types.GET_ESTATES:
            return {
                ...state,
                estates: payload,
                loading: false,
            };
        case types.DELETE_ESTATE:
            return {
                ...state,
                selectedEstate: null,
            };
        case types.GET_SINGLE_ESTATE:
            return {
                ...state,
                loading: false,
            };
        case types.UPLOAD_PHOTO:
        case types.DELETE_PHOTO:
            return {
                ...state,
                photos: payload,
            };
        case types.SELECT_ESTATE:
            return {
                ...state,
                selectedEstate: payload,
            };
        case types.ESTATE_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false,
            };
        case types.SET_USER_ESTATES:
            return {
                ...state,
                userEstates: payload,
            };

        default:
            return state;
    }
}
