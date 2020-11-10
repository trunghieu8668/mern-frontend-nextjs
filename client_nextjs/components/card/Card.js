import Link from 'next/link';
import {withRouter} from 'next/router'
import {Row, Col} from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import noPhoto from '../../assets/images/no-photo.png'

const Card = ({product}) => {
  return(
    <Col className="Home-Product">
      <Link href={`/product/${product._id}`} title={product.name}>
        <a>
          <figure className="left-block">
            <span className="middle">
              <img className="f-select" src={product.pictures && product.pictures.length ? product.pictures[0].url_mobile : noPhoto }/>
            </span>
            <div className="employee-hover-overlay" />
          </figure>
          <div className="right-block">
            <h3 className="ProductName">{product.productName}</h3>
            <h3 className="ProductGroupName">{ product.category && product.category.name }</h3>
            <div className="content_price">
              <b className="clearfix ProductPriceNew">{ product.productPriceNew && product.productPriceNew > 0 ? <NumberFormat value={product.productPriceNew} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/> : <span className="price-contact">Liên hệ</span> }</b>
            </div>
          </div>
        </a>
      </Link>
    </Col>
  )
}
export default withRouter(Card)
