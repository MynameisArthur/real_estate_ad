import React from 'react';
import './Estate.scss';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {deleteEstate} from '../../actions/estate';
import PropTypes from 'prop-types';

const Estate = ({userId, role, estate, deleteEstate, location, history}) => {
    const handleDelete = () => {
        //location.pathname is a prop from withRouter which gives me current url eg./dashboard
        deleteEstate(estate._id, location.pathname, history);
    };
    let buttons;
    if (userId && estate.user !== userId) {
        buttons = (
            <div className='links'>
                <Link to={`/estate/${estate._id}/comment`} className='btn'>
                    comment
                </Link>
                {role !== 'user' && (
                    <Link to={`/estate/${estate._id}/offer`} className='btn'>
                        offer
                    </Link>
                )}
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
            <div className='estate-description'>
                <p className='estate-description_text'>{estate.description}</p>
                {estate.offers && estate.offers.length > 0 && (
                    <span className='estate-description_offers'>
                        {estate.offers.length} offers
                    </span>
                )}
            </div>
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
    location: PropTypes.object,
    role: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userId: state.auth.isAuthenticated ? state.auth.user.data._id : null,
    role: state.auth.isAuthenticated ? state.auth.user.data.role : 'user',
});

export default connect(mapStateToProps, {deleteEstate})(withRouter(Estate));
