import React, {useState} from 'react';
import './Login.scss';
import {Link} from 'react-router-dom';

const Login = () => {
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
    };

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
                <input type='submit' value='Login' />
            </form>
            <p>
                Already have an account? <Link to='/login'>Sign in</Link>
            </p>
        </>
    );
};

export default Login;
