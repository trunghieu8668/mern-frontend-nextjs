import React from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'
const AdminDashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated()
    const adminLink = () => {
        return (
            <div className="card">
                <div className="card-header">
                    User Links
                </div>
                <div className="card-body p-0">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/create/category">Create Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/create/product">Create Product</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/admin/orders">View Orders</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/admin/products">Manage Products</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    const adminInfo = () => (
        <div className="card mb-5">
            <div className="card-header">User Infomation</div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
        </div>
    )

    return (
        <Layout title="Dashboard" description={`Good day ${name}!`} className="container">
            <div className="row">
                <div className="col-md-3">
                    {adminLink()}
                </div>
                <div className="col-md-9">
                    {adminInfo()}
                </div>
            </div>

        </Layout>
    );
};

export default AdminDashboard;
