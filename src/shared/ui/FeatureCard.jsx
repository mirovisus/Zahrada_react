const FeatureCard = (props) => {
  const {
    title,
    description,
    image,
    variant = 'default'
  } = props;

  const cardClass = `feature-card ${variant === 'first' ? 'feature-card--first' : ''}`;

  return (
    <article className={cardClass}>
      {variant === 'first' && image ? (
        <div className="feature-card__body">
          <img
            className="feature-card__image"
            src={image}
            alt=""
            width="554"
            height="582"
            loading="lazy"
          />
          <div className="feature-card__scroll"></div>
        </div>
      ) : null}

      <h3 className="feature-card__title">{title}</h3>
      <div className="feature-card__description">
        <p>{description}</p>
      </div>
    </article>
  )
}

export default FeatureCard