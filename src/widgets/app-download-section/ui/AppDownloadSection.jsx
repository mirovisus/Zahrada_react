const AppDownloadSection = () => {
  return (
    <section className="section container" id="application">
      <div className="section__body">
        <div className="app app__main">
          <div className="app__content">
            <h2 className="app__title">Stáhněte si aplikaci</h2>
            <div className="app__description">
              <p>
                Získejte plný přehled o vašich projektech, sledujte pokrok a spravujte vše
                snadno a rychle přímo z vašeho mobilu. Ať už jde o plánování, údržbu nebo
                hodnocení služeb, aplikace vám usnadní život a ušetří čas. Stáhněte si ji
                ještě dnes a začněte s profesionální péčí o vaši zahradu!
              </p>
            </div>
            <div className="app__buttons">
              <a href="#" className="app__button button">
                Google Play
              </a>
              <a href="#" className="app__button button">
                App Store
              </a>
            </div>
          </div>

          <div className="app__media">
            <img
              className="app__media-image"
              src="/images/aplikace.png"
              alt="Foto aplikace"
              width="557"
              height="666"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;