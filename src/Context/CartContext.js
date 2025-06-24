import React from 'react'

const CartContext = React.createContext({
  cartItems: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
  itemsCart: [],
  addCartItemDish: () => {},
  removeCartIemsDish: () => {},
})

export default CartContext
