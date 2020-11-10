import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import srcLogo from '../../assets/images/logo.png'
const Logo = () => {
  return (
    <div id="Logo" className="Logo logo clearfix text-left">
      <div className="new-logo" itemScope itemType="http://schema.org/Organization">
        <Link href="/">
          <a href="/" title="Hieu Nguyen">
            <img alt="Hieu Nguyen" longdesc="Hieu Nguyen" src={srcLogo} title="Hieu Nguyen" />
          </a>
        </Link>
      </div>
    </div>
  )
}
export default Logo
