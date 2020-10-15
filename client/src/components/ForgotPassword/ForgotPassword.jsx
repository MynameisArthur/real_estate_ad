import React, {useState} from 'react';
import {forgotPassword} from '../../actions/auth';
import {connect} from 'react-redux';

const ForgotPassword = ({forgotPassword}) => {
    const [formData, setFormData] = useState({
        email: '',
    });
    const {email} = formData;
    const handleChange = (e) => {
        setFormData({email: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPassword(email);
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

export default connect(null, {forgotPassword})(ForgotPassword);
