import React from 'react'

const CartContext = React.createContext({
  cartItems: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
