import React from 'react'
import Link from 'next/link'
import Nav from './Nav'
// import HeaderOrder from './HeaderOrder'
import Logo from './Logo'
import HeaderSearch from './HeaderSearch'
import {FileText, Send, PhoneCall} from 'react-feather'

const isActive = (history, path) => {
  if(history.location.pathname === path){
      return {color: 'yellow'}
  }
  else {
      return {color: '#fff'}
  }
}

const Header = ({history}) => {
  return (
    <header id="header-full" className="navbar navbar-default ow-header affix-top pl-0 pr-0">
      <div className="container-fluid pl-lg-0 pr-lg-0">
        <div className="container navbar-inner">
          <div className="row navbar-header w-100 ml-auto mr-auto">
            <div className="col-auto logo-site align-self-center">
              <Logo />
            </div>
            <div className="flex-grow-1 align-self-center">
              <HeaderSearch />
            </div>
            <div className="d-none d-lg-flex d-xl-flex">
              <div className="col-auto align-self-center">
                <ul className="menu-header-right d-none d-sm-block clearfix mb-0 p-0 d-none d-lg-flex d-xl-flex">
                	<li><a href="javascript:void(0)"><FileText className="fa" color="white" size="25"/><span className="name">Tin tức</span></a></li>
                	<li><a href="javascript:void(0)"><Send className="fa" color="white" size="25"/><span className="name">Liên hệ</span></a></li>
                </ul>

              </div>
              <div className="col-auto align-self-center">
                <ul className="d-none d-sm-block clearfix mb-0 p-0 icn-hotline d-none d-lg-flex d-xl-flex">
                  <li><a href="tel:+842873099799" className="hotline shadow" rel="nofollow" title="Gọi ngay 028 7309 9799"><PhoneCall className="fa" color="white" size="25"/> <span className="name ml-1"> (028) 7309 9799</span></a></li>
                </ul>

              </div>
            </div>
          </div>
          </div>
          <div className="w-100 menu-section d-none d-lg-flex d-xl-flex">
            <Nav />
          </div>
        </div>
      </header>
  )
}
export default Header
