import Link from 'next/link'
import { Row, Col } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import Card from '../card/Card'
const HomeProducts = ({products}) => {
  return (
    products && products.length > 0 && products.map((product, i) => {
      return <Card key={i} product={product}/>
    })
  )
}
export default HomeProducts
