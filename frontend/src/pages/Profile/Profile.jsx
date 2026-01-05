import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

import UserContext from "../../contexts/user/UserContext";
import Button from "../../components/ui/button";

import PersonalInfos from "./PersonalInfos";
import UserRecipes from "./UserRecipes";
import { MainLogo } from "../../components/icons";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("infos")

    const { user, logout, loading } = useContext(UserContext)
    const navigate = useNavigate()

    const renderContent = () => {
        switch (activeTab) {
            case "infos":
                return <PersonalInfos user={user} />
            case "recipes":
                return <UserRecipes userId={user?._id} />
            default:
                return <PersonalInfos user={user} />
        }
    }

    const handleLogout = () => {
        const logoutUser = () => {
            logout()

            navigate("/")
        }

        logoutUser()
    }

    return (
        <div className="profile-layout">
            <div className="profile__sidebar">
                <Button
                    label="Informations personnelles"
                    type="button"
                    variant={`${activeTab === "infos" ? 'primary' : 'secondary'}`}
                    onClick={() => setActiveTab("infos")}
                />

                <Button
                    label="Vos recettes"
                    type="button"
                    variant={`${activeTab === "recipes" ? 'primary' : 'secondary'}`}
                    onClick={() => setActiveTab("recipes")}
                />

                <Button
                    label="Se déconnecter"
                    type="button"
                    variant="secondary"
                    onClick={handleLogout}
                />
            </div>

            <div className="profile__content">
                {renderContent()}
            </div>

            <div className="floating-logo">
                <MainLogo />
            </div>
        </div>
    )
}

export default Profile
