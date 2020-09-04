import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../Spinner/Spinner';
import {Link} from 'react-router-dom';
import Estate from '../Estate/Estate';

const Dashboard = ({getCurrentProfile}) => {
    const [userProfile, setUserProfile] = useState({
        name: 'user',
        role: '',
        estates: [],
        loading: true,
    });
    const loadData = async () => {
        const profile = await getCurrentProfile();
        const {user, estates} = profile.data.data;
        setUserProfile({
            name: user.name,
            role: user.role,
            estates,
            loading: false,
        });
    };
    useEffect(() => {
        loadData();
    }, []);
    const {name, role, estates, loading} = userProfile;
    return loading ? (
        <Spinner />
    ) : (
        <div className='dashboard-container'>
            <h2 className='section-title'>{name}'s dashboard</h2>
            <div>
                <strong>role:</strong> {role}
            </div>
            {role !== 'user' && (
                <div className='dashboard-btn'>
                    <Link to='/addEstate'>Add Estate</Link>
                </div>
            )}
            <div className='users-estates'>
                {estates.length > 0 &&
                    estates.map((item) => (
                        <Estate key={item._id} estate={item} />
                    ))}
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(null, {getCurrentProfile})(Dashboard);
