import React, { useState, useEffect } from 'react'
// Step 1
import { getCategories, list } from './apiCore'
import Card from './Card'

const Search = () => {
    // Step 2
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })
    // Step 5
    const { categories, category, search, results, searched } = data;
    // Step 3
    const loadCategories = () => {
        getCategories().then(data=> {
            if(data.error) {
                console.log(data.error)
            }
            else {
                setData({...data, categories: data})
            }
        })
    }
    // Step 4
    useEffect(()=>{
        loadCategories()
    }, [])
    // Step 8
    const handleChange = name => event => {
        // Step 9
        setData({...data, [name]: event.target.value, searched: false})
    }
    // Step 11
    const searchData = () => {
      console.log(search, category)
      // Step 13
      if(search) {
        list({search: search || undefined, category: category})
        .then(response => {
          if(data.error) {
            console.log(response.error);
          }
          else {
            setData({...data, results: response, searched: true})
          }
        })
      }
    }
    // Step 7
    const searchSubmit = (e)=> {
        // Step 10
        e.preventDefault()
        // Step 12
        searchData()
    }
    // Step 6
    const searchForm = () => {
        return (
        <form className="mb-0" onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-append">
                        <select className="custom-select custom-select-lg" onChange={handleChange('category')}>
                            <option selected value="All">All</option>
                            {categories.map((e, i) => (
                                <option key={i} value={e._id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control bg-white pl-3" onChange={handleChange('search')} placeholder="Search by name"/>
                </div>

                <div className='btn btn-info active input-group-append'>
                    <button className="input-group-text text-white">Search</button>
                </div>

            </span>


        </form>
        )
    }
    // Step 14
    const searchedProducts = (results = []) => {
      return (
        <div>
          <h2 className="mt-4 mb-4">
            {searchMessage(searched, results)}
          </h2>
          {results.length > 0 && (<div className="row row-cols-lg-5">
            {results.map((product, i)=> (
              <div className="col-6 col-md-4 col-lg-4">
                <Card key={i} product={product}/>
              </div>
            ))}
          </div>)}
        </div>
      )
    }
    // Step 15
    const searchMessage = (searched, results) => {
      if( searched && results.length > 0 ) {
        return `Found ${results.length} products`
      }
      if( searched && (results.length < 1 || results.error)) {
        return `No products found`
      }
    }

    return (
        <div className="bg-light pt-4 pb-4">
            <h2>Search bar</h2>
            <div className='container border mb-4'>
                {searchForm()}
            </div>
            <div className='container searchResult mb-4'>
              {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;
