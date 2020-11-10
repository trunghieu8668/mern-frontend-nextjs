import React from 'react'

import fbLogo from '../../assets/images/facebook.png'
import twitterLogo from '../../assets/images/twitter.png'
import youtubeLogo from '../../assets/images/yt.png'
const Footer = () => {
  return (
      <footer className="footer">
        <div class="Footer">
          <div className="container" id="footer-top">
            <div className="row">
              <div className="footer-top-left col-auto"><a href="/" title="Trang chủ">TRANG CHỦ</a>
              </div>
              <div className="footer-top-right col-auto flex-grow-1">
                <div className="float-right"><label>Theo dõi chúng tôi</label>
                  <ul className="ft-social">
                    <li><a href="javascript:void(0)" target="_blank"><img alt="Facebook" src={fbLogo} alt="facebook"/></a></li>
                    <li><a href="javascript:void(0)" rel="nofollow" title="Theo dõi chúng tôi trên Twitter"><img src={twitterLogo} alt="twitter"/></a></li>
                    <li><a href="javascript:void(0)" rel="nofollow" target="_blank" title="Theo dõi chúng tôi trên Youtube"><img src={youtubeLogo} alt="youtube"/></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="secarea">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-6 aliright">
                  <h4>Công ty TNHH HieuNguyen
                  </h4>
                  <ul>
                    <li>193 Đường số 28, Phường 6, Gò Vấp, Tp.HCM</li>
                    <li><strong>Điện thoại:</strong> 0916 033 960</li>
                    <li><strong>Website:</strong>&nbsp;<a href="https://mernbackendfrontend.herokuapp.com">www.mernbackendfrontend.herokuapp.com</a></li>
                  </ul>
                  <div className="clearfix">&nbsp;
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 aliright">
                  <h4 className="white">Chính sách
                  </h4>
                  <ul className="foolist">
                    <li><a href="javascript:void(0)" title="Quy định và hình thức thanh toán">Hình thức thanh toán</a></li>
                    <li><a href="javascript:void(0)" title="Chính sách vận chuyển, giao nhận hàng hóa">Chính sách giao nhận hàng hóa</a></li>
                    <li><a href="javascript:void(0)" title="Chính sách bảo hành sản phẩm ">Chính sách bảo hành</a></li>
                    <li><a href="javascript:void(0)" title="Chính sách đổi và trả hàng">Chính sách đổi và trả hàng</a></li>
                    <li><a href="javascript:void(0)" title="Chính sách bảo mật thông tin khách hàng">Chính sách bảo mật thông tin</a></li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3 aliright">
                  <h4 className="white">Về chúng tôi
                  </h4>
                  <ul className="foolist">
                    <li><a href="javascript:void(0)" title="Giới thiệu">Giới thiệu</a></li>
                    <li><a href="javascript:void(0)" title="Khách hàng chúng tôi">Khách hàng</a></li>
                    <li><a href="javascript:void(0)" title="Tuyển dụng">Tuyển dụng</a></li>
                    <li><a href="javascript:void(0)">Tin tức</a></li>
                    <li><a href="javascript:void(0)">Video</a></li>
                    <li><a href="javascript:void(0)" title="Liên hệ">Liên hệ</a></li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
          <div className="clearfix">&nbsp;
          </div>
          <div className="copyrights">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6">Copyright © 2020 hieuNguyen. All rights reserved.
                </div>
                <div className="col-sm-6 last aliright">Design and Developed by: <a href="http://fb.com/hieunguyen2890" style={{color: 'yellow'}} target="_blank" title="Thiết kế website bởi HieuNguyen">HieuNguyen</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer;
