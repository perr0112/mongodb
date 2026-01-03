import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { createUser, getUserFromEmail, isExistingUser } from "../services/user.service.js"

import { JWT_EXPIRATION, JWT_SECRET } from "../config/constants.js"

import { HTTPStatus } from "../config/httpStatus.js"

class AuthController {
    async login(req, res, next) {   
        console.log("login", req, res)
        const { email, password } = req.body

        if (!email || !password) {
            return res
                .status(HTTPStatus.BAD_REQUEST)
                .json({ message: "Email et mot de passe requis" })
        }

        const user = await getUserFromEmail(email)
        const match = await bcrypt.compare(password, user.hashedPassword)

        if (match === false) {
            return res
                .status(HTTPStatus.UNAUTHORIZED)
                .json({ message: "Identifiants invalides" })
        } else {
            const id = user._id.toString()

            const jwtToken = jwt.sign({ id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION,
            });

            return res.status(HTTPStatus.OK).cookie("jwtToken", jwtToken).json({
                success: true,
                message: "Connexion réussie",
                user,
            })
        }
    }

    logout(req, res) {
       return res
        .status(HTTPStatus.OK)
        .clearCookie("jwtToken")
        .json({ message: "Déconnexion réussie" })
    }

    async register(req, res, next) {
        console.log("register", req, req.body)
        const {
            username,
            firstName,
            lastName,
            email,
            role,
            password
        } = req.body

        if (!username || !firstName || !lastName || !email || !password) {
           return res
            .status(HTTPStatus.BAD_REQUEST)
            .json({ message: "Champs requis manquants" })
        }

        const user = await isExistingUser(username, email)

        if (user) {
            return res.status(HTTPStatus.BAD_REQUEST).json({
                message:
                    "Un utilisateur avec ce nom d'utilisateur ou cet email existe déjà",
            })
        }

        createUser(username, firstName, lastName, email, password, role)

        return res
            .status(HTTPStatus.CREATED)
            .json({
                message: "Utilisateur créé avec succès",
                success: true,
            })
    }
}

export const authController = new AuthController()
