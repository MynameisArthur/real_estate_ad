import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';

const Dashboard = ({profile: {profile}, auth, getCurrentProfile}) => {
    useEffect(() => {
        getCurrentProfile(auth);
    }, []);

    return (
        <div className='dashboard-container'>
            {auth.user && <p>{auth.user.data.name}'s dashboard</p>}
            {profile && (
                <div className='users-estates'>
                    {profile.estates.length > 0 && (
                        <p>{profile.estates[0].name}</p>
                    )}
                </div>
            )}
        </div>
    );
};

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
