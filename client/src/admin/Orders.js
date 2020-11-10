import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin'
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [statusValues, setStatusValues] = useState([])

  const {user, token} = isAuthenticated()
  const loadOrders = () => {
    listOrders(user._id, token)
    .then(data => {
      if(data.error) {
        console.log(data.error);
      }
      else {
        setOrders(data)
      }
    })
  }

  const loadStatusValues = () => {
    getStatusValues(user._id, token)
    .then(data => {
      if(data.error) {
        console.log(data.error);
      }
      else {
        setStatusValues(data)
      }
    })
  }

  useEffect(()=>{
    loadOrders()
    loadStatusValues()
  }, [])

  const showOrdersLength = orders => {
    if(orders.length > 0) {
      return (
        <h1 className="lead mb-3 border-bottom pb-3">Total orders: {orders.length}</h1>
      )
    } else {
      return <h1 className="lead mb-3 border-bottom pb-3">No orders</h1>
    }
  }
  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend mr-3">
        <div className="input-group-text font-weight-bold">{key}</div>
      </div>
      <input type="text" value={value} className="form-control pl-3 pr-3 bg-white" readOnly/>
    </div>
  )

  const handleStatusChange = (e, orderId) => {
    // console.log('update order status');
    updateOrderStatus(user._id, token, orderId, e.target.value)
    .then(data => {
      if(data.error) {
        console.log("Status update failed");
      }
      else {
        loadOrders()
      }
    })
  }

  const showStatus = o => (
    <div className="form-control bg-light">
      <h3 className="mark mb-4 lead font-weight-normal"> Status: {o.status}</h3>
      <label>Change Status</label>
      <select className="form-control" onChange={(e) => handleStatusChange(e, o._id)}>
        <option>Update status</option>
        {statusValues.map((status, index)=> (
          <option key={index} value={status}> {status} </option>
        ))}
      </select>
    </div>
  )

  return (
      <Layout title="Orders" description={`Good day ${user.name}, you can manage all the orders here`} className="container">
          <div className="row">
              <div className="col-md-10 offset-md-1">
                  {showOrdersLength(orders)}
                  {orders.map((o, oIndex) => {
                    return (
                      <div className="mt-3 pb-3 border-bottom" key={oIndex}>
                        <h2 className="mb-3">
                          <span className="bg-light">
                            Order ID: {o._id}
                          </span>
                        </h2>
                        <ul className="list-group mb-2">
                          <li className="list-group-item">
                            Transaction ID: {o.transaction_id}
                          </li>
                          <li className="list-group-item">
                            Amount: {o.amount}
                          </li>
                          <li className="list-group-item">
                            Ordered by: {o.user.name}
                          </li>
                          <li className="list-group-item">
                            Email: {o.user.email}
                          </li>
                          <li className="list-group-item">
                            Ordered on: {moment(o.createdAt).fromNow()}
                          </li>
                          <li className="list-group-item">
                            Address: {o.address}
                          </li>
                          <li className="list-group-item">
                            Status: {showStatus(o)}
                          </li>
                        </ul>
                        <label className="label font-weight-bold">Total products in the orders: { o.products.length }</label>
                        {
                          o.products.map((p,pIndex)=> (
                            <div className="row mb-4 border bg-light shadow p-3" key={pIndex}>
                              {showInput("Product name", p.name)}
                              {showInput("Product id", p._id)}
                              {showInput("Product price", p.price)}
                              {showInput("Product total", p.count)}
                            </div>
                          ))
                        }
                      </div>
                    )
                  })}
              </div>
          </div>

      </Layout>
  );

}

export default Orders
