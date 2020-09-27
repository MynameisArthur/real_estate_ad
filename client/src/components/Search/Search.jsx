import React, {useState} from 'react';
import './Search.scss';

const Search = ({search}) => {
    const initialState = {
        distance: 0,
        zipcode: '',
        unit: 'miles',
    };
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        search(formData);
        setFormData(initialState);
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const {zipcode, distance} = formData;
    return (
        <div className='search-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>
                        City,state/Zipcode
                        <input
                            type='text'
                            name='zipcode'
                            value={zipcode}
                            onChange={(e) => handleChange(e)}
                            required
                            placeholder='city,state/zipcode'
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
                <button type='submit' className='btn'>
                    Search
                </button>
            </form>
        </div>
    );
};

export default Search;
