import React from 'react';
import Header from './Header';
import Footer from './Footer'
import '../styles.css'
const Layout = ({title = '', description = '', className, children}) => {
    return (
        <div>
            <Header/>
            {title && (
              <div className="jumbotron">
                  <div className="container">
                      {title && (<h2>{title}</h2>)}
                      {description && (<p className="lead">{description}</p>)}
                  </div>
              </div>
            )}

            <div className={className}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
