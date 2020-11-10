import React, {useState} from 'react'
import {Redirect, useHistory } from 'react-router-dom';
import Layout from '../Layout';
import { isAuthenticated } from '../../models/auth/api'
import { Link } from 'react-router-dom';
import {PUBLIC_URL} from '../../config';
import { createCategory } from '../../models/products/api'

const initialState = {
  productGroupName: '',
  description: '',
  context: '',
  context1: '',
  pictures: []
}
const AddCategory = () => {
    const [values, setValues] = useState(initialState);
    const { productGroupName,
            description,
            context,
            context1,
            slug,
            pictures
          } = values;

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const history = useHistory();
    //destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = name => e => {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    const clickSubmit = (e) => {
      e.preventDefault();
      setError('');
      setSuccess(true);
      createCategory(user._id, token, values)
      .then(data => {
          if(data.data.error) {
            setError(data.data.error);
            setLoading(false)
          }
          else {
            history.push('/admin/category/categorysearch')
          }
      })
      .catch(error => setError(error))
    }
    const newCategotyForm = () => (
      <form onSubmit={clickSubmit}>
          <div className="form-group">
              <label htmlFor="formCategoryName">Tên nhóm sản phẩm</label>
              <input onChange={handleChange('productGroupName')} name="productGroupName" value={productGroupName} autoFocus required type="text" className="form-control" id="formCategoryName" placeholder="Tên nhóm sản phẩm" />
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Lưu dữ liệu </button>
          </div>
      </form>
    )
    const showError = () => {
      if(error) {
        return <div className="alert alert-danger"> <b>{productGroupName}</b> should be unique. {error}</div>
      }
    }

    const toolBar = () => (
      <div className="row mb-2">
        <div className="col-auto">
          <div className="btn-group">
            <Link to="/admin/category/create">
              <button type="button" className="btn btn-light border" ><i className="fa fa-plus-square text-primary" /></button>
            </Link>
            <button type="button" className="btn btn-light border" ><i className="fa fa-minus-square text-danger" /></button>
            <Link onClick={()=> history.push("/admin/category/categorysearch")}>
              <button type="button" className="btn btn-light border" ><i className="fa fa-search text-success" /></button>
            </Link>
          </div>
        </div>
      </div>
    )
    return (
      <Layout title="Category Insert" className="container pl-0 pr-0 pt-3 pb-2">
        {toolBar()}
        {showError()}
        {newCategotyForm()}
      </Layout>
    );
};

export default AddCategory;
