import React from 'react';
import spinner from './spinner.gif';
const Spinner = () => {
    return (
        <>
            <img
                src={spinner}
                style={{
                    width: '100px',
                    height: '100px',
                    display: 'block',
                    margin: 'auto',
                }}
                alt='loading...'
            />
        </>
    );
};

export default Spinner;
