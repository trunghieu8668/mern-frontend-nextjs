import { API } from '../config'
import axios from 'axios'

export const getProducts = (sortBy, limit) => {
  return axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=${limit}`)
  .catch(error => {
    return error.response
    });
}

export const getCategories = async () => {
    return await axios.get(`${API}/categories`)
    .catch(error => {
      return error.response
    });
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
      limit,
      skip,
      filters
  }
  return fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
          Accept: 'application/json',
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      return response.json();
  })
  .catch(err => {console.log(err)})
}
// Search by. Using plugin query-s
export const list = parrams => {
    const query = queryString.stringify(parrams)
    //console.log('query', query)
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/gettoken/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: createOrderData})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
// Home Product
export const homeProduct = (sortBy, limit) => {
  return fetch(`${API}/products/by/homeproduct?sortBy=${sortBy}&order=desc&limit=${limit}`, {
    method: "GET"
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}
