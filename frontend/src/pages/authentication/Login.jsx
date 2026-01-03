import { useContext, useState } from "react"

import toast, { Toaster } from "react-hot-toast"

import Input from "../../components/form/Input"
import Button from "../../components/ui/button"
import Link from "../../components/ui/Link"

import { login } from "../../services/index"
import UserContext from "../../contexts/user"

const Login = ({ toggleMode }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const { saveUser } = useContext(UserContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const res = login(email, password)
        res.then(response => {
            console.log("resp", response)

            const { data, status } = response

            setTimeout(() => {
                setLoading(false)
                if (status === 200 && data.success) {
                    toast.success("Connexion réussie")
                    saveUser(data.user)
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
            <Toaster />

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
                        <Link label="S'inscrire ici" type="button" onClick={toggleMode} />
                        <Link href="/" label="Mot de passe oublié" type="button" />
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Login
