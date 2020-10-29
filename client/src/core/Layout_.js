import React from 'react';
import Header from './Header';
import '../styles.css'
const Layout = ({title = '', description = '', className, children}) => {
    return (
        <>
            <Header/>
            <div className={className}>{children}</div>
        </>
    );
};

export default Layout;
