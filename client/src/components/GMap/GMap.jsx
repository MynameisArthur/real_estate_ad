import React, {useEffect} from 'react';
import './GMap.scss';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const GMap = ({address, location: {coordinates}}) => {
    const mapStyles = {
        height: '300px',
        width: '100%',
    };

    const center = {
        lat: coordinates[1] || 52.237049,
        lng: coordinates[0] || 21.017532,
    };
    return (
        <div className='map-container' id='google-map'>
            <LoadScript>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={8}
                    center={center}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default GMap;
