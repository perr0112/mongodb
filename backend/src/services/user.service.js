import bcrypt from "bcrypt"

import { User } from "../models/User.js"

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const createUser = async (
    username,
    firstName,
    lastName,
    email,
    password,
) => {
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        // Create user
        const user = new User({
            username, lastName, firstName, hashedPassword, email
        })
        await user.save()

        console.log("User ajouté ->", user)
    } catch(error) {
        console.error("Erreur lors de la création d'un utilisateur", error)
    }
}

const isExistingUser = async (username) => {
    const user = await User.findOne({ username })

    return user
}

export {
    isExistingUser,
    createUser,
}
