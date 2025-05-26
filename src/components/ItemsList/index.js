import './index.css'

const ItemsList = props => {
  const {details, renderNewCategory, isThere} = props
  const {menuCategory, menuCategoryId} = details
  const onChangeId = () => {
    renderNewCategory(menuCategoryId)
  }
  const isTrue = isThere ? 'menu-button' : 'mennu-buttons'
  return (
    <li className="list-menu-items">
      <button className={isTrue} type="button" onClick={onChangeId}>
        {menuCategory}
      </button>
    </li>
  )
}

export default ItemsList
