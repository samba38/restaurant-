import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import CartContext from './Context/CartContext'
import FoodList from './components/FoodList'
import LoginForm from './components/LoginForm'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {cartItems: []}

  addCartItem = product => {
    console.log(product)
    const {cartItems} = this.state
    const productObject = cartItems.find(
      eachCartItem => eachCartItem.dishId === product.dishId,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(eachItem => {
          if (eachItem.dishId === productObject.dishId) {
            const upadetQunatity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: upadetQunatity}
          }
          return eachItem
        }),
      }))
    } else {
      const updateList = [...cartItems, product]
      this.setState({cartItems: updateList})
    }
    console.log(cartItems)
  }

  removeCartItem = id => {
    const {cartItems} = this.state
    const filterObject = cartItems.filter(eachList => eachList.dishId !== id)
    this.setState({cartItems: filterObject})
  }

  incrementCartItemQuantity = id => {
    const {cartItems} = this.state
    this.setState(prevState => ({
      cartItems: prevState.cartItems.map(eachCartItem => {
        if (eachCartItem.dishId === id) {
          const upadetQunatity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: upadetQunatity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartItems} = this.state
    const productObject = cartItems.find(eachItem => eachItem.dishId === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(eachCartItem => {
          if (eachCartItem.dishId === id) {
            const upadetQunatity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: upadetQunatity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartItems: []})
  }

  render() {
    const {cartItems} = this.state
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={FoodList} />
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
