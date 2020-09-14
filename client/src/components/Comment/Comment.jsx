import React, {useState, useEffect} from 'react';
import './Comment.scss';
import {withRouter} from 'react-router-dom';
import {modifyComment, getSingleComment} from '../../actions/comment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Comment = ({
    error,
    modifyComment,
    getSingleComment,
    history,
    match,
    edit,
}) => {
    const {id, commentId} = match.params;
    const initialState = {
        title: '',
        text: '',
        rating: 1,
    };
    const [commentDetails, setCommentDetails] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        modifyComment(id, commentDetails, history, edit);
    };
    const handleChange = (e) => {
        setCommentDetails({...commentDetails, [e.target.name]: e.target.value});
    };
    const loadComment = async (commentId) => {
        const comment = await getSingleComment(commentId);
        setCommentDetails(comment.data.data);
    };
    useEffect(() => {
        if (edit) {
            loadComment(commentId);
        }
    }, []);
    const {title, text, rating} = commentDetails;
    return (
        <>
            {error && (
                <p>
                    {error.message.split(' ').includes('400') &&
                        'Already commented on this estate'}
                </p>
            )}

            <form onSubmit={(e) => onSubmit(e)} className='form'>
                <div className='form-group'>
                    <label>
                        Title
                        <input
                            type='text'
                            name='title'
                            value={title}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Description
                        <textarea
                            name='text'
                            value={text}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Rating
                        <input
                            name='number'
                            name='rating'
                            value={rating}
                            onChange={(e) => handleChange(e)}
                            min='1'
                            max='10'
                            required
                        />
                    </label>
                </div>
                <button
                    className='btn'
                    onClick={(e) => {
                        e.preventDefault();
                        history.go(-1);
                    }}
                >
                    &larr; Go Back
                </button>
                <button type='submit' className='btn btn-addOffer'>
                    Submit Comment
                </button>
            </form>
        </>
    );
};

Comment.propTypes = {
    modifyComment: PropTypes.func.isRequired,
    error: PropTypes.object,
    edit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    error: state.comment.error,
});

export default connect(mapStateToProps, {modifyComment, getSingleComment})(
    withRouter(Comment)
);
