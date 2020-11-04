import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { emptyCart } from './cartHelpers'
import NumberFormat from 'react-number-format';
import { isAuthenticated } from '../auth'
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
  // order
  const handleAddress = event => {
    setData({...data, address: event.target.value})
  }
  // End order
  // brainTree
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  })
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data=> {
      if(data.error) {
        setData({...data, error: data.error})
      }
      else {
        setData({ clientToken: data.clientToken})
      }
    })
  }
  useEffect(()=>{
    getToken(userId, token)
  }, [])

  const showDropIn = () => (
    <div onBlur={()=> setData({...data, error: ''})}>
      {
        data.clientToken !== null && products.length > 0 ? (
          <div className="pb-4">
            <div className="form-group mb-3">
              <label className="text-muted">Địa chỉ</label>
              <textarea onChange={handleAddress} className="form-control" value={data.address}></textarea>
            </div>
            <DropIn options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault"
                }
              }} onInstance={instance => (data.instance = instance)}/>
            <button onClick={buy} className="btn btn-warning btn-lg active btn-block">Thanh toán</button>
          </div>
        ) : null
      }
    </div>
  )
  let deliveryAddress = data.address;
  const buy = () => {
    setData({loading: true})
    // send the nonce to your server
    // none = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data => {

      // console.log(data);
      nonce = data.nonce
      // one you have nonce (card type, card number) send nonce as 'requestPaymentMethod'
      // and also total to be charged
      //console.log('send nonce and total to process: ', nonce, getTotal(products));
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotal(products)
      };

      processPayment(userId, token, paymentData)
      .then(response => {
        // create order
        const createOrderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
          address: deliveryAddress
        }
        createOrder(userId, token, createOrderData)
        // end create order
        // console.log(response);
        emptyCart(()=> {
          setRun(!run); // run useEffect in parent Cart
          console.log('payment success and empty cart');
          setData({loading: false})
        })
        setData({...data, error:response.message, success:response.success})
      })
      .catch(error => {
        console.log(error)
        setData({loading: false})
      })
    })
    .catch(error => {
      // console.log('dropin error: ', error);
      setData({...data, error: error.message})
    })
  }

  const showError = error => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )
  const showSuccess = success => (
    <div className="alert alert-info active" style={{display: success ? '' : 'none'}}>
      Cảm ơn! Đơn hàng mua thành công!
    </div>
  )

  const showLoading = loading => loading && <h4>Loadding....</h4>
  // end braintree

  const getTotal = () => {
    return products.reduce((currentValue, nextValue)=> {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }
  const showButtonCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
          <button className="btn btn-info active w-100 mt-4 btn-lg">
            Đăng nhập để mua hàng
          </button>
      </Link>
    )
  }
  return (
    <div>
      <div className="h3">Tổng cộng: <NumberFormat isNumericString={true} value={getTotal()} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/></div>
        {showLoading(data.loading)}
        {showError(data.error)}
        {showSuccess(data.success)}
        {showButtonCheckout()}
    </div>
  )
}

export default Checkout
