import React, { useState, useEffect } from 'react'
import {Row} from 'react-bootstrap'
//Component
import Layout from '../../components/Layout'
import { Header, Footer } from '../../components/share-components/index'
import Card from '../../components/card/Card'
// api
import { getCategories, getFilteredProducts } from '../../functions/product'
// filter
import Checkbox from '../../components/filters/Checkbox'
import RadioBox from '../../components/filters/RadioBox'
import { prices } from '../../components/filters/fixedPrice'

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])

  // Load more button
  const [size, setSize] = useState(0)
  // Run
  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setError(data.error)
      }
      else{
        setCategories(data.data)
      }
    })
  }

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters)
    .then(data => {
      if(data.error) {
        setError(data.error)
      }
      else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

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
  const loadMoreButton = () => {
    return (
      size > 0 && size >=limit && (
        <button onClick={loadMore} className="btn btn-primary pl-5 pr-5 active mb-5 mt-4">Xem thêm </button>
      )
    )
  }

  const handleFilters = (filters, filterBy) => {
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters
    if(filterBy === "productPriceNew") {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }

    loadFilteredResults(myFilters.filters)
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
  // Step 3
  useEffect(()=>{
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
  }, [])
  return (
    <Layout title="Home Page" description="description" className="wraper-full">
      <Header />
      <main className="wraper-site">
        <section class="container">
          <div className="row">
              <div className="col-md-4 col-lg-3">
                <h4 className="AsideTitle mb-3">Danh mục</h4>
                <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")}/>
                <div className="clearfix"><br/> </div>
                <h4 className="AsideTitle mb-3">Theo giá bán</h4>
                <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "productPriceNew")}/>
              </div>
              <div className="col-md-8 col-lg-9">
                <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-3">
                    {
                      filteredResults.map((product, i)=> {
                        return (
                          <Card key={i} product={product} />
                        )
                      })
                    }
                </div>
              </div>
            </div>
        </section>
      </main>
      <Footer />
    </Layout>
  )
}



export default Shop;
