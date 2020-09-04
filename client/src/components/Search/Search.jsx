import React, {useState} from 'react';
import './Search.scss';

const Search = () => {
    const [formData, setFormData] = useState({
        distance: 0,
        zipcode: '',
        unit: 'miles',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const {zipcode, distance, unit} = formData;
    return (
        <div className='search-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>
                        Zipcode
                        <input
                            type='text'
                            name='zipcode'
                            value={zipcode}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Distance
                        <input
                            type='number'
                            name='distance'
                            value={distance}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <h5>Choose units</h5>
                    <label>
                        Miles
                        <input
                            type='radio'
                            name='unit'
                            value='miles'
                            checked={formData.unit === 'miles'}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <label>
                        Kilometers
                        <input
                            type='radio'
                            name='unit'
                            value='kilometers'
                            checked={formData.unit === 'kilometers'}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Search;
