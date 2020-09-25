import React from 'react';
import './Estate.scss';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Picture from '../Picture/Picture';
import Buttons from '../Buttons/Buttons';
import {selectEstate} from '../../actions/estate';

const Estate = ({
    userId,
    role,
    estate: {
        _id,
        user,
        offers,
        comments,
        photos,
        name,
        description,
        location: {formattedAddress},
    },
    selectEstate,
}) => {
    const handleDelete = () => {
        selectEstate(_id);
    };
    return (
        <div className='estate-container'>
            <h3 className='estate-name'>
                <Link to={`/estate/${_id}`}>{name}</Link>
            </h3>
            <div className='estate-description'>
                <p className='estate-description_text'>{description}</p>
                {offers && offers.length > 0 && (
                    <span className='estate-description_offers'>
                        {offers.length} offers
                    </span>
                )}
                {comments && comments.length > 0 && (
                    <span className='estate-description_comments'>
                        {comments.length} comments
                    </span>
                )}
            </div>
            <div className='estate-address'>{formattedAddress}</div>

            {photos.length && <Picture photo={photos[0]} />}

            <Buttons props={{role, _id, handleDelete, user, userId}} />
        </div>
    );
};

Estate.propTypes = {
    userId: PropTypes.string,
    location: PropTypes.object,
    role: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userId: state.auth.isAuthenticated ? state.auth.user.data._id : null,
    role: state.auth.isAuthenticated ? state.auth.user.data.role : 'user',
});

export default connect(mapStateToProps, {selectEstate})(Estate);
