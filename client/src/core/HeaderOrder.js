import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { itemTotal } from './cartHelpers'

const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return "active"
  }
  else return ''
}

const HeaderOrder = ({history}) => {
  return (
    <Link id="Header-Order" to='/cart' className={isActive(history, '/cart')}>
      {itemTotal()}
    </Link>
  )
}
export default withRouter(HeaderOrder);
