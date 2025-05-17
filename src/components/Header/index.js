import {IoCartOutline} from 'react-icons/io5'
import './index.css'
const Header = () => {
  return (
    <nav className="nav-container">
      <h1 className="nav-restro-heading">UNI Resto Cafe</h1>
      <IoCartOutline className="nav-cart-icon" />
    </nav>
  )
}

export default Header
