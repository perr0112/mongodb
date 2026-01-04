import { useState } from "react"
import toast from "react-hot-toast"

import { register } from "../../services"

import Input from "../../components/form/Input"
import Button from "../../components/ui/button"
import LinkComponent from "../../components/ui/Link"

const Register = ({ toggleMode }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)

        const res = register({
            username,
            firstName,
            lastName,
            email,
            password,
        })

        res.then(response => {
            const { data, status } = response

            setTimeout(() => {
                setLoading(false)
                if (status === 201 && data.success) {
                    toast.success("Inscription réussie")
                } else {
                    toast.error(data.message || "Erreur lors de l'inscription")
                }
            }, 1000)
        }
        ).catch(error => {
            setTimeout(() => {
                setLoading(false)
                toast.error(error.response.data.message || "Erreur lors de l'inscription")
            }, 1000)
        })
    }

    return (
        <div>
            <form className="authentication__form-register" onSubmit={handleSubmit}>
                <div className="inputs__group">
                    <Input
                        type="text"
                        name="username"
                        label="Nom d'utilisateur"
                        placeholder="Saisissez votre nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Saisissez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <div className="inputs__group--horizontal">
                        <Input
                            type="text"
                            name="firstname"
                            label="Prénom"
                            placeholder="Saisissez votre prénom"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required={true}
                        />
                        <Input
                            type="text"
                            name="lastname"
                            label="Nom"
                            placeholder="Saisissez votre nom"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required={true}
                        />
                    </div>
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
                        label={loading ? "Inscription..." : "S'inscrire"}
                        type="submit"
                        variant="primary"
                        style={{
                            width: "100%",
                            pointerEvents: loading ? "none" : "auto",
                            opacity: loading ? 0.7 : 1,
                        }}
                    />

                    <div className="actions__link">
                        <LinkComponent label="Se connecter" type="button" onClick={toggleMode} />
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Register
