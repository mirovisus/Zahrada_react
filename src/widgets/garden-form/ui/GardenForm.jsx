import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadBox } from '@shared/ui';

const GardenForm = ({
                      initialData = null,
                      onSubmit,
                      onDelete,
                      mode = 'create'
                    }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    city: '',
    street: '',
    house: '',
    zip: '',
    image: null,
    imageFile: null
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Předvyplníme formulář při editaci
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        area: initialData.area || '',
        city: initialData.city || '',
        street: initialData.street || '',
        house: initialData.house || '',
        zip: initialData.zip || '',
        image: initialData.image || null,
        imageFile: null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handler pro upload obrázku
  const handleImageChange = (imageData) => {
    setFormData({
      ...formData,
      image: imageData.preview,
      imageFile: imageData.file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData); // Předáme data včetně souboru
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    if (onDelete) {
      onDelete();
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const title = mode === 'edit' ? 'Upravit zahradu' : 'Vytvořit novou zahradu';
  const buttonText = mode === 'edit' ? 'Uložit změny' : 'Vytvořit';

  return (
    <>
      <div className="garden-form">
        <div className="garden-form__header">
          <Link to="/profile" className="garden-form__close cross-button">
            <span className="visually-hidden">Zavřít</span>
          </Link>

          <h1 className="garden-form__title h2">{title}</h1>
        </div>

        <form className="garden-form__body" onSubmit={handleSubmit}>
          <div className="garden-form__layout">
            <div className="garden-form__aside">
              <UploadBox
                name="garden_photo"
                id="garden-photo"
                initialPreview={formData.image}
                onFileChange={handleImageChange}
              />

              {mode === 'edit' && (
                <button
                  className="button button--delete"
                  type="button"
                  onClick={handleDeleteClick}
                  style={{
                    width: '100%',
                    marginTop: '16px'
                  }}
                >
                  Smazat zahradu
                </button>
              )}
            </div>

            <div className="garden-form__content">
              <div className="field">
                <label htmlFor="garden-name" className="field__label visually-hidden">
                  Název zahrady
                </label>
                <input
                  className = "field__input"
                  type = "text"
                  id = "garden-name"
                  name = "name"
                  value = {formData.name}
                  onChange = {handleChange}
                  placeholder = "Název zahrady"
                  required
                />
              </div>

              <div className = "field">
                <label
                  htmlFor = "garden-area"
                  className = "field__label visually-hidden"
                >
                  Plocha (m²)
                </label>
                <input
                  className="field__input"
                  type="number"
                  id="garden-area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Plocha (m²)"
                  min="0"
                />
              </div>

              <div className="field">
                <label htmlFor="garden-city" className="field__label visually-hidden">
                  Město
                </label>
                <input
                  className = "field__input"
                  type = "text"
                  id = "garden-city"
                  name = "city"
                  value = {formData.city}
                  onChange = {handleChange}
                  placeholder = "Město"
                />
              </div>

              <div className = "garden-form__row">
                <div className = "field">
                  <label
                    htmlFor = "garden-street"
                    className = "field__label visually-hidden"
                  >
                    Ulice
                  </label>
                  <input
                    className = "field__input"
                    type = "text"
                    id = "garden-street"
                    name = "street"
                    value = {formData.street}
                    onChange = {handleChange}
                    placeholder = "Ulice"
                  />
                </div>

                <div className = "field">
                  <label
                    htmlFor = "garden-house"
                    className = "field__label visually-hidden"
                  >
                    Číslo domu
                  </label>
                  <input
                    className = "field__input"
                    type = "text"
                    id = "garden-house"
                    name = "house"
                    value = {formData.house}
                    onChange = {handleChange}
                    placeholder = "Číslo domu"
                  />
                </div>

                <div className = "field">
                  <label
                    htmlFor = "garden-zip"
                    className = "field__label visually-hidden"
                  >
                    PSČ
                  </label>
                  <input
                    className = "field__input"
                    type = "text"
                    id = "garden-zip"
                    name = "zip"
                    value = {formData.zip}
                    onChange = {handleChange}
                    placeholder = "PSČ"
                  />
                </div>
              </div>

              <button
                className = "button button--green garden-form__submit"
                type = "submit"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>

    {/* Modal pro potvrzení smazání zahrady */}
    {showDeleteConfirm && (
      <div
        className="modal-backdrop"
        onClick={handleDeleteCancel}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%'
          }}
        >
          <div className="modal__header" style={{ marginBottom: '16px' }}>
            <h2 className="modal__title" style={{ margin: 0 }}>
              Smazat zahradu
            </h2>
          </div>

          <div className="modal__body" style={{ marginBottom: '24px' }}>
            <p>
              Opravdu chcete smazat tuto zahradu? Tato akce je nevratná
              a všechna data zahrady budou trvale odstraněna.
            </p>
          </div>

          <div
            className="modal__footer"
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}
          >
            <button
              className="button button--transparent"
              onClick={handleDeleteCancel}
            >
              Zrušit
            </button>
            <button
              className="button button--delete"
              onClick={handleDeleteConfirm}
            >
              Smazat
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default GardenForm;