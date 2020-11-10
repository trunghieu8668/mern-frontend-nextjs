import React, { Suspense, useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import Layout from '../Layout'
import { isAuthenticated } from '../../models/auth/api'
import { getCategories } from '../../models/products/api'
import NumberFormat from 'react-number-format'
import ReactPaginate from 'react-paginate';
import {PAGESIZE} from '../../config'

const CategorySearch = () => {
  const history = useHistory();
  const [category, setCategory] = useState({})
  const [loading, setLoading] = useState(false);
  return (
    <Layout title="Product Manage" className="container pl-0 pr-0 pt-3 pb-2">
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
    <div className="flex-grow-1"></div>

  </div>

    </Layout>
  )
}

export default CategorySearch
