import React, {useState} from 'react';
import {setAlert} from '../../actions/alert';
import {sendNewPassword} from '../../actions/auth';
import {connect} from 'react-redux';

const NewPassword = ({setAlert, match, sendNewPassword}) => {
    const [formData, setFormData] = useState({
        password1: '',
        password2: '',
    });
    const {resetToken} = match.params;
    const {password1, password2} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            sendNewPassword(resetToken, password1);
        }
    };
    return (
        <>
            <h3>Enter your new password.</h3>
            <form className='container' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <span>New Password: </span>
                    <input
                        type='password'
                        name='password1'
                        value={password1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <span>Repeat New Password: </span>
                    <input
                        type='password'
                        name='password2'
                        value={password2}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='btn'>Send</button>
            </form>
        </>
    );
};

export default connect(null, {setAlert, sendNewPassword})(NewPassword);
