import React, {useEffect} from 'react';
import './EstateList.scss';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEstates, findEstatesInRadius} from '../../actions/estate';
import Estate from '../Estate/Estate';
import Spinner from '../Spinner/Spinner';
import Search from '../Search/Search';
import Prompt from '../Prompt/Prompt';
import {deleteEstate} from '../../actions/estate';
import {withRouter} from 'react-router-dom';

const EstateList = ({
    estates: {count, data},
    loading,
    getEstates,
    findEstatesInRadius,
    selectedEstate,
    deleteEstate,
    location,
    history,
    prompt,
}) => {
    useEffect(() => {
        getEstates();
    }, [getEstates]);
    return loading ? (
        <Spinner />
    ) : (
        <div className='estates-container'>
            {prompt.show && (
                <Prompt
                    type={`delete`}
                    callback={() => {
                        deleteEstate(
                            selectedEstate,
                            location.pathname,
                            history
                        );
                    }}
                />
            )}
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
    selectedEstate: state.estate.selectedEstate,
    prompt: state.prompt,
});

export default connect(mapStateToProps, {
    getEstates,
    findEstatesInRadius,
    deleteEstate,
})(withRouter(EstateList));
