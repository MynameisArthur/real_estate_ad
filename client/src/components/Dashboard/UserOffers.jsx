import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectOffer} from '../../actions/offer';

const UserOffers = ({offers, selectOffer}) => {
    const [offerList, setOfferList] = useState(offers);   
  
    const handleDelete = (id) => {
        selectOffer(id);
    };
    
    const styles = {
        deleteBtn: {
            color: '#fff',
            backgroundColor: 'red',
            margin: '0 0.5em',
            fontWeight: 700,
            fontSize: '1.6rem',
        },
        editBtn: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '0 0.5em',
            fontWeight: 500,
        },
        gotoBtn: {
            color: '#fff',
            backgroundColor: 'blue',
            margin: '0 0.5em',
            fontWeight: 400,
        },
    };
    return (
        <div className='user-offers'>            
            {offerList.length > 0 &&
                offerList.map((item) => (
                    <div className='user-offers_offer' key={item._id}>
                        <h5>Offer Title:{item.title}</h5>
                        <p>Offer Description: {item.description}</p>
                        <div>Amount Offered: ${item.amountOffered}</div>
                        <p>Comment added at: {item.createdAt}</p>
                        <Link
                            to={`/estate/${item.estate}`}
                            style={styles.gotoBtn}
                        >
                            Go to estate &rarr;
                        </Link>
                        <Link
                            to={`/estate/${item.estate}/offer/${item._id}`}
                            style={styles.editBtn}
                        >
                            Edit Offer
                        </Link>
                        <button
                            onClick={() => handleDelete(item._id)}
                            style={styles.deleteBtn}
                        >
                            Delete Offer
                        </button>
                    </div>
                ))}
        </div>
    );
};

UserOffers.propTypes = {
    selectOffer: PropTypes.func.isRequired,
};

export default connect(null, {selectOffer})(UserOffers);
