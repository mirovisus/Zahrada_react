import { useState } from 'react';
import { useAuth } from '@app/providers/auth';
import { Field, Button } from '@shared/ui';
import RoleSelector from './RoleSelector';

const RegisterForm = ({ onSubmit }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'owner'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validace jednotlivých polí
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) {
          return 'Uživatelské jméno je povinné';
        }
        if (value.length < 3) {
          return 'Uživatelské jméno musí mít alespoň 3 znaky';
        }
        if (value.length > 20) {
          return 'Uživatelské jméno může mít maximálně 20 znaků';
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
        if (!value) {
          return 'Heslo je povinné';
        }
        if (value.length < 4) {
          return 'Heslo musí mít alespoň 4 znaků';
        }
        if (value.length > 50) {
          return 'Heslo může mít maximálně 50 znaků';
        }
        return '';

      default:
        return '';
    }
  };

  // Validace celého formuláře
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach(key => {
      if (key !== 'role') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Vyčistíme chybu pro toto pole při změně
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validace formuláře
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Zavoláme registraci z AuthContext
      if (register) {
        const result = await register(formData);

        if (result.success) {
          // Úspěšná registrace
          if (onSubmit) {
            onSubmit(result);
          }
        } else {
          // Chyba z backendu
          setErrors({
            submit: result.error || 'Chyba při registraci'
          });
        }
      }
    } catch (err) {
      setErrors({
        submit: 'Neočekávaná chyba. Zkuste to prosím znovu.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <Field
        className="login__field field--transparent"
        id="reg-username"
        name="username"
        type="text"
        label="Uživatelské jméno"
        placeholder="Uživatelské jméno"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        disabled={isSubmitting}
        required
      />

      <Field
        className="login__field field--transparent"
        id="reg-email"
        name="email"
        type="email"
        label="E-mail"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isSubmitting}
        required
      />

      <Field
        className="login__field field--transparent"
        id="reg-password"
        name="password"
        type="password"
        label="Heslo"
        placeholder="Heslo"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        disabled={isSubmitting}
        required
      />

      <RoleSelector
        value={formData.role}
        onChange={handleRoleChange}
        disabled={isSubmitting}
      />

      {errors.submit && (
        <div className="login__error" role="alert">
          {errors.submit}
        </div>
      )}

      <Button
        className="button--green"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registrace...' : 'Registrovat se'}
      </Button>
    </form>
  )
}

export default RegisterForm;