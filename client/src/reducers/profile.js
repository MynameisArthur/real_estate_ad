import {ProfileActionTypes as types} from '../actions/types';
const initialState = {
    userProfile: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case types.GET_PROFILE:
            return {
                ...state,
                userProfile: payload,
                loading: false,
            };
        case types.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case types.CLEAR_PROFILE:
            return {
                ...state,
                userProfile: null,
                loading: false,
            };
        default:
            return state;
    }
}
