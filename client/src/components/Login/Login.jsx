import React, {useState} from 'react';
import './Login.scss';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <>
            <h2>Sign in</h2>
            <p>Login in to your account</p>
            <form onSubmit={(e) => onSubmit(e)} className='form'>
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
                <input type='submit' value='Login' className='btn' />
            </form>
            <p>
                Don't have an account? <Link to='/register'>Sign up</Link>
            </p>
            <p>
                Forgot password?{' '}
                <Link to='/forgotPassword'>Reset Password</Link>
            </p>
        </>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
