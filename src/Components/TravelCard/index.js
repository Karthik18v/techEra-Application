import {Link} from 'react-router-dom'
import './index.css'

const TravelCard = props => {
  const {eachTech} = props
  const {id, name, logoUrl} = eachTech
  return (
    <Link
      to={`/courses/${id}`}
      style={{textDecoration: 'none', color: 'black'}}
    >
      <div className="travel-card">
        <img className="logo" src={logoUrl} alt={name} />
        <p>{name}</p>
      </div>
    </Link>
  )
}
export default TravelCard
