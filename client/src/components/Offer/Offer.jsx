import React, {useState, useEffect} from 'react';
import './Offer.scss';
import {useParams, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addOffer} from '../../actions/offer';
import {getEstate} from '../../actions/estate';
import PropTypes from 'prop-types';

const Offer = ({estate, addOffer, getEstate, history}) => {
    const {id} = useParams();
    const [offerDetails, setOfferDetails] = useState({
        amount: 0,
    });
    const loadData = async () => {
        const res = await getEstate(id);
        console.log(res.data);
    };
    useEffect(() => {
        loadData();
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();
        addOffer(id, amount, history);
    };
    const handleChange = (e) => {
        setOfferDetails({...offerDetails, [e.target.name]: e.target.value});
    };
    const {amount} = offerDetails;
    return (
        <form onSubmit={(e) => onSubmit(e)} className='form'>
            <div className='form-group'>
                <label>
                    Money offered
                    <input
                        type='number'
                        name='amount'
                        value={amount}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
            </div>
            <button type='submit' className='btn btn-addOffer'>
                Submit Offer
            </button>
        </form>
    );
};

Offer.propTypes = {
    addOffer: PropTypes.func.isRequired,
    getEstate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    estate: state.estate,
});

export default connect(mapStateToProps, {addOffer, getEstate})(
    withRouter(Offer)
);
