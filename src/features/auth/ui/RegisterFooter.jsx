import { Link } from 'react-router-dom';

const RegisterFooter = () => {
  return (
    <div className = "login__footer">
      <p className = "login__footer-text">
        Máte již účet?{' '}
        <Link
          className = "login__footer-link"
          to = "/login"
        > Přihlásit se</Link>
      </p>
    </div>
  )
}

export default RegisterFooter