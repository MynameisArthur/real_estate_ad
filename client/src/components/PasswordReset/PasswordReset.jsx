import React, {useState} from 'react';
import {resetPassword} from '../../actions/auth';
import {connect} from 'react-redux';

const PasswordReset = ({resetPassword}) => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const {email} = formData;
    const handleChange = (e) => {
        setFormData({email: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword(email);
    };
    return (
        <form className='container' onSubmit={handleSubmit}>
            <label>
                <span>Your Email: </span>
                <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                />
            </label>
            <button className='btn'>Send</button>
        </form>
    );
};

export default connect(null, {resetPassword})(PasswordReset);
