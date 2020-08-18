import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../Spinner/Spinner';
import {Link} from 'react-router-dom';

const Dashboard = ({profile: {profile, loading}, auth, getCurrentProfile}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <div className='dashboard-container'>
            {auth.user && <p>{auth.user.data.name}'s dashboard</p>}
            {profile && (
                <div className='users-estates'>
                    {profile.data.estates.length > 0 && (
                        <p>{profile.data.estates[0].name}</p>
                    )}
                </div>
            )}
            <div className='dashboard-btn'>
                <Link to='/addEstate'>Add Estate</Link>
            </div>
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
