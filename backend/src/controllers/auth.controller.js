import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { createUser, isExistingUser } from "../services/user.service.js"

import { JWT_EXPIRATION, JWT_SECRET } from "../config/constants.js"

class AuthController {
    async login(req, res, next) {   
        console.log("login", req, res)
        const { username, password } = req.body

        console.log("_______________________")
        console.log(JWT_EXPIRATION, JWT_SECRET)
        console.log("_______________________")

        const user = await isExistingUser(username)
        const match = await bcrypt.compare(password, user.hashedPassword)

        if (match === false) {
            res.json({ "message": "Identifiants invalides" })
        } else {
            const id = user._id.toString()

            const jwtToken = jwt.sign({ id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION,
            });

            res.cookie("jwtToken", jwtToken).json({
                success: true,
                message: "Connexion réussie"
            })

            // res.header('token', jwtToken).json({
            //     success: true,
            //     message: "Connexion réussie"
            // })

            next()
        }
    }

    logout(req, res, next) {
        res.clearCookie("jwtToken")
        res.json({ "message": "Déconnexion réussie" })
    }

    async register(req, res, next) {
        console.log("register", req, req.body)
        const {
            username,
            firstName,
            lastName,
            email,
            password
        } = req.body

        const user = await isExistingUser(username)

        if (user) {
            console.error("Un utilisateur avec cet username existe déjà")

            res.json({
                "message": "Un utilisateur avec cet username existe déjà"
            })
        }

        createUser(username, firstName, lastName, email, password)
    }
}

export const authController = new AuthController()
