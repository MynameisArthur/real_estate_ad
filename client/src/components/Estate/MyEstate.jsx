import React, {useState} from 'react';
import {connect} from 'react-redux';
import {uploadPhoto} from '../../actions/estate';
import {Link} from 'react-router-dom';
import './Estate.scss';
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
            <Link to={`/editEstate/${props.estate._id}`} className='btn'>
                Edit Estate
            </Link>
        </div>
    );
};

export default connect(null, {uploadPhoto})(MyEstate);
