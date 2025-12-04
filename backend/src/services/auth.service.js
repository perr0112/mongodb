import { User } from "../models/User"

const checkUserCredentials = async (username, password) => {
    try {
        const user = await User.findOne({ username })
        if (!user) {
            throw new Error("Cet utilisateur n'existe pas");
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            throw new Error("Mot de passe invalide");
        }

        console.log("Login réussi!", user);
    } catch (error) {
        console.error("Erreur lors du login:", error.message);
    }
}

export {
    checkUserCredentials,
}
