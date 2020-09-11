import React from 'react';
import './Picture.scss';
import close from './close.svg';
import {deletePhoto} from '../../actions/estate';
import {connect} from 'react-redux';

const Picture = ({photo, index, name, _id, deletePhoto}) => {
    const handleClick = (e) => {
        e.preventDefault();
        deletePhoto(_id, photo);
    };
    return (
        <div className='estate-picture'>
            <button onClick={handleClick}>
                <img src={close} alt='' />
            </button>
            {/* <img src={`/uploads/${photo}`} alt={`${name}-view#${index + 1}`} /> */}
        </div>
    );
};

export default connect(null, {deletePhoto})(Picture);
