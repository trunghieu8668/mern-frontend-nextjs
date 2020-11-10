import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers'

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: 'yellow'}
    }
    else {
        return {color: '#fff'}
    }
}

const Menu = ({history}) => {
    return (
      <header id="header-full" className="navbar navbar-default ow-header affix-top pl-0 pr-0">
        <div className="container-fluid pl-lg-0 pr-lg-0">
          <div className="container navbar-inner">
            <div className="row navbar-header w-100 ml-auto mr-auto">
              <div className="col-auto logo-site align-self-center">
                <div id="Logo" className="Logo logo clearfix text-left">
                  <div className="new-logo" itemScope itemType="http://schema.org/Organization">
                    <a href="/" title="Hieu Nguyen"><img alt="Hieu Nguyen" longdesc="Hieu Nguyen" src="/images/logo.png" title="Hieu Nguyen" /></a>
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 align-self-center">
                <control>Search</control>
              </div>
              <div className="d-none d-lg-flex d-xl-flex">
                <div className="col-auto align-self-center">
                  <control>Menu-Header-Right</control>
                  <div id="Header-Order">0</div>
                </div>
                <div className="col-auto align-self-center">
                  <control>Menu-Header-Right-2</control>
                </div>
              </div>
            </div>
            </div>
            <div className="w-100 menu-section d-none d-lg-flex d-xl-flex">
              <nav className="container" id="MenuTop">
                <ul className="nav nav-tabs justify-content-center bg-info">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={isActive(history, '/')}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop" className="nav-link" style={isActive(history, '/shop')}>Shop</Link>
                    </li>
                    { isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item">
                            <Link to="/user/dashboard" className="nav-link" style={isActive(history, '/user/dashboard')}>Dashboard</Link>
                        </li>
                    )}

                    { isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-item">
                            <Link to="/admin/dashboard" className="nav-link" style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
                        </li>
                    )}

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link" style={isActive(history, '/signin')}>Signin</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link" style={isActive(history, '/signup')}>Signup</Link>
                            </li>
                        </Fragment>
                    )}

                    {
                        isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <span
                                        onClick={()=> signout(()=>{
                                            history.push('/')
                                        })}
                                        className="nav-link" style={{cursor: 'pointer', color:"#fff"}}>Signout</span>
                                </li>
                            </Fragment>
                        )
                    }

                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" style={isActive(history, '/cart')}>Cart <sup><span className="badge badge-danger rounded-circle">{itemTotal()}</span></sup></Link>
                    </li>
               </ul>
              </nav>
            </div>
          </div>
        </header>
    );
};

export default withRouter(Menu);
