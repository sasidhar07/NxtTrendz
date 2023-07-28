import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import SimilarProductitem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {
    itemDetailsList: '',
    isLoading: true,
    SimilarProducts: [],
    quantity: 1,
    status: true,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  increaseQuantity = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  decreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity <= 1) {
      this.setState({quantity: 1})
    } else {
      this.setState(prev => ({quantity: prev.quantity - 1}))
    }
  }

  getProductDetails = async () => {
    const {match} = this.props
    this.setState({isLoading: true})
    const url = `https://apis.ccbp.in/products/${match.params.id}`
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        itemDetailsList: data,
        SimilarProducts: [...data.similar_products],
        isLoading: false,
        status: false,
      })
    } else {
      this.setState({status: true})
    }
  }

  render() {
    const {
      itemDetailsList,
      status,
      isLoading,
      quantity,
      SimilarProducts,
    } = this.state
    if (isLoading) {
      return (
        <>
          <Header />
          <div className="LoaderCard">
            <Loader
              type="ThreeDots"
              data-testid="loader"
              color="#0b69ff"
              height="50"
              width="50"
            />
          </div>
        </>
      )
    }
    if (status) {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="error view"
        />
      )
    }
    return (
      <div className="mainContItem">
        <Header />
        <div className="mainContItem1">
          <div className="itemCardDetails">
            <img
              src={itemDetailsList.image_url}
              className="itemImg"
              alt="product"
            />
            <div className="innerItemCardDetails">
              <h1>{itemDetailsList.title}</h1>
              <p>Rs {itemDetailsList.price}/-</p>

              <div className="ratingStarCard">
                <div className="ratingCard">
                  <p>{itemDetailsList.rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    className="star"
                    alt="star"
                  />
                </div>
                <p>{itemDetailsList.total_reviews} Reviews</p>
              </div>
              <p>{itemDetailsList.description}</p>
              <p>
                <span>Available: </span>
                {itemDetailsList.availability}
              </p>
              <p>
                <span>Brand: </span>
                {itemDetailsList.brand}
              </p>
              <hr />
              <div className="quantityCard">
                <button
                  type="button"
                  className="IncreamentButton"
                  onClick={this.decreaseQuantity}
                  data-testid="minus"
                >
                  <BsDashSquare />
                </button>

                <p className="quantityNumber">{quantity}</p>
                <button
                  className="IncreamentButton"
                  onClick={this.increaseQuantity}
                  data-testid="plus"
                  type="button"
                >
                  <BsPlusSquare />
                </button>
              </div>
              <button type="button" className="CartButton">
                ADD TO CART
              </button>
            </div>
          </div>
          <h1>Similar Products</h1>
          <ul className="ulListSimilar">
            {SimilarProducts.map(each => (
              <SimilarProductitem key={each.id} eachItem={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProductItemDetails
