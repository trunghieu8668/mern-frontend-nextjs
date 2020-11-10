import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { read, listRelated } from './apiCore'
import Card from './Card'
import { Row, Col } from 'react-bootstrap'

const Product = (props) => {
  // Step 1
  const [product, setProduct] = useState({})
  const [error,setError] = useState(false)
  const [relatedProduct, setRelatedProduct] = useState([])
  // Step 2
  const loadSingleProduct = (productId) => {
    read(productId).then(data => {
      if(data.error) {
        setError(data.error)
      }
      else {
        setProduct(data)
        // fetch related products
        listRelated(data._id).then(data => {
          if(data.error) {
            setError(data.error)
          }
          else {
            setRelatedProduct(data)
          }
        })
      }
    })
  }
  useEffect(()=> {
    const productId = props.match.params.productId
    loadSingleProduct(productId);
    window.scrollTo(0, 0)
  }, [props])
  return (
      <Layout className="container bg-white pt-2">
          <Card product={product} isLayoutProductInfo="true" />

          {relatedProduct.length > 0 && (
            <>
              <div className="AsideTitle3">
                <span className="name shadow">Sản phẩm khác</span>
              </div>
              <Row xs={2} md={4} lg={4}>
                {
                  relatedProduct.map((relatedproduct, i)=> (
                    <>
                      <Card product={relatedproduct} />
                    </>
                    )
                  )
                }
              </Row>
            </>
          )}

      </Layout>
  )
}

export default Product
