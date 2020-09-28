import axios from 'axios';
import {
    RegisterActionTypes as registerTypes,
    AuthActionTypes as authTypes,
    ProfileActionTypes as profileTypes,
} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';
import {getCurrentProfile} from './profile';

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
        dispatch(loadUser());
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
        try {
            const res = await axios.get('/real_estate_ad/auth/me');
            await dispatch(getCurrentProfile());
            dispatch({type: authTypes.USER_LOADED, payload: res.data});
        } catch (err) {
            dispatch({type: authTypes.AUTH_ERROR});
        }
    }
};

//Login User
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post(
            '/real_estate_ad/auth/login',
            body,
            config
        );
        dispatch({type: authTypes.LOGIN_SUCCESS, payload: res.data});
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: authTypes.LOGIN_FAIL,
        });
    }
};
//Logout / clear profile
export const logout = () => (dispatch) => {
    dispatch({type: profileTypes.CLEAR_PROFILE});
    dispatch({type: authTypes.LOGOUT});
};
//update user

export const updateUser = ({name, email}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({name, email});
    try {
        const res = await axios.put(
            `/real_estate_ad/auth/updatedetails`,
            body,
            config
        );
        dispatch({
            type: profileTypes.UPDATE_PROFILE_SUCCESS,
            payload: res.data,
        });
        await dispatch(setAlert('User profile updated', 'success', 2000));
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.error.split(',');
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: profileTypes.UPDATE_PROFILE_ERROR,
        });
    }
};
