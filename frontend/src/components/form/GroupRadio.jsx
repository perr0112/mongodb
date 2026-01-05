const GroupRadio = ({ name, options, selectedOption, onChange }) => {
    return (
        <div
            className="group-radio"
        >
            <p className="group-radio__name">{name}</p>
            <div className="group-radio__options">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="group-radio__option"
                        style={{ opacity: selectedOption && selectedOption !== option.value ? 0.4 : 1 }}
                    >
                        <div className={`fake-radio-circle ${selectedOption === option.value ? 'is-checked' : ''}`}></div>
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectedOption === option.value}
                            onChange={() => onChange(option.value)}
                        />
                        <span className="group-radio__label">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default GroupRadio
