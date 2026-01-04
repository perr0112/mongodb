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
    role = "user"
) => {
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        // Create user
        const user = new User({
            username, lastName, firstName, hashedPassword, email, role
        })
        await user.save()

        console.log("User ajouté ->", user)
    } catch(error) {
        console.error("Erreur lors de la création d'un utilisateur", error)
    }
}

const isExistingUser = async (username, email) => {
    // const user = await User.findOne({ username, email })
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    return user
}

const getUserFromId = async (id) => {
    const user = await User.findById(id)

    return user
}

const getUserFromEmail = async (email) => {
    const user = await User.findOne({ email })
    
    return user
}

export {
    createUser,
    getUserFromId,
    isExistingUser,
    getUserFromEmail,
}
