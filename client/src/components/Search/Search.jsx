import React, {useState} from 'react';
import './Search.scss';

const Search = ({search}) => {
    const initialState = {
        distance: 0,
        zipcode: '',
        unit: 'miles',
        price: 0,
        area: 0
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
    const {zipcode, distance, price, area} = formData;
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
                <div className="form-group">
                    <label>
                        Price
                        <input type="number" name="price" value={price} onChange={(e) => handleChange(e)}/>
                    </label>
                </div>            
                <div className="form-group">
                    <label>
                        Area
                        <input type="number" name="area" value={area} onChange={(e) => handleChange(e)}/>
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
