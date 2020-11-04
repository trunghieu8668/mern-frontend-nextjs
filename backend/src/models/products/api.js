import {API} from '../../config'
import axios from "axios";
// export const createCategory = async (userId, token, category) => {
//     return await fetch(`${API}/category/create/${userId}`, {
//         method: "POST",
//         headers: {
//             Accept: 'application/json',
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(category)
//     })
//     .then(response => {
//         return response.json();
//     })
//     .catch(err => {console.log(err)})
// }
export const createCategory = async (userId, token, category) =>
  await axios.post(`${API}/category/create/${userId}`, category, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).catch(error => {
    return error.response
  });
export const createProduct = async (userId, token, product) =>
  await axios.post(`${
    API}/product/create/${userId}`, product, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

export const getCategories = async () => {
  return await axios.get(`${API}/categories`)
  .catch(error => {
    return error.response
  });
}

export const listOrders = async (userId, token) => {
    return await fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getStatusValues = async (userId, token) => {
  return await axios.get(`${API}/product/status-values/${userId}`, {
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
    })
  .catch(error => {
    return error.response
  });
}
export const updateOrderStatus = async (userId, token, orderId, status) => {
    return await fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

/**
* to perform CRUD on product
* get all Products
* get a signle products
* update product
* delete product
**/
export const getProducts = async () =>
  await axios.get(`${API}/products?limit=10`)

export const totalProducts = async () =>
  await axios.get(`${API}/products/count`)

export const deleteProduct = async (productId, userId, token) => {
    return await fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
export const getProduct = async (productId) =>
  await axios.get(`${API}/product/${productId}`);

export const updateProduct = async (productId, userId, token, product) =>
  await axios.put(`${
    API}/product/${productId}/${userId}`, product, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
export const getFilteredProducts = async (skip, limit, filters = {}) => {
  return await axios.post(`${API}/products/by/search`, {
    limit,
    skip,
    filters
  })
}

export const getTotalProductsBySearch = async (filters = {}) => {
  return await axios.post(`${API}/products/count/search`, {
    filters
  })
}
