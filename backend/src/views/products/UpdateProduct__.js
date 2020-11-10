import React, { Suspense, useState, useEffect, useRef } from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../Layout'
import FileUpload from '../FileUpload'
import { isAuthenticated } from '../../models/auth/api'
import { Link } from 'react-router-dom'
import { getProduct, updateProduct, getCategories, getStatusValues } from '../../models/products/api'
import NumberFormat from 'react-number-format'
import {PUBLIC_URL} from '../../config'
import { configCkeditor } from '../../helpers'
import CKEditor from "ckeditor4-react";
import LazyLoad from 'react-lazyload'

const UpdateProduct = ({match}) => {
  const [values, setValues] = useState({
    productName: '',
    productName2: '',
    productSerial: '',
    productPriceNew: 0,
    productPriceVirtual: 0,
    productPriceOld: 0,
    productPriceAgent: 0,
    slug: '',
    photo: '',
    pictures: [],
    category: '',
    brand: [],
    productIds: [],
    productIds2: [],
    quantity: 0,
    warranty: 0,
    sold: 0,
    tag: '',
    visit: 0,
    vat: '',
    topLevel: 1,
    error: '',
    createdProduct: '',
    redirectToProductsList: false,
    formdata: ''
  })
  const [categories, setCategories] = useState([])
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
    alt,
    topLevel,
    error,
    status,
    status2,
    createdProduct,
    redirectToProductsList,
    formData
  } = values
   const [loading, setLoading] = useState(false);
  const [statusValues, setStatusValues] = useState([])
  const inputEl = useRef(null);
  const {user, token} = isAuthenticated()

  // const loading = () => {
  //   return <div className="loading">
  //     Loading...
  //   </div>
  // }
  const init = async (productId) => {
    setLoading(true);
    getProduct(productId).then((data) => {
      if(data.data.error) {
        setValues({...values, error: data.data.error})
      }
      else {
        setLoading(false);
        setValues({ ...values, ...data.data, formData: new FormData() });
      }
    })
  }
  const initCategories = async () => {
    setLoading(true);
    getCategories().then(data => {
        if(data.error) {
          setValues({ ...values, error: data.error })
        }
        else{
          setCategories(data)
          setLoading(false);
        }
    })
  }


  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    //console.log(...formData)

    setValues({...values, error: '', createdProduct: '', [name]: value})
  }

  const handleChangeChecked = name => event => {
    //console.log(event.target.checked);
    const value = event.target.checked;
    formData.set(name, value);
    //console.log(...formData)
    setValues({...values, error: '', createdProduct: '', [name]: value})
  }

  const handleChangeCkeditor = (name, evt) => {
    formData.set(name, evt.editor.getData());
    setValues({...values, [name]: evt.editor.getData()});
  }

  const uploadFile = name => event => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
       formData.append(`photo`, files[i])
    }
  }

  const loadStatusValues = async () => {
    getStatusValues(user._id, token).then(data => {      
      if(data.error) {
        setValues({...values, error: data.error})
      }
      else {
        setStatusValues(data)
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

  const showCategory = () => (
    <>
      <label className="font-weight-bold">Nhóm sản phẩm</label>
      <select value={category} name="category" className="custom-select d-block w-100" onChange={handleChange('category')} required>
          <option value="0">Không chọn</option>
          {
            categories && categories.map((c, i) => {
              return <option value={c._id} key={i}>{c.name}</option>
            })
          }
      </select>
    </>
  )
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  useEffect(()=> {
    setTimeout(() => {
      init(match.params.productId)
    }, 1000);

    initCategories();
    loadStatusValues()
  }, [])

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: '', loading: true})
    // createProduct(user._id, token, formData).then(data => {
    //   if(data.error) {
    //     setValues({...values, error: data.error})
    //   }
    //   else {
    //     setValues({...values,
    //       createdProduct: true,
    //       redirectToProductsList: true
    //     })
    //   }
    // }).catch(error => console.log(error))
    // console.log(formData.values());
    // inputEl.current.value;
    // console.log(inputEl.target.val());


    // const fields = Array.prototype.slice.call(event.target)
    //   .filter(el => el.name )
    //   .reduce((form, el) => ({
    //     ...values,
    //     [el.name]: el.name === 'photo' ? el.files[0] : el.value, formData: formData.set(el.name, (el.name === 'photo' ? el.files[0] : el.value))
    //   }), {})
    //console.log(...formData);

    updateProduct(match.params.productId, user._id, token, formData)
    .then((data)=> {
      if(data.error) {
        setValues({...values, error: data.error})
      }
      else {
        formData.delete('photo')
        setValues({...values,
          productName: '',
          description: '',
          photo: '',
          loading: false,
          createdProduct: true,
          redirectToProductsList: true,
        })
      }
    }).catch(error => console.log(error))
  }

  const redirectManageProduct = () => {
    if(redirectToProductsList){
      if(!error) {
        return <Redirect to="/admin/product/productsearch" />
      }
    }
  }

  const showSuccess = () => (
    <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
      {`${createdProduct}`} is created
    </div>
  )

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
                  <input type="text" className="form-control" name="productName" value={productName} onChange={handleChange('productName')} required/>
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
                      <NumberFormat value={productPriceOld} onValueChange={e => {formData.set('productPriceOld', e.floatValue); setValues({...values, productPriceOld: e.floatValue})}} className="form-control" thousandSeparator={true} prefix={''} suffix={''}/>

                  </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá đại lý</label>
                      <NumberFormat value={productPriceAgent} onValueChange={e => {formData.set('productPriceAgent', e.floatValue); setValues({...values, productPriceAgent: e.floatValue})}} className="form-control" thousandSeparator={true} isNumericString={true}/>
                  </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá web</label>
                      <NumberFormat value={productPriceNew} onValueChange={e => {formData.set('productPriceNew', e.floatValue); setValues({...values, productPriceNew: e.floatValue})}} className="form-control" thousandSeparator={true} prefix={''} suffix={''}/>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá ảo</label>
                      <NumberFormat value={productPriceVirtual} onValueChange={e => {formData.set('productPriceVirtual', e.floatValue); setValues({...values, productPriceVirtual: e.floatValue})}} className="form-control" thousandSeparator={true} prefix={''} suffix={''}/>
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
                <div className="form-group">
                  <label className="font-weight-bold">Hình ảnh</label>
                  <input type="file" onChange={uploadFile('photo')} className="form-control-file" multiple accept="image/x-png,image/gif,image/jpeg"/>
                </div>
                {pictures && pictures.length ? (
                  <div className="form-group mt-4">
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 d-flex align-items-stretch align-items-center">
                      {
                        pictures.map((e,i)=> (
                          <div className="col" key={i}>
                            <img className="img-fluid" src={e}/>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ) : ''}

              </div>
            </div>
          </div>
          <div className="tab-pane" id="tab2" role="tabpanel" aria-labelledby="tab-2">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
              formData={formData}
            />
          {JSON.stringify(pictures)}
            <div className="row">
              <div className="col-md-4">
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" /><br />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
              </div>
              <div className="col-md-4">
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 0</button>
                  </span>
                  <input id="Picture" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 1</button>
                  </span>
                  <input id="Picture1" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 2</button>
                  </span>
                  <input id="Picture2" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 3</button>
                  </span>
                  <input id="Picture3" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 4</button>
                  </span>
                  <input id="Picture4" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 5</button>
                  </span>
                  <input id="Picture5" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 6</button>
                  </span>
                  <input id="Picture6" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 7</button>
                  </span>
                  <input id="Picture7" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 8</button>
                  </span>
                  <input id="Picture8" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 9</button>
                  </span>
                  <input id="Picture9" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
              </div>
              <div className="col-md-4">

              </div>
            </div>

          </div>
          <div className="tab-pane" id="tab3" role="tabpanel" aria-labelledby="tab-3">
            <CKEditor data={description} name="description" onChange={ evt => handleChangeCkeditor('description', evt) }
              config={
                configCkeditor()
              }
            />
          </div>
          <div className="tab-pane" id="tab4" role="tabpanel" aria-labelledby="tab-4">
            <CKEditor data={context} name="context" onChange={ evt => handleChangeCkeditor('context', evt) }
              config={
                configCkeditor()
              }
            />
          </div>
          <div className="tab-pane" id="tab5" role="tabpanel" aria-labelledby="tab-5">
              {context1 ? <CKEditor data={context1} name="context1" onChange={ evt => handleChangeCkeditor('context1', evt) }
                config={
                  configCkeditor()
                }
              /> : <CKEditor data={context1} name="context1" onChange={ evt => handleChangeCkeditor('context1', evt) }
                config={
                  configCkeditor()
                }
              /> }
          </div>
        </div>
        <div className="text-center mt-3 mb-3">
          <button style={{pointerEvents: loading ? 'none' : 'visible'}} className="btn btn-primary btn-inline-block"><i className="fa fa-save"></i> Lưu sản phẩm</button>
        </div>
      </form>
    )
  }
  return (
    <Layout title="Product Insert" className="container pl-0 pr-0 pt-3 pb-2">
      <div className="d-block mb-2">
        <div className="btn-group">
          <Link to="/admin/product/create">
            <button type="button" className="btn btn-light border" ><i className="fa fa-plus-square text-primary" /></button>
          </Link>
          <button type="button" className="btn btn-light border" ><i className="fa fa-minus-square text-danger" /></button>
          <a href="/admin/product/productsearch">
            <button type="button" className="btn btn-light border" ><i className="fa fa-search text-success" /></button>
          </a>
        </div>
      </div>
      {showError()}
      {showSuccess()}
      {formInput()}
      {redirectManageProduct()}
    </Layout>
  )
}

export default UpdateProduct
