import React, { useState, useEffect, Suspense } from 'react'
import Layout from './Layout'
import { homeProduct } from './apiCore'
import Card from './Card'
import Search from './Search'
import { Row, Col } from 'react-bootstrap'
// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div>Loading...</div>;
const HomeSlide = React.lazy(() => import('./HomeSlide'));

const Home = () => {
    // Step 3
    const [productBySell, setproductBySell] = useState([])
    const [productByArrival, setProductByArrival] = useState([])
    const [error, setError] = useState(false)
    // STEP 4
    const loadProductBySell = () => {
        homeProduct(`sold`, 8)
        .then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setproductBySell(data)
            }
        })
    }
    //Step 5
    const loadProductByArrival = () => {
        homeProduct(`createdAt`, 8)
        .then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setProductByArrival(data)
            }
        })
    }
    // Step 6
    useEffect(()=>{
        loadProductByArrival()
        loadProductBySell()
    }, [])
    // Step 2
    return (
        <Layout title="" description="" className="container bg-white shadow-sm">
          <Row className="mb-5 pt-3">
            <Col>
              <Suspense fallback={loading()}>
                <HomeSlide />
              </Suspense>
            </Col>
          </Row>
            <div className="AsideTitle3">
              <span className="name shadow">Sản phẩm bán chạy </span>
            </div>
            <Suspense fallback={loading()}>
              <Row xs={2} md={4} lg={4}>
                {productBySell.map((product, i)=>(
                  <React.Fragment>
                    <Card key={i} product={product}/>
                  </React.Fragment>
                ))}
              </Row>
            </Suspense>
            <div className="clearfix mt-3"></div>
            <div className="AsideTitle3">
              <span className="name shadow">Sản phẩm mới cập nhật </span>
            </div>
            <Row xs={2} md={4} lg={4}>
                {productByArrival.map((product, i)=>{
                  return (
                    <React.Fragment>
                      <Card key={i} product={product}/>
                    </React.Fragment>
                  )
                })}
            </Row>
        </Layout>
    )
}
export default Home;
