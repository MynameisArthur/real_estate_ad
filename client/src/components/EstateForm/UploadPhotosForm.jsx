import React, {useState} from 'react';
import './EstateForm.scss';
import {connect} from 'react-redux';
import {uploadPhoto} from '../../actions/estate';

const UploadPhotosForm = ({id, uploadPhoto, updatePhotos}) => {
    const [photos, setPhotos] = useState('');
    const [photosNames, setPhotosNames] = useState([]);
    const [key, setKey] = useState(Math.random());
    //helper function that cleans input
    const resetInput = () => {
        let newKey;
        //generate newKey
        do {
            newKey = Math.random();
        } while (newKey === key);
        //change key in input so react rerenders it thus reseting FileList
        setKey(newKey);
        setPhotosNames([]);
        setPhotos('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        photos.forEach((item) => formData.append('file', item));
        const newPhotos = await uploadPhoto(id, formData);
        //function updating parent component - Estate, so after addition of new pictures it rerenders itself
        await updatePhotos(newPhotos.data);
        resetInput();
    };

    const handleChange = (e) => {
        setPhotos([...e.target.files]);
        const names = [...e.target.files].map((file) => file.name);
        setPhotosNames(names);
    };

    return (
        <div className='estate-uploadPhotos'>
            <form
                onSubmit={handleSubmit}
                className='form'
                encType='multipart/form-data'
            >
                <div className='form-group'>
                    {photosNames.length > 0 &&
                        photosNames.map((name) => <p key={name}>{name}</p>)}
                    <label>
                        ADD PHOTOS +
                        <input
                            type='file'
                            name='fileUpload'
                            onChange={handleChange}
                            multiple
                            required
                            key={key}
                        />
                    </label>
                </div>
                <button className='btn'>Add Photo</button>
            </form>
        </div>
    );
};

export default connect(null, {uploadPhoto})(UploadPhotosForm);
