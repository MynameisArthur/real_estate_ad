import {ProfileActionTypes as profileTypes} from '../actions/types';
const initialState = {
    userProfile: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case profileTypes.GET_PROFILE:
            return {
                ...state,
                userProfile: payload,
                loading: false,
            };
        case profileTypes.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case profileTypes.CLEAR_PROFILE:
            return {
                ...state,
                userProfile: null,
                loading: false,
            };
        default:
            return state;
    }
}
