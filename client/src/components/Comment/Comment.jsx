import React, {useState} from 'react';
import './Comment.scss';
import {useParams, withRouter} from 'react-router-dom';
import {addComment} from '../../actions/comment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Comment = ({error, addComment, history}) => {
    const {id} = useParams();
    const initialState = {
        title: '',
        text: '',
        rating: 1,
    };
    const [commentDetails, setCommentDetails] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        addComment(id, commentDetails, history);
    };
    const handleChange = (e) => {
        setCommentDetails({...commentDetails, [e.target.name]: e.target.value});
    };
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
    addComment: PropTypes.func.isRequired,
    error: PropTypes.object,
};

const mapStateToProps = (state) => ({
    error: state.comment.error,
});

export default connect(mapStateToProps, {addComment})(withRouter(Comment));
