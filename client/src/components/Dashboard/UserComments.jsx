import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectComment} from '../../actions/comment';
import {generatePageLinks} from '../../utils/generatePageLinks';

import CommentsPage from '../Comment/CommentsPage';

const UserComments = ({comments, selectComment}) => {
    const [commentList, setCommentList] = useState(comments);

    const pageLinkConfig = {
        count: commentList.length,
        to: 'dashboard/comments',
        limit: 5,
    };

    return (
        <div className='user-comments'>
            <CommentsPage data={commentList} selectComment={selectComment} />
            <div className='pagination'>
                {generatePageLinks(pageLinkConfig)}
            </div>
        </div>
    );
};

UserComments.propTypes = {
    selectComment: PropTypes.func.isRequired,
};

export default connect(null, {selectComment})(UserComments);
