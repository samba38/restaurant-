import {Component} from 'react'
import Header from '../Header'
import ItemsList from '../ItemsList'
import Products from '../Products'
import Loader from 'react-loader-spinner'
import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}
class FoodList extends Component {
  state = {
    productsList: [],
    cartItems: [],
    categoriesOption: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData[0].table_menu_list.map(eachList => ({
      menuCategory: eachList.menu_category,
      menuCategoryId: eachList.menu_category_id,
      menuCategoryImage: eachList.menu_category_image,
      nexturl: eachList.nexturl,
      categoryDishes: eachList.category_dishes.map(eachDish => ({
        addonCat: eachDish.addonCat,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        dishCalories: eachDish.dish_calories,
        dishCurrency: eachDish.dish_currency,
        dishDescription: eachDish.dish_description,
        dishId: eachDish.dish_id,
        dishImage: eachDish.dish_image,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        nexturl: eachDish.nexturl,
      })),
    }))
    this.setState({
      productsList: updatedData,
      categoriesOption: updatedData[0].menuCategoryId,
      apiStatus: apiStatusConstants.success,
    })
  }
  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  addCartItem = dish => {
    const {cartItems} = this.state

    const isAlreadyExist = cartItems.find(item => item.dishId === dish.dishId)

    if (isAlreadyExist) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: (item.quantity || 1) + 1}
            : item,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, {...dish, quantity: 1}],
      }))
    }
  }

  removeCartIems = dish => {
    const {cartItems} = this.state
    const isAlreadyExist = cartItems.find(item => item.dishId === dish.dishId)
    if (isAlreadyExist.quantity > 1) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(eachProduct => {
          if (eachProduct.dishId === dish.dishId) {
            const upadetQunatity = eachProduct.quantity - 1
            return {...eachProduct, quantity: upadetQunatity}
          }
          return eachProduct
        }),
      }))
    } else {
      const filterObjects = cartItems.filter(
        eachPart => eachPart.dishId !== id.dishId,
      )
      this.setState({cartItems: filterObjects})
    }
  }

  renderProductDetails = () => {
    const {productsList, categoriesOption, cartItems} = this.state
    const {categoryDishes} = productsList.find(
      eachCato => eachCato.menuCategoryId === categoriesOption,
    )

    return (
      <ul>
        {categoryDishes.map(products => (
          <Products
            categoDetails={products}
            key={products.dishId}
            cartItems={cartItems}
            addCartItem={this.addCartItem}
            removeCartIems={this.removeCartIems}
          />
        ))}
      </ul>
    )
  }

  renderNewCategory = id => {
    this.setState({categoriesOption: id})
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {productsList, categoriesOption, cartItems} = this.state

    return (
      <>
        <Header cartItems={cartItems} />
        <ul className="unorder-menu-list">
          {productsList.map(eachPro => (
            <ItemsList
              key={eachPro.menuCategoryId}
              details={eachPro}
              renderNewCategory={this.renderNewCategory}
              isThere={eachPro.menuCategoryId === categoriesOption}
            />
          ))}
        </ul>
        <hr />
        {this.renderAllProducts()}
      </>
    )
  }
}

export default FoodList
