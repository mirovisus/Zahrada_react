import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="section container" id="hero">
      <div className="section__body">
        <div className="hero hero__main">
          <div className="hero__content">
            <h1 className="hero__title">
              Vytvořte si zahradu podle svých vizí
            </h1>
            <div className="hero__description">
              <p>
                Zadejte informace o své zahradě a připojte své nápady.
                <span className="break">
                  Naši odborníci se postarají o zbytek.
                </span>
              </p>
            </div>
            <Link className="hero__button button" to="/application">
              <span className="button__text">Stáhnout aplikaci</span>
              <span className="button__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 7L17 17M17 17V7M17 17H7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>

          <div className="hero__media">
            <img
              className="hero__media-image"
              src="/images/image-bg.png"
              alt="Zahrada s domem"
              width="591"
              height="780"
              loading="lazy"
            />

            <div className="hero__card card card-hero">
              <div className="hero__card-content">
                <img
                  className="card__image"
                  src="/images/image-hero-card.png"
                  alt=""
                  width="204"
                  height="228"
                  loading="lazy"
                />
                <h4 className="card__title">Sledujte proměny</h4>
              </div>

              <div className="card__description">
                <p>
                  Uložte si fotografie před a po úpravách a objevte,
                  jak se mění.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero