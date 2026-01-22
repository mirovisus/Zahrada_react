import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@app/providers/auth';

const PrivateHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    const result = logout();

    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <header className = "header">
      <div className = "header__inner container">
        <div className = "header__spacer"></div>

        <Link className = "header__logo logo" to = "/">
          <img
            src = '/images/logo.svg'
            alt = "Zahrada"
            width = "99"
            height = "21"
            loading = "lazy"
          />
        </Link>

        <div className = "header__actions hidden-mobile">
          <ul className = "header__menu-list">
            <li className = "header__menu-item">
              <button
                className = "header__button button button--transparent"
                onClick={handleLogout}
              >
                Odhlásit se
              </button>
            </li>
          </ul>
        </div>

        <button
          className = "icon-button visible-mobile"
          type = "button"
          onClick = {handleLogout}
        >
          <svg
            width = "24"
            height = "24"
            viewBox = "0 0 24 24"
            fill = "none"
            xmlns = "http://www.w3.org/2000/svg"
          >
            <path
              d = "M16 17L21 12M21 12L16 7M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7"
              stroke = "black"
              strokeWidth = "1.4"
              strokeLinecap = "round"
              strokeLinejoin = "round"
            />
          </svg>
          <span className = "visually-hidden">Odhlásit se</span>
        </button>
      </div>
    </header>
  )
}

export default PrivateHeader;