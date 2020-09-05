import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../Spinner/Spinner';
import {Link, Switch, Route, NavLink, Redirect} from 'react-router-dom';

import UserEstates from './UserEstates';
import UserComments from './UserComments';
import UserOffers from './UserOffers';

const Dashboard = ({getCurrentProfile}) => {
    const [userProfile, setUserProfile] = useState({
        name: 'user',
        role: '',
        estates: [],
        offers: [],
        comments: [],
        loading: true,
    });
    const loadData = async () => {
        const profile = await getCurrentProfile();
        const {user, estates, offers, comments} = profile.data.data;
        setUserProfile({
            name: user.name,
            role: user.role,
            estates,
            loading: false,
            offers,
            comments,
        });
    };
    useEffect(() => {
        loadData();
    }, []);
    const {name, role, estates, loading, offers, comments} = userProfile;
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
            <ul className='dashboard-navigation'>
                <li>
                    <NavLink
                        to='/dashboard/estates'
                        className='btn'
                        activeClassName='selected'
                    >
                        My Estates <span>{estates.length}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dashboard/comments'
                        className='btn'
                        activeClassName='selected'
                    >
                        My Comments <span>{comments.length}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/dashboard/offers'
                        className='btn'
                        activeClassName='selected'
                    >
                        My Offers <span>{offers.length}</span>
                    </NavLink>
                </li>
            </ul>
            <Switch>
                <Redirect exact from='/dashboard' to='/dashboard/estates' />
                <Route
                    exact
                    path='/dashboard/estates'
                    component={() => <UserEstates estates={estates} />}
                />
                <Route
                    exact
                    path='/dashboard/comments'
                    component={() => <UserComments comments={comments} />}
                />
                <Route
                    exact
                    path='/dashboard/offers'
                    component={() => <UserOffers offers={offers} />}
                />
            </Switch>
        </div>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(null, {getCurrentProfile})(Dashboard);
