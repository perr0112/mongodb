const Button = ({ label, type, variant, onClick, style, className }) => {
    return (
        <button
            type={type}
            className={`button ${variant} ${className}`}
            style={{...style}}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button
