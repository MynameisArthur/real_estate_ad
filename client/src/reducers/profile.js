import {ProfileActionTypes as profileTypes} from '../actions/types';
const initialState = {
    profile: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case profileTypes.GET_PROFILE:
            return {
                ...state,
                profile: payload,
            };
        case profileTypes.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
