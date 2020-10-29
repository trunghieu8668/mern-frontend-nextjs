import React from 'react'
import {API} from '../config'

const showImage = ({item, url, className}) => {
    return (
        <div className="product-img">
            <a className="clearfix" href={ `/product/${item._id}` } title={ item.name }>
              <img className={ className ? className : "card-img-top img-fluid mb-3" } src={ `${API}/${url}/photo/${item._id}` } alt={ item.name }/>
            </a>
        </div>
    );
};

export default showImage;
