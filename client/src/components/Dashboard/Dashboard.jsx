import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../Spinner/Spinner';
import {Link} from 'react-router-dom';
import MyEstate from '../Estate/MyEstate';
import Estate from '../Estate/Estate';

const Dashboard = ({profile: {profile, loading}, auth, getCurrentProfile}) => {
    useEffect(() => {
        if (auth.isAuthenticated) {
            getCurrentProfile();
        }
    }, []);
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <div className='dashboard-container'>
            {auth.user && (
                <h2 className='section-title'>
                    {auth.user.data.name}'s dashboard
                </h2>
            )}
            {auth.user.data.role !== 'user' && (
                <div className='dashboard-btn'>
                    <Link to='/addEstate'>Add Estate</Link>
                </div>
            )}

            {profile && (
                <div className='users-estates'>
                    {profile.data.estates.length > 0 &&
                        profile.data.estates.map((estate) => (
                            <MyEstate
                                key={estate._id}
                                estate={estate}
                                WrappedComponent={Estate}
                                reloadProfile={getCurrentProfile}
                            />
                        ))}
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
