import React, {useEffect} from 'react';
import './Estates.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEstates} from '../../actions/estate';
import Estate from '../Estate/Estate';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';

const Estates = ({estates: {count, data}, loading, getEstates}) => {
    useEffect(() => {
        getEstates();
    }, [getEstates]);
    return loading ? (
        <Spinner />
    ) : (
        <div className='estates-container'>
            <h3>Estates</h3>
            <Search />
            <div className='estate-list'>
                {data &&
                    data.map((item) => <Estate key={item.id} estate={item} />)}
            </div>
        </div>
    );
};

Estates.propTypes = {
    estates: PropTypes.object.isRequired,
    getEstates: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    estates: state.estate.estates,
    loading: state.estate.loading,
});

export default connect(mapStateToProps, {getEstates})(Estates);
