import React, {useState, useEffect} from 'react';
import './Register.scss';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register, updateUser} from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({
    setAlert,
    register,
    updateUser,
    isAuthenticated,
    edit = false,
    profile = null,
}) => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        password2: '',
        userId: null,
    };
    const [formData, setFormData] = useState(initialFormData);
    const loadData = () => {
        if (profile) {
            setFormData({
                ...formData,
                name: profile.name,
                email: profile.email,
            });
        }
    };
    useEffect(() => {
        loadData();
    }, []);
    const {name, email, password, password2, userId} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            if (!edit) {
                register({name, email, password});
            } else {
                updateUser({name, email});
            }
        }
    };

    if (isAuthenticated && !edit) {
        return <Redirect to='/' />;
    }

    return (
        <>
            <h2>{!edit ? 'Sign up' : 'Edit profile'}</h2>
            <p>{!edit ? 'Create your account' : 'Edit your account'}</p>
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
                {!edit && (
                    <>
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
                    </>
                )}
                <button type='submit' className='btn'>
                    {!edit ? 'Register' : 'Update'}
                </button>
            </form>
            {!edit && (
                <p>
                    Already have an account? <Link to='/login'>Sign in</Link>
                </p>
            )}
        </>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {setAlert, register, updateUser})(
    Register
);
