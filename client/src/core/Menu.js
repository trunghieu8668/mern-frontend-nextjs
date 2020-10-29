import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers'
import { Home } from 'react-feather';

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
      <nav className="container">
          <ul className="Menu-Top clearfix w-100 d-none d-lg-flex d-xl-flex">
            <li><Link to="/"><Home className="fa" size="25" color="white"/></Link></li>
            <li><Link to="/shop">Mac</Link></li>
            <li><Link to="/shop">iPad</Link></li>
            <li><Link to="/shop">iPhone</Link></li>
            <li><Link to="/shop">Apple watch</Link></li>
            <li><Link to="/shop">Phụ kiện</Link></li>                                                
         </ul>
       </nav>
    );
};

export default withRouter(Menu);
