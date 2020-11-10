import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Select from 'react-select';
import { getCategories } from '../../models/products/api'


const ToolbarProduct = ({handleCategories}) => {
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [error, setError] = useState(false)
  const history = useHistory();
  const init = () => {
      getCategories().then(data => {
          if(data.data.error) {
            setError(data.error)
          }
          else{
            setCategories(data.data)
          }
      })

  }
  useEffect(()=>{
    init()
    if(selectedCategories === null)
      handleCategories([])
    else handleCategories(selectedCategories.value)
  }, [selectedCategories])

  const options = categories.map(
    versions => ({value: versions._id, label: versions.name})
  );

  return (
    <div className="row mb-2">
      <div className="col-auto">
        <div className="btn-group">
          <Link to="/admin/product/create">
            <button type="button" className="btn btn-light border" ><i className="fa fa-plus-square text-primary" /></button>
          </Link>
          <button type="button" className="btn btn-light border" ><i className="fa fa-minus-square text-danger" /></button>
          <Link onClick={()=> history.push("/admin/product/productsearch")}>
            <button type="button" className="btn btn-light border" ><i className="fa fa-search text-success" /></button>
          </Link>
        </div>
      </div>
      <div className="flex-grow-1">
      <Select
        className="react-select"
        classNamePrefix="react-select"
        placeholder="Nhóm sản phẩm"
        isClearable
        isSearchable
        onChange={setSelectedCategories}
        options={options}></Select>
      </div>
      <div className="col-auto">
        <div className="input-group">
          <input id="Keyword-Filter" className="form-control" placeholder="Tìm kiếm" type="text" />
        </div>
      </div>
    </div>

  )
}

export default ToolbarProduct
