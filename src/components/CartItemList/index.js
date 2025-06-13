import {useContext} from 'react'
import CartContext from '../../Context/CartContext'
import './index.css'

const CartItemList = props => {
  const {details} = props
  const {dishName, dishImage, dishPrice, quantity, dishId} = details
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)
  const onIncreaseQunatity = () => {
    incrementCartItemQuantity(dishId)
  }
  const onDecreseQunatity = () => {
    decrementCartItemQuantity(dishId)
  }

  return (
    <li className="cart-items-container">
      <div className="sider-cart-item">
        <img src={dishImage} className="cart-items-img" />
        <h1 className="cart-items-heading">{dishName}</h1>
      </div>
      <div className="sider-cart-item2">
        <button
          className="cart-items-btn"
          type="button"
          onClick={onIncreaseQunatity}
        >
          +
        </button>
        <p className="cart-qunatity-para">{quantity}</p>
        <button
          className="cart-items-btn"
          type="button"
          onClick={onDecreseQunatity}
        >
          -
        </button>
      </div>
      <p className="cart-items-paragraph">RS:{dishPrice * quantity}</p>
      <button className="cart-items-remove-btn">Remove</button>
    </li>
  )
}

export default CartItemList
