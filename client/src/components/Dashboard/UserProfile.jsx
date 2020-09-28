import React from 'react';
import Register from '../Register/Register';

const UserProfile = ({profile}) => {
    return (
        <div>
            <Register profile={profile} edit={true} />
        </div>
    );
};

export default UserProfile;
