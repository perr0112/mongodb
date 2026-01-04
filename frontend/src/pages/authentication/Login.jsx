import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { login } from "../../services/index"

import UserContext from "../../contexts/user/UserContext"

import Input from "../../components/form/Input"
import Button from "../../components/ui/button"
import LinkComponent from "../../components/ui/Link"

const Login = ({ toggleMode }) => {
    const [email, setEmail] = useState("admin@lcg-dev.com")
    const [password, setPassword] = useState("admin123")
    const [loading, setLoading] = useState(false)

    const { saveUser } = useContext(UserContext)
    
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const res = login(email, password)
        res.then(response => {
            const { data, status } = response

            setTimeout(() => {
                setLoading(false)
                if (status === 200 && data.success) {
                    toast.success("Connexion réussie")
                    saveUser(data.user)

                    navigate("/")
                } else {
                    toast.error(data.message || "Erreur lors de la connexion")
                }
            }, 1000)
        }
        ).catch(error => {
            setTimeout(() => {
                setLoading(false)
                toast.error(error.response.data.message || "Erreur lors de la connexion")
            }, 1000)
        })
    }

    return (
        <div>

            <form className="authentication__form-login" onSubmit={handleSubmit}>

                <div className="inputs__group">
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Saisissez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Mot de passe"
                        placeholder="Saisissez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>

                <div className="actions__group">
                    <Button
                        label={loading ? "Connexion..." : "Se connecter"}
                        type="submit"
                        variant="primary"
                        style={{
                            width: "100%",
                            pointerEvents: loading ? "none" : "auto",
                            opacity: loading ? 0.7 : 1,
                        }}
                    />

                    <div className="actions__link">
                        <LinkComponent label="S'inscrire ici" type="button" onClick={toggleMode} />
                        <LinkComponent href="/" label="Mot de passe oublié" type="button" />
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Login
