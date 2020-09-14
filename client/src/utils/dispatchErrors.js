import {
    EstateActionTypes as estateTypes,
    OfferActionTypes as offerTypes,
} from '../actions/types';

export const dispatchEstateError = (dispatch, err) => {
    return dispatch({
        type: estateTypes.ESTATE_ERROR,
        payload: {
            msg: err.response,
            status: err.response,
        },
    });
};
export const dispatchCommentError = (dispatch, err) => {
    return dispatch({
        type: offerTypes.COMMENT_ERROR,
        payload: {
            msg: err.response,
            status: err.response,
        },
    });
};
