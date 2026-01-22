export const GardenCard = props => {
  const {
    image,
    name,
    address,
    className = ''
  } = props

  return (
    <article className = {`garden-card ${className}`}>
      <img
        className = "garden-card__image"
        src = {image}
        alt = {name}
        loading = "lazy"
      />
      <div className = "garden-card__overlay">
        <h3 className = "garden-card__title h4">{name}</h3>
        <p className = "garden-card__address">{address}</p>
      </div>
    </article>
  )
}

export default GardenCard