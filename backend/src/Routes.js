import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// Auth
import Login from './views/auth/Login'
import Dashboard from './views/Dashboard'
import AdminRoute from './auth/AdminRoute'
// Product
import ProductSearch from './views/products/ProductSearch'
import UpdateProduct from './views/products/UpdateProduct'
import InsertProduct from './views/products/InsertProduct'
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AdminRoute path="/" exact component={Login}/>
        <Route path="/admin" exact component={Login}/>
        <AdminRoute path="/admin/dashboard" exact component={Dashboard}/>
        <AdminRoute path="/admin/product/productsearch" exact component={ProductSearch}/>
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        <AdminRoute path="/admin/product/create" exact component={InsertProduct}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
