import React, { useState } from 'react';
// Step 6 add handleFilters. filnal: ({categories, handleFilters})
const Checkbox = ({categories, handleFilters}) => {
    // Step 2
    const [checked, setChecked] = useState([])
    const handleToggle = c => () => {
        // Step 4
        const currentCategoryId = checked.indexOf(c) // return the first index or -1
        const newCheckedCategoryId = [...checked]
        // if currently checked was not already in checked state > push
        // else pull/take off
        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        //console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        // Step 7
        handleFilters(newCheckedCategoryId)
    }
    // Step 1
    return categories.map((e, i) => (        
        <div className="custom-control custom-checkbox checkbox-item mb-1 mt-1" key={i}>
            {/* // Step 3 onChange */}
            {/* // Step 5 value */}
            <input value={checked.indexOf(e._id === -1 )} onChange={handleToggle(e._id)} id={`customCheck${i}`} type="checkbox" className="custom-control-input"/>
            <label className="custom-control-label" htmlFor={`customCheck${i}`}>{e.name}</label>
        </div>
    ))
};

export default Checkbox;