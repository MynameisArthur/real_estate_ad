import React, {useState} from 'react';
import {connect} from 'react-redux';
import {uploadPhoto} from '../../actions/estate';
import {deleteEstate} from '../../actions/estate';
import {withRouter} from 'react-router-dom';
import './Estate.scss';
import PropTypes from 'prop-types';

const MyEstate = ({WrappedComponent, uploadPhoto, deleteEstate, ...props}) => {
    const id = props.estate._id;
    const [formData, setFormData] = useState({
        photos: [],
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        uploadPhoto(id, formData);
    };
    return (
        <div className='my-estate'>
            <WrappedComponent {...props} />
            <form
                onSubmit={(e) => onSubmit(e)}
                className='form'
                encType='multipart/form-data'
            >
                <div className='form-data'>
                    <input
                        type='file'
                        name='photos'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type='submit'>Upload Photo</button>
            </form>
        </div>
    );
};

MyEstate.propTypes = {
    uploadPhoto: PropTypes.func.isRequired,
    deleteEstate: PropTypes.func.isRequired,
};

export default connect(null, {uploadPhoto, deleteEstate})(withRouter(MyEstate));
