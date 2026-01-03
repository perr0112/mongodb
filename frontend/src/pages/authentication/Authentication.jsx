import { useCallback, useState } from "react"

import Login from "./Login"
import Register from "./Register"

import { MainLogo } from "../../components/icons"
import Header from "../../components/navbar/header/Header"

const AUTHENTICATION_LABELS = [
    {
        label: "Entrées",
        color: "#4B2CE3",
    },
    {
        label: "Plats",
        color: "#FF5E29",
    },
    {
        label: "Desserts",
        color: "#00804A",
    },
    {
        label: "Cocktails",
        color: "#4F060B",
    },
]

const Authentication = () => {

    const [mode, setMode] = useState("login")

    const toggleMode = useCallback(() => {
        setMode(mode === "login" ? "register" : "login")
    }, [mode])
    
    return (
        <div className="authentication__layout">
            <div className="authentication__container">
                {/* Left Side */}
                <div className="authentication__left">
                    {/* Labels */}
                    <div className="authentication__labels">
                        <div className="authentication__labels-group">
                            {AUTHENTICATION_LABELS.slice(0, 2).map(({ label, color }) => (
                                <div
                                    key={label}
                                    className="authentication__label"
                                    style={{ backgroundColor: color }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>

                        <div className="authentication__labels-group">
                            {AUTHENTICATION_LABELS.slice(2).map(({ label, color }) => (
                                <div
                                    key={label}
                                    className="authentication__label"
                                    style={{ backgroundColor: color }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="book-cover">
                        <div className="book-cover__content">
                            <MainLogo color="#F3EDE5" />
                            <h3 className="text-primary">Cuisinez, partagez, inspirez.</h3>
                        </div>

                        <div className="book__copyright">
                            <p>Le Carnet Gourmand - © {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="authentication__right">
                    <Header mode="authentication" />

                    <div className="authentication__form-container">
                        {mode === 'login' && <Login toggleMode={toggleMode} />}
                        {mode === 'register' && <Register toggleMode={toggleMode} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication
