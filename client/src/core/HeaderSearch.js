import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
// Step 1
import { getCategories, list } from './apiCore'
import ShowImage from './ShowImage'
import { Search } from 'react-feather';
import NumberFormat from 'react-number-format';

const HeaderSearch = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        total: '',
        searched: false
    })
    const { categories, category, search, results, total, searched } = data;

    const handleChange = name => event => {
      setData({...data, [name]: event.target.value, searched: false})
    }
    const searchData = () => {
      if(search) {
        list({search: search || undefined, category: category})
        .then(response => {
          if(data.error) {
            console.log(response.error);
          }
          else {
            setData({...data, results: response.product, total: response.total, searched: true})
          }
        })
      }
    }

    useEffect(()=> {

        searchData();

    }, [search])

    // Step 7
    const searchSubmit = (e)=> {
        e.preventDefault();
        searchData();
    }
    // Step 6
    const searchForm = () => {
        return (
        <Form className="mb-0" onSubmit={searchSubmit}>
          <Form.Control onKeyUp={handleChange('search')} className="search-query form-control input-sm txt-search" placeholder="Tìm kiếm ..." type="search" />
        </Form>
        )
    }
    // Step 14
    const searchedProducts = (results = []) => {
      return (
        <React.Fragment>
          {results.length > 0 && (<React.Fragment>
            {results.map((product, i)=> (
              <a key={i} className="item col-12 col-xs-12" title={product.productName} href={`/product/${product._id}`}>
              	<div className="row no-gutters">
              		<figure className="Picture col-auto mb-0">
                    <ShowImage item={product} url="product"/>
                  </figure>
              		<div className="col main text-left flex-grow-1 pl-3">
              			<h4 className="ProductName">{product.productName}</h4>
              			<div className="clearfix"></div>
              			<div className="Price">
                      <span className="ProductPriceNew">
                        <NumberFormat value={product.productPriceNew} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/>
                      </span>
                    </div>
              		</div>
              	</div>
              </a>
            ))}
          </React.Fragment>)}
          <Button className="col-12">
            {searchMessage(searched, total)}
          </Button>
        </React.Fragment>
      )
    }
    // Step 15
    const searchMessage = (searched, total) => {
      if( searched && total > 0 ) {
        return `Tìm thấy ${total} products`
      }
      if( searched && (total < 1)) {
        return `Không tìm thấy`
      }
    }

    return (
      <div id="Search" className="Search">
        <div className="searchBar">
            {searchForm()}
            <div className={searched ? 'autocomplete-suggestions show' : 'autocomplete-suggestions hidden'}>
              <div className="row search-auto">
                {searchedProducts(results)}
              </div>
            </div>
          </div>
      </div>
    );
};

export default HeaderSearch;
