import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Prompt from '../Prompt/Prompt';
import {deleteComment} from '../../actions/comment';

const UserComments = ({comments, deleteComment}) => {
    const [prompt, setPrompt] = useState({
        show: false,
        confirm: false,
        promptMsg: '',
    });
    const [commentId, setCommentId] = useState(null);
    const [commentList, setCommentList] = useState(comments);
    const {show, confirm, promptMsg} = prompt;
    useEffect(() => {
        if (confirm) {
            deleteComment(commentId);
        }
    }, [confirm, commentList]);
    const handleDelete = (id) => {
        setPrompt({...prompt, show: true, promptMsg: 'delete comment'});
        setCommentId(id);
    };
    const handleConfirm = () => {
        setCommentList(commentList.filter((item) => item._id !== commentId));
        setPrompt({...prompt, confirm: true, show: false});
    };
    const hidePrompt = () => {
        setPrompt({...prompt, show: false});
    };
    const styles = {
        deleteBtn: {
            color: '#fff',
            backgroundColor: 'red',
            margin: '0 0.5em',
            fontWeight: 700,
            fontSize: '1.6rem',
        },
        editBtn: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '0 0.5em',
            fontWeight: 500,
        },
        gotoBtn: {
            color: '#fff',
            backgroundColor: 'blue',
            margin: '0 0.5em',
            fontWeight: 400,
        },
    };
    return (
        <div className='user-comments'>
            {show && (
                <Prompt
                    msg={promptMsg}
                    toggleConfirm={handleConfirm}
                    toggleShow={hidePrompt}
                />
            )}
            {commentList.length > 0 &&
                commentList.map((item) => (
                    <div className='user-comments_comment' key={item._id}>
                        <h5>Title: {item.title}</h5>
                        <p>Text: {item.text}</p>
                        <div>Rating: {item.rating}</div>
                        <p>Comment added at: {item.createdAt}</p>
                        <Link
                            to={`/estate/${item.estate}`}
                            style={styles.gotoBtn}
                        >
                            Go to estate &rarr;
                        </Link>
                        <Link
                            to={`/estate/${item.estate}/comment/${item._id}`}
                            style={styles.editBtn}
                        >
                            Edit Comment
                        </Link>
                        <button
                            onClick={() => handleDelete(item._id)}
                            style={styles.deleteBtn}
                        >
                            Delete Comment
                        </button>
                    </div>
                ))}
        </div>
    );
};

UserComments.propTypes = {
    deleteComment: PropTypes.func.isRequired,
};

export default connect(null, {deleteComment})(UserComments);
