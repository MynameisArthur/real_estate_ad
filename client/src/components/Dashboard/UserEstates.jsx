import React from 'react';
import UserEstatesPage from '../EstateList/UserEstatesPage';
import {generatePageLinks} from '../../utils/generatePageLinks';
const UserEstates = ({estates}) => {
    const pageLinkConfig = {
        count: estates.length,
        to: 'dashboard/estates',
        limit: 5,
    };
    return (
        <div className='user-estates'>
            <UserEstatesPage data={estates} />
            <div className='pagination'>
                {generatePageLinks(pageLinkConfig)}
            </div>
        </div>
    );
};

export default UserEstates;
