import './index.css'

const SimilarProductitem = props => {
  const {eachItem} = props
  return (
    <li className="SimilarCard">
      <img
        src={eachItem.image_url}
        className="SimilarImg"
        alt="similar product"
      />
      <h3>{eachItem.title}</h3>
      <p>by {eachItem.brand}</p>
      <div className="lastSimilarCard">
        <p>Rs {eachItem.price}/-</p>
        <div className="ratingCard1">
          <p>{eachItem.rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            className="star1"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductitem
