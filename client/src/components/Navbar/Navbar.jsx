import React from 'react';
import './Navbar.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated}, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/estates/1'>Estates</Link>
            </li>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <a href='#!' onClick={logout}>
                    Logout
                </a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li>
                <Link to='/estates'>Estates</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
        </ul>
    );
    return (
        <nav className='main-nav'>
            <Link to='/'>Home</Link>
            {isAuthenticated ? authLinks : guestLinks}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Navbar);
