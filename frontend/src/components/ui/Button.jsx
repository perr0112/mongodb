const Button = ({ label, type, variant, onClick, style }) => {
    return (
        <button
            type={type}
            className={`button ${variant}`}
            style={{...style}}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button
