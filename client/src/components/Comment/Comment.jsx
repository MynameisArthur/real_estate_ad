import React from 'react';
import './Comment.scss';
import {useParams} from 'react-router-dom';

const Comment = ({props}) => {
    const {id} = useParams();
    return <div>Comment for estate {id}</div>;
};

export default Comment;
