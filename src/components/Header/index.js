import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {cartItems, headerCategory} = props
  const cartLength = cartItems.length
  const {restaurantName} = headerCategory
  return (
    <nav className="nav-container">
      <h1 className="nav-restro-heading">{restaurantName}</h1>
      <div className="cart-card-show">
        <p className="nav-restro-orders">my Orders</p>
        <div className="cart-count">
          <IoCartOutline className="nav-cart-icon" />
        </div>
        <p className="cartCount">{cartLength}</p>
      </div>
    </nav>
  )
}

export default Header
