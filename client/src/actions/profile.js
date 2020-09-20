import {ProfileActionTypes as types, EstateActionTypes} from './types';
import axios from 'axios';

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const profile = await axios.get(`/real_estate_ad/auth/myProfile`);
        dispatch({
            type: types.GET_PROFILE,
            payload: profile.data,
        });
        dispatch({
            type: EstateActionTypes.SET_USER_ESTATES,
            payload: profile.data.data.estates,
        });
    } catch (err) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: {
                msg: err,
            },
        });
    }
};
