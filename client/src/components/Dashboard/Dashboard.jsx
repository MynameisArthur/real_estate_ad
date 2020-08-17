import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';

const Dashboard = ({profile, auth, getCurrentProfile}) => {
    useEffect(() => {
        getCurrentProfile(auth);
    }, []);

    return (
        <div className='dashboard-container'>
            <p>dashboard</p>
            <p>{profile && JSON.stringify(profile)}</p>
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
