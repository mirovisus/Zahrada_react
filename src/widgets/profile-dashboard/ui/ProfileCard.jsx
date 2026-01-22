import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@app/providers/auth';

const ProfileCard = ({ user }) => {
  const navigate = useNavigate();
  const { updateProfile, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Validace jednotlivých polí
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) {
          return 'Uživatelské jméno je povinné';
        }
        if (value.length < 3) {
          return 'Minimálně 3 znaky';
        }
        return '';

      case 'email':
        if (!value.trim()) {
          return 'Email je povinný';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Neplatný formát emailu';
        }
        return '';

      case 'password':
        // Heslo je volitelné (prázdné = neměnit)
        if (value && value.length < 6) {
          return 'Heslo musí mít alespoň 6 znaků';
        }
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Vyčistíme chybu při změně
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validace všech polí
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Připravíme data pro aktualizaci
      const updates = {
        username: formData.username,
        email: formData.email,
      };

      // Pokud bylo zadáno nové heslo, přidáme ho
      if (formData.password) {
        updates.password = formData.password;
      }

      // Zavoláme updateProfile z AuthContext
      const result = updateProfile(updates);

      if (result.success) {
        // Po úspěšném uložení vyčistíme heslo
        setFormData({
          ...formData,
          password: ''
        });

        alert('Profil byl úspěšně uložen!');
      } else {
        setErrors({
          submit: result.error || 'Chyba při ukládání profilu'
        });
      }
    } catch (error) {
      console.error('Chyba při ukládání:', error);
      setErrors({
        submit: 'Neočekávaná chyba při ukládání'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteConfirm(false);
    setIsSubmitting(true);

    try {
      // Odstraníme uživatele z localStorage
      const usersData = localStorage.getItem('zahrada_users');
      if (usersData) {
        const users = JSON.parse(usersData);
        const updatedUsers = users.filter(u => u.id !== user.id);
        localStorage.setItem('zahrada_users', JSON.stringify(updatedUsers));
      }

      // Odhlásíme uživatele
      logout();

      // Přesměrujeme na login stránku
      navigate('/login');
    } catch (error) {
      console.error('Chyba při mazání účtu:', error);
      alert('Chyba při mazání účtu');
      setIsSubmitting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-card__header">
          <img
            className="profile-card__avatar"
            src={user?.avatar || '/images/profile/profil-man.jpg'}
            alt={user?.username || 'person'}
            width="72"
            height="72"
            loading="lazy"
          />

          <div className="profile-card__info">
            <p className="profile-card__name h4">
              {user?.username || formData.username}
            </p>
            <p className="profile-card__role">
              {user?.role === 'owner' ? 'Vlastník zahrady' : 'Pracovník'}
            </p>
          </div>
        </div>

        <form
          className="profile-card__form"
          onSubmit={handleSubmit}
        >
          <div className="profile-card__field field">
            <label
              htmlFor="profile-username"
              className="field__label visually-hidden"
            >
              Uživatelské jméno
            </label>
            <input
              className={`field__input ${errors.username ? 'field__input--error' : ''}`}
              id="profile-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Uživatelské jméno"
              type="text"
              disabled={isSubmitting}
            />
            {errors.username && (
              <span className="field__error">{errors.username}</span>
            )}
          </div>

          <div className="profile-card__field field">
            <label
              htmlFor="profile-email"
              className="field__label visually-hidden"
            >
              E-mail
            </label>
            <input
              className={`field__input ${errors.email ? 'field__input--error' : ''}`}
              id="profile-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="field__error">{errors.email}</span>
            )}
          </div>

          <div className="profile-card__field field">
            <label
              htmlFor="profile-password"
              className="field__label visually-hidden"
            >
              Nové heslo
            </label>
            <input
              className={`field__input ${errors.password ? 'field__input--error' : ''}`}
              id="profile-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nové heslo (volitelné)"
              type="password"
              autoComplete="new-password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="field__error">{errors.password}</span>
            )}
          </div>

          {errors.submit && (
            <div className="profile-card__error" role="alert">
              {errors.submit}
            </div>
          )}

          <div className="profile-card__actions">
            <button
              className="button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ukládání...' : 'Uložit'}
            </button>

            <button
              className="button button--delete"
              type="button"
              onClick={handleDeleteClick}
              disabled={isSubmitting}
            >
              Smazat účet
            </button>
          </div>
        </form>
      </div>

      {/* Modal pro potvrzení smazání */}
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
                Smazat účet
              </h2>
            </div>

            <div className="modal__body" style={{ marginBottom: '24px' }}>
              <p>
                Opravdu chcete smazat svůj účet? Tato akce je nevratná
                a všechna vaše data budou trvale odstraněna.
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
  )
}

export default ProfileCard