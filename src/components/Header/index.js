import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useContext} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../Context/CartContext'
import './index.css'

const Header = props => {
  const {headerCategory} = props
  const {restaurantName} = headerCategory
  const {cartItems} = useContext(CartContext)
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/" className="linker">
        <h1 className="nav-restro-heading">{restaurantName}</h1>
      </Link>

      <div className="cart-card-show">
        <p className="nav-restro-orders">my Orders</p>
        <div className="cart-count">
          <Link to="/cart" className="linker">
            <button className="cart-icon-btn" type="button" data-testid="cart">
              <IoCartOutline className="nav-cart-icon" />
            </button>
          </Link>
        </div>
        <p className="cartCount">{cartItems.length}</p>
        <button className="nav-lagout" type="button" onClick={onLogout}>
          Lagout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
