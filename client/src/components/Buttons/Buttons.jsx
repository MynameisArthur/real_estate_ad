import React from 'react';
import {Link} from 'react-router-dom';

const Buttons = ({props: {role, _id, handleDelete, user, userId}}) => {
    let buttons;
    if (role === 'admin') {
        buttons = (
            <div className='links'>
                <Link to={`/editEstate/${_id}`} className='btn'>
                    Edit Estate
                </Link>
                <button onClick={handleDelete} className='btn danger'>
                    Delete Estate
                </button>
                <Link to={`/estate/${_id}/comment`} className='btn'>
                    comment
                </Link>
                <Link to={`/estate/${_id}/offer`} className='btn'>
                    offer
                </Link>
            </div>
        );
    } else if (userId && user !== userId) {
        buttons = (
            <div className='links'>
                {role !== 'publisher' && (
                    <Link to={`/estate/${_id}/comment`} className='btn'>
                        comment
                    </Link>
                )}

                <Link to={`/estate/${_id}/offer`} className='btn'>
                    offer
                </Link>
            </div>
        );
    } else if (userId && user === userId) {
        buttons = (
            <>
                <div className='links'>
                    <Link to={`/editEstate/${_id}`} className='btn'>
                        Edit Estate
                    </Link>
                    <button onClick={handleDelete} className='btn danger'>
                        Delete Estate
                    </button>
                </div>
            </>
        );
    }
    return <>{buttons}</>;
};

export default Buttons;
