import React from 'react';
import {Link} from 'react-router-dom';

const UserComments = ({comments}) => {
    return (
        <div className='user-comments'>
            {comments.length > 0 &&
                comments.map((item) => (
                    <div className='user-comments_comment' key={item._id}>
                        <h5>Title: {item.title}</h5>
                        <p>Text: {item.text}</p>
                        <div>Rating: {item.rating}</div>
                        <p>Comment added at: {item.createdAt}</p>
                        <Link to={`/estate/${item.estate}`}>
                            Go to estate &rarr;
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default UserComments;
