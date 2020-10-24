import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getEstate} from '../../actions/estate';
import {withRouter} from 'react-router-dom';
import './Estate.scss';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import Picture from '../Picture/Picture';
import GMap from '../GMap/GMap';
import Buttons from '../Buttons/Buttons';
import {selectEstate} from '../../actions/estate';
import Offer from '../Offer/Offer';
import {deleteOffer} from '../../actions/offer';

const EstateDetails = ({
    getEstate,
    selectEstate,
    deleteOffer,
    history,
    match,
    userId,
    role,
}) => {
    const {id} = match.params;
    const [estate, setEstate] = useState({loading: true});
    const {
        name,
        description,
        houseArea,
        yardArea,
        startingPrice,
        bedrooms,
        bathrooms,
        createdAt,
        averageRating,
        email,
        phone,
        address,
        features,
        offers,
        comments,
        highestBid,
        loading,
        photos,
        location,
        user,
        _id,
    } = estate;

    const loadEstate = async (id) => {
        const currentEstate = await getEstate(id);
        if (currentEstate) {
            const address = currentEstate.data.location.formattedAddress;
            const {offers} = currentEstate.data;
            const highestBid =
                offers.length > 0
                    ? Math.max(...offers.map((offer) => offer.amountOffered))
                    : 0;
            setEstate({
                ...currentEstate.data,
                address,
                offers,
                highestBid,
                loading: false,
            });
        }
    };
    useEffect(() => {
        loadEstate(id);
    }, []);
    const handleDelete = () => {
        selectEstate(_id);
    };
    const offerDelete = (id) => {
        deleteOffer(id);
    };
    return (
        <div className='estate-details'>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h3 className='estate-details_name'>{name}</h3>
                    <section className='estate-details_description'>
                        <p>{description}</p>
                    </section>
                    <section className='estate-details_features'>
                        <h4>Features:</h4>
                        <ul>
                            {features &&
                                features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                        </ul>
                    </section>
                    <section className='estate-deatils_stats'>
                        <h4>Numbers:</h4>
                        <article>
                            <strong>estate added: </strong>
                            {createdAt}
                        </article>
                        <article>
                            <span>
                                <strong>house area: </strong>
                                {houseArea}
                            </span>
                            <span>
                                <strong>yard area: </strong>
                                {yardArea}
                            </span>
                            <span>
                                <strong>starting price: </strong>$
                                {startingPrice}
                            </span>
                            <span>
                                <strong>highest bid: </strong>${highestBid}
                            </span>
                            <span>
                                <strong>bedrooms: </strong>
                                {bedrooms}
                            </span>
                            <span>
                                <strong>bathrooms: </strong>
                                {bathrooms}
                            </span>
                            <span>
                                <strong>average rating: </strong>
                                {averageRating}
                            </span>
                        </article>
                        <article>
                            <h4>Address</h4>
                            {address}
                        </article>
                    </section>
                    <section className='estate-details_contact'>
                        <h4>Contact:</h4>
                        <article>
                            <strong>phone: </strong>
                            {phone}
                        </article>
                        <article>
                            <strong>email: </strong>
                            {email}
                        </article>
                    </section>
                    {offers.length > 0 && (
                        <section className='estate-details_offers'>
                            <h4>Offers:</h4>
                            <ul>
                                {offers &&
                                    offers.map((offer) => (
                                        <li key={offer._id}>
                                            <Offer
                                                offer={offer}
                                                userId={userId}
                                                offerDelete={offerDelete}
                                            />
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    )}
                    {comments.length > 0 && (
                        <section className='estate-details_comments'>
                            <h4>Comments:</h4>
                            <ul>
                                {comments &&
                                    comments.map((comment) => (
                                        <li key={comment._id}>
                                            <p>
                                                <strong>title: </strong>
                                                {comment.title}
                                            </p>
                                            <p>
                                                <strong>description: </strong>
                                                {comment.text}
                                            </p>
                                            <p>
                                                <strong>date: </strong>
                                                {comment.createdAt}
                                            </p>
                                        </li>
                                    ))}
                            </ul>
                        </section>
                    )}

                    {photos.length > 0 && (
                        <section className='estate-details_photos'>
                            {photos.map((photo, index) => (
                                <li key={`${id}_${index + 1}`}>
                                    <Picture
                                        photo={photo}
                                        index={index}
                                        name={name}
                                    />
                                </li>
                            ))}
                        </section>
                    )}
                    <section className='estate-details_map'>
                        <GMap address={address} location={location} />
                    </section>
                    <section className='estate-details_btns'>
                        <button
                            className='btn'
                            onClick={(e) => {
                                e.preventDefault();
                                history.go(-1);
                            }}
                        >
                            &larr; Go Back
                        </button>
                        <Buttons
                            props={{role, _id, handleDelete, user, userId}}
                        />
                    </section>
                </>
            )}
        </div>
    );
};

EstateDetails.propTypes = {
    getEstate: PropTypes.func.isRequired,
    currentEstate: PropTypes.object,
};
const mapStateToProps = (state) => ({
    userId: state.auth.isAuthenticated ? state.auth.user.data._id : null,
    role: state.auth.isAuthenticated ? state.auth.user.data.role : 'user',
});
export default connect(mapStateToProps, {getEstate, selectEstate, deleteOffer})(
    withRouter(EstateDetails)
);
