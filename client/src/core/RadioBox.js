import React, { useState } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
    //Step 1
    const [value, setValue] = useState(0)
    // Step 3
    const handleChange = (event) => (
        handleFilters(event.target.value),
        setValue(event.target.value)
    )
    // Step 2
    return prices.map((e, i) => (
        <div className="custom-control custom-radio radiobox-item mb-1 mt-1" key={i}>
            <input value={`${e._id}`} onChange={handleChange} id={`customRadio${i}`} type="radio" name="customRadio" className="custom-control-input"/>
            <label className="custom-control-label" htmlFor={`customRadio${i}`}>{e.name}</label>
        </div>
    ))
};

export default RadioBox;
