import React from 'react';
import './Spinner.scss';
const Spinner = () => {
    return (
        <div
            style={{
                width: '100px',
                height: '100px',
                display: 'block',
                margin: 'auto',
            }}
        >
            <svg
                width='100%'
                height='100%'
                viewBox='0 0 340 340'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='spinner-ellipse'
            >
                <circle
                    cx='170'
                    cy='170'
                    r='168.5'
                    stroke='#fff'
                    strokeWidth='8'
                />
            </svg>
        </div>
    );
};

export default Spinner;
