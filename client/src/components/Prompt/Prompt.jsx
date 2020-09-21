import React from 'react';
import './Prompt.scss';
import {confirmPrompt, cancelPrompt} from '../../actions/prompt';
import {connect} from 'react-redux';

const Prompt = ({type, confirmPrompt, cancelPrompt, callback}) => {
    const handleCancel = () => {
        cancelPrompt();
    };
    const handleConfirm = async () => {
        await callback();
        confirmPrompt();
    };
    return (
        <div className='prompt'>
            <div className='prompt-container'>
                <h3>Are you sure you want {type}?</h3>
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

const mapStateToProps = (state) => ({});

export default connect(null, {
    confirmPrompt,
    cancelPrompt,
})(Prompt);
