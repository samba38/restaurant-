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
  } = categoDetails

  const isAddon = addonCat.length === 0 ? '' : 'Customizations available'
  const onIncreaing = () => {
    addCartItem(categoDetails)
  }
  const onDecreasing = () => {
    addCartItem(categoDetails)
  }
  const renderCartBtn = () => {
    if (dishAvailability === true) {
      return (
        <div className="cart-card">
          <button className="btn-cart" type="button" onClick={onIncreaing}>
            +
          </button>
          <p className="btn-number" type="button">
            0
          </p>
          <button className="btn-cart" onClick={onDecreasing}>
            -
          </button>
        </div>
      )
    } else {
      return <p className="not-available"> Not available </p>
    }
  }
  return (
    <li className="list-food-items">
      <div>
        <h1 className="list-food-items-heading">{dishName}</h1>
        <p className="list-food-items-currency">
          {dishCurrency} {dishPrice}
        </p>
        <p className="list-food-items-description">{dishDescription}</p>
        {renderCartBtn()}
        <p className="list-food-items-Customizations">{isAddon}</p>
      </div>
      <div className="sider-img">
        <p className="list-food-items-calories">{dishCalories} calories</p>
        <img src={dishImage} className="food-img" />
      </div>
    </li>
  )
}

export default Products
