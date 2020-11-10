import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './apiUser'
import moment from 'moment'
const Dashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated()
    const token = isAuthenticated().token
    // purchaseHistory
    const [history, setHistory] = useState([])
    const init = (userId, token) => {
      getPurchaseHistory(userId, token).then(data => {
        if(data.error) {
          console.log(data.error);
        } else {
          setHistory(data)
        }
      })
    }
    useEffect(()=> {
      init(_id, token)
    }, [])
    // end purchaseHistory

    const userLink = () => {
        return (
            <div className="card">
                <div className="card-header">
                    User Links
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/cart">My cart</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    const userInfo = () => (
        <div className="card mb-5">
            <div className="card-header">User Infomation</div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
    <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"} - {JSON.stringify(isAuthenticated().user)}</li>
                </ul>
            </div>
        </div>
    )

    const purchaseHistory = (history) => (
        <div className="card mb-5">
            <div className="card-header text-uppercase font-weight-bold h5">Purchase history</div>
            <div className="card-body">
                {
                  history.map((h, i) => {
                    return (
                        <div key={i} className="shadow mb-4 bg-light p-4">
                          {<div class="text-danger h5 font-weight-bold mb-4">{i+1}</div>}
                          {
                            h.products.map((p, i)=> (
                              <div key={i} className="pb-3 mb-3 border-bottom">
                                <h6 className="lead font-weight-bold"> Product Name: {p.name}</h6>
                                <h6 className="font-weight-normal"> Product price: {p.price}</h6>
                                <h6 className="font-weight-normal"> Quantity: {p.count}</h6>

                                <h6 className="font-weight-normal"> Purchased dated: {moment(p.createdAt).fromNow()}</h6>
                              </div>
                            ))
                          }
                          {<h6 className="font-weight-normal"> Total: {h.amount}</h6>}
                        </div>
                      )
                    })
                }
            </div>
        </div>
    )
    return (
        <Layout title="Dashboard" description={`Good day ${name}!`} className="container">
            <div className="row">
                <div className="col-md-3">
                    {userLink()}
                </div>
                <div className="col-md-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>

        </Layout>
    );
};

export default Dashboard;
