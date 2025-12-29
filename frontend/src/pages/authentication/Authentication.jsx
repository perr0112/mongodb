import { useCallback, useState } from "react"

import Login from "./Login"
import Register from "./Register"

import { MainLogo } from "../../components/icons"

const Authentication = () => {

    const [mode, setMode] = useState('login')

    const toggleMode = useCallback(() => {
        setMode(mode === 'login' ? 'register' : 'login')
    }, [mode])
    
    return (
        <div className="authentication__layout">
            <div className="authentication__container">
                {/* Left Side */}
                <div className="authentication__left">
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
                    <p>form...</p>
                </div>
            </div>
        </div>
    )
}

export default Authentication
