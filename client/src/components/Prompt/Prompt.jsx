import React from 'react';
import './Prompt.scss';
import {confirmPrompt, cancelPrompt} from '../../actions/prompt';
import {connect} from 'react-redux';
import {deleteEstate} from '../../actions/estate';
import {deleteComment} from '../../actions/comment';
import {deleteOffer} from '../../actions/offer';
import {withRouter} from 'react-router-dom';

const Prompt = ({
    action,
    type, 
    confirmPrompt,
    cancelPrompt,
    deleteEstate,
    deleteComment,
    deleteOffer,
    selectedEstate,
    selectedComment,
    selectedOffer,
    location,
    history}) => {
    let callback;
    
    if(type === 'estate'){
        console.log('selectedEstate');
        callback = () =>deleteEstate(selectedEstate, location.pathname, history);        
    }else if(type === 'comment'){
        console.log('selectedComment');
        callback = () =>deleteComment(selectedComment, location.pathname, history);       
    }else if(type === 'offer'){
        console.log('selectedOffer');
        callback = () =>deleteOffer(selectedOffer, location.pathname, history);        
    }
    const handleCancel = () => {       
        cancelPrompt(type);
    };
    const handleConfirm = () => {        
        callback();
        confirmPrompt(type);
    };
    return (
        <div className='prompt'>
            <div className='prompt-container'>
                <h3>Are you sure you want {action} this estate?</h3>
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

const mapStateToProps = state =>({
    type: state.prompt.type,
    selectedEstate: state.estate.selectedEstate,
    selectedOffer: state.offer.selectedOffer,
    selectedComment: state.comment.selectedComment
});

export default connect(mapStateToProps, {
    confirmPrompt,
    cancelPrompt,
    deleteEstate,
    deleteOffer,
    deleteComment    
})(withRouter(Prompt));
