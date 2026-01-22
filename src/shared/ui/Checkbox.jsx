const Checkbox = (props) => {
  const {
    label,
    name,
    checked,
    onChange,
    className = "",
    disabled = false
  } = props;

  return (
    <label className = {`checkbox ${className}`}>
      <input
        type="checkbox"
        className="checkbox__input"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label && <span className="checkbox__text">{label}</span>}
    </label>
  );
}

export default Checkbox