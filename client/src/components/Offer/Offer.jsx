import React from 'react';
import './Offer.scss';

const Offer = ({offer, userId, offerDelete}) => {
    const isOwner = offer.user === userId;
    const handleDelete = async () => {
        if (isOwner) {
            offerDelete(offer._id);
        } else {
            return;
        }
    };

    return (
        <div className='offer-display'>
            <p>
                <strong>title: </strong>
                {offer.title}
            </p>
            <p>
                <strong>description: </strong>
                {offer.description}
            </p>
            <p>
                <strong>amount offered: </strong>${offer.amountOffered}
            </p>
            {isOwner && (
                <button onClick={handleDelete} className='danger'>
                    delete
                </button>
            )}
        </div>
    );
};

export default Offer;
