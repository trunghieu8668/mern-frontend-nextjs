import React, { Suspense, useState, useEffect } from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Layout from '../Layout'
import FileUpload from '../FileUpload'
import { isAuthenticated } from '../../models/auth/api'
import { Link } from 'react-router-dom'
import { getProduct, createProduct, getCategories, getStatusValues } from '../../models/products/api'
import NumberFormat from 'react-number-format'
import {PUBLIC_URL} from '../../config'
import LazyLoad from 'react-lazyload'
// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loader = () => <div></div>;
const Ckeditor = React.lazy(()=> import('../editor/Ckeditor'))

const initialState = {
  productName: '',
  productName2: '',
  productSerial: '',
  productPriceNew: 0,
  productPriceVirtual: 0,
  productPriceOld: 0,
  productPriceAgent: 0,
  slug: '',
  photo: '',
  category: '',
  quantity: 0,
  warranty: 0,
  sold: 0,
  visit: 0,
  topLevel: 1
}

const InsertProduct = () => {
  const [values, setValues] = useState(initialState)
  const [categories, setCategories] = useState([])
  const history = useHistory()
  const {
    productName,
    productName2,
    productSerial,
    description,
    context,
    context1,
    context2,
    context3,
    context4,
    context5,
    productPriceNew,
    productPriceVirtual,
    productPriceOld,
    productPriceAgent,
    slug,
    pictures,
    category,
    brand,
    productIds,
    productIds2,
    quantity,
    warranty,
    sold,
    tag,
    visit,
    vat,
    topLevel,
    status,
    status2,
  } = values
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusValues, setStatusValues] = useState([])
  const {user, token} = isAuthenticated()
  const init = () => {
    getCategories().then(data => {
      if(data.data.error) {
        setError(data.data.error)
      }
      else {
        setCategories(data.data)
      }
    })
  }

  useEffect(()=> {
    init()
    loadStatusValues()
  }, [])

  const handleChange = name => e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const handleChangeChecked = name => event => {
    const value = event.target.checked;
    setValues({...values, createdProduct: '', [name]: value})
  }
  const handleChangeCkeditor = (name, evt) => {
    setValues({...values, [name]: evt.editor.getData()});
  }

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      }
      else {
        setStatusValues(data.data)
      }
    })
  }

  const showStatus = o => (
    <div className="form-group">
      <label className="font-weight-bold">Trạng thái</label>
      <select value={status2} className="custom-select d-block w-100" onChange={handleChange('status2')}>
        {statusValues.map((status, index)=> (
          <option key={index} value={status}> {status} </option>
        ))}
      </select>
    </div>
  )
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  const clickSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    createProduct(user._id, token, values).then(data => {
      if(data.error) {
        setError(data.error);
        setLoading(false);
      }
      else {
        history.push('/admin/product/productsearch')
      }
    }).catch(error => setError(error))
  }
  const showCategory = () => (
    <>
      <label className="font-weight-bold">Nhóm sản phẩm</label>
      <select value={category} name="category" className="custom-select d-block w-100" onChange={handleChange('category')} required>
          <option value="0">Không chọn</option>
          {
            categories && categories.length > 0 && categories.map((c, i) => {
              return <option value={c._id} key={i}>{c.productGroupName}</option>
            })
          }
      </select>
    </>
  )

  const shouldRedirect = redirectToProductsList => {
    if(redirectToProductsList) return <Redirect to="/admin/product/productsearch"/>
  }

  const formInput = () => {
    return (
      <form onSubmit={clickSubmit}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Thông tin chính</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Hình ảnh</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Giới thiệu</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Mô tả</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab5" role="tab" aria-controls="tab5" aria-selected="false">Nội dung</a>
          </li>
        </ul>
        <div className="tab-content p-3 border-left border-right border-bottom" id="TabContent">
          <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab-1">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  {showCategory()}
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Tên sản phẩm</label>
                  <input type="text" className="form-control" name="productName" value={productName} autoFocus onChange={handleChange('productName')} required/>
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Serial</label>
                  <input type="text" className="form-control" name="productSerial" value={productSerial} onChange={handleChange('productSerial')} required/>
                </div>
                {showStatus()}
                <div className="form-group">
                  <label className="font-weight-bold w-100">Tình trạng</label>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="status1" value={true} checked={status === true ? true : null} name="status" className="custom-control-input" onChange={handleChange('status')} />
                    <label className="custom-control-label" htmlFor="status1">Còn hàng</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio"  id="status2" value={false} checked={status === false ? true : null} name="status" className="custom-control-input" onChange={handleChange('status')}/>
                    <label className="custom-control-label" htmlFor="status2">Hết hàng</label>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá gốc</label>
                      <NumberFormat value={productPriceOld} onValueChange={e => {setValues({...values, productPriceOld: e.floatValue})}} className="form-control" thousandSeparator={true} prefix={''} suffix={''}/>
                  </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá đại lý</label>
                      <NumberFormat value={productPriceAgent} onValueChange={e => { setValues({...values, productPriceAgent: e.floatValue})}} className="form-control" thousandSeparator={true} isNumericString={true}/>
                  </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá web</label>
                      <NumberFormat value={productPriceNew} onValueChange={e => {setValues({...values, productPriceNew: e.floatValue})}} className="form-control" thousandSeparator={true} prefix={''} suffix={''}/>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá ảo</label>
                      <NumberFormat value={productPriceVirtual} onValueChange={e => {setValues({...values, productPriceVirtual: e.floatValue})}} className="form-control" thousandSeparator={true} prefix={''} suffix={''}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">VAT</label>
                      <input checked={vat === true ? true : null} onChange={handleChangeChecked('vat')} type="checkbox" />
                      </div>
                  </div>
                  <div className="col-9">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label className="font-weight-bold">Số người xem</label>
                          <input type="text" className="form-control" value={visit} name="visit" onChange={handleChange('visit')}/>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="font-weight-bold">Số lượng</label>
                          <input type="text" className="form-control" value={quantity} name="quantity" onChange={handleChange('quantity')}/>
                        </div>
                      </div>
                      <div className="col">
                        <label className="font-weight-bold">Vị trí</label>
                        <select defaultValue="1" className="form-control" name="topLevel" value={topLevel} onChange={handleChange('topLevel')}>
                          <option value={-1}>-1</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                          <option value={11}>11</option>
                          <option value={12}>12</option>
                          <option value={13}>13</option>
                          <option value={14}>14</option>
                          <option value={15}>15</option>
                          <option value={16}>16</option>
                          <option value={17}>17</option>
                          <option value={18}>18</option>
                          <option value={19}>19</option>
                          <option value={20}>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="font-weight-bold">Tên sản phẩm 2</label>
                  <input type="text" className="form-control" name="productName2" value={productName2} onChange={handleChange('productName2')}/>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="font-weight-bold">Bảo hành(tháng)</label>
                      <input type="text" className="form-control" name="warranty" value={warranty} onChange={handleChange('warranty')}/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="font-weight-bold">Đã bán</label>
                      <input readOnly type="text" className="form-control" name="sold" value={sold} onChange={handleChange('sold')}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Tag</label>
                  <textarea className="form-control" name="tag" onChange={handleChange('tag')} value={tag} ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="tab2" role="tabpanel" aria-labelledby="tab-2">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              error={error}
            />
          </div>
          <div className="tab-pane" id="tab3" role="tabpanel" aria-labelledby="tab-3">
            <Suspense fallback={loader()}>
              <Ckeditor name={description} values={values.description} setValues={(data) => setValues({...values, description: data})}/>
            </Suspense>
          </div>
          <div className="tab-pane" id="tab4" role="tabpanel" aria-labelledby="tab-4">
            <Suspense fallback={loader()}>
              <Ckeditor name={context} values={values.context} setValues={(data) => setValues({...values, context: data})}/>
            </Suspense>
          </div>
          <div className="tab-pane" id="tab5" role="tabpanel" aria-labelledby="tab-5">
            <Suspense fallback={loader()}>
              <Ckeditor name={context1} values={values.context1} setValues={(data) => setValues({...values, context1: data})}/>
            </Suspense>
          </div>
        </div>
        <div className="text-center mt-3 mb-3">
          <button className={loading ? "btn btn-primary btn-inline-block disabled" : "btn btn-primary btn-inline-block"}><i className="fa fa-save"></i> Lưu sản phẩm</button>
        </div>
      </form>
    )
  }
  return (
    <Layout title="Product Insert" className="container pl-0 pr-0 pt-3 pb-2">
      {showError()}
      <h3 className="h6 w-100 mb-3">THÊM SẢN PHẨM</h3>
      {formInput()}
    </Layout>
  )
}

export default InsertProduct
