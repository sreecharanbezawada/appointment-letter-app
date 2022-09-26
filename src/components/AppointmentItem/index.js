import './index.css'

const AppointmentItem = props => {
  const {objectList, starFavorite} = props
  const {id, title, dateTime, isFavorite} = objectList
  const applyClassStyle = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const starClick = () => {
    starFavorite(id)
  }
  return (
    <li className="list-item">
      <div className="first-holder">
        <p className="top-heading">{title}</p>
        <button
          type="button"
          className="star-btn"
          testid="star"
          onClick={starClick}
        >
          <img src={applyClassStyle} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {dateTime}</p>
    </li>
  )
}
export default AppointmentItem
