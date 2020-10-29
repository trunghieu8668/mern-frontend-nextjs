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
// Category
import AddCategory from './views/categories/AddCategory'
import CategorySearch from './views/categories/CategorySearch'
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
        <AdminRoute path="/admin/category/create" exact component={AddCategory}/>
        <AdminRoute path="/admin/category/categorysearch" exact component={CategorySearch}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
