import {CommentActionTypes as types} from '../actions/types';

const initialState = {
    selectedComment: null,
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
        case types.DELETE_COMMENT:
            return {
                ...state,
                selectedComment: payload,
            };
        case types.SELECT_COMMENT:
            return {
                ...state,
                selectedComment: payload,
            };
        case types.DESELECT_COMMENT:
            return {
                ...state,
                selectedComment: null,
            };
        default:
            return state;
    }
}
