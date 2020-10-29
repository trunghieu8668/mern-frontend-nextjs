import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Logo = () => {
  return (
    <div id="Logo" className="Logo logo clearfix text-left">
      <div className="new-logo" itemScope itemType="http://schema.org/Organization">
        <Link to="/" title="Hieu Nguyen"><img alt="Hieu Nguyen" longdesc="Hieu Nguyen" src="/images/logo.png" title="Hieu Nguyen" /></Link>
      </div>
    </div>
  )
}
export default withRouter(Logo)
