import { Checkbox } from '@shared/ui';
import React, {useState} from "react";

const LoginOptions = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className = "login__options">
      <Checkbox
        name="remember"
        label="Pamatovat si mě"
        checked={rememberMe}
        onChange={handleCheckboxChange}
        className="login__remember"
      />

      <a href = "/" className = "login__forgot-link">
        Zapomněli jste heslo?
      </a>
    </div>
  )
}

export default LoginOptions