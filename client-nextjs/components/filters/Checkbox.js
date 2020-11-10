import React, { useState } from 'react';
const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])
    const handleToggle = c => () => {
      const currentCategoryId = checked.indexOf(c) // return the first index or -1
      const newCheckedCategoryId = [...checked]
      // if currently checked was not already in checked state > push
      // else pull/take off
      if(currentCategoryId === -1) {
        newCheckedCategoryId.push(c)
      } else {
        newCheckedCategoryId.splice(currentCategoryId, 1)
      }
      setChecked(newCheckedCategoryId)
      handleFilters(newCheckedCategoryId)
    }
    // Step 1
    return categories.map((e, i) => (
      <div className="custom-control custom-checkbox checkbox-item mb-1 mt-1" key={i}>
        <input value={checked.indexOf(e._id === -1 )} onChange={handleToggle(e._id)} id={`customCheck${i}`} type="checkbox" className="custom-control-input"/>
        <label className="custom-control-label" htmlFor={`customCheck${i}`}>{e.productGroupName}</label>
      </div>
    ))
};

export default Checkbox;
