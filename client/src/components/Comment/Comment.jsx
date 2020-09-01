import React, {useState} from 'react';
import './Comment.scss';
import {useParams, withRouter} from 'react-router-dom';
import {addComment} from '../../actions/comment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Comment = ({addComment, history}) => {
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

            <button type='submit' className='btn btn-addOffer'>
                Submit Comment
            </button>
        </form>
    );
};

export default connect(null, {addComment})(withRouter(Comment));
