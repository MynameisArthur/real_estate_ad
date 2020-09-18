import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEstate, getEstate, updateEstate} from '../../actions/estate';
import {withRouter} from 'react-router-dom';
import './EstateForm.scss';
const EstateForm = ({
    edit,
    addEstate,
    updateEstate,
    getEstate,
    history,
    match,
}) => {
    const {id} = match.params;
    const loadEstate = async () => {
        const estate = await getEstate(id);
        const {
            name,
            description,
            phone,
            email,
            startingPrice,
            houseArea,
            yardArea,
            bedrooms,
            bathrooms,
            photos,
            features,
        } = estate.data;
        setFormData({
            ...formData,
            name,
            description,
            phone,
            email,
            startingPrice,
            houseArea,
            yardArea,
            bedrooms,
            bathrooms,
            photos,
            features: features.join(),
            address: estate.data.location.formattedAddress,
        });
    };
    useEffect(() => {
        if (edit) {
            loadEstate();
        }
    }, []);

    const initialData = {
        name: '',
        description: '',
        phone: '',
        email: '',
        address: '',
        startingPrice: '500000',
        houseArea: 100,
        yardArea: 400,
        bedrooms: 5,
        bathrooms: 1,
        photos: [],
        features: '',
    };
    const [formData, setFormData] = useState(initialData);
    const {
        name,
        description,
        phone,
        email,
        address,
        startingPrice,
        houseArea,
        yardArea,
        bedrooms,
        bathrooms,
        photos,
        features,
    } = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            updateEstate({...formData, id}, history);
        } else {
            addEstate(formData, history);
        }
    };
    return (
        <form
            onSubmit={(e) => onSubmit(e)}
            className='form'
            encType='multipart/form-data'
        >
            <div className='form-group'>
                <label>
                    Estate name
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Estate description
                    <textarea
                        value={description}
                        name='description'
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Contact Phone
                    <input
                        type='text'
                        name='phone'
                        value={phone}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Contact email
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Estate's address
                    <input
                        type='text'
                        name='address'
                        value={address}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Starting Price
                    <input
                        type='number'
                        name='startingPrice'
                        value={startingPrice}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    House area
                    <input
                        type='number'
                        name='houseArea'
                        value={houseArea}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Yard area
                    <input
                        type='number'
                        name='yardArea'
                        value={yardArea}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Number of bedrooms
                    <input
                        type='number'
                        name='bedrooms'
                        value={bedrooms}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Number of bathrooms
                    <input
                        type='number'
                        name='bathrooms'
                        value={bathrooms}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='form-group'>
                <label>
                    Features
                    <textarea
                        name='features'
                        value={features}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            {/* <ul className='estate-photos'>
                {photos.map((photo, index) => {
                    const picProps = {photo, _id, index, name, user};
                    return (
                        <li key={`${_id}_${index + 1}`}>
                            <Picture
                                {...picProps}
                                updatePhotos={updatePhotos}
                            />
                        </li>
                    );
                })}
            </ul> */}
            <button
                className='btn'
                onClick={(e) => {
                    e.preventDefault();
                    history.go(-1);
                }}
            >
                &larr; Go Back
            </button>
            <button type='submit' className='btn btn-addEstate'>
                Submit Estate
            </button>
        </form>
    );
};

EstateForm.propTypes = {
    addEstate: PropTypes.func.isRequired,
    updateEstate: PropTypes.func.isRequired,
    getEstate: PropTypes.func.isRequired,
};

export default connect(null, {addEstate, updateEstate, getEstate})(
    withRouter(EstateForm)
);
