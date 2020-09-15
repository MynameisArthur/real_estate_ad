import {
    EstateActionTypes,
    CommentActionTypes,
    OfferActionTypes,
} from '../actions/types';

export const dispatchError = (dispatch, err, type = 'estate') => {
    let types = null;
    switch (type) {
        case 'offer':
            types = OfferActionTypes;
            break;
        case 'comment':
            types = CommentActionTypes;
            break;
        case 'estate':
        default:
            types = EstateActionTypes;
    }

    return dispatch({
        type: types[`${type.toUpperCase()}_ERROR`],
        payload: {
            msg: err.response,
            status: err.response,
        },
    });
};
