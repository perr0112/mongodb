const Input = ({ type, name, placeholder, disabled, value, onChange, label, required }) => {
    return (
        <div className="form__input-container">
            {label && <label htmlFor={name} className="form__input-label">{label}</label>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="form__input"
                autoComplete="off"
                disabled={disabled}
                required={required}
            />
        </div>
    );
}

export default Input;
