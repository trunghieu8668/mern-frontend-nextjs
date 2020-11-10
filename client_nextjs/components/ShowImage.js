import Link from 'next/link'
import noPhoto from '../assets/images/no-photo.png'
const ShowImage = ({ item, classNameFigure = "", classNameLink = "", classNameImg = "card-img-top img-fluid mb-3"}) => {
  return (
    <div className={classNameFigure}>
        <Link href={ `/product/${item._id }` }>
          <a className={ classNameLink } title={ item.productName }>
            <img className={ classNameImg } src={ item.pictures && item.pictures.length > 0 ? item.pictures[0].url_mobile : noPhoto} alt={ item.productName }/>
          </a>
        </Link>
    </div>
  )
}
export default ShowImage
