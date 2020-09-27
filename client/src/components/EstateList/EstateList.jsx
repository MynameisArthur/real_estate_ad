import React, {useEffect} from 'react';
import './EstateList.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEstates, findEstatesInRadius} from '../../actions/estate';
import Estate from '../Estate/Estate';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';

const EstateList = ({
    estates: {count, data},
    loading,
    getEstates,
    findEstatesInRadius,
}) => {
    useEffect(() => {
        getEstates();
    }, [getEstates]);
    return loading ? (
        <Spinner />
    ) : (
        <div className='estates-container'>
            <h3>Estates</h3>
            <p>
                <strong>All estates : </strong>
                {count}
            </p>
            <Search search={(formData) => findEstatesInRadius(formData)} />
            <button onClick={getEstates} className='btn'>
                Show All
            </button>
            <div className='estate-list'>
                {data &&
                    data.map((item) => {
                        return <Estate key={item.id} estate={item} />;
                    })}
            </div>
        </div>
    );
};

EstateList.propTypes = {
    getEstates: PropTypes.func.isRequired,
    findEstatesInRadius: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    estates: state.estate.estates,
    loading: state.estate.loading,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    getEstates,
    findEstatesInRadius,
})(EstateList);
