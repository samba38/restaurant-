import {Component} from 'react'
import Header from '../Header'
import ItemsList from '../ItemsList'
class FoodList extends Component {
  state = {productsList: []}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    const updatedData = fetchedData.table_menu_list.map(eachList => ({
      categoryDishes: eachList.category_dishes,
      menuCategory: eachList.menu_category,
      menuCategoryId: eachList.menu_category_id,
      menuCategory_image: eachList.menu_category_image,
      nexturl: eachList.nexturl,
    }))

    this.setState({productsList: updatedData})
    console.log(updatedData)
  }
  render() {
    const {productsList} = this.state
    return (
      <>
        <Header />
        <ul>
          {productsList.map(eachItem => (
            <ItemsList key={eachItem.menuCategoryId} details={eachItem} />
          ))}
        </ul>
      </>
    )
  }
}

export default FoodList
