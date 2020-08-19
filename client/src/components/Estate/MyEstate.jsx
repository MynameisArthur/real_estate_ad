import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {uploadPhoto} from '../../actions/estate';
const MyEstate = ({WrappedComponent, uploadPhoto, ...props}) => {
    const [formData, setFormData] = useState({
        photos: [],
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        uploadPhoto(props.estate._id, formData);
    };

    return (
        <div>
            <h4>This is MyEstate</h4>
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

export default connect(null, {uploadPhoto})(MyEstate);
