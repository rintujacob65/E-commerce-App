import React, {useState, useEffect} from 'react';

const RadioBox = ({prices, handleFilters}) => {
    const [value,setValue] = useState(0);

    const handleChange = (e) => {
        handleFilters(e.target.value);
        setValue(e.target.value);
    }

    return prices.map((price,i) => (
        <div key={i}>
            <input 
                type="radio" 
                name={price}
                className="mr-2 ml-4"
                onChange={handleChange}
                value={`${price._id}`}
                />
            <label className="form-check-label">{price.name}</label>
        </div>
    ))
}

export default RadioBox;