const ROLES = [
  { value: 'owner', label: 'Vlastník' },
  { value: 'worker', label: 'Pracovník' },
];

const RoleSelector = ({ value = 'owner', onChange, disabled = false }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className = "login__roles role-selector">
      {ROLES.map((role) => (
        <label
          key = {role.value}
          className = "role-selector__item"
        >
          <input
            className = "role-selector__input visually-hidden"
            type = "radio"
            name = "role"
            value = {role.value}
            checked={value === role.value}
            onChange={handleChange}
            disabled={disabled}
          />
          <span className = "role-selector__btn">
            {role.label}
          </span>
        </label>
      ))}
    </div>
  )
}

export default RoleSelector