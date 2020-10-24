import React, {useState} from 'react';
import {generatePageLinks} from '../../utils/generatePageLinks';
import OffersPage from '../Offer/OffersPage';

const UserOffers = ({offers}) => {
    const [offerList, setOfferList] = useState(offers);
    const pageLinkConfig = {
        count: offerList.length,
        to: 'dashboard/offers',
        limit: 5,
    };
    return (
        <div className='user-offers'>
            <OffersPage data={offerList} />
            <div className='pagination'>
                {generatePageLinks(pageLinkConfig)}
            </div>
        </div>
    );
};

export default UserOffers;
