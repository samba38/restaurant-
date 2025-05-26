import './index.css'

const Products = props => {
  const {categoDetails, cartItems, addCartItem, removeCartIems} = props
  const {
    dishName,
    dishPrice,
    dishDescription,
    dishCalories,
    dishImage,
    nexturl,
    dishCurrency,
    addonCat,
    dishAvailability,
    dishType,
    dishId,
  } = categoDetails

  const isAddon = addonCat.length === 0 ? '' : 'Customizations available'
  const onIncreaing = () => {
    addCartItem(categoDetails)
  }
  const onDecreasing = () => {
    removeCartIems(categoDetails)
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
          <button className="btn-cart" type="button" onClick={onIncreaing}>
            +
          </button>
          <p className="btn-number" type="button">
            {qunatyPro()}
          </p>
          <button className="btn-cart" onClick={onDecreasing}>
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
        </div>
      </div>
      <div className="sider-img">
        <p className="list-food-items-calories">{dishCalories} calories</p>
        <img src={dishImage} className="food-img" />
      </div>
    </li>
  )
}

export default Products
