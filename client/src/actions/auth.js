import axios from 'axios';
import {RegisterActionTypes as types} from './types';
import {setAlert} from './alert';

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
        dispatch({type: types.REGISTER_SUCCESS, payload: res.data});
    } catch (err) {
        const errors = err.response.data.error.split(',');
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error, 'danger')));
        }
        dispatch({
            type: types.REGISTER_FAIL,
        });
    }
};
