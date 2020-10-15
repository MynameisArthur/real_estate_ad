import React from 'react';
import Register from '../Register/Register';
import {forgotPassword} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import {connect} from 'react-redux';

const UserProfile = ({profile, forgotPassword, setAlert}) => {
    return (
        <div>
            <Register profile={profile} edit={true} />
            <button
                className='btn danger'
                onClick={() => {
                    forgotPassword(profile.email);
                    setAlert('Please check your email', 'success');
                }}
            >
                Password reset
            </button>
        </div>
    );
};

export default connect(null, {forgotPassword, setAlert})(UserProfile);
