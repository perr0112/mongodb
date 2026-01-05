import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import UserContext from "../../../contexts/user/UserContext"

import { FaceLogo, HeaderLogo, DefaultAvatar } from "../../icons"

import LinkComponent from "../../ui/Link"
import Button from "../../ui/button"

const Header = ({ mode = "main" }) => {
    const { user, logout } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)

    const handleAuthNavigation = (mode) => {
        setMenuOpen(false)
        navigate("/auth", { state: { modeProvided: mode } })
    }

    // Mode = 'main' | 'authentication'
    return (
        <header className={`navbar__header ${mode === "main" ? "fixed" : ""}`}>
            {mode === "main" && (
                <div className="navbar__header-main">
                    <div className="navbar__header-logo">
                        <Link
                            to="/"
                            style={{ display: "flex", alignItems: "center", gap: "1.5rem", textDecoration: "none" }}
                        >
                            <HeaderLogo />
                            <h3>Le Carnet Gourmand</h3>
                        </Link>
                    </div>

                    <div className="navbar__header-actions">
                        <div className="actions__links">
                            {user ? (
                                <>
                                    <LinkComponent
                                        type="link"
                                        href="/"
                                        active={location.pathname === "/"}
                                        label="Accueil"
                                        variant="secondary"
                                    />

                                    <LinkComponent
                                        type="link"
                                        href="/recipes"
                                        active={location.pathname === "/recipes"}
                                        label="Recettes disponibles"
                                        variant="secondary"
                                    />

                                    <Button
                                        label="Ajouter ma recette"
                                        type="button"
                                        variant="primary"
                                    />

                                    <div
                                        className="navbar__header-user-info"
                                        onClick={() => navigate("/profile")}
                                    >
                                        {user.avatarUrl ? (
                                            <img
                                                src={user.avatarUrl}
                                                alt="User Avatar"
                                                className="user-avatar"
                                            />
                                        ) : (
                                            <DefaultAvatar />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <LinkComponent
                                        type="link"
                                        href="/"
                                        active={location.pathname === "/"}
                                        label="Accueil"
                                        variant="secondary"
                                    />
                                    <LinkComponent
                                        type="link"
                                        href="/recipes"
                                        active={location.pathname === "/recipes"}
                                        label="Recettes disponibles"
                                        variant="secondary"
                                    />
                                    <Button
                                        label="Se connecter"
                                        type="button"
                                        variant="primary"
                                        onClick={() => handleAuthNavigation("login")}
                                    />
                                </>
                            )}
                        </div>

                        {/* Mobile version */}
                        <button
                            className={`hamburger ${menuOpen ? "open" : ""}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span />
                            <span />
                            <span />

                            {/* Mobile menu */}
                            {menuOpen && (
                                <div className="mobile-menu">
                                    <LinkComponent
                                        href="/"
                                        label="Accueil"
                                        active={location.pathname === "/"}
                                        onClick={() => setMenuOpen(false)}
                                        style={{ color: "white" }}
                                    />
                                    <LinkComponent
                                        href="/recipes"
                                        label="Recettes"
                                        active={location.pathname === "/recipes"}
                                        onClick={() => setMenuOpen(false)}
                                        style={{ color: "white" }}
                                    />

                                    {user ? (
                                        <>
                                            <Button label="Ajouter ma recette" variant="primary" style={{ width: "100%" }} />
                                            <Button label="Profil" variant="primary" style={{ width: "100%" }} onClick={() => navigate("/profile")} />
                                            <Button label="Se déconnecter" variant="secondary" onClick={logout} style={{ width: "100%" }} />
                                        </>
                                    ) : (
                                        <Button
                                            label="Se connecter"
                                            variant="primary"
                                            onClick={() => handleAuthNavigation("login")}
                                            style={{ width: "100%" }}
                                        />
                                    )}
                                </div>
                            )}
                        </button>

                    </div>
                </div>
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
