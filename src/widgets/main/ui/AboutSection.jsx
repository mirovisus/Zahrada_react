const AboutSection = () => {
  return (
    <section className="section section--banner">
      <div className="container">
        <div className="section__body section__banner about-us">
          <h2 className="section__title">O nás</h2>
          <blockquote className="section__description">
            <p>
              "Jsme profesionální zahradnická firma{' '}
              <span className="text-muted">
                s vášní pro vytváření krásných a funkčních zahrad.
              </span>{' '}
              Nabízíme širokou škálu služeb{' '}
              <span className="text-muted">
                od návrhu až po údržbu.
              </span>{' '}
              Vaše zahrada bude místem radosti."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default AboutSection