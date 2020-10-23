import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const CommentsPage = ({data, selectComment, match}) => {
    const handleDelete = (id) => {
        selectComment(id);
    };
    console.log('CommentsPage : ', match.params);
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
    const {page} = match.params;
    return (
        <>
            {data.length > 0 &&
                data
                    .slice((page - 1) * 5, match.params.page * 5)
                    .map((item) => (
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
        </>
    );
};

export default withRouter(CommentsPage);
