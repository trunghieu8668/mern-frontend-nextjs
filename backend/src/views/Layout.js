import React, {Suspense} from 'react';
import Menu from './Menu';
import Topbar from './Topbar'
const loading = () => <div></div>;
const ImageList = React.lazy(()=> import('./ImageList'))

const Layout = ({title = '', className, children}) => {
    return (
        <Suspense fallback={loading()}>
            <Topbar />
            <div id="layoutSidenav">
              <Menu/>
              <div id="layoutSidenav_content">
                <div className={className}>{children}</div>
              </div>
            </div>
        </Suspense>
    );
};

export default Layout;
