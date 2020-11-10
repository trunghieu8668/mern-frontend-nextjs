import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Home } from 'react-feather';

const Nav = ({history}) => {
  return (
    <nav className="container">
      <ul className="Menu-Top clearfix w-100 d-none d-lg-flex d-xl-flex">
        <li><Link href="/"><a title="Trang chủ"><Home className="fa" size="25" color="white"/></a></Link></li>
        <li><Link href="/shop"><a title="Mac">Mac</a></Link></li>
        <li><Link href="/shop"><a title="iPad">iPad</a></Link></li>
        <li><Link href="/shop"><a title="iPhone">iPhone</a></Link></li>
        <li><Link href="/shop"><a title="Apple watch">Apple watch</a></Link></li>
        <li><Link href="/shop"><a title="Phụ kiện">Phụ kiện</a></Link></li>
       </ul>
     </nav>
  )
}

export default withRouter(Nav)
