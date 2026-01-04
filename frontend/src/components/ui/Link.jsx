import { Link } from "react-router-dom"

const LinkComponent = ({ type, href, label, active, onClick, variant = "primary", style }) => {
    return (
        type === 'button' ? (
            <span
                className={`link link--button`}
                onClick={onClick}
                style={{...style}}
            >
                {label}
            </span>
        ) : (
            <Link
                to={href}
                className={`link link--${type} link--${variant} ${active ? 'link--active' : ''}`}
                style={{...style}}
            >
                {label}
            </Link>
        )
    )
}

export default LinkComponent
