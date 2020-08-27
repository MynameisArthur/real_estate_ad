import React from 'react';
import './Estate.scss';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {deleteEstate} from '../../actions/estate';
import PropTypes from 'prop-types';

const Estate = ({userId, estate, deleteEstate, location}) => {
    const handleDelete = () => {
        deleteEstate(estate._id, location.pathname);
    };
    let buttons;
    if (userId && estate.user !== userId) {
        buttons = (
            <div className='links'>
                <Link to={`/estate/${estate._id}/comment`} className='btn'>
                    comment
                </Link>
                <Link to={`/estate/${estate._id}/offer`} className='btn'>
                    offer
                </Link>
            </div>
        );
    } else if (userId && estate.user === userId) {
        buttons = (
            <div className='links'>
                <Link to={`/editEstate/${estate._id}`} className='btn'>
                    Edit Estate
                </Link>
                <button onClick={handleDelete} className='btn danger'>
                    Delete Estate
                </button>
            </div>
        );
    }
    return (
        <div className='estate-container'>
            <h3 className='estate-name'>{estate.name}</h3>
            <p className='estate description'>{estate.description}</p>
            <div className='estate-address'>
                {estate.location.formattedAddress}
            </div>
            <ul className='estate-photos'>
                {estate.photos.map((photo, index) => (
                    <li key={`${estate._id}_${index + 1}`}>
                        {/* <img
                            src={photo}
                            alt={`${estate.name}-view#${index + 1}`}
                        /> */}
                    </li>
                ))}
            </ul>
            {buttons}
        </div>
    );
};

Estate.propTypes = {
    userId: PropTypes.string,
    deleteEstate: PropTypes.func.isRequired,
    location: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userId: state.auth.isAuthenticated ? state.auth.user.data._id : null,
});

export default connect(mapStateToProps, {deleteEstate})(withRouter(Estate));
