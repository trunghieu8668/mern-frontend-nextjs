import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { isAuthenticated } from '../../models/auth/api'
import { Link } from 'react-router-dom'
import { deleteProduct, totalProducts, getFilteredProducts } from '../../models/products/api'
import NumberFormat from 'react-number-format'
import Paginator from 'react-hooks-paginator';


const ProductSearch = () => {
  const [products, setProducts] = useState([])
  const {user, token} = isAuthenticated()
  const [error, setError] = useState(false)
  // paging
  const [total, setTotal] = useState('')
  const [myFilters, setMyFilters] = useState({
      filters: { category: [], price: [] }
  })
  const [limit, setLimit] = useState(4)
  const [skip, setSkip] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  const totalItem = () => {
    totalProducts().then(data => {
      if(data.error) {
        console.log(data.error);
      }
      else {
        setTotal(data)
      }
    })
  }
  const loadFilteredResults = (newFilters) => {
      getFilteredProducts(skip, limit, newFilters)
      .then(data => {
        if(data.error) {
          setError(data.error)
        }
        else {
          setProducts(data.data)
        }
      })
  }

  useEffect(() => {
    loadFilteredResults(skip, limit, myFilters.filters)
    totalItem()
  }, [skip])

  const detroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      }
      else {
        loadFilteredResults(skip, limit, myFilters.filters)
      }
    })
  }
  return (
    <Layout title="Signin" className="container">
      <h3> {total} </h3>
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
      <Paginator
        totalRecords={total}
        pageLimit={limit}
        pageNeighbours={2}
        setOffset={setSkip}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    {'currentPage' + currentPage} <br/>
  {'setCurrentPage' + pagePrev} <br/>
    {skip} - {skip + limit} of {total} items
    </Layout>
  )
}

export default ProductSearch
