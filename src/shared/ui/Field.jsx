const Field = (props) => {
  const {
    label,
    id,
    type = 'text',
    placeholder,
    name,
    className = '',
    value,
    onChange,
    error,
    disabled = false,
    required = false
  } = props;

  return (
    <div className={`field ${className}`}>
      <label
        htmlFor = {id}
        className = "field__label visually-hidden"
      >
        {label}
      </label>
      <input
        className={`field__input ${error ? 'field__input--error' : ''}`}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {error && (
        <span className="field__error">{error}</span>
      )}
    </div>
  )
}

export default Field