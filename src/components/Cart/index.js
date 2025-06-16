import {Component, useContext} from 'react'
import CartContext from '../../Context/CartContext'
import Header from '../Header'
import CartItemList from '../CartItemList'
import './index.css'

class Cart extends Component {
  state = {headerCategory: {}}

  componentDidMount() {
    this.getName()
  }

  getName = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const upadtedData = {
      restaurantName: fetchedData[0].restaurant_name,
    }
    this.setState({headerCategory: upadtedData})
  }

  renderEmptyView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        className="empty-cart-img"
        alt="empty view"
      />
      <p className="empty-cart-paragraph">Your cart is Empty.</p>
    </div>
  )

  renderCartItems = () => <h1>samba</h1>

  render() {
    const {headerCategory} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartItems, removeAllCartItems} = value
          const onremoveAll = () => {
            removeAllCartItems()
          }
          return (
            <>
              <Header headerCategory={headerCategory} />
              {cartItems.length > 0 ? (
                <ul className="unorder-cart-items-list">
                  <button
                    className="remove-all-carts"
                    type="button"
                    onClick={onremoveAll}
                  >
                    Remove All
                  </button>
                  {cartItems.map(eachItem => (
                    <CartItemList details={eachItem} key={eachItem.dishId} />
                  ))}
                </ul>
              ) : (
                this.renderEmptyView()
              )}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
