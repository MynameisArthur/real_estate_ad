import React from 'react';
import './Offer.scss';
import {useParams} from 'react-router-dom';
const Offer = ({props}) => {
    const {id} = useParams();
    return <div>Offer for estate {id}</div>;
};

export default Offer;
