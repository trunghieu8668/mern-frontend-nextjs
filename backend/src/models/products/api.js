import {API} from '../../config'
import axios from "axios";
export const createCategory = async (userId, token, category) => {
    return await fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {console.log(err)})
}

export const createProduct = async (userId, token, product) => {
    return await fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {console.log(err)})
}


export const getCategories = async () => {
    return await fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
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
    return await fetch(`${API}/product/status-values/${userId}`, {
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
export const getProducts = async () => {
    return await fetch(`${API}/products?limit=10`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const totalProducts = async () => {
  return await fetch(`${API}/products/count`, {
    method: "GET"
  })
  .then(response => {
    return response.json()
  })
  .catch(error => console.log(error))
}

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
// export const getProduct = (productId) => {
//     return fetch(`${API}/product/${productId}`, {
//         method: "GET"
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(err => console.log(err))
// }

// export const updateProduct = async (productId, userId, token, product) => {
//     return await fetch(`${API}/product/${productId}/${userId}`, {
//         method: "PUT",
//         headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: product
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(err => console.log(err))
// }

export const updateProduct = async (productId, userId, token, product) =>
  await axios.put(`${API}/product/${productId}/${userId}`, product, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
export const getFilteredProducts = async (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    return await fetch(`${API}/products/by/search`, {
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

export const getTotalProductsBySearch = async (filters = {}) => {
    const data = {
      filters
    }
    return await fetch(`${API}/products/count/search`, {
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
