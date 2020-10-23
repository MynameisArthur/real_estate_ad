import React from 'react';
import {withRouter} from 'react-router-dom';
import Comment from './Comment';

const CommentsPage = ({data, match}) => {
    const {page} = match.params;
    return (
        <>
            {data.length > 0 &&
                data
                    .slice((page - 1) * 5, match.params.page * 5)
                    .map((item) => <Comment item={item} key={item._id} />)}
        </>
    );
};

export default withRouter(CommentsPage);
