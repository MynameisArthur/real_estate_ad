import React, {useEffect} from 'react';
import './EstateList.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEstates, findEstatesInRadius} from '../../actions/estate';
import EstatesPage from './EstatesPage';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';
import {Switch, Route} from 'react-router-dom';
import {generatePageLinks} from '../../utils/generatePageLinks';

const EstateList = ({
    estates: {count, data},
    loading,
    getEstates,
    findEstatesInRadius,
    match
}) => {
    const pageLinkConfig = {
        count,        
        to: 'estates'
    };
    useEffect(() => {
        getEstates(match.params.page);
    }, [match.params.page]);
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
                <Switch>             
                    <Route exact to='/estates/:page' component={()=><EstatesPage data={data} />} />                    
                </Switch>
            </div>
            <div className="pagination">
                {
                   generatePageLinks(pageLinkConfig)
                }
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
