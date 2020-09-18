import {ProfileActionTypes as profileTypes} from './types';
import axios from 'axios';

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const profile = await axios.get(`/real_estate_ad/auth/myProfile`);
        dispatch({
            type: profileTypes.GET_PROFILE,
            payload: profile.data,
        });
        // return profile;
    } catch (err) {
        dispatch({
            type: profileTypes.PROFILE_ERROR,
            payload: {
                msg: err,
            },
        });
    }
};
