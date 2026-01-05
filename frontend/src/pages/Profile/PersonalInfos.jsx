import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Input from "../../components/form/Input";
import Button from "../../components/ui/button";
import { DefaultAvatar } from "../../components/icons";


import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services";

const PersonalInfos = ({ user }) => {
    const [infoData, setInfoData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setInfoData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || ""
            });
        }
    }, [user])

    const handleInfoSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateUser(infoData)
            if (response.data.success) {
                toast.success("Informations mises à jour !")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors de la mise à jour")
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        
        if (!passwordData.password) {
            return toast.error("Veuillez saisir un nouveau mot de passe.")
        }

        if (passwordData.password !== passwordData.confirmPassword) {
            return toast.error("Les mots de passe ne correspondent pas.")
        }

        try {
            const response = await updateUser({ password: passwordData.password })
            if (response.data.success) {
                toast.success("Mot de passe modifié avec succès !")
                setPasswordData({ password: "", confirmPassword: "" })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors du changement de mot de passe")
        }
    };

    return (
        <div className="personal-infos-layout">
            <header className="personal-infos__header">
                <div className="personal-infos__avatar">
                    {user?.avatarUrl ? (
                        <img src={user.avatarUrl} alt="Avatar" className="avatar-image" />
                    ) : (
                        <div className="avatar-placeholder">
                            <DefaultAvatar />
                        </div>
                    )}
                </div>
                <div className="personal-infos__welcome">
                    <h2>Bonjour, {infoData.firstName} !</h2>
                    <p className="personal-infos__date">
                        Membre depuis le {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </header>

            <div className="personal-infos__forms-container">
                <form onSubmit={handleInfoSubmit} className="personal-infos__form">
                    <h3>Informations personnelles</h3>
                    <Input 
                        label="Prénom"
                        value={infoData.firstName}
                        onChange={(e) => setInfoData({...infoData, firstName: e.target.value})}
                    />
                    <Input 
                        label="Nom"
                        value={infoData.lastName}
                        onChange={(e) => setInfoData({...infoData, lastName: e.target.value})}
                    />
                    <Input 
                        label="Email (non modifiable)"
                        value={infoData.email}
                        disabled
                    />
                    <Button label="Mettre à jour mes infos" type="submit" variant="primary" />
                </form>

                <div className="form-divider-horizontal" />

                <form onSubmit={handlePasswordSubmit} className="personal-infos__form" style={{ marginTop: "4rem" }}>
                    <Input 
                        label="Nouveau mot de passe"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.password}
                        onChange={(e) => setPasswordData({...passwordData, password: e.target.value})}
                    />
                    <Input 
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                    <Button label="Changer le mot de passe" type="submit" variant="secondary" />
                </form>
            </div>
        </div>
    );
};

export default PersonalInfos;
