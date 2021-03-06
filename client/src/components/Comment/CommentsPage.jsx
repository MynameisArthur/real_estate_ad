import React from 'react';
import {withRouter} from 'react-router-dom';
import Comment from './Comment';
import MultipleComponents from '../../utils/MultipleComponents';

const CommentsPage = ({data, match}) => {
    const {page} = match.params;
    return (
        <>
            {
                <MultipleComponents
                    WrappedComponent={Comment}
                    data={data}
                    page={page}
                />
            }
        </>
    );
};

export default withRouter(CommentsPage);
