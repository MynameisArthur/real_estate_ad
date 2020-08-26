import {setAlert} from './alert';
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
    } catch (err) {
        dispatch({
            type: profileTypes.PROFILE_ERROR,
            payload: {
                msg: err,
            },
        });
    }
};
export const deleteEstate = (estateId) => async (dispatch) => {
    try {
        await axios.delete(`/real_estate_ad/estates/${estateId}`);
        dispatch({type: profileTypes.DELETE_ESTATE});
        dispatch(setAlert('Estate deleted'));
        dispatch(getCurrentProfile());
    } catch (err) {
        dispatch({
            type: profileTypes.PROFILE_ERROR,
        });
    }
};
