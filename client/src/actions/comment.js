import axios from 'axios';
import {setAlert} from './alert';
import {dispatchError as error} from '../utils/dispatchErrors';

//depending on boolean "edit" either: edits existing comment or adds new one
export const modifyComment = (estateId, data, history, edit) => async (
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify(data);
    let message = 'Comment added';
    try {
        // if edit=false add new comment
        if (!edit) {
            await axios.post(
                `/real_estate_ad/estates/${estateId}/comments`,
                body,
                config
            );
        } else {
            // if edit=true update comment
            await axios.put(
                `/real_estate_ad/comments/${data._id}`,
                body,
                config
            );
            message = 'Comment updated';
        }
        dispatch(setAlert(message));
        history.go(-1);
    } catch (err) {
        error(dispatch, err, 'comment');
    }
};
export const getSingleComment = (commentId) => async (dispatch) => {
    try {
        return await axios.get(`/real_estate_ad/comments/${commentId}`);
    } catch (err) {
        error(dispatch, err, 'comment');
    }
};
export const deleteComment = (commentId) => async (dispatch) => {
    try {
        return await axios.delete(`/real_estate_ad/comments/${commentId}`);
    } catch (err) {
        error(dispatch, err, 'comment');
    }
};
