import { useEffect, useState } from "react"

import UserContext from "./UserContext"

import { getMe, logout as apiLogout } from "../../services"
import toast from "react-hot-toast"

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMe()
            .then(res => {
                console.log("------------------------")
                console.log("---------- current user:", res.data.user)
                console.log("------------------------")

                if (res.data.success) setUser(res.data.user)
            })
            .catch(err => {
                // if (err.response) console.log("Erreur auth:", err.response.data.message)
                setUser(null)
            })
            .finally(() => setLoading(false))
    }, [])


    const saveUser = (userData) => {
        setUser(userData)
    }

    const logout = async () => {
        await apiLogout()
        setUser(null)

        // window.location.reload()

        toast.success("Déconnexion réussie !")
    }

    return (
        <UserContext.Provider value={{ user, saveUser, logout, loading }}>
            {children}
        </UserContext.Provider>
    )
}
