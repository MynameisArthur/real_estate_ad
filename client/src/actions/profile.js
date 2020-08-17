import {setAlert} from './alert';
import {ProfileActionTypes as profileTypes} from './types';
import axios from 'axios';

//Get current users profile
export const getCurrentProfile = (auth) => async (dispatch) => {
    try {
        const user = auth.user.data;
        const {_id} = user;
        const estates = await axios.get(`/real_estate_ad/estates?user=${_id}`);
        const offers = await axios.get(`/real_estate_ad/offers?_id=${_id}`);
        const comments = await axios.get(`/real_estate_ad/comments?_id=${_id}`);
        const profile = {
            user,
            estates: estates.data.data,
            offers: offers.data.data,
            comments: comments.data.data,
        };

        dispatch({
            type: profileTypes.GET_PROFILE,
            payload: profile,
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
