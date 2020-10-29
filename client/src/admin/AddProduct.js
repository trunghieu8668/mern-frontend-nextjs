import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'
// Step 13 getCategories
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {
    const {user, token} = isAuthenticated()
    // step 1
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    // step 2
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,photo,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;
    // Step 14
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            }
            else{
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }
    // step 7
    useEffect(()=> {
        // Step 15 hidden
        //setValues({ ...values, formData: new FormData() })
        // Step 16
        init()
    }, [])
    // step 4
    const handleChange = name => event => {
        // step 5
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        // step 8
        formData.set(name, value);
        // step 6
        setValues({...values, error: false, createdProduct: '', [name]: value})
    }
    // Step 10
    const clickSubmit = (event) => {
        //Step 11
        event.preventDefault()
        setValues({ ... values, error: '', loading: true})
        // Step 12
        createProduct(user._id, token, formData)
        .then((data)=> {
            if(data.error) {
                setValues({...values, error: data.error})
            }
            else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
        .catch(err => console.log(err))
    }
    // Step 18
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    // Step 19
    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            {`${createdProduct}`} is created
        </div>
    )
    // Step 20
    const showLoading = () =>(
        loading && (<div className="alert alert-success">Loading...</div>)
    )
    // step 3
    const newPostForm = () => (
        // Step 9 onSubmit={clickSubmit}
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-row mb-3">
                <div className="col">
                    <label>Picture</label>
                </div>
                <div className="col-lg-12">
                    <label className="btn btn-secondary">
                        <input type="file" onChange={handleChange('photo')} name="photo" className="form-control-file" accept="image/*"/>
                    </label>
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col">
                    <label>Product name</label>
                </div>
                <div className="col-lg-12">
                    <input type="text" className="form-control form-control-lg" onChange={handleChange('name')} value={name} placeholder="Product name" required/>
                </div>
            </div>
            <div className="form-group">
                <label>Dectiption</label>
                <textarea className="form-control" onChange={handleChange('description')} value={description} placeholder="Description"></textarea>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" onChange={handleChange('price')} value={price} placeholder="Price"/>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select className="custom-select d-block w-100" onChange={handleChange('category')} required>
                    <option value="0">Select</option>
                    {/* Step 17 */}
                    {
                        categories && categories.map((c, i) => {
                            return <option value={c._id} key={i}>{c.name}</option>
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select className="custom-select d-block w-100" onChange={handleChange('shipping')}>
                    <option> Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} placeholder="Quantity"/>
            </div>
            <div className="text-center">
                <button className="btn btn-info btn-lg btn-block active">Submit</button>
            </div>
        </form>
    )
    return (
        <Layout title="Add a new product" description={`Good day ${user.name}, ready to add a new product`} className="container">
            <div className="row">

                <div className="col-md-10 offset-md-1">
                    {/* Step 21 */}
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {/* Step 3.1 */}
                    {newPostForm()}
                </div>
            </div>

        </Layout>
    );
}

export default AddProduct
