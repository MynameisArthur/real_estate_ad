import React from 'react';
import EstatesPage from '../EstateList/EstatesPage';

const UserEstates = ({estates}) => {
    return (
        <div className='user-estates'>           
            <EstatesPage data={estates}/>
        </div>
    );
};

export default UserEstates;
