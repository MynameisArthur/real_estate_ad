import {
    RegisterActionTypes as registerTypes,
    AuthActionTypes as authTypes,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case registerTypes.REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case registerTypes.REGISTER_FAIL:
        case authTypes.AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case authTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        default:
            return state;
    }
}
