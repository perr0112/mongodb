import { useContext } from "react"

import { FaceLogo, HeaderLogo } from "../../icons"

import UserContext from "../../../contexts/user/UserContext"
import LinkComponent from "../../ui/Link"
import Button from "../../ui/button"
import { useLocation, useNavigate } from "react-router-dom"

console.log("PROVIDER CONTEXT", UserContext)

const Header = ({ mode = "main" }) => {
    const { user, logout } = useContext(UserContext)

    const location = useLocation()
    const navigate = useNavigate()

    const handleAuthNavigation = (mode) => {
        navigate("/auth", { state: { modeProvided: mode } })
    }

    // Mode = 'main' | 'authentication'
    return (
        <header className={`navbar__header ${mode === "main" ? "fixed" : ""}`}>
            {mode === "main" && (
                <div className="navbar__header-main">
                    <div className="navbar__header-logo">
                        <HeaderLogo />
                        <h3>Le Carnet Gourmand</h3>
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

                                    <div className="user-avatar">
                                        <Button
                                            label="!"
                                            type="button"
                                            variant="primary"
                                        />
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
