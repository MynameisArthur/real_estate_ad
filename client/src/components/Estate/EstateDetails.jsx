import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getEstate} from '../../actions/estate';
import {withRouter} from 'react-router-dom';
import './Estate.scss';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import Picture from '../Picture/Picture';

const EstateDetails = ({getEstate, history, match}) => {
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
    } = estate;

    const loadEstate = async (id) => {
        const response = await getEstate(id);
        const address = response.data.location.formattedAddress;
        const {offers, features, comments, photos} = response.data;
        const highestBid =
            offers.length > 0
                ? Math.max(...offers.map((offer) => offer.amountOffered))
                : 0;
        setEstate({
            ...response.data,
            address,
            offers,
            features,
            comments,
            highestBid,
            photos,
            loading: false,
        });
    };
    useEffect(() => {
        loadEstate(id);
    }, []);

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
                    <section className='estate-details_offers'>
                        <h4>Offers:</h4>
                        <ul>
                            {offers &&
                                offers.map((offer) => (
                                    <li key={offer._id}>
                                        <p>
                                            <strong>title: </strong>
                                            {offer.title}
                                        </p>
                                        <p>
                                            <strong>description: </strong>
                                            {offer.description}
                                        </p>
                                        <p>
                                            <strong>amount offered: </strong>$
                                            {offer.amountOffered}
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </section>
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
                    <button
                        className='btn'
                        onClick={(e) => {
                            e.preventDefault();
                            history.go(-1);
                        }}
                    >
                        &larr; Go Back
                    </button>
                </>
            )}
        </div>
    );
};

EstateDetails.propTypes = {
    getEstate: PropTypes.func.isRequired,
};

export default connect(null, {getEstate})(withRouter(EstateDetails));
