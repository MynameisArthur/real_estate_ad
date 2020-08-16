import React, {useEffect} from 'react';
import './Estates.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEstates} from '../../actions/estate';
import Estate from '../Estate/Estate';

const Estates = ({estates: {count, data}, getEstates}) => {
    useEffect(() => {
        getEstates();
    }, [getEstates]);
    return (
        <div>
            <h3>Estates</h3>
            <p>{count}</p>
            <ul>{data && data.map((item) => <div>{item.name}</div>)}</ul>
        </div>
    );
};

Estates.propTypes = {
    estates: PropTypes.object.isRequired,
    getEstates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    estates: state.estate.estates,
});

export default connect(mapStateToProps, {getEstates})(Estates);
