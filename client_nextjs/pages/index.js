import React from 'react'
import { getProducts } from '../functions/product'
import {Row} from 'react-bootstrap'
import Layout from '../components/Layout'
import { Header, Footer } from '../components/share-components/index'
import { HomeProducts, HomeSlide } from '../components/home/index'

 const Home = ({products}) => {
  return (
    <Layout title="Home Page" description="description" className="wraper-full">
      <Header />
      <main className="wraper-site">
        <HomeSlide />
        {products && products.length > 0 && (
          <section className="home-product--section container mt-5 mt-md-5 mt-lg-5">
            <div className="AsideTitle3">
              <span className="name shadow">Sản phẩm mới nhất</span>
            </div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-4">
              <HomeProducts products={products}/>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </Layout>
  )
}

Home.getInitialProps = () => {
  let sortBy = 'createdAt';
  let limit = 8;
  return getProducts(sortBy, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { products: data.data };
    }
  });
}
export default Home;
