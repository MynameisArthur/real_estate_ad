import {CommentActionTypes as types} from './types';
import axios from 'axios';
import {setAlert} from './alert';

export const addComment = (estateId, data, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify(data);
    try {
        await axios.post(
            `/real_estate_ad/estates/${estateId}/comments`,
            body,
            config
        );
        dispatch(setAlert('Comment added'));
        history.go(-1);
    } catch (err) {
        // dispatch(setAlert(err, 'danger'));
        dispatch({
            type: types.COMMENT_ERROR,
            payload: err,
        });
    }
};
