import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Layout from './Layout'
import { getCart } from './cartHelpers'
import Card from './Card'
import Checkout from './Checkout'
const Cart = () => {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)
  useEffect(()=> {
    setItems(getCart())
  }, [run])
  const showItems = items => {
    return (
      <div>
        <h2>Tìm thấy {`${items.length}`} giỏ hàng</h2>
        <hr/>
        <div className="row">
          {
            items.map((product, i)=> {
              return(
                <div key={i} className="col-12 col-md-12">
                  <Card product={product} viewLayout="list" showViewProductButton={false} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} setRun={setRun} run={run}/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  const noItemsMessage = () => (
    <h2>Giỏ hàng trống. <br/> <Link className="mt-2 btn btn-info active btn-lg" to="/shop">Tiếp tục mua sắm</Link></h2>
  )
  return (
      <Layout title="" description="" className="container bg-white shadow pt-4">
          <lead className="h3 mb-4 pb-2">Giỏ hàng</lead>
          <div className="row">
            <div className="col-12 col-md-8">
              {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>
            <div className="col-12 col-md-4">
              <Checkout products={items} setRun={setRun} run={run} />
            </div>
          </div>
      </Layout>
  )
}

export default Cart
