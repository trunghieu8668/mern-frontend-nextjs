import React from 'react'
import { Link } from 'react-router-dom'
import {API} from '../config'
import noPhoto from '../images/no-photo.png'
const showImage = ({item, url, className}) => {
    return (
        <div className="product-img">
            <Link className="clearfix" to={ `/product/${item._id}` } title={ item.productName }>
              <img className={ className ? className : "card-img-top img-fluid mb-3" } src={item.pictures && item.pictures.length > 0 ? item.pictures[0].url_mobile : noPhoto} alt={ item.productName }/>
            </Link>
        </div>
    );
};

export default showImage;
