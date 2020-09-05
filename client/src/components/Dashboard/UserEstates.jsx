import React from 'react';
import Estate from '../Estate/Estate';

const UserEstates = ({estates}) => {
    return (
        <div className='user-estates'>
            {estates.length > 0 &&
                estates.map((item) => <Estate key={item._id} estate={item} />)}
        </div>
    );
};

export default UserEstates;
