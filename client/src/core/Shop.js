import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
// Step 14
import { getCategories, getFilteredProducts } from './apiCore'
// End Step 14
import Checkbox from './Checkbox'
//Step 8
import RadioBox from './RadioBox'
import { prices } from './fixedPrice'
//End Step 8
const Shop = () => {
    // Step 6
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    // step 1
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    // Step 15
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    // Step 17
    const [filteredResults, setFilteredResults] = useState([])
    // Step 21 Load more button
    const [size, setSize] = useState(0)
    // Step 2
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            }
            else{
                setCategories(data)
            }
        })
    }
    // Step 13
    const loadFilteredResults = (newFilters) => {
        //  console.log(newFilters)
        // Step 16
        getFilteredProducts(skip, limit, newFilters)
        .then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                console.log(data)
                // Step 18
                setFilteredResults(data.data)
                // Step 22
                setSize(data.size)
                setSkip(0)
            }
        })
    }
    // Step 23
    const loadMore = () => {
      let toSkip = skip + limit;
      getFilteredProducts(toSkip, limit, myFilters.filters)
      .then(data => {
        if(data.error) {
          setError(data.error)
        }
        else {
          setFilteredResults([...filteredResults, ...data.data])
          setSize(data.size)
          setSkip(toSkip)
        }
      })
    }
    // Step 24
    const loadMoreButton = () => {
      return (
        size > 0 && size >=limit && (
            <button onClick={loadMore} className="btn btn-primary pl-5 pr-5 active mb-5 mt-4">Xem thêm </button>
        )
      )
    }
    // Step 3
    useEffect(()=>{
        init()
        // Step 19 Load all when is screen load
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])
    // Step 4
    const handleFilters = (filters, filterBy) => {
        // Step 7
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        // Step 10
        if(filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        // Step 12
        loadFilteredResults(myFilters.filters)
        //End Step 12
        setMyFilters(newFilters)
    }
    // step 11
    const handlePrice = value => {
        const data = prices;
        let array = []
        for(let key in data) {
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }

    return (
        <Layout title="" description="" className="container bg-white shadow pt-3">
            <div className="row">
                <div className="col-md-4 col-lg-3">
                    <h4 className="AsideTitle mb-3">Danh mục</h4>
                    {/* // Step 5 handleFilters */}
                    <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")}/>
                    <div className="clearfix"><br/> </div>
                    {/* // Step 9 */}
                    <h4 className="AsideTitle mb-3">Theo giá bán</h4>
                    <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")}/>
                </div>
                <div className="col-md-8 col-lg-9">
                    {/* {JSON.stringify(myFilters)} */}
                    {/* // Step 20 */}
                    <h1 className="product-title ProductGroupName mb-3">Sản phẩm</h1>
                    {/* <h4 className="text-muted h6 mb-4">Found {size} products</h4> */}
                    <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-3">
                        {
                          filteredResults.map((product, i)=> {
                            return (
                              <Card key={i} product={product} />
                            )
                          })
                        }
                    </div>
                    <div className="text-center">
                        {loadMoreButton()}
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Shop;
