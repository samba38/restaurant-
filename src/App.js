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
  state = {cartItems: [], itemsCart: []}

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

  addCartItemDish = dish => {
    const {itemsCart} = this.state

    const isAlreadyExist = itemsCart.find(item => item.dishId === dish.dishId)
    if (isAlreadyExist) {
      this.setState(prevState => ({
        itemsCart: prevState.itemsCart.map(eachCart => {
          if (eachCart.dishId === dish.dishId) {
            const upadetQunatity = eachCart.quantity + 1
            return {
              ...eachCart,
              quantity: upadetQunatity,
            }
          }
          return eachCart
        }),
      }))
    } else {
      this.setState(prevState => ({
        itemsCart: [
          ...prevState.itemsCart,
          {
            ...dish,
            quantity: 1,
          },
        ],
      }))
    }
  }

  removeCartIemsDish = dish => {
    const {itemsCart} = this.state
    const isAlreadyExist = itemsCart.find(item => item.dishId === dish.dishId)
    if (isAlreadyExist) {
      console.log(isAlreadyExist)
      if (isAlreadyExist.quantity > 1) {
        this.setState(prevState => ({
          itemsCart: prevState.itemsCart.map(eachProduct => {
            if (eachProduct.dishId === dish.dishId) {
              const upadetQunatity = eachProduct.quantity - 1
              return {...eachProduct, quantity: upadetQunatity}
            }
            return eachProduct
          }),
        }))
      } else {
        const filterObjects = itemsCart.filter(
          eachPart => eachPart.dishId !== dish.dishId,
        )
        this.setState({itemsCart: filterObjects})
      }
    }
  }

  render() {
    const {cartItems, itemsCart} = this.state
    return (
      <CartContext.Provider
        value={{
          cartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          itemsCart,
          addCartItemDish: this.addCartItemDish,
          removeCartIemsDish: this.removeCartIemsDish,
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
