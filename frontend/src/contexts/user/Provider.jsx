import { useEffect, useState } from "react"
import toast from "react-hot-toast"

import UserContext from "./UserContext"

import { getMe, logout as apiLogout } from "../../services"

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMe()
            .then(res => {
                if (res.data.success) setUser(res.data.user)
            })
            .catch(err => {
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

        toast.success("Déconnexion réussie !")
    }

    return (
        <UserContext.Provider value={{ user, saveUser, logout, loading }}>
            {children}
        </UserContext.Provider>
    )
}
