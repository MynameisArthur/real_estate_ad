import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteOffer} from '../../actions/offer';
import PropTypes from 'prop-types';
import Prompt from '../Prompt/Prompt';

const UserOffers = ({offers, deleteOffer}) => {
    const [prompt, setPrompt] = useState({
        show: false,
        confirm: false,
        promptMsg: '',
    });
    const [offerId, setOfferId] = useState(null);
    const [offerList, setOfferList] = useState(offers);
    const {show, confirm, promptMsg} = prompt;
    useEffect(() => {
        if (confirm) {
            deleteOffer(offerId);
        }
    }, [confirm, offerList]);
    const handleDelete = (id) => {
        setPrompt({...prompt, show: true, promptMsg: 'delete offer'});
        setOfferId(id);
    };
    const handleConfirm = () => {
        setOfferList(offerList.filter((item) => item._id !== offerId));
        setPrompt({...prompt, confirm: true, show: false});
    };
    const hidePrompt = () => {
        setPrompt({...prompt, show: false});
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
            {show && (
                <Prompt
                    msg={promptMsg}
                    toggleConfirm={handleConfirm}
                    toggleShow={hidePrompt}
                />
            )}
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
    deleteOffer: PropTypes.func.isRequired,
};

export default connect(null, {deleteOffer})(UserOffers);
