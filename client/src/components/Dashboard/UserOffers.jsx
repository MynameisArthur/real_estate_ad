import React from 'react';
import {Link} from 'react-router-dom';

const UserOffers = ({offers}) => {
    return (
        <div className='user-offers'>
            {offers.length > 0 &&
                offers.map((item) => (
                    <div className='user-offers_offer' key={item._id}>
                        <h5>Offer Title:{item.title}</h5>
                        <p>Offer Description: {item.description}</p>
                        <div>Amount Offered: ${item.amountOffered}</div>
                        <p>Comment added at: {item.createdAt}</p>
                        <Link to={`/estate/${item.estate}`}>
                            Go to estate &rarr;
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default UserOffers;
