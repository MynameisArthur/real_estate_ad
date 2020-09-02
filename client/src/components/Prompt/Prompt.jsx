import React from 'react';
import './Prompt.scss';
const Prompt = ({msg, toggleConfirm, toggleShow}) => {
    const handleConfirm = () => {
        toggleConfirm();
    };
    const handleCancel = () => {
        toggleShow();
    };
    return (
        <div className='prompt'>
            <div className='prompt-container'>
                <h3>Are you sure you want {msg}?</h3>
                <div className='prompt-container_buttons'>
                    <button style={{color: 'lightblue'}} onClick={handleCancel}>
                        CANCEL
                    </button>
                    <button style={{color: 'crimson'}} onClick={handleConfirm}>
                        YES
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Prompt;
