import React from 'react';
import './Picture.scss';
import close from './close.svg';
import {deletePhoto} from '../../actions/estate';
import {connect} from 'react-redux';

const Picture = ({
    role,
    userId,
    photo,
    index,
    name,
    user,
    _id,
    deletePhoto,
    updatePhotos,
}) => {
    const handleClick = async (e) => {
        e.preventDefault();
        const deletedPhoto = await deletePhoto(_id, photo);
        updatePhotos(deletedPhoto, true);
    };

    return (
        <div className='estate-picture'>
            {(role === 'publisher' && userId === user) || role === 'admin' ? (
                <button onClick={handleClick}>
                    <img src={close} alt='' />
                </button>
            ) : null}

            <img src={`/uploads/${photo}`} alt={`${name}-view#${index + 1}`} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    role: state.auth.isAuthenticated ? state.auth.user.data.role : 'user',
    userId: state.auth.isAuthenticated ? state.auth.user.data._id : null,
});

export default connect(mapStateToProps, {deletePhoto})(Picture);
