import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import UserContext from "../../../contexts/user/UserContext"

import { FaceLogo, HeaderLogo, DefaultAvatar } from "../../icons"

import LinkComponent from "../../ui/Link"
import Button from "../../ui/button"

import { $ } from "../../../utils/dom"
import { runPageTransition } from "../../../utils/transition"
import { handleNavigate } from "../../../utils/navigate"

const Header = ({ mode = "main" }) => {
    const { user, logout } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)

    const handleAuthNavigation = (mode) => {
        runPageTransition("/auth", navigate, { modeProvided: mode });

        setMenuOpen(false)
    }

    const [heightNavbar, setHeightNavbar] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const header = $("header");
        if (header) {
            setHeightNavbar(header.offsetHeight);
        }
    }, [])

    const handleScroll = () => {
        const scrollTop = window.scrollY;

        if (!heightNavbar) return;

        if (scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }

    window.addEventListener("scroll", handleScroll);

    // Mode = 'main' | 'authentication'
    return (
        <header
            className={`
                navbar__header
                ${mode === "main" ? "fixed" : ""}
                ${isScrolled ? "scrolled" : ""}
            `}
        >
            {mode === "main" && (
                <div className="navbar__header-main">
                    <div className="navbar__header-logo">
                        <a
                            onClick={() => handleNavigate("/", navigate)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1.5rem",
                                textDecoration: "none",
                                cursor: "pointer",
                            }}
                        >
                            <HeaderLogo />
                            <h3>Le Carnet Gourmand</h3>
                        </a>
                    </div>

                    <div className="navbar__header-actions">
                        <div className="actions__links">
                            {user ? (
                                <>
                                    <LinkComponent
                                        type="link"
                                        href="/"
                                        onClick={() => handleNavigate("/", navigate)}
                                        active={location.pathname === "/"}
                                        label="Accueil"
                                        variant="secondary"
                                    />

                                    <LinkComponent
                                        type="link"
                                        href="/favorites"
                                        onClick={() => handleNavigate("/favorites", navigate)}
                                        active={location.pathname === "/favorites"}
                                        label="Mes favoris"
                                        variant="secondary"
                                    />

                                    <Button
                                        label="Ajouter ma recette"
                                        onClick={() => handleNavigate("/recipes/create", navigate)}
                                        type="button"
                                        variant="primary"
                                    />

                                    <div
                                        className="navbar__header-user-info"
                                        onClick={() => handleNavigate("/profile", navigate)}
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
                                    <Button
                                        label="S'inscrire"
                                        type="button"
                                        variant="secondary"
                                        onClick={() => handleNavigate("/auth", navigate, { modeProvided: "register" })}
                                    />

                                    <Button
                                        label="Se connecter"
                                        type="button"
                                        variant="primary"
                                        onClick={() => handleNavigate("/auth", navigate, { modeProvided: "login" })}
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
