const Link = ({ type, href, label, onClick }) => {
    return (
        type === 'button' ? (
            <span
                className={`link link--button`}
                onClick={onClick}
            >
                {label}
            </span>
        ) : (
            <a
                href={href}
                className={`link link--${type}`}
                onClick={onClick}
            >
                {label}
            </a>
        )
    )
}

export default Link
