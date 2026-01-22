import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@features/auth';
import LoginFooter from "@features/auth/ui/LoginFooter.jsx";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/profile');
  };

  return (
    <main className = "content">
      <section className = "section section--login">
        <div className = "section__body">
          <div className = "login">
            <div className = "login__content">
              <h1 className = "login__title h2">Přihlášení</h1>
            </div>

            <LoginForm onSubmit = {handleLoginSuccess} />

            <LoginFooter />
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage