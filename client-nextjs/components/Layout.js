import  React from 'react'
import Head from 'next/head'
const Layout = ({title = "", description = "", keywords = "", className, children}) => {
 return (
   <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
    </Head>
    <div className={className}>{children}</div>
   </>
 )
}
export default Layout
