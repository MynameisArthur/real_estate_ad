import React from 'react';
import './Estate.scss';

const Estate = ({estate}) => {
    return (
        <div className='estate-container'>
            <h3 className='estate-name'>{estate.name}</h3>
            <p className='estate description'>{estate.description}</p>
            <div className='estate-address'>{estate.address}</div>
            <ul className='estate-photos'>
                {estate.photos.map((photo, index) => (
                    <li key={`${estate._id}_${index + 1}`}>
                        <img
                            src={photo}
                            alt={`${estate.name}-view#${index + 1}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Estate;
