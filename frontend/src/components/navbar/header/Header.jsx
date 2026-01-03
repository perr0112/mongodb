import { FaceLogo, HeaderLogo } from "../../icons"

const Header = ({ mode = "main" }) => {
    // Mode = 'main' | 'authentication'
    return (
        <header className="navbar__header">
            {mode === "main" && (
                <div>Mode: main</div>
            )}

            {mode === "authentication" && (
                <div className="navbar__header-authentication">
                    <HeaderLogo />
                    <h3>Bienvenue sur le Carnet Gourmand !</h3>
                </div>
            )}
        </header>
    )
}

export default Header
