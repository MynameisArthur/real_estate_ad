import React from 'react';
import EstatesPage from '../EstateList/EstatesPage';
import {generatePageLinks} from '../../utils/generatePageLinks';
const UserEstates = ({estates}) => {
    const pageLinkConfig = {
        count: estates.length,
        to: 'dashboard/estates',
        limit: 5,
    };
    return (
        <div className='user-estates'>
            <EstatesPage data={estates} />
            <div className='pagination'>
                {generatePageLinks(pageLinkConfig)}
            </div>
        </div>
    );
};

export default UserEstates;
