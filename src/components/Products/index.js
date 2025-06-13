import {useContext, useState} from 'react'
import CartContext from '../../Context/CartContext'
import './index.css'

const Products = props => {
  const [quantity, setQunatity] = useState(0)
  const {
    addCartItem,
    cartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)
  const {categoDetails} = props
  const {
    dishName,
    dishPrice,
    dishDescription,
    dishCalories,
    dishImage,
    dishCurrency,
    addonCat,
    dishAvailability,
    dishType,
    dishId,
  } = categoDetails

  const isAddon = addonCat.length === 0 ? '' : 'Customizations available'

  const onIncreaseQunatity = () => {
    setQunatity(prevState => prevState + 1)
  }
  const onDecreseQunatity = () => {
    setQunatity(prevState => (prevState > 0 ? prevState - 1 : 0))
  }
  const onAddTocart = () => {
    addCartItem({...categoDetails, quantity})
  }
  const qunatyPro = () => {
    const getQunatity = cartItems.find(eachItem => eachItem.dishId === dishId)
    return getQunatity ? getQunatity.quantity : 0
  }

  const renderDishType = () => {
    if (dishType > 1) {
      return (
        <div className="dish-type-2">
          <div className="dish-type-round-2" />
        </div>
      )
    }
    return (
      <div className="dish-type-1">
        <div className="dish-type-round-1" />
      </div>
    )
  }

  const renderCartBtn = () => {
    if (dishAvailability === true) {
      return (
        <div className="cart-card">
          <button
            className="btn-cart"
            type="button"
            onClick={onIncreaseQunatity}
          >
            +
          </button>
          <p className="btn-number">{quantity}</p>
          <button
            className="btn-cart"
            type="button"
            onClick={onDecreseQunatity}
          >
            -
          </button>
        </div>
      )
    }
    return <p className="not-available"> Not available </p>
  }
  return (
    <li className="list-food-items">
      <div className="sider-img">
        {renderDishType()}
        <div>
          <h1 className="list-food-items-heading">{dishName}</h1>
          <p className="list-food-items-currency">
            {dishCurrency} {dishPrice}
          </p>
          <p className="list-food-items-description">{dishDescription}</p>
          {renderCartBtn()}
          <p className="list-food-items-Customizations">{isAddon}</p>
          {quantity > 0 && (
            <button className="add-cart-btn" onClick={onAddTocart}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
      <div className="sider-img">
        <p className="list-food-items-calories">{dishCalories} calories</p>
        <img src={dishImage} className="food-img" alt={dishName} />
      </div>
    </li>
  )
}

export default Products
