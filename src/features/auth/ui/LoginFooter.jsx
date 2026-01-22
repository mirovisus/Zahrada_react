import React from "react";
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className = "login__footer">
      <p className = "login__footer-text">
        Nemáte účet?{' '}
        <Link
          className = "login__footer-link"
          to = "/signup"
        >Registrovat se
        </Link>
      </p>
    </div>
  )
}

export default LoginFooter;