import React, {useState, useEffect} from 'react';
import './Offer.scss';
import {useParams, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addOffer} from '../../actions/offer';
import {getEstate} from '../../actions/estate';
import PropTypes from 'prop-types';

const Offer = ({estate, offer, addOffer, getEstate, history}) => {
    const {id} = useParams();
    const [offerDetails, setOfferDetails] = useState({
        amountOffered: 0,
        title: '',
        description: '',
    });
    const loadData = async () => {
        const res = await getEstate(id);
        if (res.data.offers.length > 0) {
            const highest = Math.max(
                ...res.data.offers.map((offer) => offer.amountOffered)
            );
            setOfferDetails({
                title: '',
                description: '',
                amountOffered: highest,
            });
        } else {
            setOfferDetails({
                title: '',
                description: '',
                amountOffered: res.data.startingPrice,
            });
        }
    };
    useEffect(() => {
        loadData();
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();
        addOffer(id, offerDetails, history);
    };
    const handleChange = (e) => {
        setOfferDetails({...offerDetails, [e.target.name]: e.target.value});
    };
    const {amountOffered, description, title} = offerDetails;
    return (
        <form onSubmit={(e) => onSubmit(e)} className='form'>
            <div className='form-group'>
                <label>
                    Title
                    <input
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
                <div className='form-group'>
                    <label>
                        Description
                        <textarea
                            name='description'
                            value={description}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                </div>
                <label>
                    Money offered
                    <input
                        type='number'
                        name='amountOffered'
                        value={amountOffered}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
            </div>
            <button
                className='btn'
                onClick={(e) => {
                    e.preventDefault();
                    history.go(-1);
                }}
            >
                &larr; Go Back
            </button>
            <button type='submit' className='btn btn-addOffer'>
                Submit Offer
            </button>
        </form>
    );
};

Offer.propTypes = {
    addOffer: PropTypes.func.isRequired,
    getEstate: PropTypes.func.isRequired,
    offer: PropTypes.object.isRequired,
    estate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    estate: state.estate,
    offer: state.offer,
});

export default connect(mapStateToProps, {addOffer, getEstate})(
    withRouter(Offer)
);
