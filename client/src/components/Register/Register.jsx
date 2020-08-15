import React, {useState} from 'react';
import './Register.scss';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({setAlert}) => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        password2: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const {name, email, password, password2} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log('success');
            setFormData(initialFormData);
        }
    };

    return (
        <>
            <h2>Sign up</h2>
            <p>Create you account</p>
            <form onSubmit={(e) => onSubmit(e)} className='form'>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => handleChange(e)}
                        required
                        minLength='6'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={(e) => handleChange(e)}
                        required
                        minLength='6'
                    />
                </div>
                <input type='submit' value='Register' />
            </form>
            <p>
                Already have an account? <Link to='/login'>Sign in</Link>
            </p>
        </>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, {setAlert})(Register);
