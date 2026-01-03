import { useState } from "react"

import UserContext from "."

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const saveUser = (userData) => {
        console.log("login userData from provider", userData)
        setUser(userData)
    }

    const logout = () => {
        console.log("logout from provider")
        setUser(null)
    }
    
    return (
        <UserContext.Provider value={{ user, saveUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}
