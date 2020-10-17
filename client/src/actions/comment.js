import axios from 'axios';
import {setAlert} from './alert';
import {dispatchError as error} from '../utils/dispatchErrors';
import {showPrompt} from './prompt';
import {CommentActionTypes as types} from './types';
import {getCurrentProfile} from './profile';

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
    const pattern = /\/estate\/\w+\/comment/gi;
    try {
        // if edit=false add new comment
        if (!edit) {
            await axios.post(
                `/real_estate_ad/estates/${estateId}/comments`,
                body,
                config
            );
            message = 'Comment added';
            await dispatch(getCurrentProfile());
        } else {
            // if edit=true update comment
            await axios.put(
                `/real_estate_ad/comments/${data._id}`,
                body,
                config
            );
            message = 'Comment updated';
        }
        history.go(-1);
        dispatch(setAlert(message, 'success', 2000));
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
export const deleteComment = (commentId, source, history) => async (
    dispatch
) => {
    try {
        await axios.delete(`/real_estate_ad/comments/${commentId}`);
        await dispatch(setAlert('Comment removed', 'danger', 2000));
        dispatch({type: types.DELETE_COMMENT});
        await dispatch(getCurrentProfile());
        history.push('/dashboard/comments');
    } catch (err) {
        error(dispatch, err, 'comment');
    }
};
export const selectComment = (commentId, action = 'delete') => async (
    dispatch
) => {
    await dispatch({type: 'SELECT_COMMENT', payload: commentId});
    dispatch(showPrompt(action, 'comment'));
};
