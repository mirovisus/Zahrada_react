import { useNavigate } from 'react-router-dom';
import { RegisterForm, RegisterFooter } from '@features/auth';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/profile');
  };

  return (
    <main className="content">
      <section className="section section--login">
        <div className="section__body">
          <div className="login">

            <div className="login__content">
              <h1 className="login__title h2">Registrace</h1>
            </div>

            <RegisterForm onSubmit={handleRegisterSuccess} />

            <RegisterFooter />

          </div>
        </div>
      </section>
    </main>
  )
}

export default SignupPage