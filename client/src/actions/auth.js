import axios from 'axios';
import {
    RegisterActionTypes as registerTypes,
    AuthActionTypes as authTypes,
} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';

//Register User
export const register = ({name, email, password}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({name, email, password});
    try {
        const res = await axios.post(
            '/real_estate_ad/auth/register',
            body,
            config
        );
        dispatch({type: registerTypes.REGISTER_SUCCESS, payload: res.data});
    } catch (err) {
        const errors = err.response.data.error.split(',');
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: registerTypes.REGISTER_FAIL,
        });
    }
};

//Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/real_estate_ad/auth/me');
        dispatch({type: authTypes.USER_LOADED, payload: res.data});
    } catch (err) {
        dispatch({type: authTypes.AUTH_ERROR});
    }
};
