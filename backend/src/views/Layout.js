import React from 'react';
import Menu from './Menu';
import Topbar from './Topbar'
const Layout = ({title = '', className, children}) => {
    return (
        <div>
            <Topbar />
            <div id="layoutSidenav">
              <Menu/>
              <div id="layoutSidenav_content">
                <div className={className}>{children}</div>
              </div>
            </div>
        </div>
    );
};

export default Layout;
