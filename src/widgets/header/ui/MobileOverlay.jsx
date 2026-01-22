import { Link } from 'react-router-dom';

const MobileOverlay = (props) => {
  const {
    isOpen,
    onClose
  } = props;

  if (!isOpen) return null;

  return (
    <div
      className = "mobile-overlay visible-mobile"
      role="dialog"
      onClick = {onClose}
    >
      <form className = "mobile-overlay__close-button-wrapper">
        <button
          className = "mobile-overlay__close-button cross-button"
          type = "button"
          onClick = {onClose}
        >
          <span className = "visually-hidden">Zavřít hlavní menu</span>
        </button>
      </form>

      <div
        className = "mobile-overlay__body"
        onClick = {(e) => e.stopPropagation()}
      >
        <ul className = "mobile-overlay__list">
          <li className = "mobile-overlay__item">
            <a
              className = "mobile-overlay__link"
              to = "/"
              onClick = {onClose}
            >
              Domů
            </a>
          </li>

          <li className = "mobile-overlay__item">
            <Link
              className = "mobile-overlay__link"
              to = "/"
              onClick = {onClose}
            >
              Aktuální nabídky
            </Link>
          </li>

          <li className = "mobile-overlay__item">
            <Link
              className = "mobile-overlay__link"
              to = "/application"
              onClick = {onClose}
            >
              Aplikace
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MobileOverlay;