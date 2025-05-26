import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ItemsList from '../ItemsList'
import Products from '../Products'
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
    headerCategory: {},
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
    console.log(fetchedData)
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
    const firstUpdate = {
      branchName: fetchedData[0].branch_name,
      restaurantId: fetchedData[0].restaurant_id,
      restaurantImage: fetchedData[0].restaurant_image,
      restaurantName: fetchedData[0].restaurant_name,
    }
    console.log(firstUpdate)
    this.setState({
      productsList: updatedData,
      categoriesOption: updatedData[0].menuCategoryId,
      headerCategory: firstUpdate,
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
    console.log(isAlreadyExist)
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
        eachPart => eachPart.dishId !== dish.dishId,
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

  renderEveryProduct = () => {
    const {
      productsList,
      categoriesOption,
      cartItems,
      headerCategory,
    } = this.state
    return (
      <>
        <Header cartItems={cartItems} headerCategory={headerCategory} />
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
        {this.renderProductDetails()}
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderEveryProduct()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default FoodList
