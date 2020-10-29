import React, { Suspense, useState, useEffect, useRef } from 'react'
import {Redirect} from 'react-router-dom';
import Layout from '../Layout';
import { isAuthenticated } from '../../models/auth/api'
import { Link } from 'react-router-dom';
import {PUBLIC_URL} from '../../config';
import { createCategory } from '../../models/products/api'
const AddCategory = () => {
    const [productGroupName, setProductGroupName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    //destructure user and token from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = e => (
        setError(),
        setProductGroupName(e.target.value)
    )
    const clickSubmit = (e) => (
        e.preventDefault(),
        setError(''),
        setSuccess(false),
        createCategory(user._id, token, {productGroupName})
        .then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setError('',
                setSuccess(true))
            }
        })
        .catch(err => {console.log(err)})

    )
    const newCategotyForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label htmlFor="formCategoryName">Name</label>
                <input onChange={handleChange} value={productGroupName} autoFocus required type="text" className="form-control" id="formCategoryName" placeholder="Name" />
            </div>
            <button className="btn btn-outline-info active">Create</button>
        </form>
    )
    const showSuccess = () => {
        if(success) {
            return <div className="alert alert-success">{productGroupName} is created</div>
        }
    }
    const showError = () => {
        if(error) {
        return <div className="alert alert-danger"> <b>{productGroupName}</b> should be unique. {error}</div>
        }
    }

    const goBack = () => (
        <div class="mt-3">
            <Link to="/admin/category/categorysearch" className="active btn btn-sm btn-outline-light">
                Trở lại Nhóm sản phẩm
            </Link>
        </div>
    )
    return (
        <Layout title="Add a new category" description={`Good day ${user.name}, ready to add a new category`} className="container">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    {newCategotyForm()}
                    {showSuccess()}
                    {showError()}
                    {goBack()}
                </div>
            </div>

        </Layout>
    );
};

export default AddCategory;
