import React, { useState } from 'react';
import { useAuth } from '@app/providers/auth';
import { Field, Checkbox, Button } from '@shared/ui';
import LoginOptions from './LoginOptions.jsx';

const LoginForm = ({ onSubmit }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email')?.trim();
    const password = formData.get('password')?.trim();

    if (!email || !password) {
      setError('Email a heslo jsou povinné');
      return;
    }

    try {
      login(email, password);
      setError('');
      onSubmit();
    } catch (err) {
      setError('Chyba při přihlášení');
    }
  };

  return (
    <form
      className = "login__form"
      action = "#"
      method = "post"
      onSubmit={handleSubmit}
    >
      <Field
        className="login__field field--transparent"
        id="login-email"
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
        required
      />

      <Field
        className="login__field field--transparent"
        id="login-password"
        name="password"
        type="password"
        label="Heslo"
        placeholder="Heslo"
        required
      />

      <LoginOptions />

      {error && (
        <div className="login__error" role="alert">
          {error}
        </div>
      )}

      <Button
        className = "button--green"
        type = "submit"
      >
        Přihlásit se
      </Button>
    </form>
  )
}

export default LoginForm