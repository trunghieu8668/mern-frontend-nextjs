import React, { Suspense, useState, useEffect } from 'react'
import Layout from '../Layout'
import { isAuthenticated } from '../../models/auth/api'
import { Link } from 'react-router-dom'
import { deleteProduct, totalProducts, getFilteredProducts } from '../../models/products/api'
import NumberFormat from 'react-number-format'
import ReactPaginate from 'react-paginate';
import { PAGESIZE } from '../../config'
import moment from 'moment'
import { Edit, Trash2, Eye } from 'react-feather'
// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div></div>;
const ToolbarProduct = React.lazy(()=> import('./ToolbarProduct'))


const ProductSearch = () => {
  const [products, setProducts] = useState([])
  const {user, token} = isAuthenticated()
  const [error, setError] = useState(false)
  // paging
  const [total, setTotal] = useState('')
  const [myFilters, setMyFilters] = useState({
      filters: { category: [], price: [] }
  })
  const [limit, setLimit] = useState(PAGESIZE)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1)

  const totalItem = async () => {
    totalProducts().then(data => {
      if(data.error) {
        console.log(data.error);
      }
      else {
        setTotal(data.data)
      }
    })
  }

  const loadFilteredResults = async (skip, limit, myFilters) => {
    getFilteredProducts(skip, limit, myFilters)
    .then(data => {
      if(data.data.error) {
        setError(data.data.error)
      }
      else {
        setProducts(data.data.data)
        setSize(data.data.size)
        setTotal(data.data.totalCount)
        setPageCount(Math.ceil(data.data.totalCount / limit))
      }
    })
  }

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

  const handlePageClick = (products) => {
    let selected = products.selected;
    let offset = Math.ceil(selected * limit);
    let toSkip = offset;
    setCurrentPage(selected)
    getFilteredProducts(toSkip, limit, myFilters.filters)
    .then(data => {
       if(data.data.error) {
           setError(data.data.error)
       }
       else {
         setProducts(data.data.data)
         setSize(data.data.size)
         setTotal(data.data.totalCount)
         setSkip(offset)
       }
     })
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters
    setSkip(0)
    setCurrentPage(0)
    loadFilteredResults(skip, limit, newFilters.filters)
    setMyFilters(newFilters)
  }

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  useEffect(() => {
    totalItem()
  }, [])

  return (
    <Layout title="Product Manage" className="container pl-0 pr-0 pt-3 pb-2">
      <Suspense fallback={loading()}>
        <ToolbarProduct handleCategories={filters => handleFilters(filters, "category")}/>
      </Suspense>
      {showError()}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th className="font-weight-bold" scope="col">#</th>
              <th className="font-weight-bold" scope="col">Tên sản phẩm</th>
              <th className="font-weight-bold" scope="col">Giá gốc</th>
              <th className="font-weight-bold" scope="col">Giá đại lý</th>
              <th className="font-weight-bold" scope="col">Giá web</th>
              <th className="font-weight-bold" scope="col">Giá ảo</th>
              <th className="font-weight-bold" scope="col">Category</th>
              <th className="font-weight-bold" scope="col">Trạng thái</th>
              <th className="font-weight-bold" scope="col">Xem</th>
              <th className="font-weight-bold" scope="col">Ngày tạo</th>
              <th className="font-weight-bold" scope="col">Ngày cập nhật</th>
              <th className="font-weight-bold" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
              {
                products && products.length && products.map((p, i)=> (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <Link to={`/admin/product/update/${p._id}`}>
                        {p.productName}
                      </Link>
                    </td>
                    <td><NumberFormat value={p.productPriceOld} displayType={'text'} thousandSeparator={true} prefix={''} suffix={''}/></td>
                    <td><NumberFormat value={p.productPriceAgent} displayType={'text'} thousandSeparator={true} prefix={''} suffix={''}/></td>
                    <td><NumberFormat value={p.productPriceNew} displayType={'text'} thousandSeparator={true} prefix={''} suffix={''}/></td>
                    <td><NumberFormat value={p.productPriceVirtual} displayType={'text'} thousandSeparator={true} prefix={''} suffix={''}/></td>
                    <td>{p.category && typeof p.category !== null ? p.category.productGroupName : ''}</td>
                    <td>{p.status ? <span className="badge badge-success">Còn hàng</span> : <span className="badge badge-danger">Hết hàng</span> }</td>
                    <td>{p.visit}</td>
                    <td className="font-size-12">{moment(p.createdAt).format('DD/MM/YYYY | hh:mm:ss')}</td>
                    <td className="font-size-12">{moment(p.updatedAt).format('DD/MM/YYYY | hh:mm:ss')}</td>
                    <td className="text-nowrap">
                      <Link to={`/admin/product/update/${p._id}`}>
                        <span className="btn btn-outline-success p-1 circle-35 rounded-circle"><Edit size={15}/></span>
                      </Link>
                      <span onClick={()=> detroy(p._id)} className="btn btn-outline-danger p-1 circle-35 rounded-circle ml-1 mr-1"><Trash2 size={15}/></span>
                      <Link to={`/product/${p._id}`} target="_blank">
                        <span className="btn btn-outline-primary p-1 circle-35 rounded-circle"><Eye size={15}/></span>
                      </Link>
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <div role="status">{(skip > (skip + size)) || ((skip + size) === 0) ? 0 : (skip+1) } - {(skip + size) < total ? (skip + size) : total} của {total}
          </div>
        </div>
        <div className="col-sm-12 col-md-7">
        {
          0 < pageCount && (<ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            breakLabel={'...'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            pageCount={pageCount}
            forcePage={currentPage}
            marginPagesDisplayed={3}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={'pagination float-right'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            disabledClassName="disabled"
          />)
        }
        </div>
      </div>
    </Layout>
  )
}

export default ProductSearch
