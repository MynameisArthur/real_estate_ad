import React from 'react';
import './Landing';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const Landing = ({isAuthenticated}) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    return (
        <>
            <h1>Real Estate AD</h1>
        </>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
