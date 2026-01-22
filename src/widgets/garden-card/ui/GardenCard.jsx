import { Link } from 'react-router-dom';

const GardenCard = (props) => {
  const {
    image,
    name,
    city,
    street,
    house,
    id
  } = props

  const address = street && house
    ? `${street} ${house}, ${city}`
    : city;

  return (
    <Link to={`/gardens/${id}/edit`} className="garden-card">
      <img
        className="garden-card__image"
        src={image}
        alt={name}
        loading="lazy"
      />
      <div className="garden-card__overlay">
        <h3 className="garden-card__title h4">{name}</h3>
        <p className="garden-card__address">{address}</p>
      </div>
    </Link>
  )
}

export default GardenCard