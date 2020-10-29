import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'
import NumberFormat from 'react-number-format';

const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const {user, token} = isAuthenticated()

  const loadProducts = () => {
    getProducts().then((data)=> {
      if(data.error) {
        console.log(data.error);
      }
      else {
        setProducts(data)
      }
    })
  }

  const detroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      }
      else {
        loadProducts()
      }
    })
  }

  useEffect(()=> {
    loadProducts()
  }, [])
  return (
      <Layout title="Manage Products" description="Perform CRUD on products" className="container">
          <h2 className="mb-4">Manage Products</h2>
          <div className="row">
            <div className="col-12">
              <h3 className="text-left small">Total {products.length} products</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-weight-bold" scope="col">#</th>
                    <th className="font-weight-bold" scope="col">Product Name</th>
                    <th className="font-weight-bold" scope="col">Price</th>
                    <th className="font-weight-bold" scope="col">Category</th>
                    <th className="font-weight-bold" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      products.map((p, i)=> (
                        <tr key={i}>
                          <th scope="row">{i +1}</th>
                          <td>
                            <Link to={`/admin/product/update/${p._id}`}>
                              {p.name}
                            </Link>
                          </td>
                          <td><NumberFormat value={p.price} displayType={'text'} thousandSeparator={true} prefix={''} suffix={''}/></td>
                          <td>{p.category.name}</td>
                          <td>
                            <Link to={`/admin/product/update/${p._id}`}>
                              <span className="badge badge-info badge-pill">Update</span>
                            </Link>
                            <span onClick={()=> detroy(p._id)} className="ml-2 badge badge-danger badge-pill">Delete</span>
                            <Link to={`/product/${p._id}`} target="_blank">
                              <span className="badge badge-link badge-pill">Link</span>
                            </Link>
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
            </div>
          </div>
      </Layout>
  )
}

export default ManageProducts
