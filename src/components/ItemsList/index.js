const ItemsList = props => {
  const {details} = props
  const {menuCategory}=details
  return (
    <li>
    <p>{menuCategory}</p>
    </li>
  )
}

export default ItemsList
