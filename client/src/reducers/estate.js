import {EstateActionTypes as types} from '../actions/types';
const initialState = {
    estates: {},
    estate: null,
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
        case types.GET_SINGLE_ESTATE:
            return {
                ...state,
                estate: payload,
                loading: false,
            };
        case types.UPLOAD_PHOTO:
        case types.DELETE_PHOTO:
            return {
                ...state,
                photos: payload,
            };
        case types.ESTATE_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false,
            };
        default:
            return state;
    }
}
