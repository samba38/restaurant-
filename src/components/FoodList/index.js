import {Component, useContext} from 'react'
import Loader from 'react-loader-spinner'
import CartContext from '../../Context/CartContext'
import Header from '../Header'
import ItemsList from '../ItemsList'
import Products from '../Products'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class FoodList extends Component {
  state = {
    productsList: [],
    categoriesOption: '',
    apiStatus: apiStatusConstants.initial,
    headerCategory: {},

    itemsCart: [],
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
    if (response.ok === true) {
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
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  oncahngeApi = () => {
    this.getProducts()
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

  renderProductDetails = () => {
    const {productsList, categoriesOption, itemsCart} = this.state
    const {categoryDishes} = productsList.find(
      eachCato => eachCato.menuCategoryId === categoriesOption,
    )

    return (
      <ul>
        {categoryDishes.map(products => (
          <Products
            categoDetails={products}
            key={products.dishId}
            itemsCart={itemsCart}
            addCartItemDish={this.addCartItemDish}
            removeCartIemsDish={this.removeCartIemsDish}
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
        <Header headerCategory={headerCategory} />
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

  rnderFailureApi = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button className="failure-btn" onClick={this.oncahngeApi}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderEveryProduct()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.rnderFailureApi()
      default:
        return null
    }
  }
}

export default FoodList
