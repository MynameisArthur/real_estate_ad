import {CommentActionTypes as types} from '../actions/types';

const initialState = {
    comment: null,
    error: null,
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case types.COMMENT_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
}
