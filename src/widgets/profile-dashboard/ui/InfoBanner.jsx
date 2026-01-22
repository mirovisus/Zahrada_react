const InfoBanner = ({username}) => {
  return (
    <section className = "info-banner">
      <h1 className = "info-banner__title h2">Ahoj, {username}!</h1>
      <p className = "info-banner__text">
        Vše je aktuální, <strong>žádné nové zprávy</strong>
      </p>
    </section>
  )
}

export default InfoBanner